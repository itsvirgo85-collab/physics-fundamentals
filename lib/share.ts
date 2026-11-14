/** Social share URL builders (pure functions — unit-tested, no third-party scripts). */

export function twitterShareUrl(url: string, title: string): string {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
}

export function facebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function whatsappShareUrl(url: string, title: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
}

export function linkedinShareUrl(url: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export type ShareLinks = {
  twitter: string;
  facebook: string;
  whatsapp: string;
  linkedin: string;
};

export function shareUrls(url: string, title: string): ShareLinks {
  return {
    twitter: twitterShareUrl(url, title),
    facebook: facebookShareUrl(url),
    whatsapp: whatsappShareUrl(url, title),
    linkedin: linkedinShareUrl(url),
  };
}
