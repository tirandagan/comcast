# Release Notes

## Version 1.0.0 - Initial Release (January 10, 2025)

### Features
- **Interactive Report Viewer**: Transform 50+ page strategic report into interactive web experience
- **Secure Authentication**: Magic link authentication with admin approval workflow
- **Data Visualizations**: Interactive charts, graphs, and animations for each chapter
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Admin Dashboard**: User management and approval system

### Chapters Implemented
1. **Executive Summary**: Current state analysis with data metrics
2. **Market Opportunity**: SWOT analysis with interactive overlays
3. **Technical Foundation**: Platform architecture visualizations
4. **AI Use Cases Portfolio**: Interactive matrix and ROI projections
5. **Building the AI-First Organization**: ISG model visualization
6. **Economic Impact**: Financial projections and timelines

### Technology Stack
- Next.js 15.3.5 with App Router
- TypeScript 5.8.3
- Supabase (PostgreSQL database)
- Tailwind CSS with Framer Motion
- Recharts, D3.js, Three.js for visualizations
- Deployed on Render.com

### Known Issues
- None at this time

---

## Version 1.1.0 - Enhancements & Fixes (January 10, 2025)

### New Features
- **"How This Site Was Built" Page**: Detailed documentation of the development process
- **About Modal**: Developer information and technology stack details
- **Animation Improvements**: Stable animations that don't restart on tab switches
- **Release Notes Modal**: Beautiful overlay displaying version history from About dialog
- **Claude Code Integration**: Added to technology stack with icon in About modal

### Improvements
- Fixed Chapter 5 syntax error with JSX elements
- Improved ISG Model visualization with hub-and-spoke design
- Enhanced ACE (AI Center of Excellence) graphics
- Better error handling for JWT authentication
- Removed all Sutherland references, updated to Comcast branding
- Refactored Chapter5 component for better performance using conditional rendering
- Updated viewport animation settings for smoother transitions

### Bug Fixes
- Fixed "Cell is not defined" error in Chapter 5
- Resolved magic link verification issues (JWT malformed/expired)
- Fixed animation restart issues across all pages
- Corrected TypeScript build errors
- Fixed deployment issues by replacing Python dependencies with Node.js
- Fixed TypeScript type errors for Render deployment (ease property, margin type)

### UI/UX Updates
- Replaced inline contact info with clean About modal
- Added help button (?) in navigation sidebar
- Improved SWOT analysis with overlay modals
- Enhanced talent strategy from fixed numbers to demand-based scaling
- Added "View Release Notes" button in AboutModal for easy access
- Implemented state management for ReleaseNotesModal visibility

### Performance
- Optimized animation performance with display-based visibility
- Reduced re-renders with stable animation hooks
- Improved build times with proper TypeScript configurations
- Converted Chapter5 talent, culture, and metrics views from AnimatePresence to style-based rendering

### mdtohtml Utility Updates
- **Copy to Clipboard Feature**: Renamed "Share" button to "Copy to Clipboard"
- **Markdown Source Copy**: Entire markdown text can now be copied to clipboard
- **Visual Feedback**: Added animated notification when markdown is copied successfully
- **Improved Icons**: Updated clipboard icon for better visual clarity

---

## Version 1.1.1 - mdtohtml Enhancements (January 10, 2025)

### New Features
- **Advanced Search Functionality**: 
  - Real-time search with yellow highlighting
  - Navigation buttons to move between matches
  - Match counter showing current position (e.g., "3 / 10")
  - Keyboard shortcuts: Enter for next match, Shift+Enter for previous, Escape to clear
  - Clear search button
  - Case-insensitive search with minimum 2 characters

- **Floating Action Buttons**:
  - Print and Copy buttons now float at bottom-right of page
  - Semi-transparent circular design with backdrop blur
  - Hover tooltips showing "Print" and "Copy"
  - Smooth hover animations with scale and glow effects
  - Always visible for easy access
  - Responsive sizing on mobile devices

### Improvements
- **Fixed Dark Theme Styling**:
  - Resolved white background issues in main content area
  - Fixed table of contents visibility in sidebar
  - Improved content width by removing restrictive margins
  - Enhanced dark theme consistency throughout the document
  - Better contrast for readability

- **Output File Handling**:
  - Verified output folder functionality works correctly
  - Can specify custom output directories with -o flag

### UI/UX Updates
- **Search Navigation UI**:
  - Compact navigation controls in search box
  - Previous/Next arrow buttons
  - Visual distinction between regular and current match (orange highlight)
  - Smooth scrolling to matches

- **Button Text Simplification**:
  - Changed "Copy to Clipboard" to "Copy" for cleaner UI
  - Tooltips provide additional context on hover

### Technical Improvements
- Enhanced text node traversal for accurate highlighting
- Improved search performance with proper DOM manipulation
- Better handling of text normalization after clearing highlights
- Floating buttons hidden during print for clean output

---

## Version 1.1.2 - Copy Options Enhancement (January 10, 2025)

### New Features
- **Copy Format Selection Modal**:
  - Beautiful overlay dialog when clicking copy button
  - Two copy options: Rich Formatted Text and Markdown Source
  - Rich text preserves formatting for pasting into documents
  - Markdown option copies raw source for editing
  - Smooth animations and backdrop blur effects
  - Color-coded notifications (green for rich text, blue for markdown)

- **Version Display in About Modal**:
  - Current version prominently displayed at the top
  - Version badge with package icon
  - Latest changes summary section
  - Quick access to full release notes

### Bug Fixes
- **Removed Duplicate Title**: Fixed issue where the document title appeared twice at the top

### UI/UX Updates
- **Copy Modal Design**:
  - Semi-transparent overlay with blur backdrop
  - Clear icons for each copy option
  - Descriptive text explaining each format
  - Close button and click-outside-to-close functionality
  - Responsive design for mobile devices

- **Release Notes Enhancements**:
  - Current version marked with "CURRENT" badge
  - Better visual hierarchy for version information
  - Consistent styling across modals

### Technical Improvements
- Uses document.execCommand for rich text copying
- Maintains selection range for formatted content
- Improved notification system with dynamic colors
- Clean modal state management

---

## Version 1.2.0 - Planned Features

### Upcoming Features
- Export report as PDF functionality
- Enhanced search within chapters
- Bookmark and annotation system
- Progress tracking for readers
- Multi-language support

### Planned Improvements
- Performance optimizations for large datasets
- Enhanced mobile navigation
- Offline support with service workers
- Real-time collaboration features
- Advanced analytics dashboard

---

## Deployment Instructions

### Environment Variables Required
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
NEXT_PUBLIC_APP_URL=https://...
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
```

### Build Commands
```bash
npm install
npm run build
npm start
```

### Database Setup
```bash
npx prisma migrate deploy
npm run db:seed
```

---

## Support

For questions or issues, contact:
- Developer: Tiran Dagan
- Email: tiran@tirandagan.com
- Phone: (908) 873-2425