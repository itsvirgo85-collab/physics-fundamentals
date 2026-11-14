# Physics Fundamentals

Next.js App Router project for an educational physics tools hub.

## Included
- 65 calculator routes with formula specifications, SI inputs, result validation and model notes
- 15 unit converter families, including affine temperature conversions
- 15 interactive parameter-driven physics models
- 35 evergreen learning guides with equations, assumptions, worked examples, common mistakes and FAQs
- 196 formula references, practice questions and scientific reference links
- About, contact, privacy, terms and educational disclaimer pages
- Metadata, JSON-LD, robots and environment-configured sitemap
- Vitest automated checks for catalog coverage, conversions and selected equations
- Playwright browser smoke tests for the homepage, calculator, converter, simulation and guide routes

## Run locally
1. Install Node.js 20.9+ (recommended)
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` only after choosing the canonical domain
3. Run `npm install`
4. Run `npm run typecheck` and `npm test`
5. Run `npm run build`
6. Run `npm run dev` to preview
7. Run `npm run test:e2e` (install the Chromium browser with `npx playwright install chromium` first)

## Scientific review notes
The calculators use explicitly stated idealized models. Check each equation against the listed source references before using it in formal work. In particular: projectile motion assumes no air resistance; pendulum period uses the small-angle approximation; ideal gas law requires kelvin; magnetic force uses the angle between velocity and field; Snell's law can produce total internal reflection; lens signs depend on the convention stated by the page.

## Before public launch
- Review each tool and worked example with a qualified physics reviewer
- Confirm all formulas, constants, edge cases and significant figures
- Replace the contact page with a working contact channel
- Have privacy and terms drafts reviewed for your actual analytics, advertising and hosting setup
- Add your real canonical domain to `NEXT_PUBLIC_SITE_URL`
- Run typecheck, automated tests, production build and browser tests on the deployed preview
- Complete keyword/SERP validation before indexing every long-tail page

No search-volume, keyword-difficulty, traffic or ranking claims are embedded in this project.
