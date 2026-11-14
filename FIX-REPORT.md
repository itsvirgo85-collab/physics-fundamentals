# Physics Fundamentals — Fix Report
Date: 13 November 2026
Source: `physics-fundamentals-complete.zip` (ChatGPT, 71 files, dated 10 Nov 2026), fixed in place at `~/workspace/physics-fundamentals/`.
Status: **All fixes applied. Verification green. No deploy, no GitHub push, no domain purchased.**

## What was wrong before
- 65 calculators, but no density, no pressure, and no SUVAT page — three of the top-12 launch targets from the live keyword research (`~/workspace/physics-lowest-competition-research.md`).
- Every calculator page shared one template description and the same 3 generic FAQs; calculators were single-solve only, SI only.
- 15 of 35 guides contained the placeholder "Key equation" text *"Define the system, choose a sign convention, write the governing relation and check dimensions."* and worked examples with no real numbers.
- Simulations used three unnamed sliders ("Parameter A/B/C") with a bar, no diagrams.

## Changes per file

### New files
- **`lib/suvat.ts`** — `solveSuvat()`: multi-solve SUVAT solver. Enter any 3 of s, u, v, a, t; solves the other 2 by repeatedly applying the five SUVAT equations, returning the values plus step-by-step working. Returns `null` for impossible inputs (negative discriminant, negative time, fewer than 3 knowns). Forward-direction root is used where a quadratic has two roots.
- **`lib/calculator-content.ts`** — unique content for the 15 top-12 cluster pages: unique description, a worked example with real hand-checked numbers, 3 unique FAQs, a unit-conversion note, and a related-guide link where one exists.
- **`components/SuvatTool.tsx`** — dedicated SUVAT tool: 5 inputs (leave two blank), velocity unit select (m/s / km/h, converts by 3.6), shows both solved values with working steps and a "which equation do I use?" guide.
- **`components/MultiSolveTool.tsx`** — generic three-variable multi-solve tool with unit selects, used by density and pressure. Converts inputs to SI, solves, and shows the answer in SI plus the common alternative unit (g/cm³, kPa).

### Modified files
- **`lib/calculators.ts`** — added `SUVAT` (Kinematics), `Pressure` (Forces & Dynamics), `Density` (Thermodynamics & Optics). Total calculators 65 → 68.
- **`lib/calculator-specs.ts`** — specs + real functions for the 3 new calculators (see below). `generateStaticParams` and the sitemap read the same `calculators` array, so the 3 new pages are generated and listed automatically.
- **`app/calculators/[slug]/page.tsx`** — renders `SuvatTool` for `/calculators/suvat`, `MultiSolveTool` for density/pressure, `CalculatorTool` for the rest. Uses the unique description (also in metadata), worked example, conversion note, related-guide link, and unique FAQs from `calculator-content.ts`; FAQPage JSON-LD now uses the page's own FAQs. Other calculators keep the generic template.
- **`tests/physics.test.ts`** — calculator count 65 → 68; 5 new tests (below). Total tests 16 → 21.
- **`lib/guides.ts`** — 12 guides rewritten (see below). Other 23 guides untouched (verified by hash).
- **`components/SimulationLab.tsx`** — sliders renamed to real parameter names per simulation (e.g. projectile: Launch speed / Launch angle / Launch height; free-fall: Drop height; pendulum: Length); slider count now matches the model (free-fall and pendulum show 1 slider, not 3) and each slider shows its physical value. Added inline SVG trajectory for `projectile-lab` and an inline SVG drop diagram for `free-fall-lab`, both computed from the same model values as the numbers. Other simulations keep their existing models and the bar visual.

## The 3 new calculators (with test values)
| Calculator | Route | Formula | Test |
|---|---|---|---|
| Density | `/calculators/density` | ρ = m/V, solve for any of ρ/m/V; water-displacement note | 2 kg / 0.001 m³ = **2000 kg/m³** |
| Pressure | `/calculators/pressure` | P = F/A, solve for any of P/F/A; cm²→m² note | 50 N / 25 cm² (= 0.0025 m²) = **20,000 Pa** |
| SUVAT | `/calculators/suvat` | v = u + at; s = ut + ½at²; v² = u² + 2as; s = (u+v)t/2 | u = 0, a = 2 m/s², t = 5 s → **v = 10 m/s, s = 25 m**; also s = 100, u = 10, v = 30 → t = 5 s, a = 4 m/s² |

