'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Users, Wifi, DollarSign, TrendingUp, Network, Target, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useViewportAnimation, animationVariants, useChartAnimation } from '@/hooks/useViewportAnimation';

// Data volumes and metrics from the report
const dataVolumeMetrics = [
  { name: 'Subscribers', value: 32, unit: 'M+', color: '#3B82F6', description: 'Generating 5TB/second' },
  { name: 'Households', value: 125, unit: 'M', color: '#10B981', description: 'Across cable & streaming' },
  { name: 'Network Events', value: 50, unit: 'B+', color: '#F59E0B', description: 'Processed daily' },
  { name: 'IoT Devices', value: 10, unit: 'M+', color: '#8B5CF6', description: 'Connected devices' },
  { name: 'Content Hours', value: 1, unit: 'B+', color: '#EC4899', description: 'Monthly consumption' }
];

const currentInitiatives = [
  {
    name: 'Janus Initiative',
    status: 'active',
    impact: '40% reduction in network incidents',
    category: 'Network AI',
    progress: 85
  },
  {
    name: 'Addressable Advertising',
    status: 'active',
    impact: '$378M quarterly revenue, 18% YoY growth',
    category: 'Revenue Generation',
    progress: 75
  },
  {
    name: 'Peacock Personalization',
    status: 'active',
    impact: '$1.03B ad revenue, 50% growth',
    category: 'Content AI',
    progress: 80
  },
  {
    name: 'Smart Solutions',
    status: 'pilot',
    impact: 'Quantela partnership, 3x ROAS',
    category: 'Enterprise',
    progress: 60
  },
  {
    name: 'Universal Ads Platform',
    status: 'new',
    impact: 'Unified buying across platforms',
    category: 'Ad Tech',
    progress: 40
  },
  {
    name: 'Private 5G Networks',
    status: 'pilot',
    impact: 'Nokia partnership for enterprises',
    category: 'Infrastructure',
    progress: 45
  }
];

const visionMetrics = [
  { year: '2024', revenue: 1.5, cost: 4.2, satisfaction: 65 },
  { year: '2025', revenue: 2.2, cost: 3.8, satisfaction: 72 },
  { year: '2026', revenue: 3.0, cost: 3.2, satisfaction: 80 },
  { year: '2027', revenue: 4.0, cost: 2.9, satisfaction: 88 }
];

const partnerships = [
  { name: 'Mastercard', type: 'Attribution Analytics', status: 'active' },
  { name: 'PlaceIQ', type: 'Location Intelligence', status: 'active' },
  { name: 'Marpire', type: 'Connected TV Ads', status: 'active' },
  { name: 'Quantela', type: 'DOOH Analytics', status: 'active' },
  { name: 'Nokia', type: 'Private 5G', status: 'pilot' },
  { name: 'Creative Realities', type: 'Digital Signage', status: 'active' },
  { name: 'Sky/ITV/Channel 4', type: 'UK Ad Marketplace', status: 'planned' }
];

