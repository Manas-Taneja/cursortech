import { useEffect } from 'react';

export function useCursorPreview({ gifUrl, curUrl, hotspotX = 8, hotspotY = 8, enabled = true, size = 32 }) {
  useEffect(() => {
    if (!enabled || !gifUrl || !curUrl) return;

    // Set the system cursor to the .cur file
    document.body.style.cursor = `url(${curUrl}), auto`;

    // Create the floating image
    const ghost = document.createElement('img');
    ghost.src = gifUrl;
    ghost.style.position = 'fixed';
    ghost.style.pointerEvents = 'none';
    ghost.style.zIndex = 9999;
    ghost.style.width = `${size}px`;
    ghost.style.height = `${size}px`;
    ghost.style.left = '0px';
    ghost.style.top = '0px';

    document.body.appendChild(ghost);

    const INTERACTIVE_SELECTORS = 'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])';

    const moveGhost = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && el.closest(INTERACTIVE_SELECTORS)) {
        ghost.style.display = 'none';
      } else {
        ghost.style.display = 'block';
        ghost.style.left = `${e.clientX - hotspotX}px`;
        ghost.style.top = `${e.clientY - hotspotY}px`;
      }
    };

    document.addEventListener('mousemove', moveGhost);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', moveGhost);
      ghost.remove();
    };
  }, [gifUrl, curUrl, hotspotX, hotspotY, enabled, size]);
} 