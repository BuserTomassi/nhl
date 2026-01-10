/**
 * Test User Profiles Seed Data
 *
 * Creates realistic executive profiles across all tiers and roles.
 * These profiles serve as authors for posts, event creators, etc.
 */

import type { MembershipTier, UserRole } from "../../src/lib/supabase/types";

export interface SeedProfile {
  email: string;
  full_name: string;
  company: string;
  title: string;
  bio: string;
  linkedin_url: string;
  tier: MembershipTier;
  role: UserRole;
  is_public: boolean;
  onboarding_completed: boolean;
}

/**
 * Generate a Pravatar URL for a profile
 * Uses email as seed for deterministic avatar generation
 */
export function getAvatarUrl(email: string, size: number = 150): string {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(email)}`;
}

export const seedProfiles: SeedProfile[] = [
  // Admin users
  {
    email: "admin@nexthorizonleadership.com",
    full_name: "Sarah Mitchell",
    company: "Next Horizon Leadership",
    title: "Platform Director",
    bio: "Leading the NHL community platform, connecting forward-thinking executives across industries.",
    linkedin_url: "https://linkedin.com/in/sarahmitchell",
    tier: "diamond",
    role: "admin",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "ops@nexthorizonleadership.com",
    full_name: "Michael Chen",
    company: "Next Horizon Leadership",
    title: "Community Operations Lead",
    bio: "Facilitating meaningful connections and ensuring our members get maximum value from the NHL network.",
    linkedin_url: "https://linkedin.com/in/michaelchen",
    tier: "diamond",
    role: "admin",
    is_public: true,
    onboarding_completed: true,
  },

  // Diamond tier members (CEOs, Board Members)
  {
    email: "diamond1@example.com",
    full_name: "Victoria Blackwood",
    company: "Apex Industries",
    title: "Chief Executive Officer",
    bio: "25+ years leading global enterprises through transformation. Former McKinsey partner, now driving innovation at Apex.",
    linkedin_url: "https://linkedin.com/in/victoriablackwood",
    tier: "diamond",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "diamond2@example.com",
    full_name: "Richard Thornton III",
    company: "Thornton Capital Partners",
    title: "Founder & Chairman",
    bio: "Private equity veteran with $5B+ in successful exits. Board member at Fortune 100 companies.",
    linkedin_url: "https://linkedin.com/in/richardthornton",
    tier: "diamond",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "diamond3@example.com",
    full_name: "Elena Vasquez",
    company: "Global Health Systems",
    title: "CEO & President",
    bio: "Transforming healthcare delivery across 30 countries. Former WHO advisor, passionate about health equity.",
    linkedin_url: "https://linkedin.com/in/elenavasquez",
    tier: "diamond",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "diamond4@example.com",
    full_name: "James Wellington",
    company: "Wellington Financial Group",
    title: "Chief Executive Officer",
    bio: "Building the future of fintech. Serial entrepreneur with three successful IPOs.",
    linkedin_url: "https://linkedin.com/in/jameswellington",
    tier: "diamond",
    role: "member",
    is_public: false, // Private profile
    onboarding_completed: true,
  },

  // Platinum tier members (CHROs, CPOs, SVPs)
  {
    email: "platinum1@example.com",
    full_name: "Dr. Amanda Sterling",
    company: "TechForward Inc",
    title: "Chief Human Resources Officer",
    bio: "Industrial-Organizational Psychologist turned CHRO. Leading people strategy for 50,000+ employees globally.",
    linkedin_url: "https://linkedin.com/in/amandasterling",
    tier: "platinum",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "platinum2@example.com",
    full_name: "Marcus Johnson",
    company: "Innovate Corp",
    title: "Chief People Officer",
    bio: "Pioneering the future of work. Former Google and Meta HR leader, now building culture at Innovate.",
    linkedin_url: "https://linkedin.com/in/marcusjohnson",
    tier: "platinum",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "platinum3@example.com",
    full_name: "Katherine O'Brien",
    company: "Stellar Pharmaceuticals",
    title: "SVP, Human Resources",
    bio: "20 years in life sciences HR. Expert in M&A integration and organizational design.",
    linkedin_url: "https://linkedin.com/in/katherineobrien",
    tier: "platinum",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "platinum4@example.com",
    full_name: "David Park",
    company: "NextGen Automotive",
    title: "Chief Talent Officer",
    bio: "Driving the EV talent revolution. Building workforce capabilities for the mobility transformation.",
    linkedin_url: "https://linkedin.com/in/davidpark",
    tier: "platinum",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "platinum5@example.com",
    full_name: "Rachel Fernandez",
    company: "Quantum Computing Labs",
    title: "CHRO",
    bio: "Recruiting the impossible: building teams for quantum breakthroughs. SHRM Board Member.",
    linkedin_url: "https://linkedin.com/in/rachelfernandez",
    tier: "platinum",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "platinum6@example.com",
    full_name: "Thomas Nakamura",
    company: "Pacific Ventures",
    title: "Chief People & Culture Officer",
    bio: "Cross-cultural leadership expert. Building high-performance teams across Asia-Pacific.",
    linkedin_url: "https://linkedin.com/in/thomasnakamura",
    tier: "platinum",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },

  // Gold tier members (VPs, Directors, Senior Leaders)
  {
    email: "gold1@example.com",
    full_name: "Jennifer Wright",
    company: "CloudScale Technologies",
    title: "VP, Talent Acquisition",
    bio: "Scaling hypergrowth companies. Led hiring for 3 unicorns from Series A to IPO.",
    linkedin_url: "https://linkedin.com/in/jenniferwright",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "gold2@example.com",
    full_name: "Christopher Lee",
    company: "DataDriven Analytics",
    title: "Director, People Analytics",
    bio: "Turning HR data into strategic insights. Former data scientist, now people scientist.",
    linkedin_url: "https://linkedin.com/in/christopherlee",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "gold3@example.com",
    full_name: "Michelle Adams",
    company: "Greenfield Energy",
    title: "VP, Organizational Development",
    bio: "Building sustainable organizations. Expert in change management and leadership development.",
    linkedin_url: "https://linkedin.com/in/michelleadams",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "gold4@example.com",
    full_name: "Robert Kim",
    company: "MedTech Solutions",
    title: "Senior Director, HR Operations",
    bio: "Streamlining people processes at scale. Six Sigma Black Belt, passionate about HR efficiency.",
    linkedin_url: "https://linkedin.com/in/robertkim",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "gold5@example.com",
    full_name: "Lisa Thompson",
    company: "RetailNext Corp",
    title: "VP, Learning & Development",
    bio: "Creating learning experiences that drive business results. ATD board member.",
    linkedin_url: "https://linkedin.com/in/lisathompson",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "gold6@example.com",
    full_name: "Andrew Martinez",
    company: "FinServ Holdings",
    title: "Director, Executive Compensation",
    bio: "Designing pay programs that attract and retain top talent. CFA, WorldatWork certified.",
    linkedin_url: "https://linkedin.com/in/andrewmartinez",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "gold7@example.com",
    full_name: "Samantha Brown",
    company: "Aerospace Dynamics",
    title: "VP, HR Business Partners",
    bio: "Strategic HRBP leader for engineering-heavy organizations. Former engineer turned HR exec.",
    linkedin_url: "https://linkedin.com/in/samanthabrown",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "gold8@example.com",
    full_name: "Daniel Wilson",
    company: "Urban Development Co",
    title: "Director, Diversity & Inclusion",
    bio: "Building truly inclusive workplaces. Led D&I transformation at three Fortune 500 companies.",
    linkedin_url: "https://linkedin.com/in/danielwilson",
    tier: "gold",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },

  // Silver tier members (Managers, Individual Contributors, New Members)
  {
    email: "silver1@example.com",
    full_name: "Emily Carter",
    company: "StartupHub Inc",
    title: "HR Manager",
    bio: "Building people practices from scratch at high-growth startups. Aspiring CHRO.",
    linkedin_url: "https://linkedin.com/in/emilycarter",
    tier: "silver",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "silver2@example.com",
    full_name: "Jason Taylor",
    company: "Consulting Partners LLC",
    title: "Senior HR Consultant",
    bio: "Helping mid-market companies level up their HR. Generalist with M&A expertise.",
    linkedin_url: "https://linkedin.com/in/jasontaylor",
    tier: "silver",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "silver3@example.com",
    full_name: "Nicole Harris",
    company: "Creative Agency Group",
    title: "People Operations Lead",
    bio: "Making HR human again. Focus on employee experience in creative industries.",
    linkedin_url: "https://linkedin.com/in/nicoleharris",
    tier: "silver",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "silver4@example.com",
    full_name: "Brandon Scott",
    company: "LogiTech Supply Chain",
    title: "Talent Acquisition Manager",
    bio: "Recruiting for hard-to-fill roles in logistics and supply chain.",
    linkedin_url: "https://linkedin.com/in/brandonscott",
    tier: "silver",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "silver5@example.com",
    full_name: "Ashley Moore",
    company: "EdTech Innovations",
    title: "HR Business Partner",
    bio: "Supporting product and engineering teams. Former recruiter turned HRBP.",
    linkedin_url: "https://linkedin.com/in/ashleymoore",
    tier: "silver",
    role: "member",
    is_public: true,
    onboarding_completed: false, // New member, hasn't completed onboarding
  },
  {
    email: "silver6@example.com",
    full_name: "Kevin Nguyen",
    company: "BioTech Startup",
    title: "People & Culture Coordinator",
    bio: "Early career HR professional passionate about culture building.",
    linkedin_url: "https://linkedin.com/in/kevinnguyen",
    tier: "silver",
    role: "member",
    is_public: true,
    onboarding_completed: true,
  },

  // Partner accounts
  {
    email: "partner1@spencerstuart.example.com",
    full_name: "Patricia Reynolds",
    company: "Spencer Stuart",
    title: "Partner, CEO Practice",
    bio: "25 years placing C-suite executives. Specializing in succession planning and board composition.",
    linkedin_url: "https://linkedin.com/in/patriciareynolds",
    tier: "gold",
    role: "partner",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "partner2@kornferry.example.com",
    full_name: "Gregory Stone",
    company: "Korn Ferry",
    title: "Senior Client Partner",
    bio: "Executive search and leadership consulting for Fortune 500 companies.",
    linkedin_url: "https://linkedin.com/in/gregorystone",
    tier: "gold",
    role: "partner",
    is_public: true,
    onboarding_completed: true,
  },
  {
    email: "partner3@eightfold.example.com",
    full_name: "Priya Sharma",
    company: "Eightfold AI",
    title: "VP, Enterprise Partnerships",
    bio: "Bringing AI-powered talent intelligence to enterprise HR teams.",
    linkedin_url: "https://linkedin.com/in/priyasharma",
    tier: "gold",
    role: "partner",
    is_public: true,
    onboarding_completed: true,
  },
];

/**
 * Get profile by tier for testing tier-gated content
 */
export function getProfilesByTier(tier: MembershipTier): SeedProfile[] {
  return seedProfiles.filter((p) => p.tier === tier);
}

/**
 * Get admin profiles for system operations
 */
export function getAdminProfiles(): SeedProfile[] {
  return seedProfiles.filter((p) => p.role === "admin");
}

/**
 * Get partner profiles for partner directory seeding
 */
export function getPartnerProfiles(): SeedProfile[] {
  return seedProfiles.filter((p) => p.role === "partner");
}
