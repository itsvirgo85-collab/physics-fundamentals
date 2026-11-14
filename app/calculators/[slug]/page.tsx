import { notFound } from 'next/navigation';
import Link from 'next/link';
import { calculators, getCalculator } from '@/lib/calculators';
import { calculatorSpecs } from '@/lib/calculator-specs';
import { calculatorContent } from '@/lib/calculator-content';
import { topicForCalculator } from '@/lib/topics';
import {
  calculatorTitle,
  calculatorDescription,
  calculatorDirectAnswer,
  breadcrumbJsonLd,
  pageMetadata,
} from '@/lib/seo';
import CalculatorTool from '@/components/CalculatorTool';
import SuvatTool from '@/components/SuvatTool';
import MultiSolveTool, { densityConfig, pressureConfig } from '@/components/MultiSolveTool';

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

const GENERIC_FAQS = [
  {
    q: 'Which units should I enter?',
    a: 'Enter the SI units displayed beside each input. Convert other units before calculating.',
  },
  {
    q: 'Are the results exact?',
    a: 'No. Accuracy depends on input quality and whether the model assumptions match the real situation.',
  },
  {
    q: 'How should I round the result?',
    a: 'Round to a precision justified by the input measurements. Extra digits do not imply extra accuracy.',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCalculator(slug);
  if (!c) return { title: 'Calculator not found' };
  const content = calculatorContent[slug];
  return pageMetadata({
    title: calculatorTitle(c, content),
    description: calculatorDescription(c, content),
    path: `/calculators/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCalculator(slug);
  if (!c) notFound();
  const spec = calculatorSpecs[slug];
  const content = calculatorContent[slug];
  const faqs = content?.faqs ?? GENERIC_FAQS;
  const description = calculatorDescription(c, content);
  const hub = topicForCalculator(c.category);
  const sameCategory = calculators.filter((x) => x.category === c.category && x.slug !== slug);
  const relatedCalculators = content?.relatedGuide
    ? sameCategory.slice(0, 2)
    : sameCategory.slice(0, 3);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${c.name} calculator`,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    ...(hub ? [{ name: hub.name, url: `/topics/${hub.slug}` }] : [{ name: 'Calculators', url: '/calculators' }]),
    { name: `${c.name} Calculator` },
  ]);
  return (
    <main className="container page" style={{ maxWidth: 920 }}>
      <p className="breadcrumb">
        <Link href="/">Home</Link>
        {' / '}
        {hub ? <Link href={`/topics/${hub.slug}`}>{hub.name}</Link> : <Link href="/calculators">Calculators</Link>}
        {' / '}
        {c.name} calculator
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <p className="eyebrow">{c.category}</p>
      <h1>{c.name} calculator</h1>
      <p className="lead">{description}</p>
      {slug === 'suvat' ? (
        <SuvatTool />
      ) : slug === 'density' ? (
        <MultiSolveTool config={densityConfig} />
      ) : slug === 'pressure' ? (
        <MultiSolveTool config={pressureConfig} />
      ) : (
        <CalculatorTool calculator={c} />
      )}
      <section className="prose">
        <h2>Equation and method</h2>
        <p>{calculatorDirectAnswer(c, spec)}</p>
        <p>
          <strong>{spec.formula}</strong>
        </p>
        <p>{spec.note}</p>
        <h2>Input variables</h2>
        <ul>
          {spec.labels.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        {content && (
          <>
            <h2>{content.workedExample.title}</h2>
            {content.workedExample.steps.map((step, i) => (
              <p key={i}>{step}</p>
            ))}
          </>
        )}
        {content?.conversionNote && (
          <>
            <h2>Unit conversions</h2>
            <p>{content.conversionNote}</p>
          </>
        )}
        {content?.relatedGuide && (
          <p>
            <a href={`/guides/${content.relatedGuide.slug}`}>Learn more: {content.relatedGuide.title} →</a>
          </p>
        )}
        <h2>Assumptions and limitations</h2>
        <p>
          This calculator applies an idealized physics model. Real systems can include measurement uncertainty,
          friction, non-uniform fields, changing material properties and other effects that are not represented
          unless stated above. Use the result as an educational estimate, not a substitute for professional
          analysis.
        </p>
        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
        <h2>Related pages</h2>
        <ul>
          {hub && (
            <li>
              <Link href={`/topics/${hub.slug}`}>Explore the {hub.name} topic hub — calculators, guides and simulations</Link>
            </li>
          )}
          {content?.relatedGuide && (
            <li>
              <Link href={`/guides/${content.relatedGuide.slug}`}>Read the {content.relatedGuide.title} guide</Link>
            </li>
          )}
          {relatedCalculators.map((r) => (
            <li key={r.slug}>
              <Link href={`/calculators/${r.slug}`}>Try the {r.name} calculator</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
