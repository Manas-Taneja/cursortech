import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { logDownload } from '../utils/analytics';

export default function CrosshairCard({ 
  crosshair, 
  cursorPreview = { activeCursor: '', previewGif: '' }, 
  setCursorPreview = () => {} 
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    // Toggle logic: if the same cursor is clicked again, clear states
    if (cursorPreview.activeCursor === crosshair.link && cursorPreview.previewGif === crosshair.def) {
      setCursorPreview({ activeCursor: '', previewGif: '' });
    } else {
      // Always clear both states first
      setCursorPreview({ activeCursor: '', previewGif: '' });
      if (crosshair.def && crosshair.link) {
        setCursorPreview({ previewGif: crosshair.def, activeCursor: crosshair.link });
      } else if (crosshair.link) {
        setCursorPreview({ activeCursor: crosshair.link, previewGif: '' });
      } else if (crosshair.def) {
        setCursorPreview({ previewGif: crosshair.def, activeCursor: '' });
      }
    }
  };

  return (
    <div className="group relative bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:shadow-orange-500 transition-all">
      <Link href={`/crosshair/${crosshair.slug}`} className="block">
        <div className="relative w-[144px] h-[112px] mx-auto">
          <Image
            src={crosshair.image}
            alt={`${crosshair.title} cursor preview`}
            width={122.4}
            height={95.2}
            className={`object-contain transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj5CQkJCQkJCQkJCQkJCQkJCQkJCQkL/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            unoptimized={crosshair.image.endsWith('.gif')}
            onLoadingComplete={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-orange-500 mb-2">
            {crosshair.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-200 text-sm mb-4">
            {crosshair.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {crosshair.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="flex gap-2 px-4 pb-4">
        {crosshair.source === 'RW-Designer' && (
          <button
            type="button"
            onClick={handlePreviewClick}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2 border ${
              cursorPreview.activeCursor === crosshair.link || cursorPreview.previewGif === crosshair.def
                ? 'border-orange-700 text-orange-700'
                : 'border-orange-600 text-orange-600'
            } text-sm font-medium rounded-md bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
          >
            Preview
          </button>
        )}
        <a
          href={crosshair.downloadUrl}
          download
          onClick={(e) => {
            e.preventDefault();
            logDownload(crosshair.slug, crosshair.title);
            window.location.href = crosshair.downloadUrl;
          }}
          className={`inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ${
            crosshair.source !== 'RW-Designer' ? 'flex-1' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </a>
        <Link
          href={`/crosshair/${crosshair.slug}`}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
  );
} 