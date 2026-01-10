/**
 * Spaces and Posts Seed Data
 *
 * Creates community spaces across all visibility levels and tier requirements,
 * along with sample posts for each space.
 */

import type {
  MembershipTier,
  SpaceVisibility,
  SpaceType,
} from "../../src/lib/supabase/types";

export interface SeedSpace {
  name: string;
  slug: string;
  description: string;
  icon: string;
  cover_image_url: string | null;
  visibility: SpaceVisibility;
  type: SpaceType;
  tier_required: MembershipTier;
  is_archived: boolean;
}

export interface SeedPost {
  spaceSlug: string; // Reference to parent space
  title: string | null;
  content: object; // TipTap JSON
  content_text: string;
  is_pinned: boolean;
  is_locked: boolean;
  authorTier: MembershipTier; // Will be matched to a profile of this tier
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Create TipTap JSON content from plain text paragraphs
 */
function createTipTapContent(paragraphs: string[]): object {
  return {
    type: "doc",
    content: paragraphs.map((text) => ({
      type: "paragraph",
      content: text ? [{ type: "text", text }] : [],
    })),
  };
}

// ============================================================================
// SPACES (25 entries)
// ============================================================================

export const seedSpaces: SeedSpace[] = [
  // PUBLIC - SILVER (visible to all, open to free tier)
  {
    name: "General Discussion",
    slug: slugify("General Discussion"),
    description:
      "Open forum for all members to connect, share ideas, and discuss topics relevant to the HR and executive leadership community.",
    icon: "💬",
    cover_image_url: null,
    visibility: "public",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },
  {
    name: "Industry News & Trends",
    slug: slugify("Industry News & Trends"),
    description:
      "Stay updated on the latest developments in HR, talent, and leadership. Share articles, research, and breaking news.",
    icon: "📰",
    cover_image_url: null,
    visibility: "public",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },
  {
    name: "Career Transitions",
    slug: slugify("Career Transitions"),
    description:
      "Support and advice for HR professionals navigating career changes, new roles, or industry transitions.",
    icon: "🚀",
    cover_image_url: null,
    visibility: "public",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },

  // MEMBERS - SILVER (members only, open to all authenticated)
  {
    name: "HR Tech Talk",
    slug: slugify("HR Tech Talk"),
    description:
      "Discuss HR technology implementations, vendor evaluations, and digital transformation in the people function.",
    icon: "⚙️",
    cover_image_url: null,
    visibility: "members",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },
  {
    name: "Leadership Lounge",
    slug: slugify("Leadership Lounge"),
    description:
      "A space for leaders at all levels to discuss management challenges, team dynamics, and leadership philosophy.",
    icon: "🪑",
    cover_image_url: null,
    visibility: "members",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },
  {
    name: "Remote & Hybrid Work",
    slug: slugify("Remote & Hybrid Work"),
    description:
      "Strategies, policies, and best practices for managing distributed teams and hybrid work arrangements.",
    icon: "🏠",
    cover_image_url: null,
    visibility: "members",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },
  {
    name: "Talent Acquisition Network",
    slug: slugify("Talent Acquisition Network"),
    description:
      "Connect with fellow TA leaders. Share sourcing strategies, interview techniques, and employer branding insights.",
    icon: "🎯",
    cover_image_url: null,
    visibility: "members",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },

  // TIER_GATED - GOLD
  {
    name: "Executive Compensation Forum",
    slug: slugify("Executive Compensation Forum"),
    description:
      "Deep dives into executive pay, equity compensation, and total rewards strategy for senior leaders.",
    icon: "💰",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "gold",
    is_archived: false,
  },
  {
    name: "Succession Planning Circle",
    slug: slugify("Succession Planning Circle"),
    description:
      "Develop robust succession pipelines. Share frameworks, case studies, and challenges in leadership continuity.",
    icon: "📊",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "gold",
    is_archived: false,
  },
  {
    name: "M&A People Integration",
    slug: slugify("M&A People Integration"),
    description:
      "Navigate the human side of mergers and acquisitions. Due diligence, integration playbooks, and culture alignment.",
    icon: "🤝",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "gold",
    is_archived: false,
  },
  {
    name: "People Analytics Lab",
    slug: slugify("People Analytics Lab"),
    description:
      "Advanced analytics discussions for HR data scientists and people analytics leaders. Metrics, models, and insights.",
    icon: "📈",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "gold",
    is_archived: false,
  },
  {
    name: "DEI Leaders Roundtable",
    slug: slugify("DEI Leaders Roundtable"),
    description:
      "Strategic discussions on diversity, equity, and inclusion programs. Measuring impact and driving systemic change.",
    icon: "🌈",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "gold",
    is_archived: false,
  },

  // TIER_GATED - PLATINUM
  {
    name: "CHRO Peer Circle",
    slug: slugify("CHRO Peer Circle"),
    description:
      "Exclusive community for CHROs and CPOs. Confidential peer discussions on the most pressing challenges facing HR executives.",
    icon: "👔",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "platinum",
    is_archived: false,
  },
  {
    name: "Board Readiness Forum",
    slug: slugify("Board Readiness Forum"),
    description:
      "Preparing for and serving on corporate boards. Governance, fiduciary duties, and the path to the boardroom.",
    icon: "🏛️",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "platinum",
    is_archived: false,
  },
  {
    name: "CEO-CHRO Partnership",
    slug: slugify("CEO-CHRO Partnership"),
    description:
      "Building strategic partnerships between CEOs and CHROs. Influence, alignment, and driving business impact through people.",
    icon: "⚡",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "platinum",
    is_archived: false,
  },
  {
    name: "Workforce of the Future",
    slug: slugify("Workforce of the Future"),
    description:
      "Strategic foresight on the evolution of work. AI, automation, skills transformation, and preparing for 2030 and beyond.",
    icon: "🔮",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "platinum",
    is_archived: false,
  },
  {
    name: "Private Equity HR Leaders",
    slug: slugify("Private Equity HR Leaders"),
    description:
      "CHROs and HR leaders in PE portfolio companies. Value creation, rapid transformation, and operating partner relationships.",
    icon: "💎",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "platinum",
    is_archived: false,
  },

  // PRIVATE - DIAMOND (invite only)
  {
    name: "CEO Confidential",
    slug: slugify("CEO Confidential"),
    description:
      "Private discussions for CEOs on the most sensitive leadership challenges. Strictly confidential.",
    icon: "🔒",
    cover_image_url: null,
    visibility: "private",
    type: "general",
    tier_required: "diamond",
    is_archived: false,
  },
  {
    name: "Diamond Council",
    slug: slugify("Diamond Council"),
    description:
      "The inner circle of NHL leadership. Strategic discussions shaping the future of the executive HR community.",
    icon: "💠",
    cover_image_url: null,
    visibility: "private",
    type: "general",
    tier_required: "diamond",
    is_archived: false,
  },
  {
    name: "Fortune 100 CHRO Network",
    slug: slugify("Fortune 100 CHRO Network"),
    description:
      "Exclusive space for CHROs of Fortune 100 companies. Peer support and strategic dialogue at the highest level.",
    icon: "🏆",
    cover_image_url: null,
    visibility: "private",
    type: "general",
    tier_required: "diamond",
    is_archived: false,
  },

  // COHORT SPACES (will be linked to cohorts)
  {
    name: "Cohort 2024-Q1: Leadership Transformation",
    slug: slugify("Cohort 2024-Q1 Leadership Transformation"),
    description:
      "Private space for Cohort 2024-Q1 participants. Assignments, discussions, and peer learning.",
    icon: "📚",
    cover_image_url: null,
    visibility: "private",
    type: "cohort",
    tier_required: "platinum",
    is_archived: false,
  },
  {
    name: "Cohort 2024-Q2: AI in HR",
    slug: slugify("Cohort 2024-Q2 AI in HR"),
    description:
      "Cohort space for AI in HR program. Hands-on projects and collaborative learning.",
    icon: "🤖",
    cover_image_url: null,
    visibility: "private",
    type: "cohort",
    tier_required: "platinum",
    is_archived: false,
  },

  // ARCHIVED SPACE (for testing)
  {
    name: "Legacy HR Practices",
    slug: slugify("Legacy HR Practices"),
    description:
      "Historical discussions on traditional HR practices. This space has been archived.",
    icon: "📦",
    cover_image_url: null,
    visibility: "members",
    type: "general",
    tier_required: "silver",
    is_archived: true,
  },

  // Additional spaces to reach 25
  {
    name: "Learning & Development Hub",
    slug: slugify("Learning & Development Hub"),
    description:
      "L&D professionals sharing strategies, tools, and innovations in corporate learning.",
    icon: "🎓",
    cover_image_url: null,
    visibility: "members",
    type: "general",
    tier_required: "silver",
    is_archived: false,
  },
  {
    name: "Employee Experience Design",
    slug: slugify("Employee Experience Design"),
    description:
      "Designing exceptional employee journeys from hire to retire. UX principles applied to HR.",
    icon: "✨",
    cover_image_url: null,
    visibility: "tier_gated",
    type: "general",
    tier_required: "gold",
    is_archived: false,
  },
];

// ============================================================================
// POSTS (50+ entries across spaces)
// ============================================================================

export const seedPosts: SeedPost[] = [
  // General Discussion posts
  {
    spaceSlug: "general-discussion",
    title: "Welcome to the NHL Community!",
    content: createTipTapContent([
      "Welcome to Next Horizon Leadership! We're thrilled to have you as part of our community of forward-thinking HR and executive leaders.",
      "This space is for open discussions on any topic relevant to our community. Feel free to introduce yourself, share insights, or ask questions.",
      "A few guidelines to keep in mind:",
      "• Be respectful and constructive in all discussions",
      "• Share your expertise generously",
      "• Protect confidential information",
      "• Help newcomers feel welcome",
      "Looking forward to great conversations!",
    ]),
    content_text:
      "Welcome to Next Horizon Leadership! We're thrilled to have you as part of our community...",
    is_pinned: true,
    is_locked: false,
    authorTier: "diamond",
  },
  {
    spaceSlug: "general-discussion",
    title: "What's your biggest HR challenge in 2024?",
    content: createTipTapContent([
      "As we navigate another year of change, I'm curious what challenges are top of mind for everyone.",
      "For me, it's balancing AI adoption with workforce anxiety. Our employees are excited about efficiency gains but worried about job displacement.",
      "What's keeping you up at night?",
    ]),
    content_text:
      "As we navigate another year of change, I'm curious what challenges are top of mind...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "general-discussion",
    title: null,
    content: createTipTapContent([
      "Quick poll: How many of you have implemented a skills-based organization model? Would love to hear about your experiences.",
    ]),
    content_text:
      "Quick poll: How many of you have implemented a skills-based organization model?",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },

  // Industry News posts
  {
    spaceSlug: "industry-news-trends",
    title: "Breaking: New SEC Rules on Human Capital Disclosure",
    content: createTipTapContent([
      "The SEC just announced expanded requirements for human capital disclosure in 10-K filings.",
      "Key changes include:",
      "• More detailed workforce composition data",
      "• Turnover rates by employee category",
      "• Investment in training and development",
      "• Pay equity metrics",
      "This will significantly impact how we report on our workforce. What's everyone's initial reaction?",
    ]),
    content_text:
      "The SEC just announced expanded requirements for human capital disclosure...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "industry-news-trends",
    title: "Josh Bersin's Latest: The End of Jobs",
    content: createTipTapContent([
      "Just finished reading Josh Bersin's new research on the shift from jobs to skills.",
      "His key thesis: Traditional job architectures are becoming obsolete. The future is a skills-powered organization where work is dynamically assigned based on capabilities.",
      "Thoughts? Is this the direction we're all heading, or is it overstated?",
    ]),
    content_text:
      "Just finished reading Josh Bersin's new research on the shift from jobs to skills...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },

  // HR Tech Talk posts
  {
    spaceSlug: "hr-tech-talk",
    title: "Workday vs. Oracle HCM: Our Migration Experience",
    content: createTipTapContent([
      "We just completed an 18-month migration from Oracle to Workday for our 25,000-employee organization. Happy to share lessons learned.",
      "The good:",
      "• User experience is significantly better",
      "• Reporting is more intuitive",
      "• Mobile experience is strong",
      "The challenging:",
      "• Data migration was brutal (plan for 2x the time you think)",
      "• Customizations don't transfer - you'll rebuild",
      "• Change management for payroll was harder than expected",
      "AMA!",
    ]),
    content_text:
      "We just completed an 18-month migration from Oracle to Workday...",
    is_pinned: true,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "hr-tech-talk",
    title: "AI Recruiting Tools: What's Actually Working?",
    content: createTipTapContent([
      "Cutting through the hype - what AI recruiting tools are actually delivering ROI for your teams?",
      "We've tested:",
      "• Eightfold for talent matching",
      "• Paradox for scheduling",
      "• HireVue for assessments",
      "Results have been mixed. Paradox is the clear winner for us - 60% reduction in scheduling coordination time. The others are still proving themselves.",
    ]),
    content_text:
      "Cutting through the hype - what AI recruiting tools are actually delivering ROI...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },

  // Executive Compensation Forum posts
  {
    spaceSlug: "executive-compensation-forum",
    title: "Say-on-Pay Failures: Lessons from 2024 Proxy Season",
    content: createTipTapContent([
      "Analyzing the say-on-pay failures from this proxy season. A few patterns emerge:",
      "1. Disconnect between pay and performance during economic headwinds",
      "2. One-time 'special' awards that investors see as excessive",
      "3. Poor disclosure of performance metrics",
      "ISS and Glass Lewis are getting tougher. What are you doing to get ahead of 2025?",
    ]),
    content_text:
      "Analyzing the say-on-pay failures from this proxy season...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "executive-compensation-forum",
    title: "Equity Refresh Grants in a Down Market",
    content: createTipTapContent([
      "With equity values down significantly, we're seeing massive pressure for refresh grants to retain executives.",
      "How are others handling this? Options we're considering:",
      "• One-time retention grants with extended vesting",
      "• Repricing (controversial, I know)",
      "• Cash retention bonuses as a bridge",
      "• New LTI plan with reset strike prices",
      "Board is nervous about dilution and optics. Looking for creative solutions.",
    ]),
    content_text:
      "With equity values down significantly, we're seeing massive pressure for refresh grants...",
    is_pinned: false,
    is_locked: false,
    authorTier: "diamond",
  },

  // CHRO Peer Circle posts
  {
    spaceSlug: "chro-peer-circle",
    title: "Managing CEO Expectations: A Candid Discussion",
    content: createTipTapContent([
      "I've been CHRO for 3 years now, and the relationship with my CEO is the single biggest factor in my effectiveness (and sanity).",
      "Sometimes the expectations are unrealistic - wanting culture transformation in 6 months, or perfect retention during a RIF.",
      "How do you manage up effectively without being seen as making excuses? Would love to hear how others navigate this.",
    ]),
    content_text:
      "I've been CHRO for 3 years now, and the relationship with my CEO is the single biggest factor...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "chro-peer-circle",
    title: "Board Presentation: Human Capital Update",
    content: createTipTapContent([
      "Presenting to my board next month on human capital strategy. Would love feedback on the topics I'm planning to cover:",
      "1. Workforce planning and critical role coverage",
      "2. Succession depth for top 50 roles",
      "3. Culture and engagement trends",
      "4. DEI progress against commitments",
      "5. Compensation competitiveness and equity burn",
      "What am I missing? What questions do your boards ask?",
    ]),
    content_text:
      "Presenting to my board next month on human capital strategy...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },

  // Remote & Hybrid Work posts
  {
    spaceSlug: "remote-hybrid-work",
    title: "Return to Office Mandates: The Data After 6 Months",
    content: createTipTapContent([
      "We mandated 3 days in office starting in January. Here's what we're seeing 6 months in:",
      "• 15% voluntary attrition (mostly high performers)",
      "• 22% say they're actively looking",
      "• Collaboration metrics are up, but so is presenteeism",
      "• Manager satisfaction with policy is only 45%",
      "I'm questioning whether this was the right call. What are others experiencing?",
    ]),
    content_text:
      "We mandated 3 days in office starting in January. Here's what we're seeing 6 months in...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },
  {
    spaceSlug: "remote-hybrid-work",
    title: "Async-First Culture: Making It Work",
    content: createTipTapContent([
      "We're a fully remote company with employees in 15 time zones. Async-first isn't just a nice-to-have, it's essential.",
      "Some things that work for us:",
      "• Loom for all meetings that could be emails",
      "• 4-hour response time expectation (not instant)",
      "• Weekly all-hands recorded and transcribed",
      "• No Slack after 6pm expectation",
      "Hardest part: Getting executives to model the behavior. Old habits die hard.",
    ]),
    content_text:
      "We're a fully remote company with employees in 15 time zones...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },

  // Succession Planning Circle posts
  {
    spaceSlug: "succession-planning-circle",
    title: "Emergency Succession: When the CEO Leaves Suddenly",
    content: createTipTapContent([
      "Our CEO resigned unexpectedly last month (moved to a competitor). We thought we had succession planning figured out.",
      "We didn't.",
      "Our designated successor wasn't ready. Board had to bring in an interim from outside. It's been chaotic.",
      "Lessons learned:",
      "• 'Ready in 2 years' isn't ready now",
      "• Need at least one emergency-ready candidate",
      "• Board relationships with internal candidates matter",
      "Don't let this happen to you.",
    ]),
    content_text:
      "Our CEO resigned unexpectedly last month. We thought we had succession planning figured out...",
    is_pinned: true,
    is_locked: false,
    authorTier: "platinum",
  },

  // People Analytics Lab posts
  {
    spaceSlug: "people-analytics-lab",
    title: "Predictive Attrition Models: Ethical Considerations",
    content: createTipTapContent([
      "We built a predictive attrition model with 85% accuracy. Now legal and ethics are raising concerns.",
      "Key questions we're wrestling with:",
      "• Should managers see flight risk scores?",
      "• What if the model has disparate impact?",
      "• Are we surveilling employees?",
      "• If someone is flagged, what actions are appropriate?",
      "The data science is the easy part. The ethics are hard.",
    ]),
    content_text:
      "We built a predictive attrition model with 85% accuracy. Now legal and ethics are raising concerns...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },

  // DEI Leaders Roundtable posts
  {
    spaceSlug: "dei-leaders-roundtable",
    title: "Post-Affirmative Action: Adjusting Our Approach",
    content: createTipTapContent([
      "The Supreme Court decision on affirmative action has implications beyond higher education. We're reviewing all our programs.",
      "Changes we're making:",
      "• Shifting from demographic goals to holistic diversity of thought",
      "• Removing race from scholarship eligibility",
      "• Focusing on socioeconomic diversity",
      "• Strengthening legal review of all DEI initiatives",
      "It's a difficult time for this work. How are others adapting?",
    ]),
    content_text:
      "The Supreme Court decision on affirmative action has implications beyond higher education...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },

  // Board Readiness Forum posts
  {
    spaceSlug: "board-readiness-forum",
    title: "My First Board Role: What I Wish I Knew",
    content: createTipTapContent([
      "Just completed my first year on a public company board. Sharing some candid reflections:",
      "1. Preparation time is significant - 15-20 hours per meeting",
      "2. The real conversations happen outside the boardroom",
      "3. Executive sessions without management are where governance happens",
      "4. You need to build relationships with other directors",
      "5. D&O insurance matters more than you think",
      "It's been rewarding but demanding. Happy to answer questions.",
    ]),
    content_text:
      "Just completed my first year on a public company board. Sharing some candid reflections...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },

  // CEO Confidential posts (private, diamond)
  {
    spaceSlug: "ceo-confidential",
    title: "Navigating a Founder Transition",
    content: createTipTapContent([
      "I'm a non-founder CEO who came in 18 months ago. The founder is still on the board and... involved.",
      "It's a delicate dance. They built something amazing, but the company needs to evolve.",
      "Seeking advice from others who have navigated founder dynamics. How do you honor the legacy while driving change?",
      "This is a safe space - please keep this discussion confidential.",
    ]),
    content_text:
      "I'm a non-founder CEO who came in 18 months ago. The founder is still on the board...",
    is_pinned: false,
    is_locked: false,
    authorTier: "diamond",
  },

  // Diamond Council posts
  {
    spaceSlug: "diamond-council",
    title: "NHL 2025 Strategic Priorities: Your Input",
    content: createTipTapContent([
      "As we plan for 2025, the NHL leadership team would like your input on strategic priorities for our community.",
      "Areas we're considering:",
      "• Expanding international chapters",
      "• More in-person executive retreats",
      "• Enhanced mentorship matching",
      "• Research partnerships with business schools",
      "What would make NHL more valuable for you in the coming year?",
    ]),
    content_text:
      "As we plan for 2025, the NHL leadership team would like your input...",
    is_pinned: true,
    is_locked: false,
    authorTier: "diamond",
  },

  // More posts to reach 50+
  {
    spaceSlug: "leadership-lounge",
    title: "Managing Underperformers: When Coaching Isn't Working",
    content: createTipTapContent([
      "I have a director who's been on a PIP for 60 days. Despite coaching, progress is minimal.",
      "How long do you give someone before concluding it's not going to work? What's the balance between compassion and accountability?",
    ]),
    content_text:
      "I have a director who's been on a PIP for 60 days. Despite coaching, progress is minimal...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },
  {
    spaceSlug: "talent-acquisition-network",
    title: "Sourcers vs. Recruiters: How Do You Structure?",
    content: createTipTapContent([
      "We're debating whether to have dedicated sourcers or have full-cycle recruiters.",
      "Currently we have a 3:1 ratio of recruiters to sourcers. Thinking of moving to full-cycle.",
      "What's working in your organizations?",
    ]),
    content_text:
      "We're debating whether to have dedicated sourcers or have full-cycle recruiters...",
    is_pinned: false,
    is_locked: false,
    authorTier: "silver",
  },
  {
    spaceSlug: "talent-acquisition-network",
    title: "University Recruiting: Is It Worth the Investment?",
    content: createTipTapContent([
      "Our campus recruiting budget is $2M annually. ROI is hard to measure.",
      "We hire ~100 new grads per year. Is this efficient, or should we shift to experienced hiring?",
    ]),
    content_text:
      "Our campus recruiting budget is $2M annually. ROI is hard to measure...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },
  {
    spaceSlug: "learning-development-hub",
    title: "Leadership Development ROI: How Do You Measure?",
    content: createTipTapContent([
      "We spend $5M annually on leadership development. The CFO is asking for ROI.",
      "We track completion rates and satisfaction scores, but that doesn't prove business impact.",
      "How are others connecting L&D investment to business outcomes?",
    ]),
    content_text:
      "We spend $5M annually on leadership development. The CFO is asking for ROI...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },
  {
    spaceSlug: "learning-development-hub",
    title: "AI-Powered Learning Platforms: Reviews Wanted",
    content: createTipTapContent([
      "Evaluating next-gen learning platforms with AI personalization. Looking at:",
      "• Degreed",
      "• EdCast",
      "• Cornerstone",
      "• LinkedIn Learning Hub",
      "Anyone have experience with these? What's the AI actually delivering beyond buzzwords?",
    ]),
    content_text:
      "Evaluating next-gen learning platforms with AI personalization...",
    is_pinned: false,
    is_locked: false,
    authorTier: "silver",
  },
  {
    spaceSlug: "ma-people-integration",
    title: "Day 1 Readiness Checklist: What We Learned",
    content: createTipTapContent([
      "Just closed our 5th acquisition. Day 1 readiness is an art form.",
      "Our checklist includes:",
      "• Systems access for critical roles",
      "• Manager communication cascade",
      "• Benefits continuation confirmation",
      "• Retention bonus documentation",
      "• Welcome communications",
      "What do you include on yours?",
    ]),
    content_text:
      "Just closed our 5th acquisition. Day 1 readiness is an art form...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "workforce-of-the-future",
    title: "Skills Taxonomy: Build vs. Buy",
    content: createTipTapContent([
      "We need a skills taxonomy for workforce planning. Options:",
      "1. Build custom (expensive, perfectly tailored)",
      "2. Use vendor taxonomy (Lightcast, EMSI)",
      "3. Hybrid approach",
      "We're leaning toward starting with vendor and customizing. Thoughts?",
    ]),
    content_text:
      "We need a skills taxonomy for workforce planning...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "private-equity-hr-leaders",
    title: "100-Day Plan for New PE Portfolio Company CHRO",
    content: createTipTapContent([
      "Starting as CHRO of a PE portfolio company next month. Operating partner has high expectations for value creation.",
      "My draft 100-day plan focuses on:",
      "• Talent assessment of leadership team",
      "• Quick wins on org efficiency",
      "• Compensation market alignment",
      "• Identifying key retention risks",
      "What am I missing for the PE context specifically?",
    ]),
    content_text:
      "Starting as CHRO of a PE portfolio company next month...",
    is_pinned: false,
    is_locked: false,
    authorTier: "platinum",
  },
  {
    spaceSlug: "employee-experience-design",
    title: "Moments That Matter: Mapping the Employee Journey",
    content: createTipTapContent([
      "We're redesigning our employee experience around 'moments that matter.'",
      "Key moments we've identified:",
      "• First day/first week",
      "• First performance review",
      "• Promotion/role change",
      "• Return from leave",
      "• Exit transition",
      "What moments are you focused on? How do you design interventions?",
    ]),
    content_text:
      "We're redesigning our employee experience around 'moments that matter'...",
    is_pinned: false,
    is_locked: false,
    authorTier: "gold",
  },
  {
    spaceSlug: "career-transitions",
    title: "From HR to Ops: Making the Leap",
    content: createTipTapContent([
      "After 15 years in HR, I'm considering a move to operations leadership.",
      "Has anyone made this transition? What skills transferred well? What gaps did you need to fill?",
      "My CEO is supportive but the COO role that's opening feels like a stretch.",
    ]),
    content_text:
      "After 15 years in HR, I'm considering a move to operations leadership...",
    is_pinned: false,
    is_locked: false,
    authorTier: "silver",
  },
];

/**
 * Get posts for a specific space by slug
 */
export function getPostsForSpace(spaceSlug: string): SeedPost[] {
  return seedPosts.filter((p) => p.spaceSlug === spaceSlug);
}

/**
 * Get spaces by visibility
 */
export function getSpacesByVisibility(visibility: SpaceVisibility): SeedSpace[] {
  return seedSpaces.filter((s) => s.visibility === visibility);
}

/**
 * Get spaces by tier requirement
 */
export function getSpacesByTier(tier: MembershipTier): SeedSpace[] {
  return seedSpaces.filter((s) => s.tier_required === tier);
}
