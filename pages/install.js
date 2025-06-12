import Head from 'next/head';
import Link from 'next/link';

export default function InstallGuide() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>How to Install Custom Cursors on Windows – CursorTech</title>
        <meta 
          name="description" 
          content="Step-by-step guide to installing .cur and .ani cursor files on Windows from CursorTech."
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">
          How to Install Custom Cursors on Windows
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">Step 1: Download and Extract</h2>
            <p className="text-white">Download your chosen cursor pack ZIP file and extract the .cur or .ani files to a location you can easily find.</p>
            <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-black border border-orange-500 border-2">
              <p className="text-sm text-white">💡 Tip: Create a dedicated folder for your cursors to keep them organized.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Step 2: Access Personalization Settings</h2>
            <p>Right-click on your desktop and select "Personalize" from the context menu.</p>
            <div className="bg-gray-100 p-4 rounded-lg my-4 dark:bg-black border border-orange-500 border-2">
              <p className="text-sm text-white">Alternative: Press Windows key + I to open Settings, then search for "Mouse cursor"</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Step 3: Navigate to Cursor Settings</h2>
            <p>In the Personalization window, click on "Themes" in the left sidebar, then select "Mouse cursor" under Related Settings.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Step 4: Apply Your Custom Cursor</h2>
            <p>For each cursor type (Normal, Busy, etc.):</p>
            <ol className="list-decimal pl-6 mt-2">
              <li>Click on the cursor type you want to customize</li>
              <li>Click "Browse"</li>
              <li>Navigate to and select your downloaded .cur or .ani file</li>
              <li>Click "Apply"</li>
            </ol>
          </section>

          <section className="mb-12 text-white">
            <h2 className="text-2xl font-semibold mb-4 text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-6 text-white">
              <div>
                <h3 className="text-xl font-medium mb-2 text-white">How do I revert to default cursors?</h3>
                <p>In the Mouse Properties window, click "Use Default" for each cursor type you want to reset.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-white">Are these cursors safe?</h3>
                <p>Yes! All cursors on CursorTech are thoroughly scanned and verified. We only provide .cur and .ani files, which are safe cursor file formats that cannot contain malicious code.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-white">Can I use these cursors on macOS?</h3>
                <p>Unfortunately, Windows cursor files (.cur/.ani) are not directly compatible with macOS. macOS uses a different cursor format. We recommend using macOS-specific cursor packs if you're on a Mac.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
} 