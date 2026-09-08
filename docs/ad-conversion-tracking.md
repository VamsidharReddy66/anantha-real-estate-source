# Advertising conversion tracking

The site exposes one paid-campaign landing page:

- `/property-consultation`

Use UTM parameters on every ad URL. Recommended minimum:

```text
?utm_source=google&utm_medium=cpc&utm_campaign=nellore_property_consultation
```

Meta example:

```text
?utm_source=facebook&utm_medium=paid_social&utm_campaign=nellore_property_consultation
```

The site stores campaign parameters in session storage and automatically adds
them to analytics events. Names, phone numbers and free-text form values are never included in analytics
payloads. Only categorical choices such as property type and timeline are sent.

## Events

| Event | Meaning | Recommended conversion use |
| --- | --- | --- |
| `page_view` | SPA route view | Reporting only |
| `lead_form_start` | Visitor focuses the consultation form | Funnel diagnostic |
| `lead_submit` | Consultation form continues to WhatsApp | Primary lead |
| `contact_form_submit` | General contact form succeeds | Primary lead |
| `buyer_requirement_submit` | Buyer requirement continues to WhatsApp | Primary lead |
| `seller_lead_submit` | Seller inventory form succeeds | Primary lead |
| `whatsapp_click` | WhatsApp CTA click | Secondary conversion |
| `phone_click` | Telephone CTA click | Secondary conversion |
| `site_visit_click` | Site-visit CTA click | Secondary conversion |

## Google Tag Manager

When `VITE_GTM_ID` is configured, the application pushes the events above to
`window.dataLayer`. Configure GA4, Google Ads and Meta tags inside the same GTM
container. Create custom data-layer variables for the UTM fields you want in
reports. Trigger primary conversion tags only on the four lead events.

## Direct fallback

If GTM is not used, the existing GA4 fallback remains active. Direct Google Ads
and Meta measurement can be enabled with:

```text
VITE_GOOGLE_ADS_ID=AW-123456789
VITE_GOOGLE_ADS_LEAD_LABEL=AbCdEfGhIjk
VITE_META_PIXEL_ID=123456789012345
```

The Google Ads conversion call is emitted for primary lead events. Meta receives
standard `PageView` and `Lead` events plus custom events for the rest.

After configuring production variables, validate with GTM Preview or Google Tag
Assistant, Meta Pixel Helper, and a test lead carrying identifiable UTM values.
