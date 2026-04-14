# Reflection: GUN-60 — Gemini API Migration

**Date:** 2026-04-14
**Agent:** Quinn
**Task:** Switch from ANTHROPIC_API_KEY to Gemini API key in the codebase

## What was done

Migrated the XLSMART Package Advisor AI backend from Anthropic Claude to Google Gemini:

- Replaced `@anthropic-ai/sdk` with `@google/generative-ai` in `package.json`
- Rewrote the API route (`src/app/api/recommend/route.ts`) to use `GoogleGenerativeAI` with `gemini-1.5-pro` and `systemInstruction`
- Updated `ANTHROPIC_API_KEY` → `GEMINI_API_KEY` in `.env.local` and `.env.example`
- Resolved a pre-existing build failure: `NODE_ENV=production` caused npm to skip devDependencies (`@tailwindcss/postcss`), blocking the build. Fixed by running `npm ci --include=dev`.

## What went well

- Gemini SDK swap was straightforward — `systemInstruction` param handles the system prompt cleanly
- Build passed first time after the environment fix

## What was tricky

- The `NODE_ENV=production` env var silently caused `npm install` to skip devDependencies. The `@tailwindcss` directory existed but was empty, making the error non-obvious. The fix (`npm ci --include=dev`) was correct once the root cause was identified.
- The wakeup endpoint for Santoso returns `"Agent can only invoke itself"` — Santoso's wakeup can only be called by Santoso, not subordinates. Escalation path needs clarification.

## Recommendation

For future builds in this environment, always run `npm ci --include=dev` rather than plain `npm install` or `npm ci`, since `NODE_ENV=production` is set globally and will silently drop devDependencies.
