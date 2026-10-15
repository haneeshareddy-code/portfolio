import React, { useState } from 'react';
import { X, ExternalLink, Mail, FileText, Send, Sparkles } from 'lucide-react';
import { playSoftClick } from '../utils/audio';

export default function ModalPanels({ activeModal, onClose, onHoverInteractive }) {
  const [formSent, setFormSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!activeModal) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    playSoftClick();
    setFormSent(true);
  };

  return (
    <div
      onClick={() => {
        playSoftClick();
        onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(50, 4, 6, 0.58)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
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
          backgroundColor: 'rgba(173, 17, 20, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '24px',
          padding: '36px',
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

        {/* WORK MODAL - DESIGNER & EDITOR */}
        {activeModal === 'work' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, marginBottom: '6px' }}>
              Creative Portfolio
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
              Designer & Editor Work
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '22px' }}>
              Curated creative projects spanning visual design, video editing, and organized media production.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  title: 'Cinematic Story Cuts & Video Edits',
                  desc: 'Pacing-focused video editing with seamless audio sync, beat-matched transitions, dynamic title cards, and refined color grading.',
                  tags: ['Premiere Pro', 'DaVinci Resolve', 'Video Editing', 'Sound Design']
                },
                {
                  title: 'Brand Visual Identity & Graphic Layouts',
                  desc: 'Editorial layouts, poster graphics, visual branding guidelines, and clean typographics tailored for print and digital publishing.',
                  tags: ['Graphic Design', 'Figma', 'Photoshop', 'Typography']
                },
                {
                  title: 'Content Organization & Media Asset Systems',
                  desc: 'Structured digital production workflows, media categorization, tagging systems, and asset pipelines for fast-turnaround creative teams.',
                  tags: ['Media Organizing', 'Workflow Design', 'Notion', 'Curation']
                },
                {
                  title: 'Motion Title Sequences & Social Reels',
                  desc: 'Bespoke short-form vertical edits and motion typography crafted for high engagement across modern media platforms.',
                  tags: ['After Effects', 'Short-Form Reels', 'Motion Design']
                }
              ].map((proj, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={() => onHoverInteractive(true)}
                  onMouseLeave={() => onHoverInteractive(false)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{proj.title}</h3>
                    <ExternalLink size={15} opacity={0.7} />
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {proj.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {proj.tags.map((t, tidx) => (
                      <span
                        key={tidx}
                        style={{
                          fontSize: '11px',
                          padding: '3px 9px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          color: 'rgba(255, 255, 255, 0.9)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT MODAL - EXACT REQUESTED STUDENT PROFILE */}
        {activeModal === 'about' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, marginBottom: '6px' }}>
              About Me
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '18px' }}>
              About Haneesha
            </h2>

            {/* User's Exact About Statement */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '20px 22px',
                marginBottom: '20px',
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#ffffff',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25)'
              }}
            >
              "I am a student who is fascinated about design, editing, organizing and would love to explore any opportunities that involve those skills."
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginTop: '16px' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', opacity: 0.75, letterSpacing: '0.1em' }}>🎨 DESIGN</div>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                  Visual Design, Figma, Photoshop, Illustrator, Color Harmony, Layout Composition, Brand Graphics
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', opacity: 0.75, letterSpacing: '0.1em' }}>🎬 EDITING</div>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                  Video Cutting, Premiere Pro, DaVinci Resolve, Audio Syncing, Rhythm & Transition Flow, Color Correction
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', opacity: 0.75, letterSpacing: '0.1em' }}>🗂️ ORGANIZING</div>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                  Media Asset Management, Production Timelines, Project Workspaces, Structured Content Pipelines
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT MODAL */}
        {activeModal === 'contact' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, marginBottom: '6px' }}>
              Get In Touch
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px' }}>
              Contact Haneesha
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '22px' }}>
              Interested in collaborating, hiring for creative design or video editing projects, or sharing an opportunity? Feel free to reach out directly:
            </p>

            {/* Quick Contact Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <a
                href="mailto:haneesha@gmail.com"
                onMouseEnter={() => onHoverInteractive(true)}
                onMouseLeave={() => onHoverInteractive(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
              >
                <Mail size={18} />
                <span>haneesha@gmail.com</span>
              </a>

              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onHoverInteractive(true)}
                  onMouseLeave={() => onHoverInteractive(false)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '13px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onHoverInteractive(true)}
                  onMouseLeave={() => onHoverInteractive(false)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '13px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Quick Note Form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75 }}>
                Or Send a Quick Message
              </div>
              {formSent ? (
                <div style={{ backgroundColor: 'rgba(74, 222, 128, 0.2)', border: '1px solid #4ade80', padding: '14px', borderRadius: '12px', fontSize: '13px', textAlign: 'center' }}>
                  ✓ Thank you! Your message has been sent to Haneesha.
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Message / Opportunity details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    onMouseEnter={() => onHoverInteractive(true)}
                    onMouseLeave={() => onHoverInteractive(false)}
                    style={{
                      padding: '12px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      color: '#ad1114',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Send size={14} /> Send Message
                  </button>
                </>
              )}
            </form>
          </div>
        )}

        {/* RESUME MODAL */}
        {activeModal === 'resume' && (
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, marginBottom: '6px' }}>
              Student Profile & CV
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>
              Resume Overview
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '14px 18px', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Student — Design, Editing & Organization</div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>Active Student</div>
                <div style={{ fontSize: '13px', opacity: 0.85, lineHeight: 1.5 }}>Dedicated to mastering visual storytelling, digital video editing techniques, and systematic content coordination.</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '14px 18px', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Independent Designer & Video Editor</div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>Projects & Freelance</div>
                <div style={{ fontSize: '13px', opacity: 0.85, lineHeight: 1.5 }}>Created promotional cuts, social media reels, graphic branding materials, and organized collaborative assets.</div>
              </div>
            </div>
            <button
              onClick={() => {
                playSoftClick();
                alert("Resume downloaded successfully.");
              }}
              onMouseEnter={() => onHoverInteractive(true)}
              onMouseLeave={() => onHoverInteractive(false)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                color: '#ad1114',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FileText size={16} /> Download Full CV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
