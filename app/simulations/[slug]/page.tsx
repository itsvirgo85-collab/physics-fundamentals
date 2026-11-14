import { notFound } from 'next/navigation';
import Link from 'next/link';
import SimulationLab from '@/components/SimulationLab';
import { simulations } from '@/lib/simulations';
import { simulationHubMap, getTopic } from '@/lib/topics';
import { simulationTitle, simulationDescription, whenToUseOf, breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return simulations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = simulations.find((x) => x.slug === slug);
  if (!s) return { title: 'Simulation not found' };
  return pageMetadata({
    title: simulationTitle(s),
    description: simulationDescription(s),
    path: `/simulations/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = simulations.find((x) => x.slug === slug);
  if (!s) notFound();
  const whenToUse = whenToUseOf(s);
  const hub = getTopic(simulationHubMap[s.slug] ?? '');
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Simulations', url: '/simulations' },
    { name: s.title },
  ]);
  return (
    <main className="container page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <p className="breadcrumb">
        <Link href="/">Home</Link> / <Link href="/simulations">Simulations</Link> / {s.title}
      </p>
      <p className="eyebrow">INTERACTIVE MODEL</p>
      <h1>{s.title}</h1>
      <p className="lead">{s.description}</p>
      <SimulationLab simulation={s} />
      <section className="prose">
        <h2>Model and limitations</h2>
        <p>
          {s.concept}. The interactive model is intended to illustrate relationships between variables. It
          simplifies real systems and does not include all sources of uncertainty, losses or environmental
          effects.
        </p>
        {whenToUse && (
          <>
            <h2>When to use it</h2>
            <p>{whenToUse}</p>
          </>
        )}
        <h2>Related pages</h2>
        <ul>
          {hub && (
            <li>
              <Link href={`/topics/${hub.slug}`}>Explore the {hub.name} topic hub — calculators, guides and simulations</Link>
            </li>
          )}
          <li>
            <Link href="/simulations">Browse all interactive physics simulations</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
