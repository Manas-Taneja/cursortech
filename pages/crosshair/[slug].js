import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Geist } from 'next/font/google';
import { crosshairs } from '../../data/crosshairs';
import { logDownload } from '../../utils/analytics';
import CookieConsent from '../../components/CookieConsent';
import AnimatedCursor from '../../components/AnimatedCursor';

const geist = Geist({
  subsets: ['latin'],
});

export async function getStaticPaths() {
  const paths = crosshairs.map((crosshair) => ({
    params: { slug: crosshair.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const crosshair = crosshairs.find((c) => c.slug === params.slug);
  const relatedCrosshairs = crosshairs
    .filter((c) => c.id !== crosshair.id)
    .filter((c) => c.category === crosshair.category)
    .slice(0, 3);

  return {
    props: {
      crosshair,
      relatedCrosshairs,
    },
  };
}

export default function CrosshairDetail({ crosshair, relatedCrosshairs }) {
  const router = useRouter();
  const [fileExists, setFileExists] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPreview, setCursorPreview] = useState({ activeCursor: '', previewGif: '' });

  useEffect(() => {
    // Check if the cursor file exists
    fetch(crosshair.downloadUrl, { method: 'HEAD' })
      .then(response => {
        setFileExists(response.ok);
        setIsLoading(false);
      })
      .catch(() => {
        setFileExists(false);
        setIsLoading(false);
      });
  }, [crosshair.downloadUrl]);

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    // Toggle logic: if the same cursor is clicked again, clear states
    if (cursorPreview.activeCursor === crosshair.link && cursorPreview.previewGif === crosshair.def) {
      setCursorPreview({ activeCursor: '', previewGif: '' });
    } else {
      // Always clear both states first
      setCursorPreview({ activeCursor: '', previewGif: '' });
      if (crosshair.def && crosshair.link) {
        setCursorPreview({ previewGif: crosshair.def, activeCursor: crosshair.link });
      } else if (crosshair.link) {
        setCursorPreview({ activeCursor: crosshair.link, previewGif: '' });
      } else if (crosshair.def) {
        setCursorPreview({ previewGif: crosshair.def, activeCursor: '' });
      }
    }
  };

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

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const canonicalUrl = `https://cursortech.vercel.app/crosshair/${crosshair.slug}`;

  return (
    <>
      <Head>
        <title>{`${crosshair.title} - Free Windows Cursor Crosshair`}</title>
        <meta name="description" content={crosshair.description} />
        <meta name="keywords" content={`${crosshair.tags.join(', ')}, windows cursor, crosshair, animated cursor`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={`${crosshair.title} - Free Windows Cursor Crosshair`} />
        <meta property="og:description" content={crosshair.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`https://cursortech.vercel.app${crosshair.image}`} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${crosshair.title} - Free Windows Cursor Crosshair`} />
        <meta name="twitter:description" content={crosshair.description} />
        <meta name="twitter:image" content={`https://cursortech.vercel.app${crosshair.image}`} />
      </Head>

      <div className={`${geist.className} min-h-screen bg-white dark:bg-black`}>
        {(cursorPreview.activeCursor || cursorPreview.previewGif) && (
          <AnimatedCursor 
            gifUrl={cursorPreview.previewGif} 
            cursorUrl={cursorPreview.activeCursor}
          />
        )}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>

            {/* Main Content */}
            <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-orange-500 mb-4">
                  {crosshair.title}
                </h1>

                <div className="relative h-64 mb-6">
                  <Image
                    src={crosshair.image}
                    alt={`${crosshair.title} cursor preview`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {crosshair.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {crosshair.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {crosshair.source === 'RW-Designer' && (
                    <button
                      type="button"
                      onClick={handlePreviewClick}
                      className={`inline-flex items-center justify-center px-6 py-3 border ${
                        cursorPreview.activeCursor === crosshair.link || cursorPreview.previewGif === crosshair.def
                          ? 'border-orange-700 text-orange-700'
                          : 'border-orange-600 text-orange-600'
                      } text-base font-medium rounded-md bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
                    >
                      Preview
                    </button>
                  )}
                  <a
                    href={crosshair.downloadUrl}
                    download
                    onClick={(e) => {
                      e.preventDefault();
                      logDownload(crosshair.slug, crosshair.title);
                      window.location.href = crosshair.downloadUrl;
                    }}
                    className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ${
                      crosshair.source !== 'RW-Designer' ? 'flex-1' : ''
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download
                  </a>
                </div>

                {/* Conditional Footer based on source */}
                {crosshair.source === 'RW-Designer' && (
                  <footer className="mt-8 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Cursor design by <a href="https://www.rw-designer.com/" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">RW-Designer</a>
                  </footer>
                )}
                {crosshair.source === 'Sweezy' && (
                  <footer className="mt-8 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Cursor design by <a href="https://sweezy-cursors.com/" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">Sweezy Cursors</a>
                  </footer>
                )}
              </div>
            </div>

            {/* Related Crosshairs */}
            {relatedCrosshairs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Related Crosshairs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedCrosshairs.map((related) => (
                    <Link
                      key={related.id}
                      href={`/crosshair/${related.slug}`}
                      className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="relative h-32">
                        <Image
                          src={related.image}
                          alt={`${related.title} cursor preview`}
                          fill
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {related.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {related.tags.slice(0, 2).map((tag) => (
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
              </div>
            )}
          </div>
        </main>
        <CookieConsent />
      </div>
    </>
  );
}