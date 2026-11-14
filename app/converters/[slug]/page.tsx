import { notFound } from 'next/navigation';
import Link from 'next/link';
import ConverterTool from '@/components/ConverterTool';
import { converters } from '@/lib/converters';
import { converterHubMap, getTopic } from '@/lib/topics';
import { converterTitle, converterDescription, whenToUseOf, breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return converters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = converters.find((x) => x.slug === slug);
  if (!c) return { title: 'Converter not found' };
  return pageMetadata({
    title: converterTitle(c),
    description: converterDescription(c),
    path: `/converters/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = converters.find((x) => x.slug === slug);
  if (!c) notFound();
  const whenToUse = whenToUseOf(c);
  const hub = getTopic(converterHubMap[c.slug] ?? '');
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Converters', url: '/converters' },
    { name: `${c.name} Converter` },
  ]);
  return (
    <main className="container page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <p className="breadcrumb">
        <Link href="/">Home</Link> / <Link href="/converters">Converters</Link> / {c.name} converter
      </p>
      <p className="eyebrow">UNIT CONVERTER</p>
      <h1>{c.name} converter</h1>
      <p className="lead">{c.description}</p>
      <ConverterTool converter={c} />
      {whenToUse && (
        <section className="prose">
          <h2>When to use it</h2>
          <p>{whenToUse}</p>
        </section>
      )}
      <section className="prose">
        <h2>Related pages</h2>
        <ul>
          {hub && (
            <li>
              <Link href={`/topics/${hub.slug}`}>Explore the {hub.name} topic hub — calculators, guides and simulations</Link>
            </li>
          )}
          <li>
            <Link href="/converters">Browse all physics unit converters</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
