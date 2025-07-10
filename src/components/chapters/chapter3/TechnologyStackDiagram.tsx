'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, Database, Brain, BarChart3, Shield, 
  ChevronRight, ExternalLink, Star, TrendingUp,
  Layers, Cpu, Network, Lock, X
} from 'lucide-react';

interface Technology {
  id: string;
  name: string;
  logo?: string;
  description: string;
  category: string;
  features: string[];
  useCase: string;
  maturity: 'emerging' | 'growth' | 'mature';
}

interface TechCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  technologies: Technology[];
}

const techCategories: TechCategory[] = [
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    icon: Cloud,
    color: 'from-blue-600 to-blue-500',
    description: 'Multi-cloud foundation for scalability and resilience',
    technologies: [
      {
        id: 'aws',
        name: 'Amazon Web Services',
        description: 'Primary cloud platform for compute, storage, and AI/ML services',
        category: 'cloud',
        features: ['EC2, S3, SageMaker', 'Lambda, Kinesis', 'Redshift, Athena'],
        useCase: 'Core infrastructure and ML platform',
        maturity: 'mature',
      },
      {
        id: 'azure',
        name: 'Microsoft Azure',
        description: 'Secondary cloud for enterprise integration and AI services',
        category: 'cloud',
        features: ['Azure ML', 'Synapse Analytics', 'Cognitive Services'],
        useCase: 'Enterprise AI and analytics',
        maturity: 'mature',
      },
      {
        id: 'gcp',
        name: 'Google Cloud Platform',
        description: 'Specialized for BigQuery and advanced ML capabilities',
        category: 'cloud',
        features: ['BigQuery', 'Vertex AI', 'Dataflow'],
        useCase: 'Data warehouse and ML ops',
        maturity: 'growth',
      },
    ],
  },
  {
    id: 'data-processing',
    name: 'Data Processing',
    icon: Database,
    color: 'from-purple-600 to-purple-500',
    description: 'High-performance engines for batch and stream processing',
    technologies: [
      {
        id: 'spark',
        name: 'Apache Spark',
        description: 'Unified analytics engine for large-scale data processing',
        category: 'data-processing',
        features: ['In-memory processing', 'ML libraries', 'Stream processing'],
        useCase: 'ETL and feature engineering',
        maturity: 'mature',
      },
      {
        id: 'kafka',
        name: 'Apache Kafka',
        description: 'Distributed event streaming platform',
        category: 'data-processing',
        features: ['5M events/sec', 'Exactly-once delivery', 'Schema registry'],
        useCase: 'Real-time data ingestion',
        maturity: 'mature',
      },
      {
        id: 'flink',
        name: 'Apache Flink',
        description: 'Stateful computations over data streams',
        category: 'data-processing',
        features: ['Low latency', 'Event time processing', 'Fault tolerance'],
        useCase: 'Complex event processing',
        maturity: 'growth',
      },
      {
        id: 'airflow',
        name: 'Apache Airflow',
        description: 'Workflow orchestration platform',
        category: 'data-processing',
        features: ['DAG management', 'Scheduling', 'Monitoring'],
        useCase: 'Pipeline orchestration',
        maturity: 'mature',
      },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI/ML Frameworks',
    icon: Brain,
    color: 'from-green-600 to-green-500',
    description: 'Cutting-edge AI and machine learning platforms',
    technologies: [
      {
        id: 'tensorflow',
        name: 'TensorFlow',
        description: 'Open-source ML framework for production deployment',
        category: 'ai-ml',
        features: ['TensorFlow Serving', 'TFX pipelines', 'Edge deployment'],
        useCase: 'Deep learning models',
        maturity: 'mature',
      },
      {
        id: 'pytorch',
        name: 'PyTorch',
        description: 'Research-friendly deep learning framework',
        category: 'ai-ml',
        features: ['Dynamic graphs', 'TorchServe', 'Mobile support'],
        useCase: 'Model experimentation',
        maturity: 'growth',
      },
      {
        id: 'huggingface',
        name: 'Hugging Face',
        description: 'Platform for NLP and foundation models',
        category: 'ai-ml',
        features: ['Model hub', 'Transformers', 'Datasets'],
        useCase: 'LLM deployment',
        maturity: 'growth',
      },
      {
        id: 'mlflow',
        name: 'MLflow',
        description: 'ML lifecycle management platform',
        category: 'ai-ml',
        features: ['Experiment tracking', 'Model registry', 'Deployment'],
        useCase: 'MLOps automation',
        maturity: 'growth',
      },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics Platforms',
    icon: BarChart3,
    color: 'from-orange-600 to-orange-500',
    description: 'Enterprise analytics and business intelligence tools',
    technologies: [
      {
        id: 'databricks',
        name: 'Databricks',
        description: 'Unified analytics platform for data and AI',
        category: 'analytics',
        features: ['Delta Lake', 'AutoML', 'SQL Analytics'],
        useCase: 'Lakehouse architecture',
        maturity: 'mature',
      },
      {
        id: 'snowflake',
        name: 'Snowflake',
        description: 'Cloud-native data warehouse',
        category: 'analytics',
        features: ['Zero-copy cloning', 'Data sharing', 'Time travel'],
        useCase: 'Enterprise data warehouse',
        maturity: 'mature',
      },
      {
        id: 'tableau',
        name: 'Tableau',
        description: 'Visual analytics platform',
        category: 'analytics',
        features: ['Self-service BI', 'Real-time dashboards', 'Mobile'],
        useCase: 'Business intelligence',
        maturity: 'mature',
      },
      {
        id: 'grafana',
        name: 'Grafana',
        description: 'Observability and monitoring platform',
        category: 'analytics',
        features: ['Custom dashboards', 'Alerting', 'Multi-source'],
        useCase: 'Operational analytics',
        maturity: 'mature',
      },
    ],
  },
  {
    id: 'governance',
    name: 'Governance & Security',
    icon: Shield,
    color: 'from-red-600 to-red-500',
    description: 'Data governance, security, and compliance tools',
    technologies: [
      {
        id: 'collibra',
        name: 'Collibra',
        description: 'Data governance and catalog platform',
        category: 'governance',
        features: ['Data lineage', 'Business glossary', 'Policy management'],
        useCase: 'Enterprise data governance',
        maturity: 'mature',
      },
      {
        id: 'privacera',
        name: 'Privacera',
        description: 'Data privacy and access governance',
        category: 'governance',
        features: ['Fine-grained access', 'Data masking', 'Compliance'],
        useCase: 'Privacy compliance',
        maturity: 'growth',
      },
      {
        id: 'ranger',
        name: 'Apache Ranger',
        description: 'Comprehensive security framework',
        category: 'governance',
        features: ['RBAC/ABAC', 'Audit logs', 'Encryption'],
        useCase: 'Access control',
        maturity: 'mature',
      },
    ],
  },
];

export function TechnologyStackDiagram() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'stack'>('grid');

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'emerging': return 'text-yellow-400';
      case 'growth': return 'text-blue-400';
      case 'mature': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getMaturityLabel = (maturity: string) => {
    switch (maturity) {
      case 'emerging': return 'Emerging';
      case 'growth': return 'Growth';
      case 'mature': return 'Mature';
      default: return 'Unknown';
    }
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Technology Stack Architecture</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('stack')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'stack' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Network className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <motion.div
                key={category.id}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              >
                <div className={`bg-gradient-to-br ${category.color} p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white">{category.name}</h4>
                  </div>
                  <p className="text-white/80 text-sm mt-2">{category.description}</p>
                </div>
                
                <div className="p-4">
                  <div className="space-y-2">
                    {category.technologies.slice(0, 3).map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-center justify-between text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTech(tech);
                        }}
                      >
                        <span className="hover:text-blue-400 transition-colors">
                          {tech.name}
                        </span>
                        <span className={getMaturityColor(tech.maturity)}>
                          •
                        </span>
                      </div>
                    ))}
                    {category.technologies.length > 3 && (
                      <div className="text-sm text-gray-400">
                        +{category.technologies.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Stack View
        <div className="bg-gray-900 rounded-lg p-6">
          {techCategories.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                className="mb-6 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-gradient-to-br ${category.color} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold">{category.name}</h4>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.id}
                      className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                      onClick={() => setSelectedTech(tech)}
                    >
                      <div className="flex items-start justify-between">
                        <h5 className="text-sm font-semibold">{tech.name}</h5>
                        <span className={`text-xs ${getMaturityColor(tech.maturity)}`}>
                          •
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{tech.useCase}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Category Details */}
      <AnimatePresence>
        {selectedCategory && viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 bg-gray-800 rounded-lg p-6"
          >
            {(() => {
              const category = techCategories.find(c => c.id === selectedCategory);
              if (!category) return null;

              return (
                <div>
                  <h4 className="text-xl font-bold mb-4">{category.name} Technologies</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.technologies.map((tech) => (
                      <div
                        key={tech.id}
                        className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={() => setSelectedTech(tech)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold">{tech.name}</h5>
                          <span className={`text-sm ${getMaturityColor(tech.maturity)}`}>
                            {getMaturityLabel(tech.maturity)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{tech.description}</p>
                        <div className="flex items-center gap-2 text-sm text-blue-400">
                          <span>View details</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technology Details Modal */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedTech.name}</h3>
                  <p className="text-gray-400">{selectedTech.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedTech.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    Use Case
                  </h4>
                  <p className="text-sm text-gray-300 mb-4">{selectedTech.useCase}</p>

                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    Maturity Level
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${getMaturityColor(selectedTech.maturity)}`}>
                      •
                    </span>
                    <span className="text-sm">{getMaturityLabel(selectedTech.maturity)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Category: {techCategories.find(c => c.technologies.some(t => t.id === selectedTech.id))?.name}
                  </div>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <span>Learn more</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Maturity Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">•</span>
          <span className="text-gray-400">Emerging</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">•</span>
          <span className="text-gray-400">Growth</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">•</span>
          <span className="text-gray-400">Mature</span>
        </div>
      </div>
    </div>
  );
}