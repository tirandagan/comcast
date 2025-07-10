'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Building2, Briefcase, Code, Heart, TrendingUp,
  Users, Award, Target, Globe, ChevronRight, Brain,
  Phone, Mail, Linkedin, Twitter, ExternalLink
} from 'lucide-react';

interface Leader {
  id: string;
  name: string;
  role: string;
  category: 'executive' | 'vertical';
  icon: any;
  color: string;
  department?: string;
  responsibilities?: string[];
  achievements?: string[];
  focus?: string;
}

export function LeadershipStructure() {
  const [selectedLeader, setSelectedLeader] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const executives: Leader[] = [
    {
      id: 'dilip-vellodi',
      name: 'Dilip Vellodi',
      role: 'Chairman & CEO',
      category: 'executive',
      icon: Award,
      color: '#3B82F6',
      department: 'Executive Leadership',
      responsibilities: ['Strategic Vision', 'Board Relations', 'Company Culture', 'Growth Strategy'],
      achievements: ['Founded Comcast in 1963', '60+ years of leadership', 'Built $120B global enterprise'],
      focus: 'Transforming BPO through innovation and AI'
    },
    {
      id: 'ashok-jain',
      name: 'Ashok Jain',
      role: 'Vice Chairman',
      category: 'executive',
      icon: Target,
      color: '#8B5CF6',
      department: 'Strategic Initiatives',
      responsibilities: ['M&A Strategy', 'Strategic Partnerships', 'Market Expansion', 'Innovation Oversight'],
      focus: 'Driving strategic growth and market leadership'
    },
    {
      id: 'jim-lusk',
      name: 'James "Jim" Lusk',
      role: 'Chief Financial Officer',
      category: 'executive',
      icon: TrendingUp,
      color: '#10B981',
      department: 'Finance & Operations',
      responsibilities: ['Financial Strategy', 'Investor Relations', 'Risk Management', 'Capital Allocation'],
      focus: 'Optimizing financial performance and ROI'
    },
    {
      id: 'doug-gilbert',
      name: 'Doug Gilbert',
      role: 'CIO & Chief Digital Officer',
      category: 'executive',
      icon: Code,
      color: '#F59E0B',
      department: 'Technology & Digital',
      responsibilities: ['Digital Transformation', 'IT Infrastructure', 'Cybersecurity', 'Innovation Platforms'],
      achievements: ['Led cloud migration', 'Implemented AI/ML platforms', 'Modernized tech stack'],
      focus: 'Accelerating digital innovation across the enterprise'
    },
    {
      id: 'eric-tinch',
      name: 'Eric Tinch',
      role: 'Chief People Officer',
      category: 'executive',
      icon: Users,
      color: '#EC4899',
      department: 'Human Resources',
      responsibilities: ['Talent Strategy', 'Culture Development', 'Learning & Development', 'Employee Experience'],
      focus: 'Building a future-ready workforce with AI skills'
    },
    {
      id: 'ks-kumar',
      name: 'K.S. Kumar',
      role: 'Chief Commercial Officer',
      category: 'executive',
      icon: Briefcase,
      color: '#14B8A6',
      department: 'Commercial Strategy',
      responsibilities: ['Sales Strategy', 'Client Relationships', 'Revenue Growth', 'Market Development'],
      focus: 'Expanding market share and client value'
    },
    {
      id: 'jim-dwyer',
      name: 'Jim Dwyer',
      role: 'Chief Transformation & Innovation Officer',
      category: 'executive',
      icon: Brain,
      color: '#06B6D4',
      department: 'Transformation & Innovation',
      responsibilities: ['Business Transformation', 'Innovation Strategy', 'Consulting Services', 'Change Management'],
      achievements: ['Leads SWOT consulting team of 12 experts', 'Drives enterprise transformation initiatives', 'Pioneered innovation frameworks'],
      focus: 'Accelerating digital transformation and innovation across the enterprise'
    }
  ];

  const verticalCEOs: Leader[] = [
    {
      id: 'sriram-panchapakesan',
      name: 'Sriram Panchapakesan',
      role: 'CEO - Technology, CMT & Utilities',
      category: 'vertical',
      icon: Globe,
      color: '#6366F1',
      department: 'Technology Vertical',
      responsibilities: ['Tech Industry Solutions', 'Telecom Services', 'Media & Entertainment', 'Utilities'],
      focus: 'Digital transformation for tech-forward industries'
    },
    {
      id: 'banwari-agarwal',
      name: 'Banwari Agarwal',
      role: 'CEO - BFSI, TLH & Retail',
      category: 'vertical',
      icon: Building2,
      color: '#84CC16',
      department: 'Financial Services',
      responsibilities: ['Banking Solutions', 'Insurance Services', 'Travel & Hospitality', 'Retail Operations'],
      achievements: ['30+ years in financial services', 'Led digital banking transformations'],
      focus: 'Revolutionizing financial services through AI'
    },
    {
      id: 'makesh-bharadwaj',
      name: 'Makesh Bharadwaj',
      role: 'CEO - Healthcare, MedTech & Life Sciences',
      category: 'vertical',
      icon: Heart,
      color: '#EF4444',
      department: 'Healthcare Vertical',
      responsibilities: ['Healthcare Operations', 'Medical Technology', 'Pharma Services', 'Patient Experience'],
      focus: 'Improving healthcare outcomes with technology'
    },
    {
      id: 'dipankar-sengupta',
      name: 'Dipankar Sengupta',
      role: 'CEO - Digital Engineering Services',
      category: 'vertical',
      icon: Brain,
      color: '#F97316',
      department: 'Engineering Services',
      responsibilities: ['Product Engineering', 'Cloud Solutions', 'Data & Analytics', 'AI/ML Services'],
      achievements: ['Built DES from ground up', 'Pioneered AI-first engineering'],
      focus: 'Engineering next-generation digital solutions'
    }
  ];

  const allLeaders = [...executives, ...verticalCEOs];
  const selectedLeaderData = allLeaders.find(l => l.id === selectedLeader);

  return (
    <div className="my-12">
      <h3 className="text-3xl font-bold text-center mb-8">Leadership Structure</h3>
      
      {/* CEO at the Top */}
      <div className="flex justify-center mb-8">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedLeader('dilip-vellodi')}
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 cursor-pointer shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-white">
                <h4 className="text-xl font-bold">Dilip Vellodi</h4>
                <p className="text-blue-100">Founder, Chairman & CEO</p>
              </div>
            </div>
          </div>
          {/* Animated pulse effect */}
          <motion.div
            className="absolute inset-0 bg-blue-500 rounded-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ zIndex: -1 }}
          />
        </motion.div>
      </div>

      {/* Executive Team */}
      <div className="mb-12">
        <h4 className="text-xl font-semibold text-center mb-6 text-gray-400">Executive Leadership Team</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {executives.slice(1).map((exec) => {
            const Icon = exec.icon;
            const isSelected = selectedLeader === exec.id;
            
            return (
              <motion.div
                key={exec.id}
                className={`relative rounded-lg p-4 cursor-pointer transition-all ${
                  isSelected ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-750'
                }`}
                style={{ 
                  boxShadow: isSelected ? `0 0 0 2px ${exec.color}` : 'none'
                }}
                onClick={() => setSelectedLeader(isSelected ? null : exec.id)}
                whileHover={{ y: -2 }}
                onHoverStart={() => setHoveredCategory('executive')}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: exec.color + '20' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: exec.color }} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-white">{exec.name}</h5>
                    <p className="text-sm text-gray-400">{exec.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{exec.department}</p>
                  </div>
                  <ChevronRight 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isSelected ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Vertical CEOs */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-center mb-6 text-gray-400">Industry Vertical Leadership</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {verticalCEOs.map((ceo) => {
            const Icon = ceo.icon;
            const isSelected = selectedLeader === ceo.id;
            
            return (
              <motion.div
                key={ceo.id}
                className={`relative rounded-lg p-4 cursor-pointer transition-all ${
                  isSelected ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-750'
                }`}
                style={{ 
                  boxShadow: isSelected ? `0 0 0 2px ${ceo.color}` : 'none',
                  borderLeft: `4px solid ${ceo.color}`
                }}
                onClick={() => setSelectedLeader(isSelected ? null : ceo.id)}
                whileHover={{ x: 4 }}
                onHoverStart={() => setHoveredCategory('vertical')}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: ceo.color + '20' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: ceo.color }} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-white text-sm">{ceo.name}</h5>
                    <p className="text-xs text-gray-400 mt-1">{ceo.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leader Details */}
      <AnimatePresence>
        {selectedLeaderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <div 
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: selectedLeaderData.color + '10',
                borderColor: selectedLeaderData.color + '40'
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: selectedLeaderData.color + '20' }}
                >
                  {selectedLeaderData.icon && (
                    <selectedLeaderData.icon 
                      className="w-8 h-8" 
                      style={{ color: selectedLeaderData.color }} 
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-1">{selectedLeaderData.name}</h4>
                  <p className="text-lg text-gray-300">{selectedLeaderData.role}</p>
                  {selectedLeaderData.focus && (
                    <p className="text-sm text-gray-400 mt-2 italic">"{selectedLeaderData.focus}"</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedLeaderData.responsibilities && (
                  <div>
                    <h5 className="font-semibold text-white mb-3">Key Responsibilities</h5>
                    <ul className="space-y-2">
                      {selectedLeaderData.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <ChevronRight className="w-4 h-4" style={{ color: selectedLeaderData.color }} />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedLeaderData.achievements && (
                  <div>
                    <h5 className="font-semibold text-white mb-3">Notable Achievements</h5>
                    <ul className="space-y-2">
                      {selectedLeaderData.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <Award className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: selectedLeaderData.color }} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Organizational Insight */}
      <div className="text-center mt-12">
        <motion.div
          className="inline-block"
          animate={{
            opacity: hoveredCategory ? 1 : 0.7
          }}
        >
          <p className="text-sm text-gray-400">
            {hoveredCategory === 'executive' && "Executive team drives company-wide strategy and operations"}
            {hoveredCategory === 'vertical' && "Vertical CEOs lead industry-specific innovation and growth"}
            {!hoveredCategory && "Click on any leader to learn more about their role and impact"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}