# Secure ticket review intake assumptions

This version does not require NJMCDirect API credentials. It is designed for a human-assisted "free legal advice before you pay" workflow.

## Assumed flow

1. Visitor chooses one ticket-finding option:
   - name and date of birth
   - name and driver's license number
   - ticket number
2. Visitor provides contact name, phone number, optional email, and preferred response method.
3. Browser sends the request by HTTPS POST to `/api/ticket-review-intake`.
4. The backend validates the fields.
5. The backend forwards the request to a secure office intake destination.
6. Staff reviews official court systems and follows up with the visitor.

## Security assumptions

- The production site is served only over HTTPS.
- Sensitive identifiers are not placed in URLs.
- Sensitive identifiers are not stored in browser `localStorage` or `sessionStorage`.
- The server does not log ticket numbers, license numbers, dates of birth, or notes.
- Intake submissions route to a PII-aware CRM, secure form backend, or encrypted intake service.
- Do not route dates of birth or license numbers through ordinary unencrypted email.

## Environment variables

Copy `.env.example` into the production environment and set:

- `INTAKE_WEBHOOK_URL`
- `INTAKE_WEBHOOK_SECRET`, if your intake service supports bearer authentication
- `ALLOWED_ORIGIN=https://njtrafficticket.com`

## Current behavior

Until `INTAKE_WEBHOOK_URL` is configured, `/api/ticket-review-intake` validates the request and returns a setup message instead of accepting live sensitive submissions.

## Intake payload

```json
{
  "submittedAt": "2026-05-09T00:00:00.000Z",
  "source": "njtrafficticket.com",
  "contact": {
      "name": "First Last",
      "phone": "555-555-5555",
      "email": "optional@example.com",
      "preferredContact": "text"
  },
  "ticketIdentifier": {
    "lookupMode": "nameDob",
    "fullName": "First Last",
    "dateOfBirth": "YYYY-MM-DD"
  },
  "notes": "Optional urgency notes",
  "consent": true,
  "requestedAction": "Free legal consult before paying a New Jersey traffic ticket"
}
```
