/**
 * Partner Seed Data
 *
 * Creates realistic executive search firms, AI vendors, and consultants
 * balanced across categories with tier-gated visibility.
 */

import type { PartnerCategory, MembershipTier } from "../../src/lib/supabase/types";

export interface SeedPartner {
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  website_url: string;
  category: PartnerCategory;
  is_verified: boolean;
  is_featured: boolean;
  contact_email: string;
  tier_visible_to: MembershipTier;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const seedPartners: SeedPartner[] = [
  // ============================================================================
  // EXECUTIVE SEARCH FIRMS (12 entries)
  // ============================================================================
  {
    name: "Spencer Stuart",
    slug: slugify("Spencer Stuart"),
    description:
      "Global leadership advisory firm specializing in board, CEO, and C-suite executive search. With 70+ offices worldwide, we connect organizations with transformational leaders.",
    logo_url: null,
    website_url: "https://www.spencerstuart.com",
    category: "search_firm",
    is_verified: true,
    is_featured: true,
    contact_email: "info@spencerstuart.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Korn Ferry",
    slug: slugify("Korn Ferry"),
    description:
      "The world's largest organizational consulting firm, helping leaders align strategy, talent, and culture. Expertise in executive search, leadership development, and rewards.",
    logo_url: null,
    website_url: "https://www.kornferry.com",
    category: "search_firm",
    is_verified: true,
    is_featured: true,
    contact_email: "contact@kornferry.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Heidrick & Struggles",
    slug: slugify("Heidrick & Struggles"),
    description:
      "Premier provider of executive search, leadership assessment, and culture shaping worldwide. Serving clients across all industries and sectors.",
    logo_url: null,
    website_url: "https://www.heidrick.com",
    category: "search_firm",
    is_verified: true,
    is_featured: true,
    contact_email: "info@heidrick.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Russell Reynolds Associates",
    slug: slugify("Russell Reynolds Associates"),
    description:
      "Global leadership advisory firm with expertise in CEO succession, board effectiveness, and culture transformation. Partnering with organizations to build sustainable leadership.",
    logo_url: null,
    website_url: "https://www.russellreynolds.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "connect@russellreynolds.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Egon Zehnder",
    slug: slugify("Egon Zehnder"),
    description:
      "Leadership advisory firm focused on CEO succession, board consulting, and executive assessment. Known for our unique one-firm partnership model.",
    logo_url: null,
    website_url: "https://www.egonzehnder.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "contact@egonzehnder.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Boyden",
    slug: slugify("Boyden"),
    description:
      "Premium executive search and leadership advisory firm with 70+ offices in 40 countries. Specializing in board, C-suite, and senior leadership roles.",
    logo_url: null,
    website_url: "https://www.boyden.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "info@boyden.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "Diversified Search Group",
    slug: slugify("Diversified Search Group"),
    description:
      "The largest woman-founded and woman-led executive search firm in the world. Champions of diverse leadership across sectors.",
    logo_url: null,
    website_url: "https://www.diversifiedsearchgroup.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "hello@dsg.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Caldwell Partners",
    slug: slugify("Caldwell Partners"),
    description:
      "Technology-enabled executive search firm specializing in board and C-suite recruitment for high-growth and transforming organizations.",
    logo_url: null,
    website_url: "https://www.caldwellpartners.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "search@caldwell.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "True Search",
    slug: slugify("True Search"),
    description:
      "Executive search for the innovation economy. Focused on technology, life sciences, and venture-backed companies from Series A to IPO.",
    logo_url: null,
    website_url: "https://www.truesearch.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "team@truesearch.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Riviera Partners",
    slug: slugify("Riviera Partners"),
    description:
      "Executive search firm specializing in technology leadership. Placing CTOs, VPs of Engineering, and product leaders at innovative companies.",
    logo_url: null,
    website_url: "https://www.rivierapartners.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "connect@riviera.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "ON Partners",
    slug: slugify("ON Partners"),
    description:
      "Boutique executive search firm delivering big-firm expertise with nimble, partner-led service. Specializing in private equity portfolio companies.",
    logo_url: null,
    website_url: "https://www.onpartners.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "info@onpartners.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "JM Search",
    slug: slugify("JM Search"),
    description:
      "Executive search firm focused on placing HR and people leaders at high-growth companies. Deep network in the CHRO and CPO community.",
    logo_url: null,
    website_url: "https://www.jmsearch.com",
    category: "search_firm",
    is_verified: true,
    is_featured: false,
    contact_email: "search@jmsearch.example.com",
    tier_visible_to: "platinum",
  },

  // ============================================================================
  // AI VENDORS (10 entries)
  // ============================================================================
  {
    name: "Workday",
    slug: slugify("Workday"),
    description:
      "Enterprise cloud applications for finance and human resources. AI-powered insights for workforce planning, talent optimization, and people analytics.",
    logo_url: null,
    website_url: "https://www.workday.com",
    category: "ai_vendor",
    is_verified: true,
    is_featured: true,
    contact_email: "enterprise@workday.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Eightfold AI",
    slug: slugify("Eightfold AI"),
    description:
      "AI-powered Talent Intelligence Platform for hiring, retention, and workforce transformation. Used by Fortune 500 companies worldwide.",
    logo_url: null,
    website_url: "https://www.eightfold.ai",
    category: "ai_vendor",
    is_verified: true,
    is_featured: true,
    contact_email: "sales@eightfold.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Pymetrics",
    slug: slugify("Pymetrics"),
    description:
      "Soft skills assessment platform using neuroscience-based games and AI to match candidates with roles. Promoting fair and unbiased hiring.",
    logo_url: null,
    website_url: "https://www.pymetrics.ai",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "info@pymetrics.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Visier",
    slug: slugify("Visier"),
    description:
      "People analytics and workforce planning platform. AI-driven insights for HR leaders to make data-informed people decisions.",
    logo_url: null,
    website_url: "https://www.visier.com",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "hello@visier.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Gloat",
    slug: slugify("Gloat"),
    description:
      "AI-powered talent marketplace for internal mobility and career development. Helping organizations unlock the potential of their workforce.",
    logo_url: null,
    website_url: "https://www.gloat.com",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "contact@gloat.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "Beamery",
    slug: slugify("Beamery"),
    description:
      "Talent lifecycle management platform powered by AI. Transforming how companies attract, engage, and retain top talent.",
    logo_url: null,
    website_url: "https://www.beamery.com",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "sales@beamery.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "Paradox (Olivia)",
    slug: slugify("Paradox Olivia"),
    description:
      "Conversational AI assistant for recruiting. Automating scheduling, screening, and candidate engagement with human-like interactions.",
    logo_url: null,
    website_url: "https://www.paradox.ai",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "team@paradox.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "HiredScore",
    slug: slugify("HiredScore"),
    description:
      "AI-powered talent orchestration platform. Ensuring fair, efficient, and compliant recruiting at scale.",
    logo_url: null,
    website_url: "https://www.hiredscore.com",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "info@hiredscore.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "Phenom",
    slug: slugify("Phenom"),
    description:
      "Intelligent Talent Experience platform with AI for personalized career sites, chatbots, and internal mobility.",
    logo_url: null,
    website_url: "https://www.phenom.com",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "hello@phenom.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Textio",
    slug: slugify("Textio"),
    description:
      "Augmented writing platform that uses AI to improve job listings, performance feedback, and employer branding content.",
    logo_url: null,
    website_url: "https://www.textio.com",
    category: "ai_vendor",
    is_verified: true,
    is_featured: false,
    contact_email: "contact@textio.example.com",
    tier_visible_to: "gold",
  },

  // ============================================================================
  // CONSULTANTS (8 entries)
  // ============================================================================
  {
    name: "McKinsey & Company - Organization Practice",
    slug: slugify("McKinsey Organization Practice"),
    description:
      "Global management consulting firm's organization practice. Expertise in operating model design, talent strategy, and culture transformation.",
    logo_url: null,
    website_url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance",
    category: "consultant",
    is_verified: true,
    is_featured: true,
    contact_email: "org@mckinsey.example.com",
    tier_visible_to: "platinum",
  },
  {
    name: "Bain & Company - Organization Practice",
    slug: slugify("Bain Organization Practice"),
    description:
      "Strategic consulting for organizational effectiveness. Helping companies build winning cultures and high-performing teams.",
    logo_url: null,
    website_url: "https://www.bain.com/consulting-services/organization/",
    category: "consultant",
    is_verified: true,
    is_featured: false,
    contact_email: "org@bain.example.com",
    tier_visible_to: "platinum",
  },
  {
    name: "Kincentric (formerly Aon)",
    slug: slugify("Kincentric"),
    description:
      "HR and talent consulting firm specializing in employee engagement, leadership assessment, and culture transformation.",
    logo_url: null,
    website_url: "https://www.kincentric.com",
    category: "consultant",
    is_verified: true,
    is_featured: false,
    contact_email: "hello@kincentric.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "Mercer",
    slug: slugify("Mercer"),
    description:
      "Global consulting leader in talent, health, retirement, and investments. Workforce transformation and total rewards expertise.",
    logo_url: null,
    website_url: "https://www.mercer.com",
    category: "consultant",
    is_verified: true,
    is_featured: true,
    contact_email: "consulting@mercer.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Willis Towers Watson",
    slug: slugify("Willis Towers Watson"),
    description:
      "Global advisory and solutions company for people, risk, and capital. Leading expertise in compensation, benefits, and talent.",
    logo_url: null,
    website_url: "https://www.wtwco.com",
    category: "consultant",
    is_verified: true,
    is_featured: false,
    contact_email: "info@wtw.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Gallup",
    slug: slugify("Gallup"),
    description:
      "Analytics and advisory company known for employee engagement research. CliftonStrengths and Q12 methodology for workplace transformation.",
    logo_url: null,
    website_url: "https://www.gallup.com",
    category: "consultant",
    is_verified: true,
    is_featured: false,
    contact_email: "consulting@gallup.example.com",
    tier_visible_to: "silver",
  },
  {
    name: "Culture Partners",
    slug: slugify("Culture Partners"),
    description:
      "Culture transformation consulting firm. Helping organizations shift accountability, mindsets, and behaviors for business results.",
    logo_url: null,
    website_url: "https://www.culturepartners.com",
    category: "consultant",
    is_verified: true,
    is_featured: false,
    contact_email: "connect@culturepartners.example.com",
    tier_visible_to: "gold",
  },
  {
    name: "BTS",
    slug: slugify("BTS"),
    description:
      "Strategy execution consulting firm specializing in leadership development, sales transformation, and experiential learning.",
    logo_url: null,
    website_url: "https://www.bts.com",
    category: "consultant",
    is_verified: true,
    is_featured: false,
    contact_email: "info@bts.example.com",
    tier_visible_to: "gold",
  },
];

/**
 * Get partners by category
 */
export function getPartnersByCategory(category: PartnerCategory): SeedPartner[] {
  return seedPartners.filter((p) => p.category === category);
}

/**
 * Get featured partners for homepage display
 */
export function getFeaturedPartners(): SeedPartner[] {
  return seedPartners.filter((p) => p.is_featured);
}
