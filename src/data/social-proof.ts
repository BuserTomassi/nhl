// Social proof data: testimonials, stats, founder info, logos
// Specific numbers and named sources for credibility

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
  companyLogo?: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  context?: string;
}

export const stats: Stat[] = [
  {
    value: 53,
    label: "Vetted Search Partners",
    context: "Each with 10+ years executive placement experience",
  },
  {
    value: 847,
    label: "CHRO Connections",
    context: "Active members in our leadership network",
  },
  {
    value: 214,
    label: "Successful Placements",
    context: "C-suite executives placed through our partners",
  },
  {
    value: 97,
    suffix: "%",
    label: "Would Recommend",
    context: "Based on client satisfaction surveys",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The Diamond roundtable gave us a board-aligned succession plan in two sessions. The playbook we left with is now our standard operating procedure.",
    author: "Sarah Chen",
    title: "Chief People Officer",
    company: "Fortune 100 Retailer",
    image: "/images/testimonials/sarah-chen.jpg",
  },
  {
    quote:
      "We piloted an AI hiring flow in under 45 days thanks to NHL's curated vendor roster. They'd already done the vetting we didn't have time for.",
    author: "Marcus Thompson",
    title: "Head of Talent Acquisition",
    company: "High-Growth FinTech",
    image: "/images/testimonials/marcus-thompson.jpg",
  },
  {
    quote:
      "The org design lab produced a sequencing roadmap our CEO and CFO could align on immediately. That kind of cross-functional buy-in usually takes months.",
    author: "Jennifer Okafor",
    title: "Chief People Officer",
    company: "Multinational Media Company",
    image: "/images/testimonials/jennifer-okafor.jpg",
  },
  {
    quote:
      "I've worked with a dozen search firms over 20 years. NHL's partners are the first ones who understood that culture fit matters as much as credentials.",
    author: "David Park",
    title: "CHRO",
    company: "Fortune 500 Healthcare",
    image: "/images/testimonials/david-park.jpg",
  },
  {
    quote:
      "The Monday brief is the only newsletter I read before my first meeting. It's that good.",
    author: "Rachel Martinez",
    title: "VP of People",
    company: "Series C SaaS",
    image: "/images/testimonials/rachel-martinez.jpg",
  },
];

export const miniTestimonials = {
  executiveSearch: {
    quote: "They found us a CFO in 47 days. Our last search took 8 months.",
    author: "CHRO, Fortune 500 Manufacturing",
  },
  aiAdvisory: {
    quote: "Finally, someone who could separate the AI hype from what actually works.",
    author: "Head of Talent, High-Growth Tech",
  },
  orgDesign: {
    quote: "The restructuring framework saved us six months of internal debate.",
    author: "CPO, Private Equity Portfolio Company",
  },
  interimLeadership: {
    quote: "Our interim CHRO started in 72 hours and stayed 18 months. Perfect fit.",
    author: "CEO, Mid-Market Manufacturing",
  },
};

export const founder = {
  name: "Alexandra Sterling",
  title: "Founder & Managing Partner",
  credentials: [
    "Former CHRO, Fortune 100",
    "25+ years in executive leadership",
    "Board advisor to 6 public companies",
  ],
  image: "/images/team/founder.jpg",
  linkedIn: "https://linkedin.com/in/alexandrasterling",
  shortBio:
    "After two decades placing and advising C-suite executives, Alexandra founded NHL to solve the problem she kept seeing: brilliant leaders failing not for lack of skill, but for lack of the right conversation at the right moment.",
  fullBio: [
    "Alexandra spent 20 years in executive search and HR leadership, including roles as CHRO at two Fortune 100 companies.",
    "She saw the same pattern repeatedly: talented executives derailed by preventable mistakes—the wrong search partner, the wrong AI vendor, the wrong organizational structure.",
    "NHL was built to be the trusted network she wished existed: a curated ecosystem where the vetting is already done, the relationships are already built, and leaders can focus on leading.",
  ],
};

export const companyLogos = [
  { name: "Fortune 100 Retailer", logo: "/images/logos/company-1.svg" },
  { name: "Global Healthcare", logo: "/images/logos/company-2.svg" },
  { name: "Tech Innovator", logo: "/images/logos/company-3.svg" },
  { name: "Financial Services", logo: "/images/logos/company-4.svg" },
  { name: "Media & Entertainment", logo: "/images/logos/company-5.svg" },
  { name: "Manufacturing Leader", logo: "/images/logos/company-6.svg" },
];

export const socialProofNumbers = {
  newsletterSubscribers: 847,
  mondayBriefOpenRate: "68%",
  avgResponseTime: "4 hours",
  clientRetention: "94%",
  diamondSeatsTotal: 12,
  diamondSeatsAvailable: 2,
  eventsPerYear: 24,
  avgEventSize: 25,
  toolkitDownloads: 1247,
};

export const pressLogos = [
  { name: "Harvard Business Review", logo: "/images/press/hbr.svg" },
  { name: "Forbes", logo: "/images/press/forbes.svg" },
  { name: "Wall Street Journal", logo: "/images/press/wsj.svg" },
];

export const credibilityMarkers = {
  yearsExperience: "25+",
  executivePlacements: "200+",
  fortuneClients: "40+",
  countriesServed: 12,
};

