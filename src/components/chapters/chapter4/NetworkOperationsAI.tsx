'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Zap, Battery, AlertTriangle, CheckCircle, Cpu, Wifi } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NetworkMetric {
  time: string;
  health: number;
  incidents: number;
  capacity: number;
  energy: number;
}

const generateRealtimeData = (): NetworkMetric[] => {
  const data: NetworkMetric[] = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      health: 95 + Math.random() * 5,
      incidents: Math.max(0, Math.floor(Math.random() * 10 - 5)),
      capacity: 70 + Math.random() * 20,
      energy: 80 - Math.random() * 15
    });
  }
  return data;
};

interface AICapability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: { label: string; value: string; trend: 'up' | 'down' }[];
  status: 'active' | 'learning' | 'optimizing';
}

const capabilities: AICapability[] = [
  {
    id: 'self-healing',
    title: 'Self-Healing Networks',
    description: 'Autonomous detection and resolution of network issues',
    icon: <Shield className="w-6 h-6" />,
    metrics: [
      { label: 'Uptime', value: '99.99%', trend: 'up' },
      { label: 'MTTR', value: '12min', trend: 'down' },
      { label: 'Auto-Fixed', value: '94%', trend: 'up' }
    ],
    status: 'active'
  },
  {
    id: 'predictive',
    title: 'Predictive Maintenance',
    description: 'AI predicts equipment failures before they occur',
    icon: <AlertTriangle className="w-6 h-6" />,
    metrics: [
      { label: 'Accuracy', value: '92%', trend: 'up' },
      { label: 'Prevented', value: '847', trend: 'up' },
      { label: 'Savings', value: '$4.2M', trend: 'up' }
    ],
    status: 'optimizing'
  },
  {
    id: 'capacity',
    title: 'Dynamic Capacity',
    description: 'Real-time resource allocation based on demand',
    icon: <Cpu className="w-6 h-6" />,
    metrics: [
      { label: 'Utilization', value: '78%', trend: 'up' },
      { label: 'Peak Handling', value: '100%', trend: 'up' },
      { label: 'Cost/GB', value: '$0.02', trend: 'down' }
    ],
    status: 'active'
  },
  {
    id: 'energy',
    title: 'Energy Optimization',
    description: 'AI-driven power management across infrastructure',
    icon: <Battery className="w-6 h-6" />,
    metrics: [
      { label: 'Reduction', value: '23%', trend: 'down' },
      { label: 'Savings', value: '$12M', trend: 'up' },
      { label: 'Carbon', value: '-15K t', trend: 'down' }
    ],
    status: 'learning'
  }
];

export function NetworkOperationsAI() {
  const [networkData, setNetworkData] = useState<NetworkMetric[]>(generateRealtimeData());
  const [selectedCapability, setSelectedCapability] = useState<AICapability | null>(null);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setNetworkData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastTime = new Date();
        newData.push({
          time: lastTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          health: 95 + Math.random() * 5,
          incidents: Math.max(0, Math.floor(Math.random() * 10 - 5)),
          capacity: 70 + Math.random() * 20,
          energy: 80 - Math.random() * 15
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const currentHealth = networkData[networkData.length - 1]?.health || 0;
  const currentIncidents = networkData.reduce((sum, d) => sum + d.incidents, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI-Powered Network Operations</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Real-time network optimization through advanced AI, ensuring unprecedented reliability and efficiency
        </p>
      </div>

      {/* Live Network Status */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Network Health
          </h3>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isLive 
                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
            }`}
          >
            {isLive ? '● LIVE' : '◼ PAUSED'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Network Health</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{currentHealth.toFixed(1)}%</p>
            <p className="text-sm text-gray-400">Optimal Performance</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Active Incidents</span>
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">{currentIncidents}</p>
            <p className="text-sm text-gray-400">94% Auto-Resolved</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Energy Efficiency</span>
              <Battery className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400">-23%</p>
            <p className="text-sm text-gray-400">Power Consumption</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={networkData}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="capacityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="health"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#healthGradient)"
              name="Network Health %"
            />
            <Area
              type="monotone"
              dataKey="capacity"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#capacityGradient)"
              name="Capacity Utilization %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AI Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilities.map((capability, index) => (
          <motion.div
            key={capability.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer hover:border-white/40 transition-all"
            onClick={() => setSelectedCapability(capability)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${
                  capability.status === 'active' ? 'bg-green-500/20' :
                  capability.status === 'learning' ? 'bg-yellow-500/20' :
                  'bg-blue-500/20'
                }`}>
                  {capability.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    capability.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    capability.status === 'learning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {capability.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">{capability.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {capability.metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                    {metric.value}
                    {metric.trend === 'up' ? (
                      <span className="text-green-400 text-xs">↑</span>
                    ) : (
                      <span className="text-blue-400 text-xs">↓</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Network Optimization Visualization */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">AI Impact on Network Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 text-center"
          >
            <Wifi className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">99.99%</p>
            <p className="text-sm text-gray-300">Network Uptime</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 text-center"
          >
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">60%</p>
            <p className="text-sm text-gray-300">Faster Issue Resolution</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 text-center"
          >
            <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">80%</p>
            <p className="text-sm text-gray-300">Fewer Outages</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 text-center"
          >
            <Battery className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">$12M</p>
            <p className="text-sm text-gray-300">Annual Energy Savings</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}