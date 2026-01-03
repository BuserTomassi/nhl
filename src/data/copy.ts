// Centralized persuasive copy applying Cialdini + Scott Adams principles
// Loss-framed messaging, visual language, and identity-based copy

export const hero = {
  headline: ["Stop", "Searching.", "Start", "Finding."],
  // Alternative headlines for A/B testing
  alternativeHeadlines: [
    ["The", "Right", "Connection", "at the", "Right", "Moment."],
    ["Leadership", "Happens", "in the", "Room.", "We", "Decide", "Who's", "In", "It."],
  ],
  subtitle:
    "Wrong hire. Wrong partner. Wrong moment. That's how leadership transitions fail. We exist to make sure yours doesn't—by putting the right people in your corner before the search begins.",
  // Loss-framed alternative
  subtitleAlt:
    "The average cost of a failed executive hire is 2.5x their salary. Most are preventable. We connect you with vetted search partners, AI innovators, and organizational experts who've been there before.",
  ctas: {
    primary: "Tell Us What You're Solving",
    secondary: "See How We Help",
  },
  urgencyIndicator: "We take on 6 new clients per quarter",
} as const;

export const about = {
  eyebrow: "Our Story",
  title: "We Built This Because We've Seen What Goes Wrong",
  founderStory: [
    "We started NHL after watching too many brilliant leaders fail—not because they lacked skill, but because they lacked the right conversation at the right moment.",
    "A trusted board member who'd seen it before. A search partner who actually understood the role beyond the job description. An AI vendor who wasn't just selling dashboards.",
    "We built the network they needed. Now we're opening it to you.",
  ],
  manifesto: {
    title: "What We Believe",
    beliefs: [
      {
        headline: "Executive search is broken",
        detail:
          "Too many firms optimize for placements, not outcomes. We vet partners who think long-term.",
      },
      {
        headline: "AI will transform talent—with humans at the center",
        detail:
          "Technology amplifies judgment. It doesn't replace it. We connect you with AI that augments, not automates.",
      },
      {
        headline: "CHROs deserve a seat at the table before the crisis",
        detail:
          "The best succession plans are written years before they're needed. We help you build them now.",
      },
    ],
  },
} as const;

export const whatWeDoSection = {
  eyebrow: "What We Do",
  title: "You've worked with search firms before. Some were great. Some wasted months.",
  subtitle:
    "That's exactly why we built NHL—to filter the signal from the noise. A trusted ecosystem where senior decision-makers connect with partners who've already proven themselves.",
  pacingStatement:
    "You know your next executive hire could change everything. You also know most searches go sideways for preventable reasons.",
} as const;

export const whyNHLSection = {
  eyebrow: "Why Next Horizon Leadership",
  title: "You didn't become CHRO by following the crowd.",
  subtitle:
    "You're here because you want an edge. We exist at the intersection of leadership decision-makers, search partners, AI innovators, and rising HR talent. Our curated approach accelerates transitions, introduces breakthrough solutions, and future-proofs organizations.",
  identityStatement:
    "If you're the kind of leader who asks 'what's next?' before everyone else—you're in the right place.",
} as const;

export const stakes = {
  title: "What's at Stake",
  items: [
    {
      stat: "40%",
      description: "of new executives fail within 18 months",
      source: "Harvard Business Review",
    },
    {
      stat: "2.5x",
      description: "salary—the average cost of a failed executive hire",
      source: "SHRM Research",
    },
    {
      stat: "6 months",
      description: "average time lost when a search goes sideways",
      source: "Industry benchmark",
    },
  ],
} as const;

export const scarcity = {
  clients: "We take on 6 new clients per quarter to ensure white-glove service.",
  diamondSeats: "Diamond Membership: 12 seats per year.",
  diamondAvailable: "Currently 2 available.",
  waitlist: "Join the waitlist for early access",
  charterBenefits: "Charter members receive founding rates locked for life",
} as const;

export const ctaVariants = {
  contact: {
    primary: "Let's Talk",
    secondary: "Tell Us What You're Solving",
    soft: "Start a Conversation",
  },
  services: {
    primary: "See How We Help",
    secondary: "Explore Our Approach",
  },
  community: {
    diamond: "Apply for Diamond",
    platinum: "Request Platinum Invite",
    gold: "Join Gold",
    silver: "Subscribe to Silver",
    waitlist: "Join the Waitlist",
  },
  newsletter: {
    primary: "Get the Monday Brief",
    placeholder: "your.email@company.com",
  },
} as const;

export const contactPage = {
  title: "Let's Solve This Together",
  subtitle:
    "Tell us what you're working on. We respond within 24 hours—most within 4.",
  formHeading: "Start the conversation",
  formSubheading:
    "No pitch decks. No hard sells. Just a straightforward conversation about whether we can help.",
  whatHappensNext: {
    title: "What happens after you reach out",
    steps: [
      {
        number: "01",
        title: "We listen",
        description:
          "A brief call to understand your situation, timeline, and what success looks like for you.",
      },
      {
        number: "02",
        title: "We match",
        description:
          "We identify which partners, resources, or connections from our network fit your needs.",
      },
      {
        number: "03",
        title: "You decide",
        description:
          "We make introductions. You choose if and how to move forward. No pressure, no obligations.",
      },
    ],
  },
} as const;

export const communityPage = {
  title: "A Room Where Everyone Has Your Back",
  subtitle:
    "A curated community where CHROs, talent leaders, search partners, and innovators connect, learn, and grow together.",
  waitlistCta: "Be among the first to join",
  charterMessage:
    "Charter members joining before launch receive founding rates—locked for life.",
  tierIdentity: {
    diamond:
      "For CHROs who've earned their seat at the table and want to stay three steps ahead.",
    platinum:
      "For rising CPOs and talent leaders ready to accelerate their trajectory.",
    gold: "For ambitious HR professionals building their network and skills.",
    silver:
      "For anyone who wants to stay informed and connected to what's next in leadership.",
  },
} as const;

export const eventsPage = {
  title: "Where the Conversations That Matter Happen",
  subtitle:
    "Roundtables, labs, and live demos curated for leaders who'd rather learn from peers than consultants.",
  scarcityNote: "Limited to 25 attendees per session to ensure real conversation.",
  waitlistCta: "Reserve your spot on the waitlist",
} as const;

export const insightsPage = {
  title: "The Playbooks We Use With Members",
  subtitle:
    "Leadership transitions, AI in talent, and organizational design—research, frameworks, and tools crafted with practitioners, not theorists.",
  freeResource: {
    title: "Start Here: The CHRO Succession Framework",
    description:
      "The same 12-point checklist we use with Fortune 500 boards. Yours free.",
    cta: "Download Free",
  },
  socialProof: "Downloaded 1,247 times this quarter",
} as const;

