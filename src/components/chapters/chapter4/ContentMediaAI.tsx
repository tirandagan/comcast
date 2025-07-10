'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Tv, Target, BarChart3, Sparkles, DollarSign, Eye, Zap } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ContentMetric {
  month: string;
  traditional: number;
  aiGenerated: number;
  revenue: number;
}

const contentData: ContentMetric[] = [
  { month: 'Jan', traditional: 1200, aiGenerated: 300, revenue: 45 },
  { month: 'Feb', traditional: 1100, aiGenerated: 450, revenue: 52 },
  { month: 'Mar', traditional: 1000, aiGenerated: 700, revenue: 61 },
  { month: 'Apr', traditional: 950, aiGenerated: 1100, revenue: 78 },
  { month: 'May', traditional: 900, aiGenerated: 1500, revenue: 92 },
  { month: 'Jun', traditional: 850, aiGenerated: 2200, revenue: 115 }
];

const adPerformance = [
  { name: 'Traditional Ads', value: 2.1, fill: '#6B7280' },
  { name: 'AI-Optimized Ads', value: 6.8, fill: '#3B82F6' },
  { name: 'Dynamic Insertion', value: 8.4, fill: '#10B981' },
  { name: 'Personalized Ads', value: 11.2, fill: '#F59E0B' }
];

const audienceSegments = [
  { segment: 'Sports Fans', size: 28, engagement: 78, value: 142 },
  { segment: 'Movie Buffs', size: 22, engagement: 82, value: 168 },
  { segment: 'News Viewers', size: 18, engagement: 65, value: 98 },
  { segment: 'Kids & Family', size: 15, engagement: 71, value: 112 },
  { segment: 'Premium Content', size: 17, engagement: 89, value: 234 }
];

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  impact: string;
  revenue: string;
  examples: string[];
}

const aiFeatures: AIFeature[] = [
  {
    id: 'content-creation',
    title: 'AI Content Creation',
    description: 'Automated generation of trailers, highlights, and promotional content',
    icon: <Sparkles className="w-6 h-6" />,
    impact: '10x content volume',
    revenue: '+$120M',
    examples: [
      'Auto-generated sports highlights',
      'Personalized movie trailers',
      'Dynamic show recaps',
      'Multi-language versions'
    ]
  },
  {
    id: 'dynamic-ads',
    title: 'Dynamic Ad Insertion',
    description: 'Real-time ad placement based on viewer context and preferences',
    icon: <Target className="w-6 h-6" />,
    impact: '3x CTR improvement',
    revenue: '+$400M',
    examples: [
      'Context-aware ad placement',
      'Mood-based targeting',
      'Cross-platform optimization',
      'Real-time bidding integration'
    ]
  },
  {
    id: 'audience-analytics',
    title: 'Deep Audience Analytics',
    description: 'AI-powered insights into viewing patterns and content preferences',
    icon: <BarChart3 className="w-6 h-6" />,
    impact: '45% better targeting',
    revenue: '+$180M',
    examples: [
      'Predictive viewership models',
      'Content affinity mapping',
      'Churn prediction',
      'Engagement scoring'
    ]
  },
  {
    id: 'content-optimization',
    title: 'Content Optimization',
    description: 'AI-driven content recommendations and programming decisions',
    icon: <Film className="w-6 h-6" />,
    impact: '35% higher engagement',
    revenue: '+$250M',
    examples: [
      'Optimal scheduling',
      'Content mix optimization',
      'Thumbnail generation',
      'Title/description testing'
    ]
  }
];

export function ContentMediaAI() {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'performance' | 'segments'>('overview');

  const totalRevenuePotential = aiFeatures.reduce((sum, f) => sum + parseInt(f.revenue.replace(/[+$M]/g, '')), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Content & Media AI Revolution</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Transforming content creation, distribution, and monetization with cutting-edge AI
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30"
        >
          <DollarSign className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-3xl font-bold text-white">${totalRevenuePotential}M+</p>
          <p className="text-gray-300">Revenue Potential</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30"
        >
          <Tv className="w-8 h-8 text-green-400 mb-2" />
          <p className="text-3xl font-bold text-white">10x</p>
          <p className="text-gray-300">Content Production</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30"
        >
          <Target className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="text-3xl font-bold text-white">3x</p>
          <p className="text-gray-300">Ad Performance</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
        >
          <Eye className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-3xl font-bold text-white">45%</p>
          <p className="text-gray-300">Better Targeting</p>
        </motion.div>
      </div>

      {/* View Selector */}
      <div className="flex justify-center gap-4">
        {(['overview', 'performance', 'segments'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-6 py-2 rounded-lg capitalize transition-all ${
              activeView === view
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Content Views */}
      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Content Production Growth */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Content Production Evolution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="traditional" fill="#6B7280" name="Traditional" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="aiGenerated" fill="#3B82F6" name="AI-Generated" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Growth */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Revenue Impact</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={contentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 6 }}
                    name="Revenue ($M)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeView === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Ad Performance Comparison (CTR %)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={adPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {adPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {activeView === 'segments' && (
          <motion.div
            key="segments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Audience Segment Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-gray-400">Segment</th>
                    <th className="text-center p-4 text-gray-400">Size (%)</th>
                    <th className="text-center p-4 text-gray-400">Engagement</th>
                    <th className="text-center p-4 text-gray-400">Value/User</th>
                    <th className="text-center p-4 text-gray-400">AI Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {audienceSegments.map((segment, index) => (
                    <motion.tr
                      key={segment.segment}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 text-white font-medium">{segment.segment}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 bg-white/10 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${segment.size * 3}%` }}
                            />
                          </div>
                          <span className="text-gray-300">{segment.size}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          segment.engagement > 80 ? 'bg-green-500/20 text-green-400' :
                          segment.engagement > 70 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {segment.engagement}%
                        </span>
                      </td>
                      <td className="p-4 text-center text-green-400 font-semibold">
                        ${segment.value}
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-blue-400">+{Math.round(segment.engagement * 0.4)}%</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer hover:border-white/40 transition-all"
            onClick={() => setSelectedFeature(feature)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <span className="text-green-400 font-semibold">{feature.revenue}</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-400 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {feature.impact}
              </span>
              <span className="text-gray-400">Click for details →</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-lg">
                    {selectedFeature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedFeature.title}</h3>
                    <p className="text-gray-400">{selectedFeature.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 mb-1">Impact</p>
                  <p className="text-2xl font-bold text-blue-400">{selectedFeature.impact}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 mb-1">Revenue Potential</p>
                  <p className="text-2xl font-bold text-green-400">{selectedFeature.revenue}</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Key Applications</h4>
                <div className="space-y-2">
                  {selectedFeature.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-gray-300">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}