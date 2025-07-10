'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Treemap, ComposedChart, Area, Sankey, ScatterChart, Scatter, AreaChart
} from 'recharts';
import { 
  Building2, Users, Brain, TrendingUp, Clock, Target, 
  AlertTriangle, Zap, Globe, Award, ChevronRight, X,
  DollarSign, Rocket, Shield, Sparkles, ArrowUpRight,
  Heart, Wifi, ShoppingCart, Building, Cpu, Phone,
  Briefcase, Plane, Battery, Info, Filter, Layers,
  Activity, GitBranch, BarChart3, PieChartIcon
} from 'lucide-react';

// Industry colors
const INDUSTRY_COLORS = {
  healthcare: '#EF4444',
  cmt: '#3B82F6',
  bfsi: '#10B981',
  retail: '#F59E0B',
  manufacturing: '#8B5CF6',
  energy: '#14B8A6',
  travel: '#EC4899',
  technology: '#6366F1',
  insurance: '#84CC16'
};

// Enhanced Industry Vertical Performance Dashboard
export function EnhancedIndustryVerticalChart() {
  const [viewMode, setViewMode] = useState<'overview' | 'detail' | 'comparison'>('overview');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [metricView, setMetricView] = useState<'revenue' | 'growth' | 'potential' | 'all'>('all');

  // Comprehensive industry data based on report
  const industryData = [
    {
      id: 'healthcare',
      name: 'Healthcare & Life Sciences',
      icon: Heart,
      color: INDUSTRY_COLORS.healthcare,
      metrics: {
        currentRevenue: 380,
        marketSize: 359.3,
        marketGrowth: 6.5,
        sutherland: {
          revenue: 380,
          growth: 18,
          employees: 7500,
          clients: 150,
          nps: 72,
          solutions: ['SmartCred™', 'SmartHealthAnalytics', 'E-Hub'],
          operationalSavings: 30
        },
        potential: {
          growth: '15-20%',
          investment: 'Maintenance',
          risk: 'Low',
          timeToImpact: 'Immediate',
          revenueTarget: 450
        }
      },
      strengths: ['82+ financial services firms', '50M+ transactions', '$3B+ collections'],
      opportunities: ['AI-powered clinical decision', 'Predictive healthcare analytics', 'Patient experience automation']
    },
    {
      id: 'cmt',
      name: 'Communications, Media & Technology',
      icon: Wifi,
      color: INDUSTRY_COLORS.cmt,
      metrics: {
        currentRevenue: 280,
        marketSize: 2300,
        marketGrowth: 12.5,
        sutherland: {
          revenue: 280,
          growth: 25,
          employees: 5000,
          clients: 120,
          nps: 70,
          solutions: ['5G Operations', 'Network Intelligence', 'Content Moderation'],
          genAIAdoption: 50
        },
        potential: {
          growth: '50-100%',
          investment: 'Growth',
          risk: 'Medium',
          timeToImpact: '6-12 months',
          revenueTarget: 560
        }
      },
      strengths: ['Basic offerings established', 'Strong tech foundation'],
      opportunities: ['$2.3T 5G market', '50%+ GenAI adoption', 'Network automation']
    },
    {
      id: 'bfsi',
      name: 'Banking & Financial Services',
      icon: Building,
      color: INDUSTRY_COLORS.bfsi,
      metrics: {
        currentRevenue: 450,
        marketSize: 850,
        marketGrowth: 8.2,
        sutherland: {
          revenue: 450,
          growth: 12,
          employees: 8000,
          clients: 200,
          nps: 75,
          solutions: ['Digital Banking', 'Fraud Prevention', 'Wealth Management'],
          digitalAdoption: 65
        },
        potential: {
          growth: '20-30%',
          investment: 'Moderate',
          risk: 'Low',
          timeToImpact: '3-6 months',
          revenueTarget: 585
        }
      },
      strengths: ['200+ clients', 'Deep domain expertise', 'Regulatory compliance'],
      opportunities: ['Open banking', 'Crypto/DeFi services', 'ESG compliance']
    },
    {
      id: 'retail',
      name: 'Retail & Consumer',
      icon: ShoppingCart,
      color: INDUSTRY_COLORS.retail,
      metrics: {
        currentRevenue: 240,
        marketSize: 680,
        marketGrowth: 9.5,
        sutherland: {
          revenue: 240,
          growth: 15,
          employees: 4500,
          clients: 180,
          nps: 74,
          solutions: ['Omnichannel Support', 'Inventory Analytics', 'Customer Journey'],
          ecommerceGrowth: 25
        },
        potential: {
          growth: '25-35%',
          investment: 'Growth',
          risk: 'Medium',
          timeToImpact: '3-6 months',
          revenueTarget: 324
        }
      },
      strengths: ['180+ retail clients', 'Omnichannel expertise'],
      opportunities: ['Metaverse commerce', 'AI personalization', 'Supply chain automation']
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: Shield,
      color: INDUSTRY_COLORS.insurance,
      metrics: {
        currentRevenue: 320,
        marketSize: 450,
        marketGrowth: 7.8,
        sutherland: {
          revenue: 320,
          growth: 8,
          employees: 6000,
          clients: 120,
          nps: 71,
          solutions: ['Claims Processing', 'Underwriting AI', 'Risk Assessment'],
          automationRate: 45
        },
        potential: {
          growth: '15-25%',
          investment: 'Moderate',
          risk: 'Low',
          timeToImpact: 'Immediate',
          revenueTarget: 400
        }
      },
      strengths: ['Complex process expertise', 'Regulatory knowledge'],
      opportunities: ['Parametric insurance', 'Climate risk modeling', 'Embedded insurance']
    }
  ];

  // Calculate aggregate metrics
  const totalCurrentRevenue = industryData.reduce((sum, ind) => sum + ind.metrics.currentRevenue, 0);
  const totalPotentialRevenue = industryData.reduce((sum, ind) => sum + ind.metrics.potential.revenueTarget, 0);
  const avgGrowth = industryData.reduce((sum, ind) => sum + ind.metrics.sutherland.growth, 0) / industryData.length;

  return (
    <div className="my-8">
      <div className="mb-6">
        <h3 className="text-3xl font-bold mb-2">Industry Vertical Performance Dashboard</h3>
        <p className="text-gray-400">Comprehensive view of Comcast's position across key verticals</p>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* View Mode Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                viewMode === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setViewMode('detail')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                viewMode === 'detail' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              <Layers className="w-4 h-4" />
              Detailed Analysis
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                viewMode === 'comparison' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              Comparison
            </button>
          </div>

          {/* Metric Filter */}
          <div className="flex gap-2">
            {(['all', 'revenue', 'growth', 'potential'] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setMetricView(metric)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  metricView === metric 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div 
          className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 rounded-lg p-4 border border-blue-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400">Current</span>
          </div>
          <div className="text-2xl font-bold">${totalCurrentRevenue}M</div>
          <div className="text-xs text-gray-400">Total Revenue</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-600/20 to-green-500/10 rounded-lg p-4 border border-green-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">Potential</span>
          </div>
          <div className="text-2xl font-bold">${totalPotentialRevenue}M</div>
          <div className="text-xs text-gray-400">Target Revenue</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 rounded-lg p-4 border border-purple-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Rocket className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">Growth</span>
          </div>
          <div className="text-2xl font-bold">{avgGrowth.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Avg Growth Rate</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 rounded-lg p-4 border border-orange-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-orange-400">Opportunity</span>
          </div>
          <div className="text-2xl font-bold">+{((totalPotentialRevenue - totalCurrentRevenue) / totalCurrentRevenue * 100).toFixed(0)}%</div>
          <div className="text-xs text-gray-400">Growth Potential</div>
        </motion.div>
      </div>

      {/* Main Visualization Area */}
      <div className="bg-gray-800 rounded-lg p-6">
        {viewMode === 'overview' && <OverviewChart data={industryData} metricView={metricView} />}
        {viewMode === 'detail' && <DetailedAnalysis data={industryData} />}
        {viewMode === 'comparison' && <ComparisonView data={industryData} />}
      </div>
    </div>
  );
}

// Overview Chart Component
function OverviewChart({ data, metricView }: any) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const chartData = data.map((ind: any) => ({
    name: ind.name.split(' ')[0], // Shorten names for chart
    fullName: ind.name,
    current: ind.metrics.currentRevenue,
    potential: ind.metrics.potential.revenueTarget,
    growth: ind.metrics.sutherland.growth,
    marketSize: ind.metrics.marketSize,
    employees: ind.metrics.sutherland.employees,
    color: ind.color
  }));

  return (
    <div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left" 
              stroke="#9CA3AF" 
              label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#9CA3AF" 
              label={{ value: 'Growth (%)', angle: 90, position: 'insideRight', style: { fill: '#9CA3AF' } }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-900 p-4 rounded border border-gray-700">
                      <p className="font-semibold mb-2">{data.fullName}</p>
                      <div className="space-y-1 text-sm">
                        <p>Current Revenue: ${data.current}M</p>
                        <p>Potential: ${data.potential}M</p>
                        <p>Growth Rate: {data.growth}%</p>
                        <p>Market Size: ${data.marketSize}B</p>
                        <p>Employees: {data.employees.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {(metricView === 'all' || metricView === 'revenue') && (
              <>
                <Bar 
                  yAxisId="left"
                  dataKey="current" 
                  fill="#3B82F6" 
                  name="Current Revenue"
                  onMouseEnter={(data: any) => setHoveredBar(data.name)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {chartData.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={hoveredBar === entry.name ? entry.color : '#3B82F6'}
                      fillOpacity={hoveredBar === entry.name ? 1 : 0.8}
                    />
                  ))}
                </Bar>
                <Bar 
                  yAxisId="left"
                  dataKey="potential" 
                  fill="#10B981" 
                  name="Potential Revenue"
                  fillOpacity={0.6}
                />
              </>
            )}
            {(metricView === 'all' || metricView === 'growth') && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="growth" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', r: 6 }}
                name="Growth Rate %"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Industry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {data.map((industry: any) => {
          const Icon = industry.icon;
          return (
            <motion.div
              key={industry.id}
              className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${industry.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: industry.color }} />
                </div>
                <h4 className="font-semibold text-sm">{industry.name}</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Revenue:</span>
                  <span className="ml-1 font-semibold">${industry.metrics.currentRevenue}M</span>
                </div>
                <div>
                  <span className="text-gray-400">Growth:</span>
                  <span className="ml-1 font-semibold text-green-400">+{industry.metrics.sutherland.growth}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Clients:</span>
                  <span className="ml-1 font-semibold">{industry.metrics.sutherland.clients}</span>
                </div>
                <div>
                  <span className="text-gray-400">NPS:</span>
                  <span className="ml-1 font-semibold">{industry.metrics.sutherland.nps}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="text-xs">
                  <span className="text-gray-400">Investment:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    industry.metrics.potential.investment === 'Growth' 
                      ? 'bg-green-600/20 text-green-400'
                      : industry.metrics.potential.investment === 'Maintenance'
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {industry.metrics.potential.investment}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Detailed Analysis Component
function DetailedAnalysis({ data }: any) {
  const [selectedIndustry, setSelectedIndustry] = useState(data[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Industry Selector */}
      <div className="lg:col-span-1">
        <h4 className="font-semibold mb-4">Select Industry</h4>
        <div className="space-y-2">
          {data.map((industry: any) => {
            const Icon = industry.icon;
            return (
              <motion.button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedIndustry.id === industry.id
                    ? 'bg-gray-700 border-2 border-blue-500'
                    : 'bg-gray-700/50 border-2 border-gray-600 hover:border-gray-500'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" style={{ color: industry.color }} />
                  <div className="flex-1">
                    <div className="font-medium">{industry.name}</div>
                    <div className="text-xs text-gray-400">
                      ${industry.metrics.currentRevenue}M • {industry.metrics.sutherland.growth}% growth
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2">{selectedIndustry.name}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Market Size: ${selectedIndustry.metrics.marketSize}B</span>
                <span>•</span>
                <span>Market Growth: {selectedIndustry.metrics.marketGrowth}% CAGR</span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h5 className="font-medium mb-3 text-sm text-gray-400">Current Performance</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue</span>
                    <span className="font-semibold">${selectedIndustry.metrics.currentRevenue}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Employees</span>
                    <span className="font-semibold">{selectedIndustry.metrics.sutherland.employees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Clients</span>
                    <span className="font-semibold">{selectedIndustry.metrics.sutherland.clients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">NPS Score</span>
                    <span className="font-semibold">{selectedIndustry.metrics.sutherland.nps}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <h5 className="font-medium mb-3 text-sm text-gray-400">Growth Potential</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Revenue</span>
                    <span className="font-semibold">${selectedIndustry.metrics.potential.revenueTarget}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Growth Range</span>
                    <span className="font-semibold text-green-400">{selectedIndustry.metrics.potential.growth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time to Impact</span>
                    <span className="font-semibold">{selectedIndustry.metrics.potential.timeToImpact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Risk Level</span>
                    <span className={`font-semibold ${
                      selectedIndustry.metrics.potential.risk === 'Low' ? 'text-green-400' :
                      selectedIndustry.metrics.potential.risk === 'Medium' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {selectedIndustry.metrics.potential.risk}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions & Strengths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h5 className="font-medium mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  Key Solutions
                </h5>
                <div className="space-y-1">
                  {selectedIndustry.metrics.sutherland.solutions.map((solution: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {solution}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <h5 className="font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-400" />
                  Strengths
                </h5>
                <div className="space-y-1">
                  {selectedIndustry.strengths.map((strength: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Opportunities */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h5 className="font-medium mb-3 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                Growth Opportunities
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedIndustry.opportunities.map((opp: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <ArrowUpRight className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{opp}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Comparison View Component
function ComparisonView({ data }: any) {
  const [metric, setMetric] = useState<'revenue' | 'growth' | 'risk' | 'potential'>('revenue');

  // Prepare scatter plot data for risk vs reward
  const scatterData = data.map((ind: any) => ({
    name: ind.name,
    x: ind.metrics.potential.risk === 'Low' ? 3 : ind.metrics.potential.risk === 'Medium' ? 6 : 9,
    y: parseInt(ind.metrics.potential.growth.split('-')[1]?.replace('%', '') || '0'),
    z: ind.metrics.potential.revenueTarget - ind.metrics.currentRevenue,
    color: ind.color
  }));

  return (
    <div>
      {/* Metric Selector */}
      <div className="flex gap-2 mb-6">
        {(['revenue', 'growth', 'risk', 'potential'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              metric === m 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)} Analysis
          </button>
        ))}
      </div>

      {metric === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current vs Potential Revenue */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-semibold mb-4">Revenue Comparison</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={data.map((ind: any) => ({
                    name: ind.name.split(' ')[0],
                    current: ind.metrics.currentRevenue,
                    potential: ind.metrics.potential.revenueTarget,
                    gap: ind.metrics.potential.revenueTarget - ind.metrics.currentRevenue
                  }))}
                  layout="horizontal"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis type="category" dataKey="name" stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                  />
                  <Bar dataKey="current" stackId="a" fill="#3B82F6" name="Current" />
                  <Bar dataKey="gap" stackId="a" fill="#10B981" name="Growth Potential" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Share */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-semibold mb-4">Market Share Distribution</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.map((ind: any) => ({
                      name: ind.name.split(' ')[0],
                      value: ind.metrics.currentRevenue,
                      color: ind.color
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {metric === 'growth' && (
        <div>
          <h4 className="font-semibold mb-4">Growth Rate Analysis</h4>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.map((ind: any) => ({
                industry: ind.name.split(' ')[0],
                growth: ind.metrics.sutherland.growth,
                marketGrowth: ind.metrics.marketGrowth,
                potential: parseInt(ind.metrics.potential.growth.split('-')[1]?.replace('%', '') || '0')
              }))}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="industry" stroke="#9CA3AF" />
                <PolarRadiusAxis stroke="#374151" />
                <Radar name="Current Growth" dataKey="growth" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar name="Market Growth" dataKey="marketGrowth" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Radar name="Potential Growth" dataKey="potential" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                <Legend />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {metric === 'risk' && (
        <div>
          <h4 className="font-semibold mb-4">Risk vs Reward Analysis</h4>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Risk Level" 
                  domain={[0, 12]}
                  ticks={[3, 6, 9]}
                  tickFormatter={(value) => value === 3 ? 'Low' : value === 6 ? 'Medium' : 'High'}
                  stroke="#9CA3AF"
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Growth Potential %" 
                  stroke="#9CA3AF"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-900 p-3 rounded border border-gray-700">
                          <p className="font-semibold">{data.name}</p>
                          <p className="text-sm">Risk: {data.x === 3 ? 'Low' : data.x === 6 ? 'Medium' : 'High'}</p>
                          <p className="text-sm">Growth Potential: {data.y}%</p>
                          <p className="text-sm">Revenue Opportunity: ${data.z}M</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Industries" data={scatterData} fill="#8884d8">
                  {scatterData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-400 text-center">
            Bubble size represents revenue opportunity ($M)
          </div>
        </div>
      )}

      {metric === 'potential' && (
        <div>
          <h4 className="font-semibold mb-4">Investment Priority Matrix</h4>
          <div className="grid grid-cols-3 gap-4">
            {(['Growth', 'Moderate', 'Maintenance'] as const).map((investment) => (
              <div key={investment} className="bg-gray-700/50 rounded-lg p-4">
                <h5 className={`font-semibold mb-3 ${
                  investment === 'Growth' ? 'text-green-400' :
                  investment === 'Moderate' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}>
                  {investment} Investment
                </h5>
                <div className="space-y-2">
                  {data
                    .filter((ind: any) => ind.metrics.potential.investment === investment)
                    .map((ind: any) => {
                      const Icon = ind.icon;
                      return (
                        <div key={ind.id} className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4" style={{ color: ind.color }} />
                          <span>{ind.name}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Industry Deep Dive Treemap
export function IndustryTreemap() {
  const [selectedView, setSelectedView] = useState<'market' | 'sutherland'>('market');

  const marketData = [
    {
      name: 'Healthcare',
      value: 359.3,
      children: [
        { name: 'Payer Services', value: 120 },
        { name: 'Provider Solutions', value: 100 },
        { name: 'Pharma Support', value: 80 },
        { name: 'Digital Health', value: 59.3 }
      ]
    },
    {
      name: 'CMT',
      value: 2300,
      children: [
        { name: '5G Services', value: 1200 },
        { name: 'Media Streaming', value: 600 },
        { name: 'Telecom Operations', value: 300 },
        { name: 'Tech Support', value: 200 }
      ]
    },
    {
      name: 'BFSI',
      value: 850,
      children: [
        { name: 'Digital Banking', value: 300 },
        { name: 'Insurance Tech', value: 250 },
        { name: 'Wealth Management', value: 200 },
        { name: 'Payments', value: 100 }
      ]
    },
    {
      name: 'Retail',
      value: 680,
      children: [
        { name: 'E-commerce', value: 400 },
        { name: 'Supply Chain', value: 150 },
        { name: 'Customer Analytics', value: 80 },
        { name: 'In-store Tech', value: 50 }
      ]
    }
  ];

  const sutherlandData = [
    {
      name: 'BFSI',
      value: 450,
      children: [
        { name: 'Banking Ops', value: 200 },
        { name: 'Insurance Claims', value: 150 },
        { name: 'Wealth Services', value: 100 }
      ]
    },
    {
      name: 'Healthcare',
      value: 380,
      children: [
        { name: 'Payer Services', value: 180 },
        { name: 'Clinical Support', value: 120 },
        { name: 'Revenue Cycle', value: 80 }
      ]
    },
    {
      name: 'Insurance',
      value: 320,
      children: [
        { name: 'Claims Processing', value: 150 },
        { name: 'Underwriting', value: 100 },
        { name: 'Customer Service', value: 70 }
      ]
    },
    {
      name: 'CMT',
      value: 280,
      children: [
        { name: 'Telecom Support', value: 140 },
        { name: 'Media Services', value: 80 },
        { name: 'Tech Solutions', value: 60 }
      ]
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#6366F1'];

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Industry Market Analysis</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('market')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedView === 'market' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            Market Size
          </button>
          <button
            onClick={() => setSelectedView('sutherland')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedView === 'sutherland' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            Comcast Revenue
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={selectedView === 'market' ? marketData : sutherlandData}
              dataKey="value"
              stroke="#fff"
              fill="#8884d8"
              content={({ root, depth, x, y, width, height, index, name, value }: any) => {
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      style={{
                        fill: COLORS[index % COLORS.length],
                        stroke: '#fff',
                        strokeWidth: 2,
                        strokeOpacity: 1,
                      }}
                    />
                    {width > 50 && height > 30 && (
                      <>
                        <text
                          x={x + width / 2}
                          y={y + height / 2 - 8}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={14}
                          fontWeight="bold"
                        >
                          {name}
                        </text>
                        <text
                          x={x + width / 2}
                          y={y + height / 2 + 8}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={12}
                        >
                          ${value}{selectedView === 'market' ? 'B' : 'M'}
                        </text>
                      </>
                    )}
                  </g>
                );
              }}
            />
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          {selectedView === 'market' 
            ? 'Total Addressable Market by Industry (in Billions)'
            : 'Comcast Revenue Distribution by Industry (in Millions)'}
        </div>
      </div>
    </div>
  );
}

// 5-Year Financial Projection Visualization
export function FinancialProjectionChart() {
  const projectionData = [
    { year: 'Year 1', revenue: 35, ebitda: 25, margin: 71 },
    { year: 'Year 2', revenue: 120, ebitda: 101, margin: 84 },
    { year: 'Year 3', revenue: 260, ebitda: 225, margin: 87 },
    { year: 'Year 4', revenue: 420, ebitda: 360, margin: 86 },
    { year: 'Year 5', revenue: 650, ebitda: 555, margin: 85 }
  ];

  const cumulativeData = projectionData.reduce((acc, curr, index) => {
    const prevRevenue = index > 0 ? acc[index - 1].cumRevenue : 0;
    const prevEbitda = index > 0 ? acc[index - 1].cumEbitda : 0;
    return [...acc, {
      ...curr,
      cumRevenue: prevRevenue + curr.revenue,
      cumEbitda: prevEbitda + curr.ebitda
    }];
  }, [] as any[]);

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">5-Year Financial Projections</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Annual Projections */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold mb-4">Annual Revenue & EBITDA</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" label={{ value: 'Amount ($M)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" label={{ value: 'Margin (%)', angle: 90, position: 'insideRight' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar yAxisId="left" dataKey="ebitda" fill="#10B981" name="EBITDA" />
                <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#F59E0B" strokeWidth={3} name="EBITDA Margin %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative Growth */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold mb-4">Cumulative Growth</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" label={{ value: 'Cumulative ($M)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Legend />
                <Area type="monotone" dataKey="cumRevenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Total Revenue" />
                <Area type="monotone" dataKey="cumEbitda" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Total EBITDA" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <motion.div 
          className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 rounded-lg p-4 border border-blue-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold">$1.485B</div>
          <div className="text-sm text-gray-400">5-Year Total Revenue</div>
        </motion.div>
        <motion.div 
          className="bg-gradient-to-br from-green-600/20 to-green-500/10 rounded-lg p-4 border border-green-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold">$1.266B</div>
          <div className="text-sm text-gray-400">5-Year Total EBITDA</div>
        </motion.div>
        <motion.div 
          className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 rounded-lg p-4 border border-purple-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold">85%</div>
          <div className="text-sm text-gray-400">Average EBITDA Margin</div>
        </motion.div>
        <motion.div 
          className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 rounded-lg p-4 border border-orange-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold">18.6x</div>
          <div className="text-sm text-gray-400">Revenue Growth (Y1 to Y5)</div>
        </motion.div>
      </div>
    </div>
  );
}

// Interactive Industry Opportunity Cards
export function IndustryOpportunityCards() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');

  const industries = [
    {
      id: 'healthcare',
      name: 'Healthcare & Life Sciences',
      subtitle: 'The Strong Foundation',
      icon: Heart,
      color: INDUSTRY_COLORS.healthcare,
      currentState: {
        revenue: '$380M',
        growth: '18%',
        clients: '150+',
        employees: '7,500',
        marketShare: 'Leader',
        maturity: 'Established'
      },
      strengths: [
        'SmartCred™ - 95% faster credentialing',
        'SmartHealthAnalytics platform',
        'E-Hub HIPAA-compliant exchange',
        '82+ financial services firms served'
      ],
      aiOpportunities: [
        {
          title: 'AI-Powered Clinical Decision Support',
          impact: 'High',
          timeframe: '3-6 months',
          description: 'Real-time clinical recommendations using LLMs trained on medical literature'
        },
        {
          title: 'Generative AI Patient Engagement',
          impact: 'Medium',
          timeframe: '2-4 months',
          description: 'Personalized patient communications and appointment scheduling'
        },
        {
          title: 'Intelligent Revenue Cycle Automation',
          impact: 'High',
          timeframe: '4-6 months',
          description: 'End-to-end RCM optimization with predictive denial management'
        },
        {
          title: 'Predictive Health Analytics Suite',
          impact: 'Very High',
          timeframe: '6-9 months',
          description: 'Population health management with risk stratification'
        }
      ],
      marketOpportunity: {
        size: '$557.8B by 2030',
        cagr: '6.5%',
        keyDrivers: ['Aging population', 'Digital health adoption', 'Value-based care']
      }
    },
    {
      id: 'cmt',
      name: 'Communications, Media & Technology',
      subtitle: 'The Untapped Opportunity',
      icon: Wifi,
      color: INDUSTRY_COLORS.cmt,
      currentState: {
        revenue: '$280M',
        growth: '25%',
        clients: '120+',
        employees: '5,000',
        marketShare: 'Emerging',
        maturity: 'Growth Stage'
      },
      strengths: [
        'Basic service offerings established',
        'Strong technical foundation',
        '5G operations expertise',
        'Network intelligence capabilities'
      ],
      aiOpportunities: [
        {
          title: 'AI-Driven Network Diagnostics',
          impact: 'Very High',
          timeframe: '2-3 months',
          description: 'Proactive network issue detection and self-healing systems'
        },
        {
          title: 'Content Personalization Engine',
          impact: 'High',
          timeframe: '3-4 months',
          description: 'Real-time content recommendations using viewer behavior analysis'
        },
        {
          title: 'GenAI Customer Support Agent',
          impact: 'High',
          timeframe: '1-2 months',
          description: 'Natural language support for complex technical queries'
        },
        {
          title: '5G Monetization Platform',
          impact: 'Very High',
          timeframe: '6-8 months',
          description: 'New revenue streams through edge computing and network slicing'
        }
      ],
      marketOpportunity: {
        size: '$2.3T by 2030',
        cagr: '12.5%',
        keyDrivers: ['5G rollout', 'GenAI adoption (50%+)', 'Digital transformation']
      }
    },
    {
      id: 'bfsi',
      name: 'Banking & Financial Services',
      subtitle: 'The Financial Experience Innovator',
      icon: Building2,
      color: INDUSTRY_COLORS.bfsi,
      currentState: {
        revenue: '$290M',
        growth: '15%',
        clients: '100+',
        employees: '6,000',
        marketShare: 'Established',
        maturity: 'Mature'
      },
      strengths: [
        'Risk & compliance expertise',
        'Digital banking solutions',
        'Payment processing scale',
        'Regulatory knowledge depth'
      ],
      aiOpportunities: [
        {
          title: 'AI Fraud Detection System',
          impact: 'Very High',
          timeframe: '3-4 months',
          description: 'Real-time transaction monitoring with ML anomaly detection'
        },
        {
          title: 'Intelligent Wealth Management',
          impact: 'High',
          timeframe: '4-6 months',
          description: 'Personalized investment recommendations and portfolio optimization'
        },
        {
          title: 'Regulatory Compliance Automation',
          impact: 'High',
          timeframe: '5-7 months',
          description: 'Automated reporting and compliance monitoring across jurisdictions'
        },
        {
          title: 'Conversational Banking Assistant',
          impact: 'Medium',
          timeframe: '2-3 months',
          description: 'Natural language interface for banking services and advice'
        }
      ],
      marketOpportunity: {
        size: '$8.5T global market',
        cagr: '8.5%',
        keyDrivers: ['Open banking', 'Digital payments', 'Embedded finance']
      }
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      subtitle: 'The Omnichannel Excellence Leader',
      icon: ShoppingCart,
      color: INDUSTRY_COLORS.retail,
      currentState: {
        revenue: '$220M',
        growth: '20%',
        clients: '80+',
        employees: '4,500',
        marketShare: 'Growing',
        maturity: 'Expanding'
      },
      strengths: [
        'Omnichannel support expertise',
        'Supply chain visibility',
        'Customer experience focus',
        'E-commerce platform knowledge'
      ],
      aiOpportunities: [
        {
          title: 'AI-Powered Demand Forecasting',
          impact: 'High',
          timeframe: '3-5 months',
          description: 'Predictive inventory management with weather and trend analysis'
        },
        {
          title: 'Virtual Shopping Assistant',
          impact: 'Medium',
          timeframe: '2-4 months',
          description: 'Personalized product recommendations and styling advice'
        },
        {
          title: 'Dynamic Pricing Optimization',
          impact: 'Very High',
          timeframe: '4-6 months',
          description: 'Real-time pricing based on demand, competition, and inventory'
        },
        {
          title: 'Supply Chain Intelligence',
          impact: 'High',
          timeframe: '5-7 months',
          description: 'End-to-end visibility with predictive disruption alerts'
        }
      ],
      marketOpportunity: {
        size: '$31T by 2025',
        cagr: '10.5%',
        keyDrivers: ['E-commerce growth', 'Social commerce', 'Sustainability focus']
      }
    },
    {
      id: 'insurance',
      name: 'Insurance',
      subtitle: 'The Risk Innovation Partner',
      icon: Shield,
      color: INDUSTRY_COLORS.insurance,
      currentState: {
        revenue: '$180M',
        growth: '12%',
        clients: '60+',
        employees: '3,500',
        marketShare: 'Niche Player',
        maturity: 'Developing'
      },
      strengths: [
        'Claims processing efficiency',
        'Underwriting support',
        'Customer service excellence',
        'Multi-line expertise'
      ],
      aiOpportunities: [
        {
          title: 'AI Underwriting Engine',
          impact: 'Very High',
          timeframe: '4-6 months',
          description: 'Automated risk assessment with alternative data sources'
        },
        {
          title: 'Claims Automation Platform',
          impact: 'High',
          timeframe: '3-5 months',
          description: 'End-to-end claims processing with image recognition and NLP'
        },
        {
          title: 'Predictive Risk Modeling',
          impact: 'High',
          timeframe: '5-7 months',
          description: 'Climate and behavioral risk prediction for better pricing'
        },
        {
          title: 'Digital Insurance Advisor',
          impact: 'Medium',
          timeframe: '2-3 months',
          description: 'Personalized coverage recommendations and policy management'
        }
      ],
      marketOpportunity: {
        size: '$7.5T global premiums',
        cagr: '7%',
        keyDrivers: ['Insurtech disruption', 'Embedded insurance', 'Climate risks']
      }
    }
  ];

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry);

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Industry Innovation Opportunities</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <Layers className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'detailed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.id}
                className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border-2 border-gray-700 hover:border-${industry.id === 'healthcare' ? 'red' : industry.id === 'cmt' ? 'blue' : industry.id === 'bfsi' ? 'green' : industry.id === 'retail' ? 'yellow' : 'lime'}-500/50 cursor-pointer`}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedIndustry(industry.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${industry.color}20` }}>
                    <Icon className="w-8 h-8" style={{ color: industry.color }} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    industry.currentState.maturity === 'Established' ? 'bg-green-500/20 text-green-300' :
                    industry.currentState.maturity === 'Growth Stage' ? 'bg-blue-500/20 text-blue-300' :
                    industry.currentState.maturity === 'Mature' ? 'bg-purple-500/20 text-purple-300' :
                    industry.currentState.maturity === 'Expanding' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {industry.currentState.maturity}
                  </span>
                </div>

                <h4 className="text-xl font-semibold mb-1">{industry.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{industry.subtitle}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-lg font-bold" style={{ color: industry.color }}>
                      {industry.currentState.revenue}
                    </div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-400">
                      +{industry.currentState.growth}
                    </div>
                    <div className="text-xs text-gray-500">Growth</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Market Opportunity</span>
                    <span className="text-sm font-medium">{industry.marketOpportunity.cagr} CAGR</span>
                  </div>
                  <div className="text-lg font-semibold">{industry.marketOpportunity.size}</div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="text-sm font-medium mb-2">AI Innovation Opportunities</div>
                  <div className="space-y-1">
                    {industry.aiOpportunities.slice(0, 2).map((opp, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3" style={{ color: industry.color }} />
                        <span className="text-xs text-gray-400 truncate">{opp.title}</span>
                      </div>
                    ))}
                    <div className="text-xs text-gray-500">
                      +{industry.aiOpportunities.length - 2} more opportunities
                    </div>
                  </div>
                </div>

                <motion.div 
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-medium"
                  style={{ color: industry.color }}
                >
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border-2 border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Overview */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${industry.color}20` }}>
                        <Icon className="w-8 h-8" style={{ color: industry.color }} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold">{industry.name}</h4>
                        <p className="text-sm text-gray-400">{industry.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue</span>
                        <span className="font-medium">{industry.currentState.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate</span>
                        <span className="font-medium text-green-400">+{industry.currentState.growth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Clients</span>
                        <span className="font-medium">{industry.currentState.clients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Employees</span>
                        <span className="font-medium">{industry.currentState.employees}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-sm font-medium mb-1">Market Opportunity</div>
                      <div className="text-lg font-bold" style={{ color: industry.color }}>
                        {industry.marketOpportunity.size}
                      </div>
                      <div className="text-sm text-gray-400">{industry.marketOpportunity.cagr} CAGR</div>
                    </div>
                  </div>

                  {/* Middle: Strengths */}
                  <div>
                    <h5 className="font-medium mb-3">Current Strengths</h5>
                    <div className="space-y-2">
                      {industry.strengths.map((strength, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Award className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: industry.color }} />
                          <span className="text-sm text-gray-300">{strength}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Key Market Drivers</h5>
                      <div className="flex flex-wrap gap-2">
                        {industry.marketOpportunity.keyDrivers.map((driver, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gray-800 rounded-full text-xs"
                          >
                            {driver}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: AI Opportunities */}
                  <div>
                    <h5 className="font-medium mb-3">AI Innovation Opportunities</h5>
                    <div className="space-y-3">
                      {industry.aiOpportunities.map((opp, idx) => (
                        <motion.div
                          key={idx}
                          className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h6 className="font-medium text-sm">{opp.title}</h6>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              opp.impact === 'Very High' ? 'bg-red-500/20 text-red-300' :
                              opp.impact === 'High' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {opp.impact}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{opp.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {opp.timeframe}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal */}
      <AnimatePresence>
        {selectedIndustry && selectedIndustryData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndustry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${selectedIndustryData.color}20` }}>
                    <selectedIndustryData.icon className="w-10 h-10" style={{ color: selectedIndustryData.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedIndustryData.name}</h3>
                    <p className="text-gray-400">{selectedIndustryData.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIndustry(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current State */}
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Current State Assessment</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedIndustryData.currentState).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium mb-3">Key Strengths</h5>
                    <div className="space-y-2">
                      {selectedIndustryData.strengths.map((strength, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Award className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: selectedIndustryData.color }} />
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Market Opportunity */}
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Market Opportunity</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold" style={{ color: selectedIndustryData.color }}>
                        {selectedIndustryData.marketOpportunity.size}
                      </div>
                      <div className="text-gray-400">Market Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">
                        {selectedIndustryData.marketOpportunity.cagr}
                      </div>
                      <div className="text-gray-400">Annual Growth Rate</div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Key Market Drivers</h5>
                      <div className="space-y-2">
                        {selectedIndustryData.marketOpportunity.keyDrivers.map((driver, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm">{driver}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Opportunities */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">AI Innovation Opportunities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedIndustryData.aiOpportunities.map((opp, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium">{opp.title}</h5>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          opp.impact === 'Very High' ? 'bg-red-500/20 text-red-300' :
                          opp.impact === 'High' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {opp.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{opp.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {opp.timeframe}
                        </div>
                        <Rocket className="w-4 h-4" style={{ color: selectedIndustryData.color }} />
                      </div>
                    </motion.div>
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