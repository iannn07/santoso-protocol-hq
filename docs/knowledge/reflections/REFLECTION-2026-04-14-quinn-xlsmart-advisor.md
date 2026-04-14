# Reflection — 2026-04-14 — Quinn — XLSMART Package Advisor

## What I built

Complete Next.js 16 single-page application for XLSMART Package Advisor.

## Structure

- `xlsmart-advisor/` — Next.js app root
  - `src/app/page.tsx` — Hero + wizard layout
  - `src/app/layout.tsx` — Root layout with SEO meta
  - `src/app/api/recommend/route.ts` — POST route: Claude API + fallback
  - `src/components/AdvisorWizard.tsx` — Wizard orchestrator (client)
  - `src/components/WizardProgress.tsx` — 3-step progress indicator
  - `src/components/IndustrySelector.tsx` — Industry grid (22 options)
  - `src/components/BusinessProfile.tsx` — Company size radio + needs checkboxes (max 2)
  - `src/components/RecommendationResult.tsx` — Product cards + CTA
  - `src/lib/products.ts` — Product catalog + system prompt
  - `src/lib/fallback.ts` — Rule-based recommendation matrix
  - `src/lib/questions.ts` — Question options loader
  - `src/lib/types.ts` — Shared TypeScript types

## Key decisions

- Claude API called server-side only; `ANTHROPIC_API_KEY` never exposed to client
- Prompt caching: catalog block uses `cache_control: { type: "ephemeral" }` as specified
- `gsm-postpaid` pricing (IDR 65,000/month) hard-coded per requirement
- `biz-analytics-suite` suppressed for `small` company size
- `leased-line` suppressed for all requests (SME and enterprise) per recommendation-matrix.md
- Fallback: Section 3 multi-need combos → Section 1 single need → Section 2 industry booster → Section 4 default
- `npm run build` passes clean with zero TypeScript errors

## What went well

- Data-driven approach: question-options.json and xlsmart-products.json fully drive the UI options
- Zod `safeParse` used throughout (no `.parse()`)
- `'use client'` pushed to leaf components only

## Issues encountered

- `@tailwindcss/postcss` devDependency was in lock file but not installed — fixed with `npm install --include=dev`
- Next.js 16 uses Turbopack for builds; standard App Router conventions apply

## GUN-52 update (2026-04-14)

Marketing assets incorporated:
- `layout.tsx` SEO metadata updated to match `seo-meta.json` (title, description, og:title, og:description, twitter card, full keywords list)
- `page.tsx` hero section updated to match `hero-copy.md` (English headline, subheadline, trust signal)
- `npm run build` passes clean after both changes

## Next steps

- Set `ANTHROPIC_API_KEY` in `.env.local` before running `npm run dev`
- Run on port 3000: `npm run dev`
