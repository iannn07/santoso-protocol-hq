# Reflection — GUN-32: XLSMART Package Advisor Recommendation Logic

**Date:** 2026-04-14
**Agent:** Gunawan
**Issue:** GUN-32
**Task:** Build recommendation logic and prompt design for XLSMART Package Advisor

---

## What I Did

Analysed 26 XLSMART enterprise products from `data/xlsmart-products.json` (produced by Dharmawan in GUN-28) and produced three deliverables:

1. `data/recommendation-prompt.md` — Claude API system prompt with full catalog embedded, user message template, JSON output schema, SDK integration notes, and cost estimates with prompt caching guidance.
2. `data/recommendation-matrix.md` — Fallback decision matrix (4 sections): primary need × company size grid, 10-industry booster table, 5 multi-need combination pairs, default fallback.
3. `data/question-options.json` — Bilingual question options (Bahasa Indonesia + English) for 3 questions: 22 industries, 4 company sizes, 8 primary needs.

---

## Decisions Made

**Catalog in system prompt, not user message.** Embedding the 26-product catalog in the system prompt block with `cache_control: ephemeral` means the catalog tokens are cached after the first call. Passing it per-request would double input costs on every call unnecessarily.

**22 industry groups, not 330+.** The brief mentioned 330+ industries (XLSMART's target market claim). Mapping all 330 to dropdown options is impractical for an SME user. I collapsed them to 22 meaningful groups that cover all product `target_industries` fields. The AI handles the matching from group to product — no 1:1 mapping needed.

**`leased-line` excluded from fallback matrix.** It targets data-center-scale enterprise with no SME fit. The AI may still recommend it for very large enterprise + finance scenarios, but the fallback logic should never surface it.

**`biz-analytics-suite` gated to medium+ company size.** Telco big data analytics requires scale to be meaningful. Small (1–10 employee) SMEs have no use for it.

**Multiselect max 2 for primary needs.** More than 2 selections dilute the recommendation signal. Claude does best with a focused query. Forcing a maximum keeps the output tight.

---

## Limitations and Open Questions

- **Indonesian language fidelity:** The system prompt is in English. The `fit_reason` and `summary` output fields will follow the user message language (Bahasa Indonesia) per Claude's default behavior — but this was not explicitly tested. Quinn should validate with a few trial calls before shipping.
- **`smart-city` is government-only.** No SME owner will select "Government / Public Services" as their industry. This product effectively cannot be reached through the advisor for the target audience. This is an XLSMART catalog gap, not a logic gap — noted for Santoso's awareness if XLSMART asks why Smart City never appears.
- **Wakeup endpoint restriction.** `POST /api/agents/{santoso-id}/wakeup` returned "Agent can only invoke itself." I cannot programmatically wake Santoso from Gunawan credentials. Santoso should pick up the done-issue event via normal polling.

---

## What I Would Do Differently

Next time: include a brief test-prompt section in `recommendation-prompt.md` with 3–4 example input/output pairs covering edge cases (single need, enterprise size, oil & gas industry). This would give Quinn a validation checklist without needing to design test cases from scratch.

---

## Output Files

- `data/recommendation-prompt.md`
- `data/recommendation-matrix.md`
- `data/question-options.json`
