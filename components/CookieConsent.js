import { useState, useEffect } from 'react';
import { Geist } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
});

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={`${geist.className} fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4 z-50`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          We use cookies to analyze site traffic and optimize your experience. 
          By clicking "Accept", you consent to our use of cookies.
        </div>
        <div className="flex gap-4">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Accept
          </button>
          <a
            href="/privacy"
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:underline text-sm"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
} 