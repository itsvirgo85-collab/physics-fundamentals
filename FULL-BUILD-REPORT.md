# Physics Fundamentals — Full Build Report
Date: 13–14 November 2026
Project: `~/workspace/physics-fundamentals/` (Next.js 15.5.29 + React 19 + TypeScript + Tailwind 3, App Router)
Source: ChatGPT ZIP `physics-fundamentals-complete.zip` (71 files, 10 Nov 2026), fixed once (FIX-REPORT.md), now built out to the complete plan in the structure PDF and the live keyword research.
Status: **Build complete and verified locally. No deploy, no GitHub push, no domain purchased, nothing published.**

## 1. Site plan

- **Core topic (one sentence):** Free physics calculators, converters, interactive simulations and learning guides that show their equation, SI units and step-by-step working.
- **Audience:** GCSE / IGCSE / A-Level students and self-learners in Tier 1 countries (USA, UK, Canada, Australia), English first.
- **Monetisation (planned, not installed):** display ads after traffic — no ad code is installed yet; that needs the user's publisher ID and an approved account.
- **Stack:** Next.js 15 (App Router, static generation), React 19, TypeScript (strict), Tailwind CSS, Vitest, Playwright (tests written; browser run not possible here — see §7). No paid APIs, no database, no accounts. All tools run client-side in the browser.
- **Brand system:** primary #1D4ED8 (deep blue), secondary #0E7490 (teal), CTA accent #F59E0B (amber, primary buttons only), ink #14233B, muted #62738B, line #E4EBF4, background #F7F9FC. System-ui font stack only (max 2 families, no webfont downloads). Favicon `public/favicon.svg` (Φ atom mark) and OG image `public/og-image.svg` (1200×630, local SVG, no external download).

### Hubs (8, under /topics/)
| Hub | Slug | Covers |
|---|---|---|
| Kinematics | kinematics | SUVAT, velocity, acceleration, free fall, projectile, motion graphs |
| Forces & Dynamics | forces-dynamics | F = ma, friction, pressure, tension, drag, inclined plane |
| Work, Energy & Power | work-energy-power | Work, KE, GPE, spring PE, power, efficiency |
| Momentum & Rotation | momentum-rotation | Momentum, impulse, collisions, torque, angular motion |
| Gravitation & Circular Motion | gravitation-circular-motion | Gravity, escape/orbital velocity, centripetal, orbits |
| Waves & Oscillations | waves-oscillations | Wave speed, frequency, pendulum, spring, Doppler, sound |
| Electricity & Magnetism | electricity-magnetism | Ohm's law, circuits, Coulomb, fields, flux, induction |
| Thermodynamics & Optics | thermodynamics-optics | Specific/latent heat, ideal gas, heat transfer, Snell, lenses |

Every guide is assigned to exactly one hub. Every calculator, guide, converter and simulation is reachable from the homepage in ≤3 clicks (homepage → hub → page, or homepage → list → page).

