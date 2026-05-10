const tickets = [
  {
    id: "speed-1-9",
    label: "Speeding 1-9 mph over - N.J.S.A. 39:4-98",
    statute: "39:4-98",
    points: 2,
    fine: "$86 typical payable amount; $141 in safe corridor/construction/65 mph area",
    severity: "moderate",
    summary: "A payable speeding ticket can still create MVC points and insurance risk.",
    watch: [
      "A guilty plea can add 2 NJ MVC points.",
      "If you already have points, the total can matter more than this single ticket.",
      "Safe corridor, construction zone, or 65 mph area amounts can be higher."
    ]
  },
  {
    id: "speed-10-14",
    label: "Speeding 10-14 mph over - N.J.S.A. 39:4-98",
    statute: "39:4-98",
    points: 2,
    fine: "$96 typical payable amount; $161 in safe corridor/construction/65 mph area",
    severity: "moderate",
    summary: "This is still a 2-point speeding range, but the insurance and repeat-ticket risk can be real.",
    watch: [
      "Paying online can turn the ticket into a conviction.",
      "A plea amendment may be worth exploring before payment.",
      "For out-of-state drivers, the home state may handle the conviction differently."
    ]
  },
  {
    id: "speed-15-29",
    label: "Speeding 15-29 mph over - N.J.S.A. 39:4-98",
    statute: "39:4-98",
    points: 4,
    fine: "$106-$221 typical payable amount depending on speed range; higher in special zones",
    severity: "high",
    summary: "This range commonly carries 4 NJ MVC points and deserves a closer look before pleading guilty.",
    watch: [
      "Four points can trigger bigger insurance consequences.",
      "CDL and work-driver consequences can be serious.",
      "Some higher-speed or related-charge cases should be reviewed before any plea."
    ]
  },
  {
    id: "speed-30-plus",
    label: "Speeding 30+ mph over - N.J.S.A. 39:4-98",
    statute: "39:4-98",
    points: 5,
    fine: "$241+ typical payable amount for 30-34 mph over; higher as speed rises and in special zones",
    severity: "critical",
    summary: "Thirty or more over is a high-exposure speeding ticket with 5 NJ MVC points and possible license risk.",
    watch: [
      "Do not assume this is just a fine.",
      "Court strategy can matter because suspension exposure and insurance consequences may follow.",
      "Speak with counsel before paying or making admissions."
    ]
  },
  {
    id: "careless",
    label: "Careless driving - N.J.S.A. 39:4-97",
    statute: "39:4-97",
    points: 2,
    fine: "$86 typical payable amount if no personal injury; $141 in special zones",
    severity: "moderate",
    summary: "Careless driving is often charged after crashes or officer observations and carries 2 points.",
    watch: [
      "If there was personal injury, the matter may not be payable through the Violations Bureau.",
      "Accident facts can affect civil, insurance, and license consequences.",
      "Avoid written explanations that admit fault before getting advice."
    ]
  },
  {
    id: "reckless",
    label: "Reckless driving - N.J.S.A. 39:4-96",
    statute: "39:4-96",
    points: 5,
    fine: "Often court-sensitive; verify with the court and statute",
    severity: "critical",
    summary: "Reckless driving is a serious moving violation with 5 NJ MVC points.",
    watch: [
      "This is a lawyer-review ticket for most drivers.",
      "The facts alleged by the officer matter.",
      "There may be license, insurance, and employment consequences."
    ]
  },
  {
    id: "unsafe",
    label: "Unsafe operation - N.J.S.A. 39:4-97.2",
    statute: "39:4-97.2",
    points: 0,
    fine: "Court/fine consequences vary; points apply on third or subsequent offense within 5 years",
    severity: "moderate",
    summary: "Unsafe operation is often discussed in plea negotiations, but repeat use can create points.",
    watch: [
      "NJ MVC lists 4 points for a third or subsequent unsafe-operation conviction within the relevant period.",
      "It can carry higher financial consequences than the original ticket.",
      "Check your prior history before agreeing to it."
    ]
  },
  {
    id: "cell",
    label: "Handheld cellphone/electronic device - N.J.S.A. 39:4-97.3",
    statute: "39:4-97.3",
    points: 0,
    fine: "Fine and points depend on offense history",
    severity: "moderate",
    summary: "NJ MVC assesses 3 points for a third or later qualifying handheld-device offense within the lookback period.",
    watch: [
      "Prior cellphone tickets can change the point result.",
      "Insurance and employment policies may treat distracted-driving convictions seriously.",
      "Confirm whether this is a first, second, or later offense."
    ]
  },
  {
    id: "lanes",
    label: "Failure to observe traffic lanes - N.J.S.A. 39:4-88",
    statute: "39:4-88",
    points: 2,
    fine: "$86 typical payable amount; higher for certain subsections/special zones",
    severity: "moderate",
    summary: "Marked-lanes tickets often follow stops for weaving, unsafe lane changes, or crash investigations.",
    watch: [
      "The specific subsection can change the payable amount.",
      "If tied to an accident, the practical risk increases.",
      "Check whether the officer also issued careless, reckless, or DWI-related charges."
    ]
  },
  {
    id: "tailgating",
    label: "Following too closely / tailgating - N.J.S.A. 39:4-89",
    statute: "39:4-89",
    points: 5,
    fine: "$86 typical payable amount; $141 in special zones; not payable for CDL holders",
    severity: "high",
    summary: "Tailgating is a 5-point ticket and is especially risky for CDL and work drivers.",
    watch: [
      "Five points can be a major insurance and license problem.",
      "NJ Courts schedule notes CDL holders may not be able to simply pay this through the bureau.",
      "Crash-related facts can raise the stakes."
    ]
  },
  {
    id: "red-light",
    label: "Failure to observe traffic signal - N.J.S.A. 39:4-81 / 39:4-105",
    statute: "39:4-81 / 39:4-105",
    points: 2,
    fine: "$86 typical payable amount; $141 in special zones",
    severity: "moderate",
    summary: "A red-light or signal ticket commonly carries 2 MVC points unless it is a red-light camera violation with no points.",
    watch: [
      "Confirm whether the ticket is officer-issued or camera-related.",
      "Accident or pedestrian facts can change the risk.",
      "Paying online can still create a conviction record."
    ]
  },
  {
    id: "stop-yield",
    label: "Failure to observe stop or yield sign - N.J.S.A. 39:4-144",
    statute: "39:4-144",
    points: 2,
    fine: "$86 typical payable amount; $141 in special zones",
    severity: "moderate",
    summary: "Stop-sign and yield-sign tickets are common 2-point moving violations.",
    watch: [
      "Check for crash, pedestrian, or school-zone facts.",
      "Your prior point total may make a 2-point plea more serious.",
      "Photos, dashcam footage, and witness details can matter."
    ]
  },
  {
    id: "improper-turn",
    label: "Improper turn - N.J.S.A. 39:4-123",
    statute: "39:4-123",
    points: 3,
    fine: "$86 typical payable amount; $141 in special zones",
    severity: "moderate",
    summary: "Improper-turn tickets commonly carry 3 MVC points.",
    watch: [
      "Three points may be worth contesting if your record is not clean.",
      "Intersection layout and signage can matter.",
      "Check whether a crash or additional charge is involved."
    ]
  },
  {
    id: "signal",
    label: "Failure to signal - N.J.S.A. 39:4-126",
    statute: "39:4-126",
    points: 2,
    fine: "$86 typical payable amount; $141 in 65 mph area for some entries",
    severity: "moderate",
    summary: "Failure-to-signal tickets generally carry 2 MVC points.",
    watch: [
      "The surrounding facts can matter more than the base fine.",
      "If paired with unsafe lane change or accident allegations, get advice.",
      "Do not ignore it because the fine looks small."
    ]
  },
  {
    id: "out-of-state",
    label: "Moving violation committed out of state - N.J.S.A. 39:5D-4",
    statute: "39:5D-4",
    points: 2,
    fine: "Depends on the state and violation",
    severity: "moderate",
    summary: "NJ MVC lists 2 points for a moving violation committed out of state.",
    watch: [
      "If you have a NJ license, an out-of-state conviction can still affect your NJ record.",
      "If you have another state's license, that state may apply its own rules.",
      "Do not assume state lines make the ticket harmless."
    ]
  }
];

