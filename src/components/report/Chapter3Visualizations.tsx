'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, Cell, ComposedChart, Line, Area
} from 'recharts';
import { 
  Building2, Users, Brain, TrendingUp, Clock, Target, 
  AlertTriangle, Zap, Globe, Award, ChevronRight, X,
  DollarSign, Rocket, Shield, Sparkles, ArrowUpRight,
  Filter, SortAsc, Layers, Activity
} from 'lucide-react';

// Competitor data
const competitors = [
  {
    id: 'teleperformance',
    name: 'Teleperformance',
    logo: '🏢',
    employees: 410000,
    aiInvestment: 100, // millions
    aiProfessionals: 5000,
    innovationSpeed: 3,
    clientEmpowerment: 8,
    description: 'Global leader by scale, strong investment',
    strengths: ['380+ AI use cases', 'TP Interact integration', 'Embedded analytics'],
    gaps: ['Slow deployment', 'Limited rapid prototyping', 'Traditional mindset']
  },
  {
    id: 'concentrix',
    name: 'Concentrix',
    logo: '💫',
    employees: 225000,
    aiInvestment: 75,
    aiProfessionals: 3000,
    innovationSpeed: 4,
    clientEmpowerment: 6,
    description: 'Experience design focus',
    strengths: ['300+ GenAI deployments', 'Concentrix Catalyst', 'Design expertise'],
    gaps: ['Tech partner dependent', 'Slower innovation cycles', 'Less flexible engagement']
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '♢',
    employees: 732000,
    aiInvestment: 3000,
    aiProfessionals: 40000,
    innovationSpeed: 7,
    clientEmpowerment: 5,
    description: 'Technology powerhouse',
    strengths: ['2,000+ GenAI projects', '€2.8B AI investment', 'Deep tech expertise'],
    gaps: ['Complex engagements', 'High cost structure', 'Less BPO focused']
  },
  {
    id: 'genpact',
    name: 'Genpact',
    logo: '🔷',
    employees: 115000,
    aiInvestment: 50,
    aiProfessionals: 2500,
    innovationSpeed: 5,
    clientEmpowerment: 7,
    description: 'Process expertise leader',
    strengths: ['200+ AI deployments', 'Process knowledge', 'Industry depth'],
    gaps: ['Conservative approach', 'Slower adoption', 'Limited innovation metrics']
  },
  {
    id: 'wns',
    name: 'WNS Holdings',
    logo: '🌐',
    employees: 59000,
    aiInvestment: 40,
    aiProfessionals: 4000,
    innovationSpeed: 6,
    clientEmpowerment: 6,
    description: 'Analytics and automation focus',
    strengths: ['250+ accelerators', '4,000+ data scientists', 'Domain expertise'],
    gaps: ['Smaller scale', 'Regional limitations', 'Less AI investment']
  },
  {
    id: 'hcl',
    name: 'HCL Technologies',
    logo: '💻',
    employees: 223000,
    aiInvestment: 60,
    aiProfessionals: 50000,
    innovationSpeed: 8,
    clientEmpowerment: 4,
    description: 'Engineering excellence',
    strengths: ['50,000 GenAI trained', 'Strong partnerships', 'Tech capabilities'],
    gaps: ['BPO secondary focus', 'Complex delivery', 'Less process expertise']
  }
];

