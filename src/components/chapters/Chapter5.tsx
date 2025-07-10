'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, Target, Building, Award, TrendingUp, Brain, Briefcase, DollarSign, Zap, Shield, Book, Code } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { useViewportAnimation, animationVariants, useStableAnimation } from '@/hooks/useViewportAnimation';

// Talent transformation data
const talentMetrics = {
  core: { current: 50, target: 100, category: 'Elite AI Architects' },
  revenue: { current: 100, target: 'Demand-Based', category: 'Billable AI Practitioners' },
  partner: { current: 2, target: 10, category: 'Strategic Vendor Partners' }
};

const culturePhases = [
  {
    phase: 'Awareness',
    timeline: 'Months 1-3',
    activities: [
      'Executive AI immersion program',
      'Department AI champions',
      'Success story campaigns',
      'KPIs tied to AI adoption'
    ],
    progress: 100
  },
  {
    phase: 'Adoption',
    timeline: 'Months 4-9',
    activities: [
      'Citizen developer programs',
      'AI hackathons quarterly',
      'Innovation challenges',
      'Reward early adopters'
    ],
    progress: 65
  },
  {
    phase: 'Acceleration',
    timeline: 'Months 10-18',
    activities: [
      'AI-first decision making',
      'Automated workflows standard',
      'Continuous learning culture',
      'Innovation metrics in reviews'
    ],
    progress: 25
  }
];

const skillsRadarData = [
  { skill: 'Data Science', current: 2, target: 4.5, fullMark: 5 },
  { skill: 'ML Engineering', current: 2.5, target: 4, fullMark: 5 },
  { skill: 'AI Ethics', current: 1.5, target: 4.5, fullMark: 5 },
  { skill: 'Business Acumen', current: 3, target: 4.5, fullMark: 5 },
  { skill: 'Cloud Platforms', current: 3, target: 4, fullMark: 5 },
  { skill: 'Innovation Mindset', current: 2.5, target: 5, fullMark: 5 }
];

const organizationStructure = {
  total: 600,
  breakdown: [
    { department: 'Data Platform Engineering', count: 200, color: '#3B82F6' },
    { department: 'AI/ML Engineering', count: 150, color: '#10B981' },
    { department: 'Data Governance & Privacy', count: 50, color: '#F59E0B' },
    { department: 'Analytics & Insights', count: 100, color: '#8B5CF6' },
    { department: 'AI Business Solutions', count: 100, color: '#EC4899' }
  ]
};

const successMetricsData = [
  { category: 'Technical', metrics: [
    { name: 'Models in Production', value: '500+', iconType: 'Brain' },
    { name: 'Inference Latency', value: '<100ms', iconType: 'Zap' },
    { name: 'Model Accuracy', value: '>95%', iconType: 'Target' },
    { name: 'Platform Uptime', value: '99.99%', iconType: 'Building' }
  ]},
  { category: 'Business', metrics: [
    { name: 'Revenue from AI', value: '$2B+', iconType: 'DollarSign' },
    { name: 'Cost Savings', value: '$1B+', iconType: 'TrendingUp' },
    { name: 'Billable AI Practitioners', value: 'Demand-Based', iconType: 'Users' },
    { name: 'Client Self-Service Rate', value: '60%+', iconType: 'GraduationCap' }
  ]},
  { category: 'Innovation', metrics: [
    { name: 'Patents Filed', value: '50+/yr', iconType: 'Award' },
    { name: 'Research Papers', value: '20+/yr', iconType: 'Book' },
    { name: 'Open Source Projects', value: '10+', iconType: 'Code' },
    { name: 'University Partners', value: '10+', iconType: 'Building' }
  ]}
];


