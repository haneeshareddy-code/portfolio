import React, { useState, useEffect } from 'react';

export default function CursorHint() {
  const [visible, setVisible] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const touchDevice = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
    );
    setIsTouch(touchDevice);

    // Gently fade in after page settles
    const timer = setTimeout(() => {
      if (!hasMoved) {
        setVisible(true);
      }
    }, 800);

    // Fade out as soon as visitor moves mouse or interacts
    const handleInitialMove = () => {
      setHasMoved(true);
      setVisible(false);
    };

    window.addEventListener('mousemove', handleInitialMove, { once: true, passive: true });
    window.addEventListener('pointerdown', handleInitialMove, { once: true, passive: true });
    window.addEventListener('touchstart', handleInitialMove, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleInitialMove);
      window.removeEventListener('pointerdown', handleInitialMove);
      window.removeEventListener('touchstart', handleInitialMove);
    };
  }, [hasMoved]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '22%',
        right: 'clamp(18%, 24vw, 32%)',
        zIndex: 40,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: visible ? 0.88 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none'
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-cursive)',
          fontSize: 'clamp(18px, 1.8vw, 24px)',
          fontWeight: 600,
          color: '#fdfbf7',
          letterSpacing: '0.02em',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          animation: 'gentleFloat 3.5s ease-in-out infinite alternate',
        }}
      >
        {isTouch ? 'explore the page' : 'move the cursor'}
      </div>

      {/* Tiny Tasteful Curved Arrow */}
      {!isTouch && (
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#fdfbf7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            marginTop: '2px',
            opacity: 0.75,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))',
            animation: 'gentleFloat 3.5s ease-in-out infinite alternate',
          }}
        >
          {/* Subtle curved arc pointing towards face center */}
          <path d="M 22 4 C 18 14, 10 18, 6 24" />
          <path d="M 5 18 L 6 24 L 12 24" />
        </svg>
      )}

      <style>{`
        @keyframes gentleFloat {
          0% { transform: translateY(0px) rotate(-1deg); }
          100% { transform: translateY(-4px) rotate(1deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gentle-float { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
