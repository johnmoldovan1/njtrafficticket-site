import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pages = JSON.parse(await readFile(join(root, "data/pages.json"), "utf8"));
const extraPages = JSON.parse(await readFile(join(root, "data/extra-pages.json"), "utf8"));
const locationPages = JSON.parse(await readFile(join(root, "data/location-pages.json"), "utf8"));
const allTopicPages = [...pages, ...extraPages];
const today = "2026-05-10";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageHtml(page) {
  const sections = page.sections.map((section) => `
        <article>
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.body)}</p>
        </article>`).join("");
  const faqs = page.faqs.map(([question, answer]) => `
        <article>
          <h3>${escapeHtml(question)}</h3>
          <p>${escapeHtml(answer)}</p>
        </article>`).join("");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(([question, answer]) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "NJ Traffic Ticket",
        "item": "https://njtrafficticket.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.label,
        "item": `https://njtrafficticket.com/${page.slug}/`
      }
    ]
  };
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "NJ Traffic Ticket Self-Help",
    "url": `https://njtrafficticket.com/${page.slug}/`,
    "areaServed": "New Jersey",
    "description": page.description,
    "provider": {
      "@type": "LegalService",
      "name": "The Law Offices of John Moldovan, Esq., LLC",
      "url": "https://moldovanlegal.com/"
    }
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <link rel="canonical" href="https://njtrafficticket.com/${page.slug}/">
    <link rel="stylesheet" href="../styles.css">
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(legalServiceSchema)}</script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="../"><span class="brand-mark" aria-hidden="true">NJ</span><span><strong>NJ Traffic Ticket</strong><small>Self-help before you plead</small></span></a>
      <nav aria-label="Primary navigation"><a href="../#lookup">Free Advice</a><a href="../#calculators">Calculators</a><a href="../#tool">Ticket Tool</a><a href="../#lawyer">Need a Lawyer?</a></nav>
    </header>
    <main>
      <section class="subpage-hero">
        <p class="section-label">${escapeHtml(page.label)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        <a class="button primary" href="../#lookup">Get Free Advice Before Paying</a>
      </section>
      <section class="subpage-content">${sections}
      </section>
      <section class="consult-band" aria-labelledby="consult-${escapeHtml(page.slug)}">
        <div>
          <p class="section-label">Free Review</p>
          <h2 id="consult-${escapeHtml(page.slug)}">Before you plead guilty, have the ticket checked.</h2>
          <p>Send the ticket number or your name and date of birth. The office can review the situation and tell you whether paying online may create points, insurance risk, employment issues, or a court-date problem.</p>
        </div>
        <a class="button primary" href="../#lookup">Text My Ticket For Free Review</a>
      </section>
      <section class="faq-section" aria-labelledby="faq-title">
        <div class="section-heading">
          <p class="section-label">Quick Answers</p>
          <h2 id="faq-title">Common questions about ${escapeHtml(page.label.toLowerCase())}.</h2>
        </div>
        <div class="faq-grid">${faqs}
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

function locationHtml(location) {
  const title = `${location.city} NJ Traffic Ticket Help | Municipal Court and Free Review`;
  const description = `Free ${location.city}, New Jersey traffic ticket guide. Check court-date issues, points, common risks, and request a free review before paying online.`;
  const slug = location.slug;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Should I pay a ${location.city} traffic ticket online?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check the points, court-date issue, insurance risk, and driver history before paying online. Payment can operate as a guilty plea for payable tickets."
        }
      },
      {
        "@type": "Question",
        "name": `Can a lawyer help with a ${location.city} municipal court ticket?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A lawyer may be able to review the charge, driving history, court posture, and possible plea options before you decide whether to plead guilty."
        }
      }
    ]
  };
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `${location.city} NJ Traffic Ticket Self-Help`,
    "url": `https://njtrafficticket.com/${slug}/`,
    "areaServed": `${location.city}, New Jersey`,
    "description": description,
    "provider": {
      "@type": "LegalService",
      "name": "The Law Offices of John Moldovan, Esq., LLC",
      "url": "https://moldovanlegal.com/"
    }
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="https://njtrafficticket.com/${slug}/">
    <link rel="stylesheet" href="../styles.css">
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(localSchema)}</script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="../"><span class="brand-mark" aria-hidden="true">NJ</span><span><strong>NJ Traffic Ticket</strong><small>Self-help before you plead</small></span></a>
      <nav aria-label="Primary navigation"><a href="../#lookup">Free Advice</a><a href="../#calculators">Calculators</a><a href="../#tool">Ticket Tool</a><a href="../#lawyer">Need a Lawyer?</a></nav>
    </header>
    <main>
      <section class="subpage-hero local-hero">
        <p class="section-label">${escapeHtml(location.county)} County Municipal Court Help</p>
        <h1>${escapeHtml(location.city)} traffic ticket help before you pay online.</h1>
        <p>If you received a ticket handled through ${escapeHtml(location.court)}, check the charge, points, court date, and driver-history risk before entering a guilty plea online.</p>
        <a class="button primary" href="../#lookup">Get Free Advice Before Paying</a>
      </section>
      <section class="subpage-content local-content">
        <article>
          <h2>What to check for a ${escapeHtml(location.city)} ticket</h2>
          <p>Start with the statute number, whether the matter is payable, whether a court appearance is required, and whether you have risk factors such as prior points, a CDL, an out-of-state license, a probationary license, an accident, or a suspension history.</p>
        </article>
        <article>
          <h2>Common tickets in ${escapeHtml(location.city)}</h2>
          <p>Drivers often need help with speeding, careless driving, reckless driving, unsafe lane change, failure to yield, cellphone tickets, driving while suspended, no-insurance tickets, and accident-related summonses.</p>
        </article>
        <article>
          <h2>Why online payment can be risky</h2>
          <p>For payable traffic tickets, online payment can close the case as a guilty plea. The fine may be smaller than the long-term insurance, MVC point, CDL, or license-suspension consequences.</p>
        </article>
      </section>
      <section class="consult-band" aria-labelledby="local-consult-${escapeHtml(slug)}">
        <div>
          <p class="section-label">Free Ticket Review</p>
          <h2 id="local-consult-${escapeHtml(slug)}">Text the ${escapeHtml(location.city)} ticket details before you pay.</h2>
          <p>Send the ticket number, name and DOB, or name and driver's license number. The office can review the situation and follow up with free initial guidance.</p>
        </div>
        <a class="button primary" href="../#lookup">Text My Ticket For Free Review</a>
      </section>
      <section class="faq-section" aria-labelledby="faq-title">
        <div class="section-heading">
          <p class="section-label">Quick Answers</p>
          <h2 id="faq-title">Common ${escapeHtml(location.city)} traffic ticket questions.</h2>
        </div>
        <div class="faq-grid">
          <article>
            <h3>Should I pay a ${escapeHtml(location.city)} traffic ticket online?</h3>
            <p>Not until you understand the points, insurance risk, court-date issue, and whether a lower-risk resolution may be available.</p>
          </article>
          <article>
            <h3>What if my court date is soon?</h3>
            <p>Request a free review immediately and call the office if the court date is today or tomorrow.</p>
          </article>
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, `  <url>`, `    <loc>https://njtrafficticket.com/</loc>`, `    <lastmod>${today}</lastmod>`, `    <changefreq>weekly</changefreq>`, `    <priority>1.0</priority>`, `  </url>`];

