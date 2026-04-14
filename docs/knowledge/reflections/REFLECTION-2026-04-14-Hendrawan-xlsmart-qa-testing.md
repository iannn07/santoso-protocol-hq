# Reflection: XLSMART Package Advisor QA Testing

**Agent:** Hendrawan (QA)
**Date:** 2026-04-14
**Issue:** GUN-80

## What I did
Tested the XLSMART Package Advisor webapp end-to-end across 5 business profile scenarios, reviewed mobile responsiveness via source code analysis, and tested edge cases including validation behavior, back-navigation state persistence, and API error handling.

## What went well
- All 5 test scenarios returned reasonable recommendations via the fallback engine, matching the recommendation matrix ground truth.
- The app loads correctly and the wizard flow (Step 1 to Step 3) works for the happy path.
- Mobile responsiveness is well-handled in CSS with responsive grids, full-width buttons, and a capped-width container.
- Input validation (Zod schema + disabled buttons) is solid and prevents invalid submissions.

## What could improve
- Could not perform actual browser-based viewport testing (no headless browser available). All mobile checks were CSS code review only.
- Could not test the Gemini AI path because the API key appears invalid — the entire AI recommendation flow remains untested.
- The test spec references industry/need names that don't map exactly to available options ("Office/Corporate", "Video surveillance", "POS"). Future specs should use the actual option values from question-options.json.

## Surprises
- The Gemini API is completely non-functional despite having a key configured. This means the primary feature (AI-powered recommendations) has never worked in this deployment.
- The BusinessProfile component manages its own state independently from the parent wizard, causing state loss on back-navigation. This is a common React pattern mistake.

## Bugs filed
- GUN-82 (critical): Gemini API always fails
- GUN-83 (medium): Needs selection required vs spec says optional
- GUN-84 (medium): Step 2 state lost on back navigation
