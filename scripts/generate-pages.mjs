import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pages = JSON.parse(await readFile(join(root, "data/pages.json"), "utf8"));
const today = "2026-05-09";

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

const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, `  <url>`, `    <loc>https://njtrafficticket.com/</loc>`, `    <lastmod>${today}</lastmod>`, `    <changefreq>weekly</changefreq>`, `    <priority>1.0</priority>`, `  </url>`];

for (const page of pages) {
  const outputPath = join(root, page.slug, "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, pageHtml(page));
  sitemap.push(`  <url>`, `    <loc>https://njtrafficticket.com/${page.slug}/</loc>`, `    <lastmod>${today}</lastmod>`, `    <changefreq>monthly</changefreq>`, `    <priority>0.85</priority>`, `  </url>`);
}

sitemap.push(`</urlset>`, "");
await writeFile(join(root, "sitemap.xml"), sitemap.join("\n"));

console.log(`Generated ${pages.length} traffic ticket pages.`);
