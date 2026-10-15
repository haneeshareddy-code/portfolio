import React from 'react';
import { playPillHover, playSoftClick } from '../utils/audio';

export default function HeaderNav({ activeSection, onSelectSection, onHoverInteractive }) {
  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: '28px',
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      pointerEvents: 'none' // allow clicks to pass through except on pill
    }}>
      {/* Floating Frosted Glass Pill */}
      <nav
        className="glass-pill"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 8px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSoftClick();
                onSelectSection(item.id);
              }}
              onMouseEnter={() => {
                playPillHover();
                onHoverInteractive(true);
              }}
              onMouseLeave={() => {
                onHoverInteractive(false);
              }}
              style={{
                border: 'none',
                background: isActive ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.78)',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none',
                boxShadow: isActive ? '0 2px 12px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.3)' : 'none',
              }}
            >
              [{item.label}]
            </button>
          );
        })}
      </nav>
    </header>
  );
}
