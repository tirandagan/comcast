'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Rocket, Bug, Zap, Star, AlertCircle } from 'lucide-react';

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const releaseNotes = [
  {
    version: '1.1.4',
    date: 'January 10, 2025',
    title: 'UI Enhancements',
    current: true,
    sections: [
      {
        title: 'UI/UX Updates',
        icon: <Package className="w-5 h-5" />,
        color: 'text-purple-400',
        items: [
          'Added Cursor IDE to technology stack in About modal',
          'Text-Only Report button now opens in new tab',
          'Improved navigation to keep microsite open'
        ]
      }
    ]
  },
  {
    version: '1.1.3',
    date: 'January 10, 2025',
    title: 'mdtohtml Final Improvements',
    sections: [
      {
        title: 'Bug Fixes',
        icon: <Bug className="w-5 h-5" />,
        color: 'text-green-400',
        items: [
          'Fixed duplicate title display: Smart removal of first H1 if it matches document title',
          'Improved heading search highlights: Better contrast with transparent backgrounds',
          'Enhanced accessibility with improved contrast ratios'
        ]
      },
      {
        title: 'Technical Improvements',
        icon: <Zap className="w-5 h-5" />,
        color: 'text-blue-400',
        items: [
          'Enhanced title extraction logic',
          'Transparent highlighting preserves heading colors',
          'Maintains visual hierarchy during search'
        ]
      }
    ]
  },
  {
    version: '1.1.2',
    date: 'January 10, 2025',
    title: 'Copy Options Enhancement',
    sections: [
      {
        title: 'New Features',
        icon: <Star className="w-5 h-5" />,
        color: 'text-yellow-400',
        items: [
          'Copy Format Selection Modal: Choose between rich text and markdown',
          'Beautiful overlay dialog with smooth animations',
          'Color-coded notifications for different copy actions'
        ]
      },
      {
        title: 'Bug Fixes',
        icon: <Bug className="w-5 h-5" />,
        color: 'text-green-400',
        items: [
          'Fixed duplicate title display issue'
        ]
      }
    ]
  },
  {
    version: '1.1.1',
    date: 'January 10, 2025',
    title: 'mdtohtml Enhancements',
    sections: [
      {
        title: 'New Features',
        icon: <Star className="w-5 h-5" />,
        color: 'text-yellow-400',
        items: [
          'Advanced Search: Real-time highlighting with navigation controls',
          'Floating Action Buttons: Semi-transparent Print and Copy buttons',
          'Search navigation with match counter and keyboard shortcuts'
        ]
      },
      {
        title: 'Improvements',
        icon: <Zap className="w-5 h-5" />,
        color: 'text-blue-400',
        items: [
          'Fixed dark theme styling issues',
          'Improved content width and readability',
          'Enhanced search performance'
        ]
      }
    ]
  },
  {
    version: '1.1.0',
    date: 'January 10, 2025',
    title: 'Enhancements & Fixes',
    sections: [
      {
        title: 'New Features',
        icon: <Star className="w-5 h-5" />,
        color: 'text-yellow-400',
        items: [
          '"How This Site Was Built" Page: Detailed documentation of the development process',
          'About Modal: Developer information and technology stack details',
          'Animation Improvements: Stable animations that don\'t restart on tab switches'
        ]
      },
      {
        title: 'Improvements',
        icon: <Zap className="w-5 h-5" />,
        color: 'text-blue-400',
        items: [
          'Fixed Chapter 5 syntax error with JSX elements',
          'Improved ISG Model visualization with hub-and-spoke design',
          'Enhanced ACE (AI Center of Excellence) graphics',
          'Better error handling for JWT authentication',
          'Removed all Sutherland references, updated to Comcast branding'
        ]
      },
      {
        title: 'Bug Fixes',
        icon: <Bug className="w-5 h-5" />,
        color: 'text-green-400',
        items: [
          'Fixed "Cell is not defined" error in Chapter 5',
          'Resolved magic link verification issues (JWT malformed/expired)',
          'Fixed animation restart issues across all pages',
          'Corrected TypeScript build errors',
          'Fixed deployment issues by replacing Python dependencies with Node.js'
        ]
      },
      {
        title: 'UI/UX Updates',
        icon: <Package className="w-5 h-5" />,
        color: 'text-purple-400',
        items: [
          'Replaced inline contact info with clean About modal',
          'Added help button (?) in navigation sidebar',
          'Improved SWOT analysis with overlay modals',
          'Enhanced talent strategy from fixed numbers to demand-based scaling'
        ]
      }
    ]
  },
  {
    version: '1.0.0',
    date: 'January 10, 2025',
    title: 'Initial Release',
    sections: [
      {
        title: 'Features',
        icon: <Rocket className="w-5 h-5" />,
        color: 'text-blue-400',
        items: [
          'Interactive Report Viewer: Transform 50+ page strategic report into interactive web experience',
          'Secure Authentication: Magic link authentication with admin approval workflow',
          'Data Visualizations: Interactive charts, graphs, and animations for each chapter',
          'Responsive Design: Optimized for desktop, tablet, and mobile devices',
          'Admin Dashboard: User management and approval system'
        ]
      },
      {
        title: 'Chapters Implemented',
        icon: <Package className="w-5 h-5" />,
        color: 'text-green-400',
        items: [
          'Executive Summary: Current state analysis with data metrics',
          'Market Opportunity: SWOT analysis with interactive overlays',
          'Technical Foundation: Platform architecture visualizations',
          'AI Use Cases Portfolio: Interactive matrix and ROI projections',
          'Building the AI-First Organization: ISG model visualization',
          'Economic Impact: Financial projections and timelines'
        ]
      }
    ]
  }
];

