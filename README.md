# Project Hydra

A comprehensive metal music database and management platform built with cutting-edge web technologies. Project Hydra provides an immersive experience for exploring metal bands, record labels, albums, and releases with rich data relationships and interactive visualizations.

## Features

### Metal Music Database
- **Bands Catalog** - Browse and explore metal bands with detailed information
- **Labels Directory** - Comprehensive record label pages with relationships, releases, and historical data
- **Albums & Releases** - Track releases by year, format, and catalog information
- **Data Relationships** - Navigate between bands, labels, and releases seamlessly

### Dashboard & Analytics
- Interactive charts and data visualizations
- Data grid with tree view and filtering capabilities
- Date-based analysis tools
- Statistics and metrics tracking

### CRUD Management
- Employee management system with full CRUD operations
- Custom notification system with Snackbar alerts
- Dialog modals for create/edit/delete actions
- Form validation and responsive design

### Additional Features
- Marketing landing pages with pricing and features
- Authentication flows (sign in/sign up)
- Multi-step checkout process
- Blog integration
- 3D visualizations with Three.js
- Interactive maps with Mapbox

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript 5
- **UI Library:** Material-UI v7 (MUI)
- **Styling:** Tailwind CSS v4 + Emotion (CSS-in-JS)
- **Advanced Components:** MUI X (DataGrid, Charts, DatePickers, TreeView)
- **3D Graphics:** Three.js + React Three Fiber
- **Maps:** Mapbox GL + react-map-gl
- **Build Tool:** Turbopack

### Backend
- **Database:** PostgreSQL (Neon Serverless)
- **Data Access:** @neondatabase/serverless with async server components
- **Web Scraper:** Python 3.13 with Selenium + BeautifulSoup
- **Package Manager:** uv (Python)

### Code Quality
- **Linting:** ESLint 9 + Next.js config
- **Formatting:** Prettier 3.6 with import sorting
- **Type Safety:** Strict TypeScript mode

## Project Structure

```
project-hydra/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── metal/               # Metal music database module
│   │   │   ├── bands/           # Band listings
│   │   │   ├── albums/          # Album catalog
│   │   │   └── labels/          # Label hub
│   │   │       ├── _data/       # Data access layer
│   │   │       └── [labelID]/   # Dynamic label pages
│   │   ├── dashboard/           # Analytics dashboard
│   │   ├── crud/                # CRUD interface
│   │   ├── marketing/           # Landing pages
│   │   ├── checkout/            # E-commerce flow
│   │   └── layout.tsx           # Root layout
│   ├── components/              # Shared components
│   └── theme.ts                 # MUI theme config
├── backend/
│   ├── scraper/                 # Python web scraper
│   └── dbscripts/               # SQL migrations
└── public/                      # Static assets
```

## Getting Started

### Prerequisites

- **Node.js:** v24.6.0 or higher
- **Python:** 3.13.7 (managed with `uv`)
- **PostgreSQL:** Neon serverless instance
- **Mapbox Token:** For map features

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-hydra
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with:
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Highlights

### Server Components
Heavy use of async React Server Components for optimal data fetching and performance.

### Data Access Layer
Modular data access pattern with functions separated from UI rendering:
- Centralized database queries in `_data` directories
- Parallel query execution with `Promise.all()`
- Type-safe database responses

### Component Organization
Feature-based folder structure with clear separation of concerns:
- `_components/` - React components
- `_data/` - Types and data access functions
- `_hooks/` - Custom React hooks
- `_theme/` - Material-UI customizations
- `_context/` - React Context providers

### State Management
- React Context API with custom hooks
- No external state management library
- Server-side data fetching prioritized

## Database Schema

The PostgreSQL database (`hydra` schema) includes:
- **bands** - Band information, genres, countries, status
- **labels_comprehensive** - Record label details with audit trails
- **label_bands** - Many-to-many relationships (current/historical)
- **label_releases** - Album releases with catalog information
- **label_links** - External links and resources
- **label_notes** - Additional notes and metadata

## Development

### Code Style
- Imports automatically sorted by Prettier
- ESLint enforces Next.js best practices
- Strict TypeScript for type safety

### Import Order
Imports are automatically organized in the following groups:
1. CSS files
2. React/Next.js core
3. MUI ecosystem
4. Third-party libraries
5. Internal theme and components
6. Relative imports

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass and code is formatted
4. Submit a pull request

## License

This project is private and proprietary.

---

**Built with ❤️ using Next.js 16, React 19, and Material-UI**
