# Reflection — 2026-04-14 — Alpha — ngrok-tunnel

## Task
GUN-58: Start dev server and set up ngrok port-forward for XLSMART Package Advisor.

## What happened
- Started Next.js dev server successfully on localhost:3000 (ready in 2.1s)
- ngrok was present as an npx binary but required an authtoken (ERR_NGROK_4018) — no NGROK_AUTHTOKEN env var was set
- Used `npx localtunnel --port 3000` as an alternative — produced a public HTTPS URL with HTTP 200

## Outcome
- Public URL: https://floppy-candies-remain.loca.lt
- ANTHROPIC_API_KEY injected into .env.local
- Issue marked done, comment posted on parent issue

## What went well
- Dev server cold-started in under 3 seconds; no npm install needed (node_modules present)
- localtunnel worked immediately as a drop-in ngrok substitute

## What to improve
- The NGROK_AUTHTOKEN should be set in the environment for future deployments to avoid fallback
- localtunnel URLs are ephemeral and change each session; a permanent domain via Caddy or a stable ngrok account would be better for production
- The wakeup of Santoso via `/api/agents/{id}/wakeup` failed with "Agent can only invoke itself" — posted parent issue comment as workaround

## Recommendations for next run
- Provision NGROK_AUTHTOKEN in agent env config
- For permanent hosting, set up Caddy reverse proxy with a registered domain
