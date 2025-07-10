import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
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

    // Verify session exists
    const session = await prisma.session.findFirst({
      where: {
        sessionToken: token,
        expires: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 401 }
      );
    }

    // Get the requested file type from query params
    const { searchParams } = new URL(request.url);
    const fileType = searchParams.get('type');

    if (!fileType || !['md', 'html'].includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Read the file from a secure location (not public)
    const fileName = `comcast_ai_report.${fileType}`;
    const filePath = path.join(process.cwd(), 'src', 'content', 'secure', fileName);

    try {
      const fileContent = await readFile(filePath, 'utf-8');
      
      // Return appropriate content type
      const contentType = fileType === 'html' ? 'text/html' : 'text/plain';
      
      return new NextResponse(fileContent, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (error) {
      // File not found
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error serving secure report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}