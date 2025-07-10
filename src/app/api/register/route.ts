import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  title: z.string().min(2),
  phone: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registrationSchema.parse(body);
    
    // Check if trying to register with admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'tiran@tirandagan.com';
    if (validatedData.email.toLowerCase() === adminEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'This email address is reserved for system administration' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      // If user exists and is pending, send reminder to admin
      if (existingUser.registrationStatus === 'PENDING') {
        // Send reminder to admin
        const { sendAdminReminderNotification } = await import('@/lib/email');
        await sendAdminReminderNotification(existingUser);
        
        return NextResponse.json(
          { 
            error: 'Your registration request is still pending approval. We\'ve sent a reminder to the administrator.',
            isPending: true 
          },
          { status: 400 }
        );
      }
      
      // If user is approved or denied, just indicate they already exist
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Create new user with pending status
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        registrationStatus: 'PENDING',
      },
    });
    
    // Create approval record
    await prisma.registrationApproval.create({
      data: {
        userId: user.id,
        status: 'PENDING',
      },
    });
    
    // Send email notifications
    const { sendAdminNotification, sendRegistrationConfirmation } = await import('@/lib/email');
    await sendAdminNotification(user);
    await sendRegistrationConfirmation(user);
    
    return NextResponse.json({
      message: 'Registration successful! Pending admin approval.',
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}