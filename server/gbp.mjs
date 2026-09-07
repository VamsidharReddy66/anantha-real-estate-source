import {
  randomBytes,
  createHash,
  createCipheriv,
  createDecipheriv,
  timingSafeEqual,
} from "node:crypto";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { z } from "zod";

export const SCOPE = "https://www.googleapis.com/auth/business.manage";
const SESSION = "__Host-gbp-session";
const FLOW = "__Host-gbp-flow";
const TTL = 8 * 60 * 60;
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs"),
);
const READ_MASK =
  "name,title,storefrontAddress,phoneNumbers,websiteUri,regularHours,specialHours,profile,categories,metadata";
const required = [
  "GBP_GOOGLE_CLIENT_ID",
  "GBP_GOOGLE_CLIENT_SECRET",
  "GBP_APP_ORIGIN",
  "GBP_ADMIN_EMAILS",
  "GBP_ENCRYPTION_KEY",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
];
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
export const hash = (s) => createHash("sha256").update(s).digest("hex");
const random = () => randomBytes(32).toString("base64url");
export function equal(a, b) {
  return (
    typeof a === "string" &&
    typeof b === "string" &&
    Buffer.byteLength(a) === Buffer.byteLength(b) &&
    timingSafeEqual(Buffer.from(a), Buffer.from(b))
  );
}
export function configuration() {
  if (required.some((k) => !process.env[k]?.trim()))
    throw new HttpError(
      503,
      "GBP setup is incomplete. Ask the site administrator to complete the server configuration.",
    );
  const origin = new URL(process.env.GBP_APP_ORIGIN);
  if (
    origin.protocol !== "https:" ||
    origin.origin !== process.env.GBP_APP_ORIGIN ||
    Buffer.from(process.env.GBP_ENCRYPTION_KEY, "base64").length !== 32
  )
    throw new HttpError(503, "GBP server configuration is invalid.");
  if (new URL(process.env.UPSTASH_REDIS_REST_URL).protocol !== "https:")
    throw new HttpError(503, "GBP storage configuration is invalid.");
  return {
    origin: origin.origin,
    redirect: origin.origin + "/api/gbp?action=callback",
  };
}
export function allowed(email) {
  return (
    typeof email === "string" &&
    (process.env.GBP_ADMIN_EMAILS || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      .includes(email.toLowerCase())
  );
}
export function seal(value) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    Buffer.from(process.env.GBP_ENCRYPTION_KEY, "base64"),
    iv,
  );
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64");
}
export function unseal(value) {
  const b = Buffer.from(value, "base64");
  const cipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(process.env.GBP_ENCRYPTION_KEY, "base64"),
    b.subarray(0, 12),
  );
  cipher.setAuthTag(b.subarray(12, 28));
  return JSON.parse(
    Buffer.concat([cipher.update(b.subarray(28)), cipher.final()]).toString(
      "utf8",
    ),
  );
}
async function redis(...command) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(10000),
  });
  if (!r.ok) throw new HttpError(503, "GBP storage is unavailable.");
  const data = await r.json();
  if (data.error) throw new HttpError(503, "GBP storage is unavailable.");
  return data.result;
}
const key = (kind, id) =>
  `gbp:${hash(process.env.GBP_APP_ORIGIN)}:${kind}:${hash(id)}`;
const read = async (kind, id) => {
  const v = await redis("GET", key(kind, id));
  return v ? unseal(v) : null;
};
const save = (kind, id, value, ttl) =>
  redis("SET", key(kind, id), seal(value), "EX", ttl);
