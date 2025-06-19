import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function InstallGuide() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>How to Install Custom Cursors on Windows - Step by Step Guide | CursorTech</title>
        <meta 
          name="description" 
          content="Learn how to install custom cursors on Windows with our step-by-step guide. Easy instructions for installing .cur and .ani cursor files from CursorTech."
        />
        <meta name="keywords" content="install windows cursor, custom cursor installation, .cur file installation, .ani file installation, cursor setup guide" />
        <link rel="canonical" href="https://cursortech.vercel.app/install" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="How to Install Custom Cursors on Windows - Step by Step Guide | CursorTech" />
        <meta property="og:description" content="Learn how to install custom cursors on Windows with our step-by-step guide. Easy instructions for installing .cur and .ani cursor files from CursorTech." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://cursortech.vercel.app/install" />
        <meta property="og:image" content="https://cursortech.vercel.app/install-guide.jpg" />
        <meta property="og:site_name" content="CursorTech" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cursortech" />
        <meta name="twitter:title" content="How to Install Custom Cursors on Windows - Step by Step Guide" />
        <meta name="twitter:description" content="Learn how to install custom cursors on Windows with our step-by-step guide. Easy instructions for installing .cur and .ani cursor files." />
        <meta name="twitter:image" content="https://cursortech.vercel.app/install-guide.jpg" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          How to Install Custom Cursors on Windows
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Step 1: Download and Extract</h2>
            <p className="text-gray-700 dark:text-gray-300">Download your chosen cursor pack ZIP file and extract the .cur or .ani files to a location you can easily find.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 border border-orange-500 border-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">💡 Tip: Create a dedicated folder for your cursors to keep them organized.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Step 2: Access Personalization Settings</h2>
            <p className="text-gray-700 dark:text-gray-300">Right-click on your desktop and select "Personalize" from the context menu.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 border border-orange-500 border-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">⚙️ Alternative: Press Windows key + I to open Settings, then search for "Mouse cursor"</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Step 3: Navigate to Cursor Settings</h2>
            <p className="text-gray-700 dark:text-gray-300">In the Personalization window, click on "Themes" in the left sidebar, then select "Mouse cursor" under Related Settings.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Step 4: Apply Your Custom Cursor</h2>
            <p className="text-gray-700 dark:text-gray-300">For each cursor type (Normal, Busy, etc.):</p>
            <ol className="list-decimal pl-6 mt-2 text-gray-700 dark:text-gray-300">
              <li>Click on the cursor type you want to customize</li>
              <li>Click "Browse"</li>
              <li>Navigate to and select your downloaded .cur or .ani file</li>
              <li>Click "Apply"</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">How do I revert to default cursors?</h3>
                <p className="text-gray-700 dark:text-gray-300">In the Mouse Properties window, click "Use Default" for each cursor type you want to reset.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">Are these cursors safe?</h3>
                <p className="text-gray-700 dark:text-gray-300">Yes! All cursors on CursorTech are thoroughly scanned and verified. We only provide .cur and .ani files, which are safe cursor file formats that cannot contain malicious code.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">Can I use these cursors on macOS?</h3>
                <p className="text-gray-700 dark:text-gray-300">Unfortunately, Windows cursor files (.cur/.ani) are not directly compatible with macOS. macOS uses a different cursor format. We recommend using macOS-specific cursor packs if you're on a Mac.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
} 