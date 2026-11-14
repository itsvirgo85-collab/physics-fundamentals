import { calculators } from './calculators';
import { calculatorContent } from './calculator-content';
import { guides } from './guides';
import { converters } from './converters';
import { simulations } from './simulations';
import { formulas } from './formulas';
import { topics } from './topics';
import {
  calculatorTitle,
  calculatorDescription,
  guideTitle,
  guideDescription,
  converterTitle,
  converterDescription,
  simulationTitle,
  simulationDescription,
} from './seo';
import { topicTitle, topicDescription } from './topics';

export type SearchEntryType = 'calculator' | 'guide' | 'converter' | 'simulation' | 'formula' | 'topic';

export type SearchEntry = {
  title: string;
  slug: string;
  type: SearchEntryType;
  url: string;
  description: string;
  keywords: string[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const STOP = new Set(['the', 'and', 'for', 'with', 'from', 'into', 'using', 'how', 'what', 'when', 'your']);

/** Lowercase keyword tokens from title + category + description. */
function keywordsFor(...texts: (string | undefined)[]): string[] {
  const words = texts
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  return [...new Set(words)];
}

/**
 * Built at build time from the content registries (module scope, so it is
 * baked into the bundle / server render): every calculator, guide,
 * converter, simulation, formula and topic hub, with title, slug, type,
 * url, effective description and keywords.
 */
export const searchIndex: SearchEntry[] = [
  ...calculators.map((c) => ({
    title: calculatorTitle(c, calculatorContent[c.slug]),
    slug: c.slug,
    type: 'calculator' as const,
    url: `/calculators/${c.slug}`,
    description: calculatorDescription(c, calculatorContent[c.slug]),
    keywords: keywordsFor(c.name, c.category, calculatorContent[c.slug]?.description ?? c.description),
  })),
  ...guides.map((g) => ({
    title: guideTitle(g),
    slug: g.slug,
    type: 'guide' as const,
    url: `/guides/${g.slug}`,
    description: guideDescription(g),
    keywords: keywordsFor(g.title, g.category, g.description),
  })),
  ...converters.map((c) => ({
    title: converterTitle(c),
    slug: c.slug,
    type: 'converter' as const,
    url: `/converters/${c.slug}`,
    description: converterDescription(c),
    keywords: keywordsFor(c.name, 'unit converter', c.description, ...c.units.map((u) => u.name)),
  })),
  ...simulations.map((s) => ({
    title: simulationTitle(s),
    slug: s.slug,
    type: 'simulation' as const,
    url: `/simulations/${s.slug}`,
    description: simulationDescription(s),
    keywords: keywordsFor(s.title, s.concept, s.description),
  })),
  ...formulas.map((f) => ({
    title: f.name,
    slug: slugify(f.name),
    type: 'formula' as const,
    url: '/formulas',
    description: `${f.name}: ${f.equation} (${f.unit}) — ${f.category} formula from the Physics Fundamentals formula library.`,
    keywords: keywordsFor(f.name, f.category, f.equation, f.unit),
  })),
  ...topics.map((t) => ({
    title: topicTitle(t),
    slug: t.slug,
    type: 'topic' as const,
    url: `/topics/${t.slug}`,
    description: topicDescription(t),
    keywords: keywordsFor(t.name, t.category, t.keyword, t.intent, t.description),
  })),
];

/** Every query token must match the entry's title, description or keywords. */
export function searchEntries(query: string): SearchEntry[] {
  const tokens = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.length === 0) return [];
  return searchIndex.filter((e) => {
    const hay = `${e.title} ${e.description} ${e.keywords.join(' ')} ${e.type}`.toLowerCase();
    return tokens.every((tok) => hay.includes(tok));
  });
}
