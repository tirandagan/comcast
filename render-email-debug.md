# Email Configuration for Render Deployment

## Required Environment Variables

Make sure these environment variables are set in your Render dashboard:

```
ENABLE_EMAIL_NOTIFICATIONS=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tiran@6footmedia.com
SMTP_PASS=your-app-password-here
SMTP_FROM="Sutherland AI Innovation" <noreply@sutherland.com>
ADMIN_EMAIL=tiran@tirandagan.com
```

## Gmail App Password Setup

1. Go to https://myaccount.google.com/apppasswords
2. Sign in to your Google Account
3. Click "Select app" and choose "Mail"
4. Click "Select device" and choose "Other (Custom name)"
5. Enter "Sutherland Render" as the name
6. Click "Generate"
7. Copy the 16-character password (without spaces)
8. Use this password for SMTP_PASS

## Common Issues

### Issue: Emails show as sent but not received

**Possible causes:**
1. **Gmail blocking Render's IP**: Gmail may block emails from cloud providers
2. **App password issues**: The app password might need to be regenerated
3. **Environment variable formatting**: Make sure there are no quotes around the values in Render

**Solutions:**

1. **Use SendGrid or another email service** (Recommended for production):
   - SendGrid offers 100 free emails/day
   - More reliable for cloud deployments
   - Better deliverability

2. **Enable "Less secure app access"** (Not recommended):
   - This is being phased out by Google
   - Use app passwords instead

3. **Check spam folder**:
   - Emails from new sources often go to spam

4. **Verify environment variables**:
   - In Render dashboard, go to Environment tab
   - Make sure all values are set correctly
   - Remove any quotes from the values

### Issue: SMTP connection fails

Add these debug environment variables temporarily:
```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Alternative: SendGrid Setup

If Gmail continues to have issues, consider using SendGrid:

1. Sign up at https://sendgrid.com
2. Create an API key
3. Update environment variables:
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## Testing

After deployment, check the Render logs for:
- "✅ Registration confirmation email sent successfully" - Email was sent
- "📧 Email notifications disabled" - ENABLE_EMAIL_NOTIFICATIONS is not set to true
- "❌ Failed to send registration confirmation email" - SMTP error occurred

The logs show successful sending but you're not receiving emails, which suggests the SMTP connection is working but emails are being blocked or filtered.