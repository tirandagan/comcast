'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Cloud, Brain, Settings, TrendingUp, 
  Shield, Zap, Globe, BarChart3, Cpu,
  HeadphonesIcon, MessageSquare, Phone, Mail,
  CreditCard, FileText, Database, Lock,
  Heart, Stethoscope, Pill, Building2,
  ShoppingCart, Package, Truck, Store
} from 'lucide-react';

interface ServiceCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  services: {
    name: string;
    icon: any;
    description: string;
  }[];
  stats: {
    clients: string;
    satisfaction: string;
    efficiency: string;
  };
}

export function ServicePortfolioChart() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const categories: ServiceCategory[] = [
    {
      id: 'customer-experience',
      name: 'Customer Experience',
      icon: Users,
      color: '#3B82F6',
      description: 'End-to-end customer journey optimization across all touchpoints',
      services: [
        { name: 'Contact Center', icon: HeadphonesIcon, description: 'Omnichannel support across voice, chat, email' },
        { name: 'Customer Service', icon: MessageSquare, description: '24/7 multilingual customer support' },
        { name: 'Technical Support', icon: Settings, description: 'Expert technical assistance and troubleshooting' },
        { name: 'Sales & Retention', icon: TrendingUp, description: 'Proactive sales and customer retention programs' }
      ],
      stats: {
        clients: '500+',
        satisfaction: '92%',
        efficiency: '+35%'
      }
    },
    {
      id: 'digital-operations',
      name: 'Digital Operations',
      icon: Cloud,
      color: '#10B981',
      description: 'AI-powered automation and digital transformation services',
      services: [
        { name: 'Process Automation', icon: Zap, description: 'RPA and intelligent automation solutions' },
        { name: 'Data Analytics', icon: BarChart3, description: 'Advanced analytics and business intelligence' },
        { name: 'Cloud Services', icon: Cloud, description: 'Cloud migration and management' },
        { name: 'AI Solutions', icon: Brain, description: 'Custom AI/ML model development' }
      ],
      stats: {
        clients: '300+',
        satisfaction: '94%',
        efficiency: '+50%'
      }
    },
    {
      id: 'business-process',
      name: 'Business Process',
      icon: Settings,
      color: '#F59E0B',
      description: 'Core business process management and optimization',
      services: [
        { name: 'Finance & Accounting', icon: CreditCard, description: 'End-to-end F&A services' },
        { name: 'HR Operations', icon: Users, description: 'Complete HR lifecycle management' },
        { name: 'Supply Chain', icon: Truck, description: 'Supply chain optimization' },
        { name: 'Procurement', icon: Package, description: 'Strategic sourcing and procurement' }
      ],
      stats: {
        clients: '400+',
        satisfaction: '91%',
        efficiency: '+40%'
      }
    },
    {
      id: 'industry-solutions',
      name: 'Industry Solutions',
      icon: Building2,
      color: '#EF4444',
      description: 'Specialized solutions for key industry verticals',
      services: [
        { name: 'Healthcare', icon: Heart, description: 'Payer, provider, and pharma solutions' },
        { name: 'Banking & Finance', icon: CreditCard, description: 'Digital banking and fintech services' },
        { name: 'Retail & E-commerce', icon: ShoppingCart, description: 'Omnichannel retail solutions' },
        { name: 'Insurance', icon: Shield, description: 'Claims, underwriting, and policy services' }
      ],
      stats: {
        clients: '600+',
        satisfaction: '93%',
        efficiency: '+45%'
      }
    }
  ];

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="my-12">
      <h3 className="text-3xl font-bold text-center mb-8">Service Portfolio Architecture</h3>
      
      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.div
              key={category.id}
              className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                  : 'bg-gray-800 hover:bg-gray-750'
              }`}
              style={{
                boxShadow: isSelected ? `0 0 0 2px ${category.color}` : 'none',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${category.color}, transparent)`,
                }}
                animate={{
                  opacity: isSelected ? 0.3 : 0.1
                }}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: category.color }} />
                  </div>
                  <motion.div
                    animate={{ rotate: isSelected ? 180 : 0 }}
                    className="text-gray-400"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </motion.div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2">{category.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{category.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-bold text-white">{category.stats.clients}</div>
                    <div className="text-gray-500">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: category.color }}>{category.stats.satisfaction}</div>
                    <div className="text-gray-500">CSAT</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-400">{category.stats.efficiency}</div>
                    <div className="text-gray-500">Efficiency</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Services View */}
      <AnimatePresence mode="wait">
        {selectedCategoryData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div 
              className="rounded-xl p-8 mb-8"
              style={{ 
                backgroundColor: selectedCategoryData.color + '10',
                borderColor: selectedCategoryData.color + '40',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <h4 className="text-2xl font-bold mb-6 text-white">
                {selectedCategoryData.name} Services
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedCategoryData.services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  const isHovered = hoveredService === `${selectedCategoryData.id}-${index}`;
                  
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/80 backdrop-blur rounded-lg p-4 cursor-pointer"
                      onMouseEnter={() => setHoveredService(`${selectedCategoryData.id}-${index}`)}
                      onMouseLeave={() => setHoveredService(null)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="p-2 rounded-lg flex-shrink-0"
                          style={{ 
                            backgroundColor: isHovered ? selectedCategoryData.color + '30' : selectedCategoryData.color + '20',
                            transition: 'background-color 0.3s'
                          }}
                        >
                          <ServiceIcon 
                            className="w-5 h-5" 
                            style={{ color: selectedCategoryData.color }} 
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-white mb-1">{service.name}</h5>
                          <p className="text-xs text-gray-400">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Interactive Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id={`gradient-${selectedCategoryData.id}`}>
                    <stop offset="0%" stopColor={selectedCategoryData.color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={selectedCategoryData.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central Integration Hub */}
      <div className="text-center mt-8">
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 40px rgba(59, 130, 246, 0.3)',
              '0 0 20px rgba(59, 130, 246, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Cpu className="w-5 h-5" />
          <span>Sutherland 360° Integrated Platform</span>
        </motion.div>
        <p className="text-sm text-gray-400 mt-2">
          All services powered by AI, automation, and real-time analytics
        </p>
      </div>
    </div>
  );
}