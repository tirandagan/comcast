'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Database, Cloud, Sparkles, Package, Shield, FileText } from 'lucide-react';
import { ReleaseNotesModal } from './ReleaseNotesModal';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [releaseNotesOpen, setReleaseNotesOpen] = useState(false);
  
  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">About This Microsite</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Developer Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Created By</h3>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">Tiran Dagan</p>
                <p className="text-gray-300 text-sm mb-2">
                  Enterprise AI Strategy & Digital Transformation Leader
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">
                    <span className="text-gray-500">Email:</span>{' '}
                    <a href="mailto:tiran@tirandagan.com" className="text-blue-400 hover:text-blue-300">
                      tiran@tirandagan.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="text-gray-500">Phone:</span>{' '}
                    <a href="tel:9088732425" className="text-blue-400 hover:text-blue-300">
                      (908) 873-2425
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Technology Stack</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                  <Code className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Next.js 15</p>
                    <p className="text-xs text-gray-400">React Framework</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                  <Database className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Supabase</p>
                    <p className="text-xs text-gray-400">PostgreSQL Database</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                  <Cloud className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Render.com</p>
                    <p className="text-xs text-gray-400">Cloud Hosting</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                  <Package className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm font-medium text-white">TypeScript</p>
                    <p className="text-xs text-gray-400">Type Safety</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Framer Motion</p>
                    <p className="text-xs text-gray-400">Animations</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm font-medium text-white">JWT Auth</p>
                    <p className="text-xs text-gray-400">Secure Access</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300 leading-relaxed">
                This interactive microsite transforms a comprehensive 50+ page strategic report into an 
                engaging web experience. Built in under 2 hours, it features secure authentication, 
                real-time data visualizations, and responsive design optimized for executive audiences.
              </p>
            </div>

            {/* Release Notes Button */}
            <div className="mb-6">
              <button
                onClick={() => setReleaseNotesOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5" />
                View Release Notes
              </button>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Copyright © {new Date().getFullYear()} Tiran Dagan. All rights reserved.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
      
      {/* Release Notes Modal */}
      <ReleaseNotesModal isOpen={releaseNotesOpen} onClose={() => setReleaseNotesOpen(false)} />
    </>
  );
}