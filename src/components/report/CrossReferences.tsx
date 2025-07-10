'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, BookOpen, ExternalLink } from 'lucide-react';
import { chapterSummaries } from '@/lib/chapter-summaries';

interface CrossReference {
  type: 'chapter' | 'appendix';
  slug: string;
  title: string;
  description?: string;
}

interface CrossReferenceProps {
  references: CrossReference[];
  title?: string;
}

export function CrossReferenceLinks({ references, title = "Related Content" }: CrossReferenceProps) {
  return (
    <div className="my-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-400" />
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {references.map((ref, index) => (
          <Link key={index} href={`/report/${ref.slug}`}>
            <motion.div
              className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 rounded-lg bg-blue-600/20">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400 uppercase">
                    {ref.type === 'appendix' ? 'Appendix' : 'Chapter'}
                  </span>
                </div>
                <h4 className="font-medium text-white mt-1">{ref.title}</h4>
                {(chapterSummaries[ref.slug] || ref.description) && (
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {chapterSummaries[ref.slug] ? 
                      chapterSummaries[ref.slug].split('and we recommend')[0].trim() + '...' : 
                      ref.description}
                  </p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 mt-1" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Predefined cross-references for each chapter
export const chapterCrossReferences: Record<string, CrossReference[]> = {
  'executive-summary': [
    {
      type: 'chapter',
      slug: 'the-isg-model-applied-to-sutherland',
      title: 'Chapter 5: The ISG Model Applied to Sutherland',
      description: 'Detailed framework for building the innovation function'
    },
    {
      type: 'chapter',
      slug: 'ai-rapid-prototyping-framework',
      title: 'Chapter 6: AI Rapid Prototyping Framework',
      description: 'Technical approach to accelerate development'
    },
    {
      type: 'chapter',
      slug: 'strategic-implementation-roadmap',
      title: 'Chapter 7: Strategic Implementation Roadmap',
      description: 'Step-by-step execution plan'
    },
    {
      type: 'appendix',
      slug: '30-day-action-plan',
      title: '30-Day Action Plan',
      description: 'Immediate executable roadmap with daily tasks'
    },
    {
      type: 'chapter',
      slug: 'the-role-and-impact',
      title: 'Chapter 9: The Role and Impact',
      description: 'Organizational structure and authority model'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Appendix A: Financial Projections',
      description: 'Detailed 3-year revenue and cost models'
    }
  ],
  'company-overview-and-current-landscape': [
    {
      type: 'chapter',
      slug: 'industry-vertical-deep-dive',
      title: 'Chapter 4: Industry Verticals',
      description: 'Deep dive into healthcare, CMT, and other verticals'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Organizational Charts',
      description: 'Detailed org structure for innovation teams'
    }
  ],
  'swot-analysis-for-innovation': [
    {
      type: 'chapter',
      slug: 'competitive-landscape-ai-innovation-gaps',
      title: 'Chapter 3: Competitive Landscape',
      description: 'Analysis of competitor capabilities and gaps'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Competitive Intelligence Deep Dive',
      description: 'Detailed competitor analysis and benchmarking'
    }
  ],
  'competitive-landscape-ai-innovation-gaps': [
    {
      type: 'chapter',
      slug: 'partnership-ecosystem-strategy',
      title: 'Chapter 8: Partnership Strategy',
      description: 'Building strategic alliances for innovation'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Partner Agreement Templates',
      description: 'Ready-to-use partnership frameworks'
    }
  ],
  'industry-vertical-deep-dive': [
    {
      type: 'chapter',
      slug: 'ai-rapid-prototyping-framework',
      title: 'Chapter 6: AI Framework',
      description: 'Rapid prototyping methodology for each vertical'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Industry-Specific Playbooks',
      description: 'Detailed innovation playbooks by industry'
    }
  ],
  'the-isg-model-applied-to-sutherland': [
    {
      type: 'chapter',
      slug: 'strategic-implementation-roadmap',
      title: 'Chapter 7: Implementation Roadmap',
      description: '90-day sprints to launch SIIG'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'ISG Success Framework',
      description: 'Detailed ISG implementation guide'
    }
  ],
  'ai-rapid-prototyping-framework': [
    {
      type: 'chapter',
      slug: 'success-metrics-and-kpis',
      title: 'Chapter 10: Success Metrics',
      description: 'Measuring AI innovation impact'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'AI Tool Evaluation Matrix',
      description: 'Comprehensive AI platform comparison'
    }
  ],
  'strategic-implementation-roadmap': [
    {
      type: 'chapter',
      slug: 'the-role-and-impact',
      title: 'Chapter 9: Role & Impact',
      description: 'Leadership requirements for success'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Implementation Checklist',
      description: 'Step-by-step launch guide'
    }
  ],
  'partnership-ecosystem-strategy': [
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Technology Stack Recommendations',
      description: 'Recommended platforms and tools'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Partner Agreement Templates',
      description: 'Legal frameworks for partnerships'
    }
  ],
  'the-role-and-impact': [
    {
      type: 'chapter',
      slug: 'the-isg-model-applied-to-sutherland',
      title: 'Chapter 5: ISG Model',
      description: 'Proven leadership model from Cognizant'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Change Management Strategy',
      description: 'Leading organizational transformation'
    }
  ],
  'success-metrics-and-kpis': [
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Financial Model Detail',
      description: 'Detailed ROI calculations and projections'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'Success Stories Template',
      description: 'Framework for documenting wins'
    }
  ],
  'conclusion-the-path-forward': [
    {
      type: 'chapter',
      slug: 'executive-summary',
      title: 'Executive Summary',
      description: 'Return to the strategic overview'
    },
    {
      type: 'appendix',
      slug: 'appendices',
      title: 'All Appendices',
      description: 'Supporting materials and detailed guides'
    }
  ]
};