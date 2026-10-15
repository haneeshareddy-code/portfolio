import React, { useState, useRef, useEffect, useCallback } from 'react';
import CharacterCanvas from './components/CharacterCanvas';
import HeaderNav from './components/HeaderNav';
import HeroTypography from './components/HeroTypography';
import CustomCursor from './components/CustomCursor';
import ModalPanels from './components/ModalPanels';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playSoftClick } from './utils/audio';

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [facePos, setFacePos] = useState({ x: 0, y: 0 });

  // Store cursor position in a ref so the canvas 60 FPS animation loop
  // accesses real-time mouse coordinates without triggering React re-renders!
  const cursorRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    active: false
  });

  // Track global pointer/mouse movements
  useEffect(() => {
    const handlePointerMove = (e) => {
      cursorRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true
      };
    };

    const handlePointerLeave = () => {
      cursorRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // Keyboard shortcut to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal) {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#ad1114',
      }}
    >
      {/* 1. Ultra-Smooth Zero-Ghosting 60FPS Character Canvas */}
      <CharacterCanvas
        onLoaded={() => setIsLoaded(true)}
        cursorRef={cursorRef}
        onFacePosUpdate={setFacePos}
      />

      {/* 2. Flat Luxury Hero Vignette (Strictly 2D Flat, NO 3D Transform) */}
      <div className="hero-vignette" />

      {/* 3. Floating Frosted Glass Header Nav Pill [WORK] [ABOUT] [CONTACT] */}
      <HeaderNav
        activeSection={activeModal}
        onSelectSection={(sectionId) => setActiveModal(sectionId)}
        onHoverInteractive={setIsHoveringInteractive}
      />

      {/* 4. Top Right Availability Status Badge */}
      <div
        style={{
          position: 'fixed',
          top: '32px',
          right: 'clamp(20px, 4vw, 48px)',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.85)',
          pointerEvents: 'none'
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#4ade80',
            boxShadow: '0 0 10px #4ade80, 0 0 2px #4ade80',
          }}
        />
        <span>Available for Q4/2026</span>
      </div>

      {/* 5. Hero Typography (Bottom-Left) */}
      <HeroTypography
        onHoverInteractive={setIsHoveringInteractive}
        onOpenResume={() => setActiveModal('resume')}
        onOpenContact={() => setActiveModal('contact')}
      />

      {/* 6. Interactive Modal Drawers */}
      <ModalPanels
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onHoverInteractive={setIsHoveringInteractive}
      />

      {/* 7. Custom Magnetic Cursor */}
      <CustomCursor isHoveringInteractive={isHoveringInteractive} />
    </main>
  );
}