function cookie(req, name) {
  const m = (req.headers.cookie || "")
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(name + "="));
  return m?.slice(name.length + 1);
}
function setCookie(res, name, value, age) {
  res.setHeader(
    "Set-Cookie",
    `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`,
  );
}
function redirect(res, url) {
  res.statusCode = 303;
  res.setHeader("Location", url);
  res.end();
}
function send(res, status, value) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(value));
}
export function checkMutation(req, session, origin) {
  if (
    req.headers.origin !== origin ||
    !equal(req.headers["x-csrf-token"], session.csrf)
  )
    throw new HttpError(
      403,
      "Request verification failed. Reload the admin page.",
    );
  if (!req.headers["content-type"]?.startsWith("application/json"))
    throw new HttpError(415, "JSON required.");
}
async function rateLimit(id, limit) {
  const k = key("rate", `${id}:${Math.floor(Date.now() / 60000)}`);
  const n = await redis("INCR", k);
  if (n === 1) await redis("EXPIRE", k, 120);
  if (n > limit)
    throw new HttpError(429, "Too many requests. Please wait a minute.");
}
async function tokenRequest(params) {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GBP_GOOGLE_CLIENT_ID,
      client_secret: process.env.GBP_GOOGLE_CLIENT_SECRET,
      ...params,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!r.ok)
    throw new HttpError(
      401,
      "Google authorization expired or was rejected. Sign in again.",
    );
  return r.json();
}
async function google(session, url, method = "GET", body) {
  let tokens = await read("tokens", session.sub);
  if (!tokens) throw new HttpError(401, "Connect Google again.");
  if (tokens.expiresAt < Date.now() + 60000) {
    if (!tokens.refresh_token)
      throw new HttpError(401, "Google authorization expired. Sign in again.");
    const fresh = await tokenRequest({
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    });
    tokens = {
      ...tokens,
      ...fresh,
      expiresAt: Date.now() + fresh.expires_in * 1000,
    };
    await save("tokens", session.sub, tokens, 30 * 86400);
  }
  const r = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) {
    const messages = {
      400: "Google rejected the fields. Check their format and profile eligibility.",
      401: "Google access was revoked. Sign in again.",
      403: "Google denied access. Check API approval, enabled APIs, quota and your profile role.",
      404: "This resource was not found or is no longer accessible.",
      429: "Google quota reached. Wait before retrying.",
    };
    throw new HttpError(
      r.status === 429 ? 429 : r.status === 401 ? 401 : 502,
      messages[r.status] ||
        "Google could not complete the request. Try again later.",
    );
  }
  const text = await r.text();
  return text ? JSON.parse(text) : {};
}
const id = z.string().regex(/^[A-Za-z0-9_-]{1,200}$/);
const httpsUrl = z
  .string()
  .url()
  .max(2048)
  .refine((s) => {
    const u = new URL(s);
    return u.protocol === "https:" && !u.username && !u.password;
  });
export const profileSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    websiteUri: z.union([httpsUrl, z.literal("")]).optional(),
    profile: z
      .object({ description: z.string().max(750) })
      .strict()
      .optional(),
    phoneNumbers: z
      .object({
        primaryPhone: z.string().max(40),
        additionalPhones: z.array(z.string().max(40)).max(2).optional(),
      })
      .strict()
      .optional(),
  })
  .strict()
  .refine((v) => Object.keys(v).length > 0);
export const postSchema = z
  .object({
    summary: z.string().trim().min(1).max(1500),
    languageCode: z
      .string()
      .regex(/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/)
      .default("en"),
    topicType: z.literal("STANDARD").default("STANDARD"),
    media: z
      .array(
        z
          .object({ mediaFormat: z.literal("PHOTO"), sourceUrl: httpsUrl })
          .strict(),
      )
      .max(1)
      .optional(),
    callToAction: z
      .object({
        actionType: z.enum(["BOOK", "ORDER", "SHOP", "LEARN_MORE", "SIGN_UP"]),
        url: httpsUrl,
      })
      .strict()
      .optional(),
  })
  .strict();
export const mediaSchema = z
  .object({
    mediaFormat: z.enum(["PHOTO", "VIDEO"]),
    sourceUrl: httpsUrl,
    locationAssociation: z
      .object({
        category: z.enum([
          "COVER",
          "PROFILE",
          "EXTERIOR",
          "INTERIOR",
          "PRODUCT",
          "AT_WORK",
          "ADDITIONAL",
        ]),
      })
      .strict(),
    description: z.string().max(1000).optional(),
  })
  .strict();
