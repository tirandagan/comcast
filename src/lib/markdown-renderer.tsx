import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  Callout, 
  MetricCard,
  KeyTransformationMetrics, 
  RevenueGrowthChart, 
  GlobalPresenceMap,
  SWOTAnalysis,
  IndustryVerticalChart,
  InnovationPipeline,
  IndustryOpportunityCards
} from '@/components/report/InteractiveComponents';
import {
  AIMaturityAssessment,
  InnovationROI,
  CompetitivePositioning,
  TransformationJourney,
  EcosystemNetwork
} from '@/components/report/AdvancedVisualizations';
import {
  DetailedSWOTMatrix,
  InnovationCapabilityRadar,
  InnovationOrgChart,
  BusinessUnitMaturity,
  InnovationInvestmentFlow,
  InnovationMetricsDashboard
} from '@/components/report/Chapter2Visualizations';
import {
  InnovationFrameworkDiagram,
  MaturityJourneyVisual,
  InnovationEcosystemVisual,
  SWOTVisualSummary
} from '@/components/report/Chapter2Images';
import {
  CompetitorIntelligenceDashboard,
  MarketPositioningPlot,
  StrategicGapRadar,
  DevelopmentSpeedComparison,
  TriplePlayStrategy
} from '@/components/report/Chapter3Visualizations';
import {
  CompetitiveLandscapeMap,
  InnovationGapVisual,
  CompetitiveAdvantageFramework,
  SpeedToMarketVisual,
  PartnershipEcosystemVisual
} from '@/components/report/Chapter3Images';
// Removed old Sutherland Chapter1Visualizations - using new Comcast chapters instead
import {
  ISGEvolutionTimeline,
  ISGOperatingModel,
  SIIGOrgStructure,
  ISGImplementationRoadmap,
  ISGSuccessMetrics,
  ISGTransformationJourney,
  InteractiveOperatingModel,
  DynamicSIIGStructure,
  OperatingPrinciplesVisualization,
  ImplementationRoadmapVisual,
  SuccessMetricsDashboard,
  CulturalTransformationJourney
} from '@/components/report/Chapter5Components';
import {
  AIAcceleratorsMatrix,
  SprintMethodologyTimeline,
  PrototypeToProductionPipeline,
  CitizenDeveloperProgram,
  InnovationLabInfrastructure
} from '@/components/report/Chapter6Components';
import { ServicePortfolioChart } from '@/components/report/ServicePortfolioChart';
// Removed LeadershipStructure - contains Sutherland data
import { Chapter1 } from '@/components/chapters/Chapter1';
import { ComcastSWOTAnalysis } from '@/components/report/ComcastSWOTAnalysis';
import { 
  Chapter3,
  DataPlatformArchitecture,
  DataFlowVisualization,
  TechnologyStackDiagram
} from '@/components/chapters/chapter3';
import {
  Chapter4,
  AIPortfolioMatrix,
  CustomerExperienceAI,
  NetworkOperationsAI,
  ContentMediaAI,
  ROIProjectionDashboard
} from '@/components/chapters/Chapter4';
import { Chapter5 } from '@/components/chapters/Chapter5';

