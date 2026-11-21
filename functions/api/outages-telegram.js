function decodeHtmlEntities(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'");
}

function extractTimeHint(text) {
  const rangeMatch = text.match(/(?:з|с)\s+\d{1,2}[:.]\d{2}\s+(?:до|по)\s+\d{1,2}[:.]\d{2}/i);
  if (rangeMatch) return rangeMatch[0];
  const untilMatch = text.match(/(?:орієнтовно\s+)?(?:до|о|в)\s+\d{1,2}[:.]\d{2}/i);
  if (untilMatch) return untilMatch[0];
  if (/скасован|відмін|повернулися до графіків/i.test(text)) {
    return 'Скасування ГАВ / повернення до ГПВ';
  }
  return null;
}

export async function onRequestGet() {
  const feeds = [
    { handle: '@cek_info', source: 'ЦЕК (Дніпро)', url: 'https://t.me/s/cek_info', dniproOnly: false },
    { handle: '@dtek_ua', source: 'ДТЕК', url: 'https://t.me/s/dtek_ua', dniproOnly: true },
    { handle: '@Ukrenergo', source: 'Укренерго', url: 'https://t.me/s/Ukrenergo', dniproOnly: true },
  ];

  const collected = [];

  await Promise.all(
    feeds.map(async (feed) => {
      try {
        const resp = await fetch(feed.url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        });
        if (!resp.ok) return;
        const html = await resp.text();
        const blocks = html.split('tgme_widget_message_wrap').slice(-10).reverse();

        for (const block of blocks) {
          const textMatch = block.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/i);
          if (!textMatch) continue;
          const cleanText = decodeHtmlEntities(
            textMatch[1]
              .replace(/<br\s*\/?>/gi, '\n')
              .replace(/<\/p>/gi, '\n')
              .replace(/<[^>]+>/g, ' '),
          )
            .replace(/[ \t]+/g, ' ')
            .replace(/\n\s+/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();

          if (cleanText.length < 25) continue;

          const lower = cleanText.toLowerCase();
          if (feed.dniproOnly) {
            const mentionsDnipro =
              lower.includes('дніпро') || lower.includes('днепр') || lower.includes('гпв') || lower.includes('гав');
            if (!mentionsDnipro) continue;
          }

          const timeMatch = block.match(/<time[^>]*datetime="([^"]+)"/i);
          const linkMatch = block.match(/class="tgme_widget_message_date"[^>]*href="([^"]+)"/i);
          const publishedAt = timeMatch ? timeMatch[1] : new Date().toISOString();
          const postUrl = linkMatch ? linkMatch[1] : feed.url;

          collected.push({
            source: feed.source,
            handle: feed.handle,
            text: cleanText,
            timeHint: extractTimeHint(cleanText),
            publishedAt,
            url: postUrl,
          });
          break;
        }
      } catch {
        // ignore individual feed errors
      }
    }),
  );

  collected.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return new Response(JSON.stringify({ success: true, posts: collected.slice(0, 3) }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=180',
    },
  });
}
