import React from 'react';
import Link from 'next/link';

const About = () => (
  <div className="max-w-2xl mx-auto px-4 py-10 text-gray-200">
    <h1 className="text-3xl font-bold mb-8 text-center text-orange-300">About CursorTech</h1>

    <p className="mb-6">
      Hey there! I'm Manas — a student, developer, and design enthusiast who decided to make something fun and useful for anyone who's ever been bored of the same old system cursor.
    </p>

    <p className="mb-6">
      <strong>CursorTech</strong> started as a weekend project. I wanted to blend creativity, animation, and utility into something quirky: <strong>a giant library of animated and pixel-art cursors</strong>. Think capybaras, anime swords, pixel knives, dancing stick figures — anything that turns a click into a vibe.
    </p>

    <p className="mb-8">
      What began as a single animated crosshair turned into this entire site.
    </p>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-orange-200 mb-4">→ Why I Built This</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>I was curious about <strong>how to rank on Google</strong>, how to make something people actually download, and how to design a fast, modern experience.</li>
        <li>I wanted to explore <strong>SEO, GitHub Actions, Vercel Serverless</strong>, and experiment with <strong>cursor formats</strong> (.cur, .ani).</li>
        <li>I wanted to <strong>ship</strong> something — not just build it.</li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-orange-200 mb-4">→ How It Works</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>The site is powered by <strong>Next.js + TailwindCSS</strong>.</li>
        <li>Previews are done in-browser with cursor replacements on hover.</li>
              </ul>
    </section>
  <section className="mb-10">
      <h2 className="text-xl font-semibold text-orange-200 mb-4">→ Thanks for visiting</h2>
      <p className="mb-4">
        If you liked the site, shared it, or even downloaded a cursor. You made my day.
      </p>
      <blockquote className="border-l-4 border-orange-300 pl-4 italic">
        Built with 💻, 🎨, and a lot of 🍵 by <a href="https://github.com/Manas-Taneja" className="text-orange-300 underline" target="_blank" rel="noopener noreferrer">Manas Taneja</a>
      </blockquote>
    </section>

    <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            ← Back to Home
          </Link>
        </div>
  </div>
);

export default About; 