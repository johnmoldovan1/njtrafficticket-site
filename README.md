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
- `INTAKE_WEBHOOK_URL`
- `INTAKE_WEBHOOK_SECRET`, if supported by your intake service
- `ALLOWED_ORIGIN=https://njtrafficticket.com`

## SEO notes

- Keep this site unique. Do not copy traffic ticket pages from `moldovanlegal.com`.
- Link back to Moldovan Legal only where lawyer help is contextually useful.
- Add separate long-form pages over time for individual tickets, counties, and municipal courts.
- Update ticket data periodically against official NJ MVC and NJ Courts sources.
- Expand each landing page with real case examples, court process notes, FAQs, and links to relevant official sources before scaling to many more pages.