const upcomingFeatures = [
  'Export report as PDF functionality',
  'Enhanced search within chapters',
  'Bookmark and annotation system',
  'Progress tracking for readers',
  'Multi-language support'
];

export function ReleaseNotesModal({ isOpen, onClose }: ReleaseNotesModalProps) {
  return (
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
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gradient-to-br from-slate-900 to-slate-800 -mt-8 pt-8 pb-4">
              <h2 className="text-3xl font-bold text-white">Release Notes</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Release Notes */}
            <div className="space-y-12">
              {releaseNotes.map((release, releaseIndex) => (
                <motion.div
                  key={release.version}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: releaseIndex * 0.1 }}
                  className="relative"
                >
                  {/* Version Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-white">
                        Version {release.version}
                      </span>
                      {release.current && (
                        <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full font-medium">
                          CURRENT
                        </span>
                      )}
                      <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-xl text-blue-400">{release.title}</h3>
                  </div>

                  {/* Sections */}
                  <div className="space-y-6">
                    {release.sections.map((section, sectionIndex) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: releaseIndex * 0.1 + sectionIndex * 0.05 }}
                        className="bg-white/5 rounded-lg p-6"
                      >
                        <div className={`flex items-center gap-2 mb-4 ${section.color}`}>
                          {section.icon}
                          <h4 className="font-semibold text-lg">{section.title}</h4>
                        </div>
                        <ul className="space-y-2">
                          {section.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                              <span className="text-gray-500 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  {releaseIndex < releaseNotes.length - 1 && (
                    <div className="border-t border-white/10 mt-8" />
                  )}
                </motion.div>
              ))}

              {/* Upcoming Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-4 text-purple-400">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Version 1.2.0 - Coming Soon</h3>
                </div>
                <p className="text-gray-300 mb-4">Planned features for the next release:</p>
                <ul className="space-y-2">
                  {upcomingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-gray-500 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-500">
                For the complete release history and technical details, see{' '}
                <code className="bg-white/10 px-2 py-1 rounded text-blue-400">RELEASES.md</code>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}