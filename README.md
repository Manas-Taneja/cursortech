# CursorTech

A modern, responsive website for custom cursor downloads and previews.

## Project Structure

- **`public/`**: Static assets
  - **`crosshairs/`**: Cursor files and preview images
    - `obi-lightsaber.cur`: Static cursor inspired by Obi-Wan Kenobi's lightsaber
- **`data/`**: JSON data for crosshairs
  - `crosshairs.js`: Contains metadata for each cursor, including the new Obi-Wan Lightsaber cursor
- **`components/`**: React components
  - `Header.js`: Site header with navigation and search
  - `Footer.js`: Site footer
  - `CrosshairCard.js`: Card component for displaying cursor previews
  - `CrosshairDetail.js`: Detailed view for a single cursor
- **`pages/`**: Next.js pages
  - `index.js`: Homepage
  - `crosshair/[slug].js`: Dynamic page for individual cursor details
- **`styles/`**: CSS/SCSS files
  - `globals.css`: Global styles
  - `Header.module.css`: Styles for the header component
  - `Footer.module.css`: Styles for the footer component
  - `CrosshairCard.module.css`: Styles for the crosshair card component
  - `CrosshairDetail.module.css`: Styles for the crosshair detail page

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

## Deployment

The site is deployed on Vercel at [https://cursortech.vercel.app](https://cursortech.vercel.app).

## Notes

- The Obi-Wan Lightsaber cursor (`obi-lightsaber.cur`) is available in the `public/crosshairs/` directory.
- The following scripts have been removed as they are no longer needed:
  - `scripts/generate-previews.js`
  - `scripts/generate-cursors.js`
  - `scripts/generate-gif-previews.sh`
