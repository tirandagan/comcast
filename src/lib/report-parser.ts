import fs from 'fs';
import path from 'path';

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  order: number;
  description?: string;
  content: string;
  sections?: Section[];
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  order: number;
  content: string;
}

export function parseReport(): Chapter[] {
  const reportPath = path.join(process.cwd(), 'design/comcast_ai_report.md');
  const reportContent = fs.readFileSync(reportPath, 'utf-8');
  
  // Split content by main chapter headers
  const chapters: Chapter[] = [];
  const lines = reportContent.split('\n');
  
  
  // Define the main chapters based on the table of contents
  const chapterTitles = [
    'Executive Summary',
    'Chapter 1: Data & AI at Comcast - Current State and Vision',
    'Chapter 2: Data & AI Maturity Assessment',
    'Chapter 3: Strategic Data Platform Architecture',
    'Chapter 4: AI Innovation Portfolio & Roadmap',
    'Chapter 5: Building the AI-First Organization',
    'Chapter 6: Implementation Strategy & Quick Wins'
  ];
  
  let currentChapterIndex = -1;
  let currentContent: string[] = [];
  let inChapter = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line is a chapter title
    const isChapterTitle = chapterTitles.some(title => {
      const match = line.includes(title) && line.startsWith('#');
      if (match) {
        // Save previous chapter if exists
        if (currentChapterIndex >= 0) {
          const chapterTitle = chapterTitles[currentChapterIndex];
          const slug = chapterTitle.toLowerCase()
            .replace(/chapter \d+:\s*/i, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          
          
          chapters.push({
            id: `chapter-${currentChapterIndex}`,
            title: chapterTitle,
            slug,
            order: currentChapterIndex,
            content: currentContent.join('\n').trim(),
            sections: parseSections(currentContent.join('\n'))
          });
        }
        
        // Start new chapter
        currentChapterIndex = chapterTitles.indexOf(title);
        currentContent = [];
        inChapter = true;
        return true;
      }
      return false;
    });
    
    if (!isChapterTitle && inChapter) {
      currentContent.push(line);
    }
  }
  
  // Don't forget the last chapter
  if (currentChapterIndex >= 0 && currentContent.length > 0) {
    const chapterTitle = chapterTitles[currentChapterIndex];
    const slug = chapterTitle.toLowerCase()
      .replace(/chapter \d+:\s*/i, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    
    chapters.push({
      id: `chapter-${currentChapterIndex}`,
      title: chapterTitle,
      slug,
      order: currentChapterIndex,
      content: currentContent.join('\n').trim(),
      sections: parseSections(currentContent.join('\n'))
    });
  }
  
  
  // Add description to each chapter (first paragraph)
  chapters.forEach(chapter => {
    const firstParagraph = chapter.content
      .split('\n\n')
      .find(p => p.trim() && !p.startsWith('#') && !p.startsWith('-'));
    
    if (firstParagraph) {
      chapter.description = firstParagraph.substring(0, 200) + '...';
    }
  });
  
  return chapters;
}

function parseSections(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split('\n');
  
  let currentSectionTitle = '';
  let currentSectionContent: string[] = [];
  let sectionOrder = 0;
  
  for (const line of lines) {
    // Check if this is a section header (##, ###, ####)
    if (line.match(/^#{2,4}\s+/)) {
      // Save previous section
      if (currentSectionTitle) {
        sections.push({
          id: `section-${sectionOrder}`,
          title: currentSectionTitle,
          slug: currentSectionTitle.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
          order: sectionOrder,
          content: currentSectionContent.join('\n').trim()
        });
      }
      
      // Start new section
      currentSectionTitle = line.replace(/^#+\s+/, '');
      currentSectionContent = [];
      sectionOrder++;
    } else if (currentSectionTitle) {
      currentSectionContent.push(line);
    }
  }
  
  // Don't forget the last section
  if (currentSectionTitle && currentSectionContent.length > 0) {
    sections.push({
      id: `section-${sectionOrder}`,
      title: currentSectionTitle,
      slug: currentSectionTitle.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      order: sectionOrder,
      content: currentSectionContent.join('\n').trim()
    });
  }
  
  return sections;
}

// Get a single chapter by slug
export function getChapterBySlug(slug: string): Chapter | null {
  const chapters = parseReport();
  return chapters.find(ch => ch.slug === slug) || null;
}

// Get all chapter slugs (for static generation)
export function getAllChapterSlugs(): string[] {
  const chapters = parseReport();
  return chapters.map(ch => ch.slug);
}