for (const page of allTopicPages) {
  const outputPath = join(root, page.slug, "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, pageHtml(page));
  sitemap.push(`  <url>`, `    <loc>https://njtrafficticket.com/${page.slug}/</loc>`, `    <lastmod>${today}</lastmod>`, `    <changefreq>monthly</changefreq>`, `    <priority>0.85</priority>`, `  </url>`);
}

for (const location of locationPages) {
  const outputPath = join(root, location.slug, "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, locationHtml(location));
  sitemap.push(`  <url>`, `    <loc>https://njtrafficticket.com/${location.slug}/</loc>`, `    <lastmod>${today}</lastmod>`, `    <changefreq>monthly</changefreq>`, `    <priority>0.78</priority>`, `  </url>`);
}

for (const staticSlug of ["privacy-policy", "attorney-reviewed", "nj-municipal-court-directory"]) {
  sitemap.push(`  <url>`, `    <loc>https://njtrafficticket.com/${staticSlug}/</loc>`, `    <lastmod>${today}</lastmod>`, `    <changefreq>monthly</changefreq>`, `    <priority>0.7</priority>`, `  </url>`);
}

sitemap.push(`</urlset>`, "");
await writeFile(join(root, "sitemap.xml"), sitemap.join("\n"));

console.log(`Generated ${allTopicPages.length} topic pages and ${locationPages.length} local pages.`);