## Top-12 pages with unique content (15 slugs)
density, specific-heat, final-velocity, suvat, momentum, collision-momentum, pressure, free-fall-time, free-fall-distance, projectile-motion, gravitational-potential-energy, wave-speed, frequency, centripetal-force, kinetic-energy. Each has a unique description, a worked example with real numbers, 3 unique FAQs, and a conversion note. Velocity–time graph is covered by the rewritten `motion-graphs` guide (linked from the kinematics pages).

## Guides rewritten (12, each 800–1,200 words, real key equation, worked example with real numbers, specific common mistakes)
| Guide | Words |
|---|---|
| kinematics-basics | 1,141 |
| motion-graphs | 1,139 |
| constant-acceleration-equations | 1,148 |
| projectile-motion-guide | 1,186 |
| work-energy-theorem | 1,162 |
| conservation-energy | 1,064 |
| momentum-impulse | 1,175 |
| elastic-inelastic-collisions | 1,039 |
| specific-heat-capacity | 1,150 |
| wave-properties | 1,050 |
| ohms-law-guide | 1,163 |
| circular-motion | 1,154 |

Verified numbers include: 240 m / 12 s = 20 m/s; v–t graph area 100 + 400 + 100 = 600 m and the tangent trap (2.5 m/s², not 3.0); SUVAT s = 25 m and 18 m; projectile range 35.3 m / height 5.10 m / flight 2.04 s; 300 J → 10.95 ≈ 11.0 m/s; GPE 98.1 J → 9.90 m/s; recoil 1 m/s; inelastic loss 5.4 J; Q = 84,000 J (water) and 66,800 J (melting ice); wave speed 338 m/s, 600 nm light; LED resistor 350 Ω; centripetal 24 N = 3.06 g, cornering 18.5 m/s = 66.7 km/h. The placeholder sentence is gone from all 12 (11 occurrences remain in the untouched guides).

## Unit conversion (step 5)
- Density: mass kg/g, volume m³/cm³/L, result in kg/m³ and g/cm³.
- Pressure: area m²/cm², result in Pa and kPa.
- SUVAT / velocity: km/h ↔ m/s (÷/× 3.6) in the tool, plus conversion notes on the other top-12 pages (e.g. KE: 72 km/h = 20 m/s).

## Verification (all run 13 Nov 2026, NEXT_PUBLIC_SITE_URL=https://example.com)
- `npm install` — PASS (154 packages)
- `npm run typecheck` — PASS (0 errors; one real type error in the new solver was found and fixed during the work)
- `npm test` (Vitest) — **21/21 PASS** (was 16/16)
- `npm run build` — PASS, **151 static pages** (was 148), including 68 calculator pages; `density.html`, `pressure.html`, `suvat.html` confirmed in the build output, and the built HTML was spot-checked for the worked examples, unique FAQs, SUVAT tool, SVG trajectory, and absence of "Parameter A" / the guide placeholder on rewritten pages.
- SUVAT solver additionally spot-checked on 9 input combinations (including braking, stopping distance, and impossible inputs) — all correct.

## Still NOT fixed
- **23 guides** still template/thin, including the 11 remaining occurrences of the placeholder "Key equation" text (newtons-laws, free-body-diagrams, friction-static-kinetic, rotational-motion, electric-charge-field, electric-potential-voltage, series-parallel-circuits, magnetic-fields-forces, electromagnetic-induction, special-relativity-intro, quantum-physics-intro).
- **53 calculator pages** outside the top-12 cluster still have the template description and generic FAQs, and are single-solve, SI-only.
- Simulations other than projectile/free-fall still use the bar visual, not a diagram.
- No domain selected, no GitHub repository, no deployment — nothing was pushed or published. `NEXT_PUBLIC_SITE_URL` is unset in the project (build verified with `https://example.com` only).
- No keyword volumes, KD, or ranking claims were added anywhere. No scientific subject-matter review by a qualified physicist has been done — the formulas and examples were hand-checked here, but a reviewer should still check sign conventions and limiting cases before public launch (as the original VALIDATION-REPORT already warned).
- Brand warning stands: `phyfundamentals.org` already exists and ranks for SUVAT — check the domain/brand collision before committing to "Physics Fundamentals".
