'use client';

import { motion } from 'framer-motion';
import { 
  Building2, Users, Brain, TrendingUp, Target, 
  AlertTriangle, Zap, Globe, Award, Layers,
  Shield, Rocket, Clock, DollarSign, Activity,
  GitBranch, Sparkles, ChevronRight
} from 'lucide-react';

// Competitive Landscape Visual Map
export function CompetitiveLandscapeMap() {
  const competitors = [
    { name: 'Teleperformance', x: 20, y: 30, size: 100, color: '#EF4444' },
    { name: 'Concentrix', x: 40, y: 50, size: 70, color: '#F59E0B' },
    { name: 'Accenture', x: 70, y: 60, size: 120, color: '#3B82F6' },
    { name: 'Genpact', x: 50, y: 40, size: 60, color: '#8B5CF6' },
    { name: 'WNS', x: 60, y: 50, size: 40, color: '#EC4899' },
    { name: 'HCL', x: 80, y: 70, size: 80, color: '#10B981' },
    { name: 'Comcast\n(Target)', x: 85, y: 85, size: 90, color: '#22C55E', isTarget: true }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Competitive Landscape Map</h3>
      <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-gray-800" style={{ top: `${i * 10}%` }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-gray-800" style={{ left: `${i * 10}%` }} />
          ))}
        </div>

        {/* Axis labels */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
          Innovation Speed →
        </div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-400">
          Client Empowerment →
        </div>

        {/* Competitors */}
        {competitors.map((comp, index) => (
          <motion.div
            key={comp.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${comp.x}%`, 
              top: `${100 - comp.y}%`,
              width: comp.size,
              height: comp.size
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
          >
            <div
              className={`w-full h-full rounded-full flex items-center justify-center text-white font-semibold text-xs ${
                comp.isTarget ? 'animate-pulse' : ''
              }`}
              style={{ 
                backgroundColor: comp.color,
                opacity: comp.isTarget ? 1 : 0.8,
                border: comp.isTarget ? '3px solid white' : 'none'
              }}
            >
              <span className="text-center px-2">{comp.name}</span>
            </div>
            {comp.isTarget && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: comp.color }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.div>
        ))}

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-gray-900/80 rounded p-3 text-xs">
          <div className="font-semibold mb-2">Bubble Size = Market Scale</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Comcast Target Position</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Innovation Gap Visual
export function InnovationGapVisual() {
  const gaps = [
    {
      title: 'Rapid Prototyping',
      icon: Rocket,
      current: 'Industry: 3-6 months',
      target: 'Comcast: 2-4 weeks',
      gap: '85% faster',
      color: 'text-blue-400'
    },
    {
      title: 'Client Empowerment',
      icon: Users,
      current: 'Industry: Vendor model',
      target: 'Comcast: Partner model',
      gap: 'Paradigm shift',
      color: 'text-purple-400'
    },
    {
      title: 'AI Accelerators',
      icon: Zap,
      current: 'Industry: Basic tools',
      target: 'Comcast: Full stack',
      gap: '10x productivity',
      color: 'text-yellow-400'
    },
    {
      title: 'Innovation Metrics',
      icon: Activity,
      current: 'Industry: Lagging indicators',
      target: 'Comcast: Real-time KPIs',
      gap: 'Predictive insights',
      color: 'text-green-400'
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Strategic Innovation Gaps</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gaps.map((gap, index) => {
          const Icon = gap.icon;
          return (
            <motion.div
              key={gap.title}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-gray-700 rounded-lg ${gap.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-3">{gap.title}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-sm text-gray-400">{gap.current}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-sm">{gap.target}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                      {gap.gap}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Competitive Advantage Framework
export function CompetitiveAdvantageFramework() {
  const layers = [
    {
      title: 'Foundation',
      items: ['40K+ Employees', '60+ Centers', 'Global Reach'],
      color: 'from-gray-700 to-gray-600',
    },
    {
      title: 'Core Capabilities',
      items: ['BPO Excellence', 'Domain Expertise', 'Client Relationships'],
      color: 'from-blue-700 to-blue-600',
    },
    {
      title: 'Innovation Layer',
      items: ['AI/ML Platforms', 'Rapid Prototyping', 'Digital Accelerators'],
      color: 'from-purple-700 to-purple-600',
    },
    {
      title: 'Differentiators',
      items: ['Speed to Market', 'Co-creation Model', 'Industry Solutions'],
      color: 'from-green-700 to-green-600',
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Competitive Advantage Stack</h3>
      <div className="max-w-3xl mx-auto">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.title}
            className={`relative bg-gradient-to-r ${layer.color} rounded-lg p-6 mb-2 text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ marginLeft: `${index * 20}px`, marginRight: `${index * 20}px` }}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold">{layer.title}</h4>
              <div className="flex gap-3">
                {layer.items.map((item, i) => (
                  <span key={i} className="text-sm bg-white/20 px-3 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Unmatched Market Position</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Speed to Market Comparison Visual
export function SpeedToMarketVisual() {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Speed to Market Revolution</h3>
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2" />
          
          {/* Traditional Approach */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="bg-red-600 text-white px-4 py-2 rounded font-semibold">
                Traditional Approach
              </div>
              <div className="flex gap-2">
                {['Requirements', 'Design', 'Development', 'Testing', 'Deployment'].map((phase, i) => (
                  <motion.div
                    key={phase}
                    className="bg-gray-800 border border-red-600 px-3 py-2 rounded text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {phase}
                  </motion.div>
                ))}
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded border border-gray-700">
                <Clock className="w-5 h-5 inline mr-2 text-red-400" />
                <span className="font-bold">3-6 months</span>
              </div>
            </div>
          </motion.div>

          {/* AI-First Approach */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="bg-green-600 text-white px-4 py-2 rounded font-semibold">
                Comcast AI-First
              </div>
              <div className="flex gap-2">
                {['Rapid Discovery', 'AI Development', 'Continuous Iteration'].map((phase, i) => (
                  <motion.div
                    key={phase}
                    className="bg-gray-800 border border-green-600 px-3 py-2 rounded text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    {phase}
                  </motion.div>
                ))}
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded border border-gray-700">
                <Rocket className="w-5 h-5 inline mr-2 text-green-400" />
                <span className="font-bold">2-4 weeks</span>
              </div>
            </div>
          </motion.div>

          {/* Impact Callout */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg">
              <div className="text-4xl font-bold mb-1">85%</div>
              <div className="text-sm">Faster Time to Market</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Partnership Ecosystem Advantage
export function PartnershipEcosystemVisual() {
  const partners = [
    { type: 'Technology', names: ['Microsoft', 'Google', 'AWS'], icon: Brain },
    { type: 'Academia', names: ['MIT', 'Stanford', 'CMU'], icon: Award },
    { type: 'Startups', names: ['AI Labs', 'Innovation Hubs'], icon: Rocket },
    { type: 'Industry', names: ['Healthcare', 'Finance', 'Retail'], icon: Building2 }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Partnership Ecosystem Advantage</h3>
      <div className="relative h-96 flex items-center justify-center">
        {/* Central Hub */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="text-center text-white">
            <Globe className="w-8 h-8 mx-auto mb-1" />
            <p className="text-xs font-bold">Comcast AI Innovation Hub</p>
          </div>
        </motion.div>

        {/* Partner Nodes */}
        {partners.map((partner, index) => {
          const angle = (index / partners.length) * 2 * Math.PI;
          const radius = 140;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const Icon = partner.icon;

          return (
            <motion.div
              key={partner.type}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px - 60px)`,
                top: `calc(50% + ${y}px - 60px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connection Line */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <line
                  x1="60"
                  y1="60"
                  x2={60 - x/2}
                  y2={60 - y/2}
                  stroke="#4B5563"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              <div className="relative bg-gray-800 rounded-lg p-4 w-32 border border-gray-700">
                <Icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <h5 className="text-sm font-semibold text-center mb-2">{partner.type}</h5>
                <div className="space-y-1">
                  {partner.names.map((name, i) => (
                    <div key={i} className="text-xs text-gray-400 text-center">{name}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Rotating Connections */}
        <motion.div
          className="absolute w-80 h-80 rounded-full border-2 border-dashed border-gray-700"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}