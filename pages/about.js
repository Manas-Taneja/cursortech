import React from 'react';

const About = () => (
  <div className="max-w-2xl mx-auto px-4 py-10 text-gray-200">
    <h1 className="text-3xl font-bold mb-8 text-center text-orange-300">About CursorTech</h1>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-orange-200 mb-2">Why I Built This</h2>
      <p className="mb-2">
        I tried finding cool cursors online, but most sites provided cursors for your browser, not many options for customizing your windows cursors. So instead of complaining, I decided to make my own.
      </p>
      <ul className="list-disc list-inside mb-2 space-y-1">
        <li>Fast and mobile-friendly</li>
        <li>Organized with previews and categories</li>
        <li>A place to rediscover and enjoy cursor packs that feel good</li>
      </ul>
      <p>
        It's all built from scratch — no templates, no bloat. Just a clean experience.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-orange-200 mb-2">What's Next?</h2>
      <p className="mb-2">
        I'm constantly adding new cursor packs, fixing bugs, and thinking of new features-
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Download counters and community favorites</li>
        <li>Maybe even allowing creators to submit their own packs</li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-orange-200 mb-2">Want to Say Hi?</h2>
      <p className="mb-2">
        If you've got feedback, ideas, or just found a cursor you love — shoot me a message!
      </p>
      <p className="mb-2">
        I'd love to hear from you: <a href="mailto:cursortech.site@gmail.com" className="text-orange-300 underline">cursortech.site@gmail.com</a>
      </p>
      <p className="mb-2">
        Check out my GitHub: <a href="https://github.com/Manas-Taneja" className="text-orange-300 underline" target="_blank" rel="noopener noreferrer">github.com/Manas-Taneja</a>
      </p>
      <p className="italic mt-6">Thanks for stopping by,<br />– Manas</p>
    </section>
  </div>
);

export default About; 