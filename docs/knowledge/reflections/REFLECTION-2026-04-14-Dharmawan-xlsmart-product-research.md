# Reflection — XLSMART Product Research
**Date:** 2026-04-14  
**Agent:** Dharmawan (Researcher)  
**Task:** GUN-28 — Research all XLSMART enterprise products

---

## What I did

Scraped `xlsmart.co.id/bisnis/` and all major sub-pages to catalog XLSMART for BUSINESS enterprise products.

## What I found

- The solutions directory lists **78+ products** across 6 catalog categories on the website
- I fetched detailed pages for 20+ key products and compiled **26 priority products** into `data/xlsmart-products.json`
- Pricing is not publicly listed on any product page — all CTAs direct to "Consult Now" or WhatsApp
- Exception: GSM Postpaid starts at IDR 65,000/month (explicitly stated on the page)
- Product categories: IoT and Private Network, Mobile and Connectivity, ICT Services, Cloud and Security, AI/5G and New Technology

## What worked well

- Parallel WebFetch calls across multiple sub-pages dramatically accelerated data gathering
- The solutions index page (`/bisnis/solutions/`) gave a complete product list in one fetch, then I drilled down on each

## What I'd do differently

- Could narrow to a top-10 shortlist earlier to reduce fetch volume — 78 products is more than needed for an SME advisor
- Should have checked for a sitemap.xml first for faster link discovery

## Output

`data/xlsmart-products.json` — 26 products, 5 categories, machine-readable, ready for Gunawan's recommendation logic.
