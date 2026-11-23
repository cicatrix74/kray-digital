export async function onRequestGet(context) {
  const { params, env, waitUntil } = context;
  const kv = env && env.SHORT_LINKS;
  if (!kv) {
    return new Response('Short link storage is not configured', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const rawCode = Array.isArray(params.code) ? params.code[0] : params.code;
  const code = rawCode ? decodeURIComponent(rawCode) : '';
  if (!code) {
    return new Response('Short link not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const rec = await kv.get(code, { type: 'json' });
  if (!rec || !rec.url) {
    return new Response('Short link not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const updated = { ...rec, clicks: (Number(rec.clicks) || 0) + 1 };
  const putPromise = kv.put(code, JSON.stringify(updated)).catch((err) => {
    console.error('[s/code] KV update failed:', err);
  });
  if (typeof waitUntil === 'function') {
    waitUntil(putPromise);
  } else {
    await putPromise;
  }

  return Response.redirect(rec.url, 302);
}
