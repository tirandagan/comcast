'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Treemap, ComposedChart, Area
} from 'recharts';
import { 
  Building2, Users, Lightbulb, TrendingUp, Shield, 
  AlertTriangle, Target, Zap, Globe, Brain, Layers,
  ChevronRight, ArrowUpRight, Award, Sparkles
} from 'lucide-react';

const COLORS = {
  strengths: '#10B981',
  weaknesses: '#EF4444',
  opportunities: '#3B82F6',
  threats: '#F59E0B',
  gradient: {
    green: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    red: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    blue: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    yellow: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  }
};

// Enhanced SWOT Matrix with detailed breakdown
export function DetailedSWOTMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('strengths');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const swotData = {
    strengths: {
      title: 'Strengths',
      icon: Shield,
      items: [
        {
          title: 'Global Scale & Reach',
          metrics: { employees: 40000, locations: 60, countries: 144 },
          details: 'Established presence across all major markets with deep local expertise'
        },
        {
          title: 'Innovation Infrastructure',
          metrics: { patents: 200, labs: 3, centers: 5 },
          details: 'Robust innovation ecosystem with dedicated labs and acceleration centers'
        },
        {
          title: 'Domain Expertise',
          metrics: { industries: 9, experience: '37 years', clients: 500 },
          details: 'Deep expertise across 9 industry verticals with proven track record'
        },
        {
          title: 'Technology Platforms',
          metrics: { platforms: 6, integrations: 50, apis: 100 },
          details: 'Proprietary platforms including Robility®, CX360®, and Agent Assist AI'
        }
      ]
    },
    weaknesses: {
      title: 'Weaknesses',
      icon: AlertTriangle,
      items: [
        {
          title: 'Fragmented Innovation',
          impact: 'High',
          details: 'Innovation efforts scattered across business units without central coordination'
        },
        {
          title: 'AI/ML Talent Gap',
          impact: 'Critical',
          details: 'Limited deep expertise in cutting-edge AI/ML technologies at scale'
        },
        {
          title: 'Traditional Mindset',
          impact: 'Medium',
          details: 'Parts of organization still operating with traditional BPO service mindset'
        },
        {
          title: 'Slow Decision Making',
          impact: 'Medium',
          details: 'Complex organizational structure leading to slower innovation cycles'
        }
      ]
    },
    opportunities: {
      title: 'Opportunities',
      icon: TrendingUp,
      items: [
        {
          title: 'AI Services Market',
          value: '$150B',
          growth: '+35% CAGR',
          details: 'Explosive growth in demand for AI-enabled business services'
        },
        {
          title: 'Digital Transformation',
          value: '$2.8T',
          growth: '+20% CAGR',
          details: 'Enterprises seeking partners for comprehensive digital transformation'
        },
        {
          title: 'Industry 4.0',
          value: '$200B',
          growth: '+25% CAGR',
          details: 'Manufacturing and industrial sectors embracing AI and automation'
        },
        {
          title: 'Emerging Technologies',
          value: '$500B',
          growth: '+40% CAGR',
          details: 'New opportunities in quantum, blockchain, and edge computing'
        }
      ]
    },
    threats: {
      title: 'Threats',
      icon: Zap,
      items: [
        {
          title: 'Tech-Native Competition',
          severity: 'High',
          details: 'Cloud providers and tech giants entering BPO space with AI-first approach'
        },
        {
          title: 'Talent War',
          severity: 'Critical',
          details: 'Intense competition for AI/ML talent driving up costs and turnover'
        },
        {
          title: 'Technology Disruption',
          severity: 'Medium',
          details: 'Rapid AI advancement potentially commoditizing traditional services'
        },
        {
          title: 'Client Expectations',
          severity: 'High',
          details: 'Rising expectations for innovation speed and business impact'
        }
      ]
    }
  };

  const currentData = swotData[selectedQuadrant as keyof typeof swotData];

  return (
    <div className="my-8 space-y-6">
      <h3 className="text-2xl font-bold mb-6">Interactive SWOT Analysis</h3>
      
      {/* Quadrant Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(swotData).map(([key, data]) => {
          const Icon = data.icon;
          return (
            <motion.button
              key={key}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedQuadrant === key
                  ? `bg-gradient-to-br ${
                      key === 'strengths' ? 'from-green-600/30 to-green-500/20 border-green-500' :
                      key === 'weaknesses' ? 'from-red-600/30 to-red-500/20 border-red-500' :
                      key === 'opportunities' ? 'from-blue-600/30 to-blue-500/20 border-blue-500' :
                      'from-yellow-600/30 to-yellow-500/20 border-yellow-500'
                    }`
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
              onClick={() => {
                setSelectedQuadrant(key);
                setSelectedItem(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">{data.title}</p>
              <p className="text-sm text-gray-400 mt-1">{data.items.length} factors</p>
            </motion.button>
          );
        })}
      </div>

      {/* Detailed View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedQuadrant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/5 rounded-xl p-6 border border-white/20"
        >
          <div className="grid gap-4">
            {currentData.items.map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedItem === index
                    ? 'bg-white/10 border-white/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    selectedItem === index ? 'rotate-90' : ''
                  }`} />
                </div>
                
                {/* Metrics or Impact/Value */}
                <div className="mt-2 flex gap-4">
                  {'metrics' in item ? (
                    Object.entries(item.metrics).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-gray-400 capitalize">{key}: </span>
                        <span className="font-semibold">{typeof value === 'number' ? value.toLocaleString() : value}</span>
                      </div>
                    ))
                  ) : 'impact' in item ? (
                    <div className="text-sm">
                      <span className="text-gray-400">Impact: </span>
                      <span className={`font-semibold ${
                        item.impact === 'Critical' ? 'text-red-400' :
                        item.impact === 'High' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>{item.impact}</span>
                    </div>
                  ) : 'value' in item ? (
                    <>
                      <div className="text-sm">
                        <span className="text-gray-400">Market Size: </span>
                        <span className="font-semibold text-green-400">{item.value}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400">Growth: </span>
                        <span className="font-semibold text-blue-400">{item.growth}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm">
                      <span className="text-gray-400">Severity: </span>
                      <span className={`font-semibold ${
                        item.severity === 'Critical' ? 'text-red-400' :
                        item.severity === 'High' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>{item.severity}</span>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {selectedItem === index && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 text-gray-300"
                    >
                      {item.details}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Innovation Capability Assessment
export function InnovationCapabilityRadar() {
  const data = [
    { capability: 'Technology Infrastructure', current: 3.5, target: 4.8, industry: 4.2 },
    { capability: 'Data & Analytics', current: 3.2, target: 4.7, industry: 4.0 },
    { capability: 'AI/ML Expertise', current: 2.8, target: 4.8, industry: 4.3 },
    { capability: 'Innovation Culture', current: 3.0, target: 4.6, industry: 4.1 },
    { capability: 'Agile Delivery', current: 3.4, target: 4.7, industry: 4.2 },
    { capability: 'Partner Ecosystem', current: 3.6, target: 4.5, industry: 4.0 },
    { capability: 'Client Co-creation', current: 3.8, target: 4.8, industry: 4.1 },
    { capability: 'IP Development', current: 3.3, target: 4.6, industry: 3.9 },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Capability Assessment</h3>
      <div className="bg-white/5 rounded-xl p-6 border border-white/20">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data}>
                <PolarGrid strokeDasharray="3 3" stroke="#374151" />
                <PolarAngleAxis dataKey="capability" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 5]} 
                  stroke="#9CA3AF"
                  tickCount={6}
                />
                <Radar 
                  name="Current State" 
                  dataKey="current" 
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar 
                  name="Target State" 
                  dataKey="target" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar 
                  name="Industry Average" 
                  dataKey="industry" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold mb-3">Capability Gap Analysis</h4>
            {data.slice(0, 5).map((item) => {
              const gap = item.target - item.current;
              const gapPercent = (gap / item.target) * 100;
              return (
                <div key={item.capability} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{item.capability}</span>
                    <span className={`text-xs font-semibold ${
                      gap > 1.5 ? 'text-red-400' : gap > 1 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      Gap: {gap.toFixed(1)}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute h-full bg-gradient-to-r from-red-500 to-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((item.current / 5) * 100)}%` }}
                      transition={{ duration: 1 }}
                    />
                    <div 
                      className="absolute h-full w-0.5 bg-blue-400"
                      style={{ left: `${(item.industry / 5) * 100}%` }}
                    />
                    <div 
                      className="absolute h-full w-1 bg-green-400"
                      style={{ left: `${(item.target / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Organizational Structure for Innovation
export function InnovationOrgChart() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const orgStructure = {
    ceo: {
      title: 'CEO & Chairman',
      name: 'Dilip Vellodi',
      direct: ['cio', 'cco', 'vertical_heads'],
    },
    cio: {
      title: 'CIO & CDO',
      name: 'Doug Gilbert',
      role: 'Technology & Digital Strategy',
      teams: ['Innovation Labs', 'Digital Centers', 'Technology Platforms'],
    },
    cco: {
      title: 'Chief Commercial Officer',
      name: 'K.S. Kumar',
      role: 'Business Development & Partnerships',
      teams: ['Strategic Accounts', 'Partner Alliances', 'New Markets'],
    },
    vertical_heads: {
      title: 'Industry Vertical CEOs',
      members: [
        { name: 'Sriram Panchapakesan', verticals: 'Tech, Media, Utilities' },
        { name: 'Banwari Agarwal', verticals: 'BFSI & Retail' },
        { name: 'Makesh Bharadwaj', verticals: 'Healthcare & Life Sciences' },
        { name: 'Dipankar Sengupta', verticals: 'Digital Engineering' },
      ],
    },
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Leadership Structure</h3>
      
      <div className="bg-white/5 rounded-xl p-8 border border-white/20">
        {/* CEO Level */}
        <motion.div 
          className="text-center mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <div className="inline-block bg-gradient-to-br from-purple-600/30 to-purple-500/20 rounded-lg p-6 border-2 border-purple-500">
            <Building2 className="w-12 h-12 mx-auto mb-2 text-purple-400" />
            <h4 className="font-bold text-lg">{orgStructure.ceo.title}</h4>
            <p className="text-gray-300">{orgStructure.ceo.name}</p>
          </div>
        </motion.div>

        {/* Direct Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CIO */}
          <motion.div
            className={`bg-white/5 rounded-lg p-4 border cursor-pointer ${
              selectedNode === 'cio' ? 'border-blue-500 bg-blue-500/10' : 'border-white/20'
            }`}
            onClick={() => setSelectedNode(selectedNode === 'cio' ? null : 'cio')}
            whileHover={{ y: -4 }}
          >
            <Brain className="w-8 h-8 mb-2 text-blue-400" />
            <h5 className="font-semibold">{orgStructure.cio.title}</h5>
            <p className="text-sm text-gray-300">{orgStructure.cio.name}</p>
            <p className="text-xs text-gray-400 mt-1">{orgStructure.cio.role}</p>
            
            <AnimatePresence>
              {selectedNode === 'cio' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-white/20"
                >
                  <p className="text-xs font-semibold mb-2">Key Teams:</p>
                  {orgStructure.cio.teams.map((team) => (
                    <div key={team} className="text-xs text-gray-300 mb-1">• {team}</div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CCO */}
          <motion.div
            className={`bg-white/5 rounded-lg p-4 border cursor-pointer ${
              selectedNode === 'cco' ? 'border-green-500 bg-green-500/10' : 'border-white/20'
            }`}
            onClick={() => setSelectedNode(selectedNode === 'cco' ? null : 'cco')}
            whileHover={{ y: -4 }}
          >
            <Target className="w-8 h-8 mb-2 text-green-400" />
            <h5 className="font-semibold">{orgStructure.cco.title}</h5>
            <p className="text-sm text-gray-300">{orgStructure.cco.name}</p>
            <p className="text-xs text-gray-400 mt-1">{orgStructure.cco.role}</p>
            
            <AnimatePresence>
              {selectedNode === 'cco' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-white/20"
                >
                  <p className="text-xs font-semibold mb-2">Focus Areas:</p>
                  {orgStructure.cco.teams.map((team) => (
                    <div key={team} className="text-xs text-gray-300 mb-1">• {team}</div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Vertical Heads */}
          <motion.div
            className={`bg-white/5 rounded-lg p-4 border cursor-pointer ${
              selectedNode === 'verticals' ? 'border-orange-500 bg-orange-500/10' : 'border-white/20'
            }`}
            onClick={() => setSelectedNode(selectedNode === 'verticals' ? null : 'verticals')}
            whileHover={{ y: -4 }}
          >
            <Layers className="w-8 h-8 mb-2 text-orange-400" />
            <h5 className="font-semibold">{orgStructure.vertical_heads.title}</h5>
            <p className="text-sm text-gray-300">4 Industry Leaders</p>
            <p className="text-xs text-gray-400 mt-1">P&L Ownership</p>
            
            <AnimatePresence>
              {selectedNode === 'verticals' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-white/20 space-y-2"
                >
                  {orgStructure.vertical_heads.members.map((member) => (
                    <div key={member.name} className="text-xs">
                      <p className="font-semibold text-gray-200">{member.name}</p>
                      <p className="text-gray-400">{member.verticals}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Innovation Ecosystem */}
        <div className="border-t border-white/20 pt-6">
          <h4 className="text-lg font-semibold mb-4 text-center">Innovation Ecosystem</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Sutherland Labs', icon: Lightbulb, count: '3 locations' },
              { name: 'Digital Centers', icon: Zap, count: '5 centers' },
              { name: 'Innovation Council', icon: Users, count: '12 members' },
              { name: 'Patent Office', icon: Award, count: '200+ patents' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.count}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Innovation Maturity by Business Unit
export function BusinessUnitMaturity() {
  const data = [
    { unit: 'Banking & Financial', innovation: 3.8, digital: 4.2, ai: 3.5, overall: 3.83 },
    { unit: 'Healthcare', innovation: 4.2, digital: 3.8, ai: 3.2, overall: 3.73 },
    { unit: 'Insurance', innovation: 3.5, digital: 3.9, ai: 3.0, overall: 3.47 },
    { unit: 'Technology', innovation: 4.5, digital: 4.6, ai: 4.2, overall: 4.43 },
    { unit: 'Retail', innovation: 3.6, digital: 4.0, ai: 3.3, overall: 3.63 },
    { unit: 'Telecom', innovation: 3.7, digital: 4.1, ai: 3.4, overall: 3.73 },
  ];

  const [viewMode, setViewMode] = useState<'grouped' | 'stacked'>('grouped');

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Maturity by Business Unit</h3>
      
      <div className="bg-white/5 rounded-xl p-6 border border-white/20">
        <div className="flex justify-end mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'grouped' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              Grouped
            </button>
            <button
              onClick={() => setViewMode('stacked')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'stacked' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              Overall Score
            </button>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'grouped' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="unit" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9CA3AF" domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Legend />
                <Bar dataKey="innovation" fill="#3B82F6" name="Innovation" />
                <Bar dataKey="digital" fill="#10B981" name="Digital" />
                <Bar dataKey="ai" fill="#F59E0B" name="AI/ML" />
              </BarChart>
            ) : (
              <BarChart data={data.sort((a, b) => b.overall - a.overall)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="unit" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9CA3AF" domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Bar dataKey="overall" name="Overall Score">
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.overall >= 4 ? '#10B981' :
                        entry.overall >= 3.5 ? '#3B82F6' :
                        '#F59E0B'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">Leaders (4.0+)</p>
            <p className="text-2xl font-bold text-green-400">1</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Developing (3.5-4.0)</p>
            <p className="text-2xl font-bold text-blue-400">4</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Emerging (&lt;3.5)</p>
            <p className="text-2xl font-bold text-yellow-400">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Innovation Investment Distribution
export function InnovationInvestmentFlow() {
  const investmentData = [
    { name: 'R&D Budget', value: 120, children: [
      { name: 'AI/ML Research', value: 45 },
      { name: 'Platform Development', value: 35 },
      { name: 'Process Innovation', value: 25 },
      { name: 'Emerging Tech', value: 15 },
    ]},
    { name: 'Innovation Labs', value: 80, children: [
      { name: 'Bangalore Lab', value: 30 },
      { name: 'San Francisco Lab', value: 25 },
      { name: 'London Lab', value: 25 },
    ]},
    { name: 'Partnerships', value: 60, children: [
      { name: 'Academic', value: 20 },
      { name: 'Technology', value: 25 },
      { name: 'Startups', value: 15 },
    ]},
    { name: 'Training & Skills', value: 40, children: [
      { name: 'AI/ML Training', value: 20 },
      { name: 'Leadership Programs', value: 12 },
      { name: 'Certifications', value: 8 },
    ]},
  ];

  const flatData = investmentData.flatMap(category => 
    category.children.map(item => ({
      category: category.name,
      name: item.name,
      value: item.value,
    }))
  );

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Investment Distribution ($M)</h3>
      
      <div className="bg-white/5 rounded-xl p-6 border border-white/20">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={flatData}
              dataKey="value"
              aspectRatio={4/3}
              stroke="#fff"
              fill="#3B82F6"
              content={({ x, y, width, height, value, name, category }) => {
                const fontSize = width > 80 ? 12 : 10;
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      style={{
                        fill: category === 'R&D Budget' ? '#3B82F6' :
                              category === 'Innovation Labs' ? '#10B981' :
                              category === 'Partnerships' ? '#F59E0B' :
                              '#EF4444',
                        stroke: '#fff',
                        strokeWidth: 2,
                        strokeOpacity: 1,
                      }}
                    />
                    {width > 50 && height > 30 && (
                      <>
                        <text
                          x={x + width / 2}
                          y={y + height / 2 - 6}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={fontSize}
                          fontWeight="bold"
                        >
                          {name}
                        </text>
                        <text
                          x={x + width / 2}
                          y={y + height / 2 + 10}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={fontSize}
                        >
                          ${value}M
                        </text>
                      </>
                    )}
                  </g>
                );
              }}
            />
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {investmentData.map((category) => (
            <div key={category.name} className="text-center">
              <p className="text-sm text-gray-400">{category.name}</p>
              <p className="text-xl font-bold">${category.value}M</p>
              <p className="text-xs text-gray-500">{Math.round((category.value / 300) * 100)}% of total</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Innovation Success Metrics
export function InnovationMetricsDashboard() {
  const metrics = [
    {
      category: 'Innovation Output',
      kpis: [
        { name: 'Patents Filed', value: 45, target: 50, unit: 'per year' },
        { name: 'Prototypes Built', value: 82, target: 100, unit: 'per year' },
        { name: 'Ideas Generated', value: 320, target: 400, unit: 'per year' },
      ]
    },
    {
      category: 'Business Impact',
      kpis: [
        { name: 'Revenue from Innovation', value: 12, target: 20, unit: '% of total' },
        { name: 'Cost Savings', value: 85, target: 100, unit: '$M' },
        { name: 'Client Satisfaction', value: 4.2, target: 4.5, unit: '/5' },
      ]
    },
    {
      category: 'Speed & Efficiency',
      kpis: [
        { name: 'Time to Market', value: 6.5, target: 4, unit: 'months' },
        { name: 'Prototype Success Rate', value: 35, target: 50, unit: '%' },
        { name: 'Innovation ROI', value: 2.8, target: 4, unit: 'x' },
      ]
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Performance Metrics</h3>
      
      <div className="grid gap-6">
        {metrics.map((category) => (
          <div key={category.category} className="bg-white/5 rounded-xl p-6 border border-white/20">
            <h4 className="text-lg font-semibold mb-4">{category.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.kpis.map((kpi) => {
                const achievement = (kpi.value / kpi.target) * 100;
                const isReverse = kpi.name === 'Time to Market'; // Lower is better
                const adjustedAchievement = isReverse ? (kpi.target / kpi.value) * 100 : achievement;
                
                return (
                  <motion.div
                    key={kpi.name}
                    className="bg-white/5 rounded-lg p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-sm">{kpi.name}</h5>
                      <ArrowUpRight className={`w-4 h-4 ${
                        adjustedAchievement >= 100 ? 'text-green-400' :
                        adjustedAchievement >= 80 ? 'text-yellow-400' :
                        'text-red-400'
                      }`} />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold">{kpi.value}</span>
                      <span className="text-sm text-gray-400">{kpi.unit}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">Target: {kpi.target}</div>
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          adjustedAchievement >= 100 ? 'bg-green-500' :
                          adjustedAchievement >= 80 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(adjustedAchievement, 100)}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}