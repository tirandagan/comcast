'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Wifi, Users, Film, Building2, 
  ArrowRight, Zap, Database, Brain, BarChart3,
  Play, Pause, RotateCcw, Info
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  icon: any;
  color: string;
  volume: string;
  frequency: string;
  examples: string[];
}

interface DataFlow {
  id: string;
  from: string;
  to: string;
  label: string;
  speed: number; // Animation duration in seconds
}

const dataSources: DataSource[] = [
  {
    id: 'network',
    name: 'Network Data',
    icon: Wifi,
    color: 'from-blue-600 to-blue-500',
    volume: '40TB/day',
    frequency: 'Real-time',
    examples: ['Network telemetry', 'Service quality metrics', 'Infrastructure logs'],
  },
  {
    id: 'customer',
    name: 'Customer Data',
    icon: Users,
    color: 'from-purple-600 to-purple-500',
    volume: '25TB/day',
    frequency: 'Continuous',
    examples: ['Viewing patterns', 'Service interactions', 'Device usage'],
  },
  {
    id: 'content',
    name: 'Content & Media',
    icon: Film,
    color: 'from-green-600 to-green-500',
    volume: '30TB/day',
    frequency: 'Batch + Stream',
    examples: ['Video analytics', 'Content metadata', 'Performance metrics'],
  },
  {
    id: 'business',
    name: 'Business Systems',
    icon: Building2,
    color: 'from-orange-600 to-orange-500',
    volume: '5TB/day',
    frequency: 'Hourly',
    examples: ['CRM data', 'Billing systems', 'Support tickets'],
  },
];

const dataFlows: DataFlow[] = [
  { id: 'f1', from: 'network', to: 'ingestion', label: 'Stream', speed: 2 },
  { id: 'f2', from: 'customer', to: 'ingestion', label: 'Events', speed: 2.5 },
  { id: 'f3', from: 'content', to: 'ingestion', label: 'Mixed', speed: 3 },
  { id: 'f4', from: 'business', to: 'ingestion', label: 'Batch', speed: 3.5 },
  { id: 'f5', from: 'ingestion', to: 'processing', label: 'Process', speed: 2 },
  { id: 'f6', from: 'processing', to: 'insights', label: 'Analyze', speed: 2.5 },
];

export function DataFlowVisualization() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  // Restart animation
  const restartAnimation = () => {
    setAnimationKey(prev => prev + 1);
    setIsPlaying(true);
  };

  // Data particles animation
  const DataParticle = ({ flow }: { flow: DataFlow }) => {
    if (!isPlaying) return null;

    return (
      <motion.div
        key={`${flow.id}-${animationKey}`}
        className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.5],
        }}
        transition={{
          duration: flow.speed,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    );
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Real-Time Data Flow Architecture</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={restartAnimation}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="bg-gray-900 rounded-lg p-8 relative overflow-hidden">
        {/* Data Sources */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {dataSources.map((source, index) => {
            const Icon = source.icon;
            const isSelected = selectedSource === source.id;

            return (
              <motion.div
                key={source.id}
                className={`relative bg-gradient-to-br ${source.color} rounded-lg p-4 cursor-pointer ${
                  isSelected ? 'ring-2 ring-white' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedSource(isSelected ? null : source.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white">{source.name}</h4>
                </div>
                <div className="text-white/80 text-sm">
                  <p className="font-semibold">{source.volume}</p>
                  <p className="text-xs">{source.frequency}</p>
                </div>

                {/* Animated flow lines */}
                {isPlaying && (
                  <motion.div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-0.5 h-16 bg-gradient-to-b from-white to-transparent"
                      animate={{ scaleY: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Processing Pipeline */}
        <div className="relative">
          {/* Ingestion Layer */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 mb-8 relative"
            onMouseEnter={() => setHoveredStage('ingestion')}
            onMouseLeave={() => setHoveredStage(null)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Data Ingestion Layer</h4>
                  <p className="text-gray-400">Unified ingestion & validation</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">100TB+</div>
                <div className="text-sm text-gray-400">Daily Ingestion</div>
              </div>
            </div>

            {hoveredStage === 'ingestion' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-gray-900 rounded-lg p-4 border border-gray-700 z-10"
              >
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Technologies</p>
                    <p>Kafka, Kinesis, Pub/Sub</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Processing</p>
                    <p>5M events/sec</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Latency</p>
                    <p className="text-green-400">&lt;100ms</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Flow indicator */}
            {isPlaying && (
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
              </motion.div>
            )}
          </motion.div>

          {/* Processing Layer */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 mb-8 relative"
            onMouseEnter={() => setHoveredStage('processing')}
            onMouseLeave={() => setHoveredStage(null)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Real-Time Processing</h4>
                  <p className="text-gray-400">Stream & batch processing</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-400">50ms</div>
                <div className="text-sm text-gray-400">Avg. Latency</div>
              </div>
            </div>

            {hoveredStage === 'processing' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-gray-900 rounded-lg p-4 border border-gray-700 z-10"
              >
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Engines</p>
                    <p>Spark, Flink, Dataflow</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Throughput</p>
                    <p>1M records/sec</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Accuracy</p>
                    <p className="text-green-400">99.9%</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Flow indicator */}
            {isPlaying && (
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <ArrowRight className="w-6 h-6 text-purple-400 rotate-90" />
              </motion.div>
            )}
          </motion.div>

          {/* AI/Analytics Layer */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 relative"
            onMouseEnter={() => setHoveredStage('analytics')}
            onMouseLeave={() => setHoveredStage(null)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">AI & Analytics Engine</h4>
                  <p className="text-gray-400">ML models & insights generation</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">200+</div>
                <div className="text-sm text-gray-400">Active Models</div>
              </div>
            </div>

            {hoveredStage === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-gray-900 rounded-lg p-4 border border-gray-700 z-10"
              >
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">AI/ML Stack</p>
                    <p>TensorFlow, PyTorch, XGBoost</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Predictions</p>
                    <p>100M/day</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Accuracy</p>
                    <p className="text-green-400">94%+</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Animated particles */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  y: '100%',
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Selected Source Details */}
      <AnimatePresence>
        {selectedSource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 bg-gray-800 rounded-lg p-6"
          >
            {(() => {
              const source = dataSources.find(s => s.id === selectedSource);
              if (!source) return null;
              const Icon = source.icon;

              return (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-gradient-to-br ${source.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold">{source.name} Details</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 mb-1">Daily Volume</p>
                      <p className="text-lg font-semibold">{source.volume}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Update Frequency</p>
                      <p className="text-lg font-semibold">{source.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Example Data Types</p>
                      <ul className="text-sm space-y-1">
                        {source.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-xl font-bold">5M/sec</div>
          <div className="text-sm text-gray-400">Event Processing</div>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Database className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <div className="text-xl font-bold">100TB</div>
          <div className="text-sm text-gray-400">Daily Volume</div>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <div className="text-xl font-bold">&lt;100ms</div>
          <div className="text-sm text-gray-400">E2E Latency</div>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-xl font-bold">99.9%</div>
          <div className="text-sm text-gray-400">Uptime SLA</div>
        </motion.div>
      </div>
    </div>
  );
}