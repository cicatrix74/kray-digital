import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface ShortLinkRecord {
  code: string;
  url: string;
  createdAt: string;
  clicks: number;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'short-links.json');

let store: Record<string, ShortLinkRecord> = {};
let loaded = false;

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') store = parsed;
    }
  } catch {
    store = {};
  }
}

function persist() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('[shortLinks] persist failed:', err);
  }
}

function genCode(len = 6): string {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
  const bytes = crypto.randomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) {
    out += chars[bytes[i] % chars.length];
  }
  return out;
}

export function createShortLink(rawUrl: string, customAlias?: string): { ok: true; record: ShortLinkRecord } | { ok: false; error: string } {
  ensureLoaded();
  let parsedUrl: URL;
  try {
    parsedUrl = new URL((rawUrl || '').trim());
  } catch {
    return { ok: false, error: 'INVALID_URL' };
  }
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return { ok: false, error: 'INVALID_PROTOCOL' };
  }

  let code = '';
  const alias = (customAlias || '').trim();
  if (alias) {
    if (!/^[a-zA-Z0-9_-]{3,32}$/.test(alias)) {
      return { ok: false, error: 'INVALID_ALIAS' };
    }
    if (store[alias]) {
      return { ok: false, error: 'ALIAS_TAKEN' };
    }
    code = alias;
  } else {
    do {
      code = genCode(6);
    } while (store[code]);
  }

  const record: ShortLinkRecord = {
    code,
    url: parsedUrl.toString(),
    createdAt: new Date().toISOString(),
    clicks: 0,
  };
  store[code] = record;
  persist();
  return { ok: true, record };
}

export function resolveShortLink(code: string): ShortLinkRecord | null {
  ensureLoaded();
  const rec = store[code];
  if (!rec) return null;
  rec.clicks += 1;
  persist();
  return rec;
}

export function getShortLinkStats(code: string): ShortLinkRecord | null {
  ensureLoaded();
  return store[code] || null;
}
