import { sendMagicLink } from './lib/email';

async function testEmail() {
  console.log('Testing email functionality...\n');
  
  const testEmail = process.env.SMTP_USER || 'test@example.com';
  const testLink = 'http://localhost:3000/test-magic-link';
  
  try {
    console.log(`Sending test email to: ${testEmail}`);
    await sendMagicLink(testEmail, testLink);
    console.log('\n✅ Test email sent successfully!');
    console.log('Check your inbox for the magic link email.');
  } catch (error: any) {
    console.error('\n❌ Error sending email:', error.message);
    
    if (error.message.includes('EAUTH')) {
      console.log('\nTroubleshooting tips for Gmail:');
      console.log('1. Enable 2-factor authentication on your Google account');
      console.log('2. Generate an app-specific password at:');
      console.log('   https://myaccount.google.com/apppasswords');
      console.log('3. Use the app password as SMTP_PASS in your .env file');
    }
  }
}

testEmail();