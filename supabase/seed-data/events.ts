/**
 * Events Seed Data
 *
 * Creates a mix of past, upcoming, and future events
 * across all location types and tier requirements.
 */

import type {
  MembershipTier,
  EventLocationType,
} from "../../src/lib/supabase/types";
import { addDays, addHours, subDays, format } from "date-fns";

export interface SeedEvent {
  title: string;
  description: string;
  content: object | null; // TipTap JSON for rich description
  cover_image_url: string | null;
  starts_at: Date;
  ends_at: Date | null;
  timezone: string;
  location_type: EventLocationType;
  location_details: string | null;
  video_room_url: string | null;
  tier_required: MembershipTier;
  max_attendees: number | null;
  is_published: boolean;
  spaceSlug: string | null; // Optional link to a space
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

// Reference date for relative event scheduling
const now = new Date();

// ============================================================================
// EVENTS (25 entries)
// ============================================================================

export const seedEvents: SeedEvent[] = [
  // ============================================================================
  // PAST EVENTS (5 entries) - For testing historical data
  // ============================================================================
  {
    title: "2024 Annual HR Leadership Summit",
    description:
      "Our flagship annual event bringing together 500+ HR leaders for three days of learning, networking, and inspiration.",
    content: createTipTapContent([
      "Join us for the premier gathering of HR executives in 2024.",
      "This year's theme: 'Leading Through Uncertainty' featuring keynotes from Fortune 500 CHROs and interactive workshops.",
      "Day 1: Strategic HR Leadership",
      "Day 2: People Analytics & AI",
      "Day 3: Culture & Employee Experience",
      "Networking reception and executive dinner included.",
    ]),
    cover_image_url: null,
    starts_at: subDays(now, 90),
    ends_at: subDays(now, 88),
    timezone: "America/New_York",
    location_type: "in_person",
    location_details: "The Ritz-Carlton, Half Moon Bay, California",
    video_room_url: null,
    tier_required: "gold",
    max_attendees: 500,
    is_published: true,
    spaceSlug: null,
  },
  {
    title: "Q3 CHRO Roundtable: Economic Outlook",
    description:
      "Quarterly virtual gathering of CHROs to discuss economic conditions and workforce implications.",
    content: createTipTapContent([
      "An intimate discussion among senior HR leaders about navigating economic uncertainty.",
      "Topics covered:",
      "• Workforce planning scenarios",
      "• Compensation adjustments",
      "• Retention strategies in a volatile market",
      "Chatham House rules apply.",
    ]),
    cover_image_url: null,
    starts_at: subDays(now, 45),
    ends_at: addHours(subDays(now, 45), 2),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/archived",
    tier_required: "platinum",
    max_attendees: 50,
    is_published: true,
    spaceSlug: "chro-peer-circle",
  },
  {
    title: "AI in HR: Practical Applications Workshop",
    description:
      "Hands-on workshop exploring real AI implementations in recruiting, L&D, and analytics.",
    content: null,
    cover_image_url: null,
    starts_at: subDays(now, 30),
    ends_at: addHours(subDays(now, 30), 4),
    timezone: "America/Los_Angeles",
    location_type: "hybrid",
    location_details: "Google Campus, Mountain View + Virtual",
    video_room_url: "https://meet.google.com/archived",
    tier_required: "gold",
    max_attendees: 100,
    is_published: true,
    spaceSlug: "hr-tech-talk",
  },
  {
    title: "New Member Orientation - December",
    description:
      "Welcome session for new NHL members. Learn about community features and connect with fellow members.",
    content: null,
    cover_image_url: null,
    starts_at: subDays(now, 60),
    ends_at: addHours(subDays(now, 60), 1),
    timezone: "America/Chicago",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/archived",
    tier_required: "silver",
    max_attendees: null,
    is_published: true,
    spaceSlug: "general-discussion",
  },
  {
    title: "Executive Compensation Trends Webinar",
    description:
      "Annual review of executive pay trends with data from 1,000+ companies.",
    content: null,
    cover_image_url: null,
    starts_at: subDays(now, 15),
    ends_at: addHours(subDays(now, 15), 1.5),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/archived",
    tier_required: "gold",
    max_attendees: 200,
    is_published: true,
    spaceSlug: "executive-compensation-forum",
  },

  // ============================================================================
  // UPCOMING EVENTS (10 entries) - Next 30 days
  // ============================================================================
  {
    title: "Monthly HR Tech Office Hours",
    description:
      "Open Q&A session with our HR technology experts. Bring your implementation questions!",
    content: createTipTapContent([
      "Join us for our monthly office hours where you can get real-time advice on HR technology decisions.",
      "Whether you're evaluating vendors, planning an implementation, or troubleshooting issues, our experts are here to help.",
      "No registration required for Gold+ members. Drop in anytime during the session.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 3),
    ends_at: addHours(addDays(now, 3), 2),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/live-session",
    tier_required: "gold",
    max_attendees: null,
    is_published: true,
    spaceSlug: "hr-tech-talk",
  },
  {
    title: "CHRO Breakfast: NYC Chapter",
    description:
      "In-person breakfast gathering for CHROs in the New York metro area.",
    content: createTipTapContent([
      "Connect with fellow CHROs over breakfast in Manhattan.",
      "Informal networking with structured discussion on current challenges.",
      "This month's topic: Managing through the RTO transition",
      "Limited to 20 participants to ensure meaningful conversation.",
    ]),
    cover_image_url: null,
    starts_at: addHours(addDays(now, 5), 8), // 8 AM
    ends_at: addHours(addDays(now, 5), 10), // 10 AM
    timezone: "America/New_York",
    location_type: "in_person",
    location_details: "The Core Club, 66 E 55th St, New York, NY",
    video_room_url: null,
    tier_required: "platinum",
    max_attendees: 20,
    is_published: true,
    spaceSlug: "chro-peer-circle",
  },
  {
    title: "Webinar: Building a Skills-Based Organization",
    description:
      "Learn frameworks and case studies for transitioning from jobs to skills.",
    content: createTipTapContent([
      "The skills-based organization is no longer theoretical. Leading companies are making it work.",
      "In this webinar, you'll learn:",
      "• Why traditional job architectures are failing",
      "• How to build a skills taxonomy",
      "• Technology enablers for skills-based talent management",
      "• Case studies from early adopters",
      "Featuring speakers from Unilever and Microsoft HR teams.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 7),
    ends_at: addHours(addDays(now, 7), 1),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/webinar/skills",
    tier_required: "silver",
    max_attendees: 500,
    is_published: true,
    spaceSlug: "workforce-of-the-future",
  },
  {
    title: "People Analytics Masterclass",
    description:
      "Deep dive workshop on advanced analytics techniques for HR.",
    content: createTipTapContent([
      "Move beyond dashboards to predictive and prescriptive analytics.",
      "Topics include:",
      "• Predictive attrition modeling",
      "• Network analysis for collaboration",
      "• NLP for engagement surveys",
      "• Ethical considerations in HR AI",
      "Hands-on exercises using Python (bring your laptop).",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 10),
    ends_at: addHours(addDays(now, 10), 6),
    timezone: "America/Los_Angeles",
    location_type: "hybrid",
    location_details: "USC Marshall School of Business + Virtual",
    video_room_url: "https://zoom.us/j/analytics-class",
    tier_required: "gold",
    max_attendees: 50,
    is_published: true,
    spaceSlug: "people-analytics-lab",
  },
  {
    title: "New Member Orientation - January",
    description:
      "Welcome session for new NHL members joining this month.",
    content: null,
    cover_image_url: null,
    starts_at: addDays(now, 12),
    ends_at: addHours(addDays(now, 12), 1),
    timezone: "America/Chicago",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/orientation",
    tier_required: "silver",
    max_attendees: null,
    is_published: true,
    spaceSlug: null,
  },
  {
    title: "DEI Leaders Virtual Summit",
    description:
      "Full-day virtual conference on the future of diversity, equity, and inclusion.",
    content: createTipTapContent([
      "A day dedicated to advancing DEI in organizations.",
      "Agenda:",
      "9 AM - Opening Keynote: DEI in a Divided World",
      "10 AM - Panel: Measuring What Matters",
      "11:30 AM - Breakout Sessions",
      "1 PM - Lunch Break",
      "2 PM - Workshop: Inclusive Leadership",
      "3:30 PM - Panel: ERG Best Practices",
      "4:30 PM - Closing: The Road Ahead",
    ]),
    cover_image_url: null,
    starts_at: addHours(addDays(now, 14), 9),
    ends_at: addHours(addDays(now, 14), 17),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://hopin.com/events/dei-summit",
    tier_required: "gold",
    max_attendees: 300,
    is_published: true,
    spaceSlug: "dei-leaders-roundtable",
  },
  {
    title: "CHRO Dinner: Bay Area",
    description:
      "Exclusive dinner for CHROs in the San Francisco Bay Area.",
    content: createTipTapContent([
      "Join fellow Bay Area CHROs for an evening of fine dining and candid conversation.",
      "Discussion topic: Competing for talent in the AI era",
      "Strictly Chatham House rules. Limited to 12 CHROs.",
    ]),
    cover_image_url: null,
    starts_at: addHours(addDays(now, 18), 18), // 6 PM
    ends_at: addHours(addDays(now, 18), 21), // 9 PM
    timezone: "America/Los_Angeles",
    location_type: "in_person",
    location_details: "Private dining room at Quince, San Francisco",
    video_room_url: null,
    tier_required: "diamond",
    max_attendees: 12,
    is_published: true,
    spaceSlug: "ceo-confidential",
  },
  {
    title: "Succession Planning Workshop",
    description:
      "Interactive workshop on building robust succession pipelines.",
    content: null,
    cover_image_url: null,
    starts_at: addDays(now, 20),
    ends_at: addHours(addDays(now, 20), 3),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/succession",
    tier_required: "gold",
    max_attendees: 40,
    is_published: true,
    spaceSlug: "succession-planning-circle",
  },
  {
    title: "Remote Work Strategies Roundtable",
    description:
      "Peer discussion on hybrid and remote work policies that work.",
    content: null,
    cover_image_url: null,
    starts_at: addDays(now, 22),
    ends_at: addHours(addDays(now, 22), 1.5),
    timezone: "America/Denver",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/remote-work",
    tier_required: "silver",
    max_attendees: 30,
    is_published: true,
    spaceSlug: "remote-hybrid-work",
  },
  {
    title: "M&A Integration Bootcamp",
    description:
      "Two-day intensive on people integration in mergers and acquisitions.",
    content: createTipTapContent([
      "Learn from seasoned M&A HR leaders how to navigate the people side of deals.",
      "Day 1: Pre-deal due diligence and planning",
      "Day 2: Day 1 readiness and first 100 days",
      "Includes case studies and tabletop exercises.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 25),
    ends_at: addDays(now, 26),
    timezone: "America/New_York",
    location_type: "hybrid",
    location_details: "WeWork, 1 State Street, NYC + Virtual",
    video_room_url: "https://zoom.us/j/ma-bootcamp",
    tier_required: "platinum",
    max_attendees: 30,
    is_published: true,
    spaceSlug: "ma-people-integration",
  },

  // ============================================================================
  // FUTURE EVENTS (10 entries) - Beyond 30 days
  // ============================================================================
  {
    title: "Q1 CHRO Roundtable: 2025 Priorities",
    description:
      "Quarterly virtual gathering to discuss strategic HR priorities for the year ahead.",
    content: createTipTapContent([
      "Start the year with insights from your peers on what's top of mind for 2025.",
      "Agenda:",
      "• Economic outlook and workforce implications",
      "• AI transformation update",
      "• Regulatory landscape changes",
      "• Open discussion",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 45),
    ends_at: addHours(addDays(now, 45), 2),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/q1-chro",
    tier_required: "platinum",
    max_attendees: 50,
    is_published: true,
    spaceSlug: "chro-peer-circle",
  },
  {
    title: "Board Readiness Intensive",
    description:
      "Comprehensive program preparing senior executives for board roles.",
    content: createTipTapContent([
      "A selective two-day program for executives seeking their first board position.",
      "Curriculum includes:",
      "• Governance fundamentals",
      "• Fiduciary responsibilities",
      "• Committee deep dives (Audit, Comp, Nom/Gov)",
      "• Building your board brand",
      "• Navigating your first year",
      "Faculty includes sitting board members from Fortune 500 companies.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 60),
    ends_at: addDays(now, 61),
    timezone: "America/New_York",
    location_type: "in_person",
    location_details: "Harvard Club of New York City",
    video_room_url: null,
    tier_required: "platinum",
    max_attendees: 25,
    is_published: true,
    spaceSlug: "board-readiness-forum",
  },
  {
    title: "2025 Spring HR Leadership Summit",
    description:
      "Our flagship spring event for HR leaders at all levels.",
    content: createTipTapContent([
      "Save the date for our spring gathering of the NHL community.",
      "Three days of learning, networking, and inspiration.",
      "Theme: 'The Human Edge in an AI World'",
      "Early bird registration opens 60 days prior.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 120),
    ends_at: addDays(now, 122),
    timezone: "America/New_York",
    location_type: "in_person",
    location_details: "The Breakers, Palm Beach, Florida",
    video_room_url: null,
    tier_required: "gold",
    max_attendees: 400,
    is_published: true,
    spaceSlug: null,
  },
  {
    title: "PE Portfolio CHRO Summit",
    description:
      "Gathering of HR leaders from private equity portfolio companies.",
    content: createTipTapContent([
      "Connect with peers who understand the unique demands of PE-backed companies.",
      "Topics:",
      "• Value creation through people",
      "• Rapid talent assessment",
      "• Operating partner relationships",
      "• Preparing for exit",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 75),
    ends_at: addHours(addDays(now, 75), 8),
    timezone: "America/New_York",
    location_type: "in_person",
    location_details: "The Ritz-Carlton, Boston",
    video_room_url: null,
    tier_required: "platinum",
    max_attendees: 50,
    is_published: true,
    spaceSlug: "private-equity-hr-leaders",
  },
  {
    title: "AI Ethics in HR: A Deep Dive",
    description:
      "Exploring the ethical implications of AI in people decisions.",
    content: null,
    cover_image_url: null,
    starts_at: addDays(now, 50),
    ends_at: addHours(addDays(now, 50), 3),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/ai-ethics",
    tier_required: "gold",
    max_attendees: 100,
    is_published: true,
    spaceSlug: "people-analytics-lab",
  },
  {
    title: "Executive Coach Speed Dating",
    description:
      "Meet vetted executive coaches in rapid-fire sessions to find your match.",
    content: createTipTapContent([
      "Looking for an executive coach? Meet 10 vetted coaches in one session.",
      "Each 'date' is 8 minutes. You'll rotate through coaches and compare notes.",
      "Coaches specialize in CEO transitions, new leaders, and executive presence.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 40),
    ends_at: addHours(addDays(now, 40), 2),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/coach-dating",
    tier_required: "platinum",
    max_attendees: 20,
    is_published: true,
    spaceSlug: null,
  },
  {
    title: "Total Rewards Benchmarking Forum",
    description:
      "Annual review and benchmarking of compensation and benefits data.",
    content: null,
    cover_image_url: null,
    starts_at: addDays(now, 90),
    ends_at: addHours(addDays(now, 90), 4),
    timezone: "America/New_York",
    location_type: "hybrid",
    location_details: "Mercer Offices, NYC + Virtual",
    video_room_url: "https://zoom.us/j/total-rewards",
    tier_required: "gold",
    max_attendees: 75,
    is_published: true,
    spaceSlug: "executive-compensation-forum",
  },
  {
    title: "Diamond Member Retreat",
    description:
      "Annual exclusive retreat for Diamond tier members.",
    content: createTipTapContent([
      "Our most exclusive annual gathering for Diamond members only.",
      "Three days of strategic discussions, relationship building, and rejuvenation.",
      "Spouses/partners welcome for evening events.",
      "All travel and accommodation provided.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 180),
    ends_at: addDays(now, 182),
    timezone: "America/Denver",
    location_type: "in_person",
    location_details: "Amangiri, Canyon Point, Utah",
    video_room_url: null,
    tier_required: "diamond",
    max_attendees: 30,
    is_published: true,
    spaceSlug: "diamond-council",
  },
  {
    title: "HR Leader Book Club: April Selection",
    description:
      "Monthly book discussion for HR leaders who love to read.",
    content: createTipTapContent([
      "This month we're reading 'Talent' by Tyler Cowen.",
      "Join us for a lively discussion on the art and science of talent identification.",
      "Come prepared with your key takeaways and questions.",
    ]),
    cover_image_url: null,
    starts_at: addDays(now, 55),
    ends_at: addHours(addDays(now, 55), 1),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/book-club",
    tier_required: "silver",
    max_attendees: null,
    is_published: true,
    spaceSlug: "leadership-lounge",
  },

  // UNPUBLISHED EVENT (for testing)
  {
    title: "Draft: Summer Conference Planning",
    description:
      "Internal planning session for summer conference.",
    content: null,
    cover_image_url: null,
    starts_at: addDays(now, 35),
    ends_at: addHours(addDays(now, 35), 2),
    timezone: "America/New_York",
    location_type: "virtual",
    location_details: null,
    video_room_url: "https://zoom.us/j/planning",
    tier_required: "diamond",
    max_attendees: 10,
    is_published: false, // Not published
    spaceSlug: null,
  },
];

/**
 * Get events by location type
 */
export function getEventsByLocationType(locationType: EventLocationType): SeedEvent[] {
  return seedEvents.filter((e) => e.location_type === locationType);
}

/**
 * Get upcoming published events
 */
export function getUpcomingEvents(): SeedEvent[] {
  return seedEvents.filter((e) => e.is_published && e.starts_at > now);
}

/**
 * Get past events
 */
export function getPastEvents(): SeedEvent[] {
  return seedEvents.filter((e) => e.starts_at < now);
}
