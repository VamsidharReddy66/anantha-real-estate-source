import { generateKeyPair, exportJWK, SignJWT } from "jose";
import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import handler, {
  seal,
  unseal,
  hash,
  operation,
  configuration,
  allowed,
  checkMutation,
  SCOPE,
} from "../server/gbp.mjs";

Object.assign(process.env, {
  GBP_GOOGLE_CLIENT_ID: "test-client",
  GBP_GOOGLE_CLIENT_SECRET: "test-secret",
  GBP_APP_ORIGIN: "https://example.com",
  GBP_ADMIN_EMAILS: "admin@example.com",
  GBP_ENCRYPTION_KEY: randomBytes(32).toString("base64"),
  UPSTASH_REDIS_REST_URL: "https://test.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "test-redis",
});
const origin = process.env.GBP_APP_ORIGIN;
const sid = randomBytes(32).toString("base64url");
const storageKey = (kind, id) => `gbp:${hash(origin)}:${kind}:${hash(id)}`;
const session = {
  sub: "123",
  email: "admin@example.com",
  csrf: "test-csrf",
  expiresAt: Date.now() + 60000,
};
const store = new Map();
let calls = [],
  googleStatus = 200;
const signingKeys = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(signingKeys.publicKey)), kid: "test-key", alg: "RS256", use: "sig" };
let oauthResponse;
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, options = {}) => {
  calls.push({ url: String(url), options });
  if (String(url) === "https://www.googleapis.com/oauth2/v3/certs") return Response.json({ keys: [jwk] });
  if (String(url) === "https://oauth2.googleapis.com/token" && oauthResponse) return Response.json(oauthResponse);
  if (String(url) === process.env.UPSTASH_REDIS_REST_URL) {
    const [cmd, key, val] = JSON.parse(options.body);
    let result = null;
    if (cmd === "GET" || cmd === "GETDEL") {
      result = store.get(key) ?? null;
      if (cmd === "GETDEL") store.delete(key);
    }
    if (cmd === "SET") {
      store.set(key, val);
      result = "OK";
    }
    if (cmd === "INCR") {
      result = Number(store.get(key) || 0) + 1;
      store.set(key, result);
    }
    if (cmd === "DEL") {
      store.delete(key);
      result = 1;
    }
    return Response.json({ result });
  }
  if (String(url) === "https://oauth2.googleapis.com/token")
    return Response.json({ access_token: "refreshed-token", expires_in: 3600 });
  if (String(url).startsWith("https://mybusiness"))
    return Response.json(
      googleStatus === 200
        ? { accounts: [] }
        : { error: { message: "secret-upstream-detail" } },
      { status: googleStatus },
    );
  throw new Error("Unexpected network call " + url);
};
test.after(() => {
  globalThis.fetch = realFetch;
});
function setup() {
  calls = [];
  googleStatus = 200;
  store.clear();
  store.set(storageKey("session", sid), seal(session));
  store.set(
    storageKey("tokens", "123"),
    seal({
      access_token: "private-access",
      refresh_token: "private-refresh",
      expiresAt: Date.now() + 3600000,
    }),
  );
}
async function invoke(
  action,
  { method = "GET", headers = {}, body, auth = true } = {},
) {
  let output = "";
  const res = {
    statusCode: 200,
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    end(s = "") {
      output = s;
    },
  };
  await handler(
    {
      url: "/api/gbp?action=" + action,
      method,
      headers: {
        ...(auth ? { cookie: `__Host-gbp-session=${sid}` } : {}),
        ...headers,
      },
      body,
    },
    res,
  );
  return { ...res, text: output, data: output ? JSON.parse(output) : null };
}
test("encrypted values round-trip and reject tampering", () => {
  const encrypted = seal({ refresh_token: "private-refresh" });
  assert.equal(unseal(encrypted).refresh_token, "private-refresh");
  assert.ok(!encrypted.includes("private-refresh"));
  const bytes = Buffer.from(encrypted, "base64");
  bytes[30] ^= 1;
  assert.throws(() => unseal(bytes.toString("base64")));
});
test("configuration fails closed and administrator allowlist is exact", () => {
  assert.equal(configuration().redirect, origin + "/api/gbp?action=callback");
  assert.equal(allowed("ADMIN@example.com"), true);
  assert.equal(allowed("attackeradmin@example.com"), false);
  const value = process.env.GBP_ADMIN_EMAILS;
  delete process.env.GBP_ADMIN_EMAILS;
  assert.throws(configuration, /incomplete/);
  process.env.GBP_ADMIN_EMAILS = value;
});
test("CSRF requires both correct origin and token", () => {
  assert.throws(
    () =>
      checkMutation(
        {
          headers: { origin: "https://evil.com", "x-csrf-token": session.csrf },
        },
        session,
        origin,
      ),
    /verification/,
  );
  assert.throws(
    () =>
      checkMutation(
        { headers: { origin, "content-type": "application/json" } },
        session,
        origin,
      ),
    /verification/,
  );
});
test("resource identifiers cannot escape fixed Google endpoint paths", () => {
  assert.throws(() =>
    operation(
      "profile",
      new URLSearchParams({ account: "1", location: "../accounts" }),
    ),
  );
  assert.throws(() =>
    operation(
      "profile-update",
      new URLSearchParams({ account: "1", location: "2" }),
      { metadata: { secret: true } },
    ),
  );
  const [method, url] = operation(
    "reply",
    new URLSearchParams({ account: "1", location: "2", review: "r" }),
    { comment: "Thank you" },
  );
  assert.equal(method, "PUT");
  assert.equal(
    url,
    "https://mybusiness.googleapis.com/v4/accounts/1/locations/2/reviews/r/reply",
  );
  assert.throws(() =>
    operation(
      "media-create",
      new URLSearchParams({ account: "1", location: "2" }),
      {
        mediaFormat: "PHOTO",
        sourceUrl: "file:///etc/passwd",
        locationAssociation: { category: "ADDITIONAL" },
      },
    ),
  );
});
test("unauthenticated admin API exposes no Google data", async () => {
  setup();
  const res = await invoke("accounts", { auth: false });
  assert.equal(res.statusCode, 401);
  assert.equal(calls.length, 0);
  assert.equal(res.headers["Cache-Control"], "no-store");
});
test("session response never contains stored Google credentials", async () => {
  setup();
  const res = await invoke("session");
  assert.equal(res.statusCode, 200);
  assert.equal(res.data.csrf, session.csrf);
  assert.ok(!res.text.includes("private-"));
});
test("expired sessions and removed administrators are denied", async () => {
  setup();
  store.set(storageKey("session", sid), seal({ ...session, expiresAt: 1 }));
  assert.equal((await invoke("accounts")).statusCode, 401);
  store.set(
    storageKey("session", sid),
    seal({ ...session, email: "intruder@example.com" }),
  );
  assert.equal((await invoke("accounts")).statusCode, 401);
});
test("mutation rejects GET and missing CSRF before Google calls", async () => {
  setup();
  assert.equal(
    (await invoke("reply&account=1&location=2&review=r")).statusCode,
    405,
  );
  assert.equal(
    (
      await invoke("reply&account=1&location=2&review=r", {
        method: "POST",
        body: { comment: "test" },
      })
    ).statusCode,
    403,
  );
  assert.ok(!calls.some((c) => c.url.startsWith("https://mybusiness")));
});
test("OAuth uses PKCE, nonce, offline business scope and secure binding cookie", async () => {
  setup();
  const res = await invoke("login", { auth: false });
  assert.equal(res.statusCode, 303);
  const url = new URL(res.headers.Location);
  assert.equal(url.origin, "https://accounts.google.com");
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.ok(url.searchParams.get("nonce"));
  assert.ok(url.searchParams.get("scope").includes(SCOPE));
  assert.equal(url.searchParams.get("access_type"), "offline");
  assert.match(res.headers["Set-Cookie"], /HttpOnly; Secure; SameSite=Lax/);
});
test("OAuth state without the browser binding cannot be replayed", async () => {
  setup();
  const state = randomBytes(32).toString("base64url");
  store.set(
    storageKey("flow", state),
    seal({ binding: hash("different-browser") }),
  );
  const res = await invoke("callback&state=" + state + "&code=test", {
    auth: false,
  });
  assert.equal(res.statusCode, 400);
  assert.ok(!store.has(storageKey("flow", state)));
  assert.ok(!calls.some((c) => c.url.includes("oauth2.googleapis.com/token")));
});
test("expired access token refreshes server-side and preserves refresh token", async () => {
  setup();
  store.set(
    storageKey("tokens", "123"),
    seal({
      access_token: "old",
      refresh_token: "private-refresh",
      expiresAt: 1,
    }),
  );
  const res = await invoke("accounts");
  assert.equal(res.statusCode, 200);
  assert.equal(
    calls.find((c) => c.url.startsWith("https://mybusiness")).options.headers
      .Authorization,
    "Bearer refreshed-token",
  );
  assert.equal(
    unseal(store.get(storageKey("tokens", "123"))).refresh_token,
    "private-refresh",
  );
  assert.ok(!res.text.includes("token"));
});
test("Google errors are sanitized and mutations are not retried", async () => {
  setup();
  googleStatus = 403;
  const res = await invoke("post-create&account=1&location=2", {
    method: "POST",
    headers: {
      origin,
      "x-csrf-token": session.csrf,
      "content-type": "application/json",
    },
    body: { summary: "New update" },
  });
  assert.equal(res.statusCode, 502);
  assert.ok(!res.text.includes("secret-upstream-detail"));
  assert.equal(
    calls.filter((c) => c.url.startsWith("https://mybusiness")).length,
    1,
  );
});
test("logout invalidates the server session", async () => {
  setup();
  const res = await invoke("logout", {
    method: "POST",
    headers: {
      origin,
      "x-csrf-token": session.csrf,
      "content-type": "application/json",
    },
    body: {},
  });
  assert.equal(res.statusCode, 200);
  assert.ok(!store.has(storageKey("session", sid)));
  assert.match(res.headers["Set-Cookie"], /Max-Age=0/);
  assert.equal((await invoke("accounts")).statusCode, 401);
});

