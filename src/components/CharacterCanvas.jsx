import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 64;
const LERP_FACTOR = 0.26; // ~35ms fast response with zero lag
const BG_COLOR = '#ad1114';

export default function CharacterCanvas({ onLoaded, cursorRef, onFacePosUpdate }) {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Store preloaded HTMLImageElements
  const framesRef = useRef([]);
  const centerFrameRef = useRef(null);

  // Animation state (angles in radians)
  const animStateRef = useRef({
    currentAngle: 0,
    targetAngle: 0,
    inDeadzone: true,
    lastFrameIdx: 0,
    faceX: 0,
    faceY: 0,
    deadzoneRadius: 100,
    lastSeenCursorTime: Date.now()
  });

  // Shortest-path circular angular lerp
  const lerpAngle = (current, target, factor) => {
    let diff = target - current;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    return current + diff * factor;
  };

  // Preload all 64 WebP frames + center.webp
  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    const totalToLoad = TOTAL_FRAMES + 1;
    const loadedImages = new Array(TOTAL_FRAMES);

    const onImageLoaded = () => {
      if (!mounted) return;
      loaded++;
      const progress = Math.round((loaded / totalToLoad) * 100);
      setLoadProgress(progress);

      if (loaded === totalToLoad) {
        framesRef.current = loadedImages;
        setIsReady(true);
        if (onLoaded) onLoaded();
      }
    };

    // Load center.webp
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImg.onload = () => {
      centerFrameRef.current = centerImg;
      onImageLoaded();
    };
    centerImg.onerror = () => {
      // Fallback path
      centerImg.src = '/center.webp';
      centerImg.onload = () => {
        centerFrameRef.current = centerImg;
        onImageLoaded();
      };
    };

    // Load 64 frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(2, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = () => {
        loadedImages[i] = img;
        onImageLoaded();
      };
      img.onerror = () => {
        console.error(`Failed to load frame_${numStr}.webp`);
        onImageLoaded();
      };
    }

    return () => {
      mounted = false;
    };
  }, [onLoaded]);

  // Main 60 FPS RequestAnimationFrame Loop
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for maximum rendering speed
    let animationFrameId;

    const render = () => {
      const state = animStateRef.current;
      const cursor = cursorRef ? cursorRef.current : { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

      const canvasW = canvas.width;
      const canvasH = canvas.height;
      const dpr = window.devicePixelRatio || 1;

      // Source image native dimensions (1280x720)
      const img = centerFrameRef.current || framesRef.current[0];
      if (img && img.naturalWidth) {
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        // object-fit: cover sizing
        const scale = Math.max(canvasW / imgW, canvasH / imgH);
        const renderW = imgW * scale;
        const renderH = imgH * scale;
        const offsetX = (canvasW - renderW) / 2;
        const offsetY = (canvasH - renderH) / 2;

        // Character face is at 50% X and ~40% Y of the image frame
        const faceX = offsetX + renderW * 0.50;
        const faceY = offsetY + renderH * 0.40;

        state.faceX = faceX;
        state.faceY = faceY;

        // 12% screen radius deadzone for eye contact
        const screenDim = Math.min(window.innerWidth, window.innerHeight);
        const deadzoneRadius = screenDim * 0.12 * dpr;
        state.deadzoneRadius = deadzoneRadius;

        if (onFacePosUpdate) {
          onFacePosUpdate({ x: faceX / dpr, y: faceY / dpr });
        }

        // Calculate cursor displacement from face
        const cursorX = (cursor.x || window.innerWidth / 2) * dpr;
        const cursorY = (cursor.y || window.innerHeight / 2) * dpr;
        const dx = cursorX - faceX;
        const dy = cursorY - faceY;
        const dist = Math.hypot(dx, dy);

        // Center eye-contact condition (cursor within deadzone or cursor inactive)
        const inDeadzone = dist < deadzoneRadius || !cursor.active;
        state.inDeadzone = inDeadzone;

        // Calculate target angle: atan2(dy, dx)
        if (!inDeadzone) {
          state.targetAngle = Math.atan2(dy, dx);
          // Apply shortest-path circular angular lerp (~0.26 factor, 35ms tracking)
          state.currentAngle = lerpAngle(state.currentAngle, state.targetAngle, LERP_FACTOR);
        }

        // Normalize smoothed angle to [0, 2*PI)
        const normAngle = ((state.currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        // Map to frame index 0..63
        const frameIdx = Math.round((normAngle / (2 * Math.PI)) * TOTAL_FRAMES) % TOTAL_FRAMES;
        state.lastFrameIdx = frameIdx;

        // Choose frame to render:
        // ZERO GHOSTING: Exactly ONE frame drawn at 100% opacity
        let frameToDraw = null;
        if (inDeadzone && centerFrameRef.current) {
          frameToDraw = centerFrameRef.current;
        } else if (framesRef.current[frameIdx]) {
          frameToDraw = framesRef.current[frameIdx];
        } else {
          frameToDraw = centerFrameRef.current || framesRef.current[0];
        }

        // 1. Fill solid background (matches #ad1114 seamlessly)
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, canvasW, canvasH);

        // 2. Draw exactly one crisp frame at 100% opacity (no alpha-blending!)
        if (frameToDraw && frameToDraw.complete) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(frameToDraw, offsetX, offsetY, renderW, renderH);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, cursorRef, onFacePosUpdate]);

  // Handle Resize and Retina / High-DPI screens
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Loading Progress Overlay */}
      {!isReady && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: BG_COLOR,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: '#ffffff',
          fontFamily: 'var(--font-sans)',
          transition: 'opacity 0.6s ease'
        }}>
          <div style={{
            fontSize: '13px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            opacity: 0.8
          }}>
            Haneesha — Portfolio
          </div>
          <div style={{
            width: '200px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: `${loadProgress}%`,
              height: '100%',
              backgroundColor: '#ffffff',
              transition: 'width 0.15s ease'
            }} />
          </div>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            marginTop: '12px',
            opacity: 0.5
          }}>
            PRE-LOADING FRAMES {loadProgress}%
          </div>
        </div>
      )}

      {/* 2D Flat Motionless Canvas Container: strictly NO 3D transform */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          backgroundColor: BG_COLOR,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </>
  );
}
