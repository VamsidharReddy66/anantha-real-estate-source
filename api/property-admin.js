import { createHash, createDecipheriv, timingSafeEqual } from "node:crypto";

const SESSION = "__Host-gbp-session";
const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Cache-Control", "no-store");
  Object.entries(JSON_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

function hash(value) { return createHash("sha256").update(value).digest("hex"); }
function equal(a, b) {
  return typeof a === "string" && typeof b === "string" && Buffer.byteLength(a) === Buffer.byteLength(b) && timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
function cookie(req, name) {
  return (req.headers.cookie || "").split(";").map((s) => s.trim()).find((s) => s.startsWith(name + "="))?.slice(name.length + 1);
}
function allowed(email) {
  return typeof email === "string" && (process.env.GBP_ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}
function unseal(value) {
  const b = Buffer.from(value, "base64");
  const decipher = createDecipheriv("aes-256-gcm", Buffer.from(process.env.GBP_ENCRYPTION_KEY, "base64"), b.subarray(0, 12));
  decipher.setAuthTag(b.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(b.subarray(28)), decipher.final()]).toString("utf8"));
}
async function redis(...command) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error("Admin session storage unavailable");
  const data = await r.json();
  return data.result;
}
async function requireAdmin(req) {
  const sid = cookie(req, SESSION);
  if (!sid || !/^[\w-]{43}$/.test(sid)) return null;
  const key = `gbp:${hash(process.env.GBP_APP_ORIGIN)}:session:${hash(sid)}`;
  const encrypted = await redis("GET", key);
  const session = encrypted ? unseal(encrypted) : null;
  if (!session || session.expiresAt < Date.now() || !allowed(session.email)) return null;
  return session;
}
function databaseUrl() {
  return process.env.ANANTHA_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
}

export default async function handler(req, res) {
  try {
    if (!databaseUrl()) return send(res, 503, { error: "Inventory database is not configured." });
    const session = await requireAdmin(req);
    if (!session) return send(res, 401, { error: "Administrator sign-in required." });
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(databaseUrl());

    if (req.method === "GET") {
      const rows = await sql`SELECT * FROM property_listings ORDER BY created_at DESC LIMIT 250`;
      return send(res, 200, { email: session.email, csrf: session.csrf, listings: rows });
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return send(res, 405, { error: "Method not allowed." });
    }
    if (req.headers.origin !== process.env.GBP_APP_ORIGIN || !equal(req.headers["x-csrf-token"], session.csrf)) {
      return send(res, 403, { error: "Request verification failed. Reload the admin page." });
    }

    const body = req.body || {};
    const publicId = String(body.publicId || "").trim();
    const verificationStatus = String(body.verificationStatus || "").trim().toUpperCase();
    const adminNotes = String(body.adminNotes || "").trim().slice(0, 1500);
    if (!publicId || !["PENDING", "APPROVED", "NEEDS_CORRECTION", "REJECTED"].includes(verificationStatus)) {
      return send(res, 400, { error: "Invalid property or verification status." });
    }

    await sql`ALTER TABLE property_listings ADD COLUMN IF NOT EXISTS admin_notes TEXT`;
    await sql`ALTER TABLE property_listings ADD COLUMN IF NOT EXISTS verified_by TEXT`;
    await sql`ALTER TABLE property_listings ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ`;
    const status = verificationStatus === "APPROVED" ? "VERIFIED" : verificationStatus === "REJECTED" ? "REJECTED" : "NEW";
    const result = await sql`
      UPDATE property_listings
      SET verification_status=${verificationStatus}, status=${status}, admin_notes=${adminNotes}, verified_by=${session.email}, verified_at=NOW(), updated_at=NOW()
      WHERE public_id=${publicId}
      RETURNING public_id, verification_status, status, admin_notes, verified_by, verified_at
    `;
    if (!result.length) return send(res, 404, { error: "Property not found." });
    return send(res, 200, { ok: true, listing: result[0] });
  } catch (error) {
    console.error("property-admin error", error);
    return send(res, 500, { error: "Could not load or update property verification." });
  }
}
