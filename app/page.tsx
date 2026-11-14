import Link from 'next/link';
import { calculators } from '@/lib/calculators';
import { converters } from '@/lib/converters';
import { simulations } from '@/lib/simulations';
import { guides } from '@/lib/guides';
import { topics } from '@/lib/topics';
import { LIST_META, pageMetadata } from '@/lib/seo';
import SuvatTool from '@/components/SuvatTool';

export const metadata = pageMetadata({
  title: LIST_META.home.title,
  description: LIST_META.home.description,
  path: '/',
});

const TOP12 = [
  'density',
  'specific-heat',
  'suvat',
  'final-velocity',
  'momentum',
  'pressure',
  'free-fall-time',
  'projectile-motion',
  'gravitational-potential-energy',
  'wave-speed',
  'centripetal-force',
  'kinetic-energy',
];

const HOME_FAQS = [
  {
    q: 'Are the physics calculators free?',
    a: 'Yes. Every calculator, converter, simulation and guide on this site is free to use, with no sign-up and no account needed.',
  },
  {
    q: 'Which units should I enter?',
    a: 'Enter SI units — metres, seconds, kilograms and newtons — unless an input says otherwise. The SUVAT tool also accepts km/h for velocities and converts it for you.',
  },
  {
    q: 'What is SUVAT?',
    a: 'SUVAT is the set of five constant-acceleration equations linking displacement (s), initial velocity (u), final velocity (v), acceleration (a) and time (t). Enter any three values and the tool solves for the other two.',
  },
  {
    q: 'Are the results exact?',
    a: 'No — every tool uses an idealised physics model, so results are educational estimates. Check the equation, the units and the stated assumptions before applying a result.',
  },
];

export default function Home() {
  const top12 = TOP12.map((slug) => calculators.find((c) => c.slug === slug)!).filter(Boolean);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">PHYSICS, MADE EXPLORABLE</p>
          <h1>
            Understand the science.
            <br />
            <span>Calculate with confidence.</span>
          </h1>
          <p className="lead">
            A practical physics workspace with calculators, unit converters, interactive models and clear
            learning guides — with equations and assumptions shown.
          </p>
          <div className="actions">
            <Link className="btn" href="/calculators">
              Explore calculators
            </Link>
            <Link className="btn btn-outline" href="/topics">
              Browse by topic
            </Link>
            <Link className="btn btn-outline" href="/simulations">
              Try simulations
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <b>{calculators.length}</b>
              <small>calculators</small>
            </div>
            <div>
              <b>{converters.length}</b>
              <small>converters</small>
            </div>
            <div>
              <b>{simulations.length}</b>
              <small>simulations</small>
            </div>
            <div>
              <b>{guides.length}</b>
              <small>learning guides</small>
            </div>
            <div>
              <b>{topics.length}</b>
              <small>topic hubs</small>
            </div>
          </div>
          <div className="suvat-embed">
            <SuvatTool />
            <p className="muted" style={{ marginTop: 12 }}>
              The SUVAT solver above is our most-used tool — enter any three values and it finds the other two.{' '}
              <Link href="/calculators/suvat">Open the full SUVAT calculator →</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">WHY TRUST THESE TOOLS</p>
            <h2>Checked before they are published</h2>
          </div>
        </div>
        <div className="trust-grid">
          <div className="trust-item">
            <h3>Hand-checked formulas</h3>
            <p>Every equation is checked against standard physics references, and worked examples use real numbers you can follow.</p>
          </div>
          <div className="trust-item">
            <h3>SI units throughout</h3>
            <p>Inputs and answers use SI units by default, with conversions shown where another unit is accepted.</p>
          </div>
          <div className="trust-item">
            <h3>Step-by-step working</h3>
            <p>Tools show their working, and guides walk through each step — including the checks that catch mistakes.</p>
          </div>
          <div className="trust-item">
            <h3>Free, no sign-up</h3>
            <p>No account, no paywall, no email required. Open a tool and start calculating.</p>
          </div>
        </div>
      </section>

      <section className="soft-section">
        <div className="container section">
          <div className="section-head">
            <div>
              <p className="eyebrow">MOST USED</p>
              <h2>Start with a question</h2>
            </div>
            <Link href="/calculators">All calculators →</Link>
          </div>
          <div className="tool-grid">
            {top12.map((c) => (
              <Link className="tool-card" href={`/calculators/${c.slug}`} key={c.slug}>
                <small>{c.category}</small>
                <h2>{c.name} calculator</h2>
                <p>{c.description}</p>
                <span>Open tool →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">BROWSE BY TOPIC</p>
            <h2>Explore physics by subject</h2>
          </div>
          <Link href="/topics">All topics →</Link>
        </div>
        <div className="category-grid">
          {topics.map((t, i) => (
            <Link href={`/topics/${t.slug}`} key={t.slug}>
              <small>0{i + 1}</small>
              <b>{t.name}</b>
              <span>Explore tools →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">TOOLS FOR LEARNING</p>
            <h2>More ways to learn</h2>
          </div>
        </div>
        <div className="feature-grid">
          <Link href="/guides" className="feature-card">
            <span>01 / LEARN</span>
            <h3>Physics guides</h3>
            <p>Concept-first explanations with equations, worked examples and common mistakes.</p>
          </Link>
          <Link href="/converters" className="feature-card">
            <span>02 / CONVERT</span>
            <h3>Unit converters</h3>
            <p>Move between SI and common customary units with clear conversion factors.</p>
          </Link>
          <Link href="/simulations" className="feature-card">
            <span>03 / EXPLORE</span>
            <h3>Interactive simulations</h3>
            <p>Change model parameters and see physical relationships update instantly.</p>
          </Link>
          <Link href="/practice" className="feature-card">
            <span>04 / PRACTISE</span>
            <h3>Practice questions</h3>
            <p>Test yourself and read the explanation for every answer.</p>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">LEARN AT YOUR PACE</p>
            <h2>Build understanding, step by step</h2>
          </div>
          <Link href="/guides">All guides →</Link>
        </div>
        <div className="tool-grid">
          {guides.slice(0, 3).map((g) => (
            <Link className="tool-card" href={`/guides/${g.slug}`} key={g.slug}>
              <small>{g.category}</small>
              <h2>{g.title}</h2>
              <p>{g.description}</p>
              <span>Read guide →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">QUESTIONS, ANSWERED</p>
            <h2>Frequently asked questions</h2>
          </div>
        </div>
        <div className="faq-list">
          {HOME_FAQS.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container cta">
        <h2>Physics is easier when you can experiment.</h2>
        <p>Choose a model, change a value and explore what the equation tells you.</p>
        <Link className="btn" href="/practice">
          Try practice questions
        </Link>
      </section>
    </main>
  );
}
