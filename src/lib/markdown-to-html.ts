import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

export async function convertMarkdownToHtml(
  markdownPath: string,
  outputPath: string,
  tocDepth: number = 2
): Promise<string> {
  try {
    // Read the markdown file
    const markdown = await fs.readFile(markdownPath, 'utf-8');
    
    // Process markdown to HTML
    const result = await remark()
      .use(remarkGfm) // Support GitHub Flavored Markdown
      .use(remarkHtml, { sanitize: false })
      .process(markdown);
    
    // Create HTML document with proper styling
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comcast Data & AI Leadership Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 3rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.3;
        }
        h1 {
            color: #0059A7;
            border-bottom: 3px solid #0059A7;
            padding-bottom: 0.5rem;
        }
        h2 {
            color: #00549F;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 0.3rem;
        }
        h3 {
            color: #333;
        }
        a {
            color: #0059A7;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        code {
            background-color: #f4f4f4;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #0059A7;
            padding-left: 1rem;
            margin-left: 0;
            color: #666;
            font-style: italic;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 0.75rem;
            text-align: left;
        }
        th {
            background-color: #f8f8f8;
            font-weight: bold;
        }
        ul, ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        li {
            margin: 0.5rem 0;
        }
        .toc {
            background-color: #f8f8f8;
            padding: 1.5rem;
            border-radius: 5px;
            margin: 2rem 0;
        }
        .toc h2 {
            margin-top: 0;
            color: #0059A7;
            border-bottom: none;
        }
        .toc ul {
            list-style-type: none;
            padding-left: 0;
        }
        .toc ul ul {
            padding-left: 1.5rem;
        }
        .toc a {
            color: #333;
        }
        @media print {
            body {
                background-color: white;
            }
            .container {
                box-shadow: none;
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${result.toString()}
    </div>
</body>
</html>`;
    
    // Write the HTML file
    await fs.writeFile(outputPath, html, 'utf-8');
    
    return `Report generated successfully at ${outputPath}`;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    throw error;
  }
}