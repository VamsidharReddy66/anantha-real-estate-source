const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

function send(res, status, body) {
  res.statusCode = status;
  Object.entries(JSON_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

function clean(value, max = 1000) {
  return String(value ?? "").trim().slice(0, max);
}

function validPhone(value) {
  return /^[+0-9][0-9\s-]{7,17}$/.test(value);
}

function sqlConfig() {
  const url = process.env.ANANTHA_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) return null;
  return { url };
}

async function getSql() {
  const config = sqlConfig();
  if (!config) return null;
  const { neon } = await import("@neondatabase/serverless");
  return neon(config.url);
}

async function ensureSchema(sql) {
  await sql`CREATE TABLE IF NOT EXISTS property_listings (
    id BIGSERIAL PRIMARY KEY,
    public_id TEXT UNIQUE NOT NULL,
    owner_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    seller_role TEXT NOT NULL DEFAULT 'Owner',
    listing_source TEXT NOT NULL DEFAULT 'Direct owner',
    agent_name TEXT,
    agent_phone TEXT,
    agent_agency TEXT,
    property_type TEXT NOT NULL,
    purpose TEXT NOT NULL DEFAULT 'Sell',
    location TEXT NOT NULL,
    locality TEXT,
    area TEXT,
    expected_price TEXT,
    facing TEXT,
    road_access TEXT,
    approvals TEXT,
    notes TEXT,
    source TEXT NOT NULL DEFAULT 'Anantha website owner form',
    status TEXT NOT NULL DEFAULT 'NEW',
    verification_status TEXT NOT NULL DEFAULT 'PENDING',
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`ALTER TABLE property_listings ADD COLUMN IF NOT EXISTS listing_source TEXT NOT NULL DEFAULT 'Direct owner'`;
  await sql`ALTER TABLE property_listings ADD COLUMN IF NOT EXISTS agent_name TEXT`;
  await sql`ALTER TABLE property_listings ADD COLUMN IF NOT EXISTS agent_phone TEXT`;
  await sql`ALTER TABLE property_listings ADD COLUMN IF NOT EXISTS agent_agency TEXT`;
  await sql`CREATE INDEX IF NOT EXISTS property_listings_status_idx ON property_listings(status)`;
  await sql`CREATE INDEX IF NOT EXISTS property_listings_location_idx ON property_listings(location)`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Method not allowed" });
  }

  const body = req.body || {};
  const data = {
    ownerName: clean(body.ownerName || body.name, 120),
    phone: clean(body.phone, 30),
    sellerRole: clean(body.sellerRole || "Owner", 40),
    listingSource: clean(body.listingSource || "Direct owner", 50),
    agentName: clean(body.agentName, 120),
    agentPhone: clean(body.agentPhone, 30),
    agentAgency: clean(body.agentAgency, 120),
    propertyType: clean(body.propertyType || body.type, 80),
    purpose: clean(body.purpose || "Sell", 30),
    location: clean(body.location, 180),
    locality: clean(body.locality, 180),
    area: clean(body.area, 100),
    expectedPrice: clean(body.expectedPrice, 100),
    facing: clean(body.facing, 60),
    roadAccess: clean(body.roadAccess, 120),
    approvals: clean(body.approvals, 300),
    notes: clean(body.notes, 1500),
    consent: body.consent === true,
  };

  if (!data.ownerName || !data.phone || !data.propertyType || !data.location) {
    return send(res, 400, { error: "Owner name, phone, property type and location are required." });
  }
  if (!validPhone(data.phone)) return send(res, 400, { error: "Please enter a valid owner phone number." });
  if (data.listingSource === "Agent-listed property" && (!data.agentName || !data.agentPhone)) {
    return send(res, 400, { error: "Agent name and phone number are required for an agent-listed property." });
  }
  if (data.agentPhone && !validPhone(data.agentPhone)) return send(res, 400, { error: "Please enter a valid agent phone number." });
  if (!data.consent) return send(res, 400, { error: "Owner consent is required before submission." });

  const sql = await getSql();
  if (!sql) {
    return send(res, 503, {
      error: "Inventory database is not configured yet.",
      code: "DATABASE_NOT_CONFIGURED"
    });
  }

  try {
    await ensureSchema(sql);
    const publicId = `PROP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    await sql`INSERT INTO property_listings (
      public_id, owner_name, phone, seller_role, listing_source, agent_name, agent_phone, agent_agency,
      property_type, purpose, location, locality, area, expected_price, facing, road_access, approvals, notes, consent
    ) VALUES (
      ${publicId}, ${data.ownerName}, ${data.phone}, ${data.sellerRole}, ${data.listingSource}, ${data.agentName}, ${data.agentPhone}, ${data.agentAgency},
      ${data.propertyType}, ${data.purpose},
      ${data.location}, ${data.locality}, ${data.area}, ${data.expectedPrice}, ${data.facing},
      ${data.roadAccess}, ${data.approvals}, ${data.notes}, ${data.consent}
    )`;
    return send(res, 201, {
      ok: true,
      propertyId: publicId,
      status: "NEW",
      message: "Property received. Anantha Real Estate will contact you for verification before it is marketed."
    });
  } catch (error) {
    console.error("property-listings error", error);
    return send(res, 500, { error: "Could not save the property. Please try again or contact Anantha Real Estate." });
  }
}
