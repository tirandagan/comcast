'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageSquare, Brain, TrendingDown, DollarSign, Clock, Heart, Shield } from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface AIApplication {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  metrics: {
    label: string;
    value: string;
    improvement: string;
    color: string;
  }[];
  features: string[];
  status: 'live' | 'pilot' | 'planned';
}

const applications: AIApplication[] = [
  {
    id: 'personalization',
    title: 'Hyper-Personalized Recommendations',
    icon: <Brain className="w-8 h-8" />,
    description: 'AI engine analyzing 200+ behavioral signals to deliver perfect content matches',
    metrics: [
      { label: 'Engagement Increase', value: '45%', improvement: '+25%', color: '#3B82F6' },
      { label: 'Watch Time', value: '3.5hrs', improvement: '+1.2hrs', color: '#10B981' },
      { label: 'Satisfaction', value: '4.7/5', improvement: '+0.8', color: '#F59E0B' }
    ],
    features: [
      'Real-time preference learning',
      'Cross-platform synchronization',
      'Contextual recommendations',
      'Mood-based suggestions'
    ],
    status: 'live'
  },
  {
    id: 'predictive-service',
    title: 'Predictive Customer Service',
    icon: <Shield className="w-8 h-8" />,
    description: 'Anticipate and resolve issues before customers even notice them',
    metrics: [
      { label: 'Issue Prevention', value: '73%', improvement: '+50%', color: '#10B981' },
      { label: 'Call Reduction', value: '52%', improvement: '-52%', color: '#3B82F6' },
      { label: 'Cost Savings', value: '$45M', improvement: '+$30M', color: '#8B5CF6' }
    ],
    features: [
      'Network anomaly detection',
      'Service degradation prediction',
      'Proactive maintenance alerts',
      'Automated issue resolution'
    ],
    status: 'pilot'
  },
  {
    id: 'virtual-assistant',
    title: 'Intelligent Virtual Assistant',
    icon: <MessageSquare className="w-8 h-8" />,
    description: 'Next-gen conversational AI understanding context and emotion',
    metrics: [
      { label: 'Resolution Rate', value: '87%', improvement: '+40%', color: '#F59E0B' },
      { label: 'Response Time', value: '8sec', improvement: '-45sec', color: '#10B981' },
      { label: 'CSAT Score', value: '4.5/5', improvement: '+1.2', color: '#3B82F6' }
    ],
    features: [
      'Natural language understanding',
      'Emotional intelligence',
      'Multi-language support',
      'Seamless human handoff'
    ],
    status: 'live'
  },
  {
    id: 'churn-prevention',
    title: 'Churn Prevention Engine',
    icon: <TrendingDown className="w-8 h-8" />,
    description: 'Identify at-risk customers and deploy targeted retention strategies',
    metrics: [
      { label: 'Churn Reduction', value: '25%', improvement: '-25%', color: '#10B981' },
      { label: 'Revenue Saved', value: '$120M', improvement: '+$90M', color: '#8B5CF6' },
      { label: 'Accuracy', value: '92%', improvement: '+15%', color: '#F59E0B' }
    ],
    features: [
      'Behavioral pattern analysis',
      'Personalized retention offers',
      'Risk scoring models',
      'Automated intervention workflows'
    ],
    status: 'planned'
  }
];

const overallMetrics = [
  { name: 'Customer Satisfaction', value: 85, fill: '#3B82F6' },
  { name: 'Cost Reduction', value: 40, fill: '#10B981' },
  { name: 'Revenue Growth', value: 25, fill: '#F59E0B' },
  { name: 'Efficiency Gain', value: 60, fill: '#8B5CF6' }
];

export function CustomerExperienceAI() {
  const [selectedApp, setSelectedApp] = useState<AIApplication | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Customer Experience AI Suite</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Transforming every customer touchpoint with intelligent, predictive, and personalized experiences
        </p>
      </div>

      {/* Overall Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Overall Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={overallMetrics}>
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill="#8884d8"
                label={{ position: 'insideStart', fill: '#fff' }}
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {overallMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.fill }} />
                <span className="text-gray-300 text-sm">{metric.name}: {metric.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Key Achievements</h3>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20"
            >
              <TrendingDown className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-white font-semibold">25% Churn Reduction</p>
                <p className="text-gray-300 text-sm">Saving $120M annually in retained revenue</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
            >
              <DollarSign className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-white font-semibold">40% Service Cost Reduction</p>
                <p className="text-gray-300 text-sm">Through automation and predictive resolution</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20"
            >
              <Heart className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-white font-semibold">4.5/5 Average CSAT</p>
                <p className="text-gray-300 text-sm">Industry-leading customer satisfaction</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer hover:border-white/40 transition-all"
            onClick={() => setSelectedApp(app)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{app.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.status === 'live' ? 'bg-green-500/20 text-green-400' :
                    app.status === 'pilot' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">{app.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {app.metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Application Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
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
                    {selectedApp.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedApp.title}</h3>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      selectedApp.status === 'live' ? 'bg-green-500/20 text-green-400' :
                      selectedApp.status === 'pilot' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedApp.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedApp.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Impact Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedApp.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold" style={{ color: metric.color }}>
                          {metric.value}
                        </p>
                        <p className="text-sm text-gray-300 mt-1">{metric.label}</p>
                        <p className="text-xs text-gray-400 mt-1">{metric.improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}