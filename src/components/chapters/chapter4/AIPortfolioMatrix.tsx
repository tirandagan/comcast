'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Zap, Brain, TrendingUp } from 'lucide-react';

interface UseCase {
  name: string;
  category: string;
  impact: number;
  complexity: number;
  revenue: number;
  description: string;
  timeframe: string;
  keyMetrics: string[];
}

const useCases: UseCase[] = [
  // Customer Experience
  {
    name: "Hyper-Personalized Recommendations",
    category: "Customer Experience",
    impact: 95,
    complexity: 30,
    revenue: 250,
    description: "AI-driven content and service recommendations across all platforms",
    timeframe: "3-6 months",
    keyMetrics: ["25% increase in engagement", "15% revenue uplift", "40% better retention"]
  },
  {
    name: "Predictive Customer Service",
    category: "Customer Experience",
    impact: 85,
    complexity: 45,
    revenue: 180,
    description: "Anticipate and resolve issues before customers contact support",
    timeframe: "6-9 months",
    keyMetrics: ["50% reduction in calls", "30% cost savings", "4.5/5 satisfaction"]
  },
  {
    name: "Intelligent Virtual Assistant",
    category: "Customer Experience",
    impact: 75,
    complexity: 60,
    revenue: 120,
    description: "Advanced conversational AI for customer interactions",
    timeframe: "9-12 months",
    keyMetrics: ["70% query resolution", "24/7 availability", "90% accuracy"]
  },
  
  // Network Operations
  {
    name: "Self-Healing Networks",
    category: "Network Operations",
    impact: 90,
    complexity: 70,
    revenue: 200,
    description: "AI-powered automatic detection and resolution of network issues",
    timeframe: "12-18 months",
    keyMetrics: ["99.99% uptime", "60% fewer outages", "80% faster resolution"]
  },
  {
    name: "Predictive Maintenance",
    category: "Network Operations",
    impact: 80,
    complexity: 40,
    revenue: 150,
    description: "Predict equipment failures before they occur",
    timeframe: "6 months",
    keyMetrics: ["40% reduction in failures", "30% maintenance savings", "Zero critical outages"]
  },
  {
    name: "Capacity Optimization",
    category: "Network Operations",
    impact: 70,
    complexity: 50,
    revenue: 100,
    description: "Dynamic network resource allocation based on demand",
    timeframe: "6-9 months",
    keyMetrics: ["25% capacity improvement", "20% cost reduction", "Better QoS"]
  },
  
  // Content & Media
  {
    name: "AI Content Creation",
    category: "Content & Media",
    impact: 85,
    complexity: 65,
    revenue: 300,
    description: "Automated content generation and enhancement",
    timeframe: "9-12 months",
    keyMetrics: ["10x content volume", "60% cost reduction", "Personalized content"]
  },
  {
    name: "Dynamic Ad Insertion",
    category: "Content & Media",
    impact: 90,
    complexity: 35,
    revenue: 400,
    description: "Real-time personalized ad placement across platforms",
    timeframe: "3-6 months",
    keyMetrics: ["3x CTR improvement", "50% revenue increase", "Better targeting"]
  },
  {
    name: "Audience Analytics",
    category: "Content & Media",
    impact: 75,
    complexity: 25,
    revenue: 150,
    description: "Deep insights into viewing patterns and preferences",
    timeframe: "3 months",
    keyMetrics: ["Real-time insights", "Predictive modeling", "Cross-platform tracking"]
  },
  
  // Enterprise Solutions
  {
    name: "Smart Venue Analytics",
    category: "Enterprise Solutions",
    impact: 70,
    complexity: 30,
    revenue: 150,
    description: "AI-powered analytics for retail and venue optimization",
    timeframe: "3-6 months",
    keyMetrics: ["30% sales uplift", "Better space utilization", "Customer insights"]
  },
  {
    name: "Private 5G Intelligence",
    category: "Enterprise Solutions",
    impact: 80,
    complexity: 80,
    revenue: 300,
    description: "AI-enhanced private network solutions for enterprises",
    timeframe: "12-18 months",
    keyMetrics: ["Ultra-low latency", "99.999% reliability", "Custom AI models"]
  },
  {
    name: "Data-as-a-Service",
    category: "Enterprise Solutions",
    impact: 85,
    complexity: 55,
    revenue: 500,
    description: "Monetize anonymized insights across industries",
    timeframe: "6-9 months",
    keyMetrics: ["New revenue stream", "Cross-industry value", "Privacy-compliant"]
  }
];

