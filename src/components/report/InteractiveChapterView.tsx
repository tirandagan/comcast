'use client';

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

    // For Executive Summary, inject key metrics and validation warning
    if (chapter.slug === 'executive-summary') {
      const keyMetricsSection = `

<Callout title="⚠️ IMPORTANT DATA VALIDATION NOTICE" type="warning" defaultExpanded="true">The data, use cases, and financial models presented in this report are early drafts based on publicly available information. All metrics, projections, and analyses require: • Validation with Comcast Finance team for accuracy • Collaboration with business stakeholders to prioritize initiatives • Alignment with sponsor interest and engagement levels • Detailed business case development for each use case. This report represents a strategic vision that will be refined through stakeholder engagement and detailed analysis.</Callout>

<Callout title="Strategic Opportunity" type="info">
Comcast possesses unparalleled data assets with 32M+ subscribers, 125M households reached, and petabytes of data flowing through our networks daily. Our current data monetization efforts—while successful—represent a fraction of the potential $2B+ opportunity in AI-driven transformation.
</Callout>

<Callout title="Proven Leadership" type="success">
Drawing from my experience building Cognizant's Industry Solutions Group from zero to $200M in revenue and leading 400 professionals in AI transformation, I present a comprehensive strategy to unlock Comcast's data potential through unified AI strategy and execution.
</Callout>

## Key Transformation Metrics

<KeyTransformationMetrics />


`;
      // Insert at the beginning after any title
      const firstHeaderEnd = content.indexOf('\n\n');
      if (firstHeaderEnd > -1) {
        content = content.slice(0, firstHeaderEnd + 2) + keyMetricsSection + content.slice(firstHeaderEnd + 2);
      }
    }

    // For Chapter 1: Data & AI at Comcast - Current State and Vision
    if (chapter.slug === 'data-ai-current-state-vision' || chapter.slug === 'data-ai-at-comcast-current-state-and-vision') {
      // Replace entire content with the interactive Chapter1 component
      content = '<Chapter1 />';
    }

    // For Chapter 5: Building the AI-First Organization
    if (chapter.slug === 'building-ai-first-organization' || chapter.slug === 'building-the-ai-first-organization') {
      // Replace entire content with the interactive Chapter5 component
      content = '<Chapter5 />';
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
Comcast's AI transformation journey requires a fundamental shift from fragmented data initiatives to a unified, AI-first approach. By leveraging our unparalleled data assets while addressing critical capability gaps, we can capture significant opportunities in data monetization and AI-driven services.
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
    if (chapter.slug === 'the-isg-model-applied-to-comcast') {
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

    // For Chapter 2 - Data & AI Maturity Assessment
    if (chapter.slug === 'data-ai-maturity-assessment') {
      // Find the SWOT section and replace it with our component
      const swotStart = content.indexOf('### SWOT Analysis');
      const nextChapterStart = content.indexOf('## Chapter 3:');
      
      if (swotStart > -1) {
        // Replace the entire SWOT section with our component
        const beforeSwot = content.slice(0, swotStart);
        const afterSwot = nextChapterStart > -1 ? content.slice(nextChapterStart) : '';
        
        content = beforeSwot + '\n<ComcastSWOTAnalysis />\n\n' + afterSwot;
      }
    }

    // For Chapter 1 - Data & AI at Comcast - Current State and Vision
    if (chapter.slug === 'data-ai-at-comcast-current-state-and-vision') {
      const chapter1Section = `

<Chapter1 />

`;
      // Replace the entire content with Chapter1 component
      return chapter1Section;
    }

    // For Chapter 5 - Building the AI-First Organization
    if (chapter.slug === 'building-the-ai-first-organization') {
      const chapter5Section = `

<Chapter5 />

`;
      // Replace the entire content with Chapter5 component
      return chapter5Section;
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