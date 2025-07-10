// Check if email notifications are enabled
const EMAIL_ENABLED = process.env.ENABLE_EMAIL_NOTIFICATIONS?.replace(/['"]/g, '') === 'true';

// Helper function to get the base URL
function getBaseUrl() {
  // Use NEXT_PUBLIC_APP_URL which works in both client and server
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

// Create reusable transporter
const createTransporter = async () => {
  if (!EMAIL_ENABLED) return null;
  
  // Check for required environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Missing required SMTP environment variables');
    console.log('Required: SMTP_HOST, SMTP_USER, SMTP_PASS');
    console.log('Current values:', {
      SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
      SMTP_USER: process.env.SMTP_USER || 'NOT SET',
      SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'NOT SET',
    });
    return null;
  }
  
  // SendGrid configuration
  const isUsingSendGrid = process.env.SMTP_HOST === 'smtp.sendgrid.net';
  
  const config: any = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // false for TLS/STARTTLS on port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
  
  // Add TLS settings based on provider
  if (isUsingSendGrid) {
    // SendGrid specific settings
    console.log('📧 Using SendGrid configuration');
  } else {
    // Gmail and other providers
    config.requireTLS = true;
    config.tls = {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    };
  }
  
  try {
    // Dynamic import for server-side only
    const nodemailer = await import('nodemailer');
    return nodemailer.createTransport(config);
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error);
    return null;
  }
};

export async function sendMagicLink(email: string, magicLink: string) {
  console.log(`
    ========================================
    MAGIC LINK EMAIL
    ========================================
    To: ${email}
    Subject: Your Exclusive Access to Sutherland's AI Innovation Journey
    
    Click this link to sign in:
    ${magicLink}
    
    This link will expire in 15 minutes.
    ========================================
  `);
  
  // Debug logging
  if (!EMAIL_ENABLED) {
    console.log('📧 Email notifications disabled. Magic link printed above ☝️');
    console.log('To enable emails: Set ENABLE_EMAIL_NOTIFICATIONS=true and configure Gmail app password');
    return;
  }
  
  console.log('Attempting to send email via SMTP...');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  
  try {
    const transporter = await createTransporter();
    if (!transporter) return;
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sutherland AI Innovation" <noreply@sutherland.com>',
      to: email,
      subject: '🚀 Your Exclusive Access to Sutherland\'s AI Innovation Journey',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #1e293b; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Welcome to the Future</h1>
            <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 18px;">Sutherland AI Innovation Microsite</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">You're One Click Away from Accessing:</h2>
            
            <ul style="color: #475569; line-height: 1.8; font-size: 16px; margin: 0 0 30px 0;">
              <li><strong>🧠 AI-Powered Transformation Strategy</strong> - Discover how Sutherland is revolutionizing BPO with cutting-edge AI</li>
              <li><strong>📊 Interactive Data Visualizations</strong> - Explore dynamic charts and insights about our innovation journey</li>
              <li><strong>🚀 Industry-Specific Solutions</strong> - Deep dive into AI applications across Healthcare, BFSI, CMT, and Retail</li>
              <li><strong>💡 Innovation Roadmap</strong> - Get exclusive access to our strategic implementation timeline</li>
              <li><strong>🤝 Partnership Opportunities</strong> - Learn about our ecosystem approach to AI innovation</li>
            </ul>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${magicLink}" style="display: inline-block; background: #3b82f6; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);">
                🔗 Sign In with Magic Link
              </a>
            </div>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                <strong>🔒 Secure Link:</strong> This magic link is unique to you and expires in 15 minutes for your security.
              </p>
            </div>
            
            <p style="color: #94a3b8; font-size: 14px; margin: 20px 0;">Can't click the button? Copy and paste this link into your browser:</p>
            <p style="color: #3b82f6; font-size: 14px; word-break: break-all; background: #f1f5f9; padding: 12px; border-radius: 6px;">${magicLink}</p>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              © 2024 Sutherland Global Services. Transforming businesses through AI innovation.
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 0 0;">
              If you didn't request this email, you can safely ignore it.
            </p>
          </div>
        </div>
      `,
    });
    
    console.log('✅ Magic link email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

export async function sendAdminNotification(user: {
  email: string;
  name: string;
  title: string;
  phone: string;
  id: string;
}) {
  console.log(`
    ========================================
    ADMIN NOTIFICATION
    ========================================
    To: ${process.env.ADMIN_EMAIL || 'tiran@tirandagan.com'}
    Subject: New Registration Pending Approval
    
    A new user has registered:
    Name: ${user.name}
    Email: ${user.email}
    Title: ${user.title}
    Phone: ${user.phone}
    
    Please review and approve/deny the registration.
    ========================================
  `);
  
  if (!EMAIL_ENABLED) {
    console.log('📧 Email notifications disabled. Enable ENABLE_EMAIL_NOTIFICATIONS in .env');
    return;
  }
  
  try {
    const transporter = await createTransporter();
    if (!transporter) return;
    
    const baseUrl = getBaseUrl();
    
    // Generate approval tokens
    const jwt = (await import('jsonwebtoken')).default;
    const adminId = 'admin-email-approval'; // Special ID for email approvals
    
    const approveToken = jwt.sign(
      { userId: user.id, adminId, type: 'admin-approval' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    const denyToken = jwt.sign(
      { userId: user.id, adminId, type: 'admin-approval' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    const approveLink = `${baseUrl}/api/admin/approve?token=${approveToken}&action=approve`;
    const denyLink = `${baseUrl}/api/admin/approve?token=${denyToken}&action=deny`;
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sutherland AI Innovation" <noreply@sutherland.com>',
      to: process.env.ADMIN_EMAIL || 'tiran@tirandagan.com',
      subject: '👤 New Registration Pending Approval - Sutherland AI Innovation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #1e293b; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">New Registration Request</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #475569; font-size: 16px; margin: 0 0 20px 0;">A new user has registered for the Sutherland AI Innovation Microsite:</p>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Job Title:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.title}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.phone}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #475569; font-size: 16px; margin: 30px 0 20px 0; text-align: center;">
              <strong>Quick Actions - Click to approve or deny:</strong>
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${approveLink}" style="display: inline-block; background: #10b981; color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 10px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);">
                ✅ Approve User
              </a>
              <a href="${denyLink}" style="display: inline-block; background: #ef4444; color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 10px; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);">
                ❌ Deny User
              </a>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 30px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>🔐 Secure Links:</strong> These magic links will approve or deny the user instantly without requiring you to sign in. Links expire in 7 days.
              </p>
            </div>
            
            <p style="color: #94a3b8; font-size: 14px; text-align: center; margin: 20px 0 0 0;">
              Or manage all users in the <a href="${baseUrl}/admin/dashboard" style="color: #3b82f6; text-decoration: none;">Admin Dashboard</a>
            </p>
          </div>
        </div>
      `,
    });
    
    console.log('✅ Admin notification email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send admin notification email:', error);
  }
}

