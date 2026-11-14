import Link from 'next/link';
import { guides } from '@/lib/guides';
import { LIST_META, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: LIST_META.guides.title,
  description: LIST_META.guides.description,
  path: '/guides',
});

export default function Page() {
  return (
    <main className="container page">
      <p className="eyebrow">LEARN</p>
      <h1>Physics learning guides</h1>
      <p className="lead">
        Concept-first explanations, equations, worked examples and common mistakes — each guide ends with a
        frequently asked questions section and links to related calculators.
      </p>
      <div className="tool-grid">
        {guides.map((g) => (
          <Link className="tool-card" href={`/guides/${g.slug}`} key={g.slug}>
            <small>{g.category}</small>
            <h2>{g.title}</h2>
            <p>{g.description}</p>
            <span>Read guide →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
