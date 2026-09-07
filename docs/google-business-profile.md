# Google Business Profile administration

Admin URL: `https://www.anantharealestate.in/admin/gbp`
Existing Vercel project: `verc-dep01` (`prj_zl8sCYO0ihS3v4DFqbgDf70bKHwd`).

## Deployment configuration

Set these in the existing Vercel project's **Production** environment and redeploy. All are server-only; never use a `VITE_` prefix.

| Variable | Value |
| --- | --- |
| `GBP_APP_ORIGIN` | `https://www.anantharealestate.in` (HTTPS origin, no trailing slash) |
| `GBP_GOOGLE_CLIENT_ID` | Google Cloud OAuth Web application client ID |
| `GBP_GOOGLE_CLIENT_SECRET` | Matching OAuth client secret |
| `GBP_ADMIN_EMAILS` | Comma-separated exact Google account emails permitted to administer GBP |
| `GBP_ENCRYPTION_KEY` | Base64-encoded 32 random bytes, generated securely |
| `UPSTASH_REDIS_REST_URL` | HTTPS Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST credential with read/write access |

Generate the encryption key locally with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` and enter it directly in Vercel. Do not commit or send credentials in chat. Use a dedicated Redis database or appropriately scoped credentials. Storage is required for OAuth state, sessions, encrypted tokens, and rate limits. Redis is separate from the CRM; no CRM integration is required.

Missing configuration returns HTTP 503 with a safe setup message. Public website pages continue to work. Never use production credentials in untrusted preview branches. A preview integration requires a separate OAuth client/origin, redirect registration and isolated storage.

## Google Cloud steps

1. Confirm the Cloud project has GBP API access approval and nonzero quota. Existing Search Console verification or Google Analytics does **not** grant GBP API access.
2. Enable the APIs required here: **My Business Account Management API**, **My Business Business Information API**, and **Google My Business API** (v4 reviews/posts/media). Follow Google's basic setup instructions for any additional GBP APIs needed by the project.
3. Configure Google Auth Platform branding/audience, authorized domain, support email and applicable privacy-policy/terms URLs. Create an OAuth **Web application** client.
4. Register this exact authorized redirect URI: `https://www.anantharealestate.in/api/gbp?action=callback`. This flow is server-side; no browser client secret or JavaScript OAuth SDK is used.
5. Request `openid`, `email`, and `https://www.googleapis.com/auth/business.manage`. Add intended administrators as test users if the OAuth application remains in Testing. Testing mode refresh tokens for this non-basic scope normally expire after seven days. For ongoing production use, move to Production and complete the verification requirements shown by Google. Organization-internal applications have different audience rules.
6. Set `GBP_ADMIN_EMAILS` explicitly. Each listed person must also have the appropriate owner/manager access in Google to the intended business profiles. Reviews/replies require verified locations; posts/media eligibility remains subject to Google's restrictions.
7. Deploy, visit the admin URL on the configured canonical origin, sign in, grant all requested permissions, then discover accounts and locations.

GBP approval and OAuth consent verification are separate processes. Neither can be completed by changing repository code. No Google account has been connected merely by deploying this feature.

## Implemented scope

- Paginated discovery of accessible accounts and locations.
- Profile read: name, address, phone numbers, website, hours, description, categories and metadata.
- Profile update UI/API: title, website, description, primary/additional phone numbers. Address/hours/category editing is intentionally not exposed in this first interface.
- Paginated reviews with create/update/delete of **owner replies**. Customer reviews cannot be edited or deleted by this integration.
- Paginated posts; create/edit standard updates with optional photo and CTA; delete posts. Event/offer creation is not implemented.
- Paginated owner media; create PHOTO/VIDEO from a public HTTPS source URL with category and description; delete owner media. Direct binary upload and customer-media moderation are not implemented. Use `PROFILE`, not deprecated `LOGO`.
- Explicit confirmation before public mutations. The browser's WhatsApp/CRM flows are unchanged.

## Security and request flow

`api/gbp.js` invokes `server/gbp.mjs` in a Vercel Node function. The admin browser only calls this same-origin API.

