'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Home, LogOut, Book, Shield, HelpCircle, Code } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { reportChapters } from '@/lib/report-data';
import { AboutModal } from '@/components/AboutModal';

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Fetch user data from API
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    fetchUser();
  }, []);

  const handleLogout = async () => {
    // Clear the auth cookie by calling a logout endpoint
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    router.push('/');
  };

  const currentChapterSlug = pathname.split('/').pop();
  const currentChapter = reportChapters.find(ch => ch.slug === currentChapterSlug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <Link href="/" className="flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-400" />
              <span className="font-semibold hidden sm:inline">Comcast Data & AI Vision</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {user && (
              <span className="text-sm text-gray-300 hidden md:inline">
                Welcome, {user.name}
              </span>
            )}
            {user?.role === 'ADMIN' && (
              <Link href="/admin/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-md transition-all duration-200 shadow-lg hover:shadow-xl"
                  title="Admin Dashboard"
                >
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Admin</span>
                </motion.button>
              </Link>
            )}
            <a
              href="/api/secure-report?type=html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md transition-all duration-200 shadow-lg hover:shadow-xl"
              title="Text-Only Report"
            >
              <Book className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Text-Only Report</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed left-0 top-16 bottom-0 w-80 bg-black/30 backdrop-blur-sm border-r border-white/10 overflow-y-auto z-40 ${
              !sidebarOpen ? 'hidden lg:block' : ''
            }`}
          >
            <nav className="p-4">
              <Link href="/">
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 mb-4 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <Home className="w-5 h-5 text-gray-400" />
                  <span>Back to Home</span>
                </motion.div>
              </Link>

              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
                Chapters
              </h3>

              <div className="space-y-1">
                {reportChapters.map((chapter) => {
                  const isActive = chapter.slug === currentChapterSlug;
                  
                  return (
                    <Link key={chapter.id} href={`/report/${chapter.slug}`}>
                      <motion.div
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-400'
                            : 'hover:bg-white/10 text-gray-300 hover:text-white'
                        }`}
                        whileHover={{ x: isActive ? 0 : 4 }}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="text-sm font-medium">{chapter.order}.</span>
                        <span className="flex-1 text-sm">
                          {chapter.title.replace(/Chapter \d+:\s*/, '')}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* How This Site Was Built Link */}
              <div className="mt-6 px-1">
                <Link href="/how-built">
                  <motion.div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-white/10 text-gray-300 hover:text-white"
                    whileHover={{ x: 4 }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Code className="w-5 h-5" />
                    <span className="flex-1 text-sm">How This Site Was Built</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </motion.div>
                </Link>
              </div>

              {/* Help Button */}
              <div className="mt-8 p-4 border-t border-white/10">
                <button
                  onClick={() => setAboutModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
                >
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">About</span>
                </button>
              </div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`pt-16 ${sidebarOpen ? 'lg:pl-80' : 'lg:pl-80'} min-h-screen`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          {currentChapter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Link href="/report" className="hover:text-white transition-colors">
                  Report
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{currentChapter.title}</span>
              </div>
            </motion.div>
          )}
          
          {children}
        </div>
      </main>
      
      {/* About Modal */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
    </div>
  );
}