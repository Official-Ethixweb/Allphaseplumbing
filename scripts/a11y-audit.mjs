/**
 * Full-site WCAG 2.1 AA audit using Playwright + axe-core.
 *
 * Usage:
 *   node scripts/a11y-audit.mjs                 # scan all routes
 *   node scripts/a11y-audit.mjs /about /blog    # scan specific routes
 *
 * Requires the dev server running at http://localhost:5173.
 * Writes a full JSON report to scripts/a11y-report.json and prints a
 * summary grouped by rule.
 */
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:5173";
const OUT_FILE = join(dirname(fileURLToPath(import.meta.url)), "a11y-report.json");

const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/coupons",
  "/drain-cleaning",
  "/draincleaning",
  "/emergency-plumber",
  "/hydro-jetting",
  "/residential",
  "/commercial",
  "/commercial/drain-cleaning",
  "/blog",
  "/service-area",
  "/services",
  "/services/burst-pipe-repair",
  "/services/drain-cleaning",
  "/services/emergency-plumber",
  "/services/fixture-replacement",
  "/services/gas-line-repair",
  "/services/hot-water-system-repair",
  "/services/hydro-jetting",
  "/services/pipe-repair",
  "/services/pipe-replacement",
  "/services/repiping",
  "/services/septic-tank-service",
  "/services/slab-leak-repair",
  "/services/toilet-installation",
  "/services/toilets",
  "/services/water-heaters",
  "/services/water-lines",
  "/services/water-softeners",
  "/services/plumbing",
  "/services/plumbing/backflow-testing",
  "/services/plumbing/bathtub-installation",
  "/services/plumbing/burst-pipe-repair",
  "/services/plumbing/clogged-drain-repair",
  "/services/plumbing/emergency-plumber",
  "/services/plumbing/faucet-installation",
  "/services/plumbing/fixture-replacement",
  "/services/plumbing/garbage-disposals",
  "/services/plumbing/gas-line-repair",
  "/services/plumbing/hot-water-system-repair",
  "/services/plumbing/hydro-jetting",
  "/services/plumbing/leak-detection",
  "/services/plumbing/outdoor-faucet-repair",
  "/services/plumbing/pipe-repair",
  "/services/plumbing/pipe-replacement",
  "/services/plumbing/repiping",
  "/services/plumbing/septic-tank-service",
  "/services/plumbing/sewer-line-repair",
  "/services/plumbing/shower-installation",
  "/services/plumbing/slab-leak-repair",
  "/services/plumbing/sump-pumps",
  "/services/plumbing/tankless-water-heaters",
  "/services/plumbing/toilet-installation",
  "/services/plumbing/toilets",
  "/services/plumbing/water-filtration",
  "/services/plumbing/water-lines",
  "/services/plumbing/water-softeners",
  "/services/sewer-services",
  "/services/sewer-services/sewer-repair",
  "/services/sewer-services/sewer-replacement",
];

// Dynamic routes: every city/article shares one template, so scanning all of
// them is cheap insurance that no per-page content breaks a rule.
const CITY_SLUGS = [
  "auburn", "bellevue", "bonney-lake", "bothell", "des-moines", "federal-way",
  "fife", "kent", "kirkland", "lakewood", "mercer-island", "puyallup",
  "redmond", "renton", "seattle", "south-hill", "spanaway", "summit",
  "summit-view", "tacoma", "tukwila",
];
const BLOG_SLUGS = [
  "puget-sound-winter-plumbing-survival-guide",
  "handyman-vs-professional-plumber-seattle",
  "tankless-water-heaters-seattle-worth-upgrade",
  "preventing-tree-root-damage-sewer-lines",
];

const ALL_ROUTES = [
  ...STATIC_ROUTES,
  ...CITY_SLUGS.map((s) => `/service-area/${s}`),
  "/areas/seattle",
  ...BLOG_SLUGS.map((s) => `/blog/${s}`),
];

const routes = process.argv.slice(2).length ? process.argv.slice(2) : ALL_ROUTES;

// Two passes: desktop and mobile, since some UI (e.g. mobile bottom nav)
// only renders at narrow widths.
const VIEWPORTS = [
  { name: "desktop", width: 1366, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
const report = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    // Deterministic scans: with reduced motion the scroll-reveal animations
    // render text fully visible instead of being caught mid-fade.
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  let scanned = 0;

  for (const route of routes) {
    scanned++;
    process.stdout.write(`[${vp.name} ${scanned}/${routes.length}] ${route} ... `);
    try {
      try {
        await page.goto(BASE_URL + route, { waitUntil: "networkidle", timeout: 30000 });
      } catch {
        // Pages with continuously-polling assets never reach networkidle.
        await page.goto(BASE_URL + route, { waitUntil: "load", timeout: 45000 });
        await page.waitForTimeout(3000);
      }
      // Give GSAP/lazy sections a beat to settle.
      await page.waitForTimeout(1500);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        // Third-party widget internals we can't control. On localhost the
        // reCAPTCHA iframe shows a red "unsupported domain" error that does
        // not exist in production.
        .exclude('iframe[title="reCAPTCHA"]')
        .analyze();

      const violations = results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          html: n.html.slice(0, 300),
          failureSummary: n.failureSummary,
        })),
      }));

      report.push({ route: `${route} [${vp.name}]`, violationCount: violations.reduce((a, v) => a + v.nodes.length, 0), violations });
      console.log(violations.length ? `${violations.reduce((a, v) => a + v.nodes.length, 0)} violations (${violations.map((v) => v.id).join(", ")})` : "clean");
    } catch (err) {
      report.push({ route: `${route} [${vp.name}]`, error: String(err) });
      console.log(`ERROR: ${err}`);
    }
  }

  await context.close();
}

await browser.close();

writeFileSync(OUT_FILE, JSON.stringify(report, null, 2));

// ---- Summary ----
const byRule = new Map();
for (const pageResult of report) {
  for (const v of pageResult.violations ?? []) {
    const entry = byRule.get(v.id) ?? { impact: v.impact, help: v.help, count: 0, routes: new Set() };
    entry.count += v.nodes.length;
    entry.routes.add(pageResult.route);
    byRule.set(v.id, entry);
  }
}

const totalNodes = [...byRule.values()].reduce((a, e) => a + e.count, 0);
const pagesWithIssues = report.filter((r) => (r.violationCount ?? 0) > 0).length;
const errors = report.filter((r) => r.error);

console.log("\n================ SUMMARY ================");
console.log(`Routes scanned : ${report.length}`);
console.log(`Pages w/ issues: ${pagesWithIssues}`);
console.log(`Total instances: ${totalNodes}`);
console.log(`Scan errors    : ${errors.length}${errors.length ? " -> " + errors.map((e) => e.route).join(", ") : ""}`);
console.log("\nBy rule:");
for (const [id, e] of [...byRule.entries()].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  ${id} [${e.impact}] x${e.count} on ${e.routes.size} page(s)`);
  console.log(`      ${e.help}`);
}
console.log(`\nFull report: ${OUT_FILE}`);
