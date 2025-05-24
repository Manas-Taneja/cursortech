import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { crosshairs } from '../../data/crosshairs';
import { Geist } from 'next/font/google';
import { useState, useEffect } from 'react';
import { logDownload } from '../../utils/analytics';
import CookieConsent from '../../components/CookieConsent';

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
  
  if (!crosshair) {
    return {
      notFound: true,
    };
  }

  // Get download count
  let downloadCount = 0;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const downloadsRes = await fetch(`${baseUrl}/api/downloads`);
    const downloads = await downloadsRes.json();
    downloadCount = downloads[crosshair.slug] || 0;
  } catch (error) {
    console.error('Failed to fetch download count:', error);
    // Continue with default download count of 0
  }

  return {
    props: {
      crosshair,
      downloadCount,
    },
  };
}

export default function CrosshairDetail({ crosshair, downloadCount: initialDownloadCount }) {
  const router = useRouter();
  const [fileExists, setFileExists] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(initialDownloadCount);

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

  const handleDownload = async () => {
    try {
      // Update download count
      const response = await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: crosshair.slug }),
      });
      const data = await response.json();
      setDownloadCount(data[crosshair.slug]);

      // Log to Google Analytics
      logDownload(crosshair.slug, crosshair.title);
    } catch (error) {
      console.error('Failed to update download count:', error);
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const canonicalUrl = `https://cursortech.vercel.app/crosshair/${crosshair.slug}`;

  return (
    <>
      <Head>
        <title>{`${crosshair.title} - Download Free Windows Cursor`}</title>
        <meta name="description" content={crosshair.description} />
        <meta name="keywords" content={`${crosshair.tags.join(', ')}, cursor, crosshair, windows cursor, free cursor`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={`${crosshair.title} - Download Free Windows Cursor`} />
        <meta property="og:description" content={crosshair.description} />
        <meta property="og:image" content={`https://cursortech.vercel.app${crosshair.image}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${crosshair.title} - Download Free Windows Cursor`} />
        <meta name="twitter:description" content={crosshair.description} />
        <meta name="twitter:image" content={`https://cursortech.vercel.app${crosshair.image}`} />
      </Head>

      <div className={`${geist.className} min-h-screen bg-white dark:bg-gray-900`}>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64 sm:h-96">
                <Image
                  src={crosshair.image}
                  alt={`${crosshair.title} cursor preview`}
                  fill
                  className="object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj5CQkJCQkJCQkJCQkJCQkJCQkJCQkL/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {crosshair.title}
                </h1>
                
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

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {downloadCount.toLocaleString()} downloads
                  </span>
                </div>

                {isLoading ? (
                  <div className="animate-pulse h-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                ) : fileExists ? (
                  <a
                    href={crosshair.downloadUrl}
                    download
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Download Cursor
                  </a>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      This cursor is temporarily unavailable. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <CookieConsent />
      </div>
    </>
  );
}