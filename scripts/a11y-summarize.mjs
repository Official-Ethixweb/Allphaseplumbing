/**
 * Aggregates a11y-report.json into unique failing elements per rule so each
 * root cause can be located in the codebase once.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const report = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "a11y-report.json"), "utf8"),
);

const byRule = new Map();
for (const pageResult of report) {
  for (const v of pageResult.violations ?? []) {
    const rule = byRule.get(v.id) ?? new Map();
    for (const n of v.nodes) {
      // Normalize page-specific text out of the snippet so identical components dedupe.
      const key = n.html.replace(/>[^<]{0,200}</g, "><").slice(0, 200);
      const entry = rule.get(key) ?? { count: 0, routes: new Set(), example: n };
      entry.count++;
      entry.routes.add(pageResult.route);
      rule.set(key, entry);
    }
    byRule.set(v.id, rule);
  }
}

for (const [id, rule] of byRule) {
  console.log(`\n########## ${id} — ${rule.size} unique element pattern(s) ##########`);
  const sorted = [...rule.values()].sort((a, b) => b.count - a.count);
  for (const e of sorted.slice(0, 25)) {
    console.log(`\n  x${e.count} on ${e.routes.size} page(s) e.g. ${[...e.routes][0]}`);
    console.log(`  HTML: ${e.example.html.slice(0, 250)}`);
    console.log(`  TARGET: ${JSON.stringify(e.example.target)}`);
    const fs = (e.example.failureSummary ?? "").split("\n").slice(0, 4).join(" | ");
    console.log(`  WHY: ${fs.slice(0, 300)}`);
  }
  if (sorted.length > 25) console.log(`\n  ...and ${sorted.length - 25} more patterns`);
}
