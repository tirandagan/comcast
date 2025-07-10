'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PiggyBank, Target, Calendar, ChevronRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface YearlyProjection {
  year: string;
  revenue: number;
  costSavings: number;
  totalValue: number;
  initiatives: number;
}

const projectionData: YearlyProjection[] = [
  { year: 'Current', revenue: 0, costSavings: 0, totalValue: 0, initiatives: 0 },
  { year: 'Year 1', revenue: 200, costSavings: 75, totalValue: 275, initiatives: 12 },
  { year: 'Year 2', revenue: 600, costSavings: 150, totalValue: 750, initiatives: 24 },
  { year: 'Year 3', revenue: 1200, costSavings: 300, totalValue: 1500, initiatives: 36 },
  { year: 'Year 4', revenue: 1800, costSavings: 450, totalValue: 2250, initiatives: 45 },
  { year: 'Year 5', revenue: 2500, costSavings: 600, totalValue: 3100, initiatives: 52 }
];

const categoryBreakdown = [
  { category: 'Customer Experience', value: 650, color: '#3B82F6' },
  { category: 'Network Operations', value: 450, color: '#10B981' },
  { category: 'Content & Media', value: 950, color: '#F59E0B' },
  { category: 'Enterprise Solutions', value: 450, color: '#8B5CF6' }
];

const quarterlyMilestones = [
  { quarter: 'Q1 2025', milestone: 'Platform Foundation', value: 50, status: 'planned' },
  { quarter: 'Q2 2025', milestone: 'First AI Deployments', value: 125, status: 'planned' },
  { quarter: 'Q3 2025', milestone: 'Scale Customer AI', value: 200, status: 'planned' },
  { quarter: 'Q4 2025', milestone: 'Enterprise Launch', value: 275, status: 'planned' },
  { quarter: 'Q1 2026', milestone: 'Full Integration', value: 400, status: 'future' },
  { quarter: 'Q2 2026', milestone: 'Advanced Features', value: 550, status: 'future' },
  { quarter: 'Q3 2026', milestone: 'Market Leadership', value: 700, status: 'future' },
  { quarter: 'Q4 2026', milestone: 'Platform Expansion', value: 850, status: 'future' }
];

interface UseCase {
  name: string;
  category: string;
  year1: number;
  year2: number;
  year3: number;
  confidence: 'high' | 'medium' | 'low';
}

const topUseCases: UseCase[] = [
  { name: 'Dynamic Ad Insertion', category: 'Content & Media', year1: 120, year2: 280, year3: 400, confidence: 'high' },
  { name: 'Predictive Customer Service', category: 'Customer Experience', year1: 80, year2: 150, year3: 220, confidence: 'high' },
  { name: 'Self-Healing Networks', category: 'Network Operations', year1: 60, year2: 140, year3: 200, confidence: 'medium' },
  { name: 'AI Content Creation', category: 'Content & Media', year1: 40, year2: 120, year3: 250, confidence: 'medium' },
  { name: 'Data-as-a-Service', category: 'Enterprise Solutions', year1: 30, year2: 150, year3: 500, confidence: 'low' }
];

export function ROIProjectionDashboard() {
  const [selectedView, setSelectedView] = useState<'overview' | 'breakdown' | 'timeline'>('overview');
  const [hoveredData, setHoveredData] = useState<any>(null);

  const totalValue = projectionData[3].totalValue; // Year 3 value
  const avgROI = Math.round((totalValue / 300) * 100); // Assuming $300M investment

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value}M
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Investment ROI Projections</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Conservative financial projections showing path to $2B+ annual value creation
        </p>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30"
        >
          <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
          <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}M</p>
          <p className="text-gray-300">3-Year Total Value</p>
          <p className="text-sm text-green-400 mt-2">↑ {avgROI}% ROI</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30"
        >
          <DollarSign className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-3xl font-bold text-white">$1.2B</p>
          <p className="text-gray-300">Year 3 Revenue</p>
          <p className="text-sm text-blue-400 mt-2">New revenue streams</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
        >
          <PiggyBank className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-3xl font-bold text-white">$300M</p>
          <p className="text-gray-300">Cost Savings</p>
          <p className="text-sm text-purple-400 mt-2">Through automation</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30"
        >
          <Calendar className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="text-3xl font-bold text-white">18</p>
          <p className="text-gray-300">Months to Breakeven</p>
          <p className="text-sm text-yellow-400 mt-2">Fast payback period</p>
        </motion.div>
      </div>

      {/* View Selector */}
      <div className="flex justify-center gap-4">
        {(['overview', 'breakdown', 'timeline'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setSelectedView(view)}
            className={`px-6 py-2 rounded-lg capitalize transition-all ${
              selectedView === view
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Main Visualization */}
      {selectedView === 'overview' && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">5-Year Value Creation Trajectory</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#revenueGradient)"
                name="New Revenue"
              />
              <Area
                type="monotone"
                dataKey="costSavings"
                stackId="1"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#savingsGradient)"
                name="Cost Savings"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedView === 'breakdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Value by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {categoryBreakdown.map((cat) => (
                <div key={cat.category} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-gray-300 text-sm">{cat.category}: ${cat.value}M</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Top Revenue Generators</h3>
            <div className="space-y-3">
              {topUseCases.map((useCase, index) => (
                <motion.div
                  key={useCase.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{useCase.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      useCase.confidence === 'high' ? 'bg-green-500/20 text-green-400' :
                      useCase.confidence === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {useCase.confidence} confidence
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">Y1: ${useCase.year1}M</span>
                    <ChevronRight className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-300">Y2: ${useCase.year2}M</span>
                    <ChevronRight className="w-3 h-3 text-gray-500" />
                    <span className="text-green-400 font-semibold">Y3: ${useCase.year3}M</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'timeline' && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">Quarterly Implementation Milestones</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={quarterlyMilestones}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="quarter" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {quarterlyMilestones.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.status === 'planned' ? '#3B82F6' : '#6B7280'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {quarterlyMilestones.slice(0, 4).map((milestone, index) => (
              <motion.div
                key={milestone.quarter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{milestone.quarter}</p>
                <p className="text-sm text-gray-300">{milestone.milestone}</p>
                <p className="text-lg text-green-400 font-bold mt-1">${milestone.value}M</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Investment Summary */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-4">Investment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400 mb-2">Total Investment Required</p>
            <p className="text-3xl font-bold text-white">$300M</p>
            <p className="text-sm text-gray-300 mt-1">Over 3 years</p>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Expected Return</p>
            <p className="text-3xl font-bold text-green-400">${totalValue.toLocaleString()}M</p>
            <p className="text-sm text-gray-300 mt-1">By Year 3</p>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Payback Period</p>
            <p className="text-3xl font-bold text-blue-400">18 months</p>
            <p className="text-sm text-gray-300 mt-1">Industry-leading</p>
          </div>
        </div>
      </div>
    </div>
  );
}