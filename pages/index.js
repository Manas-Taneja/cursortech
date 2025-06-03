import Image from "next/image";
import Link from "next/link";
import { Geist } from "next/font/google";
import { crosshairs } from "../data/crosshairs";
import Head from "next/head";
import { useState, useMemo, useEffect } from "react";
import CookieConsent from "../components/CookieConsent";
import { logDownload } from '../utils/analytics';
import AnimatedCursor from '../components/AnimatedCursor';

const geist = Geist({
  subsets: ["latin"],
});

function CrosshairCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCursor, setActiveCursor] = useState('');
  const [previewGif, setPreviewGif] = useState('');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    crosshairs.forEach(crosshair => {
      crosshair.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter crosshairs based on selected tags
  const filteredCrosshairs = useMemo(() => {
    if (selectedTags.length === 0) return crosshairs;
    return crosshairs.filter(crosshair =>
      selectedTags.every(tag => crosshair.tags.includes(tag))
    );
  }, [selectedTags]);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeCursor && !previewGif) {
      document.body.style.cursor = `url(${activeCursor}), auto`;
      const all = document.querySelectorAll('*');
      all.forEach(el => {
        el.style.cursor = `url(${activeCursor}), auto`;
      });
      // Inject style for all cursor types
      let style = document.getElementById('custom-cursor-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'custom-cursor-style';
        document.head.appendChild(style);
      }
      style.innerHTML = `
        * { cursor: url(${activeCursor}), auto !important; }
        input, textarea, [contenteditable] { cursor: url(${activeCursor}), auto !important; }
      `;
    } else if (!previewGif) {
      document.body.style.cursor = '';
      const all = document.querySelectorAll('*');
      all.forEach(el => {
        el.style.cursor = '';
      });
      // Remove the custom style
      const style = document.getElementById('custom-cursor-style');
      if (style) style.remove();
    }
  }, [activeCursor, previewGif]);

  useEffect(() => {
    if (previewGif && activeCursor) {
      // Hide native cursor only on body
      document.body.style.cursor = 'none';
      // Set .cur file for interactive elements
      let style = document.getElementById('custom-cursor-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'custom-cursor-style';
        document.head.appendChild(style);
      }
      style.innerHTML = `
        button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]) {
          cursor: url(${activeCursor}), auto !important;
        }
      `;
    } else {
      document.body.style.cursor = '';
      const style = document.getElementById('custom-cursor-style');
      if (style) style.remove();
    }
  }, [previewGif, activeCursor]);

  useEffect(() => {
    // Cleanup cursor state on unmount
    return () => {
      setActiveCursor('');
      setPreviewGif('');
      document.body.style.cursor = '';
      const style = document.getElementById('custom-cursor-style');
      if (style) style.remove();
    };
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <>
      <Head>
        <title>Free Windows Cursor Crosshairs - Download Animated Cursors</title>
        <meta name="description" content="Download free animated cursor crosshairs for Windows. Choose from a variety of styles including neon, classic, and tech-inspired designs." />
        <meta name="keywords" content="windows cursor, crosshair, animated cursor, free cursor, custom cursor" />
        <link rel="canonical" href="https://cursortech.vercel.app" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Free Windows Cursor Crosshairs - Download Animated Cursors" />
        <meta property="og:description" content="Download free animated cursor crosshairs for Windows. Choose from a variety of styles including neon, classic, and tech-inspired designs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cursortech.vercel.app" />
      </Head>

      <div className={`${geist.className} min-h-screen bg-white dark:bg-gray-900`}>
        <header className="w-full border-b border-gray-200 dark:border-gray-700 py-4 text-center bg-white dark:bg-gray-900 top-0 z-30">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            Need help? <Link href="/install" className="text-blue-600 hover:underline">How to Install Custom Cursors</Link>
          </span>
        </header>
        <AnimatedCursor gifUrl={previewGif} hotspotX={-12} hotspotY={-12} />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Animated Cursors
            </h1>

            {/* Tag Filter */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Filter by Style
              </h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <>
                  <CrosshairCardSkeleton />
                  <CrosshairCardSkeleton />
                  <CrosshairCardSkeleton />
                </>
              ) : (
                filteredCrosshairs.map((crosshair) => (
                  <div
                    key={crosshair.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  >
                    <Link
                      href={`/crosshair/${crosshair.slug}`}
                      className="block"
                    >
                      <div className="relative h-48">
            <Image
                          src={crosshair.image}
                          alt={`${crosshair.title} cursor preview`}
                          fill
                          className="object-contain"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj5CQkJCQkJCQkJCQkJCQkJCQkJCQkL/2wBDAR4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {crosshair.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {crosshair.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {crosshair.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
          >
                              {tag}
                            </span>
                          ))}
                        </div>
        </div>
                    </Link>
                    <div className="flex gap-2 px-4 pb-4">
                      <a
                        href={crosshair.downloadUrl}
                        download
                        onClick={(e) => {
                          e.preventDefault();
                          logDownload(crosshair.slug, crosshair.title);
                          window.location.href = crosshair.downloadUrl;
                        }}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Download
                      </a>
                      <Link
                        href={`/crosshair/${crosshair.slug}`}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Always clear both states first
                          setActiveCursor('');
                          setPreviewGif('');
                          if (crosshair.gif && crosshair.cur) {
                            setPreviewGif(crosshair.gif);
                            setActiveCursor(crosshair.cur);
                          } else if (crosshair.cur) {
                            setActiveCursor(crosshair.cur);
                          } else if (crosshair.gif) {
                            setPreviewGif(crosshair.gif);
                          }
                        }}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-purple-600 text-sm font-medium rounded-md text-purple-600 bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!isLoading && filteredCrosshairs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No cursors found matching the selected filters.
                </p>
                <button
                  onClick={() => setSelectedTags([])}
                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>
        <CookieConsent />
    </div>
    </>
  );
}