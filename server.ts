import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Chat API Route for Kray Digital Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, language } = req.body;

    const langName = language === 'uk' ? 'Ukrainian' : language === 'ru' ? 'Russian' : 'English';

    const systemInstruction = `You are "Kray AI Assistant", an expert virtual consultant for Kray Digital agency.
Your goal is to answer client questions about Kray Digital's services, pricing, timelines, technology stack, and portfolio in a friendly, concise, and professional manner.

LANGUAGE RULE:
- Primary interface language requested by user is: ${langName}.
- Always respond in the language of the user's message (Ukrainian, Russian, or English).

AGENCY BACKGROUND & SERVICES:
1. Website Development (Розробка сайтів / Разработка сайтов):
   - High-converting landing pages, corporate portals, custom web applications, e-commerce platforms.
   - Tech Stack: React, Next.js, TypeScript, Tailwind CSS, Node.js, REST & GraphQL APIs, CMS integration.
   - Timelines: 14 to 45 days. Budget range: $800 - $3,500+.
2. SEO Optimization (SEO-оптимізація / SEO-оптимизация):
   - Full technical audit, semantic core expansion, E-E-A-T content strategy, local SEO, organic search growth on Google.
   - Results: Consistent traffic growth, top-10 positions, long-term ROI.
   - Budget range: $400 - $1,200/month.
3. Google & Social Media Advertising (PPC / Google Реклама / Таргетована реклама):
   - Targeted ad campaigns on Google Search, Performance Max, Meta Ads (Facebook/Instagram).
   - Fast high-quality lead generation, ROI tracking, end-to-end web analytics.
   - Timelines: Campaign setup in 3-5 days.
4. SMM & Brand Management (SMM та ведення / SMM и ведение):
   - Content strategy, visual design, audience engagement, brand reputation, UGC content.
5. Mobile App Development (Мобільні додатки / Мобильные приложения):
   - Cross-platform iOS & Android mobile apps with React Native.

AGENCY ADVANTAGES:
- 10+ years of digital experience & 150+ successfully delivered projects.
- KPI-driven model linked directly to client sales & traffic.
- Free initial audit of digital assets.
- Interactive online cost calculator on our website.

RESPONSE STYLE & TONE:
- Be polite, direct, concise, and structured (use bullet points when listing features).
- Keep answers relatively short (2-4 paragraphs max) so they fit nicely in a chat window.
- Suggest next actions when relevant (e.g. "You can use our interactive cost calculator or request a free consultation right here on the site!").`;

    // Process chat history into contents format
    let contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
    } else {
      contents = [{ role: 'user', parts: [{ text: 'Hello, what services do you offer?' }] }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response at the moment. Please try asking again!";

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error?.message || 'Server error',
    });
  }
});

// Download project source archive endpoint
app.get('/api/download-source', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const archivePath = '/tmp/project-source.tar.gz';

    // If pre-built archive exists, send it directly
    if (fs.existsSync(archivePath)) {
      res.setHeader('Content-Type', 'application/gzip');
      res.setHeader('Content-Disposition', 'attachment; filename="kray-digital-source.tar.gz"');
      const fileStream = fs.createReadStream(archivePath);
      fileStream.pipe(res);
      return;
    }

    // Otherwise create dynamically
    const { spawn } = require('child_process');
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', 'attachment; filename="kray-digital-source.tar.gz"');
    const tar = spawn('tar', [
      '--exclude=node_modules',
      '--exclude=.git',
      '--exclude=.aistudio',
      '--exclude=dist',
      '-czf', '-', '.'
    ], { cwd: process.cwd() });
    tar.stdout.pipe(res);
  } catch (e: any) {
    res.status(500).send('Download error: ' + e?.message);
  }
});

// Start Express server with Vite middleware in dev mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
