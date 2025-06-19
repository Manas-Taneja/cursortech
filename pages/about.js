import React from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-2xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-orange-600 dark:text-orange-300">About CursorTech</h1>

        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Hey there! I'm Manas — a student, developer, and design enthusiast who decided to make something fun and useful for anyone who's ever been bored of the same old system cursor.
        </p>

        <p className="mb-6 text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">CursorTech</strong> started as a weekend project. I wanted to blend creativity, animation, and utility into something quirky: <strong className="text-gray-900 dark:text-white">a giant library of animated and pixel-art cursors</strong>. Think capybaras, anime swords, pixel knives, dancing stick figures — anything that turns a click into a vibe.
        </p>

        <p className="mb-8 text-gray-700 dark:text-gray-300">
          What began as a single animated crosshair turned into this entire site.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-200 mb-4">→ Why I Built This</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>I was curious about <strong className="text-gray-900 dark:text-white">how to rank on Google</strong>, how to make something people actually download, and how to design a fast, modern experience.</li>
            <li>I wanted to explore <strong className="text-gray-900 dark:text-white">SEO, GitHub Actions, Vercel Serverless</strong>, and experiment with <strong className="text-gray-900 dark:text-white">cursor formats</strong> (.cur, .ani).</li>
            <li>I wanted to <strong className="text-gray-900 dark:text-white">ship</strong> something — not just build it.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-200 mb-4">→ How It Works</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>The site is powered by <strong className="text-gray-900 dark:text-white">Next.js + TailwindCSS</strong>.</li>
            <li>Previews are done in-browser with cursor replacements on hover.</li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-200 mb-4">→ Thanks for visiting</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            If you liked the site, shared it, or even downloaded a cursor. You made my day.
          </p>
          <blockquote className="border-l-4 border-orange-600 dark:border-orange-300 pl-4 italic text-gray-700 dark:text-gray-300">
            Built with 💻, 🎨, and a lot of 🍵 by <a href="https://github.com/Manas-Taneja" className="text-orange-600 dark:text-orange-300 underline hover:text-orange-700 dark:hover:text-orange-400" target="_blank" rel="noopener noreferrer">Manas Taneja</a>
          </blockquote>
        </section>

        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 