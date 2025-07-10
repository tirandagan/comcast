'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Cpu, Zap, Clock, Users, Code, Layers, Rocket, Target,
  CheckCircle, AlertCircle, Activity, GitBranch, Monitor,
  Briefcase, GraduationCap, Trophy, Calendar, ChevronRight,
  X, Play, Pause, FastForward, RotateCcw, Info, Settings,
  Database, Cloud, Terminal, Package, Sparkles, Lightbulb, Shield
} from 'lucide-react';

// Color scheme
const COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  cyan: '#06B6D4'
};

// AI Development Accelerators Comparison
export function AIAcceleratorsMatrix() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const tiers = [
    {
      name: 'Tier 1: Code Generation',
      icon: Code,
      color: COLORS.primary,
      description: 'AI-powered coding assistants that accelerate development',
      tools: [
        {
          name: 'Cursor AI',
          productivity: '75%',
          cost: '$40/user/month',
          features: ['GPT-4 integration', 'Context-aware suggestions', 'Multi-file editing', 'Natural language coding'],
          bestFor: 'Full-stack development, rapid prototyping',
          rating: 5
        },
        {
          name: 'GitHub Copilot',
          productivity: '55%',
          cost: '$19/user/month',
          features: ['Code completion', 'Pattern recognition', 'Multi-language support', 'IDE integration'],
          bestFor: 'General development, existing codebases',
          rating: 4
        },
        {
          name: 'Tabnine',
          productivity: '40%',
          cost: '$15/user/month',
          features: ['Team training', 'Private models', 'Code privacy', 'Local hosting option'],
          bestFor: 'Enterprise teams, security-conscious orgs',
          rating: 3.5
        }
      ]
    },
    {
      name: 'Tier 2: Low-Code Platforms',
      icon: Layers,
      color: COLORS.secondary,
      description: 'Visual development platforms for rapid application building',
      tools: [
        {
          name: 'OutSystems',
          productivity: '85%',
          cost: 'Enterprise pricing',
          features: ['Full-stack platform', 'Mobile native', 'AI services', 'Enterprise scale'],
          bestFor: 'Complex enterprise apps, digital transformation',
          rating: 4.5
        },
        {
          name: 'Mendix',
          productivity: '80%',
          cost: '$1,875/app/month',
          features: ['Visual modeling', 'Collaboration tools', 'Cloud deployment', 'Governance'],
          bestFor: 'Business process automation, workflow apps',
          rating: 4
        },
        {
          name: 'Retool',
          productivity: '70%',
          cost: '$50/user/month',
          features: ['Internal tools focus', 'Database integration', 'API connectivity', 'Custom components'],
          bestFor: 'Admin panels, internal dashboards',
          rating: 4.5
        },
        {
          name: 'Appsmith',
          productivity: '65%',
          cost: 'Self-hosted free',
          features: ['Open source option', 'Widget library', 'JavaScript support', 'Git sync'],
          bestFor: 'Budget-conscious teams, open source preference',
          rating: 4
        }
      ]
    },
    {
      name: 'Tier 3: AI Frameworks',
      icon: Cpu,
      color: COLORS.purple,
      description: 'Specialized AI/ML platforms and services',
      tools: [
        {
          name: 'OpenAI GPT-4',
          productivity: '90%',
          cost: 'Usage-based',
          features: ['State-of-art LLM', 'Function calling', 'Vision capabilities', 'Fine-tuning'],
          bestFor: 'Conversational AI, content generation, analysis',
          rating: 5
        },
        {
          name: 'Claude (Anthropic)',
          productivity: '85%',
          cost: 'Usage-based',
          features: ['Large context window', 'Constitutional AI', 'Code analysis', 'Safer outputs'],
          bestFor: 'Complex reasoning, code review, documentation',
          rating: 4.5
        },
        {
          name: 'Hugging Face',
          productivity: '75%',
          cost: '$9/user/month',
          features: ['Model hub', 'Open source', 'Fine-tuning tools', 'Deployment options'],
          bestFor: 'Custom models, research, cost optimization',
          rating: 4
        },
        {
          name: 'Vertex AI',
          productivity: '80%',
          cost: 'Usage-based',
          features: ['Google integration', 'AutoML', 'Model monitoring', 'MLOps'],
          bestFor: 'Enterprise ML pipelines, Google ecosystem',
          rating: 4
        }
      ]
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">AI Development Accelerators</h3>
      
      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === index;
          
          return (
            <motion.div
              key={tier.name}
              className={`bg-gray-800/50 rounded-lg p-6 cursor-pointer border-2 transition-all ${
                isSelected ? 'border-opacity-100' : 'border-opacity-30 hover:border-opacity-60'
              }`}
              style={{ borderColor: tier.color }}
              onClick={() => setSelectedTier(isSelected ? null : index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${tier.color}20` }}>
                  <Icon className="w-8 h-8" style={{ color: tier.color }} />
                </div>
                <motion.div
                  animate={{ rotate: isSelected ? 180 : 0 }}
                  className="mt-3"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
              
              <h4 className="text-lg font-semibold mb-2">{tier.name}</h4>
              <p className="text-sm text-gray-400 mb-4">{tier.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{tier.tools.length} tools</span>
                <span className="text-xs font-medium" style={{ color: tier.color }}>
                  {Math.round(tier.tools.reduce((acc, tool) => acc + parseInt(tool.productivity), 0) / tier.tools.length)}% avg productivity
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tool Details */}
      <AnimatePresence>
        {selectedTier !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {tiers[selectedTier].tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 rounded-lg p-6 border border-gray-700"
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Tool Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="text-xl font-semibold">{tool.name}</h5>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                              i < tool.rating ? 'bg-yellow-500' : 'bg-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4">{tool.bestFor}</p>
                    
                    <div className="space-y-2">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-3xl font-bold" style={{ color: tiers[selectedTier].color }}>
                        +{tool.productivity}
                      </div>
                      <div className="text-sm text-gray-400">Productivity Gain</div>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-lg font-semibold">{tool.cost}</div>
                      <div className="text-sm text-gray-400">Pricing</div>
                    </div>
                  </div>

                  {/* Productivity Visualization */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#374151"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke={tiers[selectedTier].color}
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56 * (parseInt(tool.productivity) / 100)} ${2 * Math.PI * 56}`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{tool.productivity}</div>
                          <div className="text-xs text-gray-400">faster</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sprint Methodology Timeline
export function SprintMethodologyTimeline() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const weeks = [
    {
      week: 1,
      phase: 'Discovery & Setup',
      color: COLORS.primary,
      activities: [
        { time: 'Day 1-2', task: 'Problem Definition Workshop', deliverable: 'Problem statement & success criteria' },
        { time: 'Day 2-3', task: 'Solution Architecture', deliverable: 'Technical design document' },
        { time: 'Day 3-4', task: 'Environment Setup', deliverable: 'Development environment ready' },
        { time: 'Day 4-5', task: 'Data Preparation', deliverable: 'Sample data & API access' }
      ],
      metrics: { velocity: 20, quality: 90, risk: 'Low' }
    },
    {
      week: 2,
      phase: 'Core Development',
      color: COLORS.secondary,
      activities: [
        { time: 'Day 6-7', task: 'MVP Development', deliverable: 'Basic functionality working' },
        { time: 'Day 8-9', task: 'AI Integration', deliverable: 'AI models connected' },
        { time: 'Day 9-10', task: 'UI/UX Implementation', deliverable: 'User interface complete' }
      ],
      metrics: { velocity: 60, quality: 75, risk: 'Medium' }
    },
    {
      week: 3,
      phase: 'Enhancement & Testing',
      color: COLORS.accent,
      activities: [
        { time: 'Day 11-12', task: 'Feature Enhancement', deliverable: 'Advanced features added' },
        { time: 'Day 13-14', task: 'Integration Testing', deliverable: 'Test results & bug fixes' },
        { time: 'Day 14-15', task: 'Performance Optimization', deliverable: 'Optimized application' }
      ],
      metrics: { velocity: 80, quality: 85, risk: 'Medium' }
    },
    {
      week: 4,
      phase: 'Validation & Handoff',
      color: COLORS.purple,
      activities: [
        { time: 'Day 16-17', task: 'User Acceptance Testing', deliverable: 'UAT sign-off' },
        { time: 'Day 18-19', task: 'Documentation', deliverable: 'Complete documentation' },
        { time: 'Day 19-20', task: 'Executive Demo', deliverable: 'Stakeholder approval' }
      ],
      metrics: { velocity: 95, quality: 95, risk: 'Low' }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setActiveWeek((prev) => (prev >= 4 ? 1 : prev + 1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, activeWeek]);

  const currentWeek = weeks[activeWeek - 1];

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">2-4 Week Sprint Methodology</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveWeek(1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setActiveWeek(prev => (prev >= 4 ? 1 : prev + 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Next"
          >
            <FastForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-8">
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-700" />
        <div className="relative flex justify-between">
          {weeks.map((week) => (
            <motion.div
              key={week.week}
              className="relative"
              animate={{ scale: activeWeek === week.week ? 1.1 : 1 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer ${
                  activeWeek === week.week ? 'ring-4' : ''
                }`}
                style={{
                  backgroundColor: activeWeek >= week.week ? week.color : '#374151',
                  boxShadow: `0 0 0 3px ${week.color}`
                }}
                onClick={() => setActiveWeek(week.week)}
                whileHover={{ scale: 1.1 }}
              >
                <span className="font-bold text-lg">W{week.week}</span>
              </motion.div>
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center w-32">
                <div className="text-sm font-medium">{week.phase}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Week Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities */}
        <div className="lg:col-span-2 bg-gray-800/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: currentWeek.color }} />
            Week {currentWeek.week} Activities
          </h4>
          
          <div className="space-y-4">
            {currentWeek.activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div 
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: currentWeek.color }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{activity.task}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                  <div className="mt-2 p-3 bg-gray-900/50 rounded text-sm">
                    <span className="text-gray-400">Deliverable:</span> {activity.deliverable}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Week {currentWeek.week} Metrics</h4>
            
            <div className="space-y-4">
              {/* Velocity */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Development Velocity</span>
                  <span className="text-sm font-medium">{currentWeek.metrics.velocity}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: currentWeek.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentWeek.metrics.velocity}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Quality */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Quality Score</span>
                  <span className="text-sm font-medium">{currentWeek.metrics.quality}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentWeek.metrics.quality}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Risk Level</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    currentWeek.metrics.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                    currentWeek.metrics.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {currentWeek.metrics.risk}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Overall Progress</h4>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block uppercase text-blue-400">
                    Sprint Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-400">
                    {(activeWeek / 4 * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                <motion.div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeWeek / 4 * 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prototype to Production Pipeline
export function PrototypeToProductionPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      name: 'Validation',
      week: 'Week 5-6',
      icon: CheckCircle,
      color: COLORS.primary,
      activities: [
        'Extended user testing',
        'Security assessment',
        'Scalability analysis',
        'Business case refinement'
      ],
      outputs: ['Validated prototype', 'Security report', 'Scale plan'],
      successRate: 85
    },
    {
      name: 'Hardening',
      week: 'Week 7-10',
      icon: Shield,
      color: COLORS.secondary,
      activities: [
        'Code refactoring',
        'Security implementation',
        'Performance optimization',
        'Error handling'
      ],
      outputs: ['Production-ready code', 'Test suite', 'Performance benchmarks'],
      successRate: 75
    },
    {
      name: 'Integration',
      week: 'Week 11-14',
      icon: GitBranch,
      color: COLORS.accent,
      activities: [
        'System integration',
        'Data migration',
        'API development',
        'User training'
      ],
      outputs: ['Integrated solution', 'API documentation', 'Training materials'],
      successRate: 70
    },
    {
      name: 'Deployment',
      week: 'Week 15-17',
      icon: Rocket,
      color: COLORS.purple,
      activities: [
        'Production deployment',
        'Monitoring setup',
        'Support handoff',
        'Success metrics'
      ],
      outputs: ['Live application', 'Monitoring dashboard', 'Support documentation'],
      successRate: 95
    }
  ];

  const sankeyData = {
    nodes: [
      { name: 'Prototypes' },
      { name: 'Validation' },
      { name: 'Hardening' },
      { name: 'Integration' },
      { name: 'Production' },
      { name: 'Failed' }
    ],
    links: [
      { source: 0, target: 1, value: 100 },
      { source: 1, target: 2, value: 85 },
      { source: 1, target: 5, value: 15 },
      { source: 2, target: 3, value: 64 },
      { source: 2, target: 5, value: 21 },
      { source: 3, target: 4, value: 45 },
      { source: 3, target: 5, value: 19 }
    ]
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Prototype to Production Pipeline</h3>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = activeStage === index;
          
          return (
            <motion.div
              key={stage.name}
              className={`bg-gray-800/50 rounded-lg p-4 cursor-pointer border-2 ${
                isActive ? 'border-opacity-100' : 'border-opacity-30'
              }`}
              style={{ borderColor: stage.color }}
              onClick={() => setActiveStage(index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stage.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: stage.color }} />
                </div>
                <span className="text-xs text-gray-400">{stage.week}</span>
              </div>
              
              <h4 className="font-semibold mb-2">{stage.name}</h4>
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-400">Success Rate</span>
                <span className="text-sm font-medium" style={{ color: stage.color }}>
                  {stage.successRate}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stage Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 rounded-lg p-6"
        >
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            {(() => {
              const Icon = stages[activeStage].icon;
              return <Icon className="w-5 h-5" style={{ color: stages[activeStage].color }} />;
            })()}
            {stages[activeStage].name} Activities
          </h4>
          
          <div className="space-y-3">
            {stages[activeStage].activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <ChevronRight 
                  className="w-4 h-4 flex-shrink-0" 
                  style={{ color: stages[activeStage].color }} 
                />
                <span className="text-sm">{activity}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h5 className="font-medium mb-3">Key Outputs</h5>
            <div className="space-y-2">
              {stages[activeStage].outputs.map((output, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400">{output}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Success Flow Visualization */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Success Flow Analysis</h4>
          <div className="space-y-4">
            {sankeyData.links.map((link, index) => {
              const sourceNode = sankeyData.nodes[link.source].name;
              const targetNode = sankeyData.nodes[link.target].name;
              const percentage = Math.round((link.value / 100) * 100);
              const isFailure = targetNode === 'Failed';
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-sm text-gray-400 w-24 text-right">{sourceNode}</div>
                  <div className="flex-1 relative h-8">
                    <div className="absolute inset-0 bg-gray-700 rounded-full" />
                    <motion.div
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        isFailure ? 'bg-red-500/50' : 'bg-blue-500/50'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                      {link.value}%
                    </div>
                  </div>
                  <div className={`text-sm w-24 ${
                    isFailure ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {targetNode}
                  </div>
                </div>
              );
            }).filter((_, index) => index < 5)}
          </div>
          <div className="mt-6 text-center text-sm text-gray-400">
            45% of prototypes reach production within 17 weeks
          </div>
        </div>
      </div>
    </div>
  );
}

// Citizen Developer Training Program
export function CitizenDeveloperProgram() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const curriculum = [
    {
      week: 1,
      title: 'Foundation',
      modules: [
        { name: 'AI Fundamentals', duration: '4 hours', type: 'Theory' },
        { name: 'Tool Introduction', duration: '4 hours', type: 'Hands-on' },
        { name: 'Basic Prompting', duration: '4 hours', type: 'Practice' },
        { name: 'Ethics & Safety', duration: '2 hours', type: 'Theory' }
      ],
      skills: ['AI basics', 'Tool navigation', 'Prompt writing', 'Best practices'],
      assessment: 'Foundation Quiz'
    },
    {
      week: 2,
      title: 'Hands-On Practice',
      modules: [
        { name: 'Building with AI', duration: '6 hours', type: 'Hands-on' },
        { name: 'Low-Code Development', duration: '6 hours', type: 'Practice' },
        { name: 'Data Integration', duration: '4 hours', type: 'Hands-on' },
        { name: 'Testing & Debugging', duration: '2 hours', type: 'Practice' }
      ],
      skills: ['AI-assisted coding', 'Visual development', 'API usage', 'Quality assurance'],
      assessment: 'Practical Exercise'
    },
    {
      week: 3,
      title: 'Advanced Techniques',
      modules: [
        { name: 'Complex Workflows', duration: '4 hours', type: 'Practice' },
        { name: 'Performance Optimization', duration: '4 hours', type: 'Theory' },
        { name: 'Security Basics', duration: '4 hours', type: 'Theory' },
        { name: 'Collaboration Tools', duration: '2 hours', type: 'Hands-on' }
      ],
      skills: ['Advanced patterns', 'Optimization', 'Security awareness', 'Team collaboration'],
      assessment: 'Group Project'
    },
    {
      week: 4,
      title: 'Certification Project',
      modules: [
        { name: 'Project Planning', duration: '2 hours', type: 'Practice' },
        { name: 'Solution Development', duration: '8 hours', type: 'Project' },
        { name: 'Documentation', duration: '2 hours', type: 'Practice' },
        { name: 'Presentation', duration: '2 hours', type: 'Assessment' }
      ],
      skills: ['End-to-end delivery', 'Documentation', 'Presentation', 'Real-world application'],
      assessment: 'Final Certification'
    }
  ];

  const learnerJourney = [
    { stage: 'Business Analyst', level: 0, icon: Briefcase },
    { stage: 'AI Trainee', level: 25, icon: GraduationCap },
    { stage: 'Citizen Developer', level: 50, icon: Code },
    { stage: 'Innovation Champion', level: 75, icon: Lightbulb },
    { stage: 'AI Leader', level: 100, icon: Trophy }
  ];

  const currentWeek = curriculum[selectedWeek - 1];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Citizen Developer Training Program</h3>

      {/* Learner Journey */}
      <div className="mb-8 p-6 bg-gray-800/50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Transformation Journey</h4>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-700 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -translate-y-1/2"
               style={{ width: `${(selectedWeek / 4) * 100}%` }} />
          
          <div className="relative flex justify-between">
            {learnerJourney.map((stage, index) => {
              const Icon = stage.icon;
              const isPassed = (selectedWeek / 4) * 100 >= stage.level;
              
              return (
                <div key={stage.stage} className="text-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isPassed ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gray-700'
                    }`}
                    animate={{ scale: isPassed ? 1.1 : 1 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className="text-xs mt-2">{stage.stage}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {curriculum.map((week) => (
          <button
            key={week.week}
            onClick={() => setSelectedWeek(week.week)}
            className={`p-4 rounded-lg transition-all ${
              selectedWeek === week.week
                ? 'bg-blue-600/20 border-2 border-blue-600'
                : 'bg-gray-800/50 border-2 border-transparent hover:border-gray-600'
            }`}
          >
            <div className="text-lg font-bold mb-1">Week {week.week}</div>
            <div className="text-sm text-gray-400">{week.title}</div>
          </button>
        ))}
      </div>

      {/* Week Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Curriculum */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Week {currentWeek.week} Curriculum</h4>
          
          <div className="space-y-3">
            {currentWeek.modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    module.type === 'Theory' ? 'bg-blue-500/20 text-blue-400' :
                    module.type === 'Hands-on' ? 'bg-green-500/20 text-green-400' :
                    module.type === 'Practice' ? 'bg-yellow-500/20 text-yellow-400' :
                    module.type === 'Project' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {module.type}
                  </div>
                  <span className="font-medium">{module.name}</span>
                </div>
                <span className="text-sm text-gray-400">{module.duration}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Week Assessment</span>
              <span className="text-blue-400">{currentWeek.assessment}</span>
            </div>
          </div>
        </div>

        {/* Skills & Outcomes */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Skills Acquired</h4>
            <div className="grid grid-cols-2 gap-3">
              {currentWeek.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg"
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Success Metrics</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Completion Rate</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Certification Rate</span>
                  <span className="text-sm font-medium">80%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Time to Productivity</span>
                  <span className="text-sm font-medium">50% reduction</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Innovation Lab Infrastructure
export function InnovationLabInfrastructure() {
  const [activeView, setActiveView] = useState<'physical' | 'technical' | 'tools'>('physical');

  const infrastructure = {
    physical: {
      zones: [
        {
          name: 'Collaboration Hub',
          size: '2,000 sq ft',
          capacity: '20-30 people',
          features: ['Whiteboard walls', 'Video conferencing', 'Flexible seating', 'Breakout areas'],
          icon: Users
        },
        {
          name: 'Development Zone',
          size: '1,500 sq ft',
          capacity: '15-20 developers',
          features: ['High-performance workstations', 'Dual monitors', 'Standing desks', 'Quiet focus areas'],
          icon: Monitor
        },
        {
          name: 'Demo Theater',
          size: '800 sq ft',
          capacity: '50 people',
          features: ['4K displays', 'Surround sound', 'Live streaming', 'Recording capability'],
          icon: Play
        },
        {
          name: 'Innovation Garage',
          size: '1,200 sq ft',
          capacity: '10-15 makers',
          features: ['3D printers', 'IoT devices', 'AR/VR equipment', 'Hardware prototyping'],
          icon: Settings
        }
      ]
    },
    technical: {
      stack: [
        {
          category: 'Compute',
          items: ['GPU clusters', 'Cloud instances', 'Edge devices', 'Quantum simulators'],
          investment: '$500K',
          icon: Cpu
        },
        {
          category: 'Storage',
          items: ['Data lakes', 'Vector databases', 'Object storage', 'CDN'],
          investment: '$200K',
          icon: Database
        },
        {
          category: 'Networking',
          items: ['10Gb fiber', 'SD-WAN', '5G testbed', 'Zero trust security'],
          investment: '$150K',
          icon: Cloud
        },
        {
          category: 'Development',
          items: ['CI/CD pipelines', 'Container orchestration', 'Monitoring', 'Testing frameworks'],
          investment: '$100K',
          icon: Terminal
        }
      ]
    },
    tools: {
      categories: [
        {
          name: 'AI/ML Platforms',
          tools: ['TensorFlow', 'PyTorch', 'Hugging Face', 'MLflow'],
          licenses: 'Enterprise',
          cost: '$200K/year'
        },
        {
          name: 'Collaboration',
          tools: ['Slack', 'Miro', 'Figma', 'GitHub Enterprise'],
          licenses: 'Team',
          cost: '$50K/year'
        },
        {
          name: 'Development',
          tools: ['VS Code', 'JetBrains', 'Docker', 'Kubernetes'],
          licenses: 'Developer',
          cost: '$75K/year'
        },
        {
          name: 'Analytics',
          tools: ['Tableau', 'Databricks', 'Snowflake', 'Amplitude'],
          licenses: 'Analytics',
          cost: '$150K/year'
        }
      ]
    }
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Innovation Lab Infrastructure</h3>

      {/* View Selector */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveView('physical')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeView === 'physical'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800/50 text-gray-400 hover:text-white'
          }`}
        >
          Physical Space
        </button>
        <button
          onClick={() => setActiveView('technical')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeView === 'technical'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800/50 text-gray-400 hover:text-white'
          }`}
        >
          Technical Stack
        </button>
        <button
          onClick={() => setActiveView('tools')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeView === 'tools'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800/50 text-gray-400 hover:text-white'
          }`}
        >
          Tools & Software
        </button>
      </div>

      {/* Content based on view */}
      {activeView === 'physical' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infrastructure.physical.zones.map((zone, index) => {
            const Icon = zone.icon;
            return (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{zone.name}</h4>
                    <p className="text-sm text-gray-400">{zone.size} • {zone.capacity}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-600/20">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {zone.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeView === 'technical' && (
        <div className="space-y-6">
          {infrastructure.technical.stack.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-600/20">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{category.category}</h4>
                      <p className="text-sm text-gray-400">Investment: {category.investment}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
          
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-600/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">Total Technical Investment</h4>
                <p className="text-sm text-gray-400">First year infrastructure</p>
              </div>
              <div className="text-3xl font-bold">$950K</div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infrastructure.tools.categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">{category.name}</h4>
                <span className="text-sm text-gray-400">{category.licenses}</span>
              </div>
              
              <div className="space-y-2 mb-4">
                {category.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{tool}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Annual Cost</span>
                  <span className="font-medium text-green-400">{category.cost}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-lg p-6 border border-green-600/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">Total Software Investment</h4>
                <p className="text-sm text-gray-400">Annual licensing and subscriptions</p>
              </div>
              <div className="text-3xl font-bold">$475K/year</div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}