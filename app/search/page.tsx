import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchClient from '@/components/SearchClient';
import { fitDescription } from '@/lib/seo';

// NOINDEX: search results pages must never be indexed or appear in the sitemap.
export const metadata: Metadata = {
  title: 'Search Physics Fundamentals',
  description: fitDescription(
    'Search free physics calculators, guides, converters, simulations and formulas — type a topic, equation or unit and jump straight to the tool or explanation you need.',
  ),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="container page">
      <p className="eyebrow">SEARCH</p>
      <h1>Search physics tools and guides</h1>
      <p className="lead">
        Search every calculator, guide, converter, simulation and formula on this site. Results update as you type.
      </p>
      <Suspense fallback={<p className="muted">Loading search…</p>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
