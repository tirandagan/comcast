import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { convertMarkdownToHtml } from '@/lib/markdown-to-html';

export async function POST(request: NextRequest) {
  try {
    // Get token from either Authorization header or cookie
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth-token')?.value;
    
    let token: string | undefined;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (cookieToken) {
      token = cookieToken;
    }
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify token
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Verify session exists and user is admin
    const session = await prisma.session.findFirst({
      where: {
        sessionToken: token,
        expires: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Define paths - now saving to secure location
    const projectRoot = process.cwd();
    const markdownPath = path.join(projectRoot, 'design', 'comcast_ai_report.md');
    const outputPath = path.join(projectRoot, 'src', 'content', 'secure', 'comcast_ai_report.html');
    
    // Also update the markdown copy in secure location
    const fs = require('fs').promises;
    const secureMarkdownPath = path.join(projectRoot, 'src', 'content', 'secure', 'comcast_ai_report.md');
    await fs.copyFile(markdownPath, secureMarkdownPath);

    // Convert markdown to HTML using Node.js
    try {
      const result = await convertMarkdownToHtml(markdownPath, outputPath, 2);
      
      return NextResponse.json({
        success: true,
        message: 'Report regenerated successfully',
        output: result
      });
    } catch (conversionError: any) {
      console.error('Conversion error:', conversionError);
      return NextResponse.json(
        { 
          error: 'Failed to convert markdown to HTML',
          details: conversionError.message
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Report regeneration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}