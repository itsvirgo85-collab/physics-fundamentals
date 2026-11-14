'use client';

import { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { searchEntries, type SearchEntryType } from '@/lib/search-index';

const TYPE_LABELS: Record<SearchEntryType, string> = {
  calculator: 'Calculators',
  guide: 'Guides',
  converter: 'Converters',
  simulation: 'Simulations',
  formula: 'Formulas',
  topic: 'Topic hubs',
};

const TYPE_ORDER: SearchEntryType[] = ['calculator', 'guide', 'converter', 'simulation', 'formula', 'topic'];

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialQ = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);
  const results = searchEntries(query);
  const grouped = TYPE_ORDER.map((type) => ({
    type,
    entries: results.filter((r) => r.type === type),
  })).filter((g) => g.entries.length > 0);

  const onChange = (value: string) => {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('q', value);
    else params.delete('q');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Search physics tools and guides"
      >
        <label className="field" htmlFor="search-page-input">
          Search calculators, guides, converters, simulations and formulas
          <input
            id="search-page-input"
            className="search-input search-input-large"
            type="search"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Try “suvat”, “density”, “ohm’s law” or “wave speed”…"
            autoComplete="off"
            autoFocus
          />
        </label>
      </form>

      {query.trim() === '' && (
        <p className="muted" style={{ marginTop: 18 }}>
          Type a topic, an equation or a unit above. Popular searches:{' '}
          <Link href="/search?q=suvat">SUVAT</Link>, <Link href="/search?q=density">density</Link>,{' '}
          <Link href="/search?q=kinetic%20energy">kinetic energy</Link>,{' '}
          <Link href="/search?q=wave%20speed">wave speed</Link>,{' '}
          <Link href="/search?q=ohms%20law">Ohm’s law</Link>.
        </p>
      )}

      {query.trim() !== '' && results.length === 0 && (
        <section className="card" aria-live="polite">
          <h2>No results for “{query}”</h2>
          <p>Try a shorter or more general term, check the spelling, or browse by topic instead:</p>
          <ul>
            <li>Use one or two words, for example “momentum” instead of “how do I calculate momentum”.</li>
            <li>Search for a quantity or unit, for example “velocity”, “watts” or “pascal”.</li>
            <li>
              Browse the <Link href="/topics">topic hubs</Link>, the{' '}
              <Link href="/calculators">calculator list</Link> or the{' '}
              <Link href="/formulas">formula library</Link>.
            </li>
          </ul>
        </section>
      )}

      {grouped.map((group) => (
        <section key={group.type} style={{ marginTop: 32 }}>
          <h2>
            {TYPE_LABELS[group.type]} ({group.entries.length})
          </h2>
          <div className="tool-grid">
            {group.entries.map((entry) => (
              <Link className="tool-card" href={entry.url} key={`${entry.type}-${entry.slug}`}>
                <small>{TYPE_LABELS[group.type]}</small>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
                <span>Open →</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