async function oauthCallback(email, expectedNonce = "nonce", actualNonce = "nonce") {
  setup();
  const state = randomBytes(32).toString("base64url");
  const binding = "browser-binding";
  store.set(storageKey("flow", state), seal({ binding: hash(binding), verifier: "verifier", nonce: expectedNonce }));
  oauthResponse = {
    access_token: "new-private-access", refresh_token: "new-private-refresh", expires_in: 3600,
    scope: "openid email " + SCOPE,
    id_token: await new SignJWT({ email, email_verified: true, nonce: actualNonce }).setProtectedHeader({ alg: "RS256", kid: "test-key" }).setIssuer("https://accounts.google.com").setAudience("test-client").setSubject("456").setIssuedAt().setExpirationTime("5m").sign(signingKeys.privateKey),
  };
  const result = await invoke("callback&state=" + state + "&code=test-code", { auth: false, headers: { cookie: "__Host-gbp-flow=" + binding } });
  oauthResponse = undefined;
  return result;
}
test("verified OAuth callback creates opaque session with no browser tokens", async () => {
  const result = await oauthCallback("admin@example.com");
  assert.equal(result.statusCode, 303);
  assert.equal(result.headers.Location, origin + "/admin/gbp");
  assert.match(result.headers["Set-Cookie"], /^__Host-gbp-session=[\w-]{43};/);
  assert.ok(!JSON.stringify(result).includes("new-private"));
  assert.equal(unseal(store.get(storageKey("tokens", "456"))).refresh_token, "new-private-refresh");
});
test("signed Google identities still require exact allowlist and nonce", async () => {
  assert.equal((await oauthCallback("unlisted@example.com")).statusCode, 403);
  assert.ok(!store.has(storageKey("tokens", "456")));
  assert.equal((await oauthCallback("admin@example.com", "expected", "wrong")).statusCode, 403);
  assert.ok(!store.has(storageKey("tokens", "456")));
});
