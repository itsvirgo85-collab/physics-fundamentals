import { notFound } from 'next/navigation';
import Link from 'next/link';
import { topics, getTopic, calculatorsForTopic, guidesForTopic, convertersForTopic, simulationsForTopic, topicTitle, topicDescription } from '@/lib/topics';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return { title: 'Topic not found' };
  return pageMetadata({ title: topicTitle(topic), description: topicDescription(topic), path: `/topics/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const calculators = calculatorsForTopic(slug);
  const guides = guidesForTopic(slug);
  const converters = convertersForTopic(slug);
  const simulations = simulationsForTopic(slug);
  const otherTopics = topics.filter((t) => t.slug !== slug);
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Topics', url: '/topics' },
    { name: topic.name },
  ]);
  return (
    <main className="container page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <p className="breadcrumb">
        <Link href="/">Home</Link> / <Link href="/topics">Topics</Link> / {topic.name}
      </p>
      <p className="eyebrow">TOPIC HUB</p>
      <h1>{topic.name}</h1>
      <p className="lead">{topic.description}</p>
      <p>
        {topic.intent} The hub below gathers the {topic.name.toLowerCase()} calculators, learning guides,
        unit converters and interactive simulations in one place — every tool shows its equation, SI units
        and model assumptions, and every guide works through examples step by step.
      </p>

      <section style={{ marginTop: 36 }}>
        <h2>{topic.name} calculators</h2>
        <div className="tool-grid">
          {calculators.map((c) => (
            <Link className="tool-card" href={`/calculators/${c.slug}`} key={c.slug}>
              <small>{c.category}</small>
              <h2>{c.name} calculator</h2>
              <p>{c.description}</p>
              <span>Open tool →</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>{topic.name} guides</h2>
        <div className="tool-grid">
          {guides.map((g) => (
            <Link className="tool-card" href={`/guides/${g.slug}`} key={g.slug}>
              <small>{g.category} guide</small>
              <h2>{g.title}</h2>
              <p>{g.description}</p>
              <span>Read guide →</span>
            </Link>
          ))}
        </div>
      </section>

      {(converters.length > 0 || simulations.length > 0) && (
        <section style={{ marginTop: 36 }}>
          <h2>Converters &amp; simulations</h2>
          <div className="tool-grid">
            {converters.map((c) => (
              <Link className="tool-card" href={`/converters/${c.slug}`} key={c.slug}>
                <small>Unit converter</small>
                <h2>{c.name} converter</h2>
                <p>{c.description}</p>
                <span>Open converter →</span>
              </Link>
            ))}
            {simulations.map((s) => (
              <Link className="tool-card" href={`/simulations/${s.slug}`} key={s.slug}>
                <small>Interactive model</small>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <span>Explore →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 36 }}>
        <h2>More topics</h2>
        <div className="tool-grid">
          {otherTopics.map((t) => (
            <Link className="tool-card" href={`/topics/${t.slug}`} key={t.slug}>
              <small>Topic hub</small>
              <h2>{t.name}</h2>
              <p>{t.description}</p>
              <span>Browse {t.name} →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
