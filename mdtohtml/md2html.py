#!/usr/bin/env python3
"""
Markdown to Beautiful HTML Converter
Converts markdown files to modern, self-contained HTML with advanced navigation
Styled to match the Sutherland AI Innovation microsite
"""

import argparse
import os
import re
import sys
from pathlib import Path
import json
import markdown
from markdown.extensions import codehilite, fenced_code, tables, toc, attr_list, nl2br, smarty
from markdown.extensions.toc import TocExtension
from markdown.extensions.codehilite import CodeHiliteExtension
from pygments.formatters import HtmlFormatter
import html


class MarkdownToHtmlConverter:
    def __init__(self, toc_depth=1):
        self.toc_items = []
        self.html_template = self._get_html_template()
        self.toc_depth = toc_depth
        
    def convert(self, markdown_file, output_file=None):
        """Convert markdown file to HTML"""
        # Convert to absolute path to handle relative paths correctly
        markdown_file = Path(markdown_file).resolve()
        
        # Read markdown content
        with open(markdown_file, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Configure markdown extensions
        md = markdown.Markdown(extensions=[
            'extra',
            'codehilite',
            'fenced_code',
            'tables',
            'toc',
            'attr_list',
            'nl2br',
            'smarty',
            'sane_lists',
            'footnotes',
            'meta',
            TocExtension(
                baselevel=1,
                toc_depth=self.toc_depth,  # Control TOC depth
                permalink=False,  # Disable permalink symbols
                slugify=self._slugify
            ),
            CodeHiliteExtension(
                guess_lang=False,
                css_class='highlight'
            )
        ])
        
        # Convert to HTML
        html_content = md.convert(md_content)
        
        # Extract TOC
        toc_html = md.toc if hasattr(md, 'toc') else ''
        
        # Process cross-references
        html_content = self._process_cross_references(html_content, md_content)
        
        # Get title from first H1 or filename
        title = self._extract_title(md_content, markdown_file)
        
        # Get code highlighting CSS
        pygments_css = HtmlFormatter(style='github-dark').get_style_defs('.highlight')
        
        # Build final HTML
        final_html = self.html_template.format(
            title=html.escape(title),
            content=html_content,
            toc=toc_html,
            pygments_css=pygments_css
        )
        
        # Handle output file path
        if output_file is None:
            # Default: same directory as input, with .html extension
            output_file = markdown_file.with_suffix('.html')
        else:
            output_file = Path(output_file)
            # If not absolute, make it relative to current working directory
            if not output_file.is_absolute():
                output_file = Path.cwd() / output_file
        
        # Ensure output directory exists
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(final_html)
        
        return output_file
    
    def _slugify(self, text, separator='-'):
        """Create URL-friendly slugs from heading text"""
        text = re.sub(r'[^\w\s-]', '', text).strip().lower()
        text = re.sub(r'[-\s]+', separator, text)
        return text
    
    def _extract_title(self, md_content, filename):
        """Extract title from markdown content or filename"""
        # Try to find first H1
        match = re.search(r'^#\s+(.+)$', md_content, re.MULTILINE)
        if match:
            return match.group(1).strip()
        
        # Fallback to filename
        return Path(filename).stem.replace('_', ' ').title()
    
    def _extract_headings(self, md_content):
        """Extract all headings from markdown content"""
        headings = {}
        
        # Match all heading levels (1-6)
        heading_pattern = r'^(#{1,6})\s+(.+)$'
        matches = re.finditer(heading_pattern, md_content, re.MULTILINE)
        
        for match in matches:
            level = len(match.group(1))
            heading_text = match.group(2).strip()
            # Create the slug/anchor the same way as the TOC extension
            anchor = self._slugify(heading_text)
            headings[heading_text] = anchor
        
        return headings
    
    def _process_cross_references(self, html_content, md_content):
        """Process cross-references and convert section titles to links"""
        # Extract all headings from the markdown
        headings = self._extract_headings(md_content)
        
        # Focus on specific patterns that are most common in the document
        # Look for "Related Chapters" sections and similar references
        
        # First, find all list items in "Related Chapters" sections
        related_sections_pattern = r'(?:<h[1-6][^>]*>.*?(?:Related Chapters|🔗 Related Chapters).*?</h[1-6]>)(.*?)(?=<h[1-6]|$)'
        related_sections = re.findall(related_sections_pattern, html_content, re.DOTALL | re.IGNORECASE)
        
        for section in related_sections:
            # Process each heading in the section
            for heading_text, anchor in headings.items():
                # Skip very short headings to avoid false matches
                if len(heading_text) < 5:
                    continue
                
                escaped_heading = re.escape(heading_text)
                
                # Simple pattern for list items
                pattern = rf'(<li>[^<]*?)({escaped_heading})([^<]*?</li>)'
                
                def replace_with_link(match):
                    # Check if already linked
                    if '<a ' in match.group(0):
                        return match.group(0)
                    return f'{match.group(1)}<a href="#{anchor}">{match.group(2)}</a>{match.group(3)}'
                
                section_updated = re.sub(pattern, replace_with_link, section)
                html_content = html_content.replace(section, section_updated)
        
        # Also process chapter/appendix references in the main text
        for heading_text, anchor in headings.items():
            if len(heading_text) < 5:
                continue
                
            escaped_heading = re.escape(heading_text)
            
            # Match full chapter/appendix references
            patterns = [
                rf'(<strong>)(Chapter \d+: {escaped_heading})(</strong>)',
                rf'(<strong>)(Appendix \w+: {escaped_heading})(</strong>)',
                rf'(>)(Chapter \d+: {escaped_heading})(<)',
                rf'(>)(Appendix \w+: {escaped_heading})(<)',
            ]
            
            for pattern in patterns:
                def replace_with_link(match):
                    if '<a ' in match.group(0):
                        return match.group(0)
                    return f'{match.group(1)}<a href="#{anchor}">{match.group(2)}</a>{match.group(3)}'
                
                html_content = re.sub(pattern, replace_with_link, html_content)
        
        return html_content
    
    def _get_html_template(self):
        """Return the HTML template with embedded CSS and JavaScript"""
        return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    
    <!-- Modern CSS Framework inspiration -->
    <style>
        /* CSS Variables for theming - Matching Sutherland AI Innovation microsite */
        :root {{
            --primary-color: #3b82f6;  /* blue-500 */
            --secondary-color: #1e40af; /* blue-800 */
            --accent-color: #60a5fa;    /* blue-400 */
            --success-color: #10b981;   /* green-500 */
            --warning-color: #f59e0b;   /* amber-500 */
            --danger-color: #ef4444;    /* red-500 */
            
            /* Dark theme by default to match microsite */
            --bg-primary: #0f172a;      /* slate-900 */
            --bg-secondary: #1e293b;    /* slate-800 */
            --bg-tertiary: #334155;     /* slate-700 */
            --bg-gradient: linear-gradient(to bottom right, #0f172a, #1e3a8a, #0f172a);
            
            --text-primary: #f8fafc;    /* slate-50 */
            --text-secondary: #cbd5e1;  /* slate-300 */
            --text-tertiary: #94a3b8;   /* slate-400 */
            
            --border-color: #334155;  /* slate-700 */
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5);
            
            --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
            --font-mono: 'Fira Code', 'Cascadia Code', Consolas, monospace;
        }}
        
        /* Remove dark mode media query - always use dark theme */
        
        /* Base reset and typography */
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        html {{
            font-size: 16px;
            scroll-behavior: smooth;
        }}
        
        body {{
            font-family: var(--font-sans);
            color: var(--text-primary);
            background: var(--bg-gradient);
            background-attachment: fixed;
            line-height: 1.6;
            overflow-x: hidden;
            min-height: 100vh;
        }}
        
        /* Layout structure */
        .app-container {{
            display: flex;
            min-height: 100vh;
        }}
        
        /* Sidebar navigation */
        .sidebar {{
            position: fixed;
            top: 0;
            left: 0;
            width: 300px;
            height: 100vh;
            background-color: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            overflow-y: auto;
            transform: translateX(0);
            transition: transform 0.3s ease;
            z-index: 1000;
        }}
        
        .sidebar-header {{
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }}
        
        .sidebar-title {{
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }}
        
        .search-container {{
            position: relative;
            margin-top: 1rem;
        }}
        
        .search-input {{
            width: 100%;
            padding: 0.5rem 2.5rem 0.5rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            background-color: rgba(30, 41, 59, 0.5);
            color: var(--text-primary);
            font-size: 0.875rem;
            transition: all 0.2s;
        }}
        
        .search-input:focus {{
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
            background-color: rgba(30, 41, 59, 0.8);
        }}
        
        .search-icon {{
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-tertiary);
        }}
        
        /* Table of Contents */
        .toc {{
            padding: 1rem;
        }}
        
        .toc ul {{
            list-style: none;
            padding-left: 0;
        }}
        
        .toc ul ul {{
            padding-left: 1.5rem;
        }}
        
        .toc li {{
            margin: 0.25rem 0;
        }}
        
        .toc a {{
            display: block;
            padding: 0.375rem 0.75rem;
            color: var(--text-secondary);
            text-decoration: none;
            border-radius: 0.375rem;
            transition: all 0.2s;
            font-size: 0.875rem;
        }}
        
        .toc a:hover {{
            background-color: rgba(59, 130, 246, 0.1);
            color: var(--accent-color);
        }}
        
        .toc a.active {{
            background-color: rgba(59, 130, 246, 0.2);
            color: var(--accent-color);
            font-weight: 500;
            border-left: 3px solid var(--primary-color);
            padding-left: calc(0.75rem - 3px);
        }}
        
        /* Main content area */
        .main-content {{
            flex: 1;
            margin-left: 300px;
            padding: 2rem 4rem;
            max-width: 1200px;
            margin-right: auto;
            background: rgba(15, 23, 42, 0.3);
            backdrop-filter: blur(5px);
            border-radius: 1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
            box-shadow: var(--shadow-xl);
        }}
        
        /* Header with actions */
        .content-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.75rem;
            box-shadow: var(--shadow-lg);
        }}
        
        .header-actions {{
            display: flex;
            gap: 0.75rem;
            align-items: center;
        }}
        
        .action-button svg {{
            display: inline-block;
            vertical-align: middle;
        }}
        
        .action-button span {{
            display: inline-block;
            vertical-align: middle;
        }}
        
        .action-button {{
            padding: 0.5rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.375rem;
            background: linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.1));
            color: var(--text-secondary);
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s;
        }}
        
        .action-button:hover {{
            background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(30, 64, 175, 0.2));
            border-color: var(--primary-color);
            color: var(--text-primary);
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }}
        
        /* Typography */
        h1, h2, h3, h4, h5, h6 {{
            font-weight: 700;
            line-height: 1.3;
            margin-top: 2rem;
            margin-bottom: 1rem;
            scroll-margin-top: 2rem;
        }}
        
        h1 {{
            font-size: 2.5rem;
            color: var(--text-primary);
            background: linear-gradient(to right, #60a5fa, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            border-bottom: 2px solid rgba(59, 130, 246, 0.3);
            padding-bottom: 0.5rem;
        }}
        
        h2 {{
            font-size: 2rem;
            color: var(--text-primary);
        }}
        
        h3 {{
            font-size: 1.5rem;
            color: var(--text-primary);
        }}
        
        h4 {{
            font-size: 1.25rem;
            color: var(--text-secondary);
        }}
        
        p {{
            margin-bottom: 1.25rem;
            color: var(--text-secondary);
        }}
        
        /* Links */
        a {{
            color: var(--accent-color);
            text-decoration: none;
            transition: all 0.2s;
        }}
        
        a:hover {{
            color: var(--primary-color);
            text-decoration: underline;
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }}
        
        /* Lists */
        ul, ol {{
            margin-bottom: 1.25rem;
            padding-left: 2rem;
        }}
        
        li {{
            margin-bottom: 0.5rem;
        }}
        
        /* Blockquotes */
        blockquote {{
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
            border-left: 4px solid var(--primary-color);
            background: linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.05));
            border-radius: 0.375rem;
            box-shadow: var(--shadow-md);
        }}
        
        blockquote p {{
            margin-bottom: 0.5rem;
        }}
        
        blockquote p:last-child {{
            margin-bottom: 0;
        }}
        
        /* Code blocks */
        pre {{
            margin: 1.5rem 0;
            border-radius: 0.5rem;
            overflow-x: auto;
            background-color: #0d1117;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: var(--shadow-lg);
        }}
        
        code {{
            font-family: var(--font-mono);
            font-size: 0.875rem;
            padding: 0.125rem 0.375rem;
            background-color: rgba(51, 65, 85, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.25rem;
            color: #60a5fa;
        }}
        
        pre code {{
            display: block;
            padding: 1rem;
            background-color: transparent;
        }}
        
        /* Tables */
        table {{
            width: 100%;
            margin: 1.5rem 0;
            border-collapse: collapse;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: var(--shadow-md);
            background: rgba(30, 41, 59, 0.3);
        }}
        
        th, td {{
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }}
        
        th {{
            background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(30, 64, 175, 0.1));
            font-weight: 600;
            color: var(--text-primary);
            text-transform: uppercase;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
        }}
        
        tr:last-child td {{
            border-bottom: none;
        }}
        
        tr:hover {{
            background-color: rgba(59, 130, 246, 0.05);
        }}
        
        /* Horizontal rule */
        hr {{
            margin: 2rem 0;
            border: none;
            border-top: 1px solid var(--border-color);
        }}
        
        /* Mobile menu toggle */
        .menu-toggle {{
            display: none;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            padding: 0.5rem;
            background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(30, 64, 175, 0.2));
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.375rem;
            cursor: pointer;
            backdrop-filter: blur(10px);
        }}
        
        /* Progress indicator */
        .progress-bar {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: rgba(30, 41, 59, 0.5);
            z-index: 999;
        }}
        
        .progress-fill {{
            height: 100%;
            background: linear-gradient(to right, var(--primary-color), var(--accent-color));
            width: 0%;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
        }}
        
        /* Responsive design */
        @media (max-width: 768px) {{
            .sidebar {{
                transform: translateX(-100%);
            }}
            
            .sidebar.open {{
                transform: translateX(0);
            }}
            
            .main-content {{
                margin-left: 0;
                padding: 1rem;
            }}
            
            .menu-toggle {{
                display: block;
            }}
            
            h1 {{
                font-size: 2rem;
            }}
            
            h2 {{
                font-size: 1.5rem;
            }}
        }}
        
        /* Print styles */
        @media print {{
            .sidebar, .menu-toggle, .progress-bar, .header-actions {{
                display: none;
            }}
            
            .main-content {{
                margin-left: 0;
                max-width: 100%;
            }}
        }}
        
        /* Syntax highlighting (Pygments) */
        {pygments_css}
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {{
            width: 8px;
            height: 8px;
        }}
        
        ::-webkit-scrollbar-track {{
            background: rgba(30, 41, 59, 0.5);
        }}
        
        ::-webkit-scrollbar-thumb {{
            background: var(--text-tertiary);
            border-radius: 4px;
        }}
        
        ::-webkit-scrollbar-thumb:hover {{
            background: var(--text-secondary);
        }}
        
        /* Smooth transitions */
        * {{
            transition-property: background-color, border-color, color;
            transition-duration: 0.2s;
            transition-timing-function: ease;
        }}
    </style>
