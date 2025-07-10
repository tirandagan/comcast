'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Brain, Tv, Network, Building } from 'lucide-react';
import { AIPortfolioMatrix } from './chapter4/AIPortfolioMatrix';
import { CustomerExperienceAI } from './chapter4/CustomerExperienceAI';
import { NetworkOperationsAI } from './chapter4/NetworkOperationsAI';
import { ContentMediaAI } from './chapter4/ContentMediaAI';
import { ROIProjectionDashboard } from './chapter4/ROIProjectionDashboard';

const sections = [
  {
    id: 'portfolio',
    title: 'AI Innovation Portfolio',
    icon: <Sparkles className="w-6 h-6" />,
    component: AIPortfolioMatrix,
    description: 'Strategic AI use cases mapped by impact and complexity'
  },
  {
    id: 'customer',
    title: 'Customer Experience AI',
    icon: <Brain className="w-6 h-6" />,
    component: CustomerExperienceAI,
    description: 'Transform every customer touchpoint with intelligent experiences'
  },
  {
    id: 'network',
    title: 'Network Operations AI',
    icon: <Network className="w-6 h-6" />,
    component: NetworkOperationsAI,
    description: 'Self-healing, predictive, and optimized network infrastructure'
  },
  {
    id: 'content',
    title: 'Content & Media AI',
    icon: <Tv className="w-6 h-6" />,
    component: ContentMediaAI,
    description: 'Revolutionize content creation, distribution, and monetization'
  },
  {
    id: 'roi',
    title: 'Financial Projections',
    icon: <Building className="w-6 h-6" />,
    component: ROIProjectionDashboard,
    description: 'Path to $2B+ annual value creation with detailed ROI analysis'
  }
];

export function Chapter4() {
  const [activeSection, setActiveSection] = useState('portfolio');

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || AIPortfolioMatrix;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI Innovation Portfolio & Roadmap
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          High-impact AI use cases across every business dimension, 
          delivering $2.5B+ in new revenue and $600M+ in cost savings
        </p>
      </motion.div>

      {/* Key Metrics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <p className="text-3xl font-bold text-white">50+</p>
          <p className="text-gray-300">AI Use Cases</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <p className="text-3xl font-bold text-white">$2.5B+</p>
          <p className="text-gray-300">Revenue Potential</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <p className="text-3xl font-bold text-white">18mo</p>
          <p className="text-gray-300">ROI Payback</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
          <p className="text-3xl font-bold text-white">500%</p>
          <p className="text-gray-300">3-Year ROI</p>
        </div>
      </motion.div>

      {/* Section Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.icon}
              <span className="font-medium">{section.title}</span>
            </motion.button>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-3">
          {sections.find(s => s.id === activeSection)?.description}
        </p>
      </div>

      {/* Active Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Comcast with AI?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            This portfolio represents the most comprehensive AI transformation in the telecommunications industry. 
            With my proven track record at Cognizant ISG and deep understanding of Comcast's potential, 
            I'm ready to lead this revolution.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all">
            Let's Build the Future Together
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}