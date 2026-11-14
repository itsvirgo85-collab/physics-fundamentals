import Link from 'next/link';
import { converters } from '@/lib/converters';
import { LIST_META, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: LIST_META.converters.title,
  description: LIST_META.converters.description,
  path: '/converters',
});

export default function Page() {
  return (
    <main className="container page">
      <p className="eyebrow">TOOLS</p>
      <h1>Physics unit converters</h1>
      <p className="lead">
        Convert units using documented conversion factors and temperature offsets. Every converter lists the
        units it supports and the factor each one uses.
      </p>
      <div className="tool-grid">
        {converters.map((c) => (
          <Link className="tool-card" href={`/converters/${c.slug}`} key={c.slug}>
            <h2>{c.name}</h2>
            <p>{c.description}</p>
            <span>Open converter →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
