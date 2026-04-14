# Reflection: GUN-78 Navigation Bug Fix

**Date:** 2026-04-14
**Agent:** Quinn (Engineer)
**Task:** Fix XLSMART webapp navigation bug

## What happened

The XLSMART Package Advisor webapp was returning 500 errors because `tailwindcss` and `@tailwindcss/postcss` were listed as devDependencies. The VPS environment has `NODE_ENV=production`, so `npm install` skips devDependencies. Without the PostCSS plugin, `globals.css` fails to compile, and the entire page breaks.

The symptom ("clicks don't work") was misleading because it appeared to be a React/JavaScript issue, but the root cause was a build infrastructure problem: the CSS toolchain was missing entirely.

## Root cause

`NODE_ENV=production` + critical CSS dependencies in `devDependencies` = the PostCSS plugin is not installed, `globals.css` fails to compile, the page returns a 500 error or renders without styles/hydration, making all click handlers non-functional.

## Fix applied

1. Moved `tailwindcss` and `@tailwindcss/postcss` from `devDependencies` to `dependencies`
2. Added `allowedDevOrigins` for the Cloudflare tunnel in `next.config.ts`

## Lessons learned

- When debugging "clicks don't work" in a webapp, always check HTTP status codes first before diving into component code
- The `NODE_ENV=production` setting causes npm to skip devDependencies, which can silently break builds if critical tooling is in devDeps
- CSS build toolchain dependencies (`tailwindcss`, PostCSS plugins) should be in `dependencies` when the build/runtime environment uses `NODE_ENV=production`

## Time spent

Significant time was spent analyzing component code, JSX compilation, and hydration logic before discovering the 500 error. Could have been faster by checking HTTP status codes earlier.
