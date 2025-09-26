# IBBE Prototype

Frontend-only multi-account ecosystem prototype with organizations, founders, and individuals.

## Requirements
- Node.js 18+ (install from https://nodejs.org or via `winget install OpenJS.NodeJS.LTS`)
- Modern browser (Chrome, Firefox, Safari, Edge)

## Installation

```bash
# Install dependencies
npm install
```

## Running the app

```bash
# Start development server
npm run dev

# App will open at http://localhost:5173
```

## Building for production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Features

### Account Types
- **Organizations** (Schools/Firms): Full toolkit - courses, videos, posts, library, calendar, servers
- **Founders**: Independent creators with same toolkit as organizations
- **Individuals**: Learners who consume content, enroll in courses, connect with others

### Core Modules
- **Feed**: Announcements and updates from organizations
- **Courses**: Browse, enroll, track progress
- **Videos**: Long-form educational content
- **Reels**: Short-form video content
- **Chat**: Direct messages between users
- **Servers**: Discord-style channels for communities
- **Drive**: Resource library (PDFs, books, links)
- **Calendar**: Events and scheduling
- **Notes**: Personal markdown editor
- **Profiles**: View organizations and people

### Data Management
- All data stored locally in browser (IndexedDB/localStorage)
- Reset demo data anytime in Settings
- Export/Import your data as JSON
- Account switcher to simulate multiple users

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router
- IndexedDB for storage
- Inter font

## Responsive Design
- Mobile-first responsive layouts
- Hamburger menu on mobile
- Touch-friendly buttons and interactions
- Optimized for all screen sizes