</head>
<body>
    <!-- Progress bar -->
    <div class="progress-bar">
        <div class="progress-fill"></div>
    </div>
    
    <!-- Mobile menu toggle -->
    <button class="menu-toggle" onclick="toggleSidebar()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"></path>
        </svg>
    </button>
    
    <div class="app-container">
        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-title">Table of Contents</div>
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Search..." id="searchInput" onkeyup="performSearch()">
                    <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </div>
            <nav class="toc">
                {toc}
            </nav>
        </aside>
        
        <!-- Main content -->
        <main class="main-content">
            <div class="content-header">
                <div>
                    <h1 style="margin: 0; border: none; padding: 0;">{title}</h1>
                    <p style="margin: 0.5rem 0 0 0; color: var(--text-tertiary); font-size: 0.875rem;">AI-Powered Innovation Strategy Report</p>
                </div>
                <div class="header-actions">
                    <button class="action-button" onclick="window.print()" title="Print this document">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/>
                        </svg>
                        <span style="margin-left: 0.5rem;">Print</span>
                    </button>
                    <button class="action-button" onclick="copyLink()" title="Copy link to clipboard">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                        <span style="margin-left: 0.5rem;">Share</span>
                    </button>
                </div>
            </div>
            
            <article id="content">
                {content}
            </article>
        </main>
    </div>
    
    <script>
        // Sidebar toggle
        function toggleSidebar() {{
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        }}
        
        // Theme toggle - Currently disabled as we use dark theme only
        function toggleTheme() {{
            // Dark theme is the default and only theme
            alert('This document uses a dark theme optimized for readability.');
        }}
        
        // Copy link
        function copyLink() {{
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }}
        
        // Search functionality
        function performSearch() {{
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const content = document.getElementById('content');
            const text = content.textContent || content.innerText;
            
            if (searchTerm.length < 2) {{
                removeHighlights();
                return;
            }}
            
            removeHighlights();
            highlightSearchTerm(content, searchTerm);
        }}
        
        function removeHighlights() {{
            const highlighted = document.querySelectorAll('.search-highlight');
            highlighted.forEach(el => {{
                const parent = el.parentNode;
                parent.replaceChild(document.createTextNode(el.textContent), el);
                parent.normalize();
            }});
        }}
        
        function highlightSearchTerm(element, term) {{
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const nodesToReplace = [];
            while (walker.nextNode()) {{
                const node = walker.currentNode;
                if (node.nodeValue.toLowerCase().includes(term)) {{
                    nodesToReplace.push(node);
                }}
            }}
            
            nodesToReplace.forEach(node => {{
                const span = document.createElement('span');
                span.innerHTML = node.nodeValue.replace(
                    new RegExp(term, 'gi'),
                    match => `<span class="search-highlight" style="background-color: rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 2px 4px; border-radius: 3px; border: 1px solid rgba(59, 130, 246, 0.5);">${{match}}</span>`
                );
                node.parentNode.replaceChild(span, node);
            }});
        }}
        
        // Active TOC tracking
        const observerOptions = {{
            rootMargin: '-20% 0px -70% 0px'
        }};
        
        const observer = new IntersectionObserver(entries => {{
            entries.forEach(entry => {{
                const id = entry.target.getAttribute('id');
                const tocLink = document.querySelector(`.toc a[href="#${{id}}"]`);
                
                if (entry.intersectionRatio > 0) {{
                    document.querySelectorAll('.toc a').forEach(a => a.classList.remove('active'));
                    if (tocLink) tocLink.classList.add('active');
                }}
            }});
        }}, observerOptions);
        
        // Observe all headings
        document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(heading => {{
            observer.observe(heading);
        }});
        
        // Progress bar
        window.addEventListener('scroll', () => {{
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.querySelector('.progress-fill').style.width = scrolled + '%';
        }});
        
        // Initialize on load
        window.addEventListener('DOMContentLoaded', () => {{
            // Dark theme is always active
            console.log('Sutherland AI Innovation Report - HTML Version');
        }});
    </script>
