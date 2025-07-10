import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Helper function to ensure URL has protocol
function getBaseUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

export async function GET(request: NextRequest) {
  console.log('Magic link verification started');
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    console.log('Token received:', token ? 'yes' : 'no');
    
    if (!token) {
      const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_APP_URL || request.url);
      const redirectUrl = new URL('/signin?error=missing-token', baseUrl);
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
      console.error('JWT verification error:', error);
      const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_APP_URL || request.url);
      const redirectUrl = new URL('/signin?error=invalid-token', baseUrl);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Find user
    let user;
    
    console.log('Looking up user with decoded token:', { userId: decoded.userId, email: decoded.email, type: decoded.type });
    
    try {
      if (decoded.type === 'approval') {
      console.log('Processing approval token');
      // For approval tokens, just verify the user exists and is approved
      user = await prisma.user.findFirst({
        where: { 
          id: decoded.userId,
          email: decoded.email,
          registrationStatus: 'APPROVED'
        },
      });
      
      console.log('Approval token user lookup result:', user ? 'found' : 'not found');
      
      if (!user) {
        // Check why user wasn't found
        const userCheck = await prisma.user.findUnique({
          where: { id: decoded.userId }
        });
        console.log('User debug info:', userCheck ? {
          id: userCheck.id,
          email: userCheck.email,
          registrationStatus: userCheck.registrationStatus
        } : 'User not found at all');
        
        const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_APP_URL || request.url);
        const redirectUrl = new URL('/signin?error=invalid-token', baseUrl);
        return NextResponse.redirect(redirectUrl);
      }
    } else {
      // For standard magic links, verify token matches
      console.log('Looking for user with verification token');
      user = await prisma.user.findUnique({
        where: { 
          id: decoded.userId,
          verificationToken: token,
        },
      });
      
      if (!user) {
        console.log('User not found with token. Checking if user exists without token match...');
        const userExists = await prisma.user.findUnique({
          where: { id: decoded.userId }
        });
        console.log('User exists?', !!userExists, userExists ? { hasToken: !!userExists.verificationToken } : null);
        
        const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_APP_URL || request.url);
        const redirectUrl = new URL('/signin?error=invalid-token', baseUrl);
        return NextResponse.redirect(redirectUrl);
      }
    }
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      throw dbError;
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
    console.log('Creating session for user:', user.id);
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
    
    try {
      // First, delete any existing sessions for this user to avoid conflicts
      await prisma.session.deleteMany({
        where: { userId: user.id }
      });
      
      await prisma.session.create({
        data: {
          sessionToken,
          userId: user.id,
          expires: expiresAt,
        },
      });
      console.log('Session created successfully');
    } catch (sessionError) {
      console.error('Error creating session:', sessionError);
      // Log more details about the error
      if (sessionError instanceof Error) {
        console.error('Error details:', {
          message: sessionError.message,
          name: sessionError.name,
          stack: sessionError.stack
        });
      }
      throw sessionError;
    }
    
    // Create redirect response with cookie
    const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_APP_URL || request.url);
    const successUrl = new URL('/report', baseUrl);
    // Add auth callback parameter to bypass middleware on first load
    successUrl.searchParams.set('auth', 'callback');
    // Add user info for analytics
    successUrl.searchParams.set('uid', user.id);
    successUrl.searchParams.set('email', user.email);
    
    const response = NextResponse.redirect(successUrl);
    
    // Set cookie on the response with all necessary flags
    const isProduction = process.env.NODE_ENV === 'production';
    response.cookies.set({
      name: 'auth-token',
      value: sessionToken,
      httpOnly: true,
      secure: isProduction, // Only use secure in production
      sameSite: isProduction ? 'lax' : 'lax', // Use 'lax' for better compatibility
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      domain: undefined // Let the browser handle the domain
    });
    
    return response;
  } catch (error) {
    console.error('Magic link verification error:', error);
    const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_APP_URL || request.url);
    const errorUrl = new URL('/signin?error=verification-failed', baseUrl);
    return NextResponse.redirect(errorUrl);
  }
}