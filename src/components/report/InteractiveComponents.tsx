'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, Treemap
} from 'recharts';
import { ChevronDown, ChevronRight, Info, TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';

// Color palette
const COLORS = {
  primary: ['#3B82F6', '#60A5FA', '#93BBFC', '#C7D2FE'],
  secondary: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
  accent: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
  danger: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'],
};

// Expandable Callout Component
export function Callout({ title, children, type = 'info' }: { title: string; children: React.ReactNode; type?: 'info' | 'success' | 'warning' | 'danger' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const colors = {
    info: 'border-blue-500 bg-blue-500/10',
    success: 'border-green-500 bg-green-500/10',
    warning: 'border-yellow-500 bg-yellow-500/10',
    danger: 'border-red-500 bg-red-500/10',
  };

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <Target className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    danger: <AlertCircle className="w-5 h-5" />,
  };

  return (
    <motion.div
      className={`border-l-4 rounded-r-lg p-4 mt-2 mb-6 ${colors[type]}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left font-semibold text-lg"
      >
        {icons[type]}
        {title}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-auto"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-gray-300 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Interactive Metric Card
export function MetricCard({ 
  title, 
  value, 
  change, 
  trend = 'up',
  detail 
}: { 
  title: string; 
  value: string | number; 
  change?: string;
  trend?: 'up' | 'down';
  detail?: string;
}) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cursor-pointer"
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
      onClick={() => setShowDetail(!showDetail)}
    >
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {change && (
          <span className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </span>
        )}
      </div>
      <AnimatePresence>
        {showDetail && detail && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 text-sm text-gray-400"
          >
            {detail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Revenue Growth Chart
export function RevenueGrowthChart() {
  const data = [
    { year: '2019', revenue: 1800, growth: 8 },
    { year: '2020', revenue: 1950, growth: 8.3 },
    { year: '2021', revenue: 2100, growth: 7.7 },
    { year: '2022', revenue: 2280, growth: 8.6 },
    { year: '2023', revenue: 2400, growth: 5.3 },
    { year: '2024', revenue: 2600, growth: 8.3, projected: true },
    { year: '2025', revenue: 2900, growth: 11.5, projected: true },
  ];

  return (
    <div className="w-full h-96 mt-6">
      <h3 className="text-xl font-semibold mb-4">Revenue Growth Trajectory</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" />
          <YAxis yAxisId="left" stroke="#9CA3AF" label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" label={{ value: 'Growth (%)', angle: 90, position: 'insideRight' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="revenue" 
            stroke="#3B82F6" 
            strokeWidth={3}
            strokeDasharray={data.map(d => d.projected ? "5 5" : "0").join(",")}
            name="Revenue ($M)"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="growth" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Growth Rate (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Global Presence Map
export function GlobalPresenceMap() {
  const locations = [
    { region: 'North America', sites: 12, employees: 8000 },
    { region: 'Latin America', sites: 15, employees: 22000 },
    { region: 'Asia Pacific', sites: 20, employees: 8000 },
    { region: 'EMEA', sites: 13, employees: 2000 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {locations.map((location, index) => (
        <motion.div
          key={location.region}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg p-6 border border-white/20"
        >
          <h4 className="text-lg font-semibold mb-2">{location.region}</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Sites:</span>
              <span className="font-bold">{location.sites}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Employees:</span>
              <span className="font-bold">{location.employees.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// SWOT Analysis Interactive
export function SWOTAnalysis() {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);
  
  const swotData = {
    strengths: [
      'Established global presence with 40,000+ employees',
      'Strong domain expertise across 9 industry verticals',
      '200+ patented innovations',
      'Existing innovation infrastructure (Labs, Digital Centers)',
    ],
    weaknesses: [
      'Fragmented innovation efforts across business units',
      'Limited AI/ML expertise at scale',
      'Traditional BPO mindset in parts of organization',
      'Inconsistent innovation methodologies',
    ],
    opportunities: [
      'Explosive growth in AI-enabled services market',
      'Client demand for innovation partners',
      'Ability to leverage existing client relationships',
      'First-mover advantage in AI-powered BPO',
    ],
    threats: [
      'Aggressive competition from tech-native firms',
      'Rapid pace of technological change',
      'Client expectations for faster innovation',
      'Talent war for AI/ML experts',
    ],
  };

  const quadrants = [
    { key: 'strengths', label: 'Strengths', color: 'from-green-600/30 to-green-500/20', borderColor: 'border-green-500' },
    { key: 'weaknesses', label: 'Weaknesses', color: 'from-red-600/30 to-red-500/20', borderColor: 'border-red-500' },
    { key: 'opportunities', label: 'Opportunities', color: 'from-blue-600/30 to-blue-500/20', borderColor: 'border-blue-500' },
    { key: 'threats', label: 'Threats', color: 'from-yellow-600/30 to-yellow-500/20', borderColor: 'border-yellow-500' },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Interactive SWOT Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((quadrant) => (
          <motion.div
            key={quadrant.key}
            className={`bg-gradient-to-br ${quadrant.color} rounded-lg p-6 border-2 ${quadrant.borderColor} cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveQuadrant(activeQuadrant === quadrant.key ? null : quadrant.key)}
          >
            <h4 className="text-xl font-semibold mb-4 flex items-center justify-between">
              {quadrant.label}
              <motion.div
                animate={{ rotate: activeQuadrant === quadrant.key ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </h4>
            <AnimatePresence>
              {activeQuadrant === quadrant.key && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {swotData[quadrant.key as keyof typeof swotData].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-white">•</span>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Re-export from Chapter4Visualizations for backward compatibility
export { EnhancedIndustryVerticalChart as IndustryVerticalChart, IndustryOpportunityCards } from '@/components/report/Chapter4Visualizations';

// Innovation Pipeline Funnel
export function InnovationPipeline() {
  const stages = [
    { name: 'Ideas Generated', value: 200, color: '#3B82F6' },
    { name: 'Prototypes Built', value: 80, color: '#60A5FA' },
    { name: 'Pilots Launched', value: 30, color: '#93BBFC' },
    { name: 'Production Ready', value: 15, color: '#C7D2FE' },
    { name: 'Scaled Solutions', value: 8, color: '#E0E7FF' },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Pipeline Funnel</h3>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-32">{stage.name}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-12 overflow-hidden">
                <motion.div
                  className="h-full flex items-center justify-end px-4"
                  style={{ backgroundColor: stage.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(stage.value / stages[0].value) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  <span className="font-bold text-gray-900">{stage.value}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}