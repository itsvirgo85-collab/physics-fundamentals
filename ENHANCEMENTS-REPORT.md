# Enhancements Report — Physics Fundamentals (14 November 2026)

Ranking-focused enhancement round for the Physics Fundamentals site
(Next.js 15 + React 19, live at https://physics-fundamentals-phi.vercel.app/).
Built on the full build of 14 Nov 2026 (~00:50 PKT). **Nothing was deployed,
pushed to GitHub, or changed in any paid setting in this round** — all work is
local in `~/workspace/physics-fundamentals/` and must be pushed/deployed by the
user (or with the user's approval while present).

## 1. Social sharing (must-have) — done

### New files
- **`lib/share.ts`** — pure URL builders, no third-party scripts, no tracking.
  Share URL formats (URL and title are `encodeURIComponent`-encoded):
  - X/Twitter: `https://twitter.com/intent/tweet?url=<URL>&text=<TITLE>`
  - Facebook: `https://www.facebook.com/sharer/sharer.php?u=<URL>`
  - WhatsApp: `https://wa.me/?text=<TITLE + " " + URL>` (single `text` param)
  - LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=<URL>`
- **`components/ShareButtons.tsx`** — client component rendering the four
  share links plus a **Copy Link** button (clipboard API with
  textarea/`execCommand` fallback, "Copied ✓" state for 2s) and a **native
  Web Share** button shown only when `navigator.share` exists (mounted via
  `useEffect`, so no hydration mismatch). All buttons have `aria-label`s and
  the group has `role="group" aria-label="Share this page"`.
- **`tests/share.test.ts`** — 8 tests: exact encoded URLs for all four
  networks, special characters (`&`, `?`, spaces) encoded correctly,
  `canonicalUrl` falls back to the live domain when `NEXT_PUBLIC_SITE_URL`
  is unset and uses the configured URL when set.

### Placement (verified in built HTML)
- **All 68 calculator pages** — after the lead paragraph.
- **All 35 guide pages** — twice: after the lead and at the end of the guide.
- **Homepage** — after the FAQ section, before the CTA.
- The shared URL is the page's canonical URL: `NEXT_PUBLIC_SITE_URL` when
  set, otherwise the live domain `https://physics-fundamentals-phi.vercel.app/`
  as fallback. `example.com` is never used as a share base.

### Per-page Open Graph
- `lib/seo.ts` `pageMetadata()` now always sets a canonical (previously it
  was env-gated); `canonicalUrl(path)` and `siteBase()` added with the live
  domain fallback. Spot-checked in built HTML: density calculator
  (`og:url` = live `/calculators/density`, `summary_large_image`), motion
  graphs guide (`og:title`/`twitter:title` = "How to read motion graphs |
  Physics Fundamentals", `og:url` = live guide URL), kinematics hub
  (`og:url` = live hub URL). Existing local `og-image.svg` (1200×630)
  unchanged; no new images added anywhere.

## 2. Homepage template-description fix — done

- `app/page.tsx` and `app/calculators/page.tsx` now render
  `calculatorDescription(c, calculatorContent[c.slug])` (the unique
  descriptions) instead of `c.description`.
- **Bonus fix found during verification:** the template sentence was also
  being serialized into the RSC payload of the 65 `CalculatorTool` pages
  (the whole calculator object was passed as a client-component prop).
  Fixed by passing `{ ...c, description }` (unique description) to
  `CalculatorTool` in `app/calculators/[slug]/page.tsx`.
- Verified in the final build: **0 pages** in `.next/server/app/**/*.html`
  contain the sentence "using a stated physics equation" anywhere — not in
  visible text and not in any payload. The search index already used unique
  descriptions (`lib/search-index.ts`).

## 3. Guides — TOC, freshness, HowTo — done

- `app/guides/[slug]/page.tsx` now renders:
  - **Table of Contents** ("On this page", H2 anchor links) built from
    `extractGuideHeadings` — the ids match the anchors `MarkdownGuide`
    injects via `addHeadingIds` (new in `lib/seo.ts`; `slugifyHeading`
    handles duplicate headings with `-2`, `-3` suffixes).
  - **"Last updated: 14 November 2026 · N min read"** line
    (`guideReadingTimeMinutes`, 200 wpm, min 1) under the lead.
  - **HowTo JSON-LD** from `extractGuideHowTo`: the steps are the
    paragraphs of the guide's own "Worked example" section (2–10 per guide);
    no steps invented. Article `dateModified` now uses `UPDATED_DATE`
    (`2026-11-14`) instead of the publish date.
- **Direct answers (GEO/AEO):** the first paragraph of every question-style
  H2 section ("How to check your answer" in all 35 guides, plus "How the
  shift arises" in the Doppler guide) was restructured to a **40–60 word**
  direct answer made from the section's own opening sentences (moved, not
  duplicated). Verified: 36 direct-answer paragraphs, all in 40–60 words
  (e.g. kinematics-basics 54, friction-static-kinetic 40,
  free-body-diagrams 60). Placeholder occurrences in `guides.ts` remain 0.
- Existing BreadcrumbList / FAQPage / Article JSON-LD verified present —
  nothing duplicated.

## 4. Calculators — prev/next, related, key facts — done

- `app/calculators/[slug]/page.tsx` now has:
  - **Prev/next links** within the same category, ordered as in
    `lib/calculators.ts` (e.g. density's previous is Magnification, the last
    calculator of its category; next is empty at the end of a category).
  - **"Related calculators"** — always 3 links from the same hub
    (previously 2 when a related guide existed), followed by the existing
    "Related pages" (hub + guide).
  - **"Key facts" box** (3–5 bullets from `calculatorKeyFacts` in
    `lib/seo.ts`): Formula, Answer in (SI unit), Worked example (the last
    step of the worked example, i.e. the result), and Common mistake
    (matched from a why/wrong/too-low/too-high/mistake FAQ, else the
    conversion note). Every calculator gets Formula + unit + worked result.
  - The existing **40–60-word direct answer** lead is unchanged.
- BreadcrumbList JSON-LD was already present on calculator and guide pages
  (verified in code and in built HTML) — not duplicated.

## 5. Internal linking — done (verified, not assumed)

- **Guides → hub + calculator:** verified in built HTML for all 35 guides —
  every guide page links to its hub (`/topics/<slug>`) and to at least one
  calculator tool with descriptive anchor text ("Try the … calculator" /
  "Explore the … topic hub"). No guide needed a fix.
- **Hubs → top 3:** `lib/topics.ts` gained `hubTopPicks` (top-3 calculators
  per hub with a one-line reason each); `app/topics/[slug]/page.tsx` renders
  a **"Start with these three"** section with those reasons, e.g.
  kinematics: SUVAT / projectile-motion / free-fall-time.
- Hub calculator cards also use the unique descriptions now.

## 6. Technical SEO — done

- **Hub ItemList JSON-LD:** each hub page lists its calculators as
  `ListItem`s with position, name and canonical URL.
- **Sitemap** (`app/sitemap.ts`): `lastModified` bumped to **2026-11-14** for
  the 113 URLs actually changed in this round (homepage, calculators list,
  all 68 calculator pages, all 35 guide pages, all 8 hub pages). Untouched
  pages keep their earlier dates (41 at 2026-11-10 — converters, simulations,
  guides list, legal/info pages; 1 at 2026-11-13 — topics index). Total
  155 URLs. Verified live-served sitemap counts: 113 × 2026-11-14,
  41 × 2026-11-10, 1 × 2026-11-13.
- **`/robots.txt`:** `User-Agent: * / Allow: /` plus the sitemap line
  pointing at the live domain — all indexable pages allowed.
- **`/search`:** stays `noindex` (verified `noindex` in built HTML) and is
  **not** in the sitemap (0 occurrences in the served sitemap).

## 7. Performance / accessibility pass — done

- Share buttons all carry `aria-label`s; the share group has `role="group"`.
- **No new images** added in this round, so no missing width/height/alt.
- **No external fonts, scripts, or analytics** added. No third-party share
  scripts — share links are plain anchors.
- **Exactly 1 H1 on every page:** verified across all built HTML pages
  (0 pages with != 1 H1), including homepage, density calculator,
  motion-graphs guide and all hub pages.

## 8. Tests added

- `tests/share.test.ts` — 8 tests (share URL builders, canonical fallback).
- `tests/enhancements.test.ts` — 11 tests: top-12 and all calculator cards
  use unique descriptions; every guide has ≥5 H2 TOC headings incl. "Worked
  example" and "Frequently asked questions" with unique ids, HowTo steps ≥2
  from its own worked example, reading time ≥1 min, every question-style H2
  followed by a 40–60-word direct answer; every hub has exactly 3 top picks
  resolving to real calculators with one-line reasons (10–140 chars); every
  calculator gets 3–5 key facts incl. Formula + unit + worked result;
  `addHeadingIds` injects stable anchor ids; every guide maps to a hub with
  calculators; every category has ≥2 calculators so prev/next resolves.

## 9. Verification results (all pass)

| Check | Result |
|---|---|
| `npm run typecheck` | PASS (tsc --noEmit, no errors) |
| `npm test` | **55/55 PASS** — physics 21, seo-audit 15, enhancements 11, share 8 |
| `npm run build` with `NEXT_PUBLIC_SITE_URL=https://physics-fundamentals-phi.vercel.app` | PASS — 161 static pages generated |
| Built HTML: template sentence | **0 pages** contain it (visible or payload) |
| Built HTML: H1 count | exactly 1 on every page |
| Built HTML: share buttons | all 68 calculator pages, all 35 guide pages (×2), homepage |
| Built HTML: calculator page (density) | share ×4 + copy link, key facts, prev/next, related calculators (3), BreadcrumbList + FAQPage, canonical = live URL |
| Built HTML: guide page (motion-graphs) | TOC (6 anchors), "Last updated: 14 November 2026 · 6 min read", HowTo schema (8 steps), share ×2, Article + FAQPage + BreadcrumbList |
| Built HTML: hub page (kinematics / thermodynamics-optics) | ItemList, "Start with these three" with reasons, unique card descriptions, 1 H1 |
| Served sitemap (`next start` + curl) | 155 URLs; 113 @ 2026-11-14, 41 @ 2026-11-10, 1 @ 2026-11-13; `/search` absent |
| Served robots.txt | Allow: /, sitemap = live domain |
| Served pages | `/` 200, `/calculators/density` 200, `/guides/motion-graphs` 200 |
| Guides internal links | all 35 link to their hub and ≥1 calculator |
| `/search` noindex | confirmed in built HTML |

## Files changed (15)

- `lib/seo.ts` — `LIVE_SITE_URL`, `siteBase()`, `canonicalUrl()`, always-on
  canonical, `UPDATED_DATE`/`UPDATED_LABEL`, `slugifyHeading`,
  `extractGuideHeadings`, `addHeadingIds`, `firstSentence`,
  `guideReadingTimeMinutes`, `extractGuideHowTo`, `extractGuideSections`,
  `calculatorKeyFacts`.
- `lib/share.ts` — **new**, share URL builders (X, Facebook, WhatsApp, LinkedIn).
- `components/ShareButtons.tsx` — **new**, share links + copy link + native Web Share.
- `lib/guides.ts` — direct-answer restructuring of the question-style H2
  first paragraphs in all 35 guides (36 paragraphs, 40–60 words).
- `lib/topics.ts` — `hubTopPicks` (top-3 calculators + reason per hub).
- `components/MarkdownGuide.tsx` — applies `addHeadingIds`.
- `app/calculators/[slug]/page.tsx` — ShareButtons, key facts box, "Related
  calculators" (3), prev/next nav, unique description passed to
  `CalculatorTool` (removes template sentence from RSC payload).
- `app/guides/[slug]/page.tsx` — TOC, last-updated + reading time, HowTo
  JSON-LD, ShareButtons (×2), `dateModified` → 2026-11-14.
- `app/page.tsx` — unique top-12 card descriptions, ShareButtons after FAQ.
- `app/calculators/page.tsx` — unique card descriptions.
- `app/topics/[slug]/page.tsx` — ItemList JSON-LD, "Start with these three",
  unique card descriptions.
- `app/sitemap.ts` — `lastModified` 2026-11-14 for changed pages.
- `app/globals.css` — `.share-buttons`, `.share-btn`, `.toc`, `.key-facts`,
  `.page-meta`, `.prev-next` styles.
- `tests/share.test.ts` — **new** (8 tests).
- `tests/enhancements.test.ts` — **new** (11 tests).

## Still NOT done (needs the user / later)

- **Nothing pushed or deployed.** These changes are local only; pushing to
  GitHub (`itsvirgo85-collab/physics-fundamentals`) and redeploying on
  Vercel needs the user's approval while present.
- **GSC sitemap submission** — after deploy, submit the sitemap in Google
  Search Console (user-only; no Search Console access from here).
- **Custom domain decision** still open (brand warning stands:
  phyfundamentals.org already exists and ranks for SUVAT).
- **No per-article photos** added (kept intentionally — no images without
  verified sources).
- No 360px real-browser layout check in this round; no physicist review of
  content; no live schema/PageSpeed run (needs the deployed URL).
- No keyword volumes, KD, CPC or ranking claims were invented anywhere in
  this round.
