import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const approvalSchema = z.object({
  token: z.string(),
  action: z.enum(['approve', 'deny']),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const action = searchParams.get('action');
    
    if (!token || !action) {
      return NextResponse.json(
        { error: 'Missing token or action' },
        { status: 400 }
      );
    }
    
    // Validate action
    if (action !== 'approve' && action !== 'deny') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
    
    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Check if this is an admin approval token
    if (decoded.type !== 'admin-approval' || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token type' },
        { status: 401 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update user status
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        registrationStatus: action === 'approve' ? 'APPROVED' : 'DENIED',
      },
    });
    
    // Update or create approval record
    try {
      const existingApproval = await prisma.registrationApproval.findFirst({
        where: { 
          userId: decoded.userId,
          status: 'PENDING'
        }
      });
      
      if (existingApproval) {
        await prisma.registrationApproval.update({
          where: { id: existingApproval.id },
          data: {
            status: action === 'approve' ? 'APPROVED' : 'DENIED',
            approvedBy: decoded.adminId,
          },
        });
      } else {
        // Create new approval record if none exists
        await prisma.registrationApproval.create({
          data: {
            userId: decoded.userId,
            status: action === 'approve' ? 'APPROVED' : 'DENIED',
            approvedBy: decoded.adminId,
          },
        });
      }
    } catch (error) {
      // Continue anyway - user status is already updated
    }
    
    // Send appropriate email
    const { sendApprovalEmail, sendMagicLink } = await import('@/lib/email');
    
    if (action === 'approve') {
      // Generate magic link for immediate sign-in
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET not configured');
      }
      
      const signInToken = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          type: 'approval' // Mark this as an approval token
        },
        jwtSecret,
        { expiresIn: '24h' } // Longer expiry for welcome sign-in
      );
      
      // Store the verification token in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { verificationToken: signInToken }
      });
      
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const magicLink = `${baseUrl}/api/auth/verify?token=${signInToken}`;
      await sendApprovalEmail(user.email, true, magicLink, user.name);
    } else {
      await sendApprovalEmail(user.email, false, undefined, user.name);
    }
    
    // Return HTML response for better UX
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${action === 'approve' ? 'User Approved' : 'User Denied'}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 400px;
            }
            h1 {
              color: ${action === 'approve' ? '#10b981' : '#ef4444'};
              margin: 0 0 20px 0;
            }
            p {
              color: #475569;
              line-height: 1.6;
            }
            .icon {
              font-size: 48px;
              margin-bottom: 20px;
            }
            a {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 24px;
              background: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            }
            a:hover {
              background: #2563eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">${action === 'approve' ? '✅' : '❌'}</div>
            <h1>User ${action === 'approve' ? 'Approved' : 'Denied'} Successfully</h1>
            <p>
              <strong>${updatedUser.name}</strong> (${updatedUser.email}) has been ${action === 'approve' ? 'approved' : 'denied'}.
              ${action === 'approve' 
                ? 'They have been sent a welcome email with a magic link to sign in.' 
                : 'They have been notified of the decision.'}
            </p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/dashboard">Go to Admin Dashboard</a>
          </div>
        </body>
      </html>
    `;
    
    return new NextResponse(html, {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      },
    });
    
  } catch (error) {
    console.error('Approval error:', error);
    return NextResponse.json(
      { error: 'Failed to process approval' },
      { status: 500 }
    );
  }
}