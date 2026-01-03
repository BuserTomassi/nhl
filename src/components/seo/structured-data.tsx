const BASE_URL = "https://www.nexthorizonleadership.com";

// Organization Schema - Company identity for rich snippets
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Next Horizon Leadership",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/logo.svg`,
      width: 164,
      height: 184,
    },
    image: `${BASE_URL}/images/og.jpg`,
    description:
      "Next Horizon Leadership empowers forward-looking CEOs, CHROs, and talent leaders by connecting them with world-class search partners, leading AI innovators, and organizational experts.",
    email: "hello@nexthorizonleadership.com",
    foundingDate: "2024",
    sameAs: [
      // Add real social URLs when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@nexthorizonleadership.com",
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
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Next Horizon Leadership",
    description:
      "Shaping the Future of Leadership. Connect with world-class search partners, AI innovators, and organizational experts.",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "en-US",
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
    "@id": `${BASE_URL}/services/#service`,
    name: "Next Horizon Leadership",
    url: `${BASE_URL}/services`,
    description:
      "Executive Search, AI For Talent Advisory, Org Design, and Interim Leadership services.",
    provider: {
      "@id": `${BASE_URL}/#organization`,
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
      "@id": `${BASE_URL}/#website`,
    },
    about: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "en-US",
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
    "@id": `${BASE_URL}/contact/#contactpage`,
    url: `${BASE_URL}/contact`,
    name: "Contact Us",
    description:
      "Get in touch with Next Horizon Leadership. Tell us about your executive hire needs.",
    mainEntity: {
      "@id": `${BASE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

