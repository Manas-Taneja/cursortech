# CursorTech

A modern, responsive website for custom cursor downloads and previews.

## Project Structure

- **`public/`**: Static assets
  - **`crosshairs/`**: Cursor files and preview images
- **`data/`**: Data files
  - `crosshairs.js`: Contains metadata for each cursor
  - `downloads.js`: Manages cursor download counts
- **`components/`**: React components
  - `Navbar.js`: Main navigation with search and theme toggle
  - `AnimatedCursor.js`: Handles cursor preview animations
  - `CookieConsent.js`: Cookie consent banner
  - `CursorPack.js`: Displays cursor pack information
  - `InstallGuideModal.js`: Installation instructions modal
- **`pages/`**: Next.js pages
  - `index.js`: Homepage with cursor grid
  - `crosshair/[slug].js`: Dynamic page for individual cursor details
  - `install.js`: Installation guide page
  - `404.js`: Custom 404 page
- **`styles/`**: CSS files
  - `globals.css`: Global styles and theme variables
- **`contexts/`**: React contexts
  - `ThemeContext.js`: Dark/light theme management
- **`utils/`**: Utility functions
  - `analytics.js`: Google Analytics integration

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Responsive design
- Dynamic cursor previews
- Search functionality
- Dark/light theme toggle
- Easy cursor downloads
- Download count tracking
- Cookie consent management

## Deployment

The site is deployed on Vercel at [https://cursortech.vercel.app](https://cursortech.vercel.app).

## Notes

- The Obi-Wan Lightsaber cursor (`obi-lightsaber.cur`) is available in the `public/crosshairs/` directory.
- The following scripts have been removed as they are no longer needed:
  - `scripts/generate-previews.js`
  - `scripts/generate-cursors.js`
  - `scripts/generate-gif-previews.sh`
