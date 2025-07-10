'use client';

import { motion } from 'framer-motion';
import { DataPlatformArchitecture } from './DataPlatformArchitecture';
import { DataFlowVisualization } from './DataFlowVisualization';
import { TechnologyStackDiagram } from './TechnologyStackDiagram';
import { 
  Database, Zap, Shield, Brain, 
  TrendingUp, Users, DollarSign, Clock
} from 'lucide-react';

export function Chapter3() {
  const impactMetrics = [
    {
      icon: DollarSign,
      value: '$500M+',
      label: 'Annual Value Creation',
      color: 'text-green-400',
      description: 'Through AI-driven insights and automation'
    },
    {
      icon: Clock,
      value: '60%',
      label: 'Faster Insights',
      color: 'text-blue-400',
      description: 'Real-time processing vs. batch analytics'
    },
    {
      icon: Users,
      value: '10,000+',
      label: 'Data Citizens',
      color: 'text-purple-400',
      description: 'Empowered with self-service analytics'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Automation Rate',
      color: 'text-orange-400',
      description: 'Of routine data operations'
    },
  ];

  return (
    <div className="space-y-12">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4">
          Building the Foundation for AI at Scale
        </h2>
        <p className="text-xl text-gray-300">
          A unified data platform that transforms Comcast's vast data assets into competitive advantage 
          through real-time processing, AI/ML capabilities, and democratized access.
        </p>
      </motion.div>

      {/* Key Value Propositions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/20"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Strategic Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                </div>
                <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                  {metric.value}
                </div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.description}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Data Platform Architecture */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <DataPlatformArchitecture />
      </motion.div>

      {/* Data Flow Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <DataFlowVisualization />
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <TechnologyStackDiagram />
      </motion.div>

      {/* Key Differentiators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-gray-800 rounded-lg p-8"
      >
        <h3 className="text-2xl font-bold mb-6">Platform Differentiators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold">Real-Time Everything</h4>
            </div>
            <p className="text-gray-300">
              Sub-second data processing from edge to insight, enabling instant decision-making 
              across all business functions.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold">AI-Native Architecture</h4>
            </div>
            <p className="text-gray-300">
              Purpose-built for AI/ML workloads with integrated MLOps, feature stores, and 
              model serving at scale.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold">Privacy by Design</h4>
            </div>
            <p className="text-gray-300">
              Built-in privacy controls, automated compliance, and zero-trust security 
              architecture protecting customer data.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Implementation Roadmap Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-lg p-8 border border-orange-500/20"
      >
        <h3 className="text-2xl font-bold mb-4">Implementation Approach</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-orange-400 mb-2">Phase 1: Foundation (Q1-Q2)</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Unified data lake deployment</li>
              <li>• Core ML platform setup</li>
              <li>• Initial use case pilots</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-400 mb-2">Phase 2: Scale (Q3-Q4)</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Real-time streaming at scale</li>
              <li>• AI model productionization</li>
              <li>• Self-service enablement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-400 mb-2">Phase 3: Transform (Year 2)</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Enterprise-wide adoption</li>
              <li>• Advanced AI capabilities</li>
              <li>• Industry-leading platform</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}