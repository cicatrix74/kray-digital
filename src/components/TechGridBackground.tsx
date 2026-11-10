import React, { useState, useEffect } from 'react';

export default function TechGridBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    // Only track cursor spotlight on devices with a physical mouse/pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#0a0d14]"
      id="tech-grid-bg"
    >
      {/* 1. Desktop-Only Modern Agency Workspace Atmosphere (Hidden on mobile for maximum speed) */}
      <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <picture>
          <source 
            media="(min-width: 768px)" 
            srcSet="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=75&w=1600" 
          />
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            alt="Modern Agency Office Workspace"
            loading="lazy"
            decoding="async"
            width="1600"
            height="900"
            className="w-full h-full object-cover object-top opacity-20 filter grayscale contrast-125 scale-[1.02] transition-transform duration-1000 ease-out"
          />
        </picture>
        {/* Cinematic dark gradients to keep text 100% readable and contrast-rich */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/75 to-[#0a0d14]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d14] via-transparent to-[#0a0d14]/85" />
      </div>

      {/* 2. Base Blueprint Grid Pattern (SVG) - 100% Vector & 0ms Load */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.14] stroke-cyan-400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Small 16x16 grid */}
          <pattern id="small-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>
          {/* Main 64x64 grid with crosshairs */}
          <pattern id="main-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <rect width="64" height="64" fill="url(#small-grid)" />
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.9" />
            {/* Fine crosshair intersection */}
            <circle cx="0" cy="0" r="1.5" fill="currentColor" fillOpacity="0.9" />
            <circle cx="64" cy="64" r="1.5" fill="currentColor" fillOpacity="0.9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#main-grid)" />
      </svg>

      {/* 2. Top Hero Ambient Glows (Smooth Cyan & Indigo Lighting) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] opacity-40 blur-[130px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(77, 208, 225, 0.45) 0%, rgba(13, 71, 161, 0.25) 45%, transparent 70%)'
        }}
      />
      
      <div 
        className="absolute top-20 right-[-10%] w-[600px] h-[450px] opacity-25 blur-[120px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 188, 212, 0.35) 0%, rgba(38, 166, 154, 0.15) 50%, transparent 70%)'
        }}
      />

      {/* 3. Interactive Cursor Spotlight (Calm, Smooth Glow under the grid) */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none transition-transform duration-200 ease-out will-change-transform opacity-30"
        style={{
          transform: `translate3d(${mousePos.x - 350}px, ${mousePos.y - 350}px, 0)`,
          background: 'radial-gradient(circle, rgba(77, 208, 225, 0.35) 0%, rgba(77, 208, 225, 0.08) 40%, transparent 70%)'
        }}
      />

      {/* 4. Soft Vignette: Fades out grid at screen edges and keeps text 100% legible */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 25%, transparent 40%, #0a0d14 90%)'
        }}
      />
    </div>
  );
}