const categoryColors = {
  "Customer Experience": "#3B82F6",
  "Network Operations": "#10B981",
  "Content & Media": "#F59E0B",
  "Enterprise Solutions": "#8B5CF6"
};

export function AIPortfolioMatrix() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <p className="text-white font-semibold">{data.name}</p>
          <p className="text-gray-300 text-sm mt-1">{data.category}</p>
          <p className="text-green-400 text-sm mt-2">Revenue: ${data.revenue}M</p>
        </div>
      );
    }
    return null;
  };

  const totalRevenue = useCases.reduce((sum, uc) => sum + uc.revenue, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Innovation Portfolio</h2>
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-4xl font-bold text-green-400">${(totalRevenue / 1000).toFixed(1)}B+</p>
            <p className="text-gray-300">Total Revenue Potential</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-4xl font-bold text-blue-400">12</p>
            <p className="text-gray-300">High-Impact Use Cases</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-4xl font-bold text-purple-400">4</p>
            <p className="text-gray-300">Business Categories</p>
          </div>
        </div>
      </div>

      {/* Category Legend */}
      <div className="flex justify-center gap-6 flex-wrap">
        {Object.entries(categoryColors).map(([category, color]) => (
          <motion.button
            key={category}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              hoveredCategory === category || !hoveredCategory
                ? 'bg-white/10 backdrop-blur-sm'
                : 'bg-white/5 opacity-50'
            }`}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-white">{category}</span>
          </motion.button>
        ))}
      </div>

      {/* Portfolio Matrix */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              type="number"
              dataKey="complexity"
              name="Implementation Complexity"
              domain={[0, 100]}
              label={{
                value: 'Implementation Complexity →',
                position: 'insideBottom',
                offset: -10,
                style: { fill: '#9CA3AF' }
              }}
              stroke="#9CA3AF"
            />
            <YAxis
              type="number"
              dataKey="impact"
              name="Business Impact"
              domain={[0, 100]}
              label={{
                value: 'Business Impact →',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#9CA3AF' }
              }}
              stroke="#9CA3AF"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              name="AI Use Cases"
              data={useCases}
              onClick={(data) => {
                setSelectedUseCase(data);
                setShowLabels(false);
              }}
            >
              {useCases.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.category as keyof typeof categoryColors]}
                  fillOpacity={
                    !hoveredCategory || hoveredCategory === entry.category ? 0.8 : 0.2
                  }
                  stroke={categoryColors[entry.category as keyof typeof categoryColors]}
                  strokeWidth={2}
                />
              ))}
            </Scatter>
            {/* Add labels next to dots */}
            {showLabels && useCases.map((useCase, index) => (
              <text
                key={`label-${index}`}
                x={useCase.complexity + 2}
                y={useCase.impact - 2}
                fill={categoryColors[useCase.category as keyof typeof categoryColors]}
                fontSize="11"
                fontWeight="500"
                opacity={!hoveredCategory || hoveredCategory === useCase.category ? 0.9 : 0.2}
                style={{ pointerEvents: 'none' }}
              >
                {useCase.name.length > 20 ? useCase.name.substring(0, 18) + '...' : useCase.name}
              </text>
            ))}
          </ScatterChart>
        </ResponsiveContainer>

        {/* Quadrant Labels */}
        <div className="absolute top-24 left-24 text-gray-500 text-sm">Quick Wins</div>
        <div className="absolute top-24 right-24 text-gray-500 text-sm">Strategic Initiatives</div>
        <div className="absolute bottom-24 left-24 text-gray-500 text-sm">Low Priority</div>
        <div className="absolute bottom-24 right-24 text-gray-500 text-sm">Complex but Critical</div>
      </div>

      {/* Selected Use Case Detail */}
      <AnimatePresence mode="wait">
        {selectedUseCase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedUseCase.name}</h3>
                <div className="flex items-center gap-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      backgroundColor: categoryColors[selectedUseCase.category as keyof typeof categoryColors]
                    }}
                  >
                    {selectedUseCase.category}
                  </span>
                  <span className="text-gray-300">Timeline: {selectedUseCase.timeframe}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedUseCase(null);
                  setShowLabels(true);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 mb-6">{selectedUseCase.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-2xl font-bold text-white">${selectedUseCase.revenue}M</p>
                <p className="text-gray-400 text-sm">Revenue Potential</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-2xl font-bold text-white">{selectedUseCase.impact}%</p>
                <p className="text-gray-400 text-sm">Business Impact</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-2xl font-bold text-white">{selectedUseCase.complexity}%</p>
                <p className="text-gray-400 text-sm">Complexity</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Key Metrics</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUseCase.keyMetrics.map((metric, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}