import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const COOKIE = "__Host-property-admin";
const MAX_AGE = 8 * 60 * 60;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function config() {
  const email = String(process.env.PROPERTY_ADMIN_EMAIL || "").trim().toLowerCase();
  const password = String(process.env.PROPERTY_ADMIN_PASSWORD || "");
  const secret = String(process.env.PROPERTY_ADMIN_SESSION_SECRET || "");
  const origin = String(process.env.GBP_APP_ORIGIN || "https://www.anantharealestate.in").replace(/\/$/, "");
  if (!email || !password || secret.length < 32) return null;
  return { email, password, secret, origin };
}

function safeEqual(a, b) {
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}

function sign(payload, secret) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function setCookie(res, value, maxAge) {
  res.setHeader("Set-Cookie", `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);
}

export default async function handler(req, res) {
  const cfg = config();
  if (!cfg) return send(res, 503, { error: "Property admin login is not configured yet." });

  const action = new URL(req.url, cfg.origin).searchParams.get("action") || "session";

  if (action === "login") {
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
    if (req.headers.origin !== cfg.origin) return send(res, 403, { error: "Invalid request origin." });
    const body = req.body || {};
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!safeEqual(email, cfg.email) || !safeEqual(password, cfg.password)) {
      return send(res, 401, { error: "Invalid email or password." });
    }
    const session = {
      email: cfg.email,
      csrf: randomBytes(24).toString("base64url"),
      exp: Date.now() + MAX_AGE * 1000,
    };
    setCookie(res, sign(session, cfg.secret), MAX_AGE);
    return send(res, 200, { ok: true, email: session.email, csrf: session.csrf });
  }

  if (action === "logout") {
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
    if (req.headers.origin !== cfg.origin) return send(res, 403, { error: "Invalid request origin." });
    setCookie(res, "", 0);
    return send(res, 200, { ok: true });
  }

  if (req.method !== "GET") return send(res, 405, { error: "Method not allowed." });
  return send(res, 200, { ok: true });
}
