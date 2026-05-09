import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 8097);
const intakeWebhookUrl = process.env.INTAKE_WEBHOOK_URL || "";
const intakeWebhookSecret = process.env.INTAKE_WEBHOOK_SECRET || "";
const smsToNumber = process.env.SMS_TO_NUMBER || "+18665534251";
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || "";
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || "";
const twilioFromNumber = process.env.TWILIO_FROM_NUMBER || "";
const timeoutMs = Number(process.env.INTAKE_TIMEOUT_MS || 12000);
const allowedOrigin = process.env.ALLOWED_ORIGIN || "";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(JSON.stringify(payload));
}

async function readJson(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 20_000) {
      throw new Error("Request is too large.");
    }
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sanitizeIntakePayload(payload) {
  return {
    lookupMode: String(payload.lookupMode || "").trim(),
    nameForDob: String(payload.nameForDob || "").trim(),
    dateOfBirth: String(payload.dateOfBirth || "").trim(),
    nameForLicense: String(payload.nameForLicense || "").trim(),
    licenseNumber: String(payload.licenseNumber || "").trim(),
    ticketNumber: String(payload.ticketNumber || "").trim(),
    contactName: String(payload.contactName || "").trim(),
    phone: String(payload.phone || "").trim(),
    email: String(payload.email || "").trim(),
    preferredContact: String(payload.preferredContact || "").trim(),
    notes: String(payload.notes || "").trim(),
    consent: Boolean(payload.consent)
  };
}

function validateIntake(payload) {
  const errors = [];
  const allowedModes = new Set(["nameDob", "nameLicense", "ticketNumber"]);
  const allowedContactMethods = new Set(["text", "email", "phone"]);

  if (!payload.consent) errors.push("Consent is required before submitting sensitive ticket information.");
  if (!payload.contactName) errors.push("Your name is required.");
  if (!payload.phone) errors.push("A callback phone number is required.");
  if (!allowedContactMethods.has(payload.preferredContact)) errors.push("Choose whether you prefer text, email, or phone.");
  if (payload.preferredContact === "email" && !payload.email) errors.push("Email address is required if you prefer email.");
  if (payload.contactName && !/^[A-Za-z .,'-]{2,80}$/.test(payload.contactName)) errors.push("Your name format looks invalid.");
  if (payload.phone && !/^[0-9()+.\- x]{7,24}$/i.test(payload.phone)) errors.push("Phone number format looks invalid.");
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.push("Email format looks invalid.");
  if (payload.notes.length > 1000) errors.push("Notes must be under 1,000 characters.");
  if (!allowedModes.has(payload.lookupMode)) errors.push("Choose one lookup option.");

  if (payload.lookupMode === "nameDob") {
    if (!payload.nameForDob) errors.push("Full name is required for name and date of birth lookup.");
    if (!payload.dateOfBirth) errors.push("Date of birth is required for name and date of birth lookup.");
    if (payload.nameForDob && !/^[A-Za-z .,'-]{2,80}$/.test(payload.nameForDob)) errors.push("Name format looks invalid.");
    if (payload.dateOfBirth && !/^\d{4}-\d{2}-\d{2}$/.test(payload.dateOfBirth)) errors.push("Date of birth format looks invalid.");
  }

  if (payload.lookupMode === "nameLicense") {
    if (!payload.nameForLicense) errors.push("Full name is required for name and driver's license lookup.");
    if (!payload.licenseNumber) errors.push("Driver's license number is required for name and driver's license lookup.");
    if (payload.nameForLicense && !/^[A-Za-z .,'-]{2,80}$/.test(payload.nameForLicense)) errors.push("Name format looks invalid.");
    if (payload.licenseNumber && !/^[A-Za-z0-9-]{4,32}$/.test(payload.licenseNumber)) errors.push("License number format looks invalid.");
  }

  if (payload.lookupMode === "ticketNumber") {
    if (!payload.ticketNumber) errors.push("Ticket number is required for ticket number lookup.");
    if (payload.ticketNumber && !/^[A-Za-z0-9-]{3,32}$/.test(payload.ticketNumber)) errors.push("Ticket number format looks invalid.");
  }

  return errors;
}

function buildTicketIdentifier(payload) {
  if (payload.lookupMode === "nameDob") {
    return {
      lookupMode: "nameDob",
      fullName: payload.nameForDob,
      dateOfBirth: payload.dateOfBirth
    };
  }

  if (payload.lookupMode === "nameLicense") {
    return {
      lookupMode: "nameLicense",
      fullName: payload.nameForLicense,
      licenseNumber: payload.licenseNumber
    };
  }

  return {
    lookupMode: "ticketNumber",
    ticketNumber: payload.ticketNumber
  };
}

function buildIntakePayload(payload) {
  return {
    submittedAt: new Date().toISOString(),
    source: "njtrafficticket.com",
    contact: {
      name: payload.contactName,
      phone: payload.phone,
      email: payload.email || undefined,
      preferredContact: payload.preferredContact
    },
    ticketIdentifier: buildTicketIdentifier(payload),
    notes: payload.notes || undefined,
    consent: payload.consent,
    requestedAction: "Free legal consult before paying a New Jersey traffic ticket"
  };
}

function formatSmsBody(payload) {
  const id = payload.ticketIdentifier;
  const lines = [
    "NJTrafficTicket free consult request",
    `Contact: ${payload.contact.name}`,
    `Phone: ${payload.contact.phone}`,
    `Email: ${payload.contact.email || "not provided"}`,
    `Preferred: ${payload.contact.preferredContact}`,
    `Lookup: ${id.lookupMode}`
  ];

  if (id.lookupMode === "nameDob") {
    lines.push(`Name on ticket: ${id.fullName}`);
    lines.push(`DOB: ${id.dateOfBirth}`);
  }

  if (id.lookupMode === "nameLicense") {
    lines.push(`Name on ticket: ${id.fullName}`);
    lines.push(`DL: ${id.licenseNumber}`);
  }

  if (id.lookupMode === "ticketNumber") {
    lines.push(`Ticket: ${id.ticketNumber}`);
  }

  if (payload.notes) {
    lines.push(`Notes: ${payload.notes}`);
  }

  return lines.join("\n").slice(0, 1500);
}

async function sendTwilioSms(intakePayload, signal) {
  if (!twilioAccountSid || !twilioAuthToken || !twilioFromNumber) {
    return { configured: false };
  }

  const form = new URLSearchParams({
    To: smsToNumber,
    From: twilioFromNumber,
    Body: formatSmsBody(intakePayload)
  });
  const credentials = Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString("base64");
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`, {
    method: "POST",
    signal,
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  if (!response.ok) {
    return { configured: true, ok: false };
  }

  return { configured: true, ok: true };
}

async function handleTicketReviewIntake(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (allowedOrigin) {
    const origin = request.headers.origin;
    if (origin && origin !== allowedOrigin && !origin.includes("localhost")) {
      sendJson(response, 403, { error: "Origin not allowed" });
      return;
    }
  }

  let payload;
  try {
    payload = sanitizeIntakePayload(await readJson(request));
  } catch {
    sendJson(response, 400, { error: "Invalid request", message: "The review request could not be read." });
    return;
  }

  const errors = validateIntake(payload);
  if (errors.length) {
    sendJson(response, 400, { error: "Check the ticket details", message: "Some required details are missing or appear invalid.", nextSteps: errors });
    return;
  }

  const intakePayload = buildIntakePayload(payload);

  if (!intakeWebhookUrl && (!twilioAccountSid || !twilioAuthToken || !twilioFromNumber)) {
    sendJson(response, 501, {
      error: "Intake routing not configured",
      message: "The review form is ready, but SMS delivery has not been configured yet.",
      nextSteps: [
        "Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER on Render.",
        "SMS will be sent to 866-553-4251.",
        "Optional: also add INTAKE_WEBHOOK_URL for a CRM or secure backup."
      ]
    });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const deliveries = [];

    const smsDelivery = await sendTwilioSms(intakePayload, controller.signal);
    if (smsDelivery.configured) {
      deliveries.push(smsDelivery.ok ? "sms" : "sms_failed");
    }

    if (intakeWebhookUrl) {
      const intakeResponse = await fetch(intakeWebhookUrl, {
        method: "POST",
        signal: controller.signal,
        headers: {
          ...(intakeWebhookSecret ? { "Authorization": `Bearer ${intakeWebhookSecret}` } : {}),
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(intakePayload)
      });
      deliveries.push(intakeResponse.ok ? "webhook" : "webhook_failed");
    }

    if (!deliveries.includes("sms") && !deliveries.includes("webhook")) {
      sendJson(response, 502, {
        error: "Review request not delivered",
        message: "The text message could not be sent. Please call the office."
      });
      return;
    }

    sendJson(response, 202, {
      title: "Review request received",
      message: "The office will review the ticket information and follow up with free advice before you decide whether to pay.",
      nextSteps: [
        "Do not pay the ticket online until you understand the consequences.",
        "Watch for a text, email, or call from the office.",
        "Call 551-430-5800 if the court date is today or tomorrow."
      ]
    });
  } catch {
    sendJson(response, 504, {
      error: "Review request timed out",
      message: "The secure intake destination did not respond in time. Please call the office."
    });
  } finally {
    clearTimeout(timer);
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  let requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  if (requestedPath.endsWith("/")) {
    requestedPath += "index.html";
  }
  const filePath = normalize(join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

createServer((request, response) => {
  if (request.url?.startsWith("/api/ticket-review-intake")) {
    handleTicketReviewIntake(request, response);
    return;
  }
  serveStatic(request, response);
}).listen(port, () => {
  console.log(`NJTrafficTicket server listening on http://localhost:${port}`);
});
