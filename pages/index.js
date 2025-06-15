import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Quicksand } from "next/font/google";
import { crosshairs } from "../data/crosshairs";
import { logDownload } from '../utils/analytics';
import Navbar from '../components/Navbar';
import AnimatedCursor from '../components/AnimatedCursor';
import dynamic from 'next/dynamic';

const quicksand = Quicksand({
  subsets: ["latin"],
});

// Cache configuration
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
let crosshairsCache = {
  data: null,
  timestamp: null
};

// Dynamically import the CrosshairCard component
const CrosshairCard = dynamic(() => import('../components/CrosshairCard'), {
  loading: () => <CrosshairCardSkeleton />,
  ssr: false
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

export default function Home({ searchQuery: initialSearchQuery = '', cursors = [] }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 12;
  const observer = useRef();
  const lastCursorRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);
  const [cursorPreview, setCursorPreview] = useState({ activeCursor: '', previewGif: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Loading state for infinite scroll
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    (cursors || []).forEach(crosshair => {
      (crosshair.tags || []).forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [cursors]);

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Filter crosshairs based on selected tags and search query
  const filteredCrosshairs = useMemo(() => {
    let filtered = cursors || [];
    
    // Apply tag filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter(crosshair =>
        selectedTags.some(tag => crosshair.tags.includes(tag))
      );
    }
    
    // Apply search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(crosshair =>
        crosshair.title.toLowerCase().includes(query) ||
        crosshair.description.toLowerCase().includes(query) ||
        crosshair.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Shuffle the filtered results
    return shuffleArray(filtered);
  }, [selectedTags, searchQuery, cursors]);

  // Get paginated results
  const paginatedCrosshairs = useMemo(() => {
    return filteredCrosshairs.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredCrosshairs, page]);

  // Update hasMore state
  useEffect(() => {
    setHasMore(paginatedCrosshairs.length < filteredCrosshairs.length);
  }, [paginatedCrosshairs, filteredCrosshairs]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedTags, searchQuery]);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (cursorPreview.activeCursor && !cursorPreview.previewGif) {
      document.body.style.cursor = `url(${cursorPreview.activeCursor}), auto`;
      const all = document.querySelectorAll('*');
      all.forEach(el => {
        el.style.cursor = `url(${cursorPreview.activeCursor}), auto`;
      });
      // Inject style for all cursor types
      let style = document.getElementById('custom-cursor-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'custom-cursor-style';
        document.head.appendChild(style);
      }
      style.innerHTML = `
        * { cursor: url(${cursorPreview.activeCursor}), auto !important; }
        input, textarea, [contenteditable] { cursor: url(${cursorPreview.activeCursor}), auto !important; }
      `;
    } else if (!cursorPreview.previewGif) {
      document.body.style.cursor = '';
      const all = document.querySelectorAll('*');
      all.forEach(el => {
        el.style.cursor = '';
      });
      // Remove the custom style
      const style = document.getElementById('custom-cursor-style');
      if (style) style.remove();
    }
  }, [cursorPreview.activeCursor, cursorPreview.previewGif]);

  useEffect(() => {
    if (cursorPreview.previewGif && cursorPreview.activeCursor) {
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
          cursor: url(${cursorPreview.activeCursor}), auto !important;
        }
      `;
    } else {
      document.body.style.cursor = '';
      const style = document.getElementById('custom-cursor-style');
      if (style) style.remove();
    }
  }, [cursorPreview.previewGif, cursorPreview.activeCursor]);

  useEffect(() => {
    // Cleanup cursor state on unmount
    return () => {
      setCursorPreview({ activeCursor: '', previewGif: '' });
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

  // Load more items
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setPage(prevPage => prevPage + 1);
    setIsLoadingMore(false);
  }, [isLoadingMore, hasMore]);

  // Update observer when loading state changes
  useEffect(() => {
    if (isLoadingMore) return;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const lastElement = document.querySelector('#last-element');
    if (lastElement) {
      observer.observe(lastElement);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, hasMore, loadMore]);

  return (
    <>
      <Head>
        <title>CursorTech</title>
        <meta name="description" content="Download free animated cursors for Windows. Choose from a variety of styles including anime, gaming, and tech-inspired designs. Easy installation guide included." />
        <meta name="keywords" content="windows cursor, crosshair, animated cursor, free cursor, custom cursor, gaming cursor, anime cursor, tech cursor" />
        <link rel="canonical" href="https://cursortech.vercel.app" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="CursorTech - Free Windows Cursors & Custom Mouse Pointers" />
        <meta property="og:description" content="Download free animated cursors for Windows. Choose from a variety of styles including anime, gaming, and tech-inspired designs. Easy installation guide included." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cursortech.vercel.app" />
        <meta property="og:image" content="https://cursortech.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="CursorTech" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cursortech" />
        <meta name="twitter:title" content="CursorTech - Free Windows Cursors & Custom Mouse Pointers" />
        <meta name="twitter:description" content="Download free animated cursors for Windows. Choose from a variety of styles including anime, gaming, and tech-inspired designs." />
        <meta name="twitter:image" content="https://cursortech.vercel.app/og-image.jpg" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="o9k6uoj3gtFBoqrKCXxCPfRjbVT27kV_3vjDxsQ8DBU" />
      </Head>

      <div className={`${quicksand.className} min-h-screen bg-white dark:bg-black`}>
        <Navbar onSearch={(query) => {
          setSearchQuery(query);
        }} />
        {cursorPreview.previewGif && (
          <AnimatedCursor 
            gifUrl={cursorPreview.previewGif} 
            hotspotX={-12} 
            hotspotY={-12} 
          />
        )}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* <h1 className="text-4xl font-bold text-gray-900 dark:text-orange-500 mb-8 text-center">
              Animated Cursors
            </h1> */}

            {/* Tag Filter */}
            <div className="mb-8">
              <div className="relative filter-dropdown">
                <button
                  onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                  }}
                  className="text-lg font-semibold text-gray-900 dark:text-orange-500 mb-4 flex items-center gap-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Filter by Style
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isFilterOpen && (
                  <div className="absolute top-full left-0 w-full bg-white dark:bg-black rounded-lg shadow-lg p-4 z-10 border border-gray-200 dark:border-orange-700">
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            toggleTag(tag);
                            setIsFilterOpen(false);
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-orange-700 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedCrosshairs.map((crosshair, index) => (
                <div
                  key={crosshair.id}
                  id={index === paginatedCrosshairs.length - 1 ? 'last-element' : undefined}
                >
                  <CrosshairCard 
                    crosshair={crosshair} 
                    cursorPreview={cursorPreview}
                    setCursorPreview={setCursorPreview}
                  />
                </div>
              ))}
            </div>

            {isLoadingMore && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Check if cache is valid
  if (crosshairsCache.data && crosshairsCache.timestamp && 
      Date.now() - crosshairsCache.timestamp < CACHE_DURATION) {
    return {
      props: {
        cursors: crosshairsCache.data,
        cached: true
      },
      revalidate: 3600 // Revalidate every hour
    };
  }

  // Update cache
  crosshairsCache = {
    data: crosshairs,
    timestamp: Date.now()
  };

  return {
    props: {
      cursors: crosshairs,
      cached: false
    },
    revalidate: 3600 // Revalidate every hour
  };
}