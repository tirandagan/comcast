// This is a static version of the report chapters for client-side use
export interface Chapter {
  id: string;
  title: string;
  slug: string;
  order: number;
  description: string;
  contentPreview?: string;
}

export const reportChapters: Chapter[] = [
  {
    id: 'chapter-0',
    title: 'Executive Summary',
    slug: 'executive-summary',
    order: 0,
    description: 'Strategic overview of how I will transform Comcast into a data-driven powerhouse, unlocking $2B+ in new revenue streams while reducing operational costs by 30% through AI-powered automation.',
  },
  {
    id: 'chapter-1',
    title: 'Data & AI at Comcast - Current State and Vision',
    slug: 'data-ai-current-state-vision',
    order: 1,
    description: 'An executive overview of Comcast\'s data assets, current AI initiatives, and the transformative vision for becoming a data-driven powerhouse generating $2B+ in new revenue streams.',
  },
  {
    id: 'chapter-2',
    title: 'Data & AI Maturity Assessment',
    slug: 'data-ai-maturity-assessment',
    order: 2,
    description: 'A comprehensive assessment of Comcast\'s current data and AI capabilities, competitive benchmarking, and strategic gap analysis to identify our path to AI leadership.',
  },
  {
    id: 'chapter-3',
    title: 'Strategic Data Platform Architecture',
    slug: 'strategic-data-platform-architecture',
    order: 3,
    description: 'The blueprint for Comcast Intelligence Platform (CIP) - a unified data fabric that integrates all data sources, enables AI at scale, and ensures privacy by design.',
  },
  {
    id: 'chapter-4',
    title: 'AI Innovation Portfolio & Roadmap',
    slug: 'ai-innovation-portfolio-roadmap',
    order: 4,
    description: 'High-impact AI use cases across customer experience, network operations, content & media, and enterprise solutions with $500M+ revenue potential.',
  },
  {
    id: 'chapter-5',
    title: 'Building the AI-First Organization',
    slug: 'building-ai-first-organization',
    order: 5,
    description: 'Leveraging my proven ISG model from Cognizant to build Comcast\'s AI Center of Excellence, transform culture, and develop 5,000 AI practitioners.',
  },
  {
    id: 'chapter-6',
    title: 'Implementation Strategy & Quick Wins',
    slug: 'implementation-strategy-quick-wins',
    order: 6,
    description: '100-day sprint plan with immediate $50M impact, year-one roadmap targeting $600M value, and long-term vision for $2B+ annual revenue generation.',
  },
];