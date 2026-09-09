import { submitLeadSquaredLead } from "../server/leadsquared.mjs";

const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

const clean = (value, max = 1500) => String(value ?? "").trim().slice(0, max);
const phoneValid = (value) => /^[+0-9][0-9\s-]{7,17}$/.test(value);
const allowedForms = new Set(["contact", "buyer_requirement", "property_consultation", "property_enquiry", "project_enquiry"]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Method not allowed" });
  }

  const body = req.body || {};
  const formType = clean(body.formType, 60);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 180).toLowerCase();
  const name = clean(body.name, 120);

  if (!allowedForms.has(formType)) return send(res, 400, { error: "Unsupported lead form." });
  if (!name || (!phone && !email)) return send(res, 400, { error: "Name and a phone number or email address are required." });
  if (phone && !phoneValid(phone)) return send(res, 400, { error: "Please enter a valid phone number." });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { error: "Please enter a valid email address." });

  const lead = {
    formType,
    name,
    phone,
    email,
    enquiryType: clean(body.enquiryType, 100),
    propertySlug: clean(body.propertySlug, 160),
    propertyName: clean(body.propertyName, 180),
    projectSlug: clean(body.projectSlug, 160),
    projectName: clean(body.projectName, 180),
    partnerName: clean(body.partnerName, 180),
    message: clean(body.message, 1500),
    consent: body.consent === true,
    attribution: clean(body.attribution, 1500),
  };

  try {
    const result = await submitLeadSquaredLead(lead);
    return send(res, 201, { ok: true, leadId: result.id, message: "Your enquiry has been received." });
  } catch (error) {
    const configured = error?.code !== "LEADSQUARED_NOT_CONFIGURED";
    console.error("LeadSquared lead capture failed", { code: error?.code, status: error?.status });
    return send(res, configured ? 502 : 503, {
      error: configured ? "We could not save your enquiry right now. Please call or WhatsApp Anantha Real Estate." : "Lead routing is being configured. Please call or WhatsApp Anantha Real Estate.",
      code: error?.code || "LEAD_CAPTURE_FAILED",
    });
  }
}
