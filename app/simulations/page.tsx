import Link from 'next/link';
import { simulations } from '@/lib/simulations';
import { LIST_META, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: LIST_META.simulations.title,
  description: LIST_META.simulations.description,
  path: '/simulations',
});

export default function Page() {
  return (
    <main className="container page">
      <p className="eyebrow">EXPLORE</p>
      <h1>Interactive physics simulations</h1>
      <p className="lead">
        Change model parameters and observe how physical quantities respond. Each simulation states the concept
        it models and the simplifications it makes.
      </p>
      <div className="tool-grid">
        {simulations.map((s) => (
          <Link className="tool-card" href={`/simulations/${s.slug}`} key={s.slug}>
            <h2>{s.title}</h2>
            <p>{s.description}</p>
            <small>{s.concept}</small>
          </Link>
        ))}
      </div>
    </main>
  );
}
