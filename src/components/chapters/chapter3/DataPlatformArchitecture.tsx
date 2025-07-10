'use client';

import { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  ConnectionMode,
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Cloud, Brain, Shield, Zap, Server, 
  Activity, Lock, Layers, Globe, BarChart3, Cpu,
  X, ChevronRight, Sparkles, Network
} from 'lucide-react';
import 'reactflow/dist/style.css';

// Custom node component
const ArchitectureNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative bg-gradient-to-br ${data.gradient} rounded-lg p-4 shadow-lg border-2 ${
        data.selected ? 'border-white' : 'border-transparent'
      }`}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: data.width || 200, minHeight: 80 }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
      
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm">{data.label}</h3>
          {data.sublabel && (
            <p className="text-white/80 text-xs mt-1">{data.sublabel}</p>
          )}
        </div>
      </div>

      {isHovered && data.metrics && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-lg p-3 shadow-xl border border-gray-700 z-50 w-64"
        >
          <div className="space-y-2">
            {data.metrics.map((metric: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-400">{metric.label}</span>
                <span className="font-semibold text-white">{metric.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const nodeTypes = {
  architecture: ArchitectureNode,
};

export function DataPlatformArchitecture() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const initialNodes: Node[] = [
    // Data Ingestion Layer
    {
      id: 'ingestion-1',
      type: 'architecture',
      position: { x: 50, y: 50 },
      data: {
        label: 'Real-time Streams',
        sublabel: 'Kafka, Kinesis',
        icon: Zap,
        gradient: 'from-blue-600 to-blue-500',
        metrics: [
          { label: 'Throughput', value: '5M events/sec' },
          { label: 'Latency', value: '<100ms' },
          { label: 'Sources', value: '500+ endpoints' },
        ],
      },
    },
    {
      id: 'ingestion-2',
      type: 'architecture',
      position: { x: 300, y: 50 },
      data: {
        label: 'Batch Processing',
        sublabel: 'Spark, Airflow',
        icon: Database,
        gradient: 'from-blue-600 to-blue-500',
        metrics: [
          { label: 'Daily Volume', value: '100TB+' },
          { label: 'Jobs', value: '1,200/day' },
          { label: 'SLA', value: '99.9%' },
        ],
      },
    },
    {
      id: 'ingestion-3',
      type: 'architecture',
      position: { x: 550, y: 50 },
      data: {
        label: 'APIs & Webhooks',
        sublabel: 'REST, GraphQL',
        icon: Globe,
        gradient: 'from-blue-600 to-blue-500',
        metrics: [
          { label: 'Endpoints', value: '250+' },
          { label: 'Requests', value: '50M/day' },
          { label: 'Uptime', value: '99.99%' },
        ],
      },
    },

    // Data Lake Layer
    {
      id: 'lake-raw',
      type: 'architecture',
      position: { x: 50, y: 200 },
      data: {
        label: 'Raw Zone',
        sublabel: 'Unprocessed data',
        icon: Layers,
        gradient: 'from-purple-600 to-purple-500',
        width: 150,
        metrics: [
          { label: 'Storage', value: '5PB' },
          { label: 'Retention', value: '7 years' },
          { label: 'Format', value: 'Multi-format' },
        ],
      },
    },
    {
      id: 'lake-curated',
      type: 'architecture',
      position: { x: 250, y: 200 },
      data: {
        label: 'Curated Zone',
        sublabel: 'Cleaned & validated',
        icon: Shield,
        gradient: 'from-purple-600 to-purple-500',
        width: 150,
        metrics: [
          { label: 'Quality Score', value: '98.5%' },
          { label: 'Datasets', value: '15,000+' },
          { label: 'Users', value: '5,000+' },
        ],
      },
    },
    {
      id: 'lake-enriched',
      type: 'architecture',
      position: { x: 450, y: 200 },
      data: {
        label: 'Enriched Zone',
        sublabel: 'ML-ready data',
        icon: Sparkles,
        gradient: 'from-purple-600 to-purple-500',
        width: 150,
        metrics: [
          { label: 'Features', value: '50,000+' },
          { label: 'Models', value: '200+' },
          { label: 'Refresh', value: 'Real-time' },
        ],
      },
    },

    // AI/ML Platform Layer
    {
      id: 'ml-foundation',
      type: 'architecture',
      position: { x: 50, y: 350 },
      data: {
        label: 'Foundation Models',
        sublabel: 'LLMs, Vision, Speech',
        icon: Brain,
        gradient: 'from-green-600 to-green-500',
        metrics: [
          { label: 'Models', value: '25+' },
          { label: 'Parameters', value: '175B+' },
          { label: 'Inference', value: '<50ms' },
        ],
      },
    },
    {
      id: 'ml-ops',
      type: 'architecture',
      position: { x: 300, y: 350 },
      data: {
        label: 'MLOps Platform',
        sublabel: 'Training, deployment',
        icon: Cpu,
        gradient: 'from-green-600 to-green-500',
        metrics: [
          { label: 'Experiments', value: '10k/month' },
          { label: 'Deployments', value: '500/month' },
          { label: 'A/B Tests', value: '200 active' },
        ],
      },
    },
    {
      id: 'ml-edge',
      type: 'architecture',
      position: { x: 550, y: 350 },
      data: {
        label: 'Edge AI',
        sublabel: 'Device intelligence',
        icon: Network,
        gradient: 'from-green-600 to-green-500',
        metrics: [
          { label: 'Devices', value: '10M+' },
          { label: 'Models', value: '50+' },
          { label: 'Updates', value: 'OTA' },
        ],
      },
    },

    // Data Products Layer
    {
      id: 'products-api',
      type: 'architecture',
      position: { x: 50, y: 500 },
      data: {
        label: 'Data APIs',
        sublabel: 'Self-service access',
        icon: Server,
        gradient: 'from-orange-600 to-orange-500',
        metrics: [
          { label: 'APIs', value: '150+' },
          { label: 'Consumers', value: '1,000+' },
          { label: 'SLA', value: '99.95%' },
        ],
      },
    },
    {
      id: 'products-dashboards',
      type: 'architecture',
      position: { x: 300, y: 500 },
      data: {
        label: 'Analytics Dashboards',
        sublabel: 'Business insights',
        icon: BarChart3,
        gradient: 'from-orange-600 to-orange-500',
        metrics: [
          { label: 'Dashboards', value: '500+' },
          { label: 'Users', value: '10,000+' },
          { label: 'Refresh', value: 'Real-time' },
        ],
      },
    },
    {
      id: 'products-insights',
      type: 'architecture',
      position: { x: 550, y: 500 },
      data: {
        label: 'AI Insights',
        sublabel: 'Predictive analytics',
        icon: Activity,
        gradient: 'from-orange-600 to-orange-500',
        metrics: [
          { label: 'Predictions', value: '100M/day' },
          { label: 'Accuracy', value: '94%+' },
          { label: 'Use Cases', value: '75+' },
        ],
      },
    },

    // Governance Layer (vertical)
    {
      id: 'governance',
      type: 'architecture',
      position: { x: 750, y: 250 },
      data: {
        label: 'Governance & Security',
        sublabel: 'Privacy, Quality, Compliance',
        icon: Lock,
        gradient: 'from-red-600 to-red-500',
        width: 200,
        metrics: [
          { label: 'Data Policies', value: '150+' },
          { label: 'Compliance', value: 'GDPR, CCPA' },
          { label: 'Encryption', value: 'AES-256' },
        ],
      },
    },
  ];

  const initialEdges: Edge[] = [
    // Ingestion to Lake
    { id: 'e1', source: 'ingestion-1', target: 'lake-raw', animated: true },
    { id: 'e2', source: 'ingestion-2', target: 'lake-raw', animated: true },
    { id: 'e3', source: 'ingestion-3', target: 'lake-raw', animated: true },
    
    // Lake flow
    { id: 'e4', source: 'lake-raw', target: 'lake-curated' },
    { id: 'e5', source: 'lake-curated', target: 'lake-enriched' },
    
    // Lake to ML
    { id: 'e6', source: 'lake-enriched', target: 'ml-foundation' },
    { id: 'e7', source: 'lake-enriched', target: 'ml-ops' },
    { id: 'e8', source: 'lake-enriched', target: 'ml-edge' },
    
    // ML to Products
    { id: 'e9', source: 'ml-foundation', target: 'products-api' },
    { id: 'e10', source: 'ml-ops', target: 'products-dashboards' },
    { id: 'e11', source: 'ml-edge', target: 'products-insights' },
    
    // Governance connections
    { id: 'e12', source: 'governance', target: 'lake-curated', type: 'step', style: { stroke: '#EF4444' } },
    { id: 'e13', source: 'governance', target: 'ml-ops', type: 'step', style: { stroke: '#EF4444' } },
    { id: 'e14', source: 'governance', target: 'products-api', type: 'step', style: { stroke: '#EF4444' } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setShowDetails(true);
    
    // Update nodes to show selection
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          selected: n.id === node.id,
        },
      }))
    );
  }, [setNodes]);

  const getNodeDetails = (nodeId: string) => {
    const details: Record<string, any> = {
      'ingestion-1': {
        title: 'Real-time Data Streams',
        description: 'High-throughput ingestion of streaming data from network devices, IoT sensors, and customer interactions.',
        technologies: ['Apache Kafka', 'AWS Kinesis', 'Apache Pulsar'],
        capabilities: [
          'Process 5M+ events per second',
          'Sub-100ms end-to-end latency',
          'Automatic scaling and failover',
          'Schema registry and validation',
        ],
      },
      'lake-curated': {
        title: 'Curated Data Zone',
        description: 'Enterprise-grade data warehouse with cleaned, validated, and business-ready datasets.',
        technologies: ['Delta Lake', 'Apache Iceberg', 'dbt'],
        capabilities: [
          'ACID transactions on data lake',
          'Time travel and versioning',
          'Automated data quality checks',
          'Business glossary integration',
        ],
      },
      'ml-foundation': {
        title: 'Foundation AI Models',
        description: 'Pre-trained and custom large language models, computer vision, and multimodal AI capabilities.',
        technologies: ['GPT-4', 'Claude', 'Stable Diffusion', 'Custom LLMs'],
        capabilities: [
          'Natural language understanding',
          'Computer vision for network monitoring',
          'Multimodal content analysis',
          'Fine-tuning on proprietary data',
        ],
      },
      'governance': {
        title: 'Data Governance & Security',
        description: 'Comprehensive framework ensuring data privacy, security, quality, and regulatory compliance.',
        technologies: ['Collibra', 'Privacera', 'Apache Ranger'],
        capabilities: [
          'Automated PII detection and masking',
          'Role-based access control (RBAC)',
          'Data lineage and impact analysis',
          'GDPR/CCPA compliance automation',
        ],
      },
    };

    return details[nodeId] || null;
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Unified Data Platform Architecture</h3>
      
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-400">
          Interactive diagram showing Comcast's next-generation data platform. Click on any component to explore details.
        </p>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden relative" style={{ height: '650px', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.2, maxZoom: 1, includeHiddenNodes: false }}
          minZoom={0.5}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          className="bg-gray-900"
          proOptions={{ hideAttribution: true }}
          attributionPosition="bottom-left"
          panOnScroll={false}
          zoomOnScroll={false}
          preventScrolling={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background color="#374151" gap={16} />
          <Controls className="bg-gray-800 border-gray-700" />
        </ReactFlow>
      </div>

      {/* Details Panel */}
      <AnimatePresence>
        {showDetails && selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const details = getNodeDetails(selectedNode);
                if (!details) return null;

                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold">{details.title}</h3>
                      <button
                        onClick={() => setShowDetails(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <p className="text-gray-300 mb-6">{details.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-blue-400" />
                          Technologies
                        </h4>
                        <div className="space-y-2">
                          {details.technologies.map((tech: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-400" />
                              <span className="text-sm">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-green-400" />
                          Key Capabilities
                        </h4>
                        <div className="space-y-2">
                          {details.capabilities.map((cap: string, i: number) => (
                            <div key={i} className="flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold">5PB+</div>
          <div className="text-sm text-gray-400">Data Under Management</div>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <div className="text-2xl font-bold">100TB</div>
          <div className="text-sm text-gray-400">Daily Processing</div>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold">200+</div>
          <div className="text-sm text-gray-400">AI Models in Production</div>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 rounded-lg p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold">99.9%</div>
          <div className="text-sm text-gray-400">Platform Uptime</div>
        </motion.div>
      </div>
    </div>
  );
}