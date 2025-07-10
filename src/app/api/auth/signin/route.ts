import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendMagicLink } from '@/lib/email';

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = signinSchema.parse(body);
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email' },
        { status: 404 }
      );
    }
    
    // Check if user is banned
    if (user.banned) {
      return NextResponse.json(
        { error: `Account banned: ${user.bannedReason || 'Contact administrator'}` },
        { status: 403 }
      );
    }
    
    // Check if user is approved
    if (user.registrationStatus !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Your registration is pending approval' },
        { status: 403 }
      );
    }
    
    // If password is provided, check if user has password (admin account)
    if (password) {
      if (!user.password) {
        return NextResponse.json(
          { error: 'This account does not use password authentication' },
          { status: 400 }
        );
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        );
      }
      
      // Generate session token for password auth
      const sessionToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
      
      // Create session in database
      const session = await prisma.session.create({
        data: {
          sessionToken,
          userId: user.id,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });
      
      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
      
      // Return success with token
      const response = NextResponse.json({
        message: 'Login successful',
        token: sessionToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
      
      // Set cookie for middleware
      response.cookies.set('auth-token', sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      });
      
      return response;
    }
    
    // Otherwise, send magic link for regular users
    // Always generate a new token for signin requests
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' }
    );
    
    // Update the verification token in database
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken: token },
    });
    
    // Send magic link email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const fullBaseUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    const magicLink = `${fullBaseUrl}/api/auth/verify?token=${token}`;
    
    
    // Send the magic link email
    await sendMagicLink(email, magicLink);
    
    return NextResponse.json({
      message: 'Magic link sent to your email',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }
    
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}