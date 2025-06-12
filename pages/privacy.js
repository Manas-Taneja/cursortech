import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>Privacy Policy - CursorTech</title>
        <meta name="description" content="Privacy Policy for CursorTech - Your trusted source for custom mouse cursors" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Welcome to CursorTech. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your data when you visit our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We collect minimal data to improve your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Anonymous download counts for our cursor packs</li>
                <li>Basic usage data through Google Analytics (if enabled)</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We do not collect any personal information or require user accounts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We use cookies to enhance your browsing experience:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Remember your selected cursor preferences</li>
                <li>Improve website functionality</li>
                <li>Analyze website traffic (if analytics are enabled)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may use the following third-party services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Google Analytics (if enabled) for website traffic analysis</li>
                <li>Vercel for website hosting and performance monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have any questions about this privacy policy, please contact us at:{' '}
                <a href="mailto:cursortech.site@gmail.com" className="text-orange-600 dark:text-orange-500 hover:underline">
                  cursortech.site@gmail.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may update this privacy policy from time to time. Any changes will be posted on this page, and the updated version will be effective immediately upon posting.
              </p>
            </section>

            <div className="mt-12">
              <Link href="/" className="text-orange-600 dark:text-orange-500 hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 