const componentMap = {
  MetricCard,
  KeyTransformationMetrics,
  Callout,
  RevenueGrowthChart,
  GlobalPresenceMap,
  SWOTAnalysis,
  IndustryVerticalChart,
  InnovationPipeline,
  IndustryOpportunityCards,
  AIMaturityAssessment,
  InnovationROI,
  CompetitivePositioning,
  TransformationJourney,
  EcosystemNetwork,
  DetailedSWOTMatrix,
  InnovationCapabilityRadar,
  InnovationOrgChart,
  BusinessUnitMaturity,
  InnovationInvestmentFlow,
  InnovationMetricsDashboard,
  InnovationFrameworkDiagram,
  MaturityJourneyVisual,
  InnovationEcosystemVisual,
  SWOTVisualSummary,
  CompetitorIntelligenceDashboard,
  MarketPositioningPlot,
  StrategicGapRadar,
  DevelopmentSpeedComparison,
  TriplePlayStrategy,
  CompetitiveLandscapeMap,
  InnovationGapVisual,
  CompetitiveAdvantageFramework,
  SpeedToMarketVisual,
  PartnershipEcosystemVisual,
  ISGEvolutionTimeline,
  ISGOperatingModel,
  SIIGOrgStructure,
  ISGImplementationRoadmap,
  ISGSuccessMetrics,
  ISGTransformationJourney,
  InteractiveOperatingModel,
  DynamicSIIGStructure,
  OperatingPrinciplesVisualization,
  ImplementationRoadmapVisual,
  SuccessMetricsDashboard,
  CulturalTransformationJourney,
  AIAcceleratorsMatrix,
  SprintMethodologyTimeline,
  PrototypeToProductionPipeline,
  CitizenDeveloperProgram,
  InnovationLabInfrastructure,
  ServicePortfolioChart,
  Chapter1,
  ComcastSWOTAnalysis,
  Chapter3,
  DataPlatformArchitecture,
  DataFlowVisualization,
  TechnologyStackDiagram,
  Chapter4,
  AIPortfolioMatrix,
  CustomerExperienceAI,
  NetworkOperationsAI,
  ContentMediaAI,
  ROIProjectionDashboard,
  Chapter5,
};

export function renderInteractiveMarkdown(content: string) {
  // Pre-process content to replace component tags with special markers
  let processedContent = content;
  
  // Replace self-closing component tags
  processedContent = processedContent.replace(
    /<(\w+)([^>]*?)\/>/g,
    (match, componentName, props) => {
      return `[[${componentName}${props}]]`;
    }
  );
  
  // Replace component tags with content (including nested components)
  processedContent = processedContent.replace(
    /<(\w+)([^>]*?)>([\s\S]*?)<\/\1>/g,
    (match, componentName, props, content) => {
      return `[[${componentName}${props}|${content}]]`;
    }
  );
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ children }) => {
          // Check if this paragraph contains our component markers
          const childString = String(children);
          if (childString.includes('[[') && childString.includes(']]')) {
            // Parse and render components
            const parts = childString.split(/(\[\[[^\]]+\]\])/);
            const rendered = parts.map((part, index) => {
              const componentMatch = part.match(/\[\[(\w+)([^|\]]*?)(?:\|([^\]]+))?\]\]/);
              if (componentMatch) {
                const [, componentName, propsString, content] = componentMatch;
                
                // Parse props
                const props: any = {};
                if (propsString) {
                  // Handle both space-separated props and newline-separated content
                  const propsOnly = propsString.trim();
                  const propMatches = propsOnly.matchAll(/(\w+)="([^"]+)"/g);
                  for (const match of propMatches) {
                    props[match[1]] = match[2];
                  }
                }
                
                // Get component from map
                const Component = componentMap[componentName as keyof typeof componentMap];
                if (Component) {
                  if (content) {
                    return <Component key={index} {...props}>{content}</Component>;
                  }
                  return <Component key={index} {...props} />;
                }
              }
              return part;
            });
            
            return <div className="my-6">{rendered}</div>;
          }
          
          return <p className="mb-6 text-gray-300 leading-relaxed">{children}</p>;
        },
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-12 mb-3 text-white border-b border-gray-700 pb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mt-8 mb-2 text-blue-400">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300 italic">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-200">{children}</h4>
        ),
        ul: ({ children }) => (
          <ul className="list-disc mb-6 space-y-2 text-gray-300 pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal mb-6 space-y-2 text-gray-300 pl-6">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="ml-2 leading-relaxed">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-400 pl-6 py-4 my-6 text-gray-400 italic">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const inline = !className?.includes('language-');
          return inline ? (
            <code className="bg-black/50 px-2 py-1 rounded text-blue-300 text-sm">{children}</code>
          ) : (
            <code className="block bg-black/50 p-4 rounded-lg overflow-x-auto text-sm">{children}</code>
          );
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-white/20">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-white/20 px-4 py-2 bg-white/10 font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border border-white/20 px-4 py-2">{children}</td>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-200">{children}</em>
        ),
        hr: () => (
          <hr className="border-white/20 my-8" />
        ),
        div: ({ children, className }) => {
          // Support for custom div elements with Tailwind classes
          return <div className={className}>{children}</div>;
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}