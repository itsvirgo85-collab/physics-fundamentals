import Link from 'next/link';
import { calculators, categories } from '@/lib/calculators';
import { calculatorContent } from '@/lib/calculator-content';
import { topics } from '@/lib/topics';
import { LIST_META, calculatorDescription, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: LIST_META.calculators.title,
  description: LIST_META.calculators.description,
  path: '/calculators',
});

export default function Page() {
  return (
    <main className="container page">
      <p className="eyebrow">CALCULATE</p>
      <h1>Physics calculators</h1>
      <p className="lead">
        Browse tools by topic. Every calculator displays its equation, input units and model assumptions, and
        works through a worked example with step-by-step working.
      </p>
      {categories.map((cat) => {
        const hub = topics.find((t) => t.category === cat);
        return (
          <section id={cat.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')} key={cat} style={{ marginTop: 36 }}>
            <h2>{cat}</h2>
            {hub && (
              <p>
                <Link href={`/topics/${hub.slug}`}>Browse the {hub.name} topic hub →</Link>
              </p>
            )}
            <div className="gridcards">
              {calculators
                .filter((c) => c.category === cat)
                .map((c) => (
                  <Link className="tool-card" href={`/calculators/${c.slug}`} key={c.slug}>
                    <b>{c.name} calculator</b>
                    <p>{calculatorDescription(c, calculatorContent[c.slug])}</p>
                    <span>Open tool →</span>
                  </Link>
                ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
