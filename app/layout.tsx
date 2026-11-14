import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import SearchBox from '@/components/SearchBox';
import { topics } from '@/lib/topics';
import { LIST_META, absoluteUrl, siteUrl } from '@/lib/seo';

const siteBase = siteUrl();
const ogImage = absoluteUrl('/og-image.svg');

export const metadata: Metadata = {
  metadataBase: siteBase ? new URL(siteBase) : undefined,
  title: { default: LIST_META.home.title, template: '%s' },
  description: LIST_META.home.description,
  applicationName: 'Physics Fundamentals',
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Physics Fundamentals',
    title: LIST_META.home.title,
    description: LIST_META.home.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Physics Fundamentals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: LIST_META.home.title,
    description: LIST_META.home.description,
    images: [ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Physics Fundamentals',
  description: 'Physics calculators, unit converters, interactive simulations and learning guides.',
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${absoluteUrl('/search')}?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <header className="topbar">
          <div className="container nav">
            <Link href="/" className="brand">
              Physics<span>Fundamentals</span>
            </Link>
            <nav className="navlinks" aria-label="Main navigation">
              <Link href="/calculators">Calculators</Link>
              <Link href="/topics">Topics</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/converters">Converters</Link>
              <Link href="/simulations">Simulations</Link>
              <Link href="/practice">Practice</Link>
              <Link href="/search">Search</Link>
            </nav>
            <SearchBox compact />
          </div>
        </header>
        {children}
        <footer>
          <div className="container footer-inner">
            <div>
              <b>Physics Fundamentals</b>
              <p>Clear calculations. Sound physics. Useful learning tools.</p>
            </div>
            <nav className="footer-links" aria-label="Topic hubs">
              {topics.map((t) => (
                <Link href={`/topics/${t.slug}`} key={t.slug}>
                  {t.name}
                </Link>
              ))}
            </nav>
            <nav className="footer-links" aria-label="Footer navigation">
              <Link href="/references">Scientific references</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </nav>
            <small>Educational resource. Check assumptions, units and model limits before applying results.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
