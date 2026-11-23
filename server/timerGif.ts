import sharp from 'sharp';

interface TimerGifConfig {
  s?: string;
  m?: string;
  t?: string;
  eh?: number;
  em?: number;
  el?: number;
  h?: string;
  e?: string;
  a?: string;
  b?: string;
  tc?: string;
  r?: number;
  ul?: string;
  sd?: number;
  ss?: number;
}

const UNITS: Record<string, { d: string; h: string; m: string; s: string }> = {
  uk: { d: 'днів', h: 'годин', m: 'хвилин', s: 'секунд' },
  ru: { d: 'дней', h: 'часов', m: 'минут', s: 'секунд' },
  en: { d: 'days', h: 'hours', m: 'minutes', s: 'seconds' },
};

function escXml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function isLightHex(hex: string): boolean {
  const clean = (hex || '#000000').replace('#', '');
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 145;
}

function decodeConfig(rawC: string): TimerGifConfig {
  try {
    let b64 = rawC.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const json = Buffer.from(b64, 'base64').toString('utf8');
    return JSON.parse(json) as TimerGifConfig;
  } catch {
    return {};
  }
}

function buildFrameSvg(cfg: TimerGifConfig, ms: number, W: number, H: number): string {
  const style = cfg.s || 'flip-dark';
  const bg = cfg.b || '#0f131e';
  const accent = cfg.a || '#00f0ff';
  const textCol = cfg.tc || '#ffffff';
  const radius = Math.min(28, Math.max(0, Number(cfg.r ?? 12)));
  const light = isLightHex(bg);
  const borderCol = light ? 'rgba(15,23,42,0.14)' : `${accent}55`;
  const showDays = cfg.sd !== 0;
  const showSecs = cfg.ss !== 0;
  const units = UNITS[cfg.ul || 'ru'] || UNITS.ru;

  const heading = (cfg.h || '').trim();
  const expiredText = (cfg.e || '00:00:00').trim();
  const hasHeading = Boolean(heading) && ms > 0;
  const centerY = hasHeading ? 104 : Math.round(H / 2);

  let inner = '';

  if (hasHeading) {
    inner += `<text x="${W / 2}" y="34" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="14" font-weight="600" fill="${escXml(textCol)}" opacity="0.88">${escXml(heading)}</text>`;
  }

  if (ms <= 0) {
    inner += `<text x="${W / 2}" y="${Math.round(H / 2) + 8}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="22" font-weight="700" fill="${escXml(accent)}">${escXml(expiredText)}</text>`;
  } else {
    const totalSec = Math.floor(ms / 1000);
    const dVal = Math.floor(totalSec / 86400);
    const hVal = showDays ? Math.floor((totalSec % 86400) / 3600) : Math.floor(totalSec / 3600);
    const mVal = Math.floor((totalSec % 3600) / 60);
    const sVal = totalSec % 60;

    const usePad = style !== 'minimal-clean' && !style.startsWith('ring-');
    const pad = (n: number) => (usePad ? String(n).padStart(2, '0') : String(n));

    const items: { val: string; raw: number; max: number; label: string }[] = [];
    if (showDays) items.push({ val: pad(dVal), raw: dVal, max: 30, label: units.d });
    items.push({ val: pad(hVal), raw: hVal, max: showDays ? 24 : 99, label: units.h });
    items.push({ val: pad(mVal), raw: mVal, max: 60, label: units.m });
    if (showSecs) items.push({ val: pad(sVal), raw: sVal, max: 60, label: units.s });

    const count = items.length;
    const step = count === 4 ? 116 : count === 3 ? 140 : 170;
    const startX = W / 2 - ((count - 1) * step) / 2;

    if (style === 'flip-light' || style === 'flip-dark') {
      const isFlipLight = style === 'flip-light';
      const topFill = isFlipLight ? '#e2e8f0' : '#374151';
      const botFill = isFlipLight ? '#ffffff' : '#111827';
      const digitFill = isFlipLight ? '#0f172a' : '#f9fafb';
      const strokeC = isFlipLight ? '#cbd5e1' : '#0f172a';
      const lineC = isFlipLight ? 'rgba(15,23,42,0.18)' : 'rgba(0,0,0,0.6)';

      items.forEach((it, idx) => {
        const cx = startX + idx * step;
        const digits = it.val.split('');
        const pairW = digits.length * 36 - 4;
        const dx0 = cx - pairW / 2;
        digits.forEach((dg, di) => {
          const x = dx0 + di * 36;
          const y = centerY - 26;
          inner += `<rect x="${x}" y="${y}" width="32" height="24" rx="5" fill="${topFill}" stroke="${strokeC}" stroke-width="1"/>`;
          inner += `<rect x="${x}" y="${y + 24}" width="32" height="24" rx="5" fill="${botFill}" stroke="${strokeC}" stroke-width="1"/>`;
          inner += `<line x1="${x}" y1="${y + 24}" x2="${x + 32}" y2="${y + 24}" stroke="${lineC}" stroke-width="1"/>`;
          inner += `<text x="${x + 16}" y="${y + 33}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="25" font-weight="700" fill="${digitFill}">${escXml(dg)}</text>`;
        });
        inner += `<text x="${cx}" y="${centerY + 39}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="${escXml(textCol)}" opacity="0.72">${escXml(it.label)}</text>`;
      });
    } else if (style.startsWith('ring-')) {
      const isThick = style === 'ring-light-thick';
      const isGradOrange = style === 'ring-light-orange';
      const sw = isThick ? 7 : 4;
      const track = light ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.14)';
      const ringStroke = isGradOrange ? '#f97316' : isThick ? '#06b6d4' : accent;
      const r = 36;
      const circ = 2 * Math.PI * r;

      items.forEach((it, idx) => {
        const cx = startX + idx * step;
        const cy = centerY + 2;
        const frac = Math.min(1, Math.max(0, it.raw / Math.max(1, it.max)));
        const offset = (circ * (1 - frac)).toFixed(2);
        if (!isGradOrange) {
          inner += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${track}" stroke-width="${sw}"/>`;
        }
        inner += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${escXml(ringStroke)}" stroke-width="${sw}" stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${offset}" stroke-linecap="${isThick ? 'butt' : 'round'}" transform="rotate(-90 ${cx} ${cy})"/>`;
        inner += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="19" font-weight="700" fill="${escXml(textCol)}">${escXml(it.val)}</text>`;
        inner += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="9" fill="${escXml(textCol)}" opacity="0.72">${escXml(it.label)}</text>`;
      });
    } else if (style === 'minimal-clean' || style === 'drum-light') {
      items.forEach((it, idx) => {
        const cx = startX + idx * step;
        inner += `<text x="${cx}" y="${centerY + 8}" text-anchor="middle" font-family="${style === 'drum-light' ? 'DejaVu Sans Mono, monospace' : 'DejaVu Sans, Arial, sans-serif'}" font-size="36" font-weight="${style === 'drum-light' ? '600' : '400'}" fill="${escXml(textCol)}">${escXml(it.val)}</text>`;
        inner += `<text x="${cx}" y="${centerY + 31}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="11" fill="${escXml(textCol)}" opacity="0.72">${escXml(it.label)}</text>`;
        if (idx > 0) {
          inner += `<text x="${cx - step / 2}" y="${centerY + 4}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="28" fill="${escXml(textCol)}" opacity="0.55">:</text>`;
        }
      });
    } else {
      // cards style
      const boxBg = light ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.07)';
      const cardW = 92;
      items.forEach((it, idx) => {
        const cx = startX + idx * step;
        inner += `<rect x="${cx - cardW / 2}" y="${centerY - 34}" width="${cardW}" height="68" rx="${Math.max(6, radius - 4)}" fill="${boxBg}" stroke="${escXml(accent)}44" stroke-width="1"/>`;
        inner += `<text x="${cx}" y="${centerY + 6}" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-size="28" font-weight="700" fill="${escXml(accent)}">${escXml(it.val)}</text>`;
        inner += `<text x="${cx}" y="${centerY + 24}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="10" fill="${escXml(textCol)}" opacity="0.75">${escXml(it.label)}</text>`;
      });
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="${radius}" fill="${escXml(bg)}" stroke="${escXml(borderCol)}" stroke-width="1.5"/>
  ${inner}
</svg>`;
}

export async function renderTimerGif(rawC: string): Promise<Buffer> {
  const cfg = decodeConfig(rawC);
  const W = 520;
  const hasHeading = Boolean((cfg.h || '').trim());
  const H = hasHeading ? 172 : 142;

  let baseMs = 0;
  const durMs = ((Number(cfg.eh) || 0) * 60 + (Number(cfg.em) || 0)) * 60000;
  if (cfg.m === 'evergreen') {
    baseMs = durMs;
  } else if (cfg.t) {
    baseMs = Math.max(0, new Date(cfg.t).getTime() - Date.now());
  } else {
    baseMs = 86400000;
  }

  const frameCount = baseMs <= 0 ? 1 : 25;
  const svgs: string[] = [];
  for (let i = 0; i < frameCount; i++) {
    let ms = baseMs - i * 1000;
    if (ms <= 0 && cfg.m === 'evergreen' && cfg.el && durMs > 0) {
      const elapsed = i * 1000;
      ms = durMs - (elapsed % durMs);
    }
    svgs.push(buildFrameSvg(cfg, Math.max(0, ms), W, H));
  }

  const rawFrames = await Promise.all(
    svgs.map((svg) => sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer())
  );

  return sharp(Buffer.concat(rawFrames), {
    raw: { width: W, height: H * frameCount, channels: 4, pageHeight: H },
  } as NonNullable<Parameters<typeof sharp>[1]>)
    .gif({ delay: new Array(frameCount).fill(1000), loop: 0 })
    .toBuffer();
}
