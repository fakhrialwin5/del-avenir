# Browser Automation & QA Testing Setup

## Quick Start

```bash
# 1. Install dependencies
npm install @playwright/test

# 2. Install browsers (one-time)
npx playwright install chromium

# 3. Run all tests in headless mode
npm run test:e2e

# 4. Run with browser visible
npm run test:e2e:headed

# 5. Generate QA report with screenshots
npm run test:qa
```

## Test Structure

```
tests/
├── navigation.spec.ts          # All nav links, mobile menu, console errors
├── auth.spec.ts                # Login, logout, protected routes
├── visual-regression.spec.ts   # Screenshots across breakpoints
scripts/
└── qa-report.mjs               # Standalone QA report generator
playwright.config.ts            # Playwright config
```

## Configuration

### Environment Variables

Create `.env.local`:

```bash
E2E_TEST_EMAIL=your-test-email@example.com
E2E_TEST_PASSWORD=your-test-password
```

### Playwright Config

The `playwright.config.ts` includes:
- **5 browser projects**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Auto-start dev server**: Builds and starts Next.js automatically
- **HTML + List reporters**: Visual test results
- **Screenshot/video on failure**: Debug artifacts

## CI/CD Integration

GitHub Actions workflow `.github/workflows/qa.yml`:
- Runs on every push/PR to `main`/`develop`
- Installs Playwright with system dependencies
- Uploads test artifacts (reports, screenshots)

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run all E2E tests (headless) |
| `npm run test:e2e:headed` | Run with visible browser |
| `npm run test:qa` | Generate QA report with screenshots |
| `npm run test:visual:baseline` | Create baseline screenshots |
| `npm run test:visual:compare` | Compare against baseline |

## Browser QA Methodology

Following the `browser-qa` skill phases:

### Phase 1: Smoke Test
- Navigate to target URL
- Check console errors (filter analytics noise)
- Verify no 4xx/5xx responses
- Screenshot above-the-fold desktop + mobile

### Phase 2: Interaction Test
- Click every nav link (dead link check)
- Submit forms (valid + invalid)
- Test auth flow (login → protected → logout)

### Phase 3: Visual Regression
- Screenshot at 375/768/1440px
- Compare against baseline
- Flag layout shifts >5px

### Phase 4: Accessibility
- Run axe-core WCAG 2.2 AA checks
- Verify keyboard navigation
- Check screen reader landmarks

## Output Format

```markdown
## QA Report — [URL] — [timestamp]

### Smoke Test
- Console errors: 0 critical, 2 warnings
- Network: all 200/304

### Interactions
- [✓] Nav links: 12/12 working
- [✗] Contact form: missing error state

### Visual
- [✗] Hero overflows on 375px

### Verdict: SHIP WITH FIXES (2 issues, 0 blockers)
```

## Security Notes

- **Test credentials only** — never use production logins
- **Read-only by default** — mutating journeys require explicit opt-in
- **Staging URLs** — production testing needs approval
- **Redact PII** — screenshots must not contain sensitive data
