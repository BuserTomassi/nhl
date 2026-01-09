import { SITE_CONFIG, OG_IMAGE, LOGO, SOCIAL_LINKS } from "@/lib/constants";

// Organization Schema - Company identity for rich snippets
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}${LOGO.url}`,
      width: LOGO.width,
      height: LOGO.height,
    },
    image: `${SITE_CONFIG.url}${OG_IMAGE.url}`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    foundingDate: SITE_CONFIG.foundingYear,
    sameAs: Object.values(SOCIAL_LINKS),
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.email,
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema - Site structure
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.shortDescription,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: SITE_CONFIG.locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema - For services page
interface ServiceItem {
  name: string;
  description: string;
}

export function ServiceSchema({ services }: { services: ServiceItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_CONFIG.url}/services/#service`,
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/services`,
    description:
      "Executive Search, AI For Talent Advisory, Org Design, and Interim Leadership services.",
    provider: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leadership Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema - Navigation context
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebPage Schema - For individual pages
interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
}

export function WebPageSchema({ title, description, url }: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url: url,
    name: title,
    description: description,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    about: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: SITE_CONFIG.locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ContactPage Schema - For contact page
export function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_CONFIG.url}/contact/#contactpage`,
    url: `${SITE_CONFIG.url}/contact`,
    name: "Contact Us",
    description:
      "Get in touch with Next Horizon Leadership. Tell us about your executive hire needs.",
    mainEntity: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

