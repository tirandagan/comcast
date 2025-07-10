'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar, AreaChart, Area
} from 'recharts';
import { 
  Building2, Users, Globe, TrendingUp, Award, Target,
  Briefcase, MapPin, Calendar, Activity, Layers, Brain,
  DollarSign, Sparkles, ChevronRight, X, ArrowUpRight,
  Factory, Network, Zap, Shield, Clock, Hash, Rocket
} from 'lucide-react';

// Animated Counter Component - Simplified to avoid layout shifts
function AnimatedCounter({ value, suffix = '', prefix = '' }: any) {
  const target = parseFloat(value.toString().replace(/[^0-9.-]+/g, ''));
  const formattedCount = target >= 1000 ? (target / 1000).toFixed(1) + 'k' : target.toFixed(0);
  
  return (
    <span>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}

// Hero Dashboard - Company at a Glance
export function HeroDashboard() {
  const metrics = [
    {
      icon: DollarSign,
      value: '2.4',
      suffix: 'B',
      prefix: '$',
      label: 'Annual Revenue',
      color: 'from-green-600 to-green-500',
      trend: '+12%',
      description: 'FY 2023'
    },
    {
      icon: Users,
      value: '40000',
      suffix: '+',
      label: 'Global Workforce',
      color: 'from-blue-600 to-blue-500',
      trend: '+8%',
      description: 'Across all centers'
    },
    {
      icon: Building2,
      value: '60',
      suffix: '+',
      label: 'Delivery Centers',
      color: 'from-purple-600 to-purple-500',
      description: 'Worldwide presence'
    },
    {
      icon: Globe,
      value: '144',
      suffix: '+',
      label: 'Countries Served',
      color: 'from-orange-600 to-orange-500',
      description: 'Global reach'
    },
    {
      icon: Award,
      value: '200',
      suffix: '+',
      label: 'Patents & Innovations',
      color: 'from-pink-600 to-pink-500',
      trend: '+25%',
      description: 'Proprietary solutions'
    },
    {
      icon: Target,
      value: '63',
      suffix: '%',
      label: 'Outcome-Based Contracts',
      color: 'from-indigo-600 to-indigo-500',
      description: 'Client KPI alignment'
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-3xl font-bold mb-8 text-center">Comcast at a Glance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${metric.color} p-6 rounded-lg`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {metric.trend && (
                    <motion.div 
                      className="flex items-center gap-1 text-white/90 text-sm bg-white/20 px-2 py-1 rounded"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowUpRight className="w-3 h-3" />
                      {metric.trend}
                    </motion.div>
                  )}
                </div>
                
                <div className="text-3xl font-bold text-white mb-2">
                  <AnimatedCounter 
                    value={metric.value} 
                    suffix={metric.suffix} 
                    prefix={metric.prefix} 
                  />
                </div>
                
                <div className="text-white/90 font-medium">{metric.label}</div>
                <div className="text-white/70 text-sm mt-1">{metric.description}</div>
                
                {/* Animated background pattern */}
                <motion.div
                  className="absolute -right-4 -bottom-4 opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Icon className="w-32 h-32 text-white" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Service Ecosystem Visualization
export function ServiceEcosystem() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'cx',
      name: 'Customer Experience',
      icon: Users,
      color: '#3B82F6',
      subServices: ['Contact Center', 'Digital Support', 'Omnichannel', 'Customer Analytics'],
      description: 'End-to-end customer journey transformation'
    },
    {
      id: 'digital',
      name: 'Digital Engineering',
      icon: Brain,
      color: '#8B5CF6',
      subServices: ['Cloud Services', 'AI/ML Solutions', 'Application Development', 'DevOps'],
      description: 'Next-gen technology solutions'
    },
    {
      id: 'bpo',
      name: 'Business Process',
      icon: Briefcase,
      color: '#10B981',
      subServices: ['Finance & Accounting', 'HR Services', 'Procurement', 'Analytics'],
      description: 'Process optimization and automation'
    },
    {
      id: 'data',
      name: 'Data & Analytics',
      icon: Activity,
      color: '#F59E0B',
      subServices: ['Business Intelligence', 'Predictive Analytics', 'Data Engineering', 'ML Ops'],
      description: 'Data-driven insights and intelligence'
    },
    {
      id: 'industry',
      name: 'Industry Solutions',
      icon: Factory,
      color: '#EF4444',
      subServices: ['Healthcare', 'Banking', 'Insurance', 'Retail'],
      description: 'Vertical-specific expertise'
    },
    {
      id: 'innovation',
      name: 'Innovation Services',
      icon: Sparkles,
      color: '#EC4899',
      subServices: ['Rapid Prototyping', 'Design Thinking', 'Innovation Labs', 'Co-creation'],
      description: 'Future-focused transformation'
    }
  ];

  const centerX = 200;
  const centerY = 200;
  const radius = 140;

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Service Portfolio Architecture</h3>
      
      <div className="bg-gray-800 rounded-lg p-8 overflow-visible">
        <div className="relative mx-auto" style={{ width: '400px', height: '400px' }}>
          {/* SVG Container - Lines only */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {services.map((service, index) => {
              const angle = (index / services.length) * 2 * Math.PI - Math.PI / 2;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              const Icon = service.icon;
              const isSelected = selectedService === service.id;

              return (
                <motion.line
                  key={service.id}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke={service.color}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity={isSelected ? 1 : 0.3}
                  animate={{ 
                    strokeDashoffset: isSelected ? [0, -10] : 0,
                    opacity: isSelected ? 1 : 0.3
                  }}
                  transition={{ 
                    strokeDashoffset: { repeat: Infinity, duration: 1 },
                    opacity: { duration: 0.3 }
                  }}
                />
              );
            })}
          </svg>

          {/* Central Hub */}
          <motion.div
            className="absolute w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
            style={{ 
              left: centerX - 48, 
              top: centerY - 48,
              zIndex: 20 
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="text-white font-bold text-center">
              <div className="text-xs">Comcast</div>
              <div className="text-lg">360°</div>
            </div>
          </motion.div>

          {/* Service Nodes as HTML elements */}
          {services.map((service, index) => {
            const angle = (index / services.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const Icon = service.icon;
            const isSelected = selectedService === service.id;

            return (
              <motion.div
                key={service.id}
                className="absolute w-20 h-20 rounded-full flex flex-col items-center justify-center text-white cursor-pointer shadow-lg"
                style={{
                  left: x - 40,
                  top: y - 40,
                  backgroundColor: service.color,
                  zIndex: isSelected ? 15 : 10
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  opacity: isSelected ? 1 : 0.8,
                  scale: isSelected ? 1.1 : 1
                }}
                onClick={() => setSelectedService(isSelected ? null : service.id)}
              >
                <Icon className="w-6 h-6 mb-1" />
                <div className="text-xs font-semibold text-center leading-tight">
                  {service.name.split(' ')[0]}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Service Details */}
        <AnimatePresence mode="wait">
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 bg-gray-700/50 rounded-lg"
            >
              {(() => {
                const service = services.find(s => s.id === selectedService)!;
                const Icon = service.icon;
                return (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded" style={{ backgroundColor: service.color }}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold">{service.name}</h4>
                    </div>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {service.subServices.map((sub, i) => (
                        <motion.div
                          key={sub}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-gray-800 px-3 py-2 rounded text-sm flex items-center gap-2"
                        >
                          <ChevronRight className="w-3 h-3" style={{ color: service.color }} />
                          {sub}
                        </motion.div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Global Presence Interactive Map
export function GlobalPresenceMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    {
      id: 'north-america',
      name: 'North America',
      countries: 3,
      centers: 25,
      employees: 15000,
      keyLocations: ['New York', 'San Francisco', 'Toronto', 'Mexico City'],
      color: '#3B82F6'
    },
    {
      id: 'latin-america',
      name: 'Latin America',
      countries: 5,
      centers: 12,
      employees: 20000,
      keyLocations: ['São Paulo', 'Buenos Aires', 'Bogotá', 'Santiago'],
      color: '#10B981'
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      countries: 8,
      centers: 18,
      employees: 5000,
      keyLocations: ['Manila', 'Bangalore', 'Chennai', 'Sydney'],
      color: '#F59E0B'
    },
    {
      id: 'emea',
      name: 'EMEA',
      countries: 6,
      centers: 8,
      employees: 3000,
      keyLocations: ['London', 'Paris', 'Dubai', 'Cairo'],
      color: '#EF4444'
    }
  ];

  const mapData = regions.map(region => ({
    name: region.name,
    value: region.employees,
    centers: region.centers,
    countries: region.countries
  }));

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Global Delivery Network</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Visualization */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg relative overflow-hidden">
            {/* Simplified world map representation */}
            <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Grid lines */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 100}
                  y1="0"
                  x2={i * 100}
                  y2="400"
                  stroke="#374151"
                  strokeWidth="1"
                />
              ))}
              {[...Array(4)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 100}
                  x2="800"
                  y2={i * 100}
                  stroke="#374151"
                  strokeWidth="1"
                />
              ))}
              
              {/* Regions */}
              <motion.circle
                cx="200" cy="150" r="60"
                fill="#3B82F6"
                opacity="0.6"
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedRegion('north-america')}
                style={{ cursor: 'pointer' }}
              />
              <motion.circle
                cx="250" cy="250" r="50"
                fill="#10B981"
                opacity="0.6"
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedRegion('latin-america')}
                style={{ cursor: 'pointer' }}
              />
              <motion.circle
                cx="550" cy="200" r="70"
                fill="#F59E0B"
                opacity="0.6"
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedRegion('asia-pacific')}
                style={{ cursor: 'pointer' }}
              />
              <motion.circle
                cx="450" cy="120" r="45"
                fill="#EF4444"
                opacity="0.6"
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedRegion('emea')}
                style={{ cursor: 'pointer' }}
              />
              
              {/* Labels */}
              <text x="200" y="150" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                NA
              </text>
              <text x="250" y="250" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                LATAM
              </text>
              <text x="550" y="200" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                APAC
              </text>
              <text x="450" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                EMEA
              </text>
            </svg>
            
            {/* Animated connection lines */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  style={{
                    top: `${20 + i * 20}%`,
                    width: '100%'
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Region Details */}
        <div className="space-y-4">
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedRegion === region.id
                  ? 'bg-gray-700 border-gray-500'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedRegion(region.id === selectedRegion ? null : region.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: region.color }}
                  />
                  <h4 className="text-lg font-semibold">{region.name}</h4>
                </div>
                <ChevronRight 
                  className={`w-5 h-5 transition-transform ${
                    selectedRegion === region.id ? 'rotate-90' : ''
                  }`}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <MapPin className="w-4 h-4 text-gray-400 mb-1" />
                  <div className="font-semibold">{region.countries}</div>
                  <div className="text-gray-400">Countries</div>
                </div>
                <div>
                  <Building2 className="w-4 h-4 text-gray-400 mb-1" />
                  <div className="font-semibold">{region.centers}</div>
                  <div className="text-gray-400">Centers</div>
                </div>
                <div>
                  <Users className="w-4 h-4 text-gray-400 mb-1" />
                  <div className="font-semibold">{(region.employees / 1000).toFixed(0)}k</div>
                  <div className="text-gray-400">Employees</div>
                </div>
              </div>

              <AnimatePresence>
                {selectedRegion === region.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <div className="font-medium mb-2">Key Locations:</div>
                      <div className="flex flex-wrap gap-2">
                        {region.keyLocations.map((location) => (
                          <span
                            key={location}
                            className="px-3 py-1 bg-gray-700 rounded text-sm"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Stats */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Globe className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold">144+</div>
          <div className="text-sm text-gray-400">Countries Served</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Building2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold">60+</div>
          <div className="text-sm text-gray-400">Delivery Centers</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold">40k+</div>
          <div className="text-sm text-gray-400">Global Workforce</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm text-gray-400">Follow the Sun</div>
        </div>
      </div>
    </div>
  );
}

// Industry Vertical Explorer
export function IndustryVerticalExplorer() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'top' | 'emerging'>('all');

  const industries = [
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: '🏥',
      color: '#EF4444',
      metrics: { clients: 150, nps: 72, growth: '+18%' },
      specializations: ['Payer Services', 'Provider Solutions', 'Pharma Support', 'Patient Experience'],
      category: 'top'
    },
    {
      id: 'banking',
      name: 'Banking & Financial',
      icon: '🏦',
      color: '#3B82F6',
      metrics: { clients: 200, nps: 75, growth: '+22%' },
      specializations: ['Digital Banking', 'Fraud Prevention', 'Loan Processing', 'Wealth Management'],
      category: 'top'
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: '🛡️',
      color: '#10B981',
      metrics: { clients: 120, nps: 71, growth: '+15%' },
      specializations: ['Claims Processing', 'Underwriting', 'Customer Service', 'Risk Assessment'],
      category: 'top'
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      icon: '🛍️',
      color: '#F59E0B',
      metrics: { clients: 180, nps: 74, growth: '+25%' },
      specializations: ['Order Management', 'Customer Support', 'Inventory Analytics', 'Omnichannel'],
      category: 'emerging'
    },
    {
      id: 'telecom',
      name: 'Telecommunications',
      icon: '📡',
      color: '#8B5CF6',
      metrics: { clients: 90, nps: 70, growth: '+12%' },
      specializations: ['Network Support', 'Billing Services', 'Technical Support', '5G Solutions'],
      category: 'top'
    },
    {
      id: 'travel',
      name: 'Travel & Hospitality',
      icon: '✈️',
      color: '#EC4899',
      metrics: { clients: 110, nps: 73, growth: '+30%' },
      specializations: ['Booking Support', 'Loyalty Programs', 'Guest Experience', 'Revenue Management'],
      category: 'emerging'
    },
    {
      id: 'energy',
      name: 'Energy & Utilities',
      icon: '⚡',
      color: '#14B8A6',
      metrics: { clients: 80, nps: 69, growth: '+10%' },
      specializations: ['Smart Grid', 'Customer Service', 'Field Operations', 'Renewable Solutions'],
      category: 'emerging'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: '🚗',
      color: '#6366F1',
      metrics: { clients: 70, nps: 72, growth: '+20%' },
      specializations: ['Connected Cars', 'Dealer Support', 'Supply Chain', 'EV Services'],
      category: 'emerging'
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: '💻',
      color: '#84CC16',
      metrics: { clients: 160, nps: 76, growth: '+28%' },
      specializations: ['Technical Support', 'SaaS Operations', 'Developer Relations', 'Cloud Services'],
      category: 'top'
    }
  ];

  const filteredIndustries = industries.filter(ind => 
    filter === 'all' || ind.category === filter
  );

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Industry Vertical Expertise</h3>
      
      {/* Filter Controls */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded transition-colors ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          All Industries
        </button>
        <button
          onClick={() => setFilter('top')}
          className={`px-4 py-2 rounded transition-colors ${
            filter === 'top' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Top Performers
        </button>
        <button
          onClick={() => setFilter('emerging')}
          className={`px-4 py-2 rounded transition-colors ${
            filter === 'emerging' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          High Growth
        </button>
      </div>

      {/* Industry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredIndustries.map((industry, index) => (
          <motion.div
            key={industry.id}
            layoutId={industry.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-all border-2 border-gray-700 hover:border-gray-600"
            onClick={() => setSelectedIndustry(industry.id)}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{industry.icon}</div>
              <motion.div
                className="text-sm font-semibold px-2 py-1 rounded"
                style={{ backgroundColor: `${industry.color}20`, color: industry.color }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {industry.metrics.growth}
              </motion.div>
            </div>
            
            <h4 className="font-semibold mb-3">{industry.name}</h4>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-gray-400">Clients</div>
                <div className="font-semibold">{industry.metrics.clients}+</div>
              </div>
              <div>
                <div className="text-gray-400">NPS</div>
                <div className="font-semibold">{industry.metrics.nps}</div>
              </div>
              <div>
                <div className="text-gray-400">Growth</div>
                <div className="font-semibold">{industry.metrics.growth}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Industry Details - Inline instead of modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 bg-gray-900 rounded-lg p-8"
          >
              {(() => {
                const industry = industries.find(i => i.id === selectedIndustry)!;
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{industry.icon}</div>
                        <div>
                          <h3 className="text-2xl font-bold">{industry.name}</h3>
                          <p className="text-gray-400">Industry Solutions</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedIndustry(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-800 rounded p-4 text-center">
                        <div className="text-3xl font-bold" style={{ color: industry.color }}>
                          {industry.metrics.clients}+
                        </div>
                        <div className="text-sm text-gray-400">Active Clients</div>
                      </div>
                      <div className="bg-gray-800 rounded p-4 text-center">
                        <div className="text-3xl font-bold text-green-400">
                          {industry.metrics.nps}
                        </div>
                        <div className="text-sm text-gray-400">NPS Score</div>
                      </div>
                      <div className="bg-gray-800 rounded p-4 text-center">
                        <div className="text-3xl font-bold text-blue-400">
                          {industry.metrics.growth}
                        </div>
                        <div className="text-sm text-gray-400">YoY Growth</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Specialized Solutions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {industry.specializations.map((spec, i) => (
                          <motion.div
                            key={spec}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded"
                          >
                            <ChevronRight className="w-4 h-4" style={{ color: industry.color }} />
                            <span>{spec}</span>
                          </motion.div>
                        ))}
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

// Innovation Infrastructure Showcase
export function InnovationInfrastructure() {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const facilities = [
    {
      id: 'labs',
      name: 'Comcast AI Labs',
      icon: Brain,
      established: 2014,
      locations: ['San Francisco', 'Chennai', 'London'],
      focus: 'Emerging technologies and rapid prototyping',
      achievements: ['200+ prototypes', '50+ patents filed', '30% faster innovation'],
      color: 'from-purple-600 to-purple-500'
    },
    {
      id: 'acceleration',
      name: 'Digital Acceleration Centers',
      icon: Rocket,
      established: 2018,
      locations: ['New York', 'Bangalore', 'Manila'],
      focus: 'AI/ML solutions and digital transformation',
      achievements: ['500+ AI models', '75% automation rate', '40% cost reduction'],
      color: 'from-blue-600 to-blue-500'
    },
    {
      id: 'innovation',
      name: 'Innovation Hubs',
      icon: Sparkles,
      established: 2020,
      locations: ['Mexico City', 'Dubai', 'Singapore'],
      focus: 'Industry-specific solutions and co-creation',
      achievements: ['100+ client workshops', '80+ solutions deployed', '3x ROI average'],
      color: 'from-green-600 to-green-500'
    },
    {
      id: 'academy',
      name: 'AI/ML Academy',
      icon: Award,
      established: 2021,
      locations: ['Global Virtual', 'Regional Centers'],
      focus: 'Talent development and certification',
      achievements: ['10,000+ trained', '95% certification rate', '50+ courses'],
      color: 'from-orange-600 to-orange-500'
    }
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Innovation Infrastructure</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilities.map((facility, index) => {
          const Icon = facility.icon;
          const isSelected = selectedFacility === facility.id;
          
          return (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg cursor-pointer transition-all ${
                isSelected ? 'col-span-1 md:col-span-2' : ''
              }`}
              onClick={() => setSelectedFacility(isSelected ? null : facility.id)}
            >
              <div className={`bg-gradient-to-br ${facility.color} p-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{facility.name}</h4>
                      <p className="text-white/80 text-sm">Est. {facility.established}</p>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-white/60 transition-transform ${
                      isSelected ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                <p className="text-white/90 mb-4">{facility.focus}</p>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <h5 className="font-semibold text-white mb-3">Global Locations</h5>
                          <div className="space-y-2">
                            {facility.locations.map((location, i) => (
                              <div
                                key={location}
                                className="flex items-center gap-2 text-white/90"
                              >
                                <MapPin className="w-4 h-4" />
                                {location}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-white mb-3">Key Achievements</h5>
                          <div className="space-y-2">
                            {facility.achievements.map((achievement, i) => (
                              <div
                                key={achievement}
                                className="flex items-center gap-2 text-white/90"
                              >
                                <Award className="w-4 h-4" />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Background decoration */}
                <motion.div
                  className="absolute -right-8 -bottom-8 opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <Icon className="w-40 h-40 text-white" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}