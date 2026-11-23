(function () {
  var cur = document.currentScript;
  if (!cur || !cur.src) return;

  function decodeB64Url(str) {
    var b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  var qIdx = cur.src.indexOf('?');
  if (qIdx === -1) return;
  var params = new URLSearchParams(cur.src.slice(qIdx + 1));
  var rawC = params.get('c');
  if (!rawC) return;

  var cfg;
  try {
    cfg = JSON.parse(decodeB64Url(rawC));
  } catch (e) {
    return;
  }

  var UNITS = {
    uk: { d: 'днів', h: 'годин', m: 'хвилин', s: 'секунд' },
    ru: { d: 'дней', h: 'часов', m: 'минут', s: 'секунд' },
    en: { d: 'days', h: 'hours', m: 'minutes', s: 'seconds' },
  };
  var u = UNITS[cfg.ul] || UNITS.ru;
  var style = cfg.s || 'flip-dark';
  var bg = cfg.b || '#ffffff';
  var accent = cfg.a || '#111827';
  var textColor = cfg.tc || '#111827';
  var radius = typeof cfg.r === 'number' ? cfg.r : 12;
  var showDays = cfg.sd !== 0;
  var showSecs = cfg.ss !== 0;
  var uid = 'kt_' + Math.random().toString(36).slice(2, 8);

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isLight(hex) {
    var c = (hex || '#000000').replace('#', '');
    if (c.length !== 6) return false;
    var r = parseInt(c.slice(0, 2), 16);
    var g = parseInt(c.slice(2, 4), 16);
    var b = parseInt(c.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 145;
  }

  var light = isLight(bg);
  var borderCol = light ? 'rgba(15,23,42,0.12)' : accent + '44';
  var boxBg = light ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.06)';
  var ctaFg = isLight(accent) ? '#0f172a' : '#ffffff';

  var css =
    '#' + uid + '{max-width:560px;margin:0 auto;background:' + bg + ';color:' + textColor + ';border:1px solid ' + borderCol + ';border-radius:' + radius + 'px;padding:24px 18px;text-align:center;font-family:Inter,system-ui,-apple-system,sans-serif;box-sizing:border-box;box-shadow:0 12px 30px rgba(0,0,0,' + (light ? '0.08' : '0.32') + ');}' +
    '#' + uid + ' *{box-sizing:border-box;}' +
    '#' + uid + ' .kt-head{font-size:14px;font-weight:600;margin-bottom:16px;opacity:0.85;}' +
    '#' + uid + ' .kt-exp{display:none;font-size:20px;font-weight:800;color:' + accent + ';padding:12px 0;}' +
    '#' + uid + ' .kt-cta{display:inline-block;margin-top:18px;padding:10px 22px;border-radius:' + Math.max(6, radius - 4) + 'px;background:' + accent + ';color:' + ctaFg + ';font-size:13px;font-weight:700;text-decoration:none;}' +
    '#' + uid + ' .kt-row{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}' +
    '#' + uid + ' .kt-lbl{font-size:11px;margin-top:5px;opacity:0.75;text-transform:lowercase;letter-spacing:0.03em;}' +
    '#' + uid + ' .kt-card{background:' + boxBg + ';border:1px solid ' + accent + '33;border-radius:' + Math.max(6, radius - 4) + 'px;padding:12px 10px;min-width:74px;flex:1 1 0;}' +
    '#' + uid + ' .kt-card-val{font-family:monospace;font-size:30px;font-weight:800;line-height:1.1;color:' + accent + ';font-variant-numeric:tabular-nums;}' +
    '#' + uid + ' .kt-min-item{display:flex;flex-direction:column;align-items:center;}' +
    '#' + uid + ' .kt-min-val{font-size:clamp(30px,5vw,44px);font-weight:300;line-height:1;color:' + textColor + ';font-variant-numeric:tabular-nums;}' +
    '#' + uid + ' .kt-sep{font-size:clamp(24px,4vw,36px);font-weight:300;line-height:1;opacity:0.6;margin-top:-14px;}' +
    '#' + uid + ' .kt-flip-unit{display:flex;flex-direction:column;align-items:center;gap:6px;}' +
    '#' + uid + ' .kt-flip-pair{display:flex;gap:4px;}' +
    '#' + uid + ' .kt-flip{position:relative;width:34px;height:48px;border-radius:6px;perspective:220px;font-family:Inter,system-ui,sans-serif;font-size:28px;font-weight:700;text-align:center;user-select:none;}' +
    '#' + uid + ' .kt-flip .kt-top,#' + uid + ' .kt-flip .kt-bot,#' + uid + ' .kt-flip .kt-flap-t,#' + uid + ' .kt-flip .kt-flap-b{position:absolute;left:0;width:100%;height:50%;overflow:hidden;backface-visibility:hidden;}' +
    '#' + uid + ' .kt-flip .kt-top,#' + uid + ' .kt-flip .kt-flap-t{top:0;border-radius:6px 6px 0 0;}' +
    '#' + uid + ' .kt-flip .kt-bot,#' + uid + ' .kt-flip .kt-flap-b{bottom:0;border-radius:0 0 6px 6px;}' +
    '#' + uid + ' .kt-flip .kt-top>span,#' + uid + ' .kt-flip .kt-flap-t>span{display:block;height:48px;line-height:48px;}' +
    '#' + uid + ' .kt-flip .kt-bot>span,#' + uid + ' .kt-flip .kt-flap-b>span{display:block;height:48px;line-height:48px;transform:translateY(-24px);}' +
    '#' + uid + ' .kt-flip-light{box-shadow:0 3px 8px rgba(15,23,42,0.14);}' +
    '#' + uid + ' .kt-flip-light .kt-top,#' + uid + ' .kt-flip-light .kt-flap-t{background:linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%);color:#0f172a;border:1px solid #cbd5e1;border-bottom:1px solid rgba(15,23,42,0.18);}' +
    '#' + uid + ' .kt-flip-light .kt-bot,#' + uid + ' .kt-flip-light .kt-flap-b{background:linear-gradient(180deg,#f1f5f9 0%,#ffffff 100%);color:#0f172a;border:1px solid #cbd5e1;border-top:none;}' +
    '#' + uid + ' .kt-flip-dark{box-shadow:0 4px 10px rgba(0,0,0,0.38);}' +
    '#' + uid + ' .kt-flip-dark .kt-top,#' + uid + ' .kt-flip-dark .kt-flap-t{background:linear-gradient(180deg,#374151 0%,#1f2937 100%);color:#f9fafb;border:1px solid #111827;border-bottom:1px solid rgba(0,0,0,0.55);}' +
    '#' + uid + ' .kt-flip-dark .kt-bot,#' + uid + ' .kt-flip-dark .kt-flap-b{background:linear-gradient(180deg,#1f2937 0%,#111827 100%);color:#f9fafb;border:1px solid #111827;border-top:none;}' +
    '#' + uid + ' .kt-flip .kt-flap-t{z-index:3;transform-origin:50% 100%;animation:ktFlipT_' + uid + ' 0.24s ease-in forwards;}' +
    '#' + uid + ' .kt-flip .kt-flap-b{z-index:4;transform-origin:50% 0%;transform:rotateX(90deg);animation:ktFlipB_' + uid + ' 0.24s 0.22s ease-out forwards;}' +
    '@keyframes ktFlipT_' + uid + '{0%{transform:rotateX(0deg);filter:brightness(1);}100%{transform:rotateX(-90deg);filter:brightness(0.75);}}' +
    '@keyframes ktFlipB_' + uid + '{0%{transform:rotateX(90deg);filter:brightness(0.8);}100%{transform:rotateX(0deg);filter:brightness(1);}}' +
    '#' + uid + ' .kt-drum-val{font-family:monospace;font-size:clamp(28px,4.5vw,38px);font-weight:400;line-height:1.1;color:' + textColor + ';display:inline-block;font-variant-numeric:tabular-nums;}' +
    '#' + uid + ' .kt-drum-val.kt-pop{animation:ktSlide_' + uid + ' 0.3s ease;}' +
    '@keyframes ktSlide_' + uid + '{0%{transform:translateY(-12px);opacity:0.25;}100%{transform:translateY(0);opacity:1;}}' +
    '#' + uid + ' .kt-ring-wrap{position:relative;width:82px;height:82px;display:flex;align-items:center;justify-content:center;}' +
    '#' + uid + ' .kt-ring-svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg);}' +
    '#' + uid + ' .kt-ring-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;line-height:1.1;}' +
    '#' + uid + ' .kt-ring-num{font-size:20px;font-weight:700;color:' + textColor + ';font-variant-numeric:tabular-nums;}' +
    '#' + uid + ' .kt-ring-sub{font-size:9px;opacity:0.7;margin-top:2px;text-transform:lowercase;}';

  var items = [];
  if (showDays) items.push({ k: 'd', l: u.d, m: 30 });
  items.push({ k: 'h', l: u.h, m: showDays ? 24 : 99 });
  items.push({ k: 'm', l: u.m, m: 60 });
  if (showSecs) items.push({ k: 's', l: u.s, m: 60 });

  var bodyHtml = '';
  if (style === 'cards') {
    bodyHtml = items.map(function (it) {
      return '<div class="kt-card"><div class="kt-card-val" data-u="' + it.k + '">00</div><div class="kt-lbl">' + it.l + '</div></div>';
    }).join('');
  } else if (style === 'minimal-clean') {
    bodyHtml = items.map(function (it, idx) {
      return (idx > 0 ? '<div class="kt-sep">:</div>' : '') + '<div class="kt-min-item"><div class="kt-min-val" data-u="' + it.k + '">0</div><div class="kt-lbl">' + it.l + '</div></div>';
    }).join('');
  } else if (style === 'drum-light') {
    bodyHtml = items.map(function (it, idx) {
      return (idx > 0 ? '<div class="kt-sep">:</div>' : '') + '<div class="kt-min-item"><div class="kt-drum-val" data-u="' + it.k + '">00</div><div class="kt-lbl">' + it.l + '</div></div>';
    }).join('');
  } else if (style === 'flip-light' || style === 'flip-dark') {
    var dCls = style === 'flip-light' ? 'kt-flip kt-flip-light' : 'kt-flip kt-flip-dark';
    var cardHtml = '<div class="' + dCls + '" data-val="0"><div class="kt-top"><span>0</span></div><div class="kt-bot"><span>0</span></div></div>';
    bodyHtml = items.map(function (it) {
      return '<div class="kt-flip-unit"><div class="kt-flip-pair" data-u="' + it.k + '">' + cardHtml + cardHtml + '</div><div class="kt-lbl">' + it.l + '</div></div>';
    }).join('');
  } else {
    var isThick = style === 'ring-light-thick';
    var isGradOrange = style === 'ring-light-orange';
    var sw = isThick ? 8 : isGradOrange ? 4.5 : 4;
    var track = light ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.14)';
    var gId = uid + '_g';
    var gradDef = isGradOrange
      ? '<defs><linearGradient id="' + gId + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#ef4444"/></linearGradient></defs>'
      : isThick
        ? '<defs><linearGradient id="' + gId + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="55%" stop-color="#ef4444"/><stop offset="100%" stop-color="#9ca3af"/></linearGradient></defs>'
        : '';
    var strokeVal = isGradOrange || isThick ? 'url(#' + gId + ')' : accent;

    bodyHtml = items.map(function (it) {
      return '<div class="kt-ring-wrap">' +
        '<svg class="kt-ring-svg" viewBox="0 0 100 100">' +
        gradDef +
        (isGradOrange ? '' : '<circle cx="50" cy="50" r="42" fill="none" stroke="' + track + '" stroke-width="' + sw + '"/>') +
        '<circle data-ring="' + it.k + '" data-max="' + it.m + '" cx="50" cy="50" r="42" fill="none" stroke="' + strokeVal + '" stroke-width="' + sw + '" stroke-dasharray="263.89" stroke-dashoffset="0" stroke-linecap="' + (isThick ? 'butt' : 'round') + '"/>' +
        '</svg>' +
        '<div class="kt-ring-inner"><span class="kt-ring-num" data-u="' + it.k + '">00</span><span class="kt-ring-sub">' + it.l + '</span></div>' +
        '</div>';
    }).join('');
  }

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var root = document.createElement('div');
  root.id = uid;
  root.innerHTML =
    (cfg.h ? '<div class="kt-head">' + esc(cfg.h) + '</div>' : '') +
    '<div class="kt-row">' + bodyHtml + '</div>' +
    '<div class="kt-exp">' + esc(cfg.e || '00:00:00') + '</div>' +
    (cfg.ct ? '<a href="' + esc(cfg.cu || '#') + '" class="kt-cta">' + esc(cfg.ct) + '</a>' : '');

  cur.parentNode.insertBefore(root, cur);

  var endMs;
  var dur = 0;
  var sk = 'kt_ev_' + rawC.slice(0, 16);
  if (cfg.m === 'evergreen') {
    dur = ((Number(cfg.eh) || 0) * 60 + (Number(cfg.em) || 0)) * 60000;
    if (cfg.ep) {
      endMs = Number(localStorage.getItem(sk) || 0);
      if (!endMs) {
        endMs = Date.now() + dur;
        localStorage.setItem(sk, String(endMs));
      }
    } else {
      endMs = Date.now() + dur;
    }
  } else {
    endMs = new Date(cfg.t).getTime();
  }

  var usePad = style !== 'minimal-clean' && style.indexOf('ring-') !== 0;
  var isFlip = style === 'flip-light' || style === 'flip-dark';
  var flipCls = style === 'flip-light' ? 'kt-flip kt-flip-light' : 'kt-flip kt-flip-dark';

  function pad(n) {
    return usePad ? String(n).padStart(2, '0') : String(n);
  }

  function setVal(key, val, anim) {
    var el = root.querySelector('[data-u="' + key + '"]');
    if (el) {
      var txt = pad(val);
      if (isFlip) {
        var arr = txt.split('');
        if (el.children.length !== arr.length) {
          el.innerHTML = arr.map(function (d) { return '<div class="' + flipCls + '" data-val="' + d + '"><div class="kt-top"><span>' + d + '</span></div><div class="kt-bot"><span>' + d + '</span></div></div>'; }).join('');
        } else {
          arr.forEach(function (d, i) {
            var card = el.children[i];
            if (!card) return;
            var oldV = card.getAttribute('data-val') || '0';
            if (oldV === d) return;
            card.setAttribute('data-val', d);
            var tSp = card.querySelector('.kt-top > span');
            var bSp = card.querySelector('.kt-bot > span');
            if (!anim) {
              if (tSp) tSp.textContent = d;
              if (bSp) bSp.textContent = d;
              return;
            }
            card.querySelectorAll('.kt-flap-t, .kt-flap-b').forEach(function (n) { n.remove(); });
            if (tSp) tSp.textContent = d;
            if (bSp) bSp.textContent = oldV;
            var fT = document.createElement('div');
            fT.className = 'kt-flap-t';
            fT.innerHTML = '<span>' + oldV + '</span>';
            var fB = document.createElement('div');
            fB.className = 'kt-flap-b';
            fB.innerHTML = '<span>' + d + '</span>';
            card.appendChild(fT);
            card.appendChild(fB);
            setTimeout(function () {
              if (bSp) bSp.textContent = d;
              fT.remove();
              fB.remove();
            }, 480);
          });
        }
      } else if (el.textContent !== txt) {
        el.textContent = txt;
        if (anim && style === 'drum-light') {
          el.classList.remove('kt-pop');
          void el.offsetWidth;
          el.classList.add('kt-pop');
        }
      }
    }
    var ring = root.querySelector('[data-ring="' + key + '"]');
    if (ring) {
      var mx = Math.max(1, Number(ring.getAttribute('data-max')) || 60);
      ring.style.strokeDashoffset = (263.89 * (1 - Math.min(1, val / mx))).toFixed(2);
    }
  }

  var first = true;
  function tick() {
    var ms = Math.max(0, endMs - Date.now());
    if (ms <= 0 && cfg.m === 'evergreen' && cfg.el && dur > 0) {
      endMs = Date.now() + dur;
      if (cfg.ep) localStorage.setItem(sk, String(endMs));
      ms = dur;
    }
    if (ms <= 0) {
      var row = root.querySelector('.kt-row');
      if (row) row.style.display = 'none';
      var hd = root.querySelector('.kt-head');
      if (hd) hd.style.display = 'none';
      var ex = root.querySelector('.kt-exp');
      if (ex) ex.style.display = 'block';
      return;
    }
    var s = Math.floor(ms / 1000);
    setVal('d', Math.floor(s / 86400), !first);
    setVal('h', showDays ? Math.floor((s % 86400) / 3600) : Math.floor(s / 3600), !first);
    setVal('m', Math.floor((s % 3600) / 60), !first);
    setVal('s', s % 60, !first);
    first = false;
  }

  tick();
  setInterval(tick, 1000);
})();
