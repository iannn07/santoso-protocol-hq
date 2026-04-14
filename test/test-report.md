# XLSMART Package Advisor — Test Report

## Summary
- Date: 2026-04-14
- Tester: Hendrawan
- App version / commit: latest on main (Next.js 16.2.3 build)
- Overall status: FAIL (3 bugs found, 1 critical)

## Scenario results

All 5 scenarios used the **fallback** recommendation engine (Gemini API failed silently on every request). Recommendations were evaluated against the `data/recommendation-matrix.md` ground truth.

| # | Scenario | Status | Notes |
|---|----------|--------|-------|
| 1 | F&B, 1-10 employees, connectivity + operations_software | PASS | Returned Managed WiFi (primary) + XL Satu Biz. Both reasonable for F&B small business — Managed WiFi is the hospitality/F&B industry booster per matrix. |
| 2 | Manufacturing, 51-200, IoT + connectivity | PASS | Returned Smart Manufacture (primary) + M-Access. Matches matrix exactly — Smart Manufacture is the manufacturing industry booster for IoT. |
| 3 | Logistics, 11-50, fleet + connectivity | PASS | Returned Smart Transportation (primary) + Connectivity+. Matches matrix — Smart Transportation is the logistics booster. Connectivity+ is the expected IoT/fleet companion. |
| 4 | Office/Corporate, 200+, connectivity + IoT | PASS | Used "consulting_professional" as proxy (no Office/Corporate industry option exists). Returned Internet Corporate + VPN MPLS. Internet Corporate matches the enterprise connectivity recommendation per matrix. |
| 5 | Healthcare, 11-50, connectivity + security | PASS | Returned Managed IT and Security (primary) + XL Satu Biz. Matches the connectivity+security combo for small/medium in the matrix. Reasonable for healthcare. |

### Notes on scenario mapping
- **Scenario 4**: No "Office/Corporate" industry exists in the question options. Closest match is "Consulting & Professional Services". The expected recommendation (Internet Corporate) was still returned.
- **Scenario 5**: No "Video surveillance" need exists. Mapped to "Network & Data Security" (closest match). The expected recommendation (XL Satu Biz or Internet Corporate) partially matched — XL Satu Biz was returned as secondary.

## Mobile responsiveness

CSS was reviewed by reading the source components. No browser-based viewport testing was possible (headless environment).

| Breakpoint | Status | Notes |
|------------|--------|-------|
| 375px | PASS (code review) | Industry grid uses `grid-cols-2` (2-col on mobile, 3-col at `sm:`). Need options use `grid-cols-1` (stacked). CTA buttons are `w-full`. Main container is `max-w-2xl mx-auto px-4`. No horizontal overflow risk from hardcoded widths. |
| 768px | PASS (code review) | At `sm:` breakpoint, industry grid switches to 3 columns, needs grid to 2 columns. Layout is well-adapted. |
| 1280px | PASS (code review) | Container capped at `max-w-2xl` (672px) centered with `mx-auto`. Content stays centered and readable. |

### Mobile-specific observations
- Cards stack vertically via `flex flex-col gap-4` in RecommendationResult.
- Buttons are full-width on all sizes (`w-full`, `flex-1`).
- Step indicator is compact with `w-8 h-8` circles and `text-xs` labels — readable at 375px.
- Hero text scales: `text-3xl` on mobile, `md:text-4xl` on desktop.

## Edge cases

| Case | Status | Notes |
|------|--------|-------|
| Click "Next" on Step 1 with no industry selected | PASS | Button is `disabled={!selectedIndustry}` with `disabled:opacity-40 disabled:cursor-not-allowed`. Correctly blocked. |
| Click "Next" on Step 2 with no needs selected | FAIL | Button is disabled when `selectedNeeds.length === 0`. Spec says needs should be optional and submission should still proceed. The API also rejects empty needs array (`min(1)`). See Bug #1. |
| Gemini API failure error state | FAIL | The API catches Gemini errors and silently falls back to the rule-based matrix. No error is shown to the user — they receive a valid recommendation with `fallback: true` and a small note. However, the Gemini API is currently failing on ALL requests (see Bug #2). |
| Very long product name / reasoning text | PASS | Fallback fit_reason text is template-based and predictable length. Product cards use `leading-relaxed` and no `truncate`/`overflow-hidden`, so long text wraps naturally without layout breakage. |
| Navigate back from Step 2, then forward again | FAIL | BusinessProfile uses local `useState` for companySize and selectedNeeds. When navigating back to Step 1, the component unmounts. Returning to Step 2 remounts it with empty state. Company size and needs selections are lost. See Bug #3. |
| Invalid JSON / malformed request to API | PASS | Returns proper 400 error with Zod validation details. |
| Double-click submit on Step 2 | PASS | Button disables during loading (`disabled={!canSubmit}` where `canSubmit` checks `!loading`). Prevents double-submission. |

## Bugs filed

- **Bug #1 (MEDIUM)**: Primary needs should be optional per spec but are required in both UI and API. BusinessProfile requires `selectedNeeds.length > 0` to enable submit. API schema requires `primaryNeeds.min(1)`. Users cannot proceed without selecting at least 1 need. — Assigned to Quinn.
- **Bug #2 (CRITICAL)**: Gemini API fails on every request, all recommendations use fallback. The `.env.local` contains a GEMINI_API_KEY but every API call falls through to the rule-based fallback (all responses have `fallback: true`). The API key may be invalid, expired, or the Gemini 1.5 Pro model may be unreachable. Users always see generic template-based fit_reason text instead of personalized AI recommendations. — Assigned to Quinn.
- **Bug #3 (MEDIUM)**: Step 2 selections (company size + needs) are lost when navigating back. BusinessProfile stores companySize and selectedNeeds in component-local `useState`. When user clicks "Kembali" to Step 1, the component unmounts. Returning to Step 2 remounts with empty state. Industry selection IS preserved (stored in parent AdvisorWizard formState), but Step 2 inputs are not. — Assigned to Quinn.

## Sign-off
- [x] All scenarios pass (recommendations are reasonable via fallback)
- [ ] No critical bugs remain (Bug #2: Gemini API always fails)
- [x] Mobile layout verified (via code review — no browser viewport testing available)
