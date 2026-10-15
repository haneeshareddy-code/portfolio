import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ isHoveringInteractive }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animId;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing aura loop
    const auraLoop = () => {
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Trailing ring lerp
      const factor = 0.18;
      const nx = rx + (mx - rx) * factor;
      const ny = ry + (my - ry) * factor;
      ringPos.current = { x: nx, y: ny };

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }

      animId = requestAnimationFrame(auraLoop);
    };

    animId = requestAnimationFrame(auraLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 99999,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s ease'
    }}>
      {/* Trailing Aura Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isHoveringInteractive ? '64px' : '36px',
          height: isHoveringInteractive ? '64px' : '36px',
          marginLeft: isHoveringInteractive ? '-32px' : '-18px',
          marginTop: isHoveringInteractive ? '-32px' : '-18px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.65)',
          backgroundColor: isHoveringInteractive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
          backdropFilter: isHoveringInteractive ? 'blur(4px)' : 'none',
          boxShadow: isHoveringInteractive 
            ? '0 0 24px rgba(255, 255, 255, 0.45), inset 0 0 12px rgba(255, 255, 255, 0.3)' 
            : '0 0 14px rgba(255, 255, 255, 0.25)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), margin 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s, box-shadow 0.25s',
          willChange: 'transform'
        }}
      />

      {/* Crisp Center Glowing Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isHoveringInteractive ? '8px' : '6px',
          height: isHoveringInteractive ? '8px' : '6px',
          marginLeft: isHoveringInteractive ? '-4px' : '-3px',
          marginTop: isHoveringInteractive ? '-4px' : '-3px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 2px #ffffff',
          transition: 'width 0.2s, height 0.2s, margin 0.2s',
          willChange: 'transform'
        }}
      />
    </div>
  );
}
