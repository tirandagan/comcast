'use client';

import { useState } from 'react';
import { renderInteractiveMarkdown } from '@/lib/markdown-renderer';
import { CrossReferenceLinks, chapterCrossReferences } from '@/components/report/CrossReferences';

interface Chapter {
  id: string;
  title: string;
  slug: string;
  order: number;
  description?: string;
  content: string;
  sections?: any[];
}

interface InteractiveChapterViewProps {
  chapter: Chapter;
}

export default function InteractiveChapterView({ chapter }: InteractiveChapterViewProps) {
  const [interactiveMode, setInteractiveMode] = useState(true);

  // Process content to inject interactive components
  const processContent = (content: string) => {
    // Remove Chapter Summary sections from the markdown
    // Pattern matches: > **📌 Chapter Summary** followed by the summary text
    content = content.replace(/>\s*\*\*📌\s*Chapter Summary\*\*[\s\S]*?(?=\n\n##|\n\n#|$)/g, '');
    
    // Remove Related Chapters sections from the markdown
    // Pattern matches: ## 🔗 Related Chapters followed by the list
    content = content.replace(/##\s*🔗\s*Related Chapters[\s\S]*?(?=\n---|\n#|\n##[^#]|$)/g, '');
    
    // Remove Key Takeaways sections from the markdown
    // Pattern matches: ## 🎯 Key Takeaways followed by the list
    content = content.replace(/##\s*🎯\s*Key Takeaways[\s\S]*?(?=\n##|\n#|$)/g, '');
    
    if (!interactiveMode) return content;

    // For Executive Summary, inject key metrics
    if (chapter.slug === 'executive-summary') {
      const keyMetricsSection = `

<Callout title="Critical Inflection Point" type="info">
Sutherland Global Services stands at a critical inflection point. With ~$2.4 billion in revenue, 40,000 employees, and a strong foundation in customer experience and BPO services, the company has the assets needed to become a leader in AI-driven business transformation. However, current innovation efforts are fragmented across business units, limiting the company's ability to capitalize on the explosive growth in AI-enabled services.
</Callout>

<Callout title="Proven Methodology" type="success">
This comprehensive strategy document outlines a clear path forward: establishing a unified, global innovation function that leverages rapid AI prototyping to deliver industry-leading solutions. Drawing from proven methodologies I developed at Cognizant's Industry Solutions Group (ISG) – which generated $200M+ in influence revenue – and innovative approaches from my AI program at Fairleigh Dickinson University, this proposal presents a conservative yet transformative approach to innovation.
</Callout>

## Key Company Metrics

<MetricCard title="Annual Revenue" value="$2.4B" change="+8.3%" trend="up" detail="Strong growth trajectory with conservative projections showing path to $2.9B by 2025" />

<MetricCard title="Global Workforce" value="40,000+" change="+15%" trend="up" detail="Highly skilled workforce across 60+ delivery centers in 144+ countries" />

<MetricCard title="Innovation Portfolio" value="200+" change="+25%" trend="up" detail="Patented inventions demonstrating strong innovation capability" />

<MetricCard title="Client Engagement" value="63%" detail="Percentage of contracts tied directly to client KPIs, demonstrating value-based partnerships" />

## Revenue Growth Trajectory

<RevenueGrowthChart />

`;
      // Insert at the beginning after any title
      const firstHeaderEnd = content.indexOf('\n\n');
      if (firstHeaderEnd > -1) {
        content = content.slice(0, firstHeaderEnd + 2) + keyMetricsSection + content.slice(firstHeaderEnd + 2);
      }
    }

    // For Company Overview chapter - Chapter 1
    if (chapter.slug === 'company-overview-and-current-landscape') {
      // Insert interactive components at specific points without removing content
      
      // Insert HeroDashboard after the chapter intro
      const aboutStart = content.indexOf('## About Sutherland Global Services');
      if (aboutStart > -1) {
        content = content.slice(0, aboutStart) + '\n\n<HeroDashboard />\n\n' + content.slice(aboutStart);
      }
      
      // Insert LeadershipStructure to replace the leadership bullet list
      const leadershipStart = content.indexOf('### Leadership Structure');
      if (leadershipStart > -1) {
        const nextSectionIndex = content.indexOf('\n## ', leadershipStart);
        if (nextSectionIndex > -1) {
          content = content.slice(0, leadershipStart) + '### Leadership Structure\n\n<LeadershipStructure />\n\n' + content.slice(nextSectionIndex);
        }
      }
      
      // Replace Service Portfolio Architecture section with the interactive chart
      const servicePortfolioIndex = content.indexOf('## Service Portfolio Architecture');
      if (servicePortfolioIndex > -1) {
        const nextSectionIndex = content.indexOf('\n## ', servicePortfolioIndex + 1);
        if (nextSectionIndex > -1) {
          content = content.slice(0, servicePortfolioIndex) + '## Service Portfolio Architecture\n\n<ServicePortfolioChart />\n\n' + content.slice(nextSectionIndex);
        }
      }
      
      // Insert GlobalNetworkMap after Global Presence section
      const globalPresenceIndex = content.indexOf('### Global Presence');
      if (globalPresenceIndex > -1) {
        const nextSectionIndex = content.indexOf('\n### ', globalPresenceIndex + 1);
        const insertPoint = nextSectionIndex > -1 ? nextSectionIndex : content.indexOf('\n## ', globalPresenceIndex);
        if (insertPoint > -1) {
          content = content.slice(0, insertPoint) + '\n\n<GlobalNetworkMap />\n\n' + content.slice(insertPoint);
        }
      }
      
      // Insert IndustryVerticalExplorer after Industry Expertise
      const industryIndex = content.indexOf('### Industry Expertise');
      if (industryIndex > -1) {
        const nextSectionIndex = content.indexOf('\n### ', industryIndex + 1);
        const insertPoint = nextSectionIndex > -1 ? nextSectionIndex : content.indexOf('\n## ', industryIndex);
        if (insertPoint > -1) {
          content = content.slice(0, insertPoint) + '\n\n<IndustryVerticalExplorer />\n\n' + content.slice(insertPoint);
        }
      }
      
      // Insert InnovationInfrastructure after Innovation Infrastructure heading
      const innovationIndex = content.indexOf('### Innovation Infrastructure');
      if (innovationIndex > -1) {
        const nextSectionIndex = content.indexOf('\n## ', innovationIndex + 1);
        const insertPoint = nextSectionIndex > -1 ? nextSectionIndex : content.length;
        content = content.slice(0, insertPoint) + '\n\n<InnovationInfrastructure />\n\n' + content.slice(insertPoint);
      }
    }

    // For SWOT Analysis chapter - Chapter 2
    if (chapter.slug === 'swot-analysis-for-innovation') {
      const swotSection = `

<SWOTVisualSummary />

<InnovationFrameworkDiagram />

## Enhanced Interactive SWOT Analysis

<DetailedSWOTMatrix />

<MaturityJourneyVisual />

## Innovation Capability Assessment

<InnovationCapabilityRadar />

<InnovationEcosystemVisual />

## Innovation Leadership Structure

<InnovationOrgChart />

## Business Unit Innovation Maturity

<BusinessUnitMaturity />

## Innovation Investment Flow

<InnovationInvestmentFlow />

## Innovation Performance Dashboard

<InnovationMetricsDashboard />

<Callout title="Key Insight" type="info">
Sutherland's innovation journey requires a fundamental shift from fragmented efforts to a unified, industry-centric approach. By leveraging existing strengths while addressing critical capability gaps, the company can capture significant opportunities in the rapidly growing AI services market.
</Callout>

`;
      // Insert after the chapter introduction
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + swotSection + content.slice(insertPoint);
      }
    }

    // For Industry Vertical chapter
    if (chapter.slug === 'industry-vertical-deep-dive') {
      const verticalSection = `
## Industry Performance Overview

<IndustryVerticalChart />

## Industry Innovation Opportunities

<IndustryOpportunityCards />

## Global Delivery Footprint

<GlobalPresenceMap />

`;
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + verticalSection + content.slice(insertPoint);
      }
    }

    // For ISG Model chapter - Chapter 5
    if (chapter.slug === 'the-isg-model-applied-to-sutherland') {
      const isgSection = `
## The ISG Transformation Journey

<ISGTransformationJourney />

## The ISG Success Story

<ISGEvolutionTimeline />

## Interactive Operating Model

<InteractiveOperatingModel />

## ISG Operating Model Framework

<ISGOperatingModel />

## SIIG Organizational Dynamics

<DynamicSIIGStructure />

## Operating Principles

<OperatingPrinciplesVisualization />

## 365-Day Implementation Journey

<ImplementationRoadmapVisual />

## Implementation Roadmap

<ISGImplementationRoadmap />

## Success Metrics Dashboard

<SuccessMetricsDashboard />

## Cultural Transformation

<CulturalTransformationJourney />

## Success Metrics & KPIs

<ISGSuccessMetrics />

`;
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + isgSection + content.slice(insertPoint);
      }
    }

    // For AI Framework chapter
    if (chapter.slug === 'ai-rapid-prototyping-framework') {
      const aiFrameworkSection = `
## AI Development Accelerators

<AIAcceleratorsMatrix />

## Sprint Methodology Timeline

<SprintMethodologyTimeline />

## From Prototype to Production

<PrototypeToProductionPipeline />

## Citizen Developer Training Program

<CitizenDeveloperProgram />

## Innovation Lab Infrastructure

<InnovationLabInfrastructure />

`;
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + aiFrameworkSection + content.slice(insertPoint);
      }
    }

    // For Strategic Data Platform Architecture chapter - Chapter 3
    if (chapter.slug === 'strategic-data-platform-architecture' || chapter.slug === 'competitive-landscape-ai-innovation-gaps') {
      const dataArchitectureSection = `

<Chapter3 />

`;
      // Replace content after introduction with the comprehensive Chapter3 component
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + dataArchitectureSection;
      } else {
        // If no ## found, replace everything after first paragraph
        const firstParagraphEnd = content.indexOf('\n\n');
        if (firstParagraphEnd > -1) {
          content = content.slice(0, firstParagraphEnd + 2) + dataArchitectureSection;
        }
      }
    }

    // For Chapter 4 - AI Innovation Portfolio & Roadmap
    if (chapter.slug === 'ai-innovation-portfolio-roadmap') {
      const aiPortfolioSection = `

<Chapter4 />

`;
      // Replace content after introduction with the comprehensive Chapter4 component
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + aiPortfolioSection;
      } else {
        // If no ## found, replace everything after first paragraph
        const firstParagraphEnd = content.indexOf('\n\n');
        if (firstParagraphEnd > -1) {
          content = content.slice(0, firstParagraphEnd + 2) + aiPortfolioSection;
        }
      }
    }

    // For Partnership Strategy chapter
    if (chapter.slug === 'partnership-ecosystem-strategy') {
      const ecosystemSection = `
## Innovation Ecosystem Visualization

<EcosystemNetwork />

`;
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + ecosystemSection + content.slice(insertPoint);
      }
    }

    // For Success Metrics chapter
    if (chapter.slug === 'success-metrics-and-kpis') {
      const roiSection = `
## Innovation Investment Returns

<InnovationROI />

`;
      const insertPoint = content.indexOf('## ');
      if (insertPoint > -1) {
        content = content.slice(0, insertPoint) + roiSection + content.slice(insertPoint);
      }
    }

    return content;
  };

  const processedContent = processContent(chapter.content);

  return (
    <div>
      {/* Interactive Mode Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setInteractiveMode(!interactiveMode)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            interactiveMode 
              ? 'bg-blue-600 text-white' 
              : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          {interactiveMode ? 'Interactive View' : 'Text Only'}
        </button>
      </div>

      {/* Chapter Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        {renderInteractiveMarkdown(processedContent)}
      </div>

      {/* Cross References */}
      {chapterCrossReferences[chapter.slug] && (
        <CrossReferenceLinks 
          references={chapterCrossReferences[chapter.slug]}
          title="Related Chapters"
        />
      )}
    </div>
  );
}