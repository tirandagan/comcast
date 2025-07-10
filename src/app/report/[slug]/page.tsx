'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { reportChapters } from '@/lib/report-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import InteractiveChapterView from '@/components/report/InteractiveChapterView';
import { useAnalytics } from '@/hooks/useAnalytics';
import { chapterSummaries } from '@/lib/chapter-summaries';

interface Chapter {
  id: string;
  title: string;
  slug: string;
  order: number;
  description?: string;
  content: string;
  sections?: any[];
}

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollDepth, setScrollDepth] = useState(0);
  
  const analytics = useAnalytics();
  const contentRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const hasTrackedScrollRef = useRef<Set<number>>(new Set());

  const slug = params.slug as string;
  const currentIndex = reportChapters.findIndex(ch => ch.slug === slug);
  const prevChapter = currentIndex > 0 ? reportChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < reportChapters.length - 1 ? reportChapters[currentIndex + 1] : null;

  // Track scroll depth
  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = contentRef.current.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
    
    setScrollDepth(Math.max(scrollDepth, scrollPercentage));
    
    // Track milestone scroll depths (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100];
    milestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !hasTrackedScrollRef.current.has(milestone)) {
        hasTrackedScrollRef.current.add(milestone);
        analytics.trackScroll(milestone, {
          chapter_slug: slug,
          chapter_title: chapter?.title,
        });
      }
    });
  }, [scrollDepth, slug, chapter, analytics]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchChapter();
    startTimeRef.current = Date.now();
    hasTrackedScrollRef.current.clear();
    
    // Track chapter exit and time spent
    return () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      analytics.trackTimeSpent('Chapter Read Time', timeSpent, {
        chapter_slug: slug,
        chapter_title: chapter?.title,
        max_scroll_depth: scrollDepth,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchChapter = async () => {
    try {
      setLoading(true);
      
      // Authentication is handled by middleware and httpOnly cookies
      // No need to check localStorage
      
      const response = await fetch(`/api/report/${slug}`);

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/signin?from=/report/' + slug);
          return;
        }
        throw new Error('Failed to load chapter');
      }

      const data = await response.json();
      setChapter(data.chapter);
      
      // Track chapter view
      analytics.trackChapterView(slug, data.chapter.title);
    } catch (err: any) {
      setError(err.message || 'Failed to load chapter');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => fetchChapter()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return null;
  }

  return (
    <motion.div
      ref={contentRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Chapter Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4 text-blue-400">
          <BookOpen className="w-8 h-8" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Chapter {chapter.order}
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          {chapter.title.replace(/Chapter \d+:\s*/, '')}
        </h1>
        
        {chapterSummaries[slug] && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-xl text-gray-200 leading-relaxed italic">
              {chapterSummaries[slug]}
            </p>
          </div>
        )}
      </div>

      {/* Chapter Content with Interactive Features */}
      <InteractiveChapterView chapter={chapter} />

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-white/20">
        <div className="flex items-center justify-between">
          {prevChapter ? (
            <Link href={`/report/${prevChapter.slug}`}>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => analytics.trackClick('Chapter Navigation', {
                  direction: 'previous',
                  from_chapter: slug,
                  to_chapter: prevChapter.slug,
                })}
              >
                <ChevronLeft className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Previous</p>
                  <p className="text-sm font-medium">{prevChapter.title.replace(/Chapter \d+:\s*/, '')}</p>
                </div>
              </motion.button>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link href={`/report/${nextChapter.slug}`}>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => analytics.trackClick('Chapter Navigation', {
                  direction: 'next',
                  from_chapter: slug,
                  to_chapter: nextChapter.slug,
                })}
              >
                <div className="text-right">
                  <p className="text-xs text-gray-200">Next</p>
                  <p className="text-sm font-medium">{nextChapter.title.replace(/Chapter \d+:\s*/, '')}</p>
                </div>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </motion.div>
  );
}