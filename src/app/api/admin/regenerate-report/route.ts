import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const execAsync = promisify(exec);

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

    // Define paths
    const projectRoot = process.cwd();
    const scriptPath = path.join(projectRoot, 'mdtohtml', 'md2html.py');
    const markdownPath = path.join(projectRoot, 'design', 'comcast_ai_report.md');
    const outputPath = path.join(projectRoot, 'public', 'comcast_ai_report.html');

    // Execute the Python script
    const command = `python3 "${scriptPath}" "${markdownPath}" -o "${outputPath}" --toc-depth 2`;
    
    try {
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && !stderr.includes('✓')) {
        console.error('Conversion stderr:', stderr);
        return NextResponse.json(
          { error: 'Conversion failed', details: stderr },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Report regenerated successfully',
        output: stdout || 'Report generated successfully'
      });
    } catch (execError: any) {
      console.error('Execution error:', execError);
      return NextResponse.json(
        { 
          error: 'Failed to execute conversion script',
          details: execError.message,
          command: command 
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