1. Login creates random, ten-minute OAuth state, PKCE verifier and OIDC nonce in encrypted Redis storage. A Secure, HttpOnly, SameSite=Lax `__Host-gbp-flow` cookie binds the flow to the initiating browser.
2. Callback atomically consumes state (`GETDEL`), checks the browser binding, exchanges the authorization code on the server and verifies the signed Google ID token using Google's JWKS. Checks include issuer, audience, expiry, RS256, nonce, verified email and exact administrator allowlist. It also checks that `business.manage` was granted.
3. Access and refresh tokens are AES-256-GCM encrypted in Redis per Google subject. They are never returned to the client or included in application logs. Tokens have a 30-day storage retention TTL, renewed at reconnection/refresh; expired/revoked grants require reconnection.
4. Browser receives only a random opaque eight-hour session cookie. Redis stores the encrypted session and CSRF secret. Session IDs are hashed in Redis keys; authorization/expiry is checked on every API request. The API returns a CSRF token to the authenticated UI, which keeps it in React memory.
5. Every mutation requires POST, JSON, the exact configured Origin and the session's CSRF token. Resource identifiers and writable fields are validated; outbound Google API hosts/paths are fixed. Google enforces the connected user's resource permissions, with no shared service-account credential.
6. Expiring access tokens refresh on the server. Writes are never automatically retried. Google error bodies are not passed through to the browser. Mutation audit logs contain a hashed actor ID, action, account/location identifiers and time, not review text or tokens.
7. Login and authenticated requests have Redis-backed per-minute limits. The admin area disables app analytics, is marked noindex and sets CSP, anti-framing and no-store headers. No tokens are stored in browser localStorage/sessionStorage.
8. Sign out deletes the current session. Disconnect revokes the Google grant and deletes stored tokens/current session. Other sessions cannot call Google once tokens are removed; reconnecting establishes new credentials. Removing an email from the allowlist denies its sessions after the new environment configuration is deployed.

Always use the canonical admin origin. Do not put owner documents or private CRM information in public datasets. Rotating the encryption key invalidates existing encrypted sessions and token records; reconnect users afterwards. Platform access logs may include OAuth callback query parameters: restrict log access/retention and never log token responses.

## Official API references checked before implementation (2026-09-07)

| Operation | Official endpoint |
| --- | --- |
| Accounts | `GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts` |
| Locations | `GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{account}/locations?readMask=...` |
| Profile | `GET/PATCH https://mybusinessbusinessinformation.googleapis.com/v1/locations/{location}`; GET uses `readMask`, PATCH uses `updateMask` |
| Reviews | `GET https://mybusiness.googleapis.com/v4/accounts/{account}/locations/{location}/reviews` |
| Reply | `PUT/DELETE https://mybusiness.googleapis.com/v4/accounts/{account}/locations/{location}/reviews/{review}/reply` |
| Posts | `GET/POST https://mybusiness.googleapis.com/v4/accounts/{account}/locations/{location}/localPosts`; PATCH/DELETE append `/{post}` |
| Media | `GET/POST https://mybusiness.googleapis.com/v4/accounts/{account}/locations/{location}/media`; DELETE appends `/{media}` |

References:
- [Account discovery](https://developers.google.com/my-business/reference/accountmanagement/rest/v1/accounts/list)
- [Location discovery](https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations/list)
- [Profile read](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations/get) and [update](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations/patch)
- [Review list](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list), [reply update](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/updateReply), [reply deletion](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/deleteReply)
- [Posts](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts)
- [Media](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media) and [media creation notes](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media/create)
- [OAuth web-server flow](https://developers.google.com/identity/protocols/oauth2/web-server) and [OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)
- [GBP access prerequisites](https://developers.google.com/my-business/content/prereqs) and [basic setup](https://developers.google.com/my-business/content/basic-setup)

## Verification and operations

Run `npm run test:gbp`, `npx tsc --noEmit -p tsconfig.app.json`, and `npm run build`. Security tests use mocked Redis/Google responses and never publish to GBP. Use `vercel dev` with server-only local configuration for full local integration; plain Vite only serves the frontend.

After configuration, manually verify sign-in (including denial for an unlisted account), account/location discovery, profile read, pagination, and disconnect. Use an approved test location/content for write checks; do not create public test replies/posts without authorization. Missing Google credentials/approval prevents a live OAuth and GBP write verification, even when the production build succeeds.
