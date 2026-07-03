import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto("http://localhost:4173/", { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(2500);

// 1. no recaptcha script before interaction
const before = await page.evaluate(() => ({
  script: !!document.querySelector('script[src*="recaptcha"]'),
  iframes: document.querySelectorAll('iframe[src*="recaptcha"]').length,
}));
console.log("recaptcha before interaction:", JSON.stringify(before));

// 2. interact with the form that CONTAINS a recaptcha placeholder
await page.evaluate(() => {
  const placeholder = document.querySelector("form .min-h-\\[78px\\]");
  const form = placeholder?.closest("form");
  const input = form?.querySelector("input");
  input?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(300);
const heroInput = page.locator("form:has(.min-h-\\[78px\\]) input").first();
await heroInput.click();
await page.waitForTimeout(5000);
const after = await page.evaluate(() => ({
  script: !!document.querySelector('script[src*="recaptcha"]'),
  iframes: document.querySelectorAll('iframe[src*="recaptcha"]').length,
}));
console.log("recaptcha after interaction:", JSON.stringify(after));

// 3. leaflet loads when map scrolls into view — walk the whole page
const mapBefore = await page.evaluate(() => !!document.querySelector(".leaflet-container"));
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});
await page.waitForTimeout(3500);
const mapAfter = await page.evaluate(() => !!document.querySelector(".leaflet-container"));
console.log("leaflet before scroll:", mapBefore, "| after full scroll:", mapAfter);

// 4. a11y regression check
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();
console.log("axe violations:", axe.violations.length);
for (const v of axe.violations) console.log("  -", v.id, "x" + v.nodes.length);

console.log("page errors:", errors.length ? errors : "none");
await browser.close();
