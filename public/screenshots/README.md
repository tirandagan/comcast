# Screenshot Instructions for "How This Site Was Made" Chapter

Please create and place the following screenshots in this directory:

## 1. registration-flow.png
**What to capture:** The registration form page
- Show the form with fields: Email, Full Name, Company, Role
- Make sure the "Request Access" button is visible
- Capture in a clean state (no error messages)
- Recommended size: 1200x800px

## 2. magic-link-email.png
**What to capture:** The approval email that users receive
- Show the email with "Your access to Sutherland AI Innovation Report has been approved!"
- Include the blue "Access Platform Now" button
- Can blur/redact actual email addresses
- Recommended size: 800x600px

## 3. admin-dashboard.png
**What to capture:** The admin dashboard overview
- Show the user list table with a few example users
- Include the statistics cards at the top if visible
- Show the "Pending Approvals" section
- Recommended size: 1400x900px

## 4. user-analytics.png
**What to capture:** Analytics or user activity view
- If you have Mixpanel dashboard, show user engagement metrics
- Alternatively, show the user activity section in admin panel
- Include some graphs or charts if available
- Recommended size: 1200x800px

## 5. interactive-charts.png
**What to capture:** Examples of interactive visualizations from the report
- Navigate to any chapter with animated charts (like Executive Summary)
- Capture the Key Company Metrics cards or Revenue Growth chart
- Show hover states if possible
- Recommended size: 1200x600px

## 6. architecture-diagram.png
**What to capture:** Create a simple diagram showing:
```
User Browser → Next.js Frontend → API Routes → Prisma ORM → PostgreSQL Database
                      ↓
                Authentication (JWT + Cookies)
                      ↓
                Email Service (SendGrid)
```
- Can be created in any diagramming tool
- Use the site's color scheme (blues and grays)
- Recommended size: 1000x600px

## File Format Requirements:
- PNG format preferred
- Optimize for web (compress if files are large)
- Use descriptive filenames exactly as specified above
- Place all files directly in the `/public/screenshots/` directory

## Tips:
- Use browser developer tools to capture consistent viewport sizes
- For emails, you can use browser inspector to capture the rendered HTML
- Blur or replace any sensitive information (real email addresses, etc.)
- Ensure screenshots are clear and readable