export function Chapter5() {
  const [activeView, setActiveView] = useState<'model' | 'talent' | 'culture' | 'metrics'>('model');
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  // Icon mapping function
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'Brain': return Brain;
      case 'Zap': return Zap;
      case 'Target': return Target;
      case 'Building': return Building;
      case 'DollarSign': return DollarSign;
      case 'TrendingUp': return TrendingUp;
      case 'Users': return Users;
      case 'GraduationCap': return GraduationCap;
      case 'Award': return Award;
      case 'Book': return Book;
      case 'Code': return Code;
      case 'Shield': return Shield;
      default: return Brain;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Chapter Header removed - already shown by the page */}

      {/* ISG Success Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-4">My Proven Track Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">$200M+</p>
            <p className="text-gray-300">ISG Revenue at Cognizant</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-400">400</p>
            <p className="text-gray-300">Professionals Led</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-yellow-400">50+</p>
            <p className="text-gray-300">AI Transformations</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-400">500+</p>
            <p className="text-gray-300">Executives Trained</p>
          </div>
        </div>
      </motion.div>

      {/* View Selector */}
      <div className="flex justify-center gap-4 flex-wrap">
        {(['model', 'talent', 'culture', 'metrics'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-6 py-3 rounded-lg capitalize transition-all font-medium ${
              activeView === view
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {view === 'model' ? 'ISG Model' : view === 'talent' ? 'Talent Strategy' : view === 'culture' ? 'Cultural Transformation' : 'Success Metrics'}
          </button>
        ))}
      </div>

      {/* Content Views - Using display instead of AnimatePresence to prevent re-animation */}
      <div className="relative">
        <motion.div
          style={{ display: activeView === 'model' ? 'block' : 'none' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
            {/* ISG Model Applied to Comcast */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">ISG Model Applied to Comcast AI Center of Excellence</h3>
              
              {/* ISG Model Visualization */}
              <div className="relative">
                {/* Central Hub */}
                <div className="flex justify-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <Brain className="w-16 h-16 text-white mb-2 mx-auto" />
                        <h4 className="text-xl font-bold text-white">AI CoE</h4>
                        <p className="text-sm text-white/80">100 Core Experts</p>
                      </div>
                    </div>
                    
                    {/* Orbiting Elements */}
                    {[
                      { icon: Users, label: 'Revenue Teams', angle: 0, color: 'from-green-500 to-emerald-500' },
                      { icon: Building, label: 'Business Units', angle: 72, color: 'from-orange-500 to-red-500' },
                      { icon: Target, label: 'Client Success', angle: 144, color: 'from-yellow-500 to-amber-500' },
                      { icon: Briefcase, label: 'Vendor Partners', angle: 216, color: 'from-purple-500 to-pink-500' },
                      { icon: GraduationCap, label: 'Enablement', angle: 288, color: 'from-cyan-500 to-blue-500' }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      const x = Math.cos((item.angle * Math.PI) / 180) * 150;
                      const y = Math.sin((item.angle * Math.PI) / 180) * 150;
                      
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            transform: `translate(${x - 40}px, ${y - 40}px)`
                          }}
                        >
                          <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-xs text-center mt-2 text-gray-300 font-medium">{item.label}</p>
                        </motion.div>
                      );
                    })}
                    
                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
                      {[0, 72, 144, 216, 288].map((angle) => {
                        const x1 = Math.cos((angle * Math.PI) / 180) * 70;
                        const y1 = Math.sin((angle * Math.PI) / 180) * 70;
                        const x2 = Math.cos((angle * Math.PI) / 180) * 110;
                        const y2 = Math.sin((angle * Math.PI) / 180) * 110;
                        
                        return (
                          <motion.line
                            key={angle}
                            x1={x1 + 96}
                            y1={y1 + 96}
                            x2={x2 + 96}
                            y2={y2 + 96}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        );
                      })}
                    </svg>
                  </motion.div>
                </div>

                {/* Key Components */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30"
                  >
                    <Target className="w-8 h-8 text-blue-400 mb-2" />
                    <h5 className="font-semibold text-white mb-1">Core Excellence</h5>
                    <p className="text-xs text-gray-300">Elite AI architects and strategists driving innovation</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30"
                  >
                    <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                    <h5 className="font-semibold text-white mb-1">Revenue Model</h5>
                    <p className="text-xs text-gray-300">Billable practitioners scaling with client demand</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30"
                  >
                    <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                    <h5 className="font-semibold text-white mb-1">Client Enablement</h5>
                    <p className="text-xs text-gray-300">Platforms and tools for self-service AI</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30"
                  >
                    <Shield className="w-8 h-8 text-purple-400 mb-2" />
                    <h5 className="font-semibold text-white mb-1">Governance</h5>
                    <p className="text-xs text-gray-300">C-suite sponsorship and ethical AI oversight</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Department Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizationStructure.breakdown.map((dept, index) => (
                <motion.div
                  key={dept.department}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 cursor-pointer"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">{dept.department}</h4>
                    <span className="text-2xl font-bold" style={{ color: dept.color }}>
                      {dept.count}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    {dept.department === 'Data Platform Engineering' && (
                      <>
                        <p>• Infrastructure & Architecture</p>
                        <p>• Data Engineering</p>
                        <p>• Platform Operations</p>
                      </>
                    )}
                    {dept.department === 'AI/ML Engineering' && (
                      <>
                        <p>• ML Engineering</p>
                        <p>• MLOps & Deployment</p>
                        <p>• Research & Innovation</p>
                      </>
                    )}
                    {dept.department === 'Data Governance & Privacy' && (
                      <>
                        <p>• Privacy Engineering</p>
                        <p>• Compliance & Risk</p>
                        <p>• Data Quality</p>
                      </>
                    )}
                    {dept.department === 'Analytics & Insights' && (
                      <>
                        <p>• Customer Analytics</p>
                        <p>• Network Analytics</p>
                        <p>• Business Intelligence</p>
                      </>
                    )}
                    {dept.department === 'AI Business Solutions' && (
                      <>
                        <p>• Customer Experience AI</p>
                        <p>• Network AI</p>
                        <p>• Content AI</p>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'talent' && (
          <motion.div
            key="talent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Talent Strategy Overview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Revenue-Focused Talent Strategy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                    Core Excellence
                  </h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{talentMetrics.core.current}/{talentMetrics.core.target}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(talentMetrics.core.current / talentMetrics.core.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Elite AI architects & designers</li>
                    <li>• Solution innovation leaders</li>
                    <li>• Platform engineering experts</li>
                    <li>• Strategic vision drivers</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-green-400" />
                    Revenue Generation
                  </h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{talentMetrics.revenue.current}/{talentMetrics.revenue.target}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Billable AI practitioners</li>
                    <li>• Scale based on demand</li>
                    <li>• Vendor partnerships</li>
                    <li>• Client value focused</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Building className="w-6 h-6 text-purple-400" />
                    Partner
                  </h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{talentMetrics.partner.current}/{talentMetrics.partner.target}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(talentMetrics.partner.current / talentMetrics.partner.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Strategic vendor pools</li>
                    <li>• On-demand scaling</li>
                    <li>• Client co-creation</li>
                    <li>• Platform enablement</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills Gap Analysis */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Skills Gap Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsRadarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} stroke="#9CA3AF" />
                  <Radar name="Current State" dataKey="current" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                  <Radar name="Target State" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeView === 'culture' && (
          <motion.div
            key="culture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Cultural Transformation Roadmap */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Cultural Transformation Journey</h3>
              
              {culturePhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="mb-8 last:mb-0"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{phase.phase}</h4>
                      <p className="text-gray-400">{phase.timeline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-400">{phase.progress}%</p>
                      <p className="text-sm text-gray-400">Complete</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${phase.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5" />
                        <p className="text-gray-300 text-sm">{activity}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Culture Initiatives */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6"
              >
                <Brain className="w-10 h-10 text-blue-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">AI-First Mindset</h4>
                <p className="text-gray-300 text-sm">Every decision enhanced by data and AI insights</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6"
              >
                <Users className="w-10 h-10 text-green-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Collaborative Innovation</h4>
                <p className="text-gray-300 text-sm">Cross-functional teams driving breakthrough solutions</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6"
              >
                <Award className="w-10 h-10 text-purple-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Recognition & Rewards</h4>
                <p className="text-gray-300 text-sm">Celebrating AI champions and innovation leaders</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeView === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Success Metrics Dashboard */}
            {successMetricsData.map((category, catIndex) => (
              <div key={category.category} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">{category.category} Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {category.metrics.map((metric, index) => {
                    const IconComponent = getIconComponent(metric.iconType);
                    return (
                      <motion.div
                        key={metric.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: catIndex * 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center"
                      >
                        <div className="w-12 h-12 mx-auto mb-3 text-blue-400">
                          <IconComponent />
                        </div>
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                        <p className="text-sm text-gray-300 mt-1">{metric.name}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Building Revenue-Generating AI Capabilities
        </h3>
        <p className="text-gray-300 max-w-3xl mx-auto">
          By applying the proven ISG model and combining it with Comcast's unique assets, 
          we'll build a scalable AI practice that grows with commercial demand—creating value through 
          billable expertise and enabling clients to leverage our platforms independently.
        </p>
      </motion.div>
    </div>
  );
}