import Link from 'next/link';
import { topics, calculatorsForTopic, guidesForTopic, convertersForTopic, simulationsForTopic } from '@/lib/topics';
import { LIST_META, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: LIST_META.topics.title,
  description: LIST_META.topics.description,
  path: '/topics',
});

export default function Page() {
  return (
    <main className="container page">
      <p className="eyebrow">BROWSE BY TOPIC</p>
      <h1>Physics topics</h1>
      <p className="lead">
        Every calculator, guide, converter and simulation on this site belongs to one of eight topic hubs.
        Pick a hub to see its tools, explanations and models in one place.
      </p>
      <div className="tool-grid">
        {topics.map((t, i) => (
          <Link className="tool-card" href={`/topics/${t.slug}`} key={t.slug}>
            <small>0{i + 1} / TOPIC HUB</small>
            <h2>{t.name}</h2>
            <p>{t.description}</p>
            <span>
              {calculatorsForTopic(t.slug).length} calculators · {guidesForTopic(t.slug).length} guides ·{' '}
              {convertersForTopic(t.slug).length + simulationsForTopic(t.slug).length} converters &amp; simulations →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
