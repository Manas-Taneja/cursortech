import Image from "next/image";
import Link from "next/link";
import { Geist } from "next/font/google";
import { crosshairs } from "../data/crosshairs";
import Head from "next/head";
import { useState, useMemo } from "react";

const geist = Geist({
  subsets: ["latin"],
});

export default function Home() {
  const [selectedTags, setSelectedTags] = useState([]);

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
        <link rel="canonical" href="https://your-domain.com" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Free Windows Cursor Crosshairs - Download Animated Cursors" />
        <meta property="og:description" content="Download free animated cursor crosshairs for Windows. Choose from a variety of styles including neon, classic, and tech-inspired designs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com" />
      </Head>

      <div className={`${geist.className} min-h-screen bg-white dark:bg-gray-900`}>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Free Windows Cursor Crosshairs
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
              {filteredCrosshairs.map((crosshair) => (
                <Link
                  key={crosshair.id}
                  href={`/crosshair/${crosshair.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={crosshair.image}
                      alt={crosshair.title}
                      fill
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {crosshair.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {crosshair.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
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
              ))}
            </div>

            {filteredCrosshairs.length === 0 && (
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
      </div>
    </>
  );
}
