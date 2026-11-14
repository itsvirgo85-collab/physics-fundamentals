import { describe, it, expect } from 'vitest';
import { calculators, getCalculator } from '@/lib/calculators';
import { calculatorContent } from '@/lib/calculator-content';
import { calculatorSpecs } from '@/lib/calculator-specs';
import { guides } from '@/lib/guides';
import { topics, hubTopPicks, topicForGuide, calculatorsForTopic } from '@/lib/topics';
import {
  calculatorDescription,
  calculatorKeyFacts,
  extractGuideHeadings,
  extractGuideHowTo,
  guideReadingTimeMinutes,
  addHeadingIds,
  wordCount,
} from '@/lib/seo';

const TEMPLATE_SENTENCE = 'using a stated physics equation';

const TOP12 = [
  'density',
  'specific-heat',
  'suvat',
  'final-velocity',
  'momentum',
  'pressure',
  'free-fall-time',
  'projectile-motion',
  'gravitational-potential-energy',
  'wave-speed',
  'centripetal-force',
  'kinetic-energy',
];

describe('homepage / list cards use unique descriptions', () => {
  it('no top-12 card shows the old template description', () => {
    for (const slug of TOP12) {
      const c = getCalculator(slug);
      expect(c, slug).toBeDefined();
      const desc = calculatorDescription(c!, calculatorContent[slug]);
      expect(desc).not.toContain(TEMPLATE_SENTENCE);
      expect(desc).not.toBe(c!.description);
    }
  });

  it('no calculator card description on any page is the template sentence', () => {
    for (const c of calculators) {
      const desc = calculatorDescription(c, calculatorContent[c.slug]);
      expect(desc, c.slug).not.toContain(TEMPLATE_SENTENCE);
    }
  });
});

describe('guides: TOC, HowTo, reading time, direct answers', () => {
  it('every guide has a TOC of H2 headings including the worked example', () => {
    for (const g of guides) {
      const headings = extractGuideHeadings(g.content).filter((h) => h.level === 2);
      expect(headings.length, g.slug).toBeGreaterThanOrEqual(5);
      expect(headings.map((h) => h.text), g.slug).toContain('Worked example');
      expect(headings.map((h) => h.text), g.slug).toContain('Frequently asked questions');
      const ids = headings.map((h) => h.id);
      expect(new Set(ids).size, g.slug).toBe(ids.length);
    }
  });

  it('every guide has HowTo steps taken from its own worked example', () => {
    for (const g of guides) {
      const howTo = extractGuideHowTo(g.content, g.title);
      expect(howTo, g.slug).not.toBeNull();
      expect(howTo!.steps.length, g.slug).toBeGreaterThanOrEqual(2);
      for (const step of howTo!.steps) {
        expect(step.length, g.slug).toBeGreaterThan(20);
        expect(step, g.slug).not.toContain('`');
      }
    }
  });

  it('every guide has a reading time of at least 1 minute', () => {
    for (const g of guides) {
      expect(guideReadingTimeMinutes(g.content), g.slug).toBeGreaterThanOrEqual(1);
    }
  });

  it('every question-style H2 is followed by a 40-60 word direct answer', () => {
    for (const g of guides) {
      const sections = g.content.split(/^## /m).slice(1);
      for (const section of sections) {
        const nl = section.indexOf('\n');
        const heading = section.slice(0, nl).trim();
        if (!/^(How|What|Why|When|Which|Can|Do|Does|Is|Are|Should)\b/.test(heading)) continue;
        const firstPara = section
          .slice(nl + 1)
          .split('\n\n')[0]
          .replace(/[#*`_]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const n = wordCount(firstPara);
        expect(n, `${g.slug} / ${heading}`).toBeGreaterThanOrEqual(40);
        expect(n, `${g.slug} / ${heading}`).toBeLessThanOrEqual(60);
      }
    }
  });

  it('addHeadingIds gives every rendered h2/h3 a stable anchor id', () => {
    const html = addHeadingIds('<h2>Overview</h2><p>x</p><h2>Worked example</h2><h3>What is SUVAT?</h3>');
    expect(html).toContain('<h2 id="overview">Overview</h2>');
    expect(html).toContain('<h2 id="worked-example">Worked example</h2>');
    expect(html).toContain('<h3 id="what-is-suvat">What is SUVAT?</h3>');
  });

  it('every guide links to its hub and its hub has calculators to link to', () => {
    for (const g of guides) {
      const hub = topicForGuide(g.slug);
      expect(hub, g.slug).toBeDefined();
      expect(calculatorsForTopic(hub!.slug).length, g.slug).toBeGreaterThan(0);
    }
  });
});

describe('hub top picks', () => {
  it('every hub has exactly 3 top picks with real calculator slugs and one-line reasons', () => {
    for (const t of topics) {
      const picks = hubTopPicks[t.slug];
      expect(picks, t.slug).toBeDefined();
      expect(picks).toHaveLength(3);
      for (const pick of picks) {
        expect(getCalculator(pick.slug), `${t.slug}/${pick.slug}`).toBeDefined();
        expect(pick.reason.length, pick.slug).toBeGreaterThan(10);
        expect(pick.reason.length, pick.slug).toBeLessThanOrEqual(140);
      }
    }
  });
});

describe('calculator key facts', () => {
  it('every calculator gets 3-5 key facts including formula, unit and worked result', () => {
    for (const c of calculators) {
      const spec = calculatorSpecs[c.slug];
      const facts = calculatorKeyFacts(spec, calculatorContent[c.slug]);
      expect(facts.length, c.slug).toBeGreaterThanOrEqual(3);
      expect(facts.length, c.slug).toBeLessThanOrEqual(5);
      const labels = facts.map((f) => f.label);
      expect(labels, c.slug).toContain('Formula');
      expect(labels, c.slug).toContain('Answer in');
      expect(labels, c.slug).toContain('Worked example');
      expect(facts.find((f) => f.label === 'Formula')!.text, c.slug).toBe(spec.formula);
      expect(facts.find((f) => f.label === 'Answer in')!.text, c.slug).toBe(spec.unit);
    }
  });
});

describe('calculator prev/next neighbours', () => {
  it('every category has an order so prev/next links resolve', () => {
    const byCategory = new Map<string, string[]>();
    for (const c of calculators) {
      const list = byCategory.get(c.category) ?? [];
      list.push(c.slug);
      byCategory.set(c.category, list);
    }
    for (const [cat, slugs] of byCategory) {
      expect(slugs.length, cat).toBeGreaterThan(1);
      expect(new Set(slugs).size, cat).toBe(slugs.length);
    }
  });
});
