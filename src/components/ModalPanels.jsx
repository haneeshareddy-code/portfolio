import React from 'react';
import { X, ExternalLink, Mail, ArrowUpRight, FileText } from 'lucide-react';
import { playSoftClick, playPillHover } from '../utils/audio';

export default function ModalPanels({ activeModal, onClose, onHoverInteractive }) {
  if (!activeModal) return null;

  return (
    <div
      onClick={() => {
        playSoftClick();
        onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(50, 4, 6, 0.62)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '580px',
          maxHeight: '88vh',
          overflowY: 'auto',
          backgroundColor: 'rgba(173, 17, 20, 0.94)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '24px',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
          color: '#ffffff',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSoftClick();
            onClose();
          }}
          aria-label="Close modal"
          onMouseEnter={() => onHoverInteractive(true)}
          onMouseLeave={() => onHoverInteractive(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={18} />
        </button>

        {/* 1. WORK SECTION — SELECTED WEBSITE PROJECTS */}
        {activeModal === 'work' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '6px' }}>
              Personal Experiments
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '18px', letterSpacing: '-0.01em' }}>
              Selected Website Projects
            </h2>

            {/* 3 Project Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              {/* Project 1: Artcom Vizag Vibes */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>
                  Artcom Vizag Vibes
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)' }}>
                  A creative website exploring visual presentation, layout, and digital design for Artcom Vizag Vibes.
                </p>
                <div>
                  <a
                    href="https://artcom-vizag-vibes-skox.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSoftClick()}
                    onMouseEnter={() => {
                      playPillHover();
                      onHoverInteractive(true);
                    }}
                    onMouseLeave={() => onHoverInteractive(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      color: '#ad1114',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <span>Visit Website</span>
                    <ExternalLink size={13} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Project 2: Pixel Perfect Replicator */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>
                  Pixel Perfect Replicator
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)' }}>
                  A website-building experiment focused on exploring web layouts, visual details, and interface design.
                </p>
                <div>
                  <a
                    href="https://pixel-perfect-replicator-6427.lovable.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSoftClick()}
                    onMouseEnter={() => {
                      playPillHover();
                      onHoverInteractive(true);
                    }}
                    onMouseLeave={() => onHoverInteractive(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      color: '#ad1114',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <span>Visit Website</span>
                    <ExternalLink size={13} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Project 3: Brew & Bistro */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>
                  Brew & Bistro
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)' }}>
                  A café-themed website experiment exploring visual presentation, branding, and the design of a food and beverage concept.
                </p>
                <div>
                  <a
                    href="https://brew-n-bistro-heart.lovable.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSoftClick()}
                    onMouseEnter={() => {
                      playPillHover();
                      onHoverInteractive(true);
                    }}
                    onMouseLeave={() => onHoverInteractive(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      color: '#ad1114',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <span>Visit Website</span>
                    <ExternalLink size={13} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* Honest Note About Projects */}
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '12.5px',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.82)'
              }}
            >
              These websites were developed with the assistance of AI tools as personal experiments to explore my interest in website design, layouts, and visual presentation. They are frontend-focused projects and do not currently include custom backend functionality.
            </div>
          </div>
        )}

        {/* 2. ABOUT SECTION — SIMPLE AND GENUINE */}
        {activeModal === 'about' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '6px' }}>
              Student Profile
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
              About Haneesha
            </h2>

            {/* Exact Genuine Introduction */}
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.92)', marginBottom: '22px' }}>
              Hi, I’m Haneesha, a student interested in creativity, visual presentation, and exploring ideas through digital projects. I enjoy experimenting with website design using AI tools and creating edits using Instagram Edits. I’m still learning, exploring different creative possibilities, and looking forward to opportunities where I can grow my skills.
            </p>

            {/* Currently Exploring Subsection */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: '12px' }}>
                Currently Exploring
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Category 1: Website Creation */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.07)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff', marginBottom: '3px' }}>
                    Website Creation
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                    Exploring website layouts and visual design with AI-assisted tools.
                  </div>
                </div>

                {/* Category 2: Video Editing */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.07)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff', marginBottom: '3px' }}>
                    Video Editing
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                    Basic edits using Instagram Edits.
                  </div>
                </div>

                {/* Category 3: Design */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.07)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff', marginBottom: '3px' }}>
                    Design
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                    Basic visual design and creative layouts using Canva.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CONTACT SECTION — EMAIL ONLY */}
        {activeModal === 'contact' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '6px' }}>
              Get In Touch
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '14px', letterSpacing: '-0.01em' }}>
              Contact
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '24px' }}>
              Feel free to reach out directly via email for any inquiries, conversations, or creative opportunities.
            </p>

            {/* Email Card Display */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '16px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                <Mail size={20} strokeWidth={2} />
                <a
                  href="mailto:smunakal@student.gitam.edu"
                  onClick={() => playSoftClick()}
                  onMouseEnter={() => {
                    playPillHover();
                    onHoverInteractive(true);
                  }}
                  onMouseLeave={() => onHoverInteractive(false)}
                  style={{
                    color: '#ffffff',
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    wordBreak: 'break-all'
                  }}
                >
                  smunakal@student.gitam.edu
                </a>
              </div>

              {/* Small "Email Me" button */}
              <a
                href="mailto:smunakal@student.gitam.edu"
                onClick={() => playSoftClick()}
                onMouseEnter={() => {
                  playPillHover();
                  onHoverInteractive(true);
                }}
                onMouseLeave={() => onHoverInteractive(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  color: '#ad1114',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.22)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.22)';
                }}
              >
                <span>Email Me</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        )}

        {/* 4. RESUME MODAL — OPENS ACTUAL RESUME PDF */}
        {activeModal === 'resume' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '6px' }}>
              Student Resume
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '14px', letterSpacing: '-0.01em' }}>
              Haneesha Reddy — Resume
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '22px' }}>
              View my official resume PDF detailing my academic credentials, leadership projects, and extracurricular activities.
            </p>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
              onClick={() => playSoftClick()}
              onMouseEnter={() => {
                playPillHover();
                onHoverInteractive(true);
              }}
              onMouseLeave={() => onHoverInteractive(false)}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                color: '#ad1114',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 22px rgba(0, 0, 0, 0.35)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.25)';
              }}
            >
              <FileText size={17} strokeWidth={2.5} />
              <span>View Resume (PDF)</span>
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