const stateNotes = {
  NJ: "For a New Jersey license, NJ MVC points and surcharges are the direct concern. Six or more points within the surcharge window can trigger a surcharge.",
  NY: "For a New York license, a NJ conviction may be reported back and handled under New York rules. Check your NY DMV record and insurance exposure before pleading.",
  PA: "For a Pennsylvania license, a NJ conviction may be reported back and handled under Pennsylvania rules. Your home-state DMV and insurer may treat it differently than NJ.",
  CT: "For a Connecticut license, a NJ conviction may be reported back and handled under Connecticut rules. Check home-state consequences before assuming the NJ points number is the whole story.",
  DE: "For a Delaware license, a NJ conviction may be reported back and may affect your home-state record or insurance in ways that differ from NJ point labels.",
  MD: "For a Maryland license, a NJ conviction may be reported back and may affect your home-state record, insurer, or employment driving status.",
  FL: "For a Florida license, a NJ conviction can still matter for insurance and record review even though the ticket is handled in New Jersey.",
  OTHER: "For an out-of-state license, the NJ court result can still matter. Your home state and insurer may receive or use the conviction under their own rules."
};

const ticketSelect = document.querySelector("#ticket-select");
const result = document.querySelector("#result");
const form = document.querySelector("#ticket-form");
const courtLookupForm = document.querySelector("#court-lookup-form");
const courtLookupResult = document.querySelector("#court-lookup-result");
const lookupModeInputs = [...document.querySelectorAll("input[name='lookupMode']")];
const lookupModePanels = [...document.querySelectorAll("[data-lookup-panel]")];
const pointsCalculator = document.querySelector("#points-calculator");
const pointsCalculatorResult = document.querySelector("#points-calculator-result");
const payQuiz = document.querySelector("#pay-quiz");
const payQuizResult = document.querySelector("#pay-quiz-result");
const cdlRiskChecker = document.querySelector("#cdl-risk-checker");
const cdlRiskResult = document.querySelector("#cdl-risk-result");
const stateImpactChecker = document.querySelector("#state-impact-checker");
const stateImpactResult = document.querySelector("#state-impact-result");
const inputs = ["license-state", "cdl", "probationary", "prior-points", "accident"].map((id) => document.querySelector(`#${id}`));

function initTickets() {
  ticketSelect.innerHTML = tickets.map((ticket) => `<option value="${ticket.id}">${ticket.label}</option>`).join("");
}

function severityLabel(level) {
  if (level === "critical") return "High urgency";
  if (level === "high") return "Elevated risk";
  return "Review before paying";
}

function getRiskAdvice(ticket) {
  const cdl = document.querySelector("#cdl").checked;
  const probationary = document.querySelector("#probationary").checked;
  const priorPoints = document.querySelector("#prior-points").checked;
  const accident = document.querySelector("#accident").checked;
  const advice = [];

  if (ticket.points >= 4) {
    advice.push("This is a higher-point ticket. Speak with a lawyer before paying online.");
  }

  if (cdl) {
    advice.push("CDL or work-driving status increases the risk. Do not plead guilty without checking employment and CDL consequences.");
  }

  if (probationary) {
    advice.push("New or probationary drivers can face added MVC program or license consequences after violations.");
  }

  if (priorPoints) {
    advice.push("Prior points can create surcharge, suspension, and insurance pressure even when the new ticket looks minor.");
  }

  if (accident) {
    advice.push("Accident, injury, or mandatory-court facts make this more serious than a simple payable ticket.");
  }

  if (!advice.length) {
    advice.push("If your record is clean and the ticket is low-point, you may still want to ask whether a no-point or lower-risk resolution is available before paying.");
  }

  return advice;
}

function renderResult() {
  const ticket = tickets.find((item) => item.id === ticketSelect.value) || tickets[0];
  const state = document.querySelector("#license-state").value;
  const riskAdvice = getRiskAdvice(ticket);
  const severityClass = ticket.severity === "critical" ? "critical" : ticket.severity === "high" ? "high" : "";

  result.innerHTML = `
    <span class="severity ${severityClass}">${severityLabel(ticket.severity)}</span>
    <h3>${ticket.label}</h3>
    <p>${ticket.summary}</p>
    <div class="result-meta">
      <div>
        <strong>Statute</strong>
        <span>${ticket.statute}</span>
      </div>
      <div>
        <strong>NJ Points</strong>
        <span>${ticket.points}</span>
      </div>
      <div>
        <strong>Common fine</strong>
        <span>${ticket.fine}</span>
      </div>
    </div>
    <h4>What this can affect</h4>
    <ul>
      ${ticket.watch.map((item) => `<li>${item}</li>`).join("")}
      <li>${stateNotes[state]}</li>
    </ul>
    <div class="note">
      <strong>Before paying online:</strong> payment through NJMCDirect can be treated as pleading guilty to a payable ticket. If the result could affect your license, job, CDL, insurance, or record, get advice first.
    </div>
    <h4>Recommended next step</h4>
    <ul>
      ${riskAdvice.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderLookupMessage(status, title, body, details = []) {
  const isError = status === "error";
  courtLookupResult.innerHTML = `
    <span class="lookup-status ${isError ? "error" : ""}">${isError ? "Needs attention" : "Request status"}</span>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
    ${details.length ? `<ul>${details.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
  `;
}

async function handleCourtLookup(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(courtLookupForm).entries());
  data.consent = document.querySelector("#lookup-consent").checked;

  renderLookupMessage("pending", "Sending review request", "Submitting your ticket details to the secure intake route.");

  try {
    const response = await fetch("/api/ticket-review-intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const payload = await response.json();

    if (!response.ok) {
      renderLookupMessage("error", payload.error || "Intake unavailable", payload.message || "The secure intake service is not available yet.", payload.nextSteps || []);
      return;
    }

    courtLookupForm.reset();
    syncLookupMode();
    renderLookupMessage("success", payload.title || "Free consult request received", payload.message || "The office will review the ticket details and follow up.", payload.nextSteps || []);
  } catch (error) {
    renderLookupMessage(
      "error",
      "Secure intake server not running",
      "The form is ready, but this preview must be served by the backend to accept sensitive ticket review details.",
      ["Use npm start in the site folder.", "Do not deploy this intake form without HTTPS."]
    );
  }
}

function syncLookupMode() {
  const selectedMode = document.querySelector("input[name='lookupMode']:checked")?.value || "nameDob";

  lookupModePanels.forEach((panel) => {
    const isActive = panel.dataset.lookupPanel === selectedMode;
    panel.classList.toggle("active", isActive);
    panel.querySelectorAll("input").forEach((input) => {
      input.disabled = !isActive;
    });
  });
}

function renderPointsCalculator() {
  if (!pointsCalculator || !pointsCalculatorResult) return;

  const current = Number(pointsCalculator.currentPoints.value || 0);
  const added = Number(pointsCalculator.newTicketPoints.value || 0);
  const total = Math.max(0, current + added);
  const isWarning = total >= 6 || added >= 4;
  const title = total >= 6 ? "High risk: possible surcharge/suspension pressure" : added >= 4 ? "Elevated risk: review before pleading" : "Lower point range, but still review first";
  const message = total >= 6
    ? `This would put you at about ${total} points. Six or more points can create NJ MVC surcharge exposure, and higher totals can raise suspension risk.`
    : added >= 4
      ? `This ticket could add ${added} points. That is enough to affect insurance and can matter a lot if you get another ticket later.`
      : `This estimate puts you at about ${total} points. Even a 2-point ticket can affect insurance or a clean driving record.`;

  pointsCalculatorResult.classList.toggle("warning", isWarning);
  pointsCalculatorResult.innerHTML = `<h4>${escapeHtml(title)}</h4><p>${escapeHtml(message)} <a href="#lookup">Get free advice before paying.</a></p>`;
}

function renderPayQuiz() {
  if (!payQuiz || !payQuizResult) return;

  const checked = [...payQuiz.querySelectorAll("input[type='checkbox']")].filter((input) => input.checked).length;
  const isWarning = checked > 0;
  const title = isWarning ? "Do not pay online without a review" : "Still check the consequences first";
  const message = isWarning
    ? "One or more risk factors are present. Paying online may lock in a guilty plea before you know the license, insurance, employment, or court consequences."
    : "If the ticket is truly no-risk and payable, payment may be simple. But confirm points, insurance, and record impact before deciding.";

  payQuizResult.classList.toggle("warning", isWarning);
  payQuizResult.innerHTML = `<h4>${escapeHtml(title)}</h4><p>${escapeHtml(message)} <a href="#lookup">Ask for a free consult.</a></p>`;
}

function renderCdlRiskChecker() {
  if (!cdlRiskChecker || !cdlRiskResult) return;

  const checked = [...cdlRiskChecker.querySelectorAll("input[type='checkbox']")].filter((input) => input.checked).length;
  const isWarning = checked > 0;
  const title = checked >= 2 ? "High priority: get review before pleading" : isWarning ? "Work-driving risk is present" : "No CDL/work risk selected";
  const message = checked >= 2
    ? "A CDL, work-driving role, or serious charge can turn a traffic ticket into an employment problem. Do not pay online until the ticket is reviewed."
    : isWarning
      ? "Even if the ticket looks payable, work-driving rules and employer insurance can make the result more expensive than the fine."
      : "If you do not drive for work and do not have a CDL, focus on points, insurance, prior record, and court-date issues.";

  cdlRiskResult.classList.toggle("warning", isWarning);
  cdlRiskResult.innerHTML = `<h4>${escapeHtml(title)}</h4><p>${escapeHtml(message)} <a href="#lookup">Send the ticket for free review.</a></p>`;
}

function renderStateImpactChecker() {
  if (!stateImpactChecker || !stateImpactResult) return;

  const state = stateImpactChecker.homeStateImpact.value;
  const outOfState = state !== "NJ";
  const title = outOfState ? "Check home-state consequences before paying" : "NJ points and surcharges are the direct issue";
  const note = {
    NJ: "For a New Jersey license, focus on NJ MVC points, surcharge exposure, insurance, and whether the plea affects future ticket options.",
    NY: "For a New York license, a New Jersey conviction may be reported back and handled under New York DMV and insurance rules.",
    PA: "For a Pennsylvania license, a New Jersey conviction may be reported back and may affect your Pennsylvania record or insurance differently than NJ points suggest.",
    CT: "For a Connecticut license, check how Connecticut treats the New Jersey conviction before pleading guilty.",
    DE: "For a Delaware license, do not assume the NJ point number is the only issue; home-state reporting and insurance can matter.",
    MD: "For a Maryland license, a New Jersey conviction may still follow you home through reporting and insurance underwriting.",
    FL: "For a Florida license, the ticket may still be visible to insurers or licensing authorities even though the case is in New Jersey.",
    OTHER: "For any out-of-state license, your home state and insurer may handle the conviction under their own rules."
  }[state];

  stateImpactResult.classList.toggle("warning", outOfState);
  stateImpactResult.innerHTML = `<h4>${escapeHtml(title)}</h4><p>${escapeHtml(note)} <a href="#lookup">Ask before paying online.</a></p>`;
}

initTickets();
renderResult();
syncLookupMode();
renderPointsCalculator();
renderPayQuiz();
renderCdlRiskChecker();
renderStateImpactChecker();

form.addEventListener("change", renderResult);
inputs.forEach((input) => input.addEventListener("change", renderResult));

if (courtLookupForm) {
  courtLookupForm.addEventListener("submit", handleCourtLookup);
  lookupModeInputs.forEach((input) => input.addEventListener("change", syncLookupMode));
}

if (pointsCalculator) {
  pointsCalculator.addEventListener("input", renderPointsCalculator);
  pointsCalculator.addEventListener("change", renderPointsCalculator);
}

if (payQuiz) {
  payQuiz.addEventListener("change", renderPayQuiz);
}

if (cdlRiskChecker) {
  cdlRiskChecker.addEventListener("change", renderCdlRiskChecker);
}

if (stateImpactChecker) {
  stateImpactChecker.addEventListener("change", renderStateImpactChecker);
}
