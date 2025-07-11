import fs from 'fs/promises';
import path from 'path';
import { convertMarkdownToHtml } from './markdown-to-html';

export async function initializeSecureFiles() {
  try {
    const projectRoot = process.cwd();
    const secureDir = path.join(projectRoot, 'src', 'content', 'secure');
    const designMarkdownPath = path.join(projectRoot, 'design', 'comcast_ai_report.md');
    const secureMarkdownPath = path.join(secureDir, 'comcast_ai_report.md');
    const secureHtmlPath = path.join(secureDir, 'comcast_ai_report.html');

    // Create secure directory if it doesn't exist
    await fs.mkdir(secureDir, { recursive: true });

    // Check if secure files exist
    const markdownExists = await fs.access(secureMarkdownPath).then(() => true).catch(() => false);
    const htmlExists = await fs.access(secureHtmlPath).then(() => true).catch(() => false);

    if (!markdownExists || !htmlExists) {
      console.log('Initializing secure report files...');
      
      // Copy markdown from design folder
      await fs.copyFile(designMarkdownPath, secureMarkdownPath);
      
      // Convert to HTML
      await convertMarkdownToHtml(designMarkdownPath, secureHtmlPath, 2);
      
      console.log('Secure report files initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing secure files:', error);
    // Don't throw - allow app to start even if this fails
  }
}