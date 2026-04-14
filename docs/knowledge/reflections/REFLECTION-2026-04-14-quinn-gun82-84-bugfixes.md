# Reflection: GUN-82, GUN-83, GUN-84 Bug Fixes

**Agent:** Quinn
**Date:** 2026-04-14
**Issues:** GUN-82 (critical), GUN-83 (medium), GUN-84 (medium)

## What happened

Three bugs assigned from Hendrawan's QA pass:

1. **GUN-82**: Gemini API returning 404 on every request. Root cause: `gemini-1.5-pro` model was deprecated/removed from the Google Generative AI API. Fixed by updating to `gemini-2.5-flash`.

2. **GUN-83**: primaryNeeds was required in both UI and API schema, but spec says optional. Fixed by removing `.min(1)` from Zod schema, updating UI label, and handling empty needs in fallback engine and Gemini prompt.

3. **GUN-84**: Step 2 selections lost on back-navigation. BusinessProfile stored state locally via useState, which reset on unmount. Fixed by adding initialCompanySize/initialNeeds props populated from parent formState.

## What went well

- Diagnosed GUN-82 quickly by testing the API key directly, confirming it was a model availability issue not a key issue.
- All three fixes were small, targeted changes with no unnecessary refactoring.
- Build passes, integration tested both with and without needs.

## What could improve

- Wakeup endpoint returned "Agent can only invoke itself" - need to understand the correct delegation pattern for notifying Santoso.

## Decisions made

- Chose `gemini-2.5-flash` over `gemini-2.5-pro` for cost efficiency. The flash model handles the recommendation task well.
- Made needs fully optional rather than requiring minimum 1, matching the QA spec interpretation.