export async function sendApprovalEmail(email: string, approved: boolean, magicLink?: string) {
  const subject = approved ? 'Registration Approved' : 'Registration Denied';
  const message = approved 
    ? 'Great news! Your registration has been approved.'
    : 'Thank you for your interest in the Sutherland AI Innovation Microsite.';
    
  console.log(`
    ========================================
    REGISTRATION STATUS EMAIL
    ========================================
    To: ${email}
    Subject: ${subject}
    
    ${message}
    ${approved && magicLink ? `Magic Link: ${magicLink}` : ''}
    ========================================
  `);
  
  if (!EMAIL_ENABLED) {
    console.log('📧 Email notifications disabled. Enable ENABLE_EMAIL_NOTIFICATIONS in .env');
    return;
  }
  
  try {
    const transporter = await createTransporter();
    if (!transporter) return;
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sutherland AI Innovation" <noreply@sutherland.com>',
      to: email,
      subject: approved ? '🎉 ' + subject + ' - Welcome to Sutherland AI Innovation!' : '📋 ' + subject,
      html: approved ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #10b981; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
            <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Welcome Aboard!</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 18px;">Your registration has been approved</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #1e293b; font-size: 18px; margin: 0 0 20px 0;">Dear User,</p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              Congratulations! Tiran has approved your registration to access the exclusive Sutherland AI Innovation Microsite. You now have full access to explore our comprehensive AI transformation strategy.
            </p>
            
            ${magicLink ? `
              <div style="text-align: center; margin: 40px 0;">
                <p style="color: #475569; margin: 0 0 20px 0;">Click the button below to instantly access the platform:</p>
                <a href="${magicLink}" style="display: inline-block; background: #3b82f6; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);">
                  🚀 Access Platform Now
                </a>
              </div>
              
              <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
                <p style="color: #1e3a8a; font-size: 14px; margin: 0;">
                  <strong>🔗 One-Click Access:</strong> This magic link will sign you in automatically. No password needed! Link expires in 24 hours.
                </p>
              </div>
            ` : `
              <div style="text-align: center; margin: 40px 0;">
                <a href="${getBaseUrl()}/signin" style="display: inline-block; background: #3b82f6; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;">
                  Sign In to Get Started
                </a>
              </div>
            `}
            
            <h3 style="color: #1e293b; margin: 30px 0 20px 0;">What's waiting for you inside:</h3>
            
            <ul style="color: #475569; line-height: 1.8; margin: 0 0 30px 0;">
              <li>📊 Interactive visualizations of AI transformation strategies</li>
              <li>🏥 Industry-specific AI solutions for Healthcare, BFSI, CMT & Retail</li>
              <li>🗺️ Detailed implementation roadmaps and timelines</li>
              <li>🤝 Partnership ecosystem strategies</li>
              <li>📈 ROI projections and success metrics</li>
            </ul>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              We're excited to share this innovative journey with you. Dive in and explore how Sutherland is revolutionizing the BPO industry with AI!
            </p>
          </div>
        </div>
      ` : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #dc2626; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Registration Status Update</h1>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #1e293b; font-size: 16px; margin: 0 0 20px 0;">
              Thank you for your interest in the Sutherland AI Innovation Microsite.
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              After reviewing your registration, we're unable to grant access at this time. This exclusive platform is currently limited to Sutherland stakeholders and strategic partners.
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              We appreciate your understanding and interest in our AI innovation journey.
            </p>
          </div>
        </div>
      `,
    });
    
    console.log('✅ Approval status email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send approval email:', error);
  }
}

