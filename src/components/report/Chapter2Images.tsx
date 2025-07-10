'use client';

import { motion } from 'framer-motion';
import { 
  Building2, Users, Brain, Zap, Globe, Shield,
  TrendingUp, Target, Lightbulb, Award, Layers, AlertTriangle
} from 'lucide-react';

// Innovation Framework Diagram
export function InnovationFrameworkDiagram() {
  const layers = [
    {
      title: 'Strategic Vision',
      color: 'from-purple-600 to-purple-500',
      items: ['AI-First Mindset', 'Industry Leadership', 'Client Partnership'],
      icon: Target,
    },
    {
      title: 'Innovation Ecosystem',
      color: 'from-blue-600 to-blue-500',
      items: ['Labs & Centers', 'Partner Network', 'Academic Alliances'],
      icon: Globe,
    },
    {
      title: 'Enabling Technologies',
      color: 'from-green-600 to-green-500',
      items: ['AI/ML Platforms', 'Cloud Infrastructure', 'Data Analytics'],
      icon: Zap,
    },
    {
      title: 'Delivery Excellence',
      color: 'from-orange-600 to-orange-500',
      items: ['Agile Methods', 'DevOps Culture', 'Quality Assurance'],
      icon: Award,
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Sutherland Innovation Framework</h3>
      <div className="relative">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.title}
              className={`relative bg-gradient-to-r ${layer.color} rounded-lg p-6 mb-4 text-white`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ marginLeft: `${index * 40}px` }}
            >
              <div className="flex items-center gap-4">
                <Icon className="w-12 h-12" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{layer.title}</h4>
                  <div className="flex gap-4">
                    {layer.items.map((item) => (
                      <span key={item} className="text-sm bg-white/20 px-3 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {index < layers.length - 1 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-white/30"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Innovation Maturity Journey
export function MaturityJourneyVisual() {
  const stages = [
    {
      level: 1,
      title: 'Ad-hoc',
      description: 'Isolated innovation efforts',
      current: true,
      color: 'bg-red-500',
    },
    {
      level: 2,
      title: 'Managed',
      description: 'Coordinated initiatives',
      current: false,
      color: 'bg-orange-500',
    },
    {
      level: 3,
      title: 'Defined',
      description: 'Standardized processes',
      current: false,
      color: 'bg-yellow-500',
    },
    {
      level: 4,
      title: 'Quantified',
      description: 'Measured outcomes',
      current: false,
      color: 'bg-green-500',
    },
    {
      level: 5,
      title: 'Optimized',
      description: 'Continuous innovation',
      target: true,
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Innovation Maturity Journey</h3>
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-24 left-0 right-0 h-1 bg-gray-700" />
        
        <div className="grid grid-cols-5 gap-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.level}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Stage Circle */}
              <div className="relative flex justify-center">
                <motion.div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl ${stage.color} ${
                    stage.current ? 'ring-4 ring-white ring-offset-4 ring-offset-gray-900' : ''
                  }`}
                  animate={stage.current ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {stage.level}
                </motion.div>
                {stage.current && (
                  <motion.div
                    className="absolute -top-8 bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Current
                  </motion.div>
                )}
                {stage.target && (
                  <motion.div
                    className="absolute -top-8 bg-green-600 text-white px-3 py-1 rounded text-sm"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Target
                  </motion.div>
                )}
              </div>
              
              {/* Stage Details */}
              <div className="text-center mt-4">
                <h4 className="font-semibold">{stage.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Innovation Ecosystem Visual
export function InnovationEcosystemVisual() {
  const ecosystem = {
    core: { name: 'Sutherland Innovation Core', icon: Brain },
    pillars: [
      { name: 'Technology', icon: Zap, color: 'text-blue-400' },
      { name: 'Talent', icon: Users, color: 'text-green-400' },
      { name: 'Process', icon: Layers, color: 'text-purple-400' },
      { name: 'Culture', icon: Lightbulb, color: 'text-yellow-400' },
    ],
    enablers: [
      'Leadership Commitment',
      'Investment Strategy',
      'Partner Network',
      'Client Collaboration',
      'Academic Alliances',
      'Startup Ecosystem',
    ],
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Innovation Ecosystem</h3>
      <div className="relative h-96 flex items-center justify-center">
        {/* Core */}
        <motion.div
          className="absolute w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-2 text-white" />
            <p className="text-xs font-bold text-white px-2">Innovation Core</p>
          </div>
        </motion.div>
        
        {/* Pillars */}
        {ecosystem.pillars.map((pillar, index) => {
          const angle = (index / ecosystem.pillars.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 120;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const Icon = pillar.icon;
          
          return (
            <motion.div
              key={pillar.name}
              className="absolute w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700"
              style={{
                left: `calc(50% + ${x}px - 48px)`,
                top: `calc(50% + ${y}px - 48px)`,
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-center">
                <Icon className={`w-8 h-8 mx-auto mb-1 ${pillar.color}`} />
                <p className="text-xs font-semibold">{pillar.name}</p>
              </div>
            </motion.div>
          );
        })}
        
        {/* Enablers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full border-2 border-dashed border-gray-700">
            {ecosystem.enablers.map((enabler, index) => {
              const angle = (index / ecosystem.enablers.length) * 2 * Math.PI;
              const radius = 160;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              
              return (
                <motion.div
                  key={enabler}
                  className="absolute text-xs bg-gray-800/50 px-3 py-1 rounded"
                  style={{
                    left: `calc(50% + ${x}px - 60px)`,
                    top: `calc(50% + ${y}px - 12px)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {enabler}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// SWOT Visual Summary
export function SWOTVisualSummary() {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">SWOT Analysis at a Glance</h3>
      <div className="grid grid-cols-2 gap-1 max-w-4xl mx-auto">
        {/* Strengths */}
        <motion.div
          className="bg-gradient-to-br from-green-600/20 to-green-500/10 p-8 border-2 border-green-500"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-green-400" />
            <h4 className="text-xl font-bold text-green-400">Strengths</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <span>40,000+ global workforce</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <span>200+ patents & innovations</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <span>Established innovation labs</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <span>9 industry vertical expertise</span>
            </li>
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          className="bg-gradient-to-br from-red-600/20 to-red-500/10 p-8 border-2 border-red-500"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <h4 className="text-xl font-bold text-red-400">Weaknesses</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
              <span>Fragmented innovation efforts</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
              <span>Limited AI/ML expertise</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
              <span>Traditional BPO mindset</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
              <span>Slow decision cycles</span>
            </li>
          </ul>
        </motion.div>

        {/* Opportunities */}
        <motion.div
          className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 p-8 border-2 border-blue-500"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <h4 className="text-xl font-bold text-blue-400">Opportunities</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <span>$150B AI services market</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <span>Digital transformation demand</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <span>Industry 4.0 adoption</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <span>Emerging tech opportunities</span>
            </li>
          </ul>
        </motion.div>

        {/* Threats */}
        <motion.div
          className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 p-8 border-2 border-yellow-500"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h4 className="text-xl font-bold text-yellow-400">Threats</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
              <span>Tech-native competition</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
              <span>Talent acquisition war</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
              <span>Rapid tech disruption</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
              <span>Rising client expectations</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}