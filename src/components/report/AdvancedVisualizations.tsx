'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadialBarChart, RadialBar, ComposedChart,
  ScatterChart, Scatter, ZAxis, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell, ReferenceLine,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Layers, TrendingUp, Users, Globe, 
  DollarSign, Brain, Sparkles, Target,
  ChevronRight, Info, ArrowUpRight, Activity
} from 'lucide-react';

const COLORS = {
  primary: ['#3B82F6', '#60A5FA', '#93BBFC', '#C7D2FE'],
  secondary: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
  accent: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
  danger: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'],
  gradient: {
    blue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    green: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    orange: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  }
};

// AI Maturity Assessment
export function AIMaturityAssessment() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  
  const dimensions = [
    { name: 'Data Infrastructure', current: 3.2, target: 4.5, gap: 1.3 },
    { name: 'AI/ML Capabilities', current: 2.8, target: 4.7, gap: 1.9 },
    { name: 'Innovation Culture', current: 3.5, target: 4.6, gap: 1.1 },
    { name: 'Process Automation', current: 3.8, target: 4.8, gap: 1.0 },
    { name: 'Talent & Skills', current: 2.5, target: 4.5, gap: 2.0 },
    { name: 'Partnership Ecosystem', current: 3.0, target: 4.4, gap: 1.4 },
  ];

  const data = dimensions.map(d => ({
    dimension: d.name,
    Current: d.current,
    Target: d.target,
    fullMark: 5,
  }));

  return (
    <div className="my-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-white/10">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Brain className="w-6 h-6 text-blue-400" />
        AI Maturity Assessment
      </h3>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid strokeDasharray="3 3" stroke="#374151" />
              <PolarAngleAxis dataKey="dimension" stroke="#9CA3AF" />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 5]} 
                stroke="#9CA3AF"
                tickCount={6}
              />
              <Radar 
                name="Current State" 
                dataKey="Current" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Target State" 
                dataKey="Target" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.2}
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
          <h4 className="text-lg font-semibold mb-3">Maturity Gap Analysis</h4>
          {dimensions.map((dim, index) => (
            <motion.div
              key={dim.name}
              className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => setSelectedDimension(dim.name)}
              whileHover={{ x: 4 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{dim.name}</span>
                <span className="text-sm text-red-400">Gap: {dim.gap}</span>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(dim.current / 5) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
                <div 
                  className="absolute h-full w-1 bg-green-400"
                  style={{ left: `${(dim.target / 5) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Innovation Investment ROI
export function InnovationROI() {
  const investments = [
    { category: 'AI/ML Platforms', investment: 2.5, returnValue: 8.2, roi: 228 },
    { category: 'Process Automation', investment: 1.8, returnValue: 5.4, roi: 200 },
    { category: 'Training & Skills', investment: 1.2, returnValue: 3.8, roi: 217 },
    { category: 'Innovation Labs', investment: 2.0, returnValue: 6.5, roi: 225 },
    { category: 'Partnerships', investment: 0.8, returnValue: 2.8, roi: 250 },
  ];

  const bubbleData = investments.map(inv => ({
    x: inv.investment,
    y: inv.returnValue,
    z: inv.roi,
    name: inv.category,
  }));

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-green-400" />
        Innovation Investment ROI Analysis
      </h3>
      
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-white/10">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="x" 
                name="Investment ($M)" 
                stroke="#9CA3AF"
                label={{ value: 'Investment ($M)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="y" 
                name="Return Value ($M)" 
                stroke="#9CA3AF"
                label={{ value: 'Return Value ($M)', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis dataKey="z" range={[100, 400]} name="ROI %" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm">Investment: ${data.x}M</p>
                        <p className="text-sm">Return: ${data.y}M</p>
                        <p className="text-sm text-green-400">ROI: {data.z}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                name="Innovation Categories" 
                data={bubbleData} 
                fill="#10B981"
              >
                {bubbleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.secondary[index % COLORS.secondary.length]} />
                ))}
              </Scatter>
              <ReferenceLine 
                x={0} 
                y={0} 
                stroke="#666"
                strokeDasharray="3 3"
                label="Break-even"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-gray-400">Total Investment</p>
            <p className="text-2xl font-bold text-white">$8.3M</p>
            <p className="text-xs text-green-400 mt-1">+15% vs last year</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-gray-400">Total Return</p>
            <p className="text-2xl font-bold text-white">$26.7M</p>
            <p className="text-xs text-green-400 mt-1">+32% vs last year</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-gray-400">Average ROI</p>
            <p className="text-2xl font-bold text-green-400">224%</p>
            <p className="text-xs text-green-400 mt-1">Above industry avg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Competitive Positioning Matrix
export function CompetitivePositioning() {
  const competitors = [
    { name: 'Comcast (Current)', innovation: 3.2, execution: 3.8, size: 40 },
    { name: 'Comcast (Target)', innovation: 4.6, execution: 4.5, size: 60 },
    { name: 'Accenture', innovation: 4.5, execution: 4.7, size: 100 },
    { name: 'TCS', innovation: 3.8, execution: 4.5, size: 80 },
    { name: 'Infosys', innovation: 4.0, execution: 4.3, size: 70 },
    { name: 'Cognizant', innovation: 3.9, execution: 4.2, size: 75 },
    { name: 'Wipro', innovation: 3.5, execution: 4.0, size: 65 },
    { name: 'Tech Mahindra', innovation: 3.6, execution: 3.8, size: 45 },
  ];

  const [hoveredCompetitor, setHoveredCompetitor] = useState<string | null>(null);

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-purple-400" />
        Competitive Positioning Matrix
      </h3>
      
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-white/10">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="execution" 
                name="Execution Excellence" 
                stroke="#9CA3AF"
                domain={[3, 5]}
                label={{ value: 'Execution Excellence →', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="innovation" 
                name="Innovation Leadership" 
                stroke="#9CA3AF"
                domain={[3, 5]}
                label={{ value: 'Innovation Leadership →', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis dataKey="size" range={[200, 800]} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm">Innovation: {data.innovation}/5</p>
                        <p className="text-sm">Execution: {data.execution}/5</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                name="Competitors" 
                data={competitors} 
                fill="#8884d8"
                onMouseEnter={(data) => setHoveredCompetitor(data.name)}
                onMouseLeave={() => setHoveredCompetitor(null)}
              >
                {competitors.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.name.includes('Comcast (Target)') ? '#10B981' :
                      entry.name.includes('Comcast (Current)') ? '#3B82F6' :
                      '#6B7280'
                    }
                    fillOpacity={hoveredCompetitor === entry.name ? 1 : 0.7}
                  />
                ))}
              </Scatter>
              {/* Quadrant labels */}
              <ReferenceLine x={4} stroke="#666" strokeDasharray="3 3" />
              <ReferenceLine y={4} stroke="#666" strokeDasharray="3 3" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-sm">Current Position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-sm">Target Position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500" />
            <span className="text-sm">Competitors</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Digital Transformation Journey
export function TransformationJourney() {
  const milestones = [
    { 
      phase: 'Foundation', 
      quarter: 'Q1-Q2 2024', 
      status: 'completed',
      initiatives: ['Innovation Governance', 'Team Formation', 'Technology Stack'],
      progress: 100
    },
    { 
      phase: 'Quick Wins', 
      quarter: 'Q3-Q4 2024', 
      status: 'active',
      initiatives: ['First AI Prototypes', 'Process Automation', 'Skills Training'],
      progress: 45
    },
    { 
      phase: 'Scale', 
      quarter: 'Q1-Q2 2025', 
      status: 'upcoming',
      initiatives: ['Production Deployments', 'Client Pilots', 'Partner Integration'],
      progress: 0
    },
    { 
      phase: 'Transform', 
      quarter: 'Q3-Q4 2025', 
      status: 'future',
      initiatives: ['Market Leadership', 'New Revenue Streams', 'Global Expansion'],
      progress: 0
    },
  ];

  const [selectedPhase, setSelectedPhase] = useState<string>('Quick Wins');

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-cyan-400" />
        Digital Transformation Journey
      </h3>
      
      <div className="relative">
        {/* Timeline */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2" />
        
        <div className="relative grid grid-cols-4 gap-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.phase}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connector dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-900 border-2 border-gray-700 z-10">
                <motion.div 
                  className={`w-full h-full rounded-full ${
                    milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'active' ? 'bg-blue-500' :
                    'bg-gray-600'
                  }`}
                  animate={milestone.status === 'active' ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              
              {/* Card */}
              <motion.div
                className={`mt-12 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPhase === milestone.phase
                    ? 'bg-white/10 border-blue-500'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
                onClick={() => setSelectedPhase(milestone.phase)}
                whileHover={{ y: -4 }}
              >
                <h4 className="font-semibold text-lg mb-1">{milestone.phase}</h4>
                <p className="text-sm text-gray-400 mb-3">{milestone.quarter}</p>
                
                {/* Progress bar */}
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                
                {/* Initiatives */}
                <AnimatePresence>
                  {selectedPhase === milestone.phase && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-1 overflow-hidden"
                    >
                      {milestone.initiatives.map((initiative, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-center gap-1">
                          <ChevronRight className="w-3 h-3" />
                          {initiative}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Innovation Ecosystem Network
export function EcosystemNetwork() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  const ecosystem = {
    center: { name: 'Comcast AI Innovation Hub', type: 'hub' },
    categories: [
      {
        name: 'Technology Partners',
        nodes: ['Microsoft', 'Google Cloud', 'AWS', 'Salesforce'],
        connections: 12,
      },
      {
        name: 'Academic Partners',
        nodes: ['MIT', 'Stanford', 'IIT', 'Carnegie Mellon'],
        connections: 8,
      },
      {
        name: 'Startup Ecosystem',
        nodes: ['AI Startups', 'FinTech', 'HealthTech', 'EdTech'],
        connections: 15,
      },
      {
        name: 'Industry Alliances',
        nodes: ['NASSCOM', 'AI Alliance', 'Cloud Native', 'Open Source'],
        connections: 10,
      },
    ],
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Globe className="w-6 h-6 text-indigo-400" />
        Innovation Ecosystem Network
      </h3>
      
      <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-xl p-8 border border-white/10">
        <div className="relative h-96 flex items-center justify-center">
          {/* Central Hub */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center z-20 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveNode('hub')}
          >
            <div className="text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-1 text-white" />
              <p className="text-xs font-semibold text-white">Innovation Hub</p>
            </div>
          </motion.div>
          
          {/* Category Nodes */}
          {ecosystem.categories.map((category, categoryIndex) => {
            const angle = (categoryIndex / ecosystem.categories.length) * 2 * Math.PI;
            const radius = 180;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            return (
              <div key={category.name}>
                {/* Connection Line */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: 1 }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${50 + (x / 4)}%`}
                    y2={`${50 + (y / 4)}%`}
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
                
                {/* Category Node */}
                <motion.div
                  className="absolute w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center cursor-pointer z-10"
                  style={{
                    left: `calc(50% + ${x}px - 48px)`,
                    top: `calc(50% + ${y}px - 48px)`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveNode(category.name)}
                >
                  <div className="text-center">
                    <p className="text-xs font-semibold text-white px-2">{category.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{category.connections} partners</p>
                  </div>
                </motion.div>
                
                {/* Sub-nodes */}
                <AnimatePresence>
                  {activeNode === category.name && (
                    <>
                      {category.nodes.map((node, nodeIndex) => {
                        const nodeAngle = angle + (nodeIndex - 1.5) * 0.3;
                        const nodeRadius = radius + 80;
                        const nodeX = nodeRadius * Math.cos(nodeAngle);
                        const nodeY = nodeRadius * Math.sin(nodeAngle);
                        
                        return (
                          <motion.div
                            key={node}
                            className="absolute w-20 h-20 bg-blue-900/50 backdrop-blur rounded-lg flex items-center justify-center text-xs font-medium text-gray-300 z-5"
                            style={{
                              left: `calc(50% + ${nodeX}px - 40px)`,
                              top: `calc(50% + ${nodeY}px - 40px)`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: nodeIndex * 0.1 }}
                          >
                            <p className="text-center px-2">{node}</p>
                          </motion.div>
                        );
                      })}
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600" />
            <span className="text-sm">Innovation Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-800" />
            <span className="text-sm">Partner Category</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-900/50" />
            <span className="text-sm">Individual Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}