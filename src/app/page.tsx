'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, TrendingUp, Users, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';

// Generate deterministic positions based on index
const getParticlePosition = (index: number, seed: number) => {
  const hash = (index + 1) * seed;
  return (hash % 1000) / 1000;
};

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);
  const analytics = useAnalytics();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth-token');
    setIsAuthenticated(!!token);
    
    // Enable particles after mount to avoid hydration issues
    setParticlesReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background particles */}
      {particlesReady && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const startX = getParticlePosition(i, 1920);
            const startY = getParticlePosition(i, 1080);
            const endX = getParticlePosition(i + 20, 1920);
            const endY = getParticlePosition(i + 20, 1080);
            const duration = 15 + (i % 10) * 2;
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                initial={{
                  x: startX * 1920,
                  y: startY * 1080,
                }}
                animate={{
                  x: endX * 1920,
                  y: endY * 1080,
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 font-semibold tracking-wider">COMCAST DATA & AI TRANSFORMATION</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Data & AI Leadership Vision
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transforming Comcast into a data-driven powerhouse. Unlocking $2B+ in new revenue streams 
              through unified data platforms, AI at scale, and cultural transformation.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {isAuthenticated ? (
                <>
                  <Link href="/report">
                    <motion.button
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      onClick={() => analytics.trackClick('Access Report', {
                        location: 'hero',
                        authenticated: true
                      })}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View the Report
                        <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </Link>
                  
                  <button
                    onClick={() => {
                      localStorage.removeItem('auth-token');
                      localStorage.removeItem('user');
                      setIsAuthenticated(false);
                    }}
                    className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <motion.button
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      onClick={() => analytics.trackClick('Register CTA', {
                        location: 'hero',
                        authenticated: false
                      })}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Access the Full Report
                        <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </Link>
                  
                  <Link href="/signin">
                    <motion.button
                      className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[
                { icon: Zap, value: '$2B+', label: 'New Revenue Target' },
                { icon: TrendingUp, value: '30%', label: 'Cost Reduction' },
                { icon: Users, value: '32M+', label: 'Subscribers' },
                { icon: Sparkles, value: '100TB+', label: 'Daily Data Processing' },
              ].map((metric, i) => (
                <div key={i} className="text-center">
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-3xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
            <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* Preview Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">What's Inside</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Unified Data Platform',
                  description: 'Build the Comcast Intelligence Platform (CIP) to unify fragmented data assets across all business units into a single source of truth.',
                  quote: '"Processing 100TB+ daily with sub-second latency across 50,000 edge nodes."'
                },
                {
                  title: 'AI-First Transformation',
                  description: 'Deploy 20+ high-impact AI use cases across customer experience, network operations, and content creation.',
                  quote: '"$500M in quick wins within 18 months, scaling to $2B+ annually."'
                },
                {
                  title: 'Proven Leadership',
                  description: 'Leverage my experience building Cognizant\'s ISG from $0 to $200M, leading 400 professionals in AI transformation.',
                  quote: '"Building a 600-person AI Center of Excellence and upskilling 5,000 employees."'
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <blockquote className="text-sm italic text-gray-400 border-l-2 border-blue-400 pl-4">
                    {item.quote}
                  </blockquote>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
          <h2 className="text-3xl font-bold mb-4">Ready to Lead Comcast's AI Revolution?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore the comprehensive strategy to transform Comcast into the industry's first truly intelligent network company.
          </p>
          <Link href="/register">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register for Access
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>
            &copy; 2025 Tiran Dagan -{' '}
            <a 
              href="https://signalsphere.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              SignalSphere.net
            </a>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}