export function operation(action, q, body = {}) {
  const page = q.get("pageToken");
  if (page && page.length > 4096)
    throw new HttpError(400, "Invalid page token.");
  const params = new URLSearchParams(page ? { pageToken: page } : {});
  if (action === "accounts")
    return [
      "GET",
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts?" +
        params,
    ];
  const account = id.parse(q.get("account"));
  if (action === "locations") {
    params.set("readMask", READ_MASK);
    params.set("pageSize", "100");
    return [
      "GET",
      `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${account}/locations?${params}`,
    ];
  }
  const location = id.parse(q.get("location"));
  const v1 = `https://mybusinessbusinessinformation.googleapis.com/v1/locations/${location}`;
  const v4 = `https://mybusiness.googleapis.com/v4/accounts/${account}/locations/${location}`;
  switch (action) {
    case "profile":
      return ["GET", `${v1}?readMask=${READ_MASK}`];
    case "profile-update": {
      const data = profileSchema.parse(body);
      return ["PATCH", `${v1}?updateMask=${Object.keys(data).join(",")}`, data];
    }
    case "reviews":
      return ["GET", `${v4}/reviews?${params}`];
    case "reply":
      return [
        "PUT",
        `${v4}/reviews/${id.parse(q.get("review"))}/reply`,
        z
          .object({ comment: z.string().trim().min(1).max(4096) })
          .strict()
          .parse(body),
      ];
    case "reply-delete":
      return ["DELETE", `${v4}/reviews/${id.parse(q.get("review"))}/reply`];
    case "posts":
      return ["GET", `${v4}/localPosts?${params}`];
    case "post-create":
      return ["POST", `${v4}/localPosts`, postSchema.parse(body)];
    case "post-update":
      return [
        "PATCH",
        `${v4}/localPosts/${id.parse(q.get("post"))}?updateMask=summary,languageCode,topicType,media,callToAction`,
        postSchema.parse(body),
      ];
    case "post-delete":
      return ["DELETE", `${v4}/localPosts/${id.parse(q.get("post"))}`];
    case "media":
      return ["GET", `${v4}/media?${params}`];
    case "media-create":
      return ["POST", `${v4}/media`, mediaSchema.parse(body)];
    case "media-delete":
      return ["DELETE", `${v4}/media/${id.parse(q.get("media"))}`];
    default:
      throw new HttpError(404, "Unknown operation.");
  }
}
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  try {
    const { origin, redirect: callback } = configuration();
    const q = new URL(req.url, origin).searchParams;
    const action = q.get("action") || "session";
    if (action === "login") {
      if (req.method !== "GET") throw new HttpError(405, "Method not allowed.");
      await rateLimit(
        `login:${req.headers["x-vercel-forwarded-for"] || req.socket?.remoteAddress || "unknown"}`,
        20,
      );
      const state = random(),
        binding = random(),
        verifier = random(),
        nonce = random();
      await save(
        "flow",
        state,
        { binding: hash(binding), verifier, nonce },
        600,
      );
      setCookie(res, FLOW, binding, 600);
      const params = new URLSearchParams({
        client_id: process.env.GBP_GOOGLE_CLIENT_ID,
        redirect_uri: callback,
        response_type: "code",
        scope: `openid email ${SCOPE}`,
        access_type: "offline",
        prompt: "consent",
        state,
        nonce,
        code_challenge: createHash("sha256")
          .update(verifier)
          .digest("base64url"),
        code_challenge_method: "S256",
      });
      return redirect(
        res,
        "https://accounts.google.com/o/oauth2/v2/auth?" + params,
      );
    }
    if (action === "callback") {
      if (req.method !== "GET") throw new HttpError(405, "Method not allowed.");
      const state = q.get("state");
      if (!state || !/^[\w-]{43}$/.test(state))
        throw new HttpError(400, "Invalid OAuth state. Start sign-in again.");
      const encrypted = await redis("GETDEL", key("flow", state));
      const flow = encrypted ? unseal(encrypted) : null;
      if (!flow || !equal(flow.binding, hash(cookie(req, FLOW) || "")))
        throw new HttpError(
          400,
          "Sign-in expired or could not be verified. Start again.",
        );
      if (q.has("error"))
        return redirect(res, origin + "/admin/gbp?error=consent");
      const code = z.string().min(1).max(4096).parse(q.get("code"));
      const tokens = await tokenRequest({
        grant_type: "authorization_code",
        code,
        redirect_uri: callback,
        code_verifier: flow.verifier,
      });
      const { payload } = await jwtVerify(tokens.id_token, JWKS, {
        issuer: ["https://accounts.google.com", "accounts.google.com"],
        audience: process.env.GBP_GOOGLE_CLIENT_ID,
        algorithms: ["RS256"],
      });
      if (
        !equal(payload.nonce, flow.nonce) ||
        payload.email_verified !== true ||
        !payload.sub ||
        !allowed(payload.email)
      )
        throw new HttpError(
          403,
          "This Google account is not an approved administrator.",
        );
      if (!tokens.scope?.split(" ").includes(SCOPE))
        throw new HttpError(
          403,
          "Business Profile permission was not granted. Sign in and grant the requested permission.",
        );
      const previous = await read("tokens", payload.sub);
      const refresh = tokens.refresh_token || previous?.refresh_token;
      if (!refresh)
        throw new HttpError(
          401,
          "Offline permission is missing. Remove the app from Google account permissions and reconnect.",
        );
      await save(
        "tokens",
        payload.sub,
        {
          access_token: tokens.access_token,
          refresh_token: refresh,
          expiresAt: Date.now() + tokens.expires_in * 1000,
        },
        30 * 86400,
      );
      const old = cookie(req, SESSION);
      if (old) await redis("DEL", key("session", old));
      const sid = random();
      await save(
        "session",
        sid,
        {
          sub: payload.sub,
          email: payload.email,
          csrf: random(),
          expiresAt: Date.now() + TTL * 1000,
        },
        TTL,
      );
      setCookie(res, SESSION, sid, TTL);
      return redirect(res, origin + "/admin/gbp");
    }
    const sid = cookie(req, SESSION);
    const session =
      sid && /^[\w-]{43}$/.test(sid) ? await read("session", sid) : null;
    if (!session || session.expiresAt < Date.now() || !allowed(session.email))
      throw new HttpError(
        401,
        "Sign in with an approved administrator account.",
      );
    await rateLimit(session.sub, 90);
    if (action === "session" && req.method === "GET")
      return send(res, 200, { email: session.email, csrf: session.csrf });
    const write = ![
      "session",
      "accounts",
      "locations",
      "profile",
      "reviews",
      "posts",
      "media",
    ].includes(action);
    if (req.method !== (write ? "POST" : "GET"))
      throw new HttpError(405, "Method not allowed.");
    if (write) checkMutation(req, session, origin);
    if (action === "logout" || action === "disconnect") {
      if (action === "disconnect") {
        const tokens = await read("tokens", session.sub);
        if (tokens) {
          const r = await fetch("https://oauth2.googleapis.com/revoke", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ token: tokens.refresh_token }),
            signal: AbortSignal.timeout(10000),
          });
          if (!r.ok && r.status !== 400)
            throw new HttpError(
              502,
              "Google could not revoke access. Try disconnecting again.",
            );
        }
        await redis("DEL", key("tokens", session.sub));
      }
      await redis("DEL", key("session", sid));
      setCookie(res, SESSION, "", 0);
      return send(res, 200, { ok: true });
    }
    let body = req.body || {};
    if (
      Buffer.byteLength(
        typeof body === "string" ? body : JSON.stringify(body),
      ) > 20000
    )
      throw new HttpError(413, "Request is too large.");
    if (typeof body === "string") body = JSON.parse(body);
    const [method, url, data] = operation(action, q, body);
    // Google applies the signed-in user's account/location permissions; no shared service credential.
    const result = await google(session, url, method, data);
    if (write)
      console.info(
        JSON.stringify({
          event: "gbp_mutation",
          actor: hash(session.sub),
          action,
          account: q.get("account"),
          location: q.get("location"),
          at: new Date().toISOString(),
        }),
      );
    return send(res, 200, result);
  } catch (e) {
    const status =
      e instanceof HttpError
        ? e.status
        : e instanceof z.ZodError || e instanceof SyntaxError
          ? 400
          : 500;
    send(res, status, {
      error:
        e instanceof HttpError
          ? e.message
          : status === 400
            ? "Invalid request fields."
            : "GBP request failed securely. Please try signing in again or contact the administrator.",
    });
  }
}