### Page counts (verified)
- Calculators: **68** (`/calculators/<slug>`)
- Guides: **35** (`/guides/<slug>`)
- Converters: **15** (`/converters/<slug>`)
- Simulations: **15** (`/simulations/<slug>`)
- Topic hubs: **8** + topics index (`/topics`, `/topics/<slug>`)
- List pages: calculators, guides, converters, simulations, formulas, practice (6)
- Static/trust pages: home, about, contact, privacy, terms, disclaimer, references (7)
- Search: **1** (`/search`, client-side, noindex, NOT in sitemap)
- Formula library: **196** entries on `/formulas`
- Practice: **34** questions on `/practice`
- **Live sitemap: 155 URLs** (checked by running `next start` and fetching `/sitemap.xml`; `/search` correctly absent)
- **Production build: 161 static pages** (Next.js count; includes the sitemap's 155 plus non-indexable routes)

## 2. Keyword mapping — top 12 launch keywords → page → intent
From `~/workspace/physics-lowest-competition-research.md` (live Google top-5 checks, 13 Nov 2026). **No volume, KD or CPC numbers exist for these keywords and none are claimed anywhere on the site or in this report.** "Winnable" means the live top 5 was small tool sites, not big brands — the pages win by being better tools, not by targeting empty SERPs.

| # | Keyword (long-tail) | Page | Intent / win angle |
|---|---|---|---|
| 1 | density of irregular object, water displacement | /calculators/density | Tool + GCSE required practical; meniscus / air-bubble traps |
| 2 | specific heat capacity calculator, mass temperature change | /calculators/specific-heat | Tool; Q = mcΔT + Q = mL, material values |
| 3 | final velocity with acceleration and time / SUVAT find displacement | /calculators/suvat (+ /calculators/final-velocity) | Multi-solve tool: any 3 of s,u,v,a,t → other 2, working shown |
| 4 | momentum after collision formula | /calculators/collision-momentum (+ /calculators/momentum) | Tool; elastic / inelastic / recoil, KE lost |
| 5 | pressure from force and area, examples | /calculators/pressure | Tool; cm² → m² trap (50 N / 25 cm² = 20,000 Pa) |
| 6 | free fall calculator, height time velocity | /calculators/free-fall-time, /calculators/free-fall-distance | Tool; Earth / Moon / Mars gravity |
| 7 | projectile motion calculator, angle and initial velocity | /calculators/projectile-motion | Tool + SVG trajectory diagram, height + impact speed |
| 8 | gravitational potential energy calculator, mass height | /calculators/gravitational-potential-energy | Tool; mgh + GPE → KE conversion |
| 9 | frequency from wavelength and speed | /calculators/wave-speed, /calculators/frequency | Tool; v = fλ, solve any variable, light tab |
| 10 | centripetal force calculator, mass velocity radius | /calculators/centripetal-force | Tool; g-force, max cornering speed |
| 11 | kinetic energy with mass and speed, examples | /calculators/kinetic-energy | Tool; GCSE examples, speed-doubling rule, momentum alongside |
| 12 | acceleration from velocity–time graph | /guides/motion-graphs (+ /simulations/motion-graphs) | Guide; tangent method, 2.5 m/s² trap (not 3.0) |

Excluded / Phase 2 (per research): work-done guide (Wikipedia/LibreTexts/Pearson dominate), power from work/time guide (LibreTexts ×2), torque (LibreTexts + NASA), wavelength-of-light as a separate page (OmniCalculator in top 5 — covered as a tab on the wave-equation pages instead). Head terms (velocity calculator, power calculator, density calculator) are NOT launch targets.

## 3. What was built / changed (this build, on top of FIX-REPORT.md)

### Architecture (new)
- `lib/topics.ts` — 8 hubs with slug, name, category, 150–160-char description, keyword, intent; guide/converter/simulation → hub maps.
- `app/topics/page.tsx`, `app/topics/[slug]/page.tsx` — hub index + hub pages listing that hub's calculators, guides, converters and simulations with unique 1-line descriptions.
- `lib/search-index.ts` — build-time index, **337 entries** (68 calculators + 35 guides + 15 converters + 15 simulations + 196 formulas + 8 topics), each with title, slug, type, url, description, keywords.
- `app/search/page.tsx` (server wrapper, robots noindex) + `components/SearchClient.tsx` (live filtering as you type, grouped by type, no-results help) + `components/SearchBox.tsx` (header search box).
- `app/sitemap.ts` — now includes `/topics` + 8 hub URLs; `/search` excluded.
- `app/layout.tsx` — header nav: Calculators, Topics, Guides, Converters, Simulations, Practice, Search; footer lists all 8 hubs + legal pages; WebSite JSON-LD + SearchAction → `/search?q={search_term_string}`; favicon + OG image wired in.

### Design
- `app/globals.css` — brand variables (see §1), consistent button/card/badge/form styles, 360px guards: grids → 1 column, nav wraps, hero H1 clamps, `overflow-x: clip` on body, tables scroll internally.
- `app/page.tsx` — homepage redesigned: hero with H1 + lead + embedded SUVAT tool, trust section (hand-checked formulas, SI units, step-by-step working, no sign-up), top-12 row, 8-hub grid, 4-question FAQ preview (with FAQPage JSON-LD), links to guides/converters/simulations/practice. Homepage now has a self-canonical (added in integration — it was missing).
- `public/favicon.svg`, `public/og-image.svg` (1200×630).

### Content
- **Guides — all 35 now rewritten to the content-writer standard.** The remaining 23 were rewritten in this build (800–1,200 words pre-FAQ each; the 12 from the fix round measure 851–1,020 pre-FAQ by the same method). Every guide has: direct-answer first paragraph, key takeaways (3–5 facts), a REAL key equation with symbols defined, a worked example with real numbers substituted step by step + plausibility check, topic-specific common mistakes, **5–6 FAQs** (the 12 earlier guides had only 3 — 2 extra FAQs each were added in integration), and 3–5 internal links with descriptive anchors (all link targets verified against real slugs; zero "click here"). **Placeholder sentence occurrences: 0** (was 11).
- **Calculators — all 68 now have unique content** in `lib/calculator-content.ts` (was 15): unique title ≤60 chars, unique description 150–160 chars, worked example with real numbers (4–6 steps), exactly 3 unique FAQs, conversion note where relevant, related-guide link where one exists. Near-duplicate intents (velocity vs average-velocity, final vs initial velocity, wave-speed vs wavelength vs frequency, etc.) carry an explicit note naming the sibling page and how it differs, instead of a new page. Worked-example numbers were hand-checked against `lib/calculator-specs.ts` and re-verified in Python (escape velocity 11,185 m/s, ISS orbit 7,672 m/s / 5,545 s ≈ 92.4 min, Coulomb 5.39 N, ideal gas 124,710 Pa, Snell 19.5° / critical 41.8°, pendulum 2.01 s, Doppler 1,062 / 945 Hz, etc.).
- **Converters & simulations — descriptions rewritten:** all 15 converters and 15 simulations now have unique 150–160-char descriptions plus a `whenToUse` paragraph (1–2 sentences, concrete example). No unit name, symbol or factor was changed (verified byte-identical).
- **Practice — 18 → 34 questions** in `lib/practice.ts`, every question with a `topic` field. Counts: Kinematics 4, Forces 5, Energy 5, Waves 4, Electricity 6, Thermodynamics 4, Optics 4, Oscillations 2. All have exactly 3 options, one correct answer, and an explanation showing the arithmetic.

### SEO / GEO / AEO
- `lib/seo.ts` — shared helpers used by templates AND the audit, so the audited values are the rendered values: `fitTitle` (≤60), `fitDescription` (150–160, truncates at a word boundary or pads with a standard suffix in code), `pageMetadata` (canonical when `NEXT_PUBLIC_SITE_URL` is set, OG + Twitter `summary_large_image` with `/og-image.svg`), `breadcrumbJsonLd`, `calculatorDirectAnswer` (40–60 words), plus (added in integration) `demoteH1` and `extractGuideFaqs`.
- Every indexable page: unique title ≤60, unique description 150–160, one H1, self-canonical (when the site URL env var is set), OG + Twitter. BreadcrumbList JSON-LD on deep pages (Home › Hub › Page). FAQPage JSON-LD where FAQs exist — including guides (added in integration: FAQPage is now built from each guide's own FAQ section). Article JSON-LD on guides (author/publisher "Physics Fundamentals", dates 2026-11-13). First paragraph answers the main question directly; calculator pages have a 40–60-word direct-answer paragraph under "Equation and method". Internal linking: every calculator/guide links up to its hub and to 3 related pages; homepage links the top-12 and all 8 hubs.
- **Integration fixes (found by the coordinator's built-HTML spot check, not by the workers):** (1) all 35 guide pages rendered **2 H1s** — the markdown content starts with a "# Title" H1 duplicating the page H1. Fixed in `components/MarkdownGuide.tsx` via `demoteH1` (rendered H1 → H2). (2) Guide pages had **no FAQPage JSON-LD**. Fixed in `app/guides/[slug]/page.tsx` via `extractGuideFaqs`. (3) Homepage had **no canonical**. Fixed with a `pageMetadata` export in `app/page.tsx`. (4) The 15 pre-existing calculator descriptions (144–230 chars) and 10 guide descriptions (102–147 chars) were outside 150–160 at source — rewritten at source to 150–160 chars (descriptions only; worked examples/FAQs untouched). (5) The 12 earlier guides had only 3 FAQs each — 2 accurate FAQs added per guide (24 total), so every guide now has 5–6.

### Dynamic / interactive
- SUVAT multi-solve tool (any 3 of s,u,v,a,t → other 2, working shown, km/h ↔ m/s), density + pressure multi-solve tools with unit selects (g/cm³ ↔ kg/m³, cm² ↔ m², Pa/kPa). All 68 calculators are client-interactive with step-by-step working shown on the top-12+ pages.
- **Simulations — all 15 now have a real inline SVG diagram** computed from the same model values as the numbers (2 from the fix round + 13 added now): v–t graph with shaded area, force/friction blocks with labelled arrows, energy skate slope + KE/PE bars, collision before/after blocks, circular-motion circle with radius + tangent + inward arrows, spring coil, pendulum swing arc, sine wave with λ marked, sound-beats envelope, circuit diagram, lens ray diagram, gas piston. Each SVG has a `<title>`, `viewBox="0 0 320 180"`, width 100%. The generic bar survives only as an unreachable fallback. Real slider names on all 15 (no "Parameter A/B/C" anywhere in the built site). Two honest diagram caveats: sound-beats compresses the carrier to 12 cycles so beats are visible (labelled "(carrier compressed)"); the spring diagram's displacement offset is a fixed illustrative 18px (displacement is not a model parameter) — m, k and T shown are the real model values.
- Site search: 337-entry index, live filtering, grouped results.

### Audit (programmatic)
- `tests/seo-audit.test.ts` — 15 tests: 8 hub slugs; titles ≤60 + unique and descriptions 150–160 + unique per type and across all page types; direct answers 40–60 words for all 68 calculators; every guide has a FAQ heading and ≥4 extractable FAQs; every guide/converter/simulation mapped to a hub; search index covers all 337 entries; `suvat` search finds the calculator, nonsense finds nothing; `demoteH1` unit checks.

## 4. Files created / changed in this build
Created: `lib/topics.ts`, `lib/search-index.ts`, `lib/seo.ts`, `app/topics/page.tsx`, `app/topics/[slug]/page.tsx`, `app/search/page.tsx`, `components/SearchClient.tsx`, `components/SearchBox.tsx`, `components/PracticeClient.tsx`, `public/favicon.svg`, `public/og-image.svg`, `tests/seo-audit.test.ts`.
Changed: `lib/guides.ts` (23 guides rewritten + 24 FAQs added + 10 descriptions lengthened), `lib/calculator-content.ts` (53 entries added + 15 descriptions trimmed to 150–160), `lib/practice.ts` (18 → 34 questions + topic field), `lib/converters.ts` (descriptions + whenToUse), `lib/simulations.ts` (descriptions + whenToUse), `components/SimulationLab.tsx` (13 SVG diagrams), `components/MarkdownGuide.tsx` (H1 demotion), `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/sitemap.ts`, all four `[slug]` templates, all six list pages.
Untouched by this build: `lib/calculators.ts`, `lib/calculator-specs.ts`, `lib/suvat.ts`, `components/SuvatTool.tsx`, `components/MultiSolveTool.tsx`, `components/CalculatorTool.tsx` (all from the fix round), `lib/formulas.ts` (196 entries, unchanged).

## 5. Verification (all run by the coordinator, 13–14 Nov 2026)
- `npm install` — PASS (154 packages + 4 added during verification)
- `npm run typecheck` — **PASS, 0 errors**
- `npm test` (Vitest) — **36/36 PASS** (21 physics tests + 15 SEO-audit tests; was 16/16 before the fix round, 21/21 after it)
- `npm run build` with `NEXT_PUBLIC_SITE_URL=https://example.com` — **PASS, 161 static pages generated**
- Built-HTML spot check (all 161 pages scanned): **exactly 1 H1 on every page** (35 guide pages had 2 before the integration fix); homepage, a top-12 calculator (density, suvat), a rewritten guide (newtons-laws, kinematics-basics), a hub (kinematics), /search, a simulation (lens-lab) and a converter (length) all checked for title, canonical, OG image, BreadcrumbList, FAQPage and Article schema — all present where required. Placeholder sentence: 0 occurrences in built HTML. "Parameter A": 0 occurrences.
- Live server check (`next start`, curl): homepage 200, /calculators/density 200, /topics/kinematics 200, /guides/newtons-laws 200; `/sitemap.xml` returns **155 URLs**, including all 8 hubs, and **no /search**; `/robots.txt` allows all and advertises the sitemap; `/search?q=suvat` returns `robots: noindex, follow`.
- Search logic: unit-tested (`suvat` finds the calculator; nonsense returns nothing). The SearchClient reads `?q=` on load and filters live — verified by code inspection, not by a real browser (see §7).

## 6. Launch checklist (from the skill)
| Item | Status |
|---|---|
| Production build passes, no failed tests | ✅ PASS (build 161 pages, tests 36/36) |
| Every planned launch page live and returning 200 (locally) | ✅ Spot-checked 200s; full 200 sweep not run |
| Unique title ≤60 + description 150–160 on every page | ✅ Audit passes; source descriptions now also in range |
| One H1, correct breadcrumbs, correct internal links | ✅ 1 H1 on all 161 built pages; BreadcrumbList on deep pages |
| Every article has FAQ, Article schema, 3–5 internal links | ✅ FAQ 5–6 per guide, Article + FAQPage schema; related-links sections present. Images: ❌ no per-article images — guides have SVG diagrams only on simulations, no 3–5 images per guide (see §7) |
| Every calculator returns correct results on 3+ test cases | ✅ 21 physics tests incl. edge cases; SUVAT spot-checked on 9 input combinations |
| robots.txt + sitemap list every live page once | ✅ 155 URLs, /search excluded, no duplicates (audit) |
| Self-canonical + OG/Twitter on every page | ✅ When `NEXT_PUBLIC_SITE_URL` is set (build verified with https://example.com) |
| Schema validates | ⚠️ JSON-LD is present and well-formed; NOT run through Schema Markup Validator / Rich Results Test (needs a live URL) |
| PageSpeed / Core Web Vitals | ❌ Not measured — no live URL yet |
| No horizontal overflow at 360px | ⚠️ CSS guards in place, **not verified in a real browser** (see §7) |
| Favicon + OG image load | ✅ Both files exist and are referenced; OG image is SVG 1200×630 |
| Analytics installed | ❌ Not installed — needs the user's analytics ID |
| Search Console verification + sitemap submission | ❌ User task after deploy |
| Domain + HTTPS + apex redirect | ❌ **User task — no domain chosen** (see brand warning below) |
| Deployed version matches repo | ❌ Not deployed; not pushed to GitHub |

## 7. What is still NOT done / unverified — read this before launch
1. **360px layout NOT verified in a real browser.** `npx playwright install chromium` failed twice in this environment (Chrome-for-Testing download failure) and no system Chromium/Firefox exists here, so Playwright and the e2e suite (`e2e/site.spec.ts`) could not run. CSS guards are in place (`overflow-x: clip`, 1-column grids at ≤600px, clamped hero H1, SVGs at `viewBox 320` width 100%), and the built HTML has no inline widths over 320px — but that is not a browser proof. Verify on a real device/browser before calling the site mobile-ready.
2. **No per-article images.** The skill asks for 3–5 images with alt text per guide. Guides currently have no images; only simulations have SVG diagrams. Add diagrams/photos per guide (or accept the gap — the pages are tool-led, not image-led).
3. **No qualified-physicist review.** Formulas and worked examples were hand-checked by the builders (see §3), but sign conventions, limiting cases and idealisations have not been reviewed by a qualified physicist — the original VALIDATION-REPORT already warned about this.
4. **No domain, no GitHub repo, no deploy.** Nothing was pushed or published. `NEXT_PUBLIC_SITE_URL` is unset in the project; all verification used `https://example.com` as a placeholder.
5. **⚠️ BRAND WARNING — phyfundamentals.org already exists and ranks for SUVAT** (live-checked 13 Nov 2026; it appeared in the SUVAT top 5). Do NOT register/buy a "Physics Fundamentals" domain or commit to this exact brand name without checking the collision (domain + trademark) first. The site is built under that name because the user's ZIP used it — the name is a decision still to be made, not a settled fact.
6. **Schema not externally validated, PageSpeed not measured, no console-error check in a real browser** — all need a live URL.
7. **Analytics / ads not installed.** No analytics, no AdSense — both need the user's accounts/IDs.
8. **Legal pages are still draft templates** (privacy/terms/disclaimer say "review before launch") — they need review against the real owner, hosting, analytics and advertising setup. Contact page has no working contact channel yet.
9. **53 calculator pages outside the top-12** now have unique content (description/worked example/FAQs), but they are still single-solve and SI-only, except density/pressure/SUVAT which are multi-solve. That matches the research (launch the top 12 best-in-class; the rest are supporting pages), but it is a known limitation, not a bug.
10. **Guides worker's trimming trade-off (from the 23-guide rewrite):** first drafts ran 1,470–1,821 words, so one supplementary section per guide was removed to hit 800–1,200 pre-FAQ words. The dropped material is summarised in the Overview / Key takeaways / Key equation, and all equations, worked examples, mistakes, FAQs and links are intact — but the guides are leaner on background exposition than the first drafts.
