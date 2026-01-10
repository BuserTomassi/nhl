/**
 * Resources Seed Data
 *
 * Creates content library resources across all types (document, video, link, template)
 * with varied tier requirements.
 */

import type { MembershipTier, ResourceType } from "../../src/lib/supabase/types";

export interface SeedResource {
  title: string;
  description: string;
  type: ResourceType;
  file_url: string | null;
  external_url: string | null;
  tier_required: MembershipTier;
  spaceSlug: string | null; // Optional link to a space
  cohortSlug: string | null; // Optional link to a cohort
}

// ============================================================================
// RESOURCES (30+ entries)
// ============================================================================

export const seedResources: SeedResource[] = [
  // ============================================================================
  // DOCUMENTS (10 entries) - Whitepapers, Guides, Reports
  // ============================================================================
  {
    title: "2024 Executive Compensation Trends Report",
    description:
      "Comprehensive analysis of C-suite compensation trends based on data from 1,200+ companies. Includes base salary, bonus, equity, and total compensation benchmarks.",
    type: "document",
    file_url: "https://example.com/resources/exec-comp-report-2024.pdf",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "executive-compensation-forum",
    cohortSlug: null,
  },
  {
    title: "The CHRO Playbook: First 100 Days",
    description:
      "Strategic guide for newly appointed CHROs. Covers stakeholder mapping, quick wins, team assessment, and building your agenda.",
    type: "document",
    file_url: "https://example.com/resources/chro-100-days.pdf",
    external_url: null,
    tier_required: "platinum",
    spaceSlug: "chro-peer-circle",
    cohortSlug: null,
  },
  {
    title: "AI in HR: A Practical Implementation Guide",
    description:
      "Step-by-step guide for implementing AI tools in HR functions. Covers vendor selection, change management, and ROI measurement.",
    type: "document",
    file_url: "https://example.com/resources/ai-hr-guide.pdf",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "hr-tech-talk",
    cohortSlug: null,
  },
  {
    title: "People Analytics Maturity Model",
    description:
      "Framework for assessing and advancing your organization's people analytics capabilities. Includes self-assessment tools and roadmap templates.",
    type: "document",
    file_url: "https://example.com/resources/pa-maturity-model.pdf",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "people-analytics-lab",
    cohortSlug: null,
  },
  {
    title: "Succession Planning Best Practices",
    description:
      "Research-backed guide to building robust succession pipelines. Includes case studies from Fortune 500 companies.",
    type: "document",
    file_url: "https://example.com/resources/succession-best-practices.pdf",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "succession-planning-circle",
    cohortSlug: null,
  },
  {
    title: "M&A People Integration Playbook",
    description:
      "Comprehensive playbook for the human side of mergers and acquisitions. From due diligence to Day 1 to first 100 days.",
    type: "document",
    file_url: "https://example.com/resources/ma-integration-playbook.pdf",
    external_url: null,
    tier_required: "platinum",
    spaceSlug: "ma-people-integration",
    cohortSlug: null,
  },
  {
    title: "Remote Work Policy Framework",
    description:
      "Template and guidance for creating effective remote and hybrid work policies. Includes legal considerations and communication templates.",
    type: "document",
    file_url: "https://example.com/resources/remote-work-framework.pdf",
    external_url: null,
    tier_required: "silver",
    spaceSlug: "remote-hybrid-work",
    cohortSlug: null,
  },
  {
    title: "DEI Metrics That Matter",
    description:
      "Guide to measuring diversity, equity, and inclusion impact. Moves beyond representation to measure belonging and inclusion.",
    type: "document",
    file_url: "https://example.com/resources/dei-metrics.pdf",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "dei-leaders-roundtable",
    cohortSlug: null,
  },
  {
    title: "Board Governance Primer for HR Leaders",
    description:
      "Introduction to corporate governance for HR executives aspiring to board roles. Covers fiduciary duties, committee structures, and preparation.",
    type: "document",
    file_url: "https://example.com/resources/board-governance-primer.pdf",
    external_url: null,
    tier_required: "platinum",
    spaceSlug: "board-readiness-forum",
    cohortSlug: null,
  },
  {
    title: "Employee Experience Journey Mapping Guide",
    description:
      "How to map and optimize the employee journey from candidate to alumni. Includes templates and workshop facilitation guide.",
    type: "document",
    file_url: "https://example.com/resources/ex-journey-mapping.pdf",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "employee-experience-design",
    cohortSlug: null,
  },

  // ============================================================================
  // TEMPLATES (8 entries) - Practical tools and templates
  // ============================================================================
  {
    title: "Executive Interview Scorecard Template",
    description:
      "Structured interview evaluation template for C-suite and VP-level candidates. Covers leadership competencies, cultural fit, and risk assessment.",
    type: "template",
    file_url: "https://example.com/resources/exec-interview-scorecard.xlsx",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "talent-acquisition-network",
    cohortSlug: null,
  },
  {
    title: "CHRO Board Presentation Template",
    description:
      "PowerPoint template for presenting human capital updates to the board of directors. Includes recommended metrics and visualizations.",
    type: "template",
    file_url: "https://example.com/resources/chro-board-deck.pptx",
    external_url: null,
    tier_required: "platinum",
    spaceSlug: "chro-peer-circle",
    cohortSlug: null,
  },
  {
    title: "Job Description Template Library",
    description:
      "50+ professionally written job description templates for common HR and executive roles. Editable in Word format.",
    type: "template",
    file_url: "https://example.com/resources/jd-template-library.zip",
    external_url: null,
    tier_required: "silver",
    spaceSlug: "talent-acquisition-network",
    cohortSlug: null,
  },
  {
    title: "Succession Planning 9-Box Template",
    description:
      "Excel template for talent calibration sessions. Includes 9-box grid, succession depth charts, and development planning.",
    type: "template",
    file_url: "https://example.com/resources/succession-9box.xlsx",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "succession-planning-circle",
    cohortSlug: null,
  },
  {
    title: "Performance Review Conversation Guide",
    description:
      "Manager toolkit for conducting effective performance conversations. Includes scripts, coaching questions, and documentation templates.",
    type: "template",
    file_url: "https://example.com/resources/perf-review-guide.pdf",
    external_url: null,
    tier_required: "silver",
    spaceSlug: "learning-development-hub",
    cohortSlug: null,
  },
  {
    title: "Compensation Philosophy Template",
    description:
      "Framework and template for documenting your organization's compensation philosophy. Includes market positioning, pay equity, and governance.",
    type: "template",
    file_url: "https://example.com/resources/comp-philosophy-template.docx",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "executive-compensation-forum",
    cohortSlug: null,
  },
  {
    title: "HR Technology RFP Template",
    description:
      "Comprehensive RFP template for evaluating HR technology vendors. Covers HRIS, ATS, LMS, and performance management systems.",
    type: "template",
    file_url: "https://example.com/resources/hr-tech-rfp.docx",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "hr-tech-talk",
    cohortSlug: null,
  },
  {
    title: "New Hire Onboarding Checklist",
    description:
      "Comprehensive 90-day onboarding checklist for new hires. Customizable by role level and function.",
    type: "template",
    file_url: "https://example.com/resources/onboarding-checklist.xlsx",
    external_url: null,
    tier_required: "silver",
    spaceSlug: "employee-experience-design",
    cohortSlug: null,
  },

  // ============================================================================
  // VIDEOS (7 entries) - Recorded sessions and tutorials
  // ============================================================================
  {
    title: "2024 HR Leadership Summit: Opening Keynote",
    description:
      "Recording of the opening keynote from our annual summit. 'Leading Through Uncertainty' by Dr. Sarah Chen, CEO of Apex Industries.",
    type: "video",
    file_url: null,
    external_url: "https://vimeo.com/example/summit-keynote-2024",
    tier_required: "gold",
    spaceSlug: null,
    cohortSlug: null,
  },
  {
    title: "Masterclass: Negotiating Executive Offers",
    description:
      "Expert session on negotiating compensation packages for executive hires. Covers equity, severance, and change-in-control provisions.",
    type: "video",
    file_url: null,
    external_url: "https://vimeo.com/example/exec-negotiation",
    tier_required: "platinum",
    spaceSlug: "executive-compensation-forum",
    cohortSlug: null,
  },
  {
    title: "People Analytics 101: Getting Started",
    description:
      "Introduction to people analytics for HR professionals. Covers data sources, basic metrics, and building a business case.",
    type: "video",
    file_url: null,
    external_url: "https://vimeo.com/example/pa-101",
    tier_required: "silver",
    spaceSlug: "people-analytics-lab",
    cohortSlug: null,
  },
  {
    title: "CHRO Panel: AI Transformation in HR",
    description:
      "Panel discussion with CHROs from Microsoft, Unilever, and IBM on their AI transformation journeys.",
    type: "video",
    file_url: null,
    external_url: "https://vimeo.com/example/chro-ai-panel",
    tier_required: "gold",
    spaceSlug: "hr-tech-talk",
    cohortSlug: null,
  },
  {
    title: "Building Your Board Brand",
    description:
      "Practical session on positioning yourself for board roles. Covers networking, bio optimization, and the search process.",
    type: "video",
    file_url: null,
    external_url: "https://vimeo.com/example/board-brand",
    tier_required: "platinum",
    spaceSlug: "board-readiness-forum",
    cohortSlug: null,
  },
  {
    title: "Change Management in M&A: A Case Study",
    description:
      "In-depth case study of a successful merger integration. Covers communication strategy, cultural alignment, and retention.",
    type: "video",
    file_url: null,
    external_url: "https://vimeo.com/example/ma-case-study",
    tier_required: "gold",
    spaceSlug: "ma-people-integration",
    cohortSlug: null,
  },
  {
    title: "Inclusive Leadership Workshop Recording",
    description:
      "Recording of our popular inclusive leadership workshop. Practical exercises for building psychological safety.",
    type: "video",
    file_url: null,
    external_url: "https://vimeo.com/example/inclusive-leadership",
    tier_required: "silver",
    spaceSlug: "dei-leaders-roundtable",
    cohortSlug: null,
  },

  // ============================================================================
  // LINKS (5 entries) - External resources and tools
  // ============================================================================
  {
    title: "Harvard Business Review: HR Collection",
    description:
      "Curated collection of HBR articles on human resources, leadership, and organizational design. Updated monthly.",
    type: "link",
    file_url: null,
    external_url: "https://hbr.org/topic/subject/human-resource-management",
    tier_required: "silver",
    spaceSlug: "industry-news-trends",
    cohortSlug: null,
  },
  {
    title: "SHRM Competency Model Interactive Tool",
    description:
      "Interactive tool from SHRM for assessing and developing HR competencies. Free for NHL members.",
    type: "link",
    file_url: null,
    external_url: "https://www.shrm.org/credentials/certification/body-of-competency-knowledge",
    tier_required: "silver",
    spaceSlug: "learning-development-hub",
    cohortSlug: null,
  },
  {
    title: "SEC Human Capital Disclosure Database",
    description:
      "Searchable database of human capital disclosures from public company 10-K filings. Great for benchmarking.",
    type: "link",
    file_url: null,
    external_url: "https://example.com/sec-hc-database",
    tier_required: "gold",
    spaceSlug: "people-analytics-lab",
    cohortSlug: null,
  },
  {
    title: "Josh Bersin Academy",
    description:
      "Professional development platform for HR leaders. NHL members receive 20% discount on annual membership.",
    type: "link",
    file_url: null,
    external_url: "https://bersinacademy.com",
    tier_required: "silver",
    spaceSlug: null,
    cohortSlug: null,
  },
  {
    title: "Compensation Survey Aggregator",
    description:
      "Tool for comparing compensation data across multiple surveys (Radford, Mercer, WTW). Premium access for NHL members.",
    type: "link",
    file_url: null,
    external_url: "https://example.com/comp-survey-tool",
    tier_required: "gold",
    spaceSlug: "executive-compensation-forum",
    cohortSlug: null,
  },

  // ============================================================================
  // ADDITIONAL RESOURCES (to reach 30+)
  // ============================================================================
  {
    title: "Workforce Planning Scenario Tool",
    description:
      "Excel-based tool for modeling workforce scenarios. Includes headcount planning, skills gaps, and cost modeling.",
    type: "template",
    file_url: "https://example.com/resources/workforce-planning-tool.xlsx",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "workforce-of-the-future",
    cohortSlug: null,
  },
  {
    title: "Employee Engagement Survey Question Bank",
    description:
      "Library of validated survey questions for measuring engagement, satisfaction, and culture. Organized by theme.",
    type: "document",
    file_url: "https://example.com/resources/engagement-question-bank.pdf",
    external_url: null,
    tier_required: "silver",
    spaceSlug: "employee-experience-design",
    cohortSlug: null,
  },
  {
    title: "PE Value Creation: HR Levers",
    description:
      "Framework for identifying and executing on HR value creation opportunities in private equity portfolio companies.",
    type: "document",
    file_url: "https://example.com/resources/pe-hr-value-creation.pdf",
    external_url: null,
    tier_required: "platinum",
    spaceSlug: "private-equity-hr-leaders",
    cohortSlug: null,
  },
  {
    title: "2024 Skills Transformation Report",
    description:
      "Research report on the most critical skills for the next decade. Based on analysis of 50M job postings and 10,000 executive interviews.",
    type: "document",
    file_url: "https://example.com/resources/skills-transformation-2024.pdf",
    external_url: null,
    tier_required: "gold",
    spaceSlug: "workforce-of-the-future",
    cohortSlug: null,
  },
  {
    title: "CEO-CHRO Relationship Assessment",
    description:
      "Self-assessment tool for CHROs to evaluate and strengthen their partnership with the CEO.",
    type: "template",
    file_url: "https://example.com/resources/ceo-chro-assessment.pdf",
    external_url: null,
    tier_required: "platinum",
    spaceSlug: "ceo-chro-partnership",
    cohortSlug: null,
  },
  {
    title: "Hybrid Meeting Best Practices Guide",
    description:
      "Practical guide for running effective meetings with both in-person and remote participants.",
    type: "document",
    file_url: "https://example.com/resources/hybrid-meeting-guide.pdf",
    external_url: null,
    tier_required: "silver",
    spaceSlug: "remote-hybrid-work",
    cohortSlug: null,
  },
];

/**
 * Get resources by type
 */
export function getResourcesByType(type: ResourceType): SeedResource[] {
  return seedResources.filter((r) => r.type === type);
}

/**
 * Get resources by tier
 */
export function getResourcesByTier(tier: MembershipTier): SeedResource[] {
  return seedResources.filter((r) => r.tier_required === tier);
}

/**
 * Get resources for a specific space
 */
export function getResourcesForSpace(spaceSlug: string): SeedResource[] {
  return seedResources.filter((r) => r.spaceSlug === spaceSlug);
}