export function Chapter1() {
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [activeView, setActiveView] = useState<'current' | 'vision' | 'gaps'>('current');
  
  // Animation hooks for different sections
  const dataGoldmineAnim = useViewportAnimation({ triggerOnce: true });
  const chartAnim = useChartAnimation(300);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Chapter Header - Removed since it's already shown by the page */}

      {/* Data Goldmine Section */}
      <motion.div
        ref={dataGoldmineAnim.ref}
        initial="hidden"
        animate={dataGoldmineAnim.shouldAnimate ? "visible" : "hidden"}
        variants={animationVariants.fadeInUp}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Database className="w-8 h-8 text-blue-400" />
          The Data Goldmine We're Sitting On
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dataVolumeMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer"
              onClick={() => setSelectedMetric(metric)}
            >
              <div className="text-center">
                <p className="text-4xl font-bold" style={{ color: metric.color }}>
                  {metric.value}{metric.unit}
                </p>
                <p className="text-white font-semibold mt-2">{metric.name}</p>
                <p className="text-gray-400 text-sm mt-1">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* View Selector */}
      <div className="flex justify-center gap-4">
        {(['current', 'vision', 'gaps'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-6 py-3 rounded-lg capitalize transition-all font-medium ${
              activeView === view
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {view === 'current' ? 'Current Initiatives' : view === 'vision' ? 'Future Vision' : 'Critical Gaps'}
          </button>
        ))}
      </div>

      {/* Content Views - Using display instead of AnimatePresence to prevent re-animation */}
      <div className="relative">
        <motion.div
          style={{ display: activeView === 'current' ? 'block' : 'none' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
            {/* Current Initiatives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{initiative.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        initiative.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        initiative.status === 'pilot' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {initiative.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{initiative.category}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{initiative.impact}</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${initiative.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Progress: {initiative.progress}%</p>
                </motion.div>
              ))}
            </div>

            {/* Partnerships Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Strategic Data Partnerships</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {partnerships.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-center p-4 bg-white/5 rounded-lg"
                  >
                    <p className="font-semibold text-white">{partner.name}</p>
                    <p className="text-sm text-gray-400">{partner.type}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      partner.status === 'active' ? 'text-green-400' :
                      partner.status === 'pilot' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`}>
                      {partner.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        <motion.div
          style={{ display: activeView === 'vision' ? 'block' : 'none' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
            {/* Vision Statement */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">The Intelligent Network Company</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Every Customer Interaction AI-Enhanced</p>
                      <p className="text-gray-300 text-sm">Predictive, personalized, proactive</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Network className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Self-Healing Networks</p>
                      <p className="text-gray-300 text-sm">Autonomous operations at scale</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-yellow-400 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Content Finds Its Audience</p>
                      <p className="text-gray-300 text-sm">AI-driven discovery and distribution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-purple-400 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Data as Revenue Stream</p>
                      <p className="text-gray-300 text-sm">$2B+ annual opportunity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Outcomes Chart */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Path to 2027 Targets</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visionMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Revenue ($B)"
                    dot={{ fill: '#10B981', r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Op Costs ($B)"
                    dot={{ fill: '#3B82F6', r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaction" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    name="CSAT (%)"
                    dot={{ fill: '#F59E0B', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Key Targets */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'New Revenue', value: '$2B+', icon: <DollarSign />, color: 'text-green-400' },
                { label: 'Cost Reduction', value: '30%', icon: <TrendingUp />, color: 'text-blue-400' },
                { label: 'Customer Satisfaction', value: '50%↑', icon: <Users />, color: 'text-yellow-400' },
                { label: 'Network Incidents', value: '90%↓', icon: <Network />, color: 'text-purple-400' },
                { label: 'AI Leadership', value: '#1', icon: <Zap />, color: 'text-pink-400' }
              ].map((target, index) => (
                <motion.div
                  key={target.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className={`w-10 h-10 mx-auto mb-2 ${target.color}`}>
                    {target.icon}
                  </div>
                  <p className={`text-2xl font-bold ${target.color}`}>{target.value}</p>
                  <p className="text-gray-300 text-sm">{target.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        <motion.div
          style={{ display: activeView === 'gaps' ? 'block' : 'none' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
            {[
              { 
                gap: 'Data Silos', 
                description: 'Each business unit operates independent data systems',
                impact: 'High',
                solution: 'Unified Data Platform (Chapter 3)'
              },
              {
                gap: 'Limited Scale',
                description: 'AI pilots successful but not deployed enterprise-wide',
                impact: 'High',
                solution: 'MLOps & Deployment Framework'
              },
              {
                gap: 'Talent Gap',
                description: 'Need for 500+ data scientists and ML engineers',
                impact: 'Critical',
                solution: 'AI Academy & Recruitment (Chapter 5)'
              },
              {
                gap: 'Governance',
                description: 'Inconsistent data quality and privacy standards',
                impact: 'Medium',
                solution: 'Enterprise Data Governance'
              },
              {
                gap: 'ROI Tracking',
                description: 'No unified metrics for AI investment returns',
                impact: 'Medium',
                solution: 'AI Value Measurement Framework'
              }
            ].map((gap, index) => (
              <motion.div
                key={gap.gap}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{gap.gap}</h3>
                    <p className="text-gray-300 mb-3">{gap.description}</p>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        gap.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                        gap.impact === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {gap.impact} Impact
                      </span>
                      <span className="text-sm text-gray-400">Solution: {gap.solution}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          From Fragmented Initiatives to Unified AI Strategy
        </h3>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Comcast has all the ingredients for AI leadership. What we need is unified vision and execution 
          to transform our data goldmine into sustainable competitive advantage.
        </p>
      </motion.div>

      {/* Selected Metric Modal */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMetric(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-md w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{selectedMetric.name}</h3>
              <p className="text-5xl font-bold mb-4" style={{ color: selectedMetric.color }}>
                {selectedMetric.value}{selectedMetric.unit}
              </p>
              <p className="text-gray-300 mb-6">{selectedMetric.description}</p>
              <button
                onClick={() => setSelectedMetric(null)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}