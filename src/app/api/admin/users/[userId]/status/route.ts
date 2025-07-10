import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const statusSchema = z.object({
  status: z.enum(['APPROVED', 'DENIED']),
});

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const params = await context.params;
    
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
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
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

    const admin = session.user;

    // Parse request body
    const body = await request.json();
    const { status } = statusSchema.parse(body);

    // Update user status
    const user = await prisma.user.update({
      where: { id: params.userId },
      data: { registrationStatus: status },
    });

    // Create approval record
    await prisma.registrationApproval.create({
      data: {
        userId: params.userId,
        approvedBy: admin.id,
        status: status,
      },
    });

    // TODO: Send email notification to user about their approval status
    console.log(`User ${user.email} ${status.toLowerCase()} by ${admin.email}`);

    return NextResponse.json({ 
      message: `User ${status.toLowerCase()} successfully`,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        registrationStatus: user.registrationStatus,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    console.error('Update status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}