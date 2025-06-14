import "@/styles/globals.css";
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { pageview } from '../utils/analytics';
import { ThemeProvider } from '../contexts/ThemeContext';
import CookieConsent from '../components/CookieConsent';
import Link from 'next/link';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Track page views when route changes
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {router.pathname === '/' ? (
          <Component {...pageProps} searchQuery={searchQuery} />
        ) : (
          <Component {...pageProps} />
        )}
        <footer className="w-full border-t border-orange-500 dark:border-orange-500 py-6 mt-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
                <Link 
                  href="/privacy" 
                  className="text-orange-300 dark:text-orange-300 hover:text-orange-700 dark:hover:text-orange-400 underline"
                >
                  Privacy Policy
                </Link>
                <span className="hidden md:inline">•</span>
                <Link 
                  href="/install" 
                  className="text-orange-300 dark:text-orange-300 hover:text-orange-700 dark:hover:text-orange-400 underline"
                >
                  How to Install
                </Link>
              </div>
              <p>
                All cursor designs are used in accordance with the licensing policy of{' '}
                <a 
                  href="https://www.rw-designer.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-300 dark:text-orange-300 hover:text-orange-700 dark:hover:text-orange-400 underline font-medium"
                >
                  RW-Designer 
                </a>
                & 
                <a 
                  href="https://sweezy-cursors.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-300 dark:text-orange-300 hover:text-orange-700 dark:hover:text-orange-400 underline font-medium"
                >
                  Sweezy Cursors 
                </a> . Special thanks to their community for creating these amazing cursor designs and allowing me to use them for educational purposes.
              </p>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </ThemeProvider>
    </>
  );
}
