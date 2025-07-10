import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    
    if (!token) {
      const redirectUrl = new URL('/signin?error=missing-token', process.env.NEXT_PUBLIC_APP_URL || request.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Verify JWT token
    let decoded;
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET not configured');
      }
      
      decoded = jwt.verify(token, jwtSecret) as {
        userId: string;
        email: string;
        type?: string;
      };
    } catch (error) {
      const redirectUrl = new URL('/signin?error=invalid-token', process.env.NEXT_PUBLIC_APP_URL || request.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Find user
    let user;
    
    if (decoded.type === 'approval') {
      // For approval tokens, just verify the user exists and is approved
      user = await prisma.user.findFirst({
        where: { 
          id: decoded.userId,
          email: decoded.email,
          registrationStatus: 'APPROVED'
        },
      });
      
      if (!user) {
        const redirectUrl = new URL('/signin?error=invalid-token', process.env.NEXT_PUBLIC_APP_URL || request.url);
        return NextResponse.redirect(redirectUrl);
      }
    } else {
      // For standard magic links, verify token matches
      user = await prisma.user.findUnique({
        where: { 
          id: decoded.userId,
          verificationToken: token,
        },
      });
      
      if (!user) {
        const redirectUrl = new URL('/signin?error=invalid-token', process.env.NEXT_PUBLIC_APP_URL || request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
    
    // Clear the verification token (only for standard magic links, not approval tokens)
    if (decoded.type !== 'approval') {
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          verificationToken: null,
          lastLoginAt: new Date(),
        },
      });
    } else {
      // For approval tokens, just update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          lastLoginAt: new Date(),
        },
      });
    }
    
    // Create session
    const sessionToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    // Store session in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires: expiresAt,
      },
    });
    
    // Create redirect response with cookie
    const successUrl = new URL('/report', process.env.NEXT_PUBLIC_APP_URL || request.url);
    // Add auth callback parameter to bypass middleware on first load
    successUrl.searchParams.set('auth', 'callback');
    // Add user info for analytics
    successUrl.searchParams.set('uid', user.id);
    successUrl.searchParams.set('email', user.email);
    
    const response = NextResponse.redirect(successUrl);
    
    // Set cookie on the response with all necessary flags
    response.cookies.set({
      name: 'auth-token',
      value: sessionToken,
      httpOnly: true,
      secure: true, // Always use secure in production
      sameSite: 'none', // Required for Safari when secure is true
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      domain: undefined // Let the browser handle the domain
    });
    
    return response;
  } catch (error) {
    const errorUrl = new URL('/signin?error=verification-failed', process.env.NEXT_PUBLIC_APP_URL || request.url);
    return NextResponse.redirect(errorUrl);
  }
}