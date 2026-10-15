import React from 'react';
import { ArrowUpRight, MessageSquare, Download } from 'lucide-react';
import { playSoftClick, playPillHover } from '../utils/audio';

export default function HeroTypography({ onHoverInteractive, onOpenResume, onOpenContact }) {
  return (
    <div style={{
      position: 'absolute',
      left: 'clamp(24px, 5vw, 64px)',
      bottom: 'clamp(32px, 6vh, 64px)',
      zIndex: 50,
      maxWidth: '380px',
      pointerEvents: 'none', // children enable pointerEvents
    }}>
      {/* Intro Salutation */}
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: 'rgba(255, 255, 255, 0.88)',
        marginBottom: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>Hi, I am</span>
        <span style={{
          width: '24px',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.4)'
        }} />
      </div>

      {/* Cursive Name Signature */}
      <h1
        className="cursive-signature"
        style={{
          fontSize: 'clamp(56px, 6.5vw, 88px)',
          fontWeight: 700,
          lineHeight: 1.05,
          color: '#ffffff',
          marginBottom: '14px',
          letterSpacing: '-0.01em',
          transform: 'translateY(-4px)'
        }}
      >
        Haneesha
      </h1>

      {/* Role Subtitle */}
      <div style={{
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '10px'
      }}>
        Creative Explorer | Student
      </div>

      {/* Compact 3-Line Bio */}
      <p style={{
        fontSize: '14px',
        lineHeight: 1.6,
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.88)',
        maxWidth: '340px',
        marginBottom: '28px',
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
      }}>
        I am a student who is fascinated about design, editing, organizing and would love to explore any opportunities that involve those skills.
      </p>

      {/* Two Stylish White Pill Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        pointerEvents: 'auto'
      }}>
        {/* Solid White Resume Pill */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume"
          onClick={() => {
            playSoftClick();
          }}
          onMouseEnter={() => {
            playPillHover();
            onHoverInteractive(true);
          }}
          onMouseLeave={() => {
            onHoverInteractive(false);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            color: '#ad1114',
            border: 'none',
            borderRadius: '9999px',
            padding: '12px 24px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            outline: 'none',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.35), 0 0 16px rgba(255, 255, 255, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.15)';
          }}
        >
          <span>Resume</span>
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </a>

        {/* Frosted Glass / White Border "Let's Talk" Pill */}
        <button
          onClick={() => {
            playSoftClick();
            if (onOpenContact) onOpenContact();
          }}
          onMouseEnter={() => {
            playPillHover();
            onHoverInteractive(true);
          }}
          onMouseLeave={() => {
            onHoverInteractive(false);
          }}
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            border: '1.5px solid rgba(255, 255, 255, 0.75)',
            borderRadius: '9999px',
            padding: '11px 22px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            outline: 'none',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.borderColor = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.75)';
          }}
        >
          <span>Let's Talk</span>
          <MessageSquare size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