// Competitive Intelligence Dashboard
export function CompetitorIntelligenceDashboard() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'scale' | 'investment' | 'speed'>('scale');
  const [filterBy, setFilterBy] = useState<'all' | 'large' | 'innovative'>('all');

  // Apply filters and sorting
  let displayedCompetitors = [...competitors];
  
  if (filterBy === 'large') {
    displayedCompetitors = displayedCompetitors.filter(c => c.employees > 200000);
  } else if (filterBy === 'innovative') {
    displayedCompetitors = displayedCompetitors.filter(c => c.innovationSpeed > 5);
  }

  displayedCompetitors.sort((a, b) => {
    if (sortBy === 'scale') return b.employees - a.employees;
    if (sortBy === 'investment') return b.aiInvestment - a.aiInvestment;
    if (sortBy === 'speed') return b.innovationSpeed - a.innovationSpeed;
    return 0;
  });

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Competitive Intelligence Dashboard</h3>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-1"
          >
            <option value="all">All Competitors</option>
            <option value="large">Large Scale (200k+)</option>
            <option value="innovative">Innovation Leaders</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-1"
          >
            <option value="scale">Sort by Scale</option>
            <option value="investment">Sort by AI Investment</option>
            <option value="speed">Sort by Innovation Speed</option>
          </select>
        </div>
      </div>

      {/* Competitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCompetitors.map((competitor) => (
          <motion.div
            key={competitor.id}
            layoutId={competitor.id}
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedCompetitor(competitor.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-3xl mb-2">{competitor.logo}</div>
                <h4 className="text-lg font-bold">{competitor.name}</h4>
                <p className="text-sm text-gray-400">{competitor.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Employees</span>
                <span className="font-semibold">{(competitor.employees / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">AI Investment</span>
                <span className="font-semibold">${competitor.aiInvestment}M+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Innovation Score</span>
                <span className="font-semibold">{competitor.innovationSpeed}/10</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Overlay */}
      <AnimatePresence>
        {selectedCompetitor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCompetitor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const comp = competitors.find(c => c.id === selectedCompetitor)!;
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-4xl mb-2">{comp.logo}</div>
                        <h3 className="text-2xl font-bold mb-2">{comp.name}</h3>
                        <p className="text-gray-400">{comp.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedCompetitor(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {comp.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                              <span className="text-sm">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          Critical Gaps
                        </h4>
                        <ul className="space-y-2">
                          {comp.gaps.map((gap, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                              <span className="text-sm">{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-gray-800 rounded p-4 text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                        <div className="text-2xl font-bold">{(comp.employees / 1000).toFixed(0)}k</div>
                        <div className="text-xs text-gray-400">Employees</div>
                      </div>
                      <div className="bg-gray-800 rounded p-4 text-center">
                        <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-400" />
                        <div className="text-2xl font-bold">${comp.aiInvestment}M</div>
                        <div className="text-xs text-gray-400">AI Investment</div>
                      </div>
                      <div className="bg-gray-800 rounded p-4 text-center">
                        <Brain className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                        <div className="text-2xl font-bold">{(comp.aiProfessionals / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-gray-400">AI Professionals</div>
                      </div>
                      <div className="bg-gray-800 rounded p-4 text-center">
                        <Rocket className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                        <div className="text-2xl font-bold">{comp.innovationSpeed}/10</div>
                        <div className="text-xs text-gray-400">Innovation Speed</div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Market Positioning Scatter Plot
export function MarketPositioningPlot() {
  const [animationStep, setAnimationStep] = useState(0);
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  const data = competitors.map(comp => ({
    ...comp,
    x: comp.innovationSpeed,
    y: comp.clientEmpowerment,
    z: comp.aiInvestment
  }));

  // Comcast's target position
  const comcastTarget = {
    name: 'Comcast (Target)',
    x: 9,
    y: 9,
    z: 150,
    logo: '🎯'
  };

  // Custom label component
  const renderCustomizedLabel = (props: any) => {
    const { x, y, payload } = props;
    if (!payload) return <></>;
    
    const isHovered = hoveredCompany === payload.name;
    const showLabel = true; // Always show labels
    
    return (
      <g transform={`translate(${x},${y})`}>
        {showLabel && (
          <text 
            x={0} 
            y={-10} 
            fill={isHovered ? '#fff' : '#9CA3AF'} 
            textAnchor="middle" 
            fontSize={isHovered ? 12 : 10}
            fontWeight={isHovered ? 'bold' : 'normal'}
          >
            {payload.name.split(' ')[0]}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Market Positioning Analysis</h3>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">
              Bubble size represents AI investment level. Position shows innovation capability vs client focus.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Source: Industry analysis based on public reports, company statements, and market research (2023-2024)
            </p>
          </div>
          <button
            onClick={() => setAnimationStep(animationStep === 0 ? 1 : 0)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            {animationStep === 0 ? 'Show Target' : 'Reset'}
          </button>
        </div>

        <ResponsiveContainer width="100%" height={450}>
          <ScatterChart margin={{ top: 40, right: 40, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Innovation Speed" 
              domain={[0, 10]}
              label={{ value: 'Innovation Speed →', position: 'insideBottom', offset: -10 }}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Client Empowerment"
              domain={[0, 10]}
              label={{ value: 'Client Empowerment →', angle: -90, position: 'insideLeft' }}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-900 p-3 rounded border border-gray-700">
                      <p className="font-semibold flex items-center gap-2">
                        <span className="text-lg">{data.logo}</span>
                        {data.name}
                      </p>
                      <p className="text-sm">Innovation Speed: {data.x}/10</p>
                      <p className="text-sm">Client Empowerment: {data.y}/10</p>
                      <p className="text-sm">AI Investment: ${data.z}M</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter 
              name="Competitors" 
              data={data} 
              fill="#3B82F6"
              onMouseEnter={(data: any) => setHoveredCompany(data.name)}
              onMouseLeave={() => setHoveredCompany(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(${index * 60}, 70%, 50%)`}
                  stroke={hoveredCompany === entry.name ? '#fff' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </Scatter>
            {animationStep === 1 && (
              <Scatter
                name="Comcast Target"
                data={[comcastTarget]}
                fill="#10B981"
              >
                <Cell fill="#10B981" stroke="#fff" strokeWidth={2} />
              </Scatter>
            )}
            
            {/* Render labels for all competitors */}
            {data.map((comp, index) => (
              <text
                key={comp.name}
                x={comp.x * 40 + 60} // Scale and offset based on chart dimensions
                y={400 - comp.y * 36 - 10} // Invert Y and offset
                fill={hoveredCompany === comp.name ? '#fff' : '#9CA3AF'}
                textAnchor="middle"
                fontSize={hoveredCompany === comp.name ? 12 : 10}
                fontWeight={hoveredCompany === comp.name ? 'bold' : 'normal'}
                className="pointer-events-none"
              >
                {comp.name.split(' ')[0]}
              </text>
            ))}
          </ScatterChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-700/50 rounded p-4">
            <h4 className="font-semibold mb-2">Innovation Leaders</h4>
            <p className="text-sm text-gray-400">
              HCL and Accenture lead in innovation speed but lag in client empowerment
            </p>
          </div>
          <div className="bg-gray-700/50 rounded p-4">
            <h4 className="font-semibold mb-2">Comcast Opportunity</h4>
            <p className="text-sm text-gray-400">
              Target position combines high innovation speed with superior client empowerment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Strategic Gap Analysis Radar
export function StrategicGapRadar() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(['teleperformance', 'accenture']);

  const dimensions = [
    'Rapid Prototyping',
    'Client Empowerment',
    'AI Accelerators',
    'Partner Ecosystem',
    'Innovation Metrics'
  ];

  const competitorScores: Record<string, number[]> = {
    teleperformance: [3, 8, 6, 7, 5],
    concentrix: [4, 6, 5, 6, 4],
    accenture: [7, 5, 9, 8, 7],
    genpact: [5, 7, 6, 5, 6],
    wns: [6, 6, 7, 5, 5],
    hcl: [8, 4, 8, 7, 6],
    comcast_target: [10, 10, 9, 9, 10]
  };

  const radarData = dimensions.map((dimension, index) => {
    const point: any = { dimension };
    selectedCompetitors.forEach(compId => {
      const comp = competitors.find(c => c.id === compId);
      point[comp?.name || compId] = competitorScores[compId]?.[index] || 0;
    });
    if (selectedCompetitors.includes('comcast_target')) {
      point['Comcast Target'] = competitorScores.comcast_target[index];
    }
    return point;
  });

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Strategic Gap Analysis</h3>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-4">
            Compare capabilities across key innovation dimensions. Select competitors to analyze:
          </p>
          <div className="flex flex-wrap gap-2">
            {[...competitors, { id: 'comcast_target', name: 'Comcast Target', logo: '🎯' }].map((comp) => (
              <button
                key={comp.id}
                onClick={() => {
                  if (selectedCompetitors.includes(comp.id)) {
                    setSelectedCompetitors(selectedCompetitors.filter(id => id !== comp.id));
                  } else if (selectedCompetitors.length < 3) {
                    setSelectedCompetitors([...selectedCompetitors, comp.id]);
                  }
                }}
                className={`px-3 py-1 rounded border transition-colors ${
                  selectedCompetitors.includes(comp.id)
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <span className="mr-2">{comp.logo}</span>
                {comp.name}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="dimension" stroke="#9CA3AF" />
            <PolarRadiusAxis domain={[0, 10]} stroke="#374151" />
            {selectedCompetitors.map((compId, index) => {
              const comp = competitors.find(c => c.id === compId);
              const name = compId === 'comcast_target' ? 'Comcast Target' : comp?.name || compId;
              return (
                <Radar
                  key={compId}
                  name={name}
                  dataKey={name}
                  stroke={colors[index]}
                  fill={colors[index]}
                  fillOpacity={0.3}
                />
              );
            })}
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-5 gap-2 mt-6">
          {dimensions.map((dim, i) => (
            <div key={dim} className="text-center">
              <div className="text-xs font-semibold text-gray-400 mb-1">{dim}</div>
              <div className="text-xs">
                Gap: <span className="text-yellow-400">
                  {Math.max(...selectedCompetitors.filter(id => id !== 'comcast_target').map(id => 10 - (competitorScores[id]?.[i] || 0)))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Development Speed Comparison
export function DevelopmentSpeedComparison() {
  const [showDetails, setShowDetails] = useState(false);

  const speedData = [
    {
      approach: 'Industry Average',
      weeks: 20,
      color: '#EF4444',
      details: {
        phases: ['Requirements (4w)', 'Design (4w)', 'Development (8w)', 'Testing (4w)'],
        cost: '$250,000',
        risk: 'High'
      }
    },
    {
      approach: 'Best-in-Class',
      weeks: 12,
      color: '#F59E0B',
      details: {
        phases: ['Requirements (2w)', 'Design (3w)', 'Development (5w)', 'Testing (2w)'],
        cost: '$150,000',
        risk: 'Medium'
      }
    },
    {
      approach: 'Comcast AI-First',
      weeks: 3,
      color: '#10B981',
      details: {
        phases: ['Rapid Discovery (3d)', 'AI Development (1.5w)', 'Iteration (3d)'],
        cost: '$40,000',
        risk: 'Low'
      }
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Speed Advantage</h3>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={speedData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" domain={[0, 24]} label={{ value: 'Weeks to Production', position: 'insideBottom', offset: -10 }} />
              <YAxis dataKey="approach" type="category" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-900 p-3 rounded border border-gray-700">
                        <p className="font-semibold">{data.approach}</p>
                        <p className="text-sm">Time: {data.weeks} weeks</p>
                        <p className="text-sm text-green-400">
                          {data.approach === 'Comcast AI-First' && '85% faster than average'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="weeks" fill="#3B82F6">
                {speedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center gap-4 bg-green-900/30 border border-green-600 rounded-lg px-6 py-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Zap className="w-8 h-8 text-green-400" />
            <div className="text-left">
              <div className="text-3xl font-bold text-green-400">85% Faster</div>
              <div className="text-sm text-gray-400">Than Industry Average</div>
            </div>
          </motion.div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          <Activity className="w-4 h-4" />
          {showDetails ? 'Hide Details' : 'View Detailed Comparison'}
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {speedData.map((item) => (
                  <div key={item.approach} className="bg-gray-700/50 rounded p-4">
                    <h4 className="font-semibold mb-3" style={{ color: item.color }}>
                      {item.approach}
                    </h4>
                    <div className="space-y-2 mb-4">
                      {item.details.phases.map((phase, i) => (
                        <div key={i} className="text-sm flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          {phase}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-600 pt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Est. Cost</span>
                        <span>{item.details.cost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Risk Level</span>
                        <span className={
                          item.details.risk === 'High' ? 'text-red-400' :
                          item.details.risk === 'Medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }>{item.details.risk}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Triple Play Strategy Visualization
export function TriplePlayStrategy() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      title: 'Speed Leadership',
      icon: Rocket,
      color: 'from-blue-600 to-blue-500',
      description: 'Move at the speed of AI, not bureaucracy',
      tactics: [
        '2-4 week prototyping cycles',
        'AI-accelerated development',
        'Rapid iteration framework',
        'Fail-fast methodology'
      ],
      impact: '85% faster time-to-market'
    },
    {
      id: 2,
      title: 'Client Empowerment',
      icon: Sparkles,
      color: 'from-purple-600 to-purple-500',
      description: 'Co-creation, not just consultation',
      tactics: [
        'Client innovation labs',
        'Self-service prototyping',
        'Transparent development',
        'Ownership transfer model'
      ],
      impact: '3x higher client satisfaction'
    },
    {
      id: 3,
      title: 'Industry-First Innovation',
      icon: Award,
      color: 'from-green-600 to-green-500',
      description: 'Lead with solutions, not services',
      tactics: [
        'Pre-built industry accelerators',
        'Cross-pollination of ideas',
        'Innovation marketplace',
        'First-mover advantage'
      ],
      impact: '40% win rate improvement'
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Triple Play Differentiation Strategy</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const isActive = activePillar === pillar.id;
          
          return (
            <motion.div
              key={pillar.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`bg-gradient-to-br ${pillar.color} rounded-lg p-6 cursor-pointer h-full`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActivePillar(isActive ? null : pillar.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">{pillar.title}</h4>
                </div>
                
                <p className="text-white/90 mb-4">{pillar.description}</p>
                
                <div className="text-white/80 text-sm">
                  Click to explore tactics →
                </div>
              </motion.div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-gray-900 rounded-lg p-6 border border-gray-700 z-10"
                  >
                    <h5 className="font-semibold mb-3">Key Tactics:</h5>
                    <ul className="space-y-2 mb-4">
                      {pillar.tactics.map((tactic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tactic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">{pillar.impact}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-8 text-center p-6 bg-gray-800 rounded-lg border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg font-semibold mb-2">Combined Impact</p>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
          Unmatched Competitive Advantage
        </p>
        <p className="text-sm text-gray-400 mt-2">
          The only player combining all three dimensions at scale
        </p>
      </motion.div>
    </div>
  );
}