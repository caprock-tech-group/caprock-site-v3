// Simple sitemap generator (no plugin) for Astro static builds.
// Writes dist/sitemap.xml using the canonical base URL from astro.config.mjs or env.
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

// Resolve project root from this file location
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

const site =
  process.env.SITE_URL ||
  "https://caprocktech.com";

const routes = [
  "/",
  "/managed-it/",
  "/msp-pricing/",
  "/solar-sentry/",
  "/solar-plans/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/"
];

const now = new Date().toISOString();

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

const urls = routes.map((p) => {
  const loc = new URL(p, site).toString();
  return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${urls}\n` +
  `</urlset>\n`;

if (!fs.existsSync(distDir)) {
  console.error("dist directory not found. Run astro build first.");
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf8");

// Also add robots.txt if not present
const robotsPath = path.join(distDir, "robots.txt");
if (!fs.existsSync(robotsPath)) {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site).toString()}\n`;
  fs.writeFileSync(robotsPath, robots, "utf8");
}

console.log("Generated sitemap.xml (and robots.txt if missing).");
