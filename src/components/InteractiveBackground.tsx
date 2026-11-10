import React, { useEffect, useRef } from 'react';

// Highly relevant, high-tech Ukrainian digital agency code phrases & modern code structures
const CODE_SNIPPETS = [
  "import React, { useState, useEffect } from 'react';",
  "import { motion, AnimatePresence } from 'motion/react';",
  "const [leads, setLeads] = useState<LeadSubmission[]>([]);",
  "const budget = price * multiplier;",
  "const days = Math.round(activeScale.days * timeMultiplier);",
  "export default function CalculatorModal({ isOpen }) {",
  "  const [step, setStep] = useState(1);",
  "  const getCalculation = () => {",
  "    const finalPrice = Math.round(rawPrice * multiplier);",
  "    return { price: finalPrice, days: finalDays };",
  "  };",
  "// DIGITAL.AGENCY: Створюємо високотехнологічне цифрове майбутнє",
  "// SEO-оптимізація та просування по всій країні (Україна)",
  "// Google Ads ROI: +320% окупність інвестицій",
  "// SMM: Формування лояльного ком'юніті & залученість +320%",
  "console.log('CRM: Вхідна заявка успішно передана менеджеру');",
  "fetch('/api/v1/leads', { method: 'POST', body: JSON.stringify(lead) });",
  "const config = { database: 'localStorage', secure: true, ssl: 'active' };",
  "const stats = { totalLeads: leads.length, completed: completed.length };",
  "tailwindClass: 'bg-brand-surface border-glow shadow-glow animate-pulse',",
  "const rawLead = { name, phone, service, budget, timeline };",
  "const formattedDate = now.toLocaleString('uk-UA');",
  "const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);",
  "const [isCasesOpen, setIsCasesOpen] = useState(false);",
  "const handleUpdateStatus = (id, status) => {",
  "  const updated = leads.map(l => l.id === id ? { ...l, status } : l);",
  "  saveLeads(updated);",
  "};",
  "// Створюємо сайти, які продають, та виводимо їх у топ Google",
  "const seoRank = await checkGoogleRank('ukraine', 'seo-оптимізація');",
  "const results = ['Збільшення мобільної конверсії на 42%', 'Швидкість 0.8s'];",
  "const activeCase = CASE_STUDIES.find(c => c.id === activeCaseId);",
  "const getCategoryIcon = (category) => { switch (category) { ... } };",
  "const particles = Array.from({ length: 50 }, () => new CodeNode());",
  "ctx.strokeStyle = 'rgba(77, 208, 225, 0.15)';",
  "ctx.font = '12px JetBrains Mono, monospace';"
];

interface CodeStream {
  id: number;
  x: number;
  y: number;
  speed: number;
  snippet: string;
  charsTyped: number;
  typeDelay: number;
  typeTimer: number;
  opacity: number;
  targetOpacity: number;
  fontSize: number;
  state: 'typing' | 'waiting' | 'fading';
  waitTimer: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 220 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Use actual parent element size to avoid vertical stretching/compression of the canvas
    const parent = canvas.parentElement;
    let width = (canvas.width = parent ? parent.offsetWidth : window.innerWidth);
    let height = (canvas.height = parent ? parent.offsetHeight : window.innerHeight);

    const streams: CodeStream[] = [];

    // Initialize or reset a single code stream
    const initStream = (id: number, isInitial = false): CodeStream => {
      const fontSize = Math.floor(Math.random() * 3) + 14; // 14px to 16px for prominent readability
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      
      return {
        id,
        // Distribute nicely or pick random columns
        x: Math.random() * (width - 150) + 50,
        // Distribute Y across the entire canvas height, both initially and when respawning
        y: Math.random() * (height - 100) + 50,
        speed: (Math.random() * 0.08 + 0.03) * (Math.random() > 0.4 ? 1 : -1), // Ultra-gentle, silky drift
        snippet,
        charsTyped: isInitial ? Math.floor(Math.random() * snippet.length) : 0,
        typeDelay: Math.random() * 2.2 + 1.2, // Smoother, calmer typing rhythm
        typeTimer: 0,
        opacity: isInitial ? (Math.random() * 0.08 + 0.06) : 0,
        targetOpacity: Math.random() * 0.12 + 0.10, // Crisp, prominent high-tech code visibility
        fontSize,
        state: isInitial ? 'waiting' : 'typing',
        waitTimer: Math.random() * 400 + 250 // Stays visible significantly longer
      };
    };

