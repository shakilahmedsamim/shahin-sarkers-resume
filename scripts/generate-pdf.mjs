// Dev-only tool, NOT run during `next build` / Vercel deploys (a headless
// browser + temporary server at build time is unreliable in that sandbox
// and once hung a production deploy). Run by hand after editing
// src/data/resume.ts: npm run generate:pdf
//
// Renders the real page in Chromium and prints it as one continuous page
// (page height = content height) so no section or table row ever gets cut
// across a page break, then commit the updated public/shahin-sarker-biodata.pdf.

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(rootDir, "public", "shahin-sarker-biodata.pdf");
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // server not ready yet
    }
    await sleep(300);
  }
  return false;
}

async function run() {
  let serverProcess = null;
  let baseUrl = process.env.PDF_SOURCE_URL;

  if (!baseUrl) {
    const port = 4173;
    baseUrl = `http://127.0.0.1:${port}`;
    // detached so it becomes its own process group leader - Next spawns a
    // separate worker process under it, and killing just the parent leaves
    // that worker running (reparented to init) with the port still open.
    serverProcess = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
      cwd: rootDir,
      stdio: "ignore",
      detached: true,
    });
    const ready = await waitForServer(baseUrl, 30000);
    if (!ready) {
      process.kill(-serverProcess.pid, "SIGKILL");
      throw new Error("local production server did not start in time");
    }
  }

  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
  });

  try {
    // A4 width at 96 CSS px/inch, so the measured layout matches what
    // page.pdf() actually renders at print time (avoids a viewport/print
    // width mismatch that would make the height estimate come out short).
    const printWidthPx = 794;
    const page = await browser.newPage({ viewport: { width: printWidthPx, height: 1200 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.emulateMedia({ media: "print" });

    const heightPx = await page.evaluate(() => document.documentElement.scrollHeight);
    const heightIn = heightPx / 96 + 0.6;

    await page.pdf({
      path: outPath,
      width: "210mm",
      height: `${heightIn}in`,
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });
  } finally {
    await browser.close();
    if (serverProcess) process.kill(-serverProcess.pid, "SIGKILL");
  }

  console.log("Saved:", outPath);
}

run().catch((err) => {
  console.error("PDF generation failed:", err.message);
  process.exitCode = 1;
});
