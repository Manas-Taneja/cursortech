import Link from 'next/link';
import { Geist } from 'next/font/google';
import Head from 'next/head';

const geist = Geist({
  subsets: ['latin'],
});

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Cursor Not Found | Windows Cursor Crosshairs</title>
        <meta name="robots" content="noindex" />
      </Head>
      
      <div className={`${geist.className} min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4`}>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Cursor Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The cursor you're looking for doesn't exist or has been moved. 
            Check out our collection of free Windows cursor crosshairs instead.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Browse All Cursors
          </Link>
        </div>
      </div>
    </>
  );
} 