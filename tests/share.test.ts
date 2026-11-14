import { describe, it, expect } from 'vitest';
import {
  twitterShareUrl,
  facebookShareUrl,
  whatsappShareUrl,
  linkedinShareUrl,
  shareUrls,
} from '@/lib/share';
import { canonicalUrl, LIVE_SITE_URL } from '@/lib/seo';

const URL = 'https://physics-fundamentals-phi.vercel.app/calculators/density';
const TITLE = 'Density Calculator — Mass, Volume and Density';

describe('share URL builders', () => {
  it('builds a correct X/Twitter intent URL with encoded URL and title', () => {
    expect(twitterShareUrl(URL, TITLE)).toBe(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(TITLE)}`,
    );
  });

  it('builds a correct Facebook sharer URL', () => {
    expect(facebookShareUrl(URL)).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL)}`,
    );
  });

  it('builds a correct WhatsApp URL with title and link in one text param', () => {
    expect(whatsappShareUrl(URL, TITLE)).toBe(
      `https://wa.me/?text=${encodeURIComponent(`${TITLE} ${URL}`)}`,
    );
  });

  it('builds a correct LinkedIn share URL', () => {
    expect(linkedinShareUrl(URL)).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`,
    );
  });

  it('encodes special characters (&, ?, spaces) in titles and URLs', () => {
    const tricky = 'https://physics-fundamentals-phi.vercel.app/calculators/suvat?x=1&y=2';
    const title = 'SUVAT & Motion: v = u + at?';
    const links = shareUrls(tricky, title);
    expect(links.twitter).toContain(encodeURIComponent(tricky));
    expect(links.twitter).toContain(encodeURIComponent(title));
    expect(links.twitter).not.toContain('&y=2');
    expect(links.facebook).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tricky)}`,
    );
    expect(links.whatsapp).toContain(encodeURIComponent(`${title} ${tricky}`));
    expect(links.linkedin).toContain(encodeURIComponent(tricky));
  });

  it('returns all four networks from shareUrls', () => {
    const links = shareUrls(URL, TITLE);
    expect(Object.keys(links).sort()).toEqual(['facebook', 'linkedin', 'twitter', 'whatsapp']);
    for (const u of Object.values(links)) expect(u.startsWith('https://')).toBe(true);
  });
});

describe('canonicalUrl', () => {
  it('falls back to the live production domain when NEXT_PUBLIC_SITE_URL is unset', () => {
    const saved = process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    try {
      expect(canonicalUrl('/calculators/density')).toBe(`${LIVE_SITE_URL}/calculators/density`);
      expect(canonicalUrl('/')).toBe(`${LIVE_SITE_URL}/`);
      expect(canonicalUrl('/calculators/density')).not.toContain('example.com');
    } finally {
      if (saved !== undefined) process.env.NEXT_PUBLIC_SITE_URL = saved;
    }
  });

  it('uses the configured site URL when it is set', () => {
    const saved = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.org';
    try {
      expect(canonicalUrl('/guides/motion-graphs')).toBe('https://example.org/guides/motion-graphs');
    } finally {
      if (saved !== undefined) process.env.NEXT_PUBLIC_SITE_URL = saved;
      else delete process.env.NEXT_PUBLIC_SITE_URL;
    }
  });
});
