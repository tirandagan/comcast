# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Interactive AI Innovation Microsite built with Next.js 15, showcasing Comcast's strategic AI innovation roadmap. Features user authentication, interactive content visualization, and comprehensive analytics.

## Standard Workflow
1. First think through the problem, read the codebase for relevant files, and write a plan to a file located in design_docs called projectplan.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Every step of the way, just give a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. Whenever you need to sign in, use these credentials: username=tiran@tirandagan.com, password=Sam99sonite

## Common Development Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Database
```bash
npx prisma migrate dev    # Run database migrations (development)
npx prisma db push        # Push schema changes without migration
npx prisma studio         # Open Prisma Studio GUI
npm run db:seed           # Seed database with initial data
```

### Testing
```bash
npm test         # Run tests in watch mode
npm test:ci      # Run tests for CI (no watch)
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript 5.8.3
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: Custom JWT implementation
- **Visualizations**: Chart.js, D3.js, Three.js, Recharts
- **Analytics**: Mixpanel, FullStory, Microsoft Clarity

### Project Structure
```
/src
  /app              # Next.js app directory
    /(auth)         # Auth pages (signin, register)
    /(dashboard)    # Protected pages (report, admin)
    /api            # API routes
  /components       # React components
    /admin          # Admin dashboard components
    /analytics      # Analytics dashboard
    /report         # Report visualization components
  /lib              # Core utilities
    /auth.ts        # Authentication helpers
    /db.ts          # Database client
    /session.ts     # Session management
  /analytics        # Custom analytics SDK
  /hooks            # Custom React hooks
  /types            # TypeScript definitions
```

### Key Architectural Patterns

1. **Authentication Flow**
   - Registration → Admin approval → Email verification → Access granted
   - JWT tokens stored in HTTP-only cookies
   - Middleware-based route protection

2. **Data Flow**
   - Server Components for initial data fetching
   - Client Components for interactivity
   - API routes for mutations and real-time data

3. **Visualization Components**
   - Chapter-specific components (Chapter1-6)
   - Reusable chart components with Framer Motion animations
   - 3D visualizations using React Three Fiber

4. **Analytics Architecture**
   - Custom SDK with offline queue support
   - Event batching for performance
   - Privacy-compliant tracking with user consent

### Database Schema Highlights
- **User System**: Registration, roles (USER/ADMIN), sessions
- **Content**: Chapters, sections with hierarchical structure
- **Interactions**: Progress tracking, annotations, bookmarks
- **Analytics**: Event tracking, aggregated metrics

### Environment Configuration
Key environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Authentication secret
- `NEXT_PUBLIC_APP_URL`: Application URL
- `SMTP_*`: Email service configuration
- Feature flags for email/registration behavior

### Development Guidelines
- Use absolute imports from `@/` for consistency
- Implement error boundaries for visualization components
- Follow existing component patterns for new features
- Test database changes locally before deploying
- Use the custom analytics SDK for tracking user interactions

## Important Instruction Reminders
- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested