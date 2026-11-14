import { notFound } from 'next/navigation';
import Link from 'next/link';
import { guides } from '@/lib/guides';
import { MarkdownGuide } from '@/components/MarkdownGuide';
import { topicForGuide, calculatorsForTopic, guidesForTopic } from '@/lib/topics';
import { guideTitle, guideDescription, breadcrumbJsonLd, pageMetadata, PUBLISHED_DATE, extractGuideFaqs } from '@/lib/seo';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return { title: 'Guide not found' };
  return pageMetadata({
    title: guideTitle(g),
    description: guideDescription(g),
    path: `/guides/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();
  const hub = topicForGuide(g.slug);
  const hubCalculators = hub ? calculatorsForTopic(hub.slug) : [];
  const otherGuides = hub ? guidesForTopic(hub.slug).filter((x) => x.slug !== g.slug) : [];
  const description = guideDescription(g);
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    ...(hub ? [{ name: hub.name, url: `/topics/${hub.slug}` }] : [{ name: 'Guides', url: '/guides' }]),
    { name: g.title },
  ]);
  const faqs = extractGuideFaqs(g.content);
  const faqSchema = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description,
    author: { '@type': 'Organization', name: 'Physics Fundamentals' },
    publisher: { '@type': 'Organization', name: 'Physics Fundamentals' },
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: 'en',
  };
  return (
    <main className="container page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <p className="breadcrumb">
        <Link href="/">Home</Link>
        {' / '}
        {hub ? <Link href={`/topics/${hub.slug}`}>{hub.name}</Link> : <Link href="/guides">Guides</Link>}
        {' / '}
        {g.title}
      </p>
      <p className="eyebrow">{g.category} GUIDE</p>
      <h1>{g.title}</h1>
      <p className="lead">{g.description}</p>
      <MarkdownGuide content={g.content} />
      <section className="prose">
        <h2>Related pages</h2>
        <ul>
          {hub && (
            <li>
              <Link href={`/topics/${hub.slug}`}>Explore the {hub.name} topic hub — calculators, guides and simulations</Link>
            </li>
          )}
          {hubCalculators.slice(0, 1).map((c) => (
            <li key={c.slug}>
              <Link href={`/calculators/${c.slug}`}>Try the {c.name} calculator</Link>
            </li>
          ))}
          {otherGuides.slice(0, 1).map((other) => (
            <li key={other.slug}>
              <Link href={`/guides/${other.slug}`}>Read the guide: {other.title}</Link>
            </li>
          ))}
          {hubCalculators.length === 0 && (
            <li>
              <Link href="/calculators">Browse all physics calculators</Link>
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}
