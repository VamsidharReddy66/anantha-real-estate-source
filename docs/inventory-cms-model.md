# Inventory CMS model

The website uses four connected record types.

## Partner company
Public fields: name, logo, profile, represented-project status and website.

Private fields: commercial tier, agreement terms, primary contact, internal notes and publication approval.

## Project
A project belongs to one partner company. Public fields include status (ongoing, upcoming or completed), location, project type, highlights, media, brochure, approvals and price guidance.

Private fields include partner contacts, commercial terms, source documents and publication status.

## Property
A property can optionally belong to a project. Public fields cover type, location, area, facing, floors, price guidance, media and verified availability.

Private fields cover owner name and number, agent name and number, agency, verification notes, documents, internal status and consent.

## Lead
Every buyer enquiry records its source route plus the selected property, project and partner. It is sent to Freshworks when its API connection is configured. WhatsApp delivery is initiated only from approved public property or project content.

## Publication flow

1. Create or submit a private property or project record.
2. Verify availability, authority, content and documents.
3. Mark approved items as publishable.
4. Publish public fields to the inventory.
5. Route buyer enquiry to Freshworks with the relevant record references.
