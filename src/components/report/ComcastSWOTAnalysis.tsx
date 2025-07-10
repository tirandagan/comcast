'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Shield, AlertTriangle, Lightbulb, Target, ChevronRight } from 'lucide-react';

interface SWOTItem {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

const swotData = {
  strengths: {
    icon: Shield,
    color: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-500/10',
    items: [
      {
        title: 'Unparalleled Data Assets',
        description: '32M+ subscribers, 125M households, 5TB/second data flow providing rich behavioral insights',
        impact: 'high'
      },
      {
        title: 'Existing AI Initiatives',
        description: 'Janus network AI, Peacock personalization, addressable advertising generating $1B+ revenue',
        impact: 'high'
      },
      {
        title: 'Market Leadership Position',
        description: '#1 cable provider, #2 wireless carrier, major content producer with NBCUniversal',
        impact: 'high'
      },
      {
        title: 'Infrastructure Scale',
        description: 'Nationwide network, cloud infrastructure, edge computing capabilities',
        impact: 'medium'
      }
    ]
  },
  weaknesses: {
    icon: Minus,
    color: 'from-red-500 to-rose-600',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500/10',
    items: [
      {
        title: 'Fragmented Data Landscape',
        description: 'Siloed data across business units, inconsistent formats, limited cross-functional visibility',
        impact: 'high'
      },
      {
        title: 'Legacy Systems',
        description: '30+ year old systems, technical debt, complex integration challenges',
        impact: 'high'
      },
      {
        title: 'AI Talent Gap',
        description: 'Limited ML engineers, data scientists concentrated in pockets, not distributed',
        impact: 'medium'
      },
      {
        title: 'Slow Innovation Cycles',
        description: 'Traditional telco/media processes, risk-averse culture, lengthy approval chains',
        impact: 'medium'
      }
    ]
  },
  opportunities: {
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-600',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/10',
    items: [
      {
        title: '$2B+ Revenue Potential',
        description: 'Data monetization, AI services, new products could generate billions in new revenue',
        impact: 'high'
      },
      {
        title: 'AI-Driven Cost Reduction',
        description: '$1B+ savings through automation, predictive maintenance, optimized operations',
        impact: 'high'
      },
      {
        title: 'Strategic Partnerships',
        description: 'Hyperscalers, AI vendors, universities eager to collaborate on data initiatives',
        impact: 'medium'
      },
      {
        title: 'Regulatory Advantage',
        description: 'Privacy-first approach, ethical AI leadership could differentiate from competitors',
        impact: 'medium'
      }
    ]
  },
  threats: {
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-500/10',
    items: [
      {
        title: 'Tech Giant Competition',
        description: 'Google, Amazon, Apple expanding into telco/media with superior AI capabilities',
        impact: 'high'
      },
      {
        title: 'Streaming Disruption',
        description: 'Netflix, Disney+ AI-first approach setting new customer expectations',
        impact: 'high'
      },
      {
        title: 'Regulatory Pressures',
        description: 'Data privacy laws, AI regulations could limit monetization opportunities',
        impact: 'medium'
      },
      {
        title: 'Technology Velocity',
        description: 'Rapid AI advancement requiring continuous investment and transformation',
        impact: 'medium'
      }
    ]
  }
};

export function ComcastSWOTAnalysis() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const quadrantSummaries = {
    strengths: 'Leverage our 32M+ subscribers, existing AI revenue streams, market leadership, and nationwide infrastructure to drive transformation.',
    weaknesses: 'Address siloed data systems, legacy infrastructure, AI talent gaps, and cultural resistance to accelerate innovation.',
    opportunities: 'Capture $2B+ in AI revenue, reduce costs by $1B+, form strategic partnerships, and lead with privacy-first approach.',
    threats: 'Compete with tech giants, adapt to streaming disruption, navigate regulatory pressures, and keep pace with AI advancement.'
  };

  const quadrants = [
    { key: 'strengths', label: 'Strengths', position: 'top-left' },
    { key: 'opportunities', label: 'Opportunities', position: 'top-right' },
    { key: 'weaknesses', label: 'Weaknesses', position: 'bottom-left' },
    { key: 'threats', label: 'Threats', position: 'bottom-right' }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="my-12">
      <h3 className="text-3xl font-bold text-center mb-8">SWOT Analysis</h3>
      
      {/* Main SWOT Grid */}
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-1 bg-gray-800 p-1 rounded-2xl">
          {quadrants.map((quadrant) => {
            const data = swotData[quadrant.key as keyof typeof swotData];
            const Icon = data.icon;
            const isSelected = selectedQuadrant === quadrant.key;
            
            return (
              <motion.div
                key={quadrant.key}
                className={`relative bg-gradient-to-br ${data.color} rounded-xl p-8 cursor-pointer overflow-hidden min-h-[300px]`}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedQuadrant(quadrant.key);
                  setShowOverlay(true);
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 34%, transparent 35%, transparent),
                                     radial-gradient(circle at 75% 75%, transparent 20%, rgba(255,255,255,0.1) 21%, rgba(255,255,255,0.1) 34%, transparent 35%, transparent)`
                  }} />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-white">{quadrant.label}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isSelected ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-6 h-6 text-white/70" />
                    </motion.div>
                  </div>
                  
                  {/* Summary Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-white/90 font-medium">{data.items.length} Key Factors</span>
                    <span className="text-white/70">•</span>
                    <span className="text-white/90">
                      {data.items.filter(i => i.impact === 'high').length} High Impact
                    </span>
                  </div>
                  
                  {/* Summary Description */}
                  <div className="text-white/90 text-sm leading-relaxed">
                    {quadrantSummaries[quadrant.key as keyof typeof quadrantSummaries]}
                  </div>
                </div>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <div className="absolute w-20 h-0.5 bg-gray-600 -left-10 top-1/2 -translate-y-1/2" />
            <div className="absolute h-20 w-0.5 bg-gray-600 left-1/2 -top-10 -translate-x-1/2" />
            <div className="w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-600" />
          </div>
        </div>
      </div>
      
      {/* Overlay Modal */}
      <AnimatePresence>
        {showOverlay && selectedQuadrant && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setShowOverlay(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowOverlay(false)}
            >
              <motion.div
                className={`max-w-4xl w-full ${swotData[selectedQuadrant as keyof typeof swotData].bgColor} rounded-2xl p-8 border-2 ${swotData[selectedQuadrant as keyof typeof swotData].borderColor} shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold capitalize flex items-center gap-3">
                    {(() => {
                      const Icon = swotData[selectedQuadrant as keyof typeof swotData].icon;
                      return <Icon className="w-8 h-8" />;
                    })()}
                    {selectedQuadrant} - Detailed Analysis
                  </h4>
                  <button
                    onClick={() => setShowOverlay(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                  {swotData[selectedQuadrant as keyof typeof swotData].items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-semibold text-white">{item.title}</h5>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-black/20 ${getImpactColor(item.impact)}`}>
                          {item.impact.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </div>
  );
}