</body>
</html>'''


def main():
    parser = argparse.ArgumentParser(
        description='Convert Markdown to beautiful, modern HTML',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  %(prog)s document.md
  %(prog)s document.md -o output.html
  %(prog)s *.md --batch
        '''
    )
    
    parser.add_argument(
        'input',
        nargs='+',
        help='Input markdown file(s)'
    )
    
    parser.add_argument(
        '-o', '--output',
        help='Output HTML file (default: same name as input with .html extension)'
    )
    
    parser.add_argument(
        '--batch',
        action='store_true',
        help='Process multiple files in batch mode'
    )
    
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Enable verbose output'
    )
    
    parser.add_argument(
        '-d', '--toc-depth',
        type=int,
        default=1,
        choices=[1, 2, 3, 4, 5, 6],
        help='Maximum heading level to include in table of contents (default: 1, shows only # headings)'
    )
    
    args = parser.parse_args()
    
    converter = MarkdownToHtmlConverter(toc_depth=args.toc_depth)
    
    # Process files
    for input_file in args.input:
        if not os.path.exists(input_file):
            print(f"Error: File '{input_file}' not found", file=sys.stderr)
            continue
        
        try:
            output_file = args.output if not args.batch else None
            result = converter.convert(input_file, output_file)
            
            if args.verbose:
                print(f"✓ Converted: {input_file} → {result}")
            else:
                print(f"✓ {result}")
                
        except Exception as e:
            print(f"Error converting '{input_file}': {e}", file=sys.stderr)
            if args.verbose:
                import traceback
                traceback.print_exc()


if __name__ == '__main__':
    main()