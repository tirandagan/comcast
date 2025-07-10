'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Treemap, Sankey, Area, AreaChart
} from 'recharts';
import { 
  Building2, Users, Brain, TrendingUp, Clock, Target, 
  AlertTriangle, Zap, Globe, Award, ChevronRight, X,
  DollarSign, Rocket, Shield, Sparkles, ArrowUpRight,
  Heart, Wifi, ShoppingCart, Building, Cpu, Phone,
  Briefcase, Plane, Battery, Info, Filter, Layers,
  Activity, GitBranch, BarChart3, PieChartIcon,
  BookOpen, Lightbulb, Network, ExternalLink, Play,
  FileText, Award as TrophyIcon, Linkedin, Compass,
  Map, Flag, Navigation, GitMerge, Workflow,
  Settings, Cog, Share2, Hexagon, Box,
  CircuitBoard, Microscope, Puzzle, Key,
  ArrowRight, CheckCircle, Circle, Gauge
} from 'lucide-react';

// Color schemes
const ISG_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  cyan: '#06B6D4'
};

// ISG Model Evolution Timeline
export function ISGEvolutionTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const phases = [
    {
      year: '2015',
      phase: 'ISG Formation',
      title: 'Industry Solutions Group Created',
      metrics: {
        revenue: '$0M',
        solutions: '0',
        team: '12',
        industries: '4'
      },
      achievements: [
        'Established dedicated industry teams',
        'Recruited industry leaders',
        'Created solution development framework',
        'Launched first industry platforms'
      ],
      color: ISG_COLORS.primary
    },
    {
      year: '2016',
      phase: 'Early Momentum',
      title: 'First Industry Solutions Launch',
      metrics: {
        revenue: '$20M',
        solutions: '8',
        team: '45',
        industries: '6'
      },
      achievements: [
        'Healthcare platforms live',
        'Banking solutions deployed',
        'First partner integrations',
        'Industry recognition achieved'
      ],
      color: ISG_COLORS.secondary
    },
    {
      year: '2017',
      phase: 'Scale Achievement',
      title: 'Market Leadership Position',
      metrics: {
        revenue: '$75M',
        solutions: '18',
        team: '120',
        industries: '8'
      },
      achievements: [
        'Multi-million dollar deals closed',
        'Strategic alliances formed',
        'Innovation awards won',
        'Global expansion initiated'
      ],
      color: ISG_COLORS.accent
    },
    {
      year: '2018',
      phase: 'Platform Maturity',
      title: 'Full Portfolio Development',
      metrics: {
        revenue: '$150M',
        solutions: '30+',
        team: '200+',
        industries: '10'
      },
      achievements: [
        'Complete solution portfolio',
        'Enterprise client adoption',
        'Industry analyst recognition',
        'Innovation ecosystem established'
      ],
      color: ISG_COLORS.purple
    },
    {
      year: '2019',
      phase: 'Impact Realization',
      title: '$200M+ Influence Revenue',
      metrics: {
        revenue: '$200M+',
        solutions: '40+',
        team: '300+',
        industries: '12'
      },
      achievements: [
        'Market-leading position achieved',
        'Industry transformation delivered',
        'Global delivery capability',
        'Sustained profitable growth'
      ],
      color: ISG_COLORS.danger
    }
  ];

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">ISG Journey at Cognizant</h3>
          <p className="text-gray-400">From Concept to $200M+ Revenue Impact</p>
        </div>
        <a
          href="https://www.linkedin.com/pulse/isg-series-industry-centric-evolution-strategic-role-industry-dagan/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          Read Full Story
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2" />
        
        <div className="relative grid grid-cols-5 gap-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.year}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline Node */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full cursor-pointer z-10"
                style={{ backgroundColor: phase.color }}
                whileHover={{ scale: 1.5 }}
                onClick={() => setSelectedPhase(index)}
              />

              {/* Phase Card */}
              <motion.div
                className="bg-gray-800/50 rounded-lg p-4 mb-8 border-2 cursor-pointer"
                style={{ borderColor: selectedPhase === index ? phase.color : 'transparent' }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedPhase(index)}
              >
                <div className="text-lg font-bold mb-1" style={{ color: phase.color }}>
                  {phase.year}
                </div>
                <div className="text-sm font-medium mb-2">{phase.phase}</div>
                <div className="text-xs text-gray-400">{phase.title}</div>
                
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-bold">{phase.metrics.revenue}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{phase.metrics.solutions}</div>
                    <div className="text-xs text-gray-500">Solutions</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      <AnimatePresence>
        {selectedPhase !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 bg-gray-800/50 rounded-lg p-6 border-2"
            style={{ borderColor: phases[selectedPhase].color }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold mb-1">{phases[selectedPhase].title}</h4>
                <p className="text-gray-400">{phases[selectedPhase].year} - {phases[selectedPhase].phase}</p>
              </div>
              <button
                onClick={() => setSelectedPhase(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">Key Metrics</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold" style={{ color: phases[selectedPhase].color }}>
                      {phases[selectedPhase].metrics.revenue}
                    </div>
                    <div className="text-sm text-gray-400">Revenue Impact</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold">{phases[selectedPhase].metrics.solutions}</div>
                    <div className="text-sm text-gray-400">Solutions Built</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold">{phases[selectedPhase].metrics.team}</div>
                    <div className="text-sm text-gray-400">Team Size</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold">{phases[selectedPhase].metrics.industries}</div>
                    <div className="text-sm text-gray-400">Industries</div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-3">Key Achievements</h5>
                <div className="space-y-2">
                  {phases[selectedPhase].achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <TrophyIcon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: phases[selectedPhase].color }} />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ISG Operating Model Framework
export function ISGOperatingModel() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const components = [
    {
      id: 'strategy',
      title: 'Strategy & Industry Identity',
      icon: Target,
      color: ISG_COLORS.primary,
      description: 'Clear positioning and differentiation for each vertical',
      elements: [
        'Industry-specific value propositions',
        'Competitive positioning',
        'Go-to-market strategy',
        'Brand identity development'
      ],
      sutherland: [
        'Healthcare: "The Clinical Intelligence Partner"',
        'CMT: "The 5G Transformation Accelerator"',
        'BFSI: "The Financial Experience Innovator"',
        'Retail: "The Omnichannel Excellence Leader"'
      ]
    },
    {
      id: 'solutions',
      title: 'Solution & Offering Management',
      icon: Lightbulb,
      color: ISG_COLORS.secondary,
      description: 'Industry-specific platforms and accelerators',
      elements: [
        'Solution portfolio development',
        'Platform architecture',
        'IP creation and management',
        'Rapid prototyping capability'
      ],
      sutherland: [
        'Healthcare: 5-7 AI solutions',
        'CMT: 4-6 5G/AI platforms',
        'BFSI: 5-7 FinTech solutions',
        'Retail: 4-5 Commerce platforms'
      ]
    },
    {
      id: 'commercialization',
      title: 'Commercialization Engine',
      icon: DollarSign,
      color: ISG_COLORS.accent,
      description: 'Systematic approach to market development',
      elements: [
        'Industry sales plays',
        'Solution-based pricing',
        'Deal qualification',
        'Executive relationships'
      ],
      sutherland: [
        'Outcome-based pricing models',
        'Innovation-as-a-Service offerings',
        'Co-innovation frameworks',
        'Value realization tracking'
      ]
    },
    {
      id: 'partnerships',
      title: 'Alliance & Partnership Ecosystem',
      icon: Network,
      color: ISG_COLORS.purple,
      description: 'Multiplier effect through strategic collaborations',
      elements: [
        'Technology partnerships',
        'Academic collaborations',
        'Startup ecosystem',
        'Joint solutions'
      ],
      sutherland: [
        'Hyperscaler alliances (AWS, Azure, GCP)',
        'AI platform partners (OpenAI, Anthropic)',
        'Industry ISVs (Zendesk, Salesforce)',
        'Innovation accelerators'
      ]
    },
    {
      id: 'outreach',
      title: 'Industry Outreach & Thought Leadership',
      icon: Globe,
      color: ISG_COLORS.cyan,
      description: 'Building market presence and credibility',
      elements: [
        'Executive briefings',
        'Innovation showcases',
        'Conference leadership',
        'Content marketing'
      ],
      sutherland: [
        'AI Innovation Summit',
        'Industry advisory boards',
        'Research publications',
        'Client co-innovation labs'
      ]
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">ISG Operating Model for Comcast</h3>
      
      {/* Central Hub Visualization */}
      <div className="relative h-[600px] mb-8">
        {/* Center Circle */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center border-2 border-white/20"
          whileHover={{ scale: 1.1 }}
        >
          <div className="text-center">
            <Building2 className="w-12 h-12 mx-auto mb-2" />
            <div className="font-bold">SIIG</div>
            <div className="text-xs text-gray-400">Innovation Hub</div>
          </div>
        </motion.div>

        {/* Component Circles */}
        {components.map((component, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180);
          const radius = 250;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const Icon = component.icon;

          return (
            <motion.div
              key={component.id}
              className="absolute top-1/2 left-1/2"
              style={{ 
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` 
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connection Line */}
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: radius, height: radius }}
              >
                <line
                  x1="0"
                  y1="0"
                  x2={-x}
                  y2={-y}
                  stroke={component.color}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.3"
                />
              </svg>

              {/* Component Circle */}
              <motion.div
                className="relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: `${component.color}20`, borderColor: component.color }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveComponent(component.id)}
              >
                <div className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-1" style={{ color: component.color }} />
                  <div className="text-xs font-medium px-2">{component.title}</div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Component Details */}
      <AnimatePresence>
        {activeComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800/50 rounded-lg p-6 border-2"
            style={{ borderColor: components.find(c => c.id === activeComponent)?.color }}
          >
            {(() => {
              const component = components.find(c => c.id === activeComponent);
              if (!component) return null;
              const Icon = component.icon;

              return (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${component.color}20` }}>
                        <Icon className="w-8 h-8" style={{ color: component.color }} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{component.title}</h4>
                        <p className="text-gray-400">{component.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveComponent(null)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Core Elements</h5>
                      <div className="space-y-2">
                        {component.elements.map((element, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: component.color }} />
                            <span className="text-sm">{element}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-3">Comcast Application</h5>
                      <div className="space-y-2">
                        {component.sutherland.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: component.color }} />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SIIG Organizational Structure
export function SIIGOrgStructure() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const orgData = {
    id: 'head',
    name: 'Global Head of Industry & Product Innovation',
    role: 'Strategic Leadership',
    color: ISG_COLORS.primary,
    children: [
      {
        id: 'industry',
        name: 'Industry Innovation Leaders',
        role: 'Vertical Excellence',
        color: ISG_COLORS.secondary,
        children: [
          { 
            id: 'healthcare', 
            name: 'Healthcare & Life Sciences Lead',
            metrics: { solutions: '5-7', revenue: '$100M+', team: '25+' }
          },
          { 
            id: 'cmt', 
            name: 'CMT Innovation Lead',
            metrics: { solutions: '4-6', revenue: '$80M+', team: '20+' }
          },
          { 
            id: 'bfsi', 
            name: 'BFSI Innovation Lead',
            metrics: { solutions: '5-7', revenue: '$90M+', team: '22+' }
          },
          { 
            id: 'retail', 
            name: 'Retail Innovation Lead',
            metrics: { solutions: '4-5', revenue: '$60M+', team: '18+' }
          }
        ]
      },
      {
        id: 'horizontal',
        name: 'Horizontal Innovation Leaders',
        role: 'Technology & Capabilities',
        color: ISG_COLORS.accent,
        children: [
          { 
            id: 'ai', 
            name: 'AI & Rapid Prototyping Lead',
            capabilities: ['AI/ML platforms', 'Low-code tools', 'Dev acceleration']
          },
          { 
            id: 'partners', 
            name: 'Partner Ecosystem Lead',
            capabilities: ['Strategic alliances', 'Startup programs', 'Co-innovation']
          },
          { 
            id: 'labs', 
            name: 'Innovation Labs Lead',
            capabilities: ['R&D initiatives', 'Proof of concepts', 'Client labs']
          }
        ]
      },
      {
        id: 'enablement',
        name: 'Enablement Functions',
        role: 'Go-to-Market Excellence',
        color: ISG_COLORS.purple,
        children: [
          { 
            id: 'commercial', 
            name: 'Commercialization Lead',
            focus: ['Pricing strategy', 'Sales enablement', 'Deal support']
          },
          { 
            id: 'marketing', 
            name: 'Marketing & Outreach Lead',
            focus: ['Thought leadership', 'Events', 'Content']
          },
          { 
            id: 'talent', 
            name: 'Talent & Culture Lead',
            focus: ['Innovation training', 'Culture change', 'Recognition']
          }
        ]
      }
    ]
  };

  const renderOrgNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNode === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className={`${level > 0 ? 'ml-8' : ''}`}>
        <motion.div
          className={`bg-gray-800/50 rounded-lg p-4 mb-4 border-2 cursor-pointer ${
            level === 0 ? 'border-blue-500' : 'border-gray-700'
          }`}
          whileHover={{ scale: 1.02 }}
          onClick={() => hasChildren && setExpandedNode(isExpanded ? null : node.id)}
          style={{ borderColor: node.color || 'inherit' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-semibold ${level === 0 ? 'text-xl' : 'text-lg'}`}>
                {node.name}
              </h4>
              {node.role && <p className="text-sm text-gray-400">{node.role}</p>}
              
              {/* Metrics for industry leads */}
              {node.metrics && (
                <div className="flex gap-4 mt-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {node.metrics.solutions} solutions
                  </span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {node.metrics.revenue} target
                  </span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {node.metrics.team} team
                  </span>
                </div>
              )}

              {/* Capabilities */}
              {node.capabilities && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {node.capabilities.map((cap: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {cap}
                    </span>
                  ))}
                </div>
              )}

              {/* Focus areas */}
              {node.focus && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {node.focus.map((item: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {node.children.map((child: any) => renderOrgNode(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">SIIG Organizational Structure</h3>
      <p className="text-gray-400 mb-6">Click on nodes to expand and explore the organization</p>
      {renderOrgNode(orgData)}
    </div>
  );
}

// Implementation Roadmap
export function ISGImplementationRoadmap() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      phase: 'Foundation',
      duration: 'Days 1-90',
      color: ISG_COLORS.primary,
      objectives: [
        'Executive alignment and funding',
        'Core team recruitment',
        'Initial capability assessment',
        'Quick win identification'
      ],
      deliverables: [
        '2-3 rapid prototypes per vertical',
        'Partnership framework established',
        'Innovation lab setup',
        'Go-to-market strategy defined'
      ],
      metrics: {
        prototypes: 8,
        team: 30,
        investment: '$2M'
      }
    },
    {
      phase: 'Build',
      duration: 'Days 91-180',
      color: ISG_COLORS.secondary,
      objectives: [
        'Scale prototype development',
        'Launch partner program',
        'Market activation',
        'Client engagement'
      ],
      deliverables: [
        '5+ prototypes per vertical',
        '10+ strategic partnerships',
        'Innovation showcase event',
        'Sales enablement complete'
      ],
      metrics: {
        prototypes: 20,
        team: 60,
        pipeline: '$15M'
      }
    },
    {
      phase: 'Accelerate',
      duration: 'Days 181-365',
      color: ISG_COLORS.accent,
      objectives: [
        'Commercial optimization',
        'Solution packaging',
        'Geographic expansion',
        'Ecosystem development'
      ],
      deliverables: [
        'Full solution portfolio',
        'Revenue generation at scale',
        'Industry recognition',
        'Innovation culture embedded'
      ],
      metrics: {
        prototypes: 50,
        team: 100,
        revenue: '$20M+'
      }
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">90-Day Implementation Sprints</h3>

      {/* Phase Selector */}
      <div className="flex gap-4 mb-8">
        {phases.map((phase, index) => (
          <button
            key={index}
            onClick={() => setActivePhase(index)}
            className={`flex-1 p-4 rounded-lg transition-all ${
              activePhase === index 
                ? 'bg-white/20 border-2' 
                : 'bg-gray-800/50 border-2 border-transparent hover:bg-gray-800'
            }`}
            style={{ borderColor: activePhase === index ? phase.color : 'transparent' }}
          >
            <div className="text-lg font-bold" style={{ color: phase.color }}>
              {phase.phase}
            </div>
            <div className="text-sm text-gray-400">{phase.duration}</div>
          </button>
        ))}
      </div>

      {/* Phase Details */}
      <motion.div
        key={activePhase}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-800/50 rounded-lg p-6 border-2"
        style={{ borderColor: phases[activePhase].color }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Objectives */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" style={{ color: phases[activePhase].color }} />
              Key Objectives
            </h4>
            <div className="space-y-2">
              {phases[activePhase].objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                  <span className="text-sm">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" style={{ color: phases[activePhase].color }} />
              Key Deliverables
            </h4>
            <div className="space-y-2">
              {phases[activePhase].deliverables.map((del, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                  <span className="text-sm">{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" style={{ color: phases[activePhase].color }} />
              Target Metrics
            </h4>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-2xl font-bold" style={{ color: phases[activePhase].color }}>
                  {phases[activePhase].metrics.prototypes}
                </div>
                <div className="text-sm text-gray-400">Prototypes</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-2xl font-bold">{phases[activePhase].metrics.team}</div>
                <div className="text-sm text-gray-400">Team Size</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-2xl font-bold">{phases[activePhase].metrics.investment || phases[activePhase].metrics.pipeline || phases[activePhase].metrics.revenue}</div>
                <div className="text-sm text-gray-400">
                  {phases[activePhase].metrics.investment ? 'Investment' : 
                   phases[activePhase].metrics.pipeline ? 'Pipeline' : 'Revenue'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Success Metrics Framework
export function ISGSuccessMetrics() {
  const [viewMode, setViewMode] = useState<'leading' | 'lagging'>('leading');

  const leadingIndicators = [
    { metric: 'Prototypes per Month', current: 8, target: 15, unit: 'count' },
    { metric: 'Avg Development Time', current: 3, target: 2, unit: 'weeks' },
    { metric: 'Partner Engagements', current: 5, target: 10, unit: 'active' },
    { metric: 'Client Participation', current: 12, target: 25, unit: 'clients' }
  ];

  const laggingIndicators = [
    { metric: 'Innovation Revenue', current: 0, target: 20, unit: '$M' },
    { metric: 'Influence Revenue', current: 0, target: 50, unit: '$M' },
    { metric: 'Client Satisfaction', current: 0, target: 90, unit: '%' },
    { metric: 'Market Recognition', current: 0, target: 5, unit: 'awards' }
  ];

  const indicators = viewMode === 'leading' ? leadingIndicators : laggingIndicators;

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Success Metrics Framework</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('leading')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'leading' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Leading Indicators
          </button>
          <button
            onClick={() => setViewMode('lagging')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'lagging' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Lagging Indicators
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {indicators.map((indicator, index) => {
          const progress = (indicator.current / indicator.target) * 100;
          const color = progress >= 80 ? ISG_COLORS.secondary : 
                       progress >= 50 ? ISG_COLORS.accent : ISG_COLORS.danger;

          return (
            <motion.div
              key={indicator.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold">{indicator.metric}</h4>
                  <p className="text-sm text-gray-400">Year 1 Target</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color }}>
                    {indicator.current}{indicator.unit === '%' ? '%' : ''}
                  </div>
                  <div className="text-sm text-gray-400">
                    of {indicator.target}{indicator.unit === '%' ? '%' : ''} {indicator.unit !== '%' && indicator.unit}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>

              <div className="mt-2 text-xs text-gray-500 text-right">
                {Math.round(progress)}% to target
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* LinkedIn Article Link */}
      <div className="mt-8 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold mb-1">Learn More About ISG Success Metrics</h4>
            <p className="text-sm text-gray-400">
              Read the detailed case study on how we measured and achieved success at Cognizant ISG
            </p>
          </div>
          <a
            href="https://www.linkedin.com/pulse/isg-series-industry-centric-evolution-strategic-role-industry-dagan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <Linkedin className="w-4 h-4" />
            Read Article
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}