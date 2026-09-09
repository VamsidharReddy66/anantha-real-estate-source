const clean = (value, max = 1000) => String(value ?? "").trim().slice(0, max);

const getConfig = () => {
  const host = clean(process.env.LEADSQUARED_HOST, 300).replace(/\/$/, "");
  const accessKey = clean(process.env.LEADSQUARED_ACCESS_KEY, 300);
  const secretKey = clean(process.env.LEADSQUARED_SECRET_KEY, 300);
  if (!host || !accessKey || !secretKey) return null;
  if (!/^https:\/\/[a-z0-9.-]+$/i.test(host)) throw new Error("LeadSquared host is invalid.");
  return { host, accessKey, secretKey };
};

const fieldMap = () => {
  try {
    const value = JSON.parse(process.env.LEADSQUARED_FIELD_MAP || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    throw new Error("LEADSQUARED_FIELD_MAP must be valid JSON.");
  }
};

const addMappedFields = (fields, context) => {
  const map = fieldMap();
  for (const [key, attribute] of Object.entries(map)) {
    const value = clean(context[key], 1500);
    if (value && typeof attribute === "string" && /^([A-Za-z][A-Za-z0-9_]*)$/.test(attribute)) {
      fields.push({ Attribute: attribute, Value: value });
    }
  }
};

export const submitLeadSquaredLead = async (lead) => {
  const config = getConfig();
  if (!config) {
    const error = new Error("LeadSquared is not configured.");
    error.code = "LEADSQUARED_NOT_CONFIGURED";
    throw error;
  }

  const firstName = clean(lead.name || lead.ownerName, 120) || "Website enquiry";
  const phone = clean(lead.phone, 30);
  const email = clean(lead.email, 180);
  if (!phone && !email) {
    const error = new Error("A phone number or email address is required.");
    error.code = "LEAD_CONTACT_REQUIRED";
    throw error;
  }

  const fields = [
    { Attribute: "FirstName", Value: firstName },
    ...(phone ? [{ Attribute: "Phone", Value: phone }] : []),
    ...(email ? [{ Attribute: "EmailAddress", Value: email }] : []),
    { Attribute: "Source", Value: "Anantha website" },
    { Attribute: "SearchBy", Value: phone ? "Phone" : "EmailAddress" },
  ];
  addMappedFields(fields, {
    form_type: lead.formType,
    enquiry_type: lead.enquiryType,
    property_slug: lead.propertySlug,
    property_name: lead.propertyName,
    project_slug: lead.projectSlug,
    project_name: lead.projectName,
    partner_name: lead.partnerName,
    listing_source: lead.listingSource,
    owner_name: lead.ownerName,
    owner_phone: lead.phone,
    agent_name: lead.agentName,
    agent_phone: lead.agentPhone,
    agent_agency: lead.agentAgency,
    message: lead.message,
    attribution: lead.attribution,
    consent: lead.consent ? "true" : "false",
  });

  const endpoint = new URL("/v2/LeadManagement.svc/Lead.CreateOrUpdate", config.host);
  endpoint.searchParams.set("postUpdatedLead", "false");
  endpoint.searchParams.set("accessKey", config.accessKey);
  endpoint.searchParams.set("secretKey", config.secretKey);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(fields),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body?.Status?.toLowerCase?.() === "failure") {
    const error = new Error(clean(body?.Message || body?.ExceptionMessage || "LeadSquared rejected this lead.", 300));
    error.code = "LEADSQUARED_REJECTED";
    error.status = response.status;
    throw error;
  }

  return { id: body?.Message?.Id || body?.Message || null };
};
