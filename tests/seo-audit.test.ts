import { describe, it, expect } from 'vitest';
import { calculators } from '@/lib/calculators';
import { calculatorContent } from '@/lib/calculator-content';
import { calculatorSpecs } from '@/lib/calculator-specs';
import { guides } from '@/lib/guides';
import { converters } from '@/lib/converters';
import { simulations } from '@/lib/simulations';
import { formulas } from '@/lib/formulas';
import {
  topics,
  guideHubMap,
  converterHubMap,
  simulationHubMap,
  calculatorsForTopic,
  guidesForTopic,
  convertersForTopic,
  simulationsForTopic,
  topicTitle,
  topicDescription,
} from '@/lib/topics';
import { searchIndex, searchEntries } from '@/lib/search-index';
import {
  LIST_META,
  calculatorTitle,
  calculatorDescription,
  calculatorDirectAnswer,
  guideTitle,
  guideDescription,
  converterTitle,
  converterDescription,
  simulationTitle,
  simulationDescription,
  wordCount,
  demoteH1,
  extractGuideFaqs,
} from '@/lib/seo';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

describe('topics', () => {
  it('has exactly the 8 hubs with the contracted slugs', () => {
    expect(topics.map((t) => t.slug)).toEqual([
      'kinematics',
      'forces-dynamics',
      'work-energy-power',
      'momentum-rotation',
      'gravitation-circular-motion',
      'waves-oscillations',
      'electricity-magnetism',
      'thermodynamics-optics',
    ]);
  });
  it('has unique titles <=60 chars and unique descriptions of 150-160 chars', () => {
    const titles = topics.map((t) => topicTitle(t));
    const descs = topics.map((t) => topicDescription(t));
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of titles) expect(t.length).toBeLessThanOrEqual(60);
    expect(new Set(descs).size).toBe(descs.length);
    for (const d of descs) {
      expect(d.length).toBeGreaterThanOrEqual(150);
      expect(d.length).toBeLessThanOrEqual(160);
    }
  });
  it('covers every calculator category and every guide exactly once', () => {
    for (const c of calculators) expect(calculatorsForTopic).toBeDefined();
    const cats = [...new Set(calculators.map((c) => c.category))];
    expect(cats).toHaveLength(8);
    for (const cat of cats) {
      const topic = topics.find((t) => t.category === cat);
      expect(topic, cat).toBeDefined();
      expect(calculatorsForTopic(topic!.slug).length).toBeGreaterThan(0);
    }
    for (const g of guides) expect(guideHubMap[g.slug], g.slug).toBeDefined();
    expect(Object.keys(guideHubMap)).toHaveLength(guides.length);
    for (const t of topics) expect(guidesForTopic(t.slug).length).toBeGreaterThan(0);
    for (const c of converters) expect(converterHubMap[c.slug], c.slug).toBeDefined();
    for (const s of simulations) expect(simulationHubMap[s.slug], s.slug).toBeDefined();
    for (const t of topics) {
      expect(convertersForTopic(t.slug).length + simulationsForTopic(t.slug).length).toBeGreaterThan(0);
    }
  });
});

describe('calculators', () => {
  it('has unique slugs, unique titles <=60 and unique descriptions of 150-160 chars', () => {
    const slugs = calculators.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const titles = calculators.map((c) => calculatorTitle(c, calculatorContent[c.slug]));
    const descs = calculators.map((c) => calculatorDescription(c, calculatorContent[c.slug]));
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of titles) expect(t.length).toBeLessThanOrEqual(60);
    expect(new Set(descs).size).toBe(descs.length);
    for (const d of descs) {
      expect(d.length).toBeGreaterThanOrEqual(150);
      expect(d.length).toBeLessThanOrEqual(160);
    }
  });
  it('has a 40-60 word direct-answer paragraph for every calculator', () => {
    for (const c of calculators) {
      const spec = calculatorSpecs[c.slug];
      expect(spec, c.slug).toBeDefined();
      const answer = calculatorDirectAnswer(c, spec);
      const n = wordCount(answer);
      expect(n, `${c.slug}: ${answer}`).toBeGreaterThanOrEqual(40);
      expect(n, `${c.slug}: ${answer}`).toBeLessThanOrEqual(60);
    }
  });
});

describe('guides', () => {
  it('has unique slugs, unique titles <=60 and unique descriptions of 150-160 chars', () => {
    const slugs = guides.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const titles = guides.map((g) => guideTitle(g));
    const descs = guides.map((g) => guideDescription(g));
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of titles) expect(t.length).toBeLessThanOrEqual(60);
    expect(new Set(descs).size).toBe(descs.length);
    for (const d of descs) {
      expect(d.length).toBeGreaterThanOrEqual(150);
      expect(d.length).toBeLessThanOrEqual(160);
    }
  });
  it('has a FAQ heading in every guide', () => {
    for (const g of guides) {
      expect(/Frequently asked questions|## FAQ/.test(g.content), g.slug).toBe(true);
    }
  });
  it('yields at least 4 extractable FAQs per guide and demotes the markdown H1', () => {
    for (const g of guides) {
      const faqs = extractGuideFaqs(g.content);
      expect(faqs.length, g.slug).toBeGreaterThanOrEqual(4);
      for (const f of faqs) {
        expect(f.q.length).toBeGreaterThan(0);
        expect(f.a.length).toBeGreaterThan(20);
      }
    }
    expect(demoteH1('<h1>Title</h1><p>x</p>')).toBe('<h2>Title</h2><p>x</p>');
    expect(demoteH1('<h1 class="a">T</h1>')).toBe('<h2 class="a">T</h2>');
  });
});

