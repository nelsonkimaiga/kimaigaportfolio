type SEOConfig = {
  title: string;
  description: string;
  robots: string;
  url?: string;
};

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const applySEO = ({ title, description, robots, url }: SEOConfig) => {
  const canonicalUrl = url ?? window.location.origin + window.location.pathname;

  document.title = title;

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', robots);

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', canonicalUrl);

  upsertMeta('name', 'twitter:card', 'summary');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
};
