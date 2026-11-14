import type { Metadata } from 'next';
import type { Calculator } from './calculators';
import type { CalculatorContent } from './calculator-content';
import type { Guide } from './guides';
import type { Converter } from './converters';
import type { Simulation } from './simulations';

/**
 * Shared SEO helpers. Every page template AND the SEO audit test import
 * these functions, so the "effective" title / description the audit checks
 * is exactly what the templates render. Nothing here edits source data:
 * descriptions that are too long are truncated in code, and ones that are
 * too short are padded in code with a standard suffix.
 */

export const SITE_NAME = 'Physics Fundamentals';
export const BRAND_SUFFIX = ' | Physics Fundamentals'; // 23 chars
export const PUBLISHED_DATE = '2026-11-13';
/** Date the enhancement round changed calculator/guide/hub/home pages. */
export const UPDATED_DATE = '2026-11-14';
export const UPDATED_LABEL = '14 November 2026';
/** Live production domain — the fallback base for canonical / share / OG URLs
 *  when NEXT_PUBLIC_SITE_URL is not set (the live deploy sets no env vars). */
export const LIVE_SITE_URL = 'https://physics-fundamentals-phi.vercel.app';

export function siteUrl(): string | undefined {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return base || undefined;
}

/** Canonical base: the configured site URL, else the live production domain. */
export function siteBase(): string {
  return siteUrl() ?? LIVE_SITE_URL;
}

export function canonicalUrl(path: string): string {
  return `${siteBase()}${path}`;
}

export function absoluteUrl(path: string): string {
  return `${siteBase()}${path}`;
}

/** Fit a primary title into <=60 chars, keeping the brand suffix when it fits. */
export function fitTitle(primary: string): string {
  const p = primary.trim().replace(/\s+/g, ' ');
  const withBrand = `${p}${BRAND_SUFFIX}`;
  if (withBrand.length <= 60) return withBrand;
  if (p.length <= 60) return p;
  const cut = p.slice(0, 57);
  const idx = cut.lastIndexOf(' ');
  return `${(idx >= 40 ? cut.slice(0, idx) : cut).trimEnd()}…`;
}

const PAD_SENTENCES = [
  'Free to use, with SI units, worked examples and step-by-step working shown.',
  'No sign-up needed — check the equation, inputs and assumptions before trusting the result.',
];

function truncateDescription(s: string): string {
  const cut = s.slice(0, 156);
  const idx = cut.lastIndexOf(' ');
  const body = idx >= 149 ? cut.slice(0, idx) : cut;
  return `${body.trimEnd()}…`;
}

/**
 * Effective meta description: 150-160 chars.
 * - already in range: returned as-is
 * - too long: truncated at a word boundary with an ellipsis
 * - too short: standard suffix sentence(s) appended in code, then truncated if needed
 */
export function fitDescription(base: string): string {
  const b = base.trim().replace(/\s+/g, ' ');
  if (b.length >= 150 && b.length <= 160) return b;
  if (b.length > 160) return truncateDescription(b);
  let out = b;
  for (const pad of PAD_SENTENCES) {
    if (out.length >= 150) break;
    out = `${out.replace(/[.?!…]$/, '')}. ${pad}`;
  }
  if (out.length > 160) return truncateDescription(out);
  if (out.length < 150) {
    out = `${out} All tools are free and show their working.`;
    if (out.length > 160) return truncateDescription(out);
  }
  return out;
}

/** Full metadata object for an indexable page: title, description, canonical, OG + Twitter. */
export function pageMetadata(opts: { title: string; description: string; path: string }): Metadata {
  const { title, description, path } = opts;
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl('/og-image.svg');
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** BreadcrumbList JSON-LD. Items after Home may omit url only for the current page. */
export function breadcrumbJsonLd(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: absoluteUrl(item.url) } : {}),
    })),
  };
}

// ---- Effective titles / descriptions per page type (templates + audit share these) ----

export type CalculatorContentLike = CalculatorContent & { title?: string };

export function calculatorTitle(c: Calculator, content?: CalculatorContentLike): string {
  return fitTitle(content?.title ?? `${c.name} Calculator`);
}

export function calculatorDescription(c: Calculator, content?: CalculatorContentLike): string {
  return fitDescription(content?.description ?? c.description);
}

export function guideTitle(g: Guide): string {
  return fitTitle(g.title);
}

export function guideDescription(g: Guide): string {
  return fitDescription(g.description);
}

export function converterTitle(c: Converter): string {
  return fitTitle(`${c.name} Converter`);
}

