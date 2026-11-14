# Validation report — 10 November 2026

## Implemented inventory

- 65 calculator entries: all have a calculator specification and a pure calculation function.
- 15 converter families: 14 factor-based dimensions plus temperature with affine offsets.
- 15 parameter-driven interactive simulations.
- 35 evergreen guide pages with equations, assumptions, worked examples, common mistakes, FAQs and further-reading links.
- 196 formula reference entries.
- 18 practice questions with answer explanations.
- Static content pages, scientific references, metadata, WebSite JSON-LD, calculator SoftwareApplication/FAQPage JSON-LD, robots and environment-configured sitemap.

## Checks completed in this environment

- TypeScript strict compilation of the standalone `lib/` modules: PASS.
- Transpile/syntax check of all 38 TypeScript/TSX files: PASS (no syntax diagnostics).
- Custom runtime smoke checks against compiled library modules: PASS.
- Every calculator slug has a specification and function: PASS.
- Sample outputs across all 65 calculator functions are finite: PASS.
- Converter checks (mile/km, Celsius/Fahrenheit, Fahrenheit/Kelvin, kWh/joule, absolute-zero rejection): PASS.
- Selected physics equation checks (velocity, kinetic energy, projectile range, ideal gas pressure, Snell refraction): PASS.

## Checks not completed

- `npm install` could not complete because the package registry connection timed out in this environment.
- Therefore the complete Next.js production build, Vitest runner and Playwright browser suite have **not** been executed here. Their test files and scripts are included for execution after dependencies are installed.
- A qualified physics subject-matter review has not been performed. Scientific formulas and educational content should be reviewed before public launch, especially where sign conventions, limiting cases or idealizations matter.
- The legal pages are draft templates and require review against the actual site owner, hosting, analytics and advertising configuration.
- No domain was selected, GitHub repository was not created, and no Vercel deployment was performed.

## Release gate

Do not call this a production-verified release until dependency installation, `npm run typecheck`, `npm test`, `npm run test:e2e`, and `npm run build` pass in the target environment, and the science/legal review is complete.
