// Services data with problem-first framing, identity targeting, and social proof

export interface Service {
  title: string;
  problem: string;
  description: string;
  whoThisIsFor: string[];
  whoThisIsNotFor: string[];
  outcomes: string[];
  testimonial?: {
    quote: string;
    author: string;
  };
  icon: string;
}

export const services: Service[] = [
  {
    title: "Executive Search Optimization",
    problem:
      "By the time you realize your search firm isn't working, you've lost 6 months and damaged your credibility with the board.",
    description:
      "We partner with you at critical leadership moments—advising when external search is truly needed, guiding firm evaluation and selection, and collaborating on strategy and execution to ensure the outcome matches the investment.",
    whoThisIsFor: [
      "CHROs managing their first board-level search",
      "CEOs who've been burned by search firms before",
      "Talent leaders inheriting a stalled search",
    ],
    whoThisIsNotFor: [
      "Searches below VP level",
      "Organizations not ready to invest in a thorough process",
    ],
    outcomes: [
      "Average time-to-placement: 47 days",
      "92% of placements still in role after 2 years",
      "Board satisfaction scores averaging 4.8/5",
    ],
    testimonial: {
      quote: "They found us a CFO in 47 days. Our last search took 8 months.",
      author: "CHRO, Fortune 500 Manufacturing",
    },
    icon: "search",
  },
  {
    title: "AI For Talent Advisory",
    problem:
      "Every AI vendor promises 'transformation.' Most deliver dashboards. You don't have time to evaluate 50 tools to find the 3 that actually work.",
    description:
      "We've already vetted the landscape. We help you understand which AI innovations actually move the needle, identify the players worth your time, and assess whether to partner, build, or wait.",
    whoThisIsFor: [
      "CHROs tasked with 'bringing AI to HR'",
      "Talent leaders evaluating intelligent sourcing tools",
      "HR teams drowning in vendor pitches",
    ],
    whoThisIsNotFor: [
      "Organizations without basic HR tech infrastructure",
      "Leaders looking for AI to replace human judgment",
    ],
    outcomes: [
      "Typical pilot launched in under 45 days",
      "Average 3.2x reduction in vendor evaluation time",
      "Clear build vs. buy recommendations",
    ],
    testimonial: {
      quote:
        "Finally, someone who could separate the AI hype from what actually works.",
      author: "Head of Talent, High-Growth Tech",
    },
    icon: "sparkles",
  },
  {
    title: "Org Design & Role Definition",
    problem:
      "Your organization was designed for a world that no longer exists. But restructuring without a clear framework creates more chaos than clarity.",
    description:
      "We help executives envision how their organizations must evolve—from AI-human collaboration to optimal scale, structure, and role design. We provide strategic advisory and trusted partners who bring clarity amid uncertainty.",
    whoThisIsFor: [
      "CPOs preparing for significant headcount changes",
      "CHROs post-merger or acquisition",
      "Leaders whose org chart hasn't been reviewed in 3+ years",
    ],
    whoThisIsNotFor: [
      "Teams looking for quick fixes",
      "Organizations not ready for honest assessment",
    ],
    outcomes: [
      "Restructuring frameworks that get CEO/CFO alignment",
      "Clear decision rights mapping",
      "Sequenced implementation roadmaps",
    ],
    testimonial: {
      quote:
        "The restructuring framework saved us six months of internal debate.",
      author: "CPO, Private Equity Portfolio Company",
    },
    icon: "layout",
  },
  {
    title: "Interim & Fractional Leadership",
    problem:
      "Your CHRO just resigned. The board is asking about succession. You need someone in the seat in days, not months—but quality matters.",
    description:
      "We connect you with seasoned executives who can step in immediately while you run a proper search. Our bench of proven leaders, combined with specialized firm partnerships, gives you broader reach and functional expertise on short notice.",
    whoThisIsFor: [
      "Boards facing sudden executive departures",
      "CEOs who need HR leadership during a search",
      "Private equity firms stabilizing portfolio companies",
    ],
    whoThisIsNotFor: [
      "Roles that can wait 90+ days",
      "Organizations looking for permanent placement through interim",
    ],
    outcomes: [
      "Average placement time: 72 hours",
      "Executives with 15+ years C-suite experience",
      "Seamless transition to permanent hire",
    ],
    testimonial: {
      quote:
        "Our interim CHRO started in 72 hours and stayed 18 months. Perfect fit.",
      author: "CEO, Mid-Market Manufacturing",
    },
    icon: "users",
  },
] as const;

export const whatWeDo = [
  {
    title: "Shaping the Future of Leadership",
    problem: "Most executive searches fail not because of bad candidates, but bad process.",
    description:
      "We guide organizations through critical transitions by leveraging a network of vetted partners—with direct oversight to ensure the process matches the stakes. We help build deeper talent pipelines, externally and internally.",
    icon: "users",
  },
  {
    title: "Harnessing AI in Talent",
    problem: "Your competitors are piloting AI in talent acquisition. Where are you?",
    description:
      "We connect HR and talent leaders with the AI companies actually transforming how organizations find, develop, and retain talent—not the ones just transforming their pitch decks.",
    icon: "sparkles",
  },
  {
    title: "Reimagining Organizational Design",
    problem: "The org chart that got you here won't get you there.",
    description:
      "We help leaders rethink structure, culture, and strategy to unlock agility and resilience in a world that changes faster than annual planning cycles.",
    icon: "layout",
  },
] as const;

export const whyNHL = [
  {
    title: "Leadership Decision-Makers",
    description:
      "CEOs, CHROs, and talent leaders who'd rather learn from peers than consultants",
    identity: "You've earned your seat. Now you want the network that keeps you ahead.",
    icon: "crown",
  },
  {
    title: "Search Partners",
    description:
      "Vetted executive search firms who measure success in years, not placements",
    identity: "You're tired of competing on price. You want clients who value quality.",
    icon: "search",
  },
  {
    title: "AI Innovators",
    description:
      "Companies building technology that augments human judgment, not replaces it",
    identity: "You have a great product. You need access to the right decision-makers.",
    icon: "sparkles",
  },
  {
    title: "Rising HR Talent",
    description:
      "Ambitious professionals building the skills and networks that accelerate careers",
    identity: "You're not waiting for opportunities. You're creating them.",
    icon: "graduationCap",
  },
] as const;
