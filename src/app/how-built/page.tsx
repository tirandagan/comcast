'use client';

import { motion } from 'framer-motion';
import { Code, Clock, Zap, Database, Cloud, Package, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HowBuiltPage() {
  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Supabase Database",
      description: "PostgreSQL database with real-time subscriptions and built-in authentication"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Next.js 15 Framework",
      description: "React-based framework with server components and API routes for optimal performance"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Render.com Deployment",
      description: "Automated deployments with zero-downtime updates and SSL certificates"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Framer Motion",
      description: "Smooth animations and interactive transitions throughout the site"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "TypeScript",
      description: "Type-safe development with enhanced IDE support and error prevention"
    }
  ];

  const timeline = [
    {
      phase: "Initial Setup",
      duration: "15 minutes",
      tasks: [
        "Project initialization with Next.js",
        "Database schema design",
        "Authentication system setup",
        "Basic routing structure"
      ]
    },
    {
      phase: "Content Migration",
      duration: "30 minutes",
      tasks: [
        "Markdown report processing",
        "Interactive component creation",
        "Data visualization setup",
        "Chapter organization"
      ]
    },
    {
      phase: "UI Development",
      duration: "45 minutes",
      tasks: [
        "Responsive layout design",
        "Animation implementation",
        "Interactive charts creation",
        "Navigation system"
      ]
    },
    {
      phase: "Deployment & Polish",
      duration: "30 minutes",
      tasks: [
        "Production deployment",
        "Performance optimization",
        "Security configuration",
        "Final testing"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Back Button */}
        <Link href="/report">
          <motion.button
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Report
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            How This Site Was Built
          </h1>
          <div className="flex items-center justify-center gap-2 text-2xl text-gray-300">
            <Clock className="w-8 h-8 text-blue-400" />
            <span>From concept to deployment in</span>
            <span className="font-bold text-blue-400">under 2 hours</span>
          </div>
        </motion.div>

        {/* The Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">The Challenge</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Transform a comprehensive 50+ page strategic report on Comcast's Data & AI transformation into an 
              interactive, secure, and visually stunning web experience that executives could access and navigate 
              with ease.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">50+</div>
                <div className="text-gray-400">Pages of Content</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">6</div>
                <div className="text-gray-400">Interactive Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">20+</div>
                <div className="text-gray-400">Data Visualizations</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="text-blue-400">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Development Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Development Timeline</h2>
          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{phase.phase}</h3>
                  <span className="text-blue-400 font-semibold">{phase.duration}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Security & Access Control</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Admin approval workflow for user registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Magic link authentication for passwordless access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Role-based access control with admin dashboard</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-400">User Experience</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Interactive data visualizations with real-time updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Smooth animations and transitions throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Fully responsive design for all devices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Result */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-6">The Result</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A production-ready, secure, and visually stunning microsite that transforms a static report into 
              an interactive experience. Built with modern web technologies and deployed to the cloud in under 
              2 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span>Mobile Responsive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}