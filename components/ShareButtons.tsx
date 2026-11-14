'use client';

import { useEffect, useState } from 'react';
import { shareUrls } from '@/lib/share';

/**
 * Share buttons for a page. Plain share links (X, Facebook, WhatsApp,
 * LinkedIn), a copy-link button and the native Web Share API when the
 * browser offers it. No third-party share scripts, no tracking.
 */
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const links = shareUrls(url, title);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API unavailable (old browser / non-secure context): fallback.
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* copy failed; the link text is still visible in the input fallback */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user dismissed the share sheet; nothing to do */
    }
  };

  return (
    <div className="share-buttons" role="group" aria-label={`Share this page: ${title}`}>
      <span className="share-label">Share this page:</span>
      <a
        className="share-btn"
        href={links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
      >
        X
      </a>
      <a
        className="share-btn"
        href={links.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        className="share-btn"
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <a
        className="share-btn"
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <button type="button" className="share-btn" onClick={copyLink} aria-label="Copy page link">
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
      {canNativeShare && (
        <button type="button" className="share-btn" onClick={nativeShare} aria-label="Share using your device">
          Share…
        </button>
      )}
    </div>
  );
}
