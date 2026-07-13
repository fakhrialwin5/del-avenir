#!/usr/bin/env node
/**
 * QA Report Generator
 * Uses browser-qa methodology to produce comprehensive QA reports
 * for the Next.js application
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const TARGET_URL = process.env.QA_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(process.cwd(), 'qa-reports');
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots');

async function runSmokeTest(page) {
  const consoleErrors = [];
  const networkFailures = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('requestfailed', (request) => {
    networkFailures.push(`${request.url()} - ${request.failure()?.errorText}`);
  });

  const startTime = Date.now();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  const loadTime = Date.now() - startTime;

  // Core Web Vitals check (basic)
  const webVitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const metrics = {};
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'LCP') metrics.lcp = entry.startTime;
          if (entry.name === 'CLS') metrics.cls = entry.value;
          if (entry.name === 'INP') metrics.inp = entry.startTime;
        }
        resolve(metrics);
      }).observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'event'] });

      setTimeout(() => resolve(metrics), 3000);
    });
  });

  return {
    consoleErrors,
    networkFailures,
    loadTime,
    webVitals,
    title: await page.title(),
  };
}

async function takeScreenshots(page) {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 375, height: 667 },
  ];

  const results = [];
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    const filename = `above-fold-${vp.name}.png`;
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, filename),
      fullPage: false,
    });
    results.push(filename);
  }

  return results;
}

async function generateReport() {
  console.log(`🚀 Starting QA Report for ${TARGET_URL}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const timestamp = new Date().toISOString();

  console.log('📊 Phase 1: Smoke Test...');
  const smoke = await runSmokeTest(page);

  console.log('📸 Phase 2: Screenshots...');
  const screenshots = await takeScreenshots(page);

  await browser.close();

  const report = `
# QA Report — ${TARGET_URL} — ${timestamp}

## Smoke Test
- Console errors: ${smoke.consoleErrors.length} critical
- Network failures: ${smoke.networkFailures.length}
- Page load time: ${smoke.loadTime}ms
- Title: ${smoke.title}

## Core Web Vitals
- LCP: ${smoke.webVitals.lcp ? smoke.webVitals.lcp.toFixed(2) + 'ms' : 'N/A'}
- CLS: ${smoke.webVitals.cls ?? 'N/A'}
- INP: ${smoke.webVitals.inp ? smoke.webVitals.inp.toFixed(2) + 'ms' : 'N/A'}

## Screenshots
${screenshots.map((s) => `- ${s}`).join('\n')}

## Verdict: ${smoke.consoleErrors.length === 0 && smoke.networkFailures.length === 0 ? 'SHIP' : 'SHIP WITH FIXES'}
`;

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const reportPath = path.join(OUTPUT_DIR, `qa-report-${timestamp.split('T')[0]}.md`);
  await fs.writeFile(reportPath, report);

  console.log(`✅ Report generated: ${reportPath}`);
  console.log(report);
}

generateReport().catch(console.error);