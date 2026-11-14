import type { MetadataRoute } from 'next';
import { calculators } from '@/lib/calculators';
import { converters } from '@/lib/converters';
import { simulations } from '@/lib/simulations';
import { guides } from '@/lib/guides';
import { topics } from '@/lib/topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  const paths = [
    '',
    '/calculators',
    '/converters',
    '/simulations',
    '/formulas',
    '/guides',
    '/practice',
    '/topics',
    '/references',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    ...topics.map((x) => `/topics/${x.slug}`),
    ...calculators.map((x) => `/calculators/${x.slug}`),
    ...converters.map((x) => `/converters/${x.slug}`),
    ...simulations.map((x) => `/simulations/${x.slug}`),
    ...guides.map((x) => `/guides/${x.slug}`),
  ];
  // /search is deliberately NOT in the sitemap: it is noindex (see app/search/page.tsx).
  // Pages changed by the 14 Nov 2026 enhancement round (share buttons, key
  // facts, TOC, HowTo, hub top picks, unique card descriptions) carry that
  // date; untouched pages keep their earlier lastmod.
  const changed = (path: string) =>
    path === '' ||
    path === '/calculators' ||
    path.startsWith('/calculators/') ||
    path.startsWith('/guides/') ||
    path.startsWith('/topics/');
  const lastModified = (path: string) =>
    changed(path)
      ? new Date('2026-11-14')
      : path.startsWith('/topics')
        ? new Date('2026-11-13')
        : new Date('2026-11-10');
  return paths.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: lastModified(path),
    changeFrequency: path === '' ? 'monthly' : ('yearly' as const),
    priority: path === '' ? 1 : path.split('/').length === 2 ? 0.8 : 0.65,
  }));
}
