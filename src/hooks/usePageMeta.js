import { useEffect } from 'react';
import { absoluteUrl, siteConfig } from '../config/site';

const upsertMeta = (attr, key, content) => {
  if (!content) return null;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
  return el;
};

const upsertLink = (rel, href) => {
  if (!href) return null;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  return el;
};

/**
 * Sets document title, description, Open Graph, Twitter, canonical, and optional JSON-LD.
 */
export function usePageMeta({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  jsonLd,
  noIndex = false,
}) {
  useEffect(() => {
    const fullTitle = title || siteConfig.defaultTitle;
    const desc = description || siteConfig.defaultDescription;
    const canonical = canonicalPath ? absoluteUrl(canonicalPath) : absoluteUrl('/');
    const image = absoluteUrl(ogImage || siteConfig.defaultOgImage);

    document.title = fullTitle;
    upsertMeta('name', 'description', desc);
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', siteConfig.name);
    upsertMeta('property', 'og:locale', siteConfig.locale);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', image);

    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    let jsonLdEl = document.getElementById('page-json-ld');
    if (jsonLd) {
      if (!jsonLdEl) {
        jsonLdEl = document.createElement('script');
        jsonLdEl.id = 'page-json-ld';
        jsonLdEl.type = 'application/ld+json';
        document.head.appendChild(jsonLdEl);
      }
      jsonLdEl.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdEl) {
      jsonLdEl.remove();
    }

    return () => {
      document.title = siteConfig.defaultTitle;
      document.getElementById('page-json-ld')?.remove();
    };
  }, [title, description, canonicalPath, ogImage, ogType, jsonLd, noIndex]);
}

export default usePageMeta;
