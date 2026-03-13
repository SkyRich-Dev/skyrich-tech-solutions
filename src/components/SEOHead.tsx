import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SITE_NAME = "SkyRich Tech Solutions";
const SITE_URL = "https://www.skyrichtechsolutions.com";
const DEFAULT_OG_IMAGE = "/opengraph.jpg";

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  const [location] = useLocation();
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || `${SITE_URL}${location}`;
  const ogImageUrl = ogImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    if (noindex) setMeta("robots", "noindex, nofollow");
    else setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1");

    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", ogImageUrl, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:locale", "en_US", "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImageUrl);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    const existingSD = document.querySelectorAll('script[data-seo-structured]');
    existingSD.forEach(el => el.remove());

    if (structuredData) {
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach(data => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-structured", "true");
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      const sdScripts = document.querySelectorAll('script[data-seo-structured]');
      sdScripts.forEach(el => el.remove());
    };
  }, [fullTitle, description, keywords, canonicalUrl, ogType, ogImageUrl, structuredData, noindex]);

  return null;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SkyRich Tech Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/images/skyrich-logo.png`,
  description: "SkyRich Tech Solutions delivers AI, IoT, smart manufacturing, and Industry 4.0 platforms including AIDA analytics, AIVA visual intelligence, and Orbit CRM.",
  foundingDate: "2014",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9384801120",
    contactType: "sales",
    email: "info@skyrichtechsolutions.com",
    areaServed: ["IN", "SG", "MY", "TH"],
    availableLanguage: ["English"],
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
      postalCode: "600096",
    },
  ],
  sameAs: [],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SkyRich Tech Solutions",
  image: `${SITE_URL}/images/skyrich-logo.png`,
  url: SITE_URL,
  telephone: "+91-9384801120",
  email: "info@skyrichtechsolutions.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Perungudi",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600096",
    addressCountry: "IN",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
};

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function createProductSchema(product: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: `${SITE_URL}${product.url}`,
    applicationCategory: product.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: organizationSchema,
  };
}

export function createArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  date: string;
  url: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    author: { "@type": "Person", name: article.author },
    datePublished: article.date,
    dateModified: article.date,
    publisher: organizationSchema,
    url: `${SITE_URL}${article.url}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${article.url}` },
    image: `${SITE_URL}/opengraph.jpg`,
  };
}
