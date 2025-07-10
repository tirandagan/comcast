import { NextRequest, NextResponse } from 'next/server';
import { getChapterBySlug as getChapterFromParser } from '@/lib/report-parser';
import { getChapterWithSections } from '@/lib/report-content';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    
    // Verify authentication using cookies
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let decoded: any;
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get chapter content - try parser first for better content preservation
    let chapter = getChapterFromParser(params.slug);
    
    // Fallback to original method if not found
    if (!chapter) {
      chapter = getChapterWithSections(params.slug);
    }
    
    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    // Track user activity (only if user exists)
    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
      
      if (user) {
        await prisma.userActivity.create({
          data: {
            userId: decoded.userId,
            activityType: 'PAGE_VIEW',
            metadata: JSON.stringify({
              chapter: chapter.title,
              slug: chapter.slug,
              timestamp: new Date().toISOString(),
            }),
          },
        });
      }
    } catch (error) {
      // Don't fail the request if activity tracking fails
      console.error('Activity tracking error:', error);
    }

    return NextResponse.json({ chapter });
  } catch (error) {
    console.error('Report chapter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}