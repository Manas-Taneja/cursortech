import Link from 'next/link';
import { Quicksand } from 'next/font/google';
import Head from 'next/head';

const quicksand = Quicksand({
  subsets: ['latin'],
});

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | CursorTech</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse our collection of free Windows cursors instead." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://cursortech.vercel.app/404" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="404 - Page Not Found | CursorTech" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Browse our collection of free Windows cursors instead." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cursortech.vercel.app/404" />
        <meta property="og:site_name" content="CursorTech" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@cursortech" />
        <meta name="twitter:title" content="404 - Page Not Found | CursorTech" />
        <meta name="twitter:description" content="The page you're looking for doesn't exist. Browse our collection of free Windows cursors instead." />
      </Head>
      
      <div className={`${quicksand.className} min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4`}>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Browse our collection of free Windows cursors instead.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            Browse All Cursors
          </Link>
        </div>
      </div>
    </>
  );
} 