describe('converters and simulations', () => {
  it('converters have unique slugs, titles <=60 and descriptions of 150-160 chars', () => {
    const slugs = converters.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const titles = converters.map((c) => converterTitle(c));
    const descs = converters.map((c) => converterDescription(c));
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of titles) expect(t.length).toBeLessThanOrEqual(60);
    expect(new Set(descs).size).toBe(descs.length);
    for (const d of descs) {
      expect(d.length).toBeGreaterThanOrEqual(150);
      expect(d.length).toBeLessThanOrEqual(160);
    }
  });
  it('simulations have unique slugs, titles <=60 and descriptions of 150-160 chars', () => {
    const slugs = simulations.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const titles = simulations.map((s) => simulationTitle(s));
    const descs = simulations.map((s) => simulationDescription(s));
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of titles) expect(t.length).toBeLessThanOrEqual(60);
    expect(new Set(descs).size).toBe(descs.length);
    for (const d of descs) {
      expect(d.length).toBeGreaterThanOrEqual(150);
      expect(d.length).toBeLessThanOrEqual(160);
    }
  });
});

describe('all pages', () => {
  it('has unique effective titles and descriptions across every page type', () => {
    const titles = [
      ...calculators.map((c) => calculatorTitle(c, calculatorContent[c.slug])),
      ...guides.map((g) => guideTitle(g)),
      ...converters.map((c) => converterTitle(c)),
      ...simulations.map((s) => simulationTitle(s)),
      ...topics.map((t) => topicTitle(t)),
      ...Object.values(LIST_META).map((m) => m.title),
    ];
    expect(new Set(titles).size).toBe(titles.length);
    const descs = [
      ...calculators.map((c) => calculatorDescription(c, calculatorContent[c.slug])),
      ...guides.map((g) => guideDescription(g)),
      ...converters.map((c) => converterDescription(c)),
      ...simulations.map((s) => simulationDescription(s)),
      ...topics.map((t) => topicDescription(t)),
      ...Object.values(LIST_META).map((m) => m.description),
    ];
    expect(new Set(descs).size).toBe(descs.length);
  });
  it('has unique URLs across the whole sitemap surface', () => {
    const urls = [
      '/',
 '/calculators', '/converters', '/simulations', '/formulas', '/guides', '/practice', '/topics',
      '/references', '/about', '/contact', '/privacy', '/terms', '/disclaimer',
      ...calculators.map((c) => `/calculators/${c.slug}`),
      ...converters.map((c) => `/converters/${c.slug}`),
      ...simulations.map((c) => `/simulations/${c.slug}`),
      ...guides.map((g) => `/guides/${g.slug}`),
      ...topics.map((t) => `/topics/${t.slug}`),
    ];
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).not.toContain('/search'); // noindex: never in the sitemap
  });
  it('list-page metadata is in range', () => {
    for (const [key, m] of Object.entries(LIST_META)) {
      expect(m.title.length, key).toBeLessThanOrEqual(60);
      expect(m.description.length, key).toBeGreaterThanOrEqual(150);
      expect(m.description.length, key).toBeLessThanOrEqual(160);
    }
  });
});

describe('search index', () => {
  it('covers every calculator, guide, converter, simulation, formula and topic', () => {
    expect(searchIndex).toHaveLength(
      calculators.length + guides.length + converters.length + simulations.length + formulas.length + topics.length,
    );
    for (const c of calculators) {
      expect(searchIndex.some((e) => e.type === 'calculator' && e.url === `/calculators/${c.slug}`), c.slug).toBe(true);
    }
    for (const g of guides) {
      expect(searchIndex.some((e) => e.type === 'guide' && e.url === `/guides/${g.slug}`), g.slug).toBe(true);
    }
    for (const t of topics) {
      expect(searchIndex.some((e) => e.type === 'topic' && e.url === `/topics/${t.slug}`), t.slug).toBe(true);
    }
    for (const f of formulas) {
      expect(searchIndex.some((e) => e.type === 'formula' && e.slug === slugify(f.name)), f.name).toBe(true);
    }
    for (const e of searchIndex) {
      expect(e.title.length).toBeGreaterThan(0);
      expect(e.description.length).toBeGreaterThan(0);
      expect(e.keywords.length).toBeGreaterThan(0);
    }
  });
  it('finds the SUVAT calculator and returns nothing for nonsense', () => {
    expect(searchEntries('suvat').some((e) => e.url === '/calculators/suvat')).toBe(true);
    expect(searchEntries('zzzzqqq')).toHaveLength(0);
    expect(searchEntries('')).toHaveLength(0);
  });
});
