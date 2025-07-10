import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  order: number;
  description?: string;
  content: string;
  sections: Section[];
  readingTime?: number;
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  order: number;
  content: string;
  level: number;
}

// Cache the parsed report to avoid re-parsing on every request
export const getFullReport = cache(() => {
  const reportPath = path.join(process.cwd(), 'design/comcast_ai_report.md');
  const reportContent = fs.readFileSync(reportPath, 'utf-8');
  return reportContent;
});

export const parseFullReport = cache((): Chapter[] => {
  const reportContent = getFullReport();
  const lines = reportContent.split('\n');
  
  const chapters: Chapter[] = [];
  let currentChapter: Chapter | null = null;
  let currentSection: Section | null = null;
  let currentContent: string[] = [];
  let inTableOfContents = false;
  let chapterOrder = 0;
  
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip table of contents section
    if (line.includes('# Table of Contents')) {
      inTableOfContents = true;
      continue;
    }
    if (inTableOfContents && line.startsWith('---')) {
      inTableOfContents = false;
      continue;
    }
    if (inTableOfContents) continue;
    
    // Check for chapter headers (## Chapter X: or ## Executive Summary)
    if (line.startsWith('## Chapter ') || line === '## Executive Summary') {
      // Save previous chapter if exists
      if (currentChapter) {
        currentChapter.content = currentContent.join('\n').trim();
        currentChapter.readingTime = estimateReadingTime(currentChapter.content);
        chapters.push(currentChapter);
      }
      
      // Start new chapter
      const title = line.substring(3).trim(); // Remove ## 
      const slug = generateSlug(title);
      
      
      currentChapter = {
        id: `chapter-${chapterOrder}`,
        title,
        slug,
        order: chapterOrder++,
        content: '',
        sections: [],
      };
      
      currentContent = [];
      currentSection = null;
    }
    // Check for section headers (###, ####) - skip ## as those are chapters
    else if (line.match(/^#{3,4}\s+/) && currentChapter) {
      // Save previous section content if exists
      if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        currentChapter.sections.push(currentSection);
      }
      
      // Start new section
      const level = line.match(/^(#+)/)?.[1].length || 2;
      const title = line.replace(/^#+\s+/, '').trim();
      const slug = generateSlug(title);
      
      currentSection = {
        id: `section-${currentChapter.sections.length}`,
        title,
        slug,
        order: currentChapter.sections.length,
        content: '',
        level: level - 1, // Adjust level (## = 1, ### = 2, etc.)
      };
      
      currentContent = [line]; // Include the header in content
    }
    // Regular content
    else {
      currentContent.push(line);
    }
  }
  
  // Don't forget the last chapter/section
  if (currentSection && currentChapter) {
    currentSection.content = currentContent.join('\n').trim();
    currentChapter.sections.push(currentSection);
  }
  
  if (currentChapter) {
    currentChapter.content = currentContent.join('\n').trim();
    currentChapter.readingTime = estimateReadingTime(currentChapter.content);
    chapters.push(currentChapter);
  }
  
  
  // Add descriptions to chapters (first meaningful paragraph)
  chapters.forEach(chapter => {
    const firstParagraph = chapter.content
      .split('\n\n')
      .find(p => p.trim() && !p.startsWith('#') && !p.startsWith('-') && p.length > 50);
    
    if (firstParagraph) {
      chapter.description = firstParagraph.substring(0, 200).trim() + '...';
    }
  });
  
  return chapters;
});

// Cache for the special chapter content
let howThisSiteWasMadeContent: string | null = null;

export function getChapterBySlug(slug: string): Chapter | null {
  // Special handling for "How This Site Was Made" chapter
  if (slug === 'how-this-site-was-made') {
    // Load content only once and cache it
    if (!howThisSiteWasMadeContent) {
      try {
        howThisSiteWasMadeContent = fs.readFileSync(
          path.join(process.cwd(), 'src/content/how-this-site-was-made.md'), 
          'utf-8'
        );
      } catch (error) {
        console.error('Failed to load "How This Site Was Made" content:', error);
        howThisSiteWasMadeContent = '# How This Site Was Made\n\nContent could not be loaded.';
      }
    }
    
    return {
      id: 'chapter-14',
      title: 'How This Site Was Made',
      slug: 'how-this-site-was-made',
      order: 14,
      description: 'A behind-the-scenes look at how this interactive microsite was created using Claude Code, modern web technologies, and AI-powered development.',
      content: howThisSiteWasMadeContent,
      sections: [],
      readingTime: 8
    };
  }
  
  const chapters = parseFullReport();
  return chapters.find(ch => ch.slug === slug) || null;
}

export function getAllChapterSlugs(): string[] {
  const chapters = parseFullReport();
  const slugs = chapters.map(ch => ch.slug);
  // Add our special chapter
  slugs.push('how-this-site-was-made');
  return slugs;
}

export function getChapterWithSections(slug: string): Chapter | null {
  // For our special chapter, just return it directly
  if (slug === 'how-this-site-was-made') {
    return getChapterBySlug(slug);
  }
  
  const chapter = getChapterBySlug(slug);
  if (!chapter) return null;
  
  // Rebuild full content including section headers
  let fullContent = '';
  const lastLevel = 0;
  
  chapter.sections.forEach((section, index) => {
    if (index > 0) fullContent += '\n\n';
    fullContent += section.content;
  });
  
  // If no sections, use original content
  if (chapter.sections.length === 0) {
    fullContent = chapter.content;
  }
  
  return {
    ...chapter,
    content: fullContent,
  };
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/chapter \d+:\s*/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Get table of contents structure
export function getTableOfContents() {
  const chapters = parseFullReport();
  
  const toc = chapters.map(chapter => ({
    title: chapter.title,
    slug: chapter.slug,
    order: chapter.order,
    readingTime: chapter.readingTime,
    sections: chapter.sections.map(section => ({
      title: section.title,
      slug: section.slug,
      level: section.level,
    })),
  }));
  
  // Add our special chapter
  toc.push({
    title: 'How This Site Was Made',
    slug: 'how-this-site-was-made',
    order: 14,
    readingTime: 8,
    sections: []
  });
  
  return toc;
}

// Search functionality
export function searchContent(query: string): Array<{
  chapter: string;
  chapterSlug: string;
  section?: string;
  excerpt: string;
  matchCount: number;
}> {
  const chapters = parseFullReport();
  const results: Array<any> = [];
  const searchTerm = query.toLowerCase();
  
  chapters.forEach(chapter => {
    // Search in chapter content
    const chapterMatches = (chapter.content.toLowerCase().match(new RegExp(searchTerm, 'g')) || []).length;
    
    if (chapterMatches > 0) {
      // Find excerpt around first match
      const index = chapter.content.toLowerCase().indexOf(searchTerm);
      const start = Math.max(0, index - 100);
      const end = Math.min(chapter.content.length, index + searchTerm.length + 100);
      const excerpt = '...' + chapter.content.substring(start, end).trim() + '...';
      
      results.push({
        chapter: chapter.title,
        chapterSlug: chapter.slug,
        excerpt,
        matchCount: chapterMatches,
      });
    }
    
    // Search in sections
    chapter.sections.forEach(section => {
      const sectionMatches = (section.content.toLowerCase().match(new RegExp(searchTerm, 'g')) || []).length;
      
      if (sectionMatches > 0) {
        const index = section.content.toLowerCase().indexOf(searchTerm);
        const start = Math.max(0, index - 100);
        const end = Math.min(section.content.length, index + searchTerm.length + 100);
        const excerpt = '...' + section.content.substring(start, end).trim() + '...';
        
        results.push({
          chapter: chapter.title,
          chapterSlug: chapter.slug,
          section: section.title,
          excerpt,
          matchCount: sectionMatches,
        });
      }
    });
  });
  
  // Sort by match count
  return results.sort((a, b) => b.matchCount - a.matchCount);
}