import React, { useMemo } from 'react';

const CODE_SNIPPETS = [
  'import { useState, useEffect } from "react";',
  'const [status, setStatus] = useState("idle");',
  'useEffect(() => { fetchApi() }, []);',
  'const api = "https://api.kray.digital/v1";',
  '<section className="py-24 relative overflow-hidden">',
  '<div className="grid grid-cols-1 md:grid-cols-3">',
  'const total = leads.reduce((acc, l) => acc + l.budget, 0);',
  'export default function App() {',
  'const { t, language, setLanguage } = useLanguage();',
  'margin: 0 auto; max-width: 1200px;',
  'background: linear-gradient(135deg, #0f131e, #07090e);',
  'box-shadow: 0 0 40px rgba(77, 208, 225, 0.15);',
  'const query = "SELECT * FROM leads WHERE status = \'new\'";',
  'await db.execute(query);',
  'border-color: var(--brand-outline-variant);',
  'const transition = { duration: 0.6, ease: "easeOut" };',
  'npm install @google/genai motion lucide-react',
  'const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });',
  'console.log("Kray Digital is fully initialized...");',
  'git commit -m "feat: implement advanced neural design"',
  'const res = await ai.models.generateContent({ model: "gemini-2.5-flash" });',
  'const bentoGrid = document.getElementById("bento-grid");',
  'transform: translate3d(0, 0, 0) scale(1.02);',
  '<motion.div animate={{ opacity: 1, y: 0 }} />',
  'statusText = language === "en" ? "Sent" : "Передано";'
];

function renderColoredSnippet(snip: string) {
  const tokens = snip.split(/(\s+|[{}()\[\];.,"'`])/g);
  let isComment = false;

  return tokens.map((token, i) => {
    if (!token) return null;

    if (isComment || token.startsWith('//')) {
      isComment = true;
      return <span key={i} className="text-cyan-500/80">{token}</span>;
    }

    if (['const', 'let', 'var', 'function', 'return', 'import', 'export', 'from', 'default', 'await', 'async', 'if', 'else', 'switch', 'case'].includes(token)) {
      return <span key={i} className="text-cyan-300 font-semibold">{token}</span>;
    }

    if (['useState', 'useEffect', 'useMemo', 'React', 'GoogleGenAI', 'App', 'LeadSubmission'].includes(token)) {
      return <span key={i} className="text-indigo-300 font-medium">{token}</span>;
    }

    if (token.startsWith('"') || token.endsWith('"') || token.startsWith("'") || token.endsWith("'")) {
      return <span key={i} className="text-emerald-300">{token}</span>;
    }

    if (/^\d+(\.\d+)?$/.test(token) || token.includes('%') || token.includes('₴')) {
      return <span key={i} className="text-amber-300">{token}</span>;
    }

    return <span key={i} className="text-cyan-100/90">{token}</span>;
  });
}

export default function AnimatedCodeBackground() {
  // Generate configuration for 10 columns across the screen width
  const columns = useMemo(() => {
    return Array.from({ length: 10 }).map((_, idx) => {
      // Create a large unique block of shuffled snippets to cover height
      let block: string[] = [];
      const repetitionsPerBlock = 8; // 8 blocks * 25 snippets = 200 snippets
      for (let i = 0; i < repetitionsPerBlock; i++) {
        const shuffled = [...CODE_SNIPPETS].sort(() => Math.random() - 0.5);
        block = block.concat(shuffled);
      }
      
      // Duplicate the block to allow seamless translateY(-50%) looping
      const columnSnippets = block.concat(block);

      const speed = 120 + Math.random() * 80; // Slower, silky smooth motion (120-200s per loop)
      const direction = idx % 2 === 0 ? 'animate-scroll-down' : 'animate-scroll-up';
      const opacity = 0.08 + Math.random() * 0.08; // Noticeably more visible, elegant high-tech glow
      const leftPosition = `${(idx * 10.5) + 1}%`; // Position across the page
      const fontSize = Math.random() > 0.5 ? 'text-[13px]' : 'text-[14px]';

      return {
        id: idx,
        snippets: columnSnippets,
        speed,
        direction,
        opacity,
        leftPosition,
        fontSize
      };
    });
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none bg-transparent"
      id="animated-code-bg"
    >
      <div className="relative w-full h-full">
        {columns.map((col) => (
          <div
            key={col.id}
            className="absolute top-0 bottom-0 flex flex-col overflow-hidden"
            style={{
              left: col.leftPosition,
              width: '340px',
              opacity: col.opacity,
              willChange: 'transform',
            }}
          >
            {/* Double wrapping to allow seamless looping */}
            <div 
              className={`flex flex-col gap-6 py-4 font-mono ${col.fontSize} tracking-wide whitespace-nowrap ${col.direction}`}
              style={{
                animationDuration: `${col.speed}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              {col.snippets.map((snip, sIdx) => (
                <div 
                  key={sIdx} 
                  className="transition-colors duration-500"
                >
                  {renderColoredSnippet(snip)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
