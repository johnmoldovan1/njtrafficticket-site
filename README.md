# NJTrafficTicket.com starter site

This is a starter site for `njtrafficticket.com` with a static self-help guide and a server-side free-consult intake scaffold.

## Purpose

The site is built as a free self-help traffic ticket guide first, with a natural referral path to Moldovan Legal when a visitor has serious risk or needs counsel.

## Files

- `index.html` - SEO page structure, content, attorney advertising disclaimer, and official source links.
- `styles.css` - Responsive visual system.
- `app.js` - Ticket data and interactive result logic.
- `server.js` - Secure server-side route for human-assisted free traffic ticket consult intake.
- `render.yaml` - Render Blueprint for a quick Node deployment.
- `.env.example` - Production environment variable template.
- `SECURE_INTAKE_ASSUMPTIONS.md` - Security assumptions for the sensitive intake flow.
- `speeding-ticket-nj/`, `careless-driving-nj/`, `reckless-driving-nj/`, `nj-points-system/`, `cdl-traffic-ticket-nj/`, `out-of-state-driver-nj-ticket/` - first SEO landing page batch.
- `data/pages.json` and `scripts/generate-pages.mjs` - edit traffic ticket content in one place, then regenerate pages and sitemap.

## Deployment

For the self-help page only, these files can still be hosted as static files.

For the ticket review request form, deploy the Node server and configure a secure intake destination:

```bash
npm run generate
npm start
```

Required production settings:

- HTTPS only
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `SMS_TO_NUMBER=+18665534251`
- `INTAKE_WEBHOOK_URL`, optional CRM/secure backup
- `INTAKE_WEBHOOK_SECRET`, optional if supported by your intake service
- `ALLOWED_ORIGIN=https://njtrafficticket.com`

The consult form sends SMS through Twilio when the Twilio variables are configured. Without those variables, the form validates but returns a setup message instead of accepting sensitive submissions.

## Current live deployment

- GitHub: `https://github.com/johnmoldovan1/njtrafficticket-site`
- Render service: `https://dashboard.render.com/web/srv-d7vi2ad0lvsc73ft13i0`
- Temporary live URL: `https://njtrafficticket.onrender.com`

The custom domains are already attached in Render:

- `njtrafficticket.com`
- `www.njtrafficticket.com`

They remain unverified until DNS is updated at WordPress.com, where this domain currently uses `ns1.wordpress.com`, `ns2.wordpress.com`, and `ns3.wordpress.com`.

DNS records to add/update:

| Host | Type | Value |
| --- | --- | --- |
| `@` / root | `A` | `216.24.57.1` |
| `www` | `CNAME` | `njtrafficticket.onrender.com` |

Remove conflicting old WordPress web records:

- root `A` records pointing to `192.0.78.24`
- root `A` records pointing to `192.0.78.25`
- `www` CNAME pointing back to `njtrafficticket.com`

## SEO notes

- Keep this site unique. Do not copy traffic ticket pages from `moldovanlegal.com`.
- Link back to Moldovan Legal only where lawyer help is contextually useful.
- Add separate long-form pages over time for individual tickets, counties, and municipal courts.
- Update ticket data periodically against official NJ MVC and NJ Courts sources.
- Expand each landing page with real case examples, court process notes, FAQs, and links to relevant official sources before scaling to many more pages.
