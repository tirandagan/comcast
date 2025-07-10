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

// ISG Transformation Journey - Visual Roadmap
export function ISGTransformationJourney() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const journey = [
    {
      stage: 'Current State',
      icon: AlertTriangle,
      color: ISG_COLORS.danger,
      subtitle: 'Fragmented Innovation',
      metrics: {
        efficiency: 35,
        impact: 25,
        scale: 20
      },
      challenges: [
        'Siloed innovation efforts across BUs',
        'Limited AI/ML capabilities',
        'Slow prototype-to-production',
        'Inconsistent methodology'
      ],
      visual: 'fragmented'
    },
    {
      stage: 'Foundation',
      icon: Compass,
      color: ISG_COLORS.accent,
      subtitle: 'Unified Strategy',
      metrics: {
        efficiency: 50,
        impact: 40,
        scale: 35
      },
      initiatives: [
        'SIIG organization established',
        'Innovation methodology defined',
        'Core team recruited',
        'Quick wins identified'
      ],
      visual: 'building'
    },
    {
      stage: 'Momentum',
      icon: Rocket,
      color: ISG_COLORS.secondary,
      subtitle: 'Accelerating Innovation',
      metrics: {
        efficiency: 70,
        impact: 65,
        scale: 60
      },
      achievements: [
        '20+ prototypes launched',
        'Strategic partnerships formed',
        'Client co-innovation active',
        'Market recognition gained'
      ],
      visual: 'accelerating'
    },
    {
      stage: 'Transformation',
      icon: Sparkles,
      color: ISG_COLORS.primary,
      subtitle: 'Industry Leadership',
      metrics: {
        efficiency: 90,
        impact: 85,
        scale: 80
      },
      outcomes: [
        '$200M+ revenue impact',
        'Industry thought leadership',
        'Innovation culture embedded',
        'Sustainable competitive advantage'
      ],
      visual: 'transformed'
    }
  ];

  const renderVisualState = (type: string) => {
    switch (type) {
      case 'fragmented':
        return (
          <div className="relative h-32">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-red-500/20 rounded-full border border-red-500/40"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + Math.sin(i) * 20}%`
                }}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        );
      case 'building':
        return (
          <div className="relative h-32 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 bg-amber-500/20 rounded-lg border-2 border-amber-500/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="absolute inset-4 bg-amber-500/30 rounded"
                animate={{ scale: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        );
      case 'accelerating':
        return (
          <div className="relative h-32 flex items-center justify-center">
            <motion.div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-16 bg-green-500/30 rounded"
                  animate={{
                    height: [16, 64, 16],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </motion.div>
          </div>
        );
      case 'transformed':
        return (
          <div className="relative h-32 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 30%, rgba(59, 130, 246, 0.2) 70%)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">ISG Transformation Journey</h3>
      
      {/* Journey Path */}
      <div className="relative mb-12">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-700 rounded-full -translate-y-1/2">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 via-amber-500 via-green-500 to-blue-500 rounded-full"
            style={{ width: `${animationProgress}%` }}
          />
        </div>

        {/* Journey Stages */}
        <div className="relative grid grid-cols-4 gap-4">
          {journey.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = selectedStage === index;
            const progress = (animationProgress / 100) * 4;
            const isPassed = progress > index;

            return (
              <motion.div
                key={stage.stage}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Stage Node */}
                <motion.div
                  className="relative mx-auto w-16 h-16 rounded-full flex items-center justify-center cursor-pointer z-10"
                  style={{
                    backgroundColor: isPassed ? stage.color : 'rgba(31, 41, 55, 0.5)',
                    borderWidth: 2,
                    borderColor: isActive ? stage.color : 'transparent'
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedStage(index)}
                >
                  <Icon className="w-8 h-8" style={{ color: isPassed ? 'white' : stage.color }} />
                </motion.div>

                {/* Stage Info */}
                <div className="text-center mt-4">
                  <div className="font-semibold">{stage.stage}</div>
                  <div className="text-sm text-gray-400">{stage.subtitle}</div>
                </div>

                {/* Visual Representation */}
                <div className="mt-4">
                  {renderVisualState(stage.visual)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stage Details */}
      <AnimatePresence>
        {selectedStage !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 rounded-lg p-6 border-2"
            style={{ borderColor: journey[selectedStage].color }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = journey[selectedStage].icon;
                  return (
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${journey[selectedStage].color}20` }}>
                      <Icon className="w-8 h-8" style={{ color: journey[selectedStage].color }} />
                    </div>
                  );
                })()}
                <div>
                  <h4 className="text-xl font-bold">{journey[selectedStage].stage}</h4>
                  <p className="text-gray-400">{journey[selectedStage].subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStage(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Metrics */}
              <div>
                <h5 className="font-medium mb-3">Performance Metrics</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Efficiency</span>
                      <span className="text-sm font-medium">{journey[selectedStage].metrics.efficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: journey[selectedStage].color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${journey[selectedStage].metrics.efficiency}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Business Impact</span>
                      <span className="text-sm font-medium">{journey[selectedStage].metrics.impact}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: journey[selectedStage].color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${journey[selectedStage].metrics.impact}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Scale</span>
                      <span className="text-sm font-medium">{journey[selectedStage].metrics.scale}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: journey[selectedStage].color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${journey[selectedStage].metrics.scale}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                <h5 className="font-medium mb-3">
                  {journey[selectedStage].challenges ? 'Key Challenges' :
                   journey[selectedStage].initiatives ? 'Key Initiatives' :
                   journey[selectedStage].achievements ? 'Key Achievements' : 'Key Outcomes'}
                </h5>
                <div className="space-y-2">
                  {(journey[selectedStage].challenges ||
                    journey[selectedStage].initiatives ||
                    journey[selectedStage].achievements ||
                    journey[selectedStage].outcomes)?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle 
                        className="w-4 h-4 mt-0.5 flex-shrink-0" 
                        style={{ color: journey[selectedStage].color }} 
                      />
                      <span className="text-sm">{item}</span>
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

// Interactive Operating Model
export function InteractiveOperatingModel() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);

  const layers = [
    {
      id: 'strategy',
      name: 'Strategic Layer',
      icon: Compass,
      color: ISG_COLORS.primary,
      position: { x: 50, y: 20 },
      components: ['Vision & Mission', 'Industry Strategy', 'Innovation Goals', 'Value Propositions'],
      connections: ['governance', 'capabilities']
    },
    {
      id: 'governance',
      name: 'Governance Layer',
      icon: Shield,
      color: ISG_COLORS.purple,
      position: { x: 25, y: 40 },
      components: ['SIIG Board', 'Investment Committee', 'Risk Management', 'IP Protection'],
      connections: ['capabilities', 'execution']
    },
    {
      id: 'capabilities',
      name: 'Capability Layer',
      icon: Hexagon,
      color: ISG_COLORS.secondary,
      position: { x: 75, y: 40 },
      components: ['AI/ML Expertise', 'Domain Knowledge', 'Technical Skills', 'Innovation Methods'],
      connections: ['execution', 'enablement']
    },
    {
      id: 'execution',
      name: 'Execution Layer',
      icon: Cog,
      color: ISG_COLORS.accent,
      position: { x: 25, y: 60 },
      components: ['Rapid Prototyping', 'Agile Development', 'Client Co-creation', 'Solution Delivery'],
      connections: ['enablement', 'measurement']
    },
    {
      id: 'enablement',
      name: 'Enablement Layer',
      icon: Share2,
      color: ISG_COLORS.cyan,
      position: { x: 75, y: 60 },
      components: ['Partnerships', 'Technology Stack', 'Innovation Labs', 'Training Programs'],
      connections: ['measurement']
    },
    {
      id: 'measurement',
      name: 'Measurement Layer',
      icon: Gauge,
      color: ISG_COLORS.danger,
      position: { x: 50, y: 80 },
      components: ['KPIs & Metrics', 'ROI Tracking', 'Client Satisfaction', 'Market Impact'],
      connections: ['strategy']
    }
  ];

  const getConnection = (from: string, to: string) => {
    const fromLayer = layers.find(l => l.id === from);
    const toLayer = layers.find(l => l.id === to);
    if (!fromLayer || !toLayer) return null;
    
    return {
      x1: fromLayer.position.x,
      y1: fromLayer.position.y,
      x2: toLayer.position.x,
      y2: toLayer.position.y
    };
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Interactive Operating Model Framework</h3>
      
      {/* Model Visualization */}
      <div className="relative h-[500px] bg-gray-800/30 rounded-lg overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {/* Connections */}
          {layers.flatMap(layer => 
            layer.connections.map(targetId => {
              const conn = getConnection(layer.id, targetId);
              if (!conn) return null;
              const isHovered = hoveredConnection === `${layer.id}-${targetId}`;
              
              return (
                <g key={`${layer.id}-${targetId}`}>
                  <motion.line
                    x1={`${conn.x1}%`}
                    y1={`${conn.y1}%`}
                    x2={`${conn.x2}%`}
                    y2={`${conn.y2}%`}
                    stroke={isHovered ? layer.color : 'rgba(255, 255, 255, 0.1)'}
                    strokeWidth={isHovered ? 3 : 1}
                    strokeDasharray={isHovered ? '0' : '5,5'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    onMouseEnter={() => setHoveredConnection(`${layer.id}-${targetId}`)}
                    onMouseLeave={() => setHoveredConnection(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  {isHovered && (
                    <motion.circle
                      r="4"
                      fill={layer.color}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M${conn.x1},${conn.y1} L${conn.x2},${conn.y2}`}
                      />
                    </motion.circle>
                  )}
                </g>
              );
            })
          ).filter(Boolean)}
        </svg>

        {/* Layer Nodes */}
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const isSelected = selectedLayer === layer.id;

          return (
            <motion.div
              key={layer.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${layer.position.x}%`, top: `${layer.position.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: `${layer.color}20`,
                  borderWidth: 3,
                  borderColor: isSelected ? layer.color : 'transparent'
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedLayer(isSelected ? null : layer.id)}
              >
                <div className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-1" style={{ color: layer.color }} />
                  <div className="text-xs font-medium px-2">{layer.name}</div>
                </div>

                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: layer.color }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Layer Details */}
      <AnimatePresence>
        {selectedLayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 bg-gray-800/50 rounded-lg p-6 border-2"
            style={{ borderColor: layers.find(l => l.id === selectedLayer)?.color }}
          >
            {(() => {
              const layer = layers.find(l => l.id === selectedLayer);
              if (!layer) return null;
              const Icon = layer.icon;

              return (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${layer.color}20` }}>
                        <Icon className="w-8 h-8" style={{ color: layer.color }} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{layer.name}</h4>
                        <p className="text-gray-400">Core components and responsibilities</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLayer(null)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {layer.components.map((component, idx) => (
                      <motion.div
                        key={component}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-gray-900/50 rounded-lg p-4 text-center"
                      >
                        <div className="text-sm font-medium">{component}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Connected Layers</h5>
                    <div className="flex gap-2">
                      {layer.connections.map(connId => {
                        const connectedLayer = layers.find(l => l.id === connId);
                        if (!connectedLayer) return null;
                        return (
                          <button
                            key={connId}
                            onClick={() => setSelectedLayer(connId)}
                            className="px-3 py-1 rounded-lg text-sm transition-colors"
                            style={{
                              backgroundColor: `${connectedLayer.color}20`,
                              color: connectedLayer.color
                            }}
                          >
                            {connectedLayer.name}
                          </button>
                        );
                      })}
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

// Dynamic SIIG Structure with Multiple Views
export function DynamicSIIGStructure() {
  const [viewMode, setViewMode] = useState<'hierarchy' | 'matrix' | 'network'>('hierarchy');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const siigData = {
    leadership: {
      id: 'ceo',
      name: 'CEO',
      children: [
        {
          id: 'siig-head',
          name: 'Global Head SIIG',
          role: 'Industry & Product Innovation',
          reports: 'Direct to CEO',
          children: [
            {
              id: 'healthcare-lead',
              name: 'Healthcare Innovation Lead',
              verticals: ['Providers', 'Payers', 'Life Sciences'],
              team: 25
            },
            {
              id: 'cmt-lead',
              name: 'CMT Innovation Lead',
              verticals: ['Telecom', 'Media', 'Technology'],
              team: 20
            },
            {
              id: 'bfsi-lead',
              name: 'BFSI Innovation Lead',
              verticals: ['Banking', 'Insurance', 'Capital Markets'],
              team: 22
            },
            {
              id: 'retail-lead',
              name: 'Retail Innovation Lead',
              verticals: ['Retail', 'CPG', 'E-commerce'],
              team: 18
            }
          ]
        }
      ]
    },
    matrix: [
      {
        function: 'Industry Leadership',
        roles: ['Healthcare Lead', 'CMT Lead', 'BFSI Lead', 'Retail Lead'],
        responsibilities: ['Strategy', 'Solutions', 'Client Relations', 'P&L']
      },
      {
        function: 'Technology Excellence',
        roles: ['AI/ML Lead', 'Cloud Lead', 'Data Lead', 'Platform Lead'],
        responsibilities: ['Architecture', 'Standards', 'Training', 'Innovation']
      },
      {
        function: 'Go-to-Market',
        roles: ['Sales Enablement', 'Marketing', 'Partnerships', 'Pricing'],
        responsibilities: ['Campaigns', 'Collateral', 'Events', 'Deals']
      }
    ],
    network: {
      nodes: [
        { id: 'siig', label: 'SIIG Core', size: 100, color: ISG_COLORS.primary },
        { id: 'healthcare', label: 'Healthcare', size: 80, color: ISG_COLORS.secondary },
        { id: 'cmt', label: 'CMT', size: 75, color: ISG_COLORS.accent },
        { id: 'bfsi', label: 'BFSI', size: 85, color: ISG_COLORS.purple },
        { id: 'retail', label: 'Retail', size: 70, color: ISG_COLORS.cyan },
        { id: 'tech', label: 'Tech Partners', size: 60, color: ISG_COLORS.danger },
        { id: 'labs', label: 'Innovation Labs', size: 65, color: ISG_COLORS.primary },
        { id: 'clients', label: 'Client Co-innovation', size: 90, color: ISG_COLORS.secondary }
      ],
      links: [
        { source: 'siig', target: 'healthcare', strength: 10 },
        { source: 'siig', target: 'cmt', strength: 9 },
        { source: 'siig', target: 'bfsi', strength: 10 },
        { source: 'siig', target: 'retail', strength: 8 },
        { source: 'healthcare', target: 'tech', strength: 7 },
        { source: 'cmt', target: 'tech', strength: 8 },
        { source: 'bfsi', target: 'tech', strength: 9 },
        { source: 'siig', target: 'labs', strength: 10 },
        { source: 'labs', target: 'clients', strength: 8 },
        { source: 'healthcare', target: 'clients', strength: 9 },
        { source: 'bfsi', target: 'clients', strength: 9 }
      ]
    }
  };

  const renderHierarchyView = () => {
    const renderNode = (node: any, level: number = 0) => {
      const hasChildren = node.children && node.children.length > 0;
      const isSelected = selectedNode === node.id;

      return (
        <div key={node.id} className={`${level > 0 ? 'ml-12' : ''} mb-4`}>
          <motion.div
            className={`bg-gray-800/50 rounded-lg p-4 cursor-pointer border-2 ${
              isSelected ? 'border-blue-500' : 'border-transparent'
            }`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedNode(isSelected ? null : node.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{node.name}</h4>
                {node.role && <p className="text-sm text-gray-400">{node.role}</p>}
                {node.reports && (
                  <p className="text-xs text-blue-400 mt-1">{node.reports}</p>
                )}
              </div>
              {node.team && (
                <div className="text-right">
                  <div className="text-2xl font-bold">{node.team}</div>
                  <div className="text-xs text-gray-400">Team Size</div>
                </div>
              )}
            </div>

            {node.verticals && (
              <div className="flex gap-2 mt-3">
                {node.verticals.map((vertical: string) => (
                  <span key={vertical} className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {vertical}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {hasChildren && (
            <div className="mt-4">
              {node.children.map((child: any) => renderNode(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return renderNode(siigData.leadership);
  };

  const renderMatrixView = () => (
    <div className="space-y-6">
      {siigData.matrix.map((func, idx) => (
        <motion.div
          key={func.function}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gray-800/50 rounded-lg p-6"
        >
          <h4 className="font-semibold text-lg mb-4">{func.function}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-400 mb-2">Key Roles</h5>
              <div className="space-y-2">
                {func.roles.map(role => (
                  <div key={role} className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-400 mb-2">Responsibilities</h5>
              <div className="space-y-2">
                {func.responsibilities.map(resp => (
                  <div key={resp} className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderNetworkView = () => (
    <div className="relative h-[500px] bg-gray-800/30 rounded-lg overflow-hidden">
      {/* Network Links */}
      <svg className="absolute inset-0 w-full h-full">
        {siigData.network.links.map((link, idx) => {
          const sourceNode = siigData.network.nodes.find(n => n.id === link.source);
          const targetNode = siigData.network.nodes.find(n => n.id === link.target);
          if (!sourceNode || !targetNode) return null;

          const sourceX = 50 + Math.cos((siigData.network.nodes.indexOf(sourceNode) / siigData.network.nodes.length) * 2 * Math.PI) * 35;
          const sourceY = 50 + Math.sin((siigData.network.nodes.indexOf(sourceNode) / siigData.network.nodes.length) * 2 * Math.PI) * 35;
          const targetX = 50 + Math.cos((siigData.network.nodes.indexOf(targetNode) / siigData.network.nodes.length) * 2 * Math.PI) * 35;
          const targetY = 50 + Math.sin((siigData.network.nodes.indexOf(targetNode) / siigData.network.nodes.length) * 2 * Math.PI) * 35;

          return (
            <motion.line
              key={idx}
              x1={`${sourceX}%`}
              y1={`${sourceY}%`}
              x2={`${targetX}%`}
              y2={`${targetY}%`}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={link.strength / 3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: idx * 0.05 }}
            />
          );
        })}
      </svg>

      {/* Network Nodes */}
      {siigData.network.nodes.map((node, idx) => {
        const angle = (idx / siigData.network.nodes.length) * 2 * Math.PI;
        const x = 50 + Math.cos(angle) * 35;
        const y = 50 + Math.sin(angle) * 35;

        return (
          <motion.div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <motion.div
              className="rounded-full flex items-center justify-center cursor-pointer"
              style={{
                width: node.size,
                height: node.size,
                backgroundColor: `${node.color}20`,
                borderWidth: 2,
                borderColor: node.color
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-center">
                <div className="text-xs font-medium px-2">{node.label}</div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">SIIG Organizational Dynamics</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('hierarchy')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'hierarchy' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Hierarchy
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'matrix' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Matrix
          </button>
          <button
            onClick={() => setViewMode('network')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'network' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Network
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {viewMode === 'hierarchy' && renderHierarchyView()}
          {viewMode === 'matrix' && renderMatrixView()}
          {viewMode === 'network' && renderNetworkView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Operating Principles Visualization
export function OperatingPrinciplesVisualization() {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

  const principles = [
    {
      title: 'Industry-First Mindset',
      icon: Compass,
      description: 'Deep domain expertise drives innovation',
      color: ISG_COLORS.primary,
      practices: [
        'Industry leaders recruited from target verticals',
        'Solution design starts with industry pain points',
        'Client advisory boards for each vertical',
        'Industry-specific innovation roadmaps'
      ],
      impact: 'Creates authentic, high-value solutions that resonate with clients'
    },
    {
      title: 'Rapid Experimentation',
      icon: Rocket,
      description: 'Fast prototyping with continuous learning',
      color: ISG_COLORS.secondary,
      practices: [
        '2-week prototype sprints',
        'Fail-fast methodology',
        'Client co-creation sessions',
        'Weekly innovation demos'
      ],
      impact: 'Accelerates time-to-value and reduces innovation risk'
    },
    {
      title: 'Ecosystem Leverage',
      icon: Network,
      description: 'Multiplier effect through partnerships',
      color: ISG_COLORS.accent,
      practices: [
        'Strategic technology alliances',
        'Startup accelerator program',
        'Academic collaborations',
        'Open innovation platform'
      ],
      impact: 'Expands capabilities and accelerates solution development'
    },
    {
      title: 'Value Realization Focus',
      icon: Target,
      description: 'Measurable business outcomes',
      color: ISG_COLORS.purple,
      practices: [
        'Outcome-based pricing models',
        'Value tracking dashboards',
        'Success metrics alignment',
        'Continuous optimization'
      ],
      impact: 'Ensures innovation delivers tangible business results'
    },
    {
      title: 'Innovation Culture',
      icon: Lightbulb,
      description: 'Embedded innovation mindset',
      color: ISG_COLORS.cyan,
      practices: [
        'Innovation training programs',
        'Hackathons and challenges',
        'Recognition and rewards',
        'Cross-pollination events'
      ],
      impact: 'Creates sustainable innovation capability across the organization'
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">SIIG Operating Principles</h3>
      
      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {principles.map((principle, index) => {
          const Icon = principle.icon;
          const isActive = activePrinciple === index;

          return (
            <motion.div
              key={principle.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 cursor-pointer border-2 h-full"
                style={{ borderColor: isActive ? principle.color : 'transparent' }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActivePrinciple(isActive ? null : index)}
              >
                <Icon className="w-10 h-10 mb-3" style={{ color: principle.color }} />
                <h4 className="font-semibold mb-2">{principle.title}</h4>
                <p className="text-sm text-gray-400">{principle.description}</p>
              </motion.div>

              {/* Connection Lines */}
              {index < principles.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gray-600" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Principle Details */}
      <AnimatePresence>
        {activePrinciple !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 rounded-lg p-6 border-2"
            style={{ borderColor: principles[activePrinciple].color }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="font-medium mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5" style={{ color: principles[activePrinciple].color }} />
                  Key Practices
                </h5>
                <div className="space-y-2">
                  {principles[activePrinciple].practices.map((practice, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: principles[activePrinciple].color }} />
                      <span className="text-sm">{practice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h5 className="font-medium mb-3 flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5" style={{ color: principles[activePrinciple].color }} />
                  Business Impact
                </h5>
                <p className="text-gray-300">{principles[activePrinciple].impact}</p>
                
                {/* Visual Impact Representation */}
                <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Impact Score</span>
                    <span className="text-2xl font-bold" style={{ color: principles[activePrinciple].color }}>9.{5 + activePrinciple}/10</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: principles[activePrinciple].color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${95 + activePrinciple}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Implementation Roadmap Visual
export function ImplementationRoadmapVisual() {
  const [viewType, setViewType] = useState<'timeline' | 'gantt'>('timeline');
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const roadmap = {
    phases: [
      {
        id: 'foundation',
        name: 'Foundation Phase',
        duration: '0-90 days',
        color: ISG_COLORS.primary,
        milestones: [
          { id: 'm1', day: 15, title: 'Executive Alignment', status: 'completed' },
          { id: 'm2', day: 30, title: 'Core Team Hired', status: 'completed' },
          { id: 'm3', day: 60, title: 'First Prototypes', status: 'in-progress' },
          { id: 'm4', day: 90, title: 'Innovation Lab Live', status: 'planned' }
        ],
        activities: [
          { name: 'Leadership Recruitment', start: 0, duration: 45 },
          { name: 'Capability Assessment', start: 15, duration: 30 },
          { name: 'Infrastructure Setup', start: 30, duration: 60 },
          { name: 'Partnership Framework', start: 45, duration: 45 }
        ]
      },
      {
        id: 'build',
        name: 'Build Phase',
        duration: '91-180 days',
        color: ISG_COLORS.secondary,
        milestones: [
          { id: 'm5', day: 120, title: '20 Prototypes Live', status: 'planned' },
          { id: 'm6', day: 150, title: 'Partner Ecosystem', status: 'planned' },
          { id: 'm7', day: 180, title: 'Market Launch', status: 'planned' }
        ],
        activities: [
          { name: 'Solution Development', start: 90, duration: 90 },
          { name: 'Client Engagement', start: 105, duration: 75 },
          { name: 'Go-to-Market Prep', start: 135, duration: 45 },
          { name: 'Team Scaling', start: 90, duration: 60 }
        ]
      },
      {
        id: 'scale',
        name: 'Scale Phase',
        duration: '181-365 days',
        color: ISG_COLORS.accent,
        milestones: [
          { id: 'm8', day: 270, title: '$10M Pipeline', status: 'planned' },
          { id: 'm9', day: 365, title: '$20M Revenue', status: 'planned' }
        ],
        activities: [
          { name: 'Commercial Optimization', start: 180, duration: 185 },
          { name: 'Geographic Expansion', start: 210, duration: 155 },
          { name: 'Platform Evolution', start: 180, duration: 185 },
          { name: 'Culture Transformation', start: 90, duration: 275 }
        ]
      }
    ],
    criticalPath: ['m1', 'm2', 'm3', 'm5', 'm6', 'm8', 'm9']
  };

  const renderTimeline = () => (
    <div className="relative">
      {/* Timeline axis */}
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700 -translate-y-1/2" />
      
      {/* Phase blocks */}
      <div className="relative grid grid-cols-3 gap-4 mb-12">
        {roadmap.phases.map((phase, phaseIdx) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: phaseIdx * 0.1 }}
            className="relative"
          >
            <div 
              className="bg-gray-800/50 rounded-lg p-4 mb-4 border-2"
              style={{ borderColor: phase.color }}
            >
              <h4 className="font-semibold" style={{ color: phase.color }}>
                {phase.name}
              </h4>
              <p className="text-sm text-gray-400">{phase.duration}</p>
            </div>

            {/* Milestones */}
            <div className="relative h-32">
              {phase.milestones.map((milestone, idx) => {
                const position = ((milestone.day - (phaseIdx * 90)) / 90) * 100;
                const isCritical = roadmap.criticalPath.includes(milestone.id);
                const isSelected = selectedMilestone === milestone.id;

                return (
                  <motion.div
                    key={milestone.id}
                    className="absolute transform -translate-x-1/2"
                    style={{ left: `${position}%`, top: '50%' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: phaseIdx * 0.1 + idx * 0.05 }}
                  >
                    <motion.div
                      className="relative cursor-pointer"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setSelectedMilestone(isSelected ? null : milestone.id)}
                    >
                      {/* Milestone marker */}
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{
                          backgroundColor: milestone.status === 'completed' ? phase.color : 'transparent',
                          borderColor: phase.color,
                          boxShadow: isCritical ? `0 0 0 4px ${phase.color}40` : 'none'
                        }}
                      />
                      
                      {/* Milestone label */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="text-xs font-medium">{milestone.title}</div>
                        <div className="text-xs text-gray-500">Day {milestone.day}</div>
                      </div>

                      {/* Status indicator */}
                      {milestone.status === 'in-progress' && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: phase.color }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderGantt = () => (
    <div className="bg-gray-800/30 rounded-lg p-4 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Timeline header */}
        <div className="flex mb-4">
          <div className="w-48 font-medium">Activity</div>
          <div className="flex-1 flex">
            {[0, 90, 180, 270, 365].map(day => (
              <div key={day} className="flex-1 text-center text-sm text-gray-400">
                Day {day}
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        {roadmap.phases.flatMap(phase => 
          phase.activities.map((activity, idx) => {
            const totalDays = 365;
            const startPercent = (activity.start / totalDays) * 100;
            const widthPercent = (activity.duration / totalDays) * 100;

            return (
              <motion.div
                key={`${phase.id}-${idx}`}
                className="flex items-center mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="w-48 text-sm truncate">{activity.name}</div>
                <div className="flex-1 relative h-8">
                  <motion.div
                    className="absolute h-full rounded"
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                      backgroundColor: phase.color,
                      opacity: 0.7
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">365-Day Implementation Roadmap</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('timeline')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewType === 'timeline' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Timeline View
          </button>
          <button
            onClick={() => setViewType('gantt')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewType === 'gantt' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Gantt View
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {viewType === 'timeline' ? renderTimeline() : renderGantt()}
        </motion.div>
      </AnimatePresence>

      {/* Milestone Details */}
      <AnimatePresence>
        {selectedMilestone && viewType === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-white/20"
          >
            {(() => {
              const milestone = roadmap.phases
                .flatMap(p => p.milestones)
                .find(m => m.id === selectedMilestone);
              if (!milestone) return null;

              return (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{milestone.title}</h4>
                    <p className="text-sm text-gray-400">Target: Day {milestone.day}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      milestone.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      milestone.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                    {roadmap.criticalPath.includes(milestone.id) && (
                      <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400">
                        Critical Path
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Success Metrics Dashboard
export function SuccessMetricsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'quarter' | 'year'>('year');

  const metricsData = {
    financial: [
      { month: 'M1', revenue: 0, pipeline: 0.5, deals: 0 },
      { month: 'M3', revenue: 0.2, pipeline: 2, deals: 2 },
      { month: 'M6', revenue: 1.5, pipeline: 8, deals: 5 },
      { month: 'M9', revenue: 5, pipeline: 15, deals: 12 },
      { month: 'M12', revenue: 20, pipeline: 50, deals: 25 }
    ],
    operational: [
      { metric: 'Prototype Velocity', current: 15, target: 15, unit: 'per month' },
      { metric: 'Time to Market', current: 14, target: 21, unit: 'days' },
      { metric: 'Partner Activations', current: 12, target: 10, unit: 'active' },
      { metric: 'Innovation Index', current: 8.5, target: 8, unit: 'score' }
    ],
    innovation: [
      { category: 'AI/ML Solutions', value: 35, color: ISG_COLORS.primary },
      { category: 'Process Automation', value: 25, color: ISG_COLORS.secondary },
      { category: 'Data Analytics', value: 20, color: ISG_COLORS.accent },
      { category: 'Cloud Native', value: 15, color: ISG_COLORS.purple },
      { category: 'Other', value: 5, color: ISG_COLORS.cyan }
    ],
    talent: {
      total: 100,
      breakdown: [
        { role: 'Innovation Leaders', count: 10, level: 'Executive' },
        { role: 'Solution Architects', count: 20, level: 'Senior' },
        { role: 'AI/ML Engineers', count: 30, level: 'Senior' },
        { role: 'Domain Experts', count: 25, level: 'Senior' },
        { role: 'Business Analysts', count: 15, level: 'Mid' }
      ]
    }
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Success Metrics Dashboard</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === 'quarter' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === 'year' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Performance */}
        <motion.div
          className="bg-gray-800/50 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="font-semibold mb-4">Financial Performance ($M)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={metricsData.financial}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1"
                stroke={ISG_COLORS.primary} 
                fill={ISG_COLORS.primary}
                fillOpacity={0.6}
                name="Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="pipeline" 
                stackId="2"
                stroke={ISG_COLORS.secondary} 
                fill={ISG_COLORS.secondary}
                fillOpacity={0.4}
                name="Pipeline"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Operational Excellence */}
        <motion.div
          className="bg-gray-800/50 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="font-semibold mb-4">Operational Excellence</h4>
          <div className="space-y-4">
            {metricsData.operational.map((metric, idx) => {
              const performance = (metric.current / metric.target) * 100;
              const isExceeding = metric.current > metric.target;

              return (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{metric.metric}</span>
                    <span className="text-sm font-medium">
                      {metric.current} {metric.unit}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute h-full rounded-full"
                      style={{ 
                        backgroundColor: isExceeding ? ISG_COLORS.secondary : ISG_COLORS.accent 
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(performance, 100)}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    />
                    <div 
                      className="absolute h-full w-1 bg-white/50"
                      style={{ left: '100%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Innovation Portfolio */}
        <motion.div
          className="bg-gray-800/50 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-semibold mb-4">Innovation Portfolio Mix</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={metricsData.innovation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {metricsData.innovation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {metricsData.innovation.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs">{item.category}: {item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Talent Distribution */}
        <motion.div
          className="bg-gray-800/50 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold mb-4">Talent Distribution</h4>
          <div className="mb-4">
            <div className="text-3xl font-bold">{metricsData.talent.total}</div>
            <div className="text-sm text-gray-400">Total Team Members</div>
          </div>
          <div className="space-y-3">
            {metricsData.talent.breakdown.map((role, idx) => (
              <div key={role.role} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{role.role}</div>
                  <div className="text-xs text-gray-400">{role.level}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold">{role.count}</div>
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(role.count / metricsData.talent.total) * 100}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Cultural Transformation Journey
export function CulturalTransformationJourney() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  const dimensions = [
    {
      id: 'mindset',
      name: 'Innovation Mindset',
      icon: Brain,
      color: ISG_COLORS.primary,
      current: 35,
      target: 85,
      initiatives: [
        'Design thinking workshops',
        'Innovation bootcamps',
        'Fail-fast culture programs',
        'Creative problem-solving training'
      ]
    },
    {
      id: 'collaboration',
      name: 'Cross-functional Collaboration',
      icon: Users,
      color: ISG_COLORS.secondary,
      current: 40,
      target: 90,
      initiatives: [
        'Cross-BU innovation teams',
        'Co-creation sessions',
        'Knowledge sharing platforms',
        'Innovation communities'
      ]
    },
    {
      id: 'agility',
      name: 'Organizational Agility',
      icon: Zap,
      color: ISG_COLORS.accent,
      current: 30,
      target: 80,
      initiatives: [
        'Agile transformation',
        'Rapid decision frameworks',
        'Flexible resource allocation',
        'Sprint-based execution'
      ]
    },
    {
      id: 'customer',
      name: 'Customer Centricity',
      icon: Heart,
      color: ISG_COLORS.purple,
      current: 50,
      target: 95,
      initiatives: [
        'Customer co-innovation labs',
        'Voice of customer programs',
        'Experience design focus',
        'Value realization tracking'
      ]
    },
    {
      id: 'learning',
      name: 'Continuous Learning',
      icon: BookOpen,
      color: ISG_COLORS.cyan,
      current: 45,
      target: 85,
      initiatives: [
        'AI/ML certification programs',
        'Innovation academies',
        'External partnerships',
        'Learning sabbaticals'
      ]
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Cultural Transformation Journey</h3>
      
      {/* Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/30 rounded-lg p-6">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={dimensions}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#9CA3AF' }}
              />
              <Radar
                name="Current State"
                dataKey="current"
                stroke={ISG_COLORS.danger}
                fill={ISG_COLORS.danger}
                fillOpacity={0.3}
              />
              <Radar
                name="Target State"
                dataKey="target"
                stroke={ISG_COLORS.secondary}
                fill={ISG_COLORS.secondary}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ISG_COLORS.danger }} />
              <span className="text-sm">Current State</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ISG_COLORS.secondary }} />
              <span className="text-sm">Target State</span>
            </div>
          </div>
        </div>

        {/* Dimension Cards */}
        <div className="space-y-3">
          {dimensions.map((dimension) => {
            const Icon = dimension.icon;
            const progress = (dimension.current / dimension.target) * 100;
            const isSelected = selectedDimension === dimension.id;

            return (
              <motion.div
                key={dimension.id}
                className="bg-gray-800/50 rounded-lg p-4 cursor-pointer border-2"
                style={{ borderColor: isSelected ? dimension.color : 'transparent' }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDimension(isSelected ? null : dimension.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: dimension.color }} />
                    <h4 className="font-medium">{dimension.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{dimension.current}%</div>
                    <div className="text-xs text-gray-400">→ {dimension.target}%</div>
                  </div>
                </div>
                
                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute h-full rounded-full"
                    style={{ backgroundColor: dimension.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <div 
                    className="absolute h-full w-1 bg-white/50"
                    style={{ left: `${dimension.target}%` }}
                  />
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-gray-700"
                    >
                      <h5 className="text-sm font-medium mb-2">Key Initiatives</h5>
                      <div className="space-y-1">
                        {dimension.initiatives.map((initiative, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: dimension.color }} />
                            <span className="text-xs">{initiative}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}