export function converterDescription(c: Converter): string {
  return fitDescription(c.description);
}

export function simulationTitle(s: Simulation): string {
  return fitTitle(`${s.title} Simulation`);
}

export function simulationDescription(s: Simulation): string {
  return fitDescription(s.description);
}

/** Optional `whenToUse` field converters / simulations may gain; absent in current data. */
export function whenToUseOf(item: Converter | Simulation): string | undefined {
  return (item as Converter & Simulation & { whenToUse?: string }).whenToUse;
}

/**
 * 40-60 word direct-answer paragraph for a calculator page. Built from the
 * calculator's own spec (input labels, unit, note) so it is unique per page.
 * The equation itself is shown directly above this paragraph, so it is
 * referenced rather than repeated (SUVAT's formula alone is 15 tokens).
 */
export function calculatorDirectAnswer(
  calc: Calculator,
  spec: { labels: string[]; unit: string; note: string },
): string {
  const inputs = spec.labels.map((l) => l.replace(/\s*\(.*\)$/, '').toLowerCase());
  const joined =
    inputs.length <= 1
      ? inputs[0] ?? ''
      : `${inputs.slice(0, -1).join(', ')} and ${inputs[inputs.length - 1]}`;
  const firstSentence = (spec.note.split(/(?<=[.?!])\s/)[0] ?? '').trim();
  const note =
    firstSentence && firstSentence.split(/\s+/).length <= 14
      ? ` ${firstSentence}`
      : ' The model assumes idealised conditions, so treat the result as an estimate.';
  const build = (middle: string) =>
    `To calculate ${calc.name.toLowerCase()}, enter ${joined} in SI units and substitute ` +
    `them into the equation shown above. The answer comes out in ${spec.unit}.${middle} ` +
    `Always check the units and the model assumptions before using the result.`;
  let text = build(note);
  // Keep every direct answer in the 40-60 word band whatever the spec holds.
  if (wordCount(text) < 40) text += ' Keep the units attached to the result.';
  if (wordCount(text) > 60) text = build(' The model assumes idealised conditions.');
  return text;
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Guide markdown starts with a "# Title" H1 that duplicates the page H1.
 * Demote rendered H1s to H2 so every guide page has exactly one H1.
 */
export function demoteH1(html: string): string {
  return html.replace(/<h1(\s[^>]*)?>/g, '<h2$1>').replace(/<\/h1>/g, '</h2>');
}

export type GuideFaq = { q: string; a: string };

/** Extract the FAQ questions/answers from a guide's markdown FAQ section. */
export function extractGuideFaqs(markdown: string): GuideFaq[] {
  const idx = markdown.indexOf('## Frequently asked questions');
  if (idx < 0) return [];
  const section = markdown.slice(idx);
  const parts = section.split(/^### /m).slice(1);
  const faqs: GuideFaq[] = [];
  for (const part of parts) {
    const lines = part.split('\n');
    const q = (lines[0] ?? '').trim();
    const a = lines
      .slice(1)
      .join(' ')
      .replace(/[#*`_]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

// ---- Shared metadata copy for list pages + homepage (templates + audit share these) ----

export const LIST_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Physics Fundamentals | Free Physics Calculators',
    description:
      'Free physics calculators, unit converters, interactive simulations, formula library and learning guides — checked equations, SI units and step-by-step working.',
  },
  calculators: {
    title: fitTitle('Physics Calculators'),
    description:
      'Browse 68 free physics calculators for motion, forces, energy, momentum, waves, electricity and more — every tool shows its equation, SI units and assumptions.',
  },
  guides: {
    title: fitTitle('Physics Guides'),
    description:
      'Read clear physics guides on motion, forces, energy, waves, electricity and heat — each with equations, worked examples, common mistakes and a FAQ section.',
  },
  converters: {
    title: fitTitle('Physics Unit Converters'),
    description:
      'Convert physics units free: length, mass, time, speed, force, energy, power, pressure, area, volume, density, frequency, angle and temperature, with factors.',
  },
  simulations: {
    title: fitTitle('Interactive Physics Simulations'),
    description:
      'Explore interactive physics simulations for motion, waves, circuits, optics and thermodynamics — change parameters and watch the quantities respond instantly.',
  },
  formulas: {
    title: fitTitle('Physics Formula Library'),
    description:
      'A free physics formula library with 196 equations across mechanics, waves, electricity, thermodynamics and optics — each with its equation, units and topic.',
  },
  practice: {
    title: fitTitle('Physics Practice Questions'),
    description:
      'Test yourself with free physics practice questions on motion, forces, energy, waves, electricity and more — check your answers and read each explanation.',
  },
  topics: {
    title: fitTitle('Physics Topics'),
    description:
      'Browse physics by topic: kinematics, forces, energy, momentum, gravitation, waves, electricity and thermodynamics — calculators, guides and simulations.',
  },
};

// ---- Enhancement round: TOC, HowTo, reading time, key facts ----

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export type GuideHeading = { id: string; text: string; level: 2 | 3 };

/** H2/H3 headings of a guide's markdown, in order (the "# Title" H1 is skipped). */
export function extractGuideHeadings(markdown: string): GuideHeading[] {
  const headings: GuideHeading[] = [];
  const seen = new Map<string, number>();
  for (const line of markdown.split('\n')) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length === 2 ? 2 : 3;
    const text = m[2].replace(/[*`_]/g, '').trim();
    if (!text) continue;
    const base = slugifyHeading(text);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    headings.push({ id: n > 1 ? `${base}-${n}` : base, text, level });
  }
  return headings;
}

/** Inject id attributes into rendered h2/h3 tags, matching extractGuideHeadings. */
export function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/g, (_match, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/[*`_]/g, '').trim();
    const base = slugifyHeading(text);
    if (!base) return `<${tag}${attrs}>${inner}</${tag}>`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    const id = n > 1 ? `${base}-${n}` : base;
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
}

/** First sentence of a text (markdown stripped), for short answers. */
export function firstSentence(text: string): string {
  const clean = text.replace(/[#*`_]/g, '').replace(/\s+/g, ' ').trim();
  const m = /^(.+?[.!?])(\s|$)/.exec(clean);
  return (m ? m[1] : clean).trim();
}

/** Reading time in whole minutes at 200 words per minute, minimum 1. */
export function guideReadingTimeMinutes(markdown: string): number {
  const words = markdown.replace(/[#*`_]/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type GuideHowTo = { name: string; steps: string[] };

/**
 * HowTo steps for a guide, taken from its own "Worked example" section:
 * each paragraph of that section becomes one step, markdown stripped.
 * Returns null when there is no usable worked-example section.
 */
export function extractGuideHowTo(markdown: string, guideTitle: string): GuideHowTo | null {
  const idx = markdown.indexOf('## Worked example');
  if (idx < 0) return null;
  const rest = markdown.slice(idx);
  const next = rest.indexOf('\n## ', 1);
  const section = next >= 0 ? rest.slice(0, next) : rest;
  const body = section.replace(/^## Worked example\s*/, '');
  const steps = body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/[#*`_]/g, '').replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 20);
  if (steps.length < 2) return null;
  return { name: `${guideTitle} — worked example`, steps };
}

/** Split a guide's markdown into its top-level (##) sections. */
export function extractGuideSections(markdown: string): { heading: string; body: string }[] {
  const sections: { heading: string; body: string }[] = [];
  const parts = markdown.split(/^## /m);
  for (const part of parts.slice(1)) {
    const nl = part.indexOf('\n');
    if (nl < 0) continue;
    sections.push({ heading: part.slice(0, nl).trim(), body: part.slice(nl + 1) });
  }
  return sections;
}

export type KeyFact = { label: string; text: string };

/**
 * "Key facts" bullets for a calculator page, built only from that page's own
 * data: its formula and unit (spec), the result step of its worked example,
 * and a common mistake taken from its own FAQs (a "why / too low / wrong"
 * question) or, failing that, its conversion note / model note.
 */
export function calculatorKeyFacts(
  spec: { formula: string; unit: string; note: string },
  content?: {
    workedExample?: { steps: string[] };
    faqs?: { q: string; a: string }[];
    conversionNote?: string;
  },
): KeyFact[] {
  const facts: KeyFact[] = [
    { label: 'Formula', text: spec.formula },
    { label: 'Answer in', text: spec.unit },
  ];
  const steps = content?.workedExample?.steps ?? [];
  if (steps.length > 0) {
    facts.push({ label: 'Worked example', text: steps[steps.length - 1] });
  }
  const mistakeFaq = content?.faqs?.find((f) =>
    /why|wrong|too (low|high|big|small)|mistake|common/i.test(f.q),
  );
  if (mistakeFaq) {
    facts.push({
      label: 'Common mistake',
      text: `${mistakeFaq.q} ${firstSentence(mistakeFaq.a)}`,
    });
  } else if (content?.conversionNote) {
    facts.push({ label: 'Watch out', text: content.conversionNote });
  } else {
    facts.push({ label: 'Model note', text: firstSentence(spec.note) });
  }
  return facts;
}
