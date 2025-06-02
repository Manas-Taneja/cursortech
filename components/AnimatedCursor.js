import { useEffect, useState } from 'react';

const INTERACTIVE_SELECTORS = 'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])';

export default function AnimatedCursor({ gifUrl }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hideCursor, setHideCursor] = useState(false);

  useEffect(() => {
    // Set isVisible to true when gifUrl changes
    if (gifUrl) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [gifUrl]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      // Hide the fake cursor if hovering over an interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && el.closest(INTERACTIVE_SELECTORS)) setHideCursor(true);
      else setHideCursor(false);
    };

    if (isVisible) {
      document.addEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!gifUrl || !isVisible || hideCursor) return null;

  return (
    <img
      id="fakeCursor"
      src={gifUrl}
      alt="Animated cursor"
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
} 