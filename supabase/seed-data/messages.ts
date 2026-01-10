/**
 * Messages Seed Data
 *
 * Creates realistic conversations between seed users
 * covering professional HR/executive topics.
 */

import { subDays, subHours, subMinutes } from "date-fns";

export interface SeedConversation {
  participantEmails: [string, string]; // Two participants
  messages: SeedMessage[];
}

export interface SeedMessage {
  senderIndex: 0 | 1; // Which participant sent this (0 or 1)
  content_text: string;
  minutesAgo: number; // How many minutes ago was this sent
}

/**
 * Create TipTap JSON content from plain text
 */
function textToTipTap(text: string): object {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text }],
      },
    ],
  };
}

// Reference date for message timestamps
const now = new Date();

export const seedConversations: SeedConversation[] = [
  // ============================================================================
  // CHRO to CHRO - Peer networking
  // ============================================================================
  {
    participantEmails: ["platinum1@example.com", "platinum2@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Hi Marcus! I saw your post about the AI implementation at Innovate Corp. Really impressive results. Would love to pick your brain sometime.",
        minutesAgo: 2880, // 2 days ago
      },
      {
        senderIndex: 1,
        content_text: "Amanda! Great to hear from you. Happy to chat - it's been quite a journey. What aspects are you most curious about?",
        minutesAgo: 2820,
      },
      {
        senderIndex: 0,
        content_text: "Mainly how you handled the change management piece. Our employees are nervous about AI replacing jobs, and I'm trying to get the messaging right.",
        minutesAgo: 2760,
      },
      {
        senderIndex: 1,
        content_text: "That was our biggest challenge too. We ended up framing it as 'AI as your co-pilot' rather than replacement. Also created an internal AI academy so everyone could upskill. The key was transparency about which roles would change vs. be eliminated.",
        minutesAgo: 2700,
      },
      {
        senderIndex: 0,
        content_text: "The academy idea is brilliant. Did you build it in-house or partner with someone?",
        minutesAgo: 2640,
      },
      {
        senderIndex: 1,
        content_text: "Partnership with Coursera for Business plus some custom modules we built with our AI team. I can share our curriculum outline if helpful.",
        minutesAgo: 2580,
      },
      {
        senderIndex: 0,
        content_text: "That would be amazing! Thank you so much. Coffee next week?",
        minutesAgo: 2520,
      },
      {
        senderIndex: 1,
        content_text: "Absolutely! How's Thursday at 10am? There's a great spot near Union Square.",
        minutesAgo: 1440, // 1 day ago
      },
      {
        senderIndex: 0,
        content_text: "Perfect. See you then! ☕",
        minutesAgo: 1380,
      },
    ],
  },

  // ============================================================================
  // Diamond CEO to Platinum CHRO - Executive alignment
  // ============================================================================
  {
    participantEmails: ["diamond1@example.com", "platinum3@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Katherine, I've been thinking about what you said at the roundtable about M&A integration challenges. We're looking at a potential acquisition and I'd value your perspective.",
        minutesAgo: 4320, // 3 days ago
      },
      {
        senderIndex: 1,
        content_text: "Victoria, happy to help. What industry is the target company in?",
        minutesAgo: 4260,
      },
      {
        senderIndex: 0,
        content_text: "Biotech, about 800 employees. Very different culture from ours - more startup-y. I'm worried about talent retention post-close.",
        minutesAgo: 4200,
      },
      {
        senderIndex: 1,
        content_text: "That's a classic challenge. A few things that have worked for me: 1) Identify your top 50 critical talent in diligence, 2) Have retention packages ready for Day 1, 3) Don't rush culture integration - let the best of both emerge.",
        minutesAgo: 4140,
      },
      {
        senderIndex: 0,
        content_text: "The Day 1 retention packages - what structure have you seen work best? Cash vs equity vs both?",
        minutesAgo: 4080,
      },
      {
        senderIndex: 1,
        content_text: "For biotech talent, equity tends to resonate more - they're used to upside potential. I'd recommend 2-year vesting with a cliff at 12 months. Cash bonuses for immediate needs. Want me to send you a template we've used?",
        minutesAgo: 4020,
      },
      {
        senderIndex: 0,
        content_text: "That would be incredibly helpful. Thank you for being so generous with your time.",
        minutesAgo: 3960,
      },
      {
        senderIndex: 1,
        content_text: "Of course! That's what this community is for. I'll send it over this afternoon.",
        minutesAgo: 3900,
      },
    ],
  },

  // ============================================================================
  // Gold VP to Partner - Vendor discussion
  // ============================================================================
  {
    participantEmails: ["gold1@example.com", "partner3@eightfold.example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Hi Priya, I attended your demo at the HR Tech conference. Eightfold looks promising for our talent matching challenges. Can we schedule a deeper dive?",
        minutesAgo: 10080, // 7 days ago
      },
      {
        senderIndex: 1,
        content_text: "Hi Jennifer! Great to connect. I'd love to learn more about your specific use cases. Are you primarily focused on external recruiting or internal mobility?",
        minutesAgo: 9960,
      },
      {
        senderIndex: 0,
        content_text: "Both actually, but internal mobility is the bigger pain point right now. We have 15,000 employees and no good way to surface internal candidates for open roles.",
        minutesAgo: 9840,
      },
      {
        senderIndex: 1,
        content_text: "That's exactly where our platform shines. We've helped companies like yours reduce external hiring costs by 30% by better matching internal talent. Would next Tuesday work for a call?",
        minutesAgo: 9720,
      },
      {
        senderIndex: 0,
        content_text: "Tuesday works. Can you also send over some case studies? My CFO will want to see ROI data before we proceed.",
        minutesAgo: 9600,
      },
      {
        senderIndex: 1,
        content_text: "Absolutely! I'll send our financial services and tech industry case studies - they should be most relevant to CloudScale. Talk Tuesday!",
        minutesAgo: 9480,
      },
    ],
  },

  // ============================================================================
  // Silver member to Gold mentor - Career advice
  // ============================================================================
  {
    participantEmails: ["silver1@example.com", "gold3@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Hi Michelle, I saw you're speaking at the upcoming L&D summit. I'm an HR Manager at a startup trying to build out our OD function. Would you have time for a mentoring chat?",
        minutesAgo: 7200, // 5 days ago
      },
      {
        senderIndex: 1,
        content_text: "Hi Emily! Always happy to help someone earlier in their career. What specific challenges are you facing?",
        minutesAgo: 7080,
      },
      {
        senderIndex: 0,
        content_text: "Honestly, I'm not sure where to start. Leadership wants an 'OD strategy' but we're only 200 people. Is it too early to formalize this?",
        minutesAgo: 6960,
      },
      {
        senderIndex: 1,
        content_text: "Great question! It's never too early to be intentional about culture and development. At 200 people, I'd focus on: 1) Manager effectiveness training, 2) Clear career pathways, 3) Simple engagement pulse surveys. Don't overcomplicate it.",
        minutesAgo: 6840,
      },
      {
        senderIndex: 0,
        content_text: "That's so helpful. The manager training piece is definitely a gap - we promoted a lot of ICs who've never managed before.",
        minutesAgo: 6720,
      },
      {
        senderIndex: 1,
        content_text: "Classic startup challenge! I have a 'new manager bootcamp' curriculum I developed. Happy to share - just promise to pay it forward someday. 😊",
        minutesAgo: 6600,
      },
      {
        senderIndex: 0,
        content_text: "Wow, thank you! I absolutely will. This community is amazing.",
        minutesAgo: 6480,
      },
      {
        senderIndex: 1,
        content_text: "That's the spirit! Let's set up a 30-min call to walk through it. How's Friday afternoon?",
        minutesAgo: 6360,
      },
      {
        senderIndex: 0,
        content_text: "Friday 2pm works perfectly. Thank you so much, Michelle!",
        minutesAgo: 6240,
      },
    ],
  },

  // ============================================================================
  // Platinum to Platinum - Succession planning discussion
  // ============================================================================
  {
    participantEmails: ["platinum4@example.com", "platinum5@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Rachel, quick question - how are you handling succession planning for highly specialized technical roles? Our quantum computing experts are nearly impossible to replace.",
        minutesAgo: 1440, // 1 day ago
      },
      {
        senderIndex: 1,
        content_text: "David! This is literally keeping me up at night. We've started a 'knowledge transfer' program where each critical expert has to document and train backups. But honestly, some roles are just not replaceable.",
        minutesAgo: 1380,
      },
      {
        senderIndex: 0,
        content_text: "Same here. We're also experimenting with 'technical fellow' emeritus roles - keeping retired experts on retainer as advisors. Expensive but worth it.",
        minutesAgo: 1320,
      },
      {
        senderIndex: 1,
        content_text: "Oh that's clever! What's the typical arrangement - hours per month? Compensation structure?",
        minutesAgo: 1260,
      },
      {
        senderIndex: 0,
        content_text: "Usually 10-20 hours/month, paid as a consultant at about 75% of their previous hourly rate. They love it - intellectual engagement without the full-time grind.",
        minutesAgo: 1200,
      },
      {
        senderIndex: 1,
        content_text: "I'm definitely bringing this to our next exec meeting. Thanks for sharing!",
        minutesAgo: 1140,
      },
    ],
  },

  // ============================================================================
  // Admin to Diamond - Platform feedback
  // ============================================================================
  {
    participantEmails: ["admin@nexthorizonleadership.com", "diamond2@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Richard, thank you for your feedback about the Diamond member experience. We're planning some enhancements and would love your input.",
        minutesAgo: 5760, // 4 days ago
      },
      {
        senderIndex: 1,
        content_text: "Happy to help, Sarah. What are you considering?",
        minutesAgo: 5700,
      },
      {
        senderIndex: 0,
        content_text: "A few things: 1) More intimate Diamond-only dinners in major cities, 2) Direct access to our executive search partners, 3) A private concierge for member requests. Which would be most valuable?",
        minutesAgo: 5640,
      },
      {
        senderIndex: 1,
        content_text: "Honestly, all three sound excellent. If I had to prioritize, the intimate dinners create the most value - the peer connections at that level are irreplaceable. The concierge is a nice-to-have.",
        minutesAgo: 5580,
      },
      {
        senderIndex: 0,
        content_text: "That's consistent with what we're hearing. We're looking at quarterly dinners in NYC, SF, Chicago, and London to start. Would you attend?",
        minutesAgo: 5520,
      },
      {
        senderIndex: 1,
        content_text: "Absolutely. Put me down for all the NYC ones. And if you need help hosting or facilitating, I'm happy to volunteer.",
        minutesAgo: 5460,
      },
      {
        senderIndex: 0,
        content_text: "That's incredibly generous, Richard. I'll follow up with details. Thank you for being such an engaged member!",
        minutesAgo: 5400,
      },
    ],
  },

  // ============================================================================
  // Gold to Gold - Compensation benchmarking
  // ============================================================================
  {
    participantEmails: ["gold6@example.com", "gold4@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Hey Robert, are you going to the Total Rewards Forum next month? I'd love to compare notes on exec comp trends.",
        minutesAgo: 2160, // 1.5 days ago
      },
      {
        senderIndex: 1,
        content_text: "Andrew! Yes, I'll be there. What specific areas are you focused on?",
        minutesAgo: 2100,
      },
      {
        senderIndex: 0,
        content_text: "Mainly how to handle equity refresh grants in this market. Our execs are underwater and retention is becoming an issue.",
        minutesAgo: 2040,
      },
      {
        senderIndex: 1,
        content_text: "We're dealing with the same thing. Our comp committee just approved a one-time retention grant program. Took some convincing on the dilution front.",
        minutesAgo: 1980,
      },
      {
        senderIndex: 0,
        content_text: "How did you frame the dilution argument to the board?",
        minutesAgo: 1920,
      },
      {
        senderIndex: 1,
        content_text: "Compared cost of attrition (search fees, ramp time, lost productivity) vs. the dilution. When you put real numbers to losing your top 10 execs, the math is obvious.",
        minutesAgo: 1860,
      },
      {
        senderIndex: 0,
        content_text: "That's a great approach. Mind if I grab coffee at the forum to dig deeper?",
        minutesAgo: 1800,
      },
      {
        senderIndex: 1,
        content_text: "Absolutely! Let's plan on it.",
        minutesAgo: 1740,
      },
    ],
  },

  // ============================================================================
  // Platinum CHRO to Diamond CEO - Strategic discussion
  // ============================================================================
  {
    participantEmails: ["platinum6@example.com", "diamond3@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Elena, I really enjoyed your keynote on global health equity. The talent challenges you described in emerging markets resonated with our APAC expansion struggles.",
        minutesAgo: 8640, // 6 days ago
      },
      {
        senderIndex: 1,
        content_text: "Thomas, thank you! APAC is fascinating - we've learned so much about localized talent strategies. Where are you expanding?",
        minutesAgo: 8520,
      },
      {
        senderIndex: 0,
        content_text: "Singapore hub first, then looking at Vietnam and Indonesia for tech talent. The comp expectations are all over the map.",
        minutesAgo: 8400,
      },
      {
        senderIndex: 1,
        content_text: "Singapore is straightforward - very Westernized comp practices. Vietnam is where it gets interesting. We've had success with strong benefits packages (family healthcare is huge) over base salary.",
        minutesAgo: 8280,
      },
      {
        senderIndex: 0,
        content_text: "That's a great insight. What about retention in those markets? We've heard job-hopping is common.",
        minutesAgo: 8160,
      },
      {
        senderIndex: 1,
        content_text: "It is, but for different reasons than the West. Career progression expectations are faster - they want promotions every 18 months. If you can deliver that, retention improves dramatically.",
        minutesAgo: 8040,
      },
      {
        senderIndex: 0,
        content_text: "18 months! Our typical cycle is 3 years. Need to rethink our career architecture for APAC.",
        minutesAgo: 7920,
      },
      {
        senderIndex: 1,
        content_text: "Exactly. One size doesn't fit all. Happy to intro you to our APAC HR lead who navigated all this. She's brilliant.",
        minutesAgo: 7800,
      },
      {
        senderIndex: 0,
        content_text: "That would be amazing. Thank you, Elena!",
        minutesAgo: 7680,
      },
    ],
  },

  // ============================================================================
  // Silver to Silver - Peer support
  // ============================================================================
  {
    participantEmails: ["silver2@example.com", "silver3@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Nicole, just saw your question in the HR Tech space. We use BambooHR for our 150-person company and it's been solid. Happy to chat.",
        minutesAgo: 720, // 12 hours ago
      },
      {
        senderIndex: 1,
        content_text: "Jason, thanks for reaching out! We're evaluating BambooHR vs Rippling. What made you choose BambooHR?",
        minutesAgo: 660,
      },
      {
        senderIndex: 0,
        content_text: "Honestly, simplicity. Rippling has more features but we didn't need the IT management stuff. BambooHR just does HR well. Also cheaper.",
        minutesAgo: 600,
      },
      {
        senderIndex: 1,
        content_text: "That's helpful. Any major gaps you've found?",
        minutesAgo: 540,
      },
      {
        senderIndex: 0,
        content_text: "Reporting could be better. We end up exporting to Excel for anything complex. And the ATS module is pretty basic - we use Lever separately for recruiting.",
        minutesAgo: 480,
      },
      {
        senderIndex: 1,
        content_text: "Good to know. We're small enough that the basic ATS might work. Thanks for the honest review!",
        minutesAgo: 420,
      },
      {
        senderIndex: 0,
        content_text: "Anytime! Feel free to reach out if you have more questions during your eval.",
        minutesAgo: 360,
      },
    ],
  },

  // ============================================================================
  // Diamond to Partner - Executive search
  // ============================================================================
  {
    participantEmails: ["diamond4@example.com", "partner1@spencerstuart.example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Patricia, we need to discuss a confidential CHRO search. Are you available this week?",
        minutesAgo: 4320, // 3 days ago
      },
      {
        senderIndex: 1,
        content_text: "James, of course. I can make time tomorrow or Thursday. What's the situation?",
        minutesAgo: 4260,
      },
      {
        senderIndex: 0,
        content_text: "Our current CHRO is retiring in 6 months. Board wants an external search to ensure we see the full market. Very confidential - only the board knows.",
        minutesAgo: 4200,
      },
      {
        senderIndex: 1,
        content_text: "Understood. We have deep experience in financial services CHRO placements. Thursday 10am? I'll bring our sector lead.",
        minutesAgo: 4140,
      },
      {
        senderIndex: 0,
        content_text: "Perfect. My office, not HQ - let's keep this discreet.",
        minutesAgo: 4080,
      },
      {
        senderIndex: 1,
        content_text: "Absolutely. We'll come to you. See you Thursday.",
        minutesAgo: 4020,
      },
    ],
  },

  // ============================================================================
  // Gold to Platinum - Event follow-up
  // ============================================================================
  {
    participantEmails: ["gold2@example.com", "platinum1@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Dr. Sterling, your session on predictive attrition models was exactly what I needed. I'm trying to build something similar at DataDriven. Any recommended resources?",
        minutesAgo: 180, // 3 hours ago
      },
      {
        senderIndex: 1,
        content_text: "Christopher! Glad it was useful. For getting started, I'd recommend starting with the basics - tenure, compensation ratio, manager change frequency. Don't overthink the features initially.",
        minutesAgo: 150,
      },
      {
        senderIndex: 0,
        content_text: "That's reassuring. I've been trying to include too many variables. What accuracy rate should I aim for before sharing with leadership?",
        minutesAgo: 120,
      },
      {
        senderIndex: 1,
        content_text: "Honestly, anything above 70% is useful. More important than accuracy is interpretability - can you explain WHY someone is flagged? Leaders need to trust the model.",
        minutesAgo: 90,
      },
      {
        senderIndex: 0,
        content_text: "Great point. SHAP values for explainability?",
        minutesAgo: 60,
      },
      {
        senderIndex: 1,
        content_text: "Exactly! You clearly know your stuff. Feel free to reach out as you build this - happy to be a sounding board.",
        minutesAgo: 30,
      },
      {
        senderIndex: 0,
        content_text: "Thank you so much! Will definitely take you up on that.",
        minutesAgo: 15,
      },
    ],
  },

  // ============================================================================
  // Admin to new member - Onboarding welcome
  // ============================================================================
  {
    participantEmails: ["ops@nexthorizonleadership.com", "silver5@example.com"],
    messages: [
      {
        senderIndex: 0,
        content_text: "Welcome to Next Horizon Leadership, Ashley! I'm Michael from the community team. Let me know if you have any questions getting started.",
        minutesAgo: 1440, // 1 day ago
      },
      {
        senderIndex: 1,
        content_text: "Thanks Michael! I'm excited to be here. Just figuring out how to navigate everything.",
        minutesAgo: 1380,
      },
      {
        senderIndex: 0,
        content_text: "A few tips: Check out the Spaces section for topic-specific discussions. The Events page has great upcoming webinars. And the Member Directory is a goldmine for networking.",
        minutesAgo: 1320,
      },
      {
        senderIndex: 1,
        content_text: "Perfect, I'll explore those. Is there a way to connect with other HRBPs specifically?",
        minutesAgo: 1260,
      },
      {
        senderIndex: 0,
        content_text: "Absolutely! Check out the 'Leadership Lounge' space - lots of HRBPs there. You can also filter the Member Directory by title.",
        minutesAgo: 1200,
      },
      {
        senderIndex: 1,
        content_text: "Amazing, thanks for the warm welcome!",
        minutesAgo: 1140,
      },
    ],
  },
];

/**
 * Get all unique participant emails from conversations
 */
export function getAllParticipantEmails(): string[] {
  const emails = new Set<string>();
  for (const conv of seedConversations) {
    conv.participantEmails.forEach((email) => emails.add(email));
  }
  return Array.from(emails);
}

/**
 * Convert message content to TipTap format
 */
export function getMessageContent(text: string): object {
  return textToTipTap(text);
}

/**
 * Calculate message timestamp from minutesAgo
 */
export function getMessageTimestamp(minutesAgo: number): Date {
  return subMinutes(now, minutesAgo);
}
