import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav className="w-full bg-black border-b border-orange-500 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          {/* <span className="text-orange-500 font-bold text-xs tracking-widest ml-1">CURSORS</span> */}
        </Link>

        {/* Search Bar */}
        <div className={`flex-1 flex justify-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-w-xl mx-4' : 'max-w-0'}`}>
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search cursors..."
              className={`w-full px-4 py-1.5 pl-9 text-gray-900 dark:text-orange-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg> */}
            </div>
            {searchTerm && isSearchOpen && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  onSearch('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Search Toggle and Nav Links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (!isSearchOpen) {
                // Focus the input when opening
                setTimeout(() => {
                  const input = document.querySelector('input[type="text"]');
                  if (input) input.focus();
                }, 300);
              } else {
                // Clear search when closing
                setSearchTerm('');
                onSearch('');
              }
            }}
            className="text-white hover:text-orange-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <Link href="/collections" className="text-white hover:text-orange-500 text-base font-medium">Collections</Link>
          <Link href="/specials" className="text-white hover:text-orange-500 text-base font-medium">Specials</Link>
          <Link href="/install" className="text-white hover:text-orange-500 text-base font-medium">How to</Link>
        </div>
      </div>
    </nav>
  );
} 