    const initAllStreams = () => {
      streams.length = 0;
      
      // Calculate high-density stream count based on both width and height to cover the full site length
      const verticalSlots = Math.floor(height / 120);
      const horizontalSlots = Math.floor(width / 180);
      const multiplier = width < 768 ? 0.22 : 0.42; // adjust density on mobile to preserve resources
      const calculated = Math.floor(verticalSlots * horizontalSlots * multiplier);
      const streamCount = Math.min(width < 768 ? 32 : 96, Math.max(width < 768 ? 16 : 48, calculated));
      
      for (let i = 0; i < streamCount; i++) {
        streams.push(initStream(i, true));
      }
    };

    // Performs light syntax highlighting directly onto the canvas
    const drawSyntaxHighlightedCode = (
      context: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      baseOpacity: number
    ) => {
      // Tokenize the code fragment simply
      const tokens = text.split(/(\s+|[{}()\[\];.,])/g);
      let currentX = x;
      let isComment = false;

      tokens.forEach((token) => {
        if (!token) return;

        let color = `rgba(180, 215, 220, ${baseOpacity})`; // Default soft gray-teal

        if (isComment || token.startsWith('//')) {
          isComment = true;
          color = `rgba(100, 130, 135, ${baseOpacity * 0.85})`; // Gray-cyan comments
        } else if (
          ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'from', 'default', 'class', 'await', 'async', 'if', 'else', 'switch', 'case', 'extends'].includes(
            token
          )
        ) {
          color = `rgba(77, 208, 225, ${baseOpacity * 1.25})`; // Bright brand turquoise/teal keyword
        } else if (
          ['useState', 'useEffect', 'AnimatePresence', 'LeadSubmission', 'true', 'false', 'Math', 'localStorage', 'Date', 'window', 'document'].includes(
            token
          )
        ) {
          color = `rgba(179, 157, 219, ${baseOpacity * 1.15})`; // Soft purple/indigo standard types
        } else if (
          token.startsWith("'") ||
          token.endsWith("'") ||
          token.startsWith('"') ||
          token.endsWith('"') ||
          token.startsWith('`')
        ) {
          color = `rgba(128, 203, 196, ${baseOpacity * 1.1})`; // Gentle green strings
        } else if (/^\d+(\.\d+)?$/.test(token) || token.includes('₴') || token.includes('%')) {
          color = `rgba(255, 183, 77, ${baseOpacity * 1.2})`; // Golden orange numbers and KPIs
        }

        context.fillStyle = color;
        context.fillText(token, currentX, y);
        currentX += context.measureText(token).width;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Set monospace font for coding background
      ctx.font = '12px "JetBrains Mono", "Fira Code", ui-monospace, monospace';
      ctx.textBaseline = 'top';

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const radius = mouseRef.current.radius;

      // Update and draw each stream
      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];

        // 1. Calculate proximity to mouse cursor for glow interaction
        const dx = mouseX - s.x;
        const dy = mouseY - s.y;
        const dist = Math.hypot(dx, dy);
        let glowMultiplier = 1.0;

        if (dist < radius) {
          // Double the brightness of lines close to user cursor
          const factor = (radius - dist) / radius;
          glowMultiplier = 1.0 + factor * 2.2;
        }

        // 2. State Machine for Typing Animation
        if (s.state === 'typing') {
          s.opacity = Math.min(s.targetOpacity, s.opacity + 0.0025);
          s.typeTimer++;
          if (s.typeTimer >= s.typeDelay) {
            s.typeTimer = 0;
            // Type 1 character at a time for graceful, smooth typing
            s.charsTyped += 1;
            if (s.charsTyped >= s.snippet.length) {
              s.charsTyped = s.snippet.length;
              s.state = 'waiting';
              s.waitTimer = Math.random() * 400 + 250; // Keep fully typed line on screen
            }
          }
        } else if (s.state === 'waiting') {
          s.waitTimer--;
          if (s.waitTimer <= 0) {
            s.state = 'fading';
          }
          // Organic, gentle floating drift
          s.y += s.speed;
        } else if (s.state === 'fading') {
          s.opacity = Math.max(0, s.opacity - 0.0015);
          s.y += s.speed * 0.5;
          if (s.opacity <= 0) {
            // Re-spawn stream as a fresh coding block
            streams[i] = initStream(s.id, false);
            continue;
          }
        }

        // Ensure lines don't drift off screen vertically
        if (s.y > height) {
          s.y = 10;
        } else if (s.y < 0) {
          s.y = height - 20;
        }

        // 3. Render the active typed part of the code snippet with enlarged font
        ctx.font = `${s.fontSize}px "JetBrains Mono", "Fira Code", ui-monospace, monospace`;
        const activeText = s.snippet.substring(0, s.charsTyped);
        const activeOpacity = s.opacity * glowMultiplier;

        if (activeText) {
          drawSyntaxHighlightedCode(ctx, activeText, s.x, s.y, activeOpacity);
        }

        // 4. Interactive connection lines: Connect closely floating coding blocks
        for (let j = i + 1; j < streams.length; j++) {
          const s2 = streams[j];
          const distBetween = Math.hypot(s.x - s2.x, s.y - s2.y);
          if (distBetween < 180 && s.state === 'waiting' && s2.state === 'waiting') {
            const lineOpacity = Math.min(s.opacity, s2.opacity) * (180 - distBetween) / 180 * 0.18;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y + 6);
            ctx.lineTo(s2.x, s2.y + 6);
            ctx.strokeStyle = `rgba(77, 208, 225, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // 5. Connect cursor to closest streams with super thin glowing digital lines
        if (dist < radius - 40 && s.charsTyped > 5) {
          const lineToCursorOpacity = ( (radius - 40 - dist) / radius ) * 0.08;
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(s.x, s.y + 6);
          ctx.strokeStyle = `rgba(179, 157, 219, ${lineToCursorOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Global events
    const handleMouseMove = (event: MouseEvent) => {
      // Add scroll offset so interaction remains perfectly aligned with elements on scroll
      mouseRef.current.x = event.clientX + window.scrollX;
      mouseRef.current.y = event.clientY + window.scrollY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Robust ResizeObserver to dynamically adapt canvas and stream quantities to dynamic container height
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const newWidth = Math.floor(rect.width);
        const newHeight = Math.floor(rect.height);
        
        // Prevent layout loops and only update on genuine size shifts
        if (newWidth > 20 && newHeight > 20 && (newWidth !== width || newHeight !== height)) {
          width = canvas.width = parent ? parent.offsetWidth : newWidth;
          height = canvas.height = parent ? parent.offsetHeight : newHeight;
          initAllStreams();
        }
      }
    });

    if (parent) {
      resizeObserver.observe(parent);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    initAllStreams();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" id="interactive-background">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      
      {/* Ambient mouse glow aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[400px] h-[400px] bg-brand-primary-container/3 blur-[140px] rounded-full mix-blend-screen transition-all duration-300 ease-out"
          style={{
            left: 'var(--mouse-x, 30%)',
            top: 'var(--mouse-y, 40%)',
            transform: 'translate(-50%, -50%)',
          }}
          id="ambient-mouse-orb"
        />
      </div>
    </div>
  );
}