export async function sendAdminReminderNotification(user: {
  id: string;
  email: string;
  name: string;
  title: string;
  phone: string;
  createdAt: Date;
}) {
  console.log(`
    ========================================
    ADMIN REMINDER NOTIFICATION
    ========================================
    To: ${process.env.ADMIN_EMAIL || 'tiran@tirandagan.com'}
    Subject: Reminder: Pending Registration Approval
    
    User ${user.name} is still waiting for approval.
    They attempted to register again.
    Originally registered: ${user.createdAt}
    ========================================
  `);
  
  if (!EMAIL_ENABLED) {
    console.log('📧 Email notifications disabled. Enable ENABLE_EMAIL_NOTIFICATIONS in .env');
    return;
  }
  
  try {
    const transporter = await createTransporter();
    if (!transporter) return;
    
    const baseUrl = getBaseUrl();
    
    // Generate approval tokens
    const jwt = (await import('jsonwebtoken')).default;
    const adminId = 'admin-email-approval';
    
    const approveToken = jwt.sign(
      { userId: user.id, adminId, type: 'admin-approval' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    const denyToken = jwt.sign(
      { userId: user.id, adminId, type: 'admin-approval' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    const approveLink = `${baseUrl}/api/admin/approve?token=${approveToken}&action=approve`;
    const denyLink = `${baseUrl}/api/admin/approve?token=${denyToken}&action=deny`;
    
    // Calculate wait time
    const waitTime = new Date().getTime() - new Date(user.createdAt).getTime();
    const waitDays = Math.floor(waitTime / (1000 * 60 * 60 * 24));
    const waitHours = Math.floor((waitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sutherland AI Innovation" <noreply@sutherland.com>',
      to: process.env.ADMIN_EMAIL || 'tiran@tirandagan.com',
      subject: '⏰ Reminder: User Still Waiting for Approval - Sutherland AI Innovation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #f59e0b; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">⏰ Approval Reminder</h1>
            <p style="color: #fef3c7; margin: 10px 0 0 0; font-size: 16px;">User is still waiting for approval</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 0 0 20px 0;">
              <p style="margin: 0; color: #92400e; font-weight: bold;">
                This user attempted to register again and has been waiting for ${waitDays > 0 ? `${waitDays} day${waitDays > 1 ? 's' : ''} and ` : ''}${waitHours} hour${waitHours !== 1 ? 's' : ''}.
              </p>
            </div>
            
            <p style="color: #475569; font-size: 16px; margin: 0 0 20px 0;">The following user is still pending approval:</p>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Job Title:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.title}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${user.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;"><strong>Originally Registered:</strong></td>
                  <td style="padding: 8px 0; color: #1e293b;">${new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #475569; font-size: 16px; margin: 30px 0 20px 0; text-align: center;">
              <strong>Quick Actions - Click to approve or deny:</strong>
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${approveLink}" style="display: inline-block; background: #10b981; color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 10px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);">
                ✅ Approve User
              </a>
              <a href="${denyLink}" style="display: inline-block; background: #ef4444; color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 10px; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);">
                ❌ Deny User
              </a>
            </div>
            
            <p style="color: #94a3b8; font-size: 14px; text-align: center; margin: 20px 0 0 0;">
              Or manage all users in the <a href="${baseUrl}/admin/dashboard" style="color: #3b82f6; text-decoration: none;">Admin Dashboard</a>
            </p>
          </div>
        </div>
      `,
    });
    
    console.log('✅ Admin reminder notification email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send admin reminder notification email:', error);
  }
}

export async function sendRegistrationConfirmation(user: {
  email: string;
  name: string;
  title: string;
  phone: string;
}) {
  console.log(`
    ========================================
    REGISTRATION CONFIRMATION EMAIL
    ========================================
    To: ${user.email}
    Subject: Welcome to Sutherland's AI Innovation Journey - Registration Received
    
    Thank you for registering, ${user.name}!
    Your registration is being reviewed by Tiran.
    ========================================
  `);
  
  if (!EMAIL_ENABLED) {
    console.log('📧 Email notifications disabled. Enable ENABLE_EMAIL_NOTIFICATIONS in .env');
    console.log('Current value of ENABLE_EMAIL_NOTIFICATIONS:', process.env.ENABLE_EMAIL_NOTIFICATIONS);
    return;
  }
  
  try {
    const transporter = await createTransporter();
    if (!transporter) {
      console.log('❌ Failed to create transporter - check SMTP settings');
      return;
    }
    
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sutherland AI Innovation" <noreply@sutherland.com>',
      to: user.email,
      subject: '🎉 Welcome to Sutherland\'s AI Innovation Journey - Registration Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #1e293b; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Thank You for Your Interest!</h1>
            <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 18px;">Your registration has been received</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #1e293b; font-size: 18px; margin: 0 0 20px 0;">Dear ${user.name},</p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for registering to access Sutherland's exclusive AI Innovation Microsite. We're thrilled about your interest in our transformative journey!
            </p>
            
            <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 18px;">What Happens Next?</h3>
              <p style="color: #475569; margin: 0; line-height: 1.6;">
                <strong>Tiran Dagan</strong>, our Global Head of Industry & Product Innovation, personally reviews each registration to ensure exclusive access to qualified professionals. Your registration will be reviewed shortly, typically within 24 hours.
              </p>
            </div>
            
            <h3 style="color: #1e293b; margin: 30px 0 20px 0; font-size: 20px;">What You'll Discover Inside:</h3>
            
            <div style="display: table; width: 100%; margin: 0 0 30px 0;">
              <div style="display: table-row;">
                <div style="display: table-cell; padding: 15px; vertical-align: top;">
                  <div style="background: #fef3c7; padding: 20px; border-radius: 8px; height: 100%;">
                    <h4 style="color: #92400e; margin: 0 0 10px 0;">🧠 AI Strategy</h4>
                    <p style="color: #78350f; font-size: 14px; margin: 0;">Comprehensive roadmap for AI-powered transformation in BPO</p>
                  </div>
                </div>
                <div style="display: table-cell; padding: 15px; vertical-align: top;">
                  <div style="background: #dbeafe; padding: 20px; border-radius: 8px; height: 100%;">
                    <h4 style="color: #1e3a8a; margin: 0 0 10px 0;">📊 Interactive Insights</h4>
                    <p style="color: #1e40af; font-size: 14px; margin: 0;">Dynamic visualizations of our innovation metrics and progress</p>
                  </div>
                </div>
              </div>
              <div style="display: table-row;">
                <div style="display: table-cell; padding: 15px; vertical-align: top;">
                  <div style="background: #d1fae5; padding: 20px; border-radius: 8px; height: 100%;">
                    <h4 style="color: #064e3b; margin: 0 0 10px 0;">🚀 Industry Solutions</h4>
                    <p style="color: #065f46; font-size: 14px; margin: 0;">Tailored AI applications for Healthcare, BFSI, CMT, and Retail</p>
                  </div>
                </div>
                <div style="display: table-cell; padding: 15px; vertical-align: top;">
                  <div style="background: #fce7f3; padding: 20px; border-radius: 8px; height: 100%;">
                    <h4 style="color: #831843; margin: 0 0 10px 0;">🤝 Partnership Ecosystem</h4>
                    <p style="color: #9f1239; font-size: 14px; margin: 0;">Collaboration opportunities with leading technology partners</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h4 style="color: #1e293b; margin: 0 0 10px 0;">Your Registration Details:</h4>
              <table style="width: 100%; color: #475569; font-size: 14px;">
                <tr>
                  <td style="padding: 5px 0;"><strong>Name:</strong></td>
                  <td style="padding: 5px 0;">${user.name}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Email:</strong></td>
                  <td style="padding: 5px 0;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Title:</strong></td>
                  <td style="padding: 5px 0;">${user.title}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Phone:</strong></td>
                  <td style="padding: 5px 0;">${user.phone}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 30px 0;">
              Once approved, you'll receive an email with your magic link to access the platform. We look forward to sharing our innovation journey with you!
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 40px;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                <strong>Questions?</strong> Feel free to reach out to our team.<br>
                This is an automated message, but we're real people excited about AI innovation!
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              © 2024 Sutherland Global Services. Transforming businesses through AI innovation.
            </p>
          </div>
        </div>
      `,
    });
    
    console.log('✅ Registration confirmation email sent successfully');
    console.log('Message ID:', info.messageId);
    console.log('Accepted recipients:', info.accepted);
    console.log('Rejected recipients:', info.rejected);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Failed to send registration confirmation email:', error);
  }
}