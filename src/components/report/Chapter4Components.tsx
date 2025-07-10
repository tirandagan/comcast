'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, BarChart, Bar, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, LineChart, Line, Area, AreaChart, ComposedChart,
  Treemap, FunnelChart, Funnel, LabelList
} from 'recharts';
import {
  Brain, Cpu, Layers, Network, Zap, Shield, Rocket, TrendingUp,
  Users, MessageSquare, Wifi, Play, DollarSign, Target, Activity,
  Globe, Sparkles, ChevronRight, ArrowUpRight, X, Info, Filter,
  Eye, Mic, Video, ShoppingBag, Tv, Radio, Building2, Settings,
  BarChart3, LineChartIcon, PieChartIcon, Database, Cloud
} from 'lucide-react';

// Color palette for Comcast brand
const COMCAST_COLORS = {
  primary: '#000000',
  secondary: '#DA291C',
  accent: '#00549F',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  purple: '#8B5CF6',
  pink: '#EC4899',
  gradient: {
    from: '#00549F',
    to: '#DA291C'
  }
};

// AI Portfolio Matrix Component
export function AIPortfolioMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'bubble' | 'matrix'>('bubble');

  const portfolioData = [
    // Customer Experience AI
    {
      category: 'Customer Experience',
      items: [
        { name: 'Voice AI Assistant', impact: 85, complexity: 30, investment: 5, roi: 450, status: 'production' },
        { name: 'Sentiment Analysis Engine', impact: 75, complexity: 40, investment: 3, roi: 380, status: 'production' },
        { name: 'Predictive Customer Journey', impact: 90, complexity: 70, investment: 8, roi: 520, status: 'pilot' },
        { name: 'Real-time Translation', impact: 70, complexity: 50, investment: 4, roi: 320, status: 'development' },
        { name: 'Visual Search AI', impact: 65, complexity: 60, investment: 6, roi: 280, status: 'concept' }
      ],
      color: COMCAST_COLORS.accent,
      icon: Users
    },
    // Network Operations AI
    {
      category: 'Network Operations',
      items: [
        { name: 'Predictive Maintenance', impact: 95, complexity: 45, investment: 7, roi: 680, status: 'production' },
        { name: 'Network Optimization AI', impact: 88, complexity: 65, investment: 9, roi: 580, status: 'production' },
        { name: 'Anomaly Detection System', impact: 82, complexity: 35, investment: 4, roi: 490, status: 'production' },
        { name: '5G Resource Allocation', impact: 78, complexity: 80, investment: 12, roi: 420, status: 'pilot' },
        { name: 'Self-Healing Networks', impact: 92, complexity: 85, investment: 15, roi: 750, status: 'development' }
      ],
      color: COMCAST_COLORS.success,
      icon: Network
    },
    // Content & Media AI
    {
      category: 'Content & Media',
      items: [
        { name: 'Content Recommendation Engine', impact: 88, complexity: 55, investment: 6, roi: 620, status: 'production' },
        { name: 'Auto Content Tagging', impact: 72, complexity: 40, investment: 3, roi: 380, status: 'production' },
        { name: 'Video Quality Enhancement', impact: 80, complexity: 70, investment: 8, roi: 450, status: 'pilot' },
        { name: 'Dynamic Ad Insertion AI', impact: 85, complexity: 60, investment: 7, roi: 580, status: 'production' },
        { name: 'Content Generation AI', impact: 70, complexity: 75, investment: 10, roi: 350, status: 'concept' }
      ],
      color: COMCAST_COLORS.secondary,
      icon: Play
    },
    // Business Operations AI
    {
      category: 'Business Operations',
      items: [
        { name: 'Revenue Optimization AI', impact: 82, complexity: 50, investment: 5, roi: 520, status: 'production' },
        { name: 'Fraud Detection System', impact: 90, complexity: 45, investment: 6, roi: 680, status: 'production' },
        { name: 'Supply Chain AI', impact: 75, complexity: 65, investment: 8, roi: 420, status: 'pilot' },
        { name: 'HR Analytics Platform', impact: 68, complexity: 35, investment: 3, roi: 320, status: 'production' },
        { name: 'Contract Intelligence', impact: 72, complexity: 55, investment: 5, roi: 380, status: 'development' }
      ],
      color: COMCAST_COLORS.purple,
      icon: Building2
    }
  ];

  const allItems = portfolioData.flatMap(cat => 
    cat.items.map(item => ({ ...item, category: cat.category, color: cat.color }))
  );

  const statusColors = {
    production: '#10B981',
    pilot: '#F59E0B',
    development: '#3B82F6',
    concept: '#8B5CF6'
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">AI Portfolio Matrix</h3>
          <p className="text-gray-400 mt-1">Strategic positioning of AI initiatives across business units</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('bubble')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'bubble' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <Layers className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'matrix' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg transition-all ${
            !selectedCategory 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          All Categories
        </button>
        {portfolioData.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                selectedCategory === cat.category 
                  ? 'text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: selectedCategory === cat.category ? cat.color : undefined
              }}
            >
              <Icon className="w-4 h-4" />
              {cat.category}
            </button>
          );
        })}
      </div>

      {viewMode === 'bubble' ? (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  dataKey="complexity" 
                  name="Implementation Complexity"
                  domain={[0, 100]}
                  label={{ value: 'Implementation Complexity →', position: 'insideBottom', offset: -10 }}
                  stroke="#9CA3AF"
                />
                <YAxis 
                  type="number" 
                  dataKey="impact" 
                  name="Business Impact"
                  domain={[0, 100]}
                  label={{ value: 'Business Impact →', angle: -90, position: 'insideLeft' }}
                  stroke="#9CA3AF"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                          <h4 className="font-semibold mb-2">{data.name}</h4>
                          <div className="space-y-1 text-sm">
                            <p>Category: {data.category}</p>
                            <p>Impact: {data.impact}%</p>
                            <p>Complexity: {data.complexity}%</p>
                            <p>Investment: ${data.investment}M</p>
                            <p>ROI: {data.roi}%</p>
                            <p className="flex items-center gap-2">
                              Status: 
                              <span 
                                className="px-2 py-0.5 rounded text-xs"
                                style={{ backgroundColor: statusColors[data.status], color: '#000' }}
                              >
                                {data.status}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="AI Initiatives" 
                  data={allItems.filter(item => !selectedCategory || item.category === selectedCategory)}
                >
                  {allItems.filter(item => !selectedCategory || item.category === selectedCategory).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Quadrant Labels */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <h5 className="font-semibold text-green-400">Quick Wins</h5>
              <p className="text-xs text-gray-400">High Impact, Low Complexity</p>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <h5 className="font-semibold text-yellow-400">Strategic Initiatives</h5>
              <p className="text-xs text-gray-400">High Impact, High Complexity</p>
            </div>
            <div className="text-center p-3 bg-gray-500/10 rounded-lg border border-gray-500/30">
              <h5 className="font-semibold text-gray-400">Low Priority</h5>
              <p className="text-xs text-gray-400">Low Impact, Low Complexity</p>
            </div>
            <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <h5 className="font-semibold text-red-400">Reconsider</h5>
              <p className="text-xs text-gray-400">Low Impact, High Complexity</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {portfolioData.filter(cat => !selectedCategory || cat.category === selectedCategory).map(cat => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                className="bg-gray-800 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: cat.color }} />
                  </div>
                  <h4 className="text-xl font-semibold">{cat.category}</h4>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium">{item.name}</h5>
                        <span 
                          className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: statusColors[item.status], color: '#000' }}
                        >
                          {item.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-400">Impact</span>
                          <div className="font-semibold">{item.impact}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Complexity</span>
                          <div className="font-semibold">{item.complexity}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Investment</span>
                          <div className="font-semibold">${item.investment}M</div>
                        </div>
                        <div>
                          <span className="text-gray-400">ROI</span>
                          <div className="font-semibold text-green-400">{item.roi}%</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <motion.div 
                            className="h-2 rounded-full"
                            style={{ backgroundColor: cat.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.impact}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Customer Experience AI Component
export function CustomerExperienceAI() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  const useCases = [
    {
      title: 'Voice AI Assistant',
      icon: Mic,
      description: 'Natural language voice interactions across all customer touchpoints',
      metrics: {
        'Call Reduction': '45%',
        'Customer Satisfaction': '+32%',
        'Resolution Time': '-67%',
        'Cost Savings': '$12M/year'
      },
      features: [
        'Multi-language support (25+ languages)',
        'Emotion detection and empathy responses',
        'Context-aware conversation flow',
        'Seamless human handoff'
      ],
      visual: {
        type: 'flow',
        color: COMCAST_COLORS.accent
      }
    },
    {
      title: 'Visual Search & Recognition',
      icon: Eye,
      description: 'AI-powered visual search for products, troubleshooting, and support',
      metrics: {
        'Search Accuracy': '94%',
        'Engagement Rate': '+58%',
        'Support Tickets': '-38%',
        'Conversion Rate': '+27%'
      },
      features: [
        'Equipment recognition for troubleshooting',
        'Visual product search in Xfinity Store',
        'AR-guided installation support',
        'Image-based billing inquiries'
      ],
      visual: {
        type: 'grid',
        color: COMCAST_COLORS.secondary
      }
    },
    {
      title: 'Predictive Customer Journey',
      icon: Target,
      description: 'AI predicts customer needs and proactively offers solutions',
      metrics: {
        'Churn Prevention': '28%',
        'Upsell Success': '+42%',
        'NPS Score': '+15 points',
        'Revenue Impact': '$45M'
      },
      features: [
        'Next-best-action recommendations',
        'Churn risk scoring and intervention',
        'Personalized offer timing',
        'Journey optimization algorithms'
      ],
      visual: {
        type: 'timeline',
        color: COMCAST_COLORS.success
      }
    },
    {
      title: 'Sentiment Analysis Engine',
      icon: MessageSquare,
      description: 'Real-time emotional intelligence across all communication channels',
      metrics: {
        'Detection Accuracy': '91%',
        'Escalation Prevention': '52%',
        'Agent Efficiency': '+35%',
        'CSAT Improvement': '+28%'
      },
      features: [
        'Multi-channel sentiment tracking',
        'Real-time agent coaching',
        'Proactive issue detection',
        'Emotional trend analytics'
      ],
      visual: {
        type: 'radar',
        color: COMCAST_COLORS.purple
      }
    }
  ];

  const currentUseCase = useCases[activeUseCase];

  return (
    <div className="my-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Customer Experience AI Suite</h3>
        <p className="text-gray-400 mt-1">Transforming every customer interaction with intelligent automation</p>
      </div>

      {/* Use Case Selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {useCases.map((useCase, idx) => {
          const Icon = useCase.icon;
          return (
            <motion.button
              key={idx}
              onClick={() => setActiveUseCase(idx)}
              className={`px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                activeUseCase === idx 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              {useCase.title}
            </motion.button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Use Case Details */}
        <div className="lg:col-span-2">
          <motion.div
            key={activeUseCase}
            className="bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${currentUseCase.visual.color}20` }}
              >
                <currentUseCase.icon 
                  className="w-8 h-8" 
                  style={{ color: currentUseCase.visual.color }}
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold mb-2">{currentUseCase.title}</h4>
                <p className="text-gray-400">{currentUseCase.description}</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(currentUseCase.metrics).map(([key, value]) => (
                <motion.div
                  key={key}
                  className="bg-gray-700/50 rounded-lg p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold" style={{ color: currentUseCase.visual.color }}>
                    {value}
                  </div>
                  <div className="text-sm text-gray-400">{key}</div>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <div>
              <h5 className="font-semibold mb-3">Key Features</h5>
              <div className="space-y-2">
                {currentUseCase.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentUseCase.visual.color }}
                    />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual Representation */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h5 className="font-semibold mb-4">Implementation Architecture</h5>
          
          {/* Dynamic Visual based on use case */}
          {currentUseCase.visual.type === 'flow' && (
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <Mic className="w-8 h-8 mx-auto mb-2" style={{ color: currentUseCase.visual.color }} />
                <div className="text-sm">Voice Input</div>
              </div>
              <div className="flex justify-center">
                <ChevronRight className="w-6 h-6 text-gray-600 rotate-90" />
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <Brain className="w-8 h-8 mx-auto mb-2" style={{ color: currentUseCase.visual.color }} />
                <div className="text-sm">AI Processing</div>
              </div>
              <div className="flex justify-center">
                <ChevronRight className="w-6 h-6 text-gray-600 rotate-90" />
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2" style={{ color: currentUseCase.visual.color }} />
                <div className="text-sm">Customer Response</div>
              </div>
            </div>
          )}

          {currentUseCase.visual.type === 'grid' && (
            <div className="grid grid-cols-2 gap-4">
              {['Camera Input', 'Image Recognition', 'Product Match', 'Results Display'].map((step, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-700/50 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-sm">{step}</div>
                </motion.div>
              ))}
            </div>
          )}

          {currentUseCase.visual.type === 'timeline' && (
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
              {['Predict', 'Analyze', 'Recommend', 'Act'].map((phase, idx) => (
                <motion.div
                  key={idx}
                  className="relative flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div 
                    className="w-4 h-4 rounded-full z-10"
                    style={{ backgroundColor: currentUseCase.visual.color }}
                  />
                  <div className="bg-gray-700/50 rounded-lg p-3 flex-1">
                    <div className="text-sm">{phase}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {currentUseCase.visual.type === 'radar' && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { subject: 'Text', value: 85 },
                  { subject: 'Voice', value: 92 },
                  { subject: 'Video', value: 78 },
                  { subject: 'Social', value: 88 },
                  { subject: 'Email', value: 82 },
                  { subject: 'Chat', value: 95 }
                ]}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
                  <PolarRadiusAxis stroke="#374151" />
                  <Radar 
                    name="Sentiment Coverage" 
                    dataKey="value" 
                    stroke={currentUseCase.visual.color}
                    fill={currentUseCase.visual.color} 
                    fillOpacity={0.3} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* ROI Impact Section */}
      <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-500/30">
        <h4 className="text-lg font-semibold mb-4">Combined ROI Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold text-blue-400">$125M</div>
            <div className="text-sm text-gray-400">Annual Cost Savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">+38%</div>
            <div className="text-sm text-gray-400">Customer Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">-52%</div>
            <div className="text-sm text-gray-400">Service Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-400">4.2x</div>
            <div className="text-sm text-gray-400">ROI in 18 months</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Network Operations AI Component
export function NetworkOperationsAI() {
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const networkMetrics = {
    performance: {
      title: 'Network Performance',
      data: [
        { time: '00:00', baseline: 85, aiOptimized: 95 },
        { time: '04:00', baseline: 82, aiOptimized: 94 },
        { time: '08:00', baseline: 78, aiOptimized: 92 },
        { time: '12:00', baseline: 75, aiOptimized: 90 },
        { time: '16:00', baseline: 73, aiOptimized: 91 },
        { time: '20:00', baseline: 80, aiOptimized: 93 },
        { time: '24:00', baseline: 85, aiOptimized: 95 }
      ],
      color: COMCAST_COLORS.success
    },
    predictive: {
      title: 'Predictive Maintenance',
      data: [
        { month: 'Jan', failures: 45, predicted: 42, prevented: 38 },
        { month: 'Feb', failures: 52, predicted: 48, prevented: 44 },
        { month: 'Mar', failures: 38, predicted: 36, prevented: 33 },
        { month: 'Apr', failures: 41, predicted: 39, prevented: 36 },
        { month: 'May', failures: 35, predicted: 34, prevented: 31 },
        { month: 'Jun', failures: 30, predicted: 29, prevented: 27 }
      ],
      color: COMCAST_COLORS.warning
    },
    anomaly: {
      title: 'Anomaly Detection',
      data: [
        { type: 'DDoS Attacks', detected: 98, falsePositive: 2 },
        { type: 'Service Degradation', detected: 95, falsePositive: 5 },
        { type: 'Equipment Failure', detected: 92, falsePositive: 8 },
        { type: 'Bandwidth Anomaly', detected: 89, falsePositive: 11 },
        { type: 'Security Breach', detected: 97, falsePositive: 3 }
      ],
      color: COMCAST_COLORS.secondary
    }
  };

  const aiCapabilities = [
    {
      title: 'Self-Healing Networks',
      icon: Shield,
      description: 'Autonomous network repair and optimization',
      stats: {
        'Downtime Reduction': '72%',
        'Auto-Resolution Rate': '84%',
        'MTTR Improvement': '65%'
      }
    },
    {
      title: '5G Resource Optimization',
      icon: Wifi,
      description: 'AI-driven network slicing and resource allocation',
      stats: {
        'Capacity Utilization': '+45%',
        'Energy Efficiency': '+38%',
        'QoS Improvement': '+52%'
      }
    },
    {
      title: 'Predictive Analytics',
      icon: Activity,
      description: 'Anticipate and prevent network issues before impact',
      stats: {
        'Prediction Accuracy': '91%',
        'Issue Prevention': '78%',
        'Cost Avoidance': '$32M'
      }
    }
  ];

  return (
    <div className="my-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Network Operations AI</h3>
        <p className="text-gray-400 mt-1">Intelligent automation for network reliability and performance</p>
      </div>

      {/* Metrics Selector */}
      <div className="flex gap-3 mb-6">
        {Object.entries(networkMetrics).map(([key, metric]) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedMetric === key 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {metric.title}
          </button>
        ))}
      </div>

      {/* Main Visualization */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4">{networkMetrics[selectedMetric].title} Analysis</h4>
        
        <div className="h-80">
          {selectedMetric === 'performance' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkMetrics.performance.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="baseline" 
                  stackId="1"
                  stroke="#6B7280" 
                  fill="#6B7280" 
                  fillOpacity={0.4}
                  name="Baseline Performance"
                />
                <Area 
                  type="monotone" 
                  dataKey="aiOptimized" 
                  stackId="2"
                  stroke={networkMetrics.performance.color} 
                  fill={networkMetrics.performance.color} 
                  fillOpacity={0.6}
                  name="AI-Optimized"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {selectedMetric === 'predictive' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={networkMetrics.predictive.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Bar dataKey="failures" fill="#EF4444" name="Total Failures" fillOpacity={0.3} />
                <Bar dataKey="predicted" fill="#F59E0B" name="Predicted" fillOpacity={0.6} />
                <Bar dataKey="prevented" fill="#10B981" name="Prevented" fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedMetric === 'anomaly' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={networkMetrics.anomaly.data} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" domain={[0, 100]} />
                <YAxis dataKey="type" type="category" stroke="#9CA3AF" width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Bar dataKey="detected" fill={networkMetrics.anomaly.color} name="Detection Rate %" />
                <Bar dataKey="falsePositive" fill="#EF4444" name="False Positives %" fillOpacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* AI Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiCapabilities.map((capability, idx) => {
          const Icon = capability.icon;
          return (
            <motion.div
              key={idx}
              className="bg-gray-800 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <Icon className="w-6 h-6 text-green-400" />
                </div>
                <h5 className="font-semibold">{capability.title}</h5>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{capability.description}</p>
              
              <div className="space-y-2">
                {Object.entries(capability.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400">{key}</span>
                    <span className="font-semibold text-green-400">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Network Topology Visualization */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4">AI-Powered Network Topology</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Core Network</span>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Optimized</span>
            </div>
            <div className="relative h-32">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Network className="w-16 h-16 text-green-400" />
              </motion.div>
            </div>
            <div className="mt-3 text-center">
              <div className="text-2xl font-bold text-green-400">99.99%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Edge Computing</span>
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">AI-Enhanced</span>
            </div>
            <div className="relative h-32">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cloud className="w-16 h-16 text-blue-400" />
              </motion.div>
            </div>
            <div className="mt-3 text-center">
              <div className="text-2xl font-bold text-blue-400">&lt;5ms</div>
              <div className="text-xs text-gray-400">Latency</div>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Customer Premises</span>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Smart</span>
            </div>
            <div className="relative h-32">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Wifi className="w-16 h-16 text-purple-400" />
              </motion.div>
            </div>
            <div className="mt-3 text-center">
              <div className="text-2xl font-bold text-purple-400">10Gbps</div>
              <div className="text-xs text-gray-400">Peak Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Content & Media AI Component
export function ContentMediaAI() {
  const [activeTab, setActiveTab] = useState('personalization');

  const contentAIFeatures = {
    personalization: {
      title: 'Content Personalization Engine',
      icon: Sparkles,
      metrics: {
        'Engagement Rate': '+58%',
        'Watch Time': '+42%',
        'Churn Reduction': '31%',
        'Revenue/User': '+$8.50'
      },
      capabilities: [
        {
          name: 'Viewer Preference Learning',
          description: 'ML models analyze viewing patterns across 50+ behavioral signals',
          impact: 'High'
        },
        {
          name: 'Dynamic Content Curation',
          description: 'Real-time content recommendations based on context and mood',
          impact: 'High'
        },
        {
          name: 'Cross-Platform Continuity',
          description: 'Seamless experience across TV, mobile, and web platforms',
          impact: 'Medium'
        },
        {
          name: 'Family Profile Management',
          description: 'AI distinguishes between household members automatically',
          impact: 'Medium'
        }
      ]
    },
    generation: {
      title: 'AI Content Generation',
      icon: Video,
      metrics: {
        'Production Cost': '-65%',
        'Time to Market': '-78%',
        'Content Volume': '+340%',
        'Localization': '25 languages'
      },
      capabilities: [
        {
          name: 'Automated Highlights',
          description: 'AI creates sport highlights and recap videos automatically',
          impact: 'High'
        },
        {
          name: 'Dynamic Thumbnails',
          description: 'Personalized thumbnails that maximize click-through rates',
          impact: 'Medium'
        },
        {
          name: 'Multi-language Dubbing',
          description: 'AI voice synthesis for instant content localization',
          impact: 'High'
        },
        {
          name: 'Metadata Generation',
          description: 'Automatic tagging, descriptions, and categorization',
          impact: 'Low'
        }
      ]
    },
    advertising: {
      title: 'Smart Ad Platform',
      icon: DollarSign,
      metrics: {
        'Ad Revenue': '+72%',
        'CPM Rates': '+45%',
        'Fill Rate': '98%',
        'Brand Safety': '99.9%'
      },
      capabilities: [
        {
          name: 'Contextual Ad Insertion',
          description: 'AI places ads at optimal moments without disrupting viewing',
          impact: 'High'
        },
        {
          name: 'Audience Segmentation',
          description: 'Micro-targeting based on 200+ audience attributes',
          impact: 'High'
        },
        {
          name: 'Creative Optimization',
          description: 'Dynamic ad creative based on viewer preferences',
          impact: 'Medium'
        },
        {
          name: 'Brand Safety AI',
          description: 'Content analysis ensures appropriate ad placement',
          impact: 'Medium'
        }
      ]
    }
  };

  const currentFeature = contentAIFeatures[activeTab];

  // Sample data for content performance visualization
  const contentPerformanceData = [
    { genre: 'Sports', traditional: 65, aiOptimized: 88 },
    { genre: 'Movies', traditional: 72, aiOptimized: 91 },
    { genre: 'Series', traditional: 78, aiOptimized: 94 },
    { genre: 'News', traditional: 58, aiOptimized: 82 },
    { genre: 'Kids', traditional: 81, aiOptimized: 96 },
    { genre: 'Documentary', traditional: 62, aiOptimized: 85 }
  ];

  return (
    <div className="my-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Content & Media AI Platform</h3>
        <p className="text-gray-400 mt-1">Revolutionizing content delivery and monetization with AI</p>
      </div>

      {/* Feature Tabs */}
      <div className="flex gap-3 mb-6">
        {Object.entries(contentAIFeatures).map(([key, feature]) => {
          const Icon = feature.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === key 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{feature.title}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feature Details */}
        <div className="lg:col-span-2">
          <motion.div
            key={activeTab}
            className="bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-red-500/20">
                <currentFeature.icon className="w-8 h-8 text-red-400" />
              </div>
              <h4 className="text-xl font-semibold">{currentFeature.title}</h4>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(currentFeature.metrics).map(([key, value]) => (
                <div key={key} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-xl font-bold text-red-400">{value}</div>
                  <div className="text-xs text-gray-400">{key}</div>
                </div>
              ))}
            </div>

            {/* Capabilities */}
            <div className="space-y-3">
              {currentFeature.capabilities.map((capability, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-700/30 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium">{capability.name}</h5>
                    <span className={`px-2 py-1 rounded text-xs ${
                      capability.impact === 'High' 
                        ? 'bg-red-500/20 text-red-400'
                        : capability.impact === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {capability.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{capability.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h5 className="font-semibold mb-4">Content Performance Comparison</h5>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" domain={[0, 100]} />
                <YAxis dataKey="genre" type="category" stroke="#9CA3AF" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Bar dataKey="traditional" fill="#6B7280" name="Traditional" fillOpacity={0.5} />
                <Bar dataKey="aiOptimized" fill={COMCAST_COLORS.secondary} name="AI-Optimized" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Pipeline Visualization */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4">AI-Powered Content Pipeline</h4>
        <div className="relative">
          <div className="flex items-center justify-between">
            {['Ingest', 'Process', 'Enhance', 'Distribute', 'Analyze'].map((stage, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-red-400">{idx + 1}</span>
                </div>
                <span className="text-sm text-gray-400">{stage}</span>
              </motion.div>
            ))}
          </div>
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500" style={{ width: '90%', margin: '0 5%' }} />
        </div>

        <div className="grid grid-cols-5 gap-4 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">100TB</div>
            <div className="text-xs text-gray-500">Daily Input</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">50ms</div>
            <div className="text-xs text-gray-500">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">4K/8K</div>
            <div className="text-xs text-gray-500">Quality</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">50M+</div>
            <div className="text-xs text-gray-500">Viewers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">Real-time</div>
            <div className="text-xs text-gray-500">Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ROI Projection Dashboard Component
export function ROIProjectionDashboard() {
  const [timeframe, setTimeframe] = useState('3year');
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null);

  const roiProjections = {
    '1year': {
      revenue: 125,
      savings: 85,
      investment: 45,
      roi: 356
    },
    '3year': {
      revenue: 580,
      savings: 340,
      investment: 120,
      roi: 667
    },
    '5year': {
      revenue: 1250,
      savings: 780,
      investment: 180,
      roi: 1028
    }
  };

  const initiativeBreakdown = [
    {
      name: 'Customer Experience AI',
      investment: 35,
      revenue: 280,
      savings: 125,
      timeline: '18 months',
      roi: 858,
      status: 'In Progress'
    },
    {
      name: 'Network Operations AI',
      investment: 45,
      revenue: 180,
      savings: 220,
      timeline: '24 months',
      roi: 789,
      status: 'Planning'
    },
    {
      name: 'Content & Media AI',
      investment: 25,
      revenue: 320,
      savings: 65,
      timeline: '12 months',
      roi: 1440,
      status: 'In Progress'
    },
    {
      name: 'Business Operations AI',
      investment: 15,
      revenue: 90,
      savings: 85,
      timeline: '9 months',
      roi: 1067,
      status: 'Deployed'
    }
  ];

  const monthlyProgress = [
    { month: 'Jan', actual: 15, projected: 12 },
    { month: 'Feb', actual: 28, projected: 25 },
    { month: 'Mar', actual: 42, projected: 38 },
    { month: 'Apr', actual: 58, projected: 52 },
    { month: 'May', actual: 75, projected: 68 },
    { month: 'Jun', actual: 92, projected: 85 }
  ];

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">AI Portfolio ROI Projections</h3>
          <p className="text-gray-400 mt-1">Financial impact analysis and investment returns</p>
        </div>
        <div className="flex gap-2">
          {(['1year', '3year', '5year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeframe === period 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {period.replace('year', ' Year')}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div 
          className="bg-gradient-to-br from-green-600/20 to-green-500/10 rounded-lg p-6 border border-green-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-xs text-green-400">Revenue</span>
          </div>
          <div className="text-3xl font-bold">${roiProjections[timeframe].revenue}M</div>
          <div className="text-sm text-gray-400">Additional Revenue</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 rounded-lg p-6 border border-blue-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-blue-400" />
            <span className="text-xs text-blue-400">Savings</span>
          </div>
          <div className="text-3xl font-bold">${roiProjections[timeframe].savings}M</div>
          <div className="text-sm text-gray-400">Cost Reduction</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 rounded-lg p-6 border border-purple-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Settings className="w-6 h-6 text-purple-400" />
            <span className="text-xs text-purple-400">Investment</span>
          </div>
          <div className="text-3xl font-bold">${roiProjections[timeframe].investment}M</div>
          <div className="text-sm text-gray-400">Total Investment</div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 rounded-lg p-6 border border-orange-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Rocket className="w-6 h-6 text-orange-400" />
            <span className="text-xs text-orange-400">ROI</span>
          </div>
          <div className="text-3xl font-bold">{roiProjections[timeframe].roi}%</div>
          <div className="text-sm text-gray-400">Return on Investment</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Initiative Breakdown */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Initiative ROI Breakdown</h4>
          <div className="space-y-3">
            {initiativeBreakdown.map((initiative, idx) => (
              <motion.div
                key={idx}
                className={`bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedInitiative === initiative.name ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedInitiative(
                  selectedInitiative === initiative.name ? null : initiative.name
                )}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{initiative.name}</h5>
                  <span className={`px-2 py-1 rounded text-xs ${
                    initiative.status === 'Deployed' 
                      ? 'bg-green-500/20 text-green-400'
                      : initiative.status === 'In Progress'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {initiative.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Investment</span>
                    <div className="font-semibold">${initiative.investment}M</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Revenue</span>
                    <div className="font-semibold text-green-400">${initiative.revenue}M</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Savings</span>
                    <div className="font-semibold text-blue-400">${initiative.savings}M</div>
                  </div>
                  <div>
                    <span className="text-gray-400">ROI</span>
                    <div className="font-semibold text-orange-400">{initiative.roi}%</div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedInitiative === initiative.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 pt-3 border-t border-gray-600"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Timeline: {initiative.timeline}</span>
                        <span className="text-gray-400">
                          Net Return: ${(initiative.revenue + initiative.savings - initiative.investment).toFixed(0)}M
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">ROI Realization Progress</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" label={{ value: 'ROI ($M)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #374151' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  fill="#3B82F6" 
                  stroke="#3B82F6"
                  fillOpacity={0.3}
                  name="Projected"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 6 }}
                  name="Actual"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Performance vs. Projection</span>
              <span className="text-lg font-semibold text-green-400">+8.2%</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Tracking ahead of projections with accelerated deployment timeline
            </div>
          </div>
        </div>
      </div>

      {/* Investment Allocation Treemap */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Investment Allocation by Impact Area</h4>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={[
                {
                  name: 'AI Portfolio',
                  children: [
                    { name: 'Customer Experience', size: 35, fill: COMCAST_COLORS.accent },
                    { name: 'Network Operations', size: 45, fill: COMCAST_COLORS.success },
                    { name: 'Content & Media', size: 25, fill: COMCAST_COLORS.secondary },
                    { name: 'Business Operations', size: 15, fill: COMCAST_COLORS.purple }
                  ]
                }
              ]}
              dataKey="size"
              stroke="#fff"
              fill="#8884d8"
            >
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    const initiative = initiativeBreakdown.find(i => i.name.includes(data.name));
                    if (initiative) {
                      return (
                        <div className="bg-gray-900 p-3 rounded border border-gray-700">
                          <p className="font-semibold">{data.name}</p>
                          <p className="text-sm">Investment: ${data.size}M</p>
                          <p className="text-sm">Expected ROI: {initiative.roi}%</p>
                        </div>
                      );
                    }
                  }
                  return null;
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Main Chapter 4 Component
export function Chapter4() {
  return (
    <div className="space-y-12">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-lg p-8 border border-blue-500/30">
        <h2 className="text-3xl font-bold mb-4">Comcast AI Portfolio Strategy</h2>
        <p className="text-lg text-gray-300 mb-6">
          A comprehensive view of Comcast's AI initiatives across business units, showcasing 
          strategic investments in customer experience, network operations, content delivery, 
          and business optimization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">$120M</div>
            <div className="text-sm text-gray-400">Total AI Investment</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">45+</div>
            <div className="text-sm text-gray-400">AI Initiatives</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">667%</div>
            <div className="text-sm text-gray-400">3-Year ROI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">$920M</div>
            <div className="text-sm text-gray-400">Expected Returns</div>
          </div>
        </div>
      </div>

      {/* AI Portfolio Matrix */}
      <AIPortfolioMatrix />

      {/* Customer Experience AI */}
      <CustomerExperienceAI />

      {/* Network Operations AI */}
      <NetworkOperationsAI />

      {/* Content & Media AI */}
      <ContentMediaAI />

      {/* ROI Projections */}
      <ROIProjectionDashboard />

      {/* Summary */}
      <div className="bg-gray-800 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Strategic Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-green-400">Immediate Actions</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Deploy Voice AI Assistant across all customer touchpoints</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Implement predictive network maintenance in top 10 markets</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Launch AI-powered content recommendations on X1 platform</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-blue-400">Strategic Initiatives</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Establish AI Center of Excellence with 200+ specialists</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Partner with leading AI research institutions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Develop proprietary AI models for competitive advantage</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}