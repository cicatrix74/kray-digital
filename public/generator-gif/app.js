(function () {
  const I18N = {
    ua: {
      pageTitle: 'Генератор відео в GIF онлайн (до 30 сек) — MP4, WebM, MOV у GIF безкоштовно | KRAY DIGITAL',
      badge: 'WEB TOOLS • VIDEO TO GIF (MAX 30S)',
      linkEditor: '🎨 Фоторедактор',
      linkPdf: '📄 PDF у JPG',
      linkPass: '🔐 Паролі',
      linkConverter: '🖼️ Конвертер WebP',
      orderText: 'Замовити сайт',
      title: 'Генератор відео в GIF онлайн (до 30 секунд)',
      subtitle: 'Перетворюйте ролики MP4, WebM, MOV або AVI у чітку GIF-анімацію з оптимізованою 256-кольоровою палітрою. Обирайте точний фрагмент до 30 секунд, частоту кадрів (FPS) та ширину.',
      maxBadge: 'Макс. довжина: 30 сек',
      dropTitle: 'Перетягніть відео сюди або натисніть для вибору',
      dropHint: 'MP4, WebM, MOV, AVI • Максимальна довжина GIF: 30 секунд',
      chooseVideo: 'Обрати відео',
      changeVideo: 'Інше відео',
      settingsTitle: 'Налаштування GIF (макс. 30 сек)',
      startLabel: 'Початок (сек):',
      durationLabel: 'Тривалість (макс. 30с):',
      fpsLabel: 'Частота кадрів (FPS):',
      widthLabel: 'Ширина GIF:',
      generating: 'Генерація GIF...',
      generateBtn: 'Створити GIF',
      resultTitle: 'GIF готовий до завантаження',
      downloadGif: 'Завантажити GIF',
      errTooLarge: 'Файл перевищує ліміт 100 МБ',
      errFailed: 'Помилка генерації GIF',
      seoH2: 'Навіщо робити GIF із відео та як отримати найкращу якість?',
      seoP1: 'Анімовані <strong>GIF-зображення</strong> автоматично відтворюються у Telegram, месенджерах, презентаціях, статтях та соцмережах без натискання кнопки «Play». Наш генератор використовує двопрохідну оптимізацію палітри (<code>palettegen</code> + <code>paletteuse</code>), щоб кожен кадр виглядав чітко, без зайвого шуму та з компактною вагою файлу.',
      seoC1Title: '⏱️ Точна обрізка до 30 секунд',
      seoC1Text: 'Обирайте стартову секунду та точну тривалість фрагмента (від 1 до 30 секунд). Обмеження в 30 секунд дозволяє уникнути гігантських файлів по 50+ МБ.',
      seoC2Title: '🎞️ Гнучкий вибір FPS і роздільності',
      seoC2Text: 'Для мемів та інструкцій достатньо 10–12 FPS і ширини 480 px, а для плавних презентацій інтерфейсу обирайте 15–20 FPS і 640–800 px.',
      seoC3Title: '⚡ Оптимізація для сайту в WebP',
      seoC3Text: 'Якщо ви робите анімацію для вебсайту, після створення GIF ви можете додатково стиснути її в анімований WebP через наш <a href="/konvertor-webp/">конвертер WebP</a>.',
      seoFaqTitle: 'Часті запитання про генератор відео в GIF',
      faq1Q: 'Які формати відео підтримуються?',
      faq1A: 'Підтримуються MP4, WebM, MOV (відео з iPhone), M4V, AVI та MKV.',
      faq2Q: 'Чому максимальна довжина GIF обмежена 30 секундами?',
      faq2A: 'Формат GIF не використовує міжкадрове стиснення як MP4, тому ролики довші за 30 секунд важать десятки мегабайтів і погано відкриваються у браузері та месенджерах.',
      faq3Q: 'Як зменшити розмір готової гіфки?',
      faq3A: 'Зменште ширину до 320–480 px або частоту кадрів до 8–12 FPS — це одразу скоротить вагу файлу у 2–4 рази.',
      faq4Q: 'Чи зберігаються мої відео на сервері?',
      faq4A: 'Ні. Відео обробляється тимчасово лише на час генерації GIF і автоматично видаляється одразу після завершення конвертації.',
      footerConverter: 'Конвертер WebP/AVIF',
      footerEditor: 'Фоторедактор',
      footerPass: 'Генератор паролів'
    },
    ru: {
      pageTitle: 'Генератор видео в GIF онлайн (до 30 сек) — MP4, WebM, MOV в GIF бесплатно | KRAY DIGITAL',
      badge: 'WEB TOOLS • VIDEO TO GIF (MAX 30S)',
      linkEditor: '🎨 Фоторедактор',
      linkPdf: '📄 PDF в JPG',
      linkPass: '🔐 Пароли',
      linkConverter: '🖼️ Конвертер WebP',
      orderText: 'Заказать сайт',
      title: 'Генератор видео в GIF онлайн (до 30 секунд)',
      subtitle: 'Превращайте ролики MP4, WebM, MOV или AVI в чёткую GIF-анимацию с оптимизированной 256-цветной палитрой. Выбирайте точный фрагмент до 30 секунд, частоту кадров (FPS) и ширину.',
      maxBadge: 'Макс. длина: 30 сек',
      dropTitle: 'Перетащите видео сюда или нажмите для выбора',
      dropHint: 'MP4, WebM, MOV, AVI • Максимальная длина GIF: 30 секунд',
      chooseVideo: 'Выбрать видео',
      changeVideo: 'Другое видео',
      settingsTitle: 'Настройки GIF (макс. 30 сек)',
      startLabel: 'Начало (сек):',
      durationLabel: 'Длительность (макс. 30с):',
      fpsLabel: 'Частота кадров (FPS):',
      widthLabel: 'Ширина GIF:',
      generating: 'Генерация GIF...',
      generateBtn: 'Создать GIF',
      resultTitle: 'GIF готов к скачиванию',
      downloadGif: 'Скачать GIF',
      errTooLarge: 'Файл превышает лимит 100 МБ',
      errFailed: 'Ошибка генерации GIF',
      seoH2: 'Зачем делать GIF из видео и как получить лучшее качество?',
      seoP1: 'Анимированные <strong>GIF-изображения</strong> автоматически воспроизводятся в Telegram, мессенджерах, презентациях, статьях и соцсетях без нажатия кнопки «Play». Наш генератор использует двухпроходную оптимизацию палитры (<code>palettegen</code> + <code>paletteuse</code>), чтобы каждый кадр выглядел чётко и имел компактный вес.',
      seoC1Title: '⏱️ Точная обрезка до 30 секунд',
      seoC1Text: 'Выбирайте стартовую секунду и точную длительность фрагмента (от 1 до 30 секунд). Лимит в 30 секунд защищает от гигантских файлов по 50+ МБ.',
      seoC2Title: '🎞️ Гибкий выбор FPS и разрешения',
      seoC2Text: 'Для мемов и инструкций достаточно 10–12 FPS и ширины 480 px, а для плавных презентаций интерфейса выбирайте 15–20 FPS и 640–800 px.',
      seoC3Title: '⚡ Оптимизация для сайта в WebP',
      seoC3Text: 'Если вы делаете анимацию для сайта, после создания GIF можно дополнительно сжать её в анимированный WebP через наш <a href="/konvertor-webp/">конвертер WebP</a>.',
      seoFaqTitle: 'Частые вопросы о генераторе видео в GIF',
      faq1Q: 'Какие форматы видео поддерживаются?',
      faq1A: 'Поддерживаются MP4, WebM, MOV (видео с iPhone), M4V, AVI и MKV.',
      faq2Q: 'Почему максимальная длина GIF ограничена 30 секундами?',
      faq2A: 'Формат GIF не использует межкадровое сжатие как MP4, поэтому ролики длиннее 30 секунд весят десятки мегабайт и тяжело открываются в браузере и мессенджерах.',
      faq3Q: 'Как уменьшить размер готовой гифки?',
      faq3A: 'Уменьшите ширину до 320–480 px или частоту кадров до 8–12 FPS — это сразу сократит вес файла в 2–4 раза.',
      faq4Q: 'Сохраняются ли мои видео на сервере?',
      faq4A: 'Нет. Видео обрабатывается временно только на время генерации GIF и автоматически удаляется сразу после завершения конвертации.',
      footerConverter: 'Конвертер WebP/AVIF',
      footerEditor: 'Фоторедактор',
      footerPass: 'Генератор паролей'
    },
    en: {
      pageTitle: 'Video to GIF Generator Online (Max 30s) — Convert MP4, WebM, MOV to GIF | KRAY DIGITAL',
      badge: 'WEB TOOLS • VIDEO TO GIF (MAX 30S)',
      linkEditor: '🎨 Photo Editor',
      linkPdf: '📄 PDF to JPG',
      linkPass: '🔐 Passwords',
      linkConverter: '🖼️ WebP Converter',
      orderText: 'Order Website',
      title: 'Online Video to GIF Generator (Up to 30 Seconds)',
      subtitle: 'Convert MP4, WebM, MOV, or AVI clips into crisp animated GIFs with an optimized 256-color palette. Trim start time, duration up to 30 seconds, FPS, and width.',
      maxBadge: 'Max length: 30s',
      dropTitle: 'Drag & drop video here or click to browse',
      dropHint: 'MP4, WebM, MOV, AVI • Maximum GIF length: 30 seconds',
      chooseVideo: 'Choose Video',
      changeVideo: 'Change Video',
      settingsTitle: 'GIF Settings (Max 30s)',
      startLabel: 'Start (sec):',
      durationLabel: 'Duration (max 30s):',
      fpsLabel: 'Frame Rate (FPS):',
      widthLabel: 'GIF Width:',
      generating: 'Generating GIF...',
      generateBtn: 'Create GIF',
      resultTitle: 'Your GIF is Ready',
      downloadGif: 'Download GIF',
      errTooLarge: 'File exceeds 100 MB limit',
      errFailed: 'GIF generation failed',
      seoH2: 'Why Convert Video to GIF & How to Get the Best Quality',
      seoP1: 'Animated <strong>GIFs</strong> autoplay everywhere — Telegram, messengers, presentations, docs, and social media — without requiring a play button. Our tool uses two-pass palette optimization (<code>palettegen</code> + <code>paletteuse</code>) for sharp frames and compact file sizes.',
      seoC1Title: '⏱️ Precision Trim Up to 30 Seconds',
      seoC1Text: 'Pick the exact start second and clip length (1 to 30 seconds). The 30-second cap keeps file sizes fast and shareable.',
      seoC2Title: '🎞️ Custom FPS & Resolution',
      seoC2Text: 'Use 10–12 FPS at 480 px for quick clips, or 15–20 FPS at 640–800 px for smooth UI demos.',
      seoC3Title: '⚡ Optimize for Web in WebP',
      seoC3Text: 'Need even smaller animations for your website? Compress your GIF into animated WebP using our <a href="/konvertor-webp/">WebP Converter</a>.',
      seoFaqTitle: 'Frequently Asked Questions',
      faq1Q: 'Which video formats are supported?',
      faq1A: 'MP4, WebM, MOV (iPhone video), M4V, AVI, and MKV are all supported.',
      faq2Q: 'Why is the maximum GIF length 30 seconds?',
      faq2A: 'GIF lacks inter-frame compression like MP4, so clips longer than 30 seconds become huge and slow to load in browsers and messengers.',
      faq3Q: 'How can I reduce the GIF file size?',
      faq3A: 'Lower the width to 320–480 px or reduce FPS to 8–12 to cut file size by 2–4x.',
      faq4Q: 'Are my videos stored on your server?',
      faq4A: 'No. Videos are processed temporarily only during GIF creation and deleted immediately afterward.',
      footerConverter: 'WebP/AVIF Converter',
      footerEditor: 'Photo Editor',
      footerPass: 'Password Generator'
    }
  };

  function detectLang() {
    const nav = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    if (nav.startsWith('ru')) return 'ru';
    if (nav.startsWith('en')) return 'en';
    return 'ua';
  }

  const lang = detectLang();
  const dict = I18N[lang] || I18N.ua;

  function applyI18n() {
    document.title = dict.pageTitle;
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const setHtml = (id, v) => { const el = document.getElementById(id); if (el) el.innerHTML = v; };

    setText('i18nBadge', dict.badge);
    setText('i18nLinkEditor', dict.linkEditor);
    setText('i18nLinkPdf', dict.linkPdf);
    setText('i18nLinkPass', dict.linkPass);
    setText('i18nLinkConverter', dict.linkConverter);
    setText('i18nOrderText', dict.orderText);
    setText('i18nTitle', dict.title);
    setText('i18nSubtitle', dict.subtitle);
    setText('i18nMaxBadge', dict.maxBadge);
    setText('i18nDropTitle', dict.dropTitle);
    setText('i18nDropHint', dict.dropHint);
    setText('btnChooseVideo', dict.chooseVideo);
    setText('i18nChangeVideo', dict.changeVideo);
    setText('i18nSettingsTitle', dict.settingsTitle);
    setText('i18nStartLabel', dict.startLabel);
    setText('i18nDurationLabel', dict.durationLabel);
    setText('i18nFpsLabel', dict.fpsLabel);
    setText('i18nWidthLabel', dict.widthLabel);
    setText('i18nGenerateBtn', dict.generateBtn);
    setText('i18nResultTitle', dict.resultTitle);
    setText('i18nDownloadGif', dict.downloadGif);

    setText('i18nSeoH2', dict.seoH2);
    setHtml('i18nSeoP1', dict.seoP1);
    setText('i18nSeoC1Title', dict.seoC1Title);
    setText('i18nSeoC1Text', dict.seoC1Text);
    setText('i18nSeoC2Title', dict.seoC2Title);
    setText('i18nSeoC2Text', dict.seoC2Text);
    setText('i18nSeoC3Title', dict.seoC3Title);
    setHtml('i18nSeoC3Text', dict.seoC3Text);
    setText('i18nSeoFaqTitle', dict.seoFaqTitle);
    setText('i18nFaq1Q', dict.faq1Q);
    setText('i18nFaq1A', dict.faq1A);
    setText('i18nFaq2Q', dict.faq2Q);
    setText('i18nFaq2A', dict.faq2A);
    setText('i18nFaq3Q', dict.faq3Q);
    setText('i18nFaq3A', dict.faq3A);
    setText('i18nFaq4Q', dict.faq4Q);
    setText('i18nFaq4A', dict.faq4A);
    setText('i18nFooterConverter', dict.footerConverter);
    setText('i18nFooterEditor', dict.footerEditor);
    setText('i18nFooterPass', dict.footerPass);
  }
  applyI18n();

  let selectedFile = null;
  let videoDuration = 30;
  let selectedFps = 12;
  let selectedWidth = 480;
  let objectUrl = null;

  const videoDropZone = document.getElementById('videoDropZone');
  const videoInput = document.getElementById('videoInput');
  const btnChooseVideo = document.getElementById('btnChooseVideo');
  const videoPreviewWrap = document.getElementById('videoPreviewWrap');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoFileName = document.getElementById('videoFileName');
  const btnChangeVideo = document.getElementById('btnChangeVideo');

  const startSlider = document.getElementById('startSlider');
  const startValBadge = document.getElementById('startValBadge');
  const durationSlider = document.getElementById('durationSlider');
  const durationValBadge = document.getElementById('durationValBadge');
  const fpsValBadge = document.getElementById('fpsValBadge');
  const widthValBadge = document.getElementById('widthValBadge');

  const gifProgressBox = document.getElementById('gifProgressBox');
  const gifProgressText = document.getElementById('gifProgressText');
  const gifProgressPct = document.getElementById('gifProgressPct');
  const gifProgressFill = document.getElementById('gifProgressFill');
  const btnGenerateGif = document.getElementById('btnGenerateGif');

  const gifResultCard = document.getElementById('gifResultCard');
  const gifResultMeta = document.getElementById('gifResultMeta');
  const btnDownloadGif = document.getElementById('btnDownloadGif');
  const gifResultImg = document.getElementById('gifResultImg');

  function formatBytes(bytes) {
    if (!bytes) return '0 B';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function loadVideoFile(file) {
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      alert(dict.errTooLarge);
      return;
    }
    selectedFile = file;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);

    videoPlayer.src = objectUrl;
    videoFileName.textContent = `${file.name} (${formatBytes(file.size)})`;
    videoDropZone.style.display = 'none';
    videoPreviewWrap.style.display = 'flex';
    gifResultCard.style.display = 'none';
    btnGenerateGif.disabled = false;
  }

  videoPlayer.addEventListener('loadedmetadata', () => {
    const dur = Number.isFinite(videoPlayer.duration) && videoPlayer.duration > 0 ? videoPlayer.duration : 30;
    videoDuration = dur;
    startSlider.disabled = false;
    startSlider.max = Math.max(0, Math.floor((dur - 1) * 2) / 2);
    startSlider.value = 0;
    startValBadge.textContent = '0.0s';

    const maxAllowedDur = Math.min(30, Math.max(1, Math.floor(dur * 2) / 2));
    durationSlider.max = maxAllowedDur;
    const defDur = Math.min(10, maxAllowedDur);
    durationSlider.value = defDur;
    durationValBadge.textContent = `${defDur.toFixed(1)}s`;
  });

  startSlider.addEventListener('input', () => {
    const startVal = parseFloat(startSlider.value) || 0;
    startValBadge.textContent = `${startVal.toFixed(1)}s`;
    if (Number.isFinite(videoPlayer.duration)) {
      videoPlayer.currentTime = startVal;
      const remaining = Math.max(1, videoPlayer.duration - startVal);
      const maxDur = Math.min(30, Math.floor(remaining * 2) / 2);
      durationSlider.max = maxDur;
      if (parseFloat(durationSlider.value) > maxDur) {
        durationSlider.value = maxDur;
        durationValBadge.textContent = `${maxDur.toFixed(1)}s`;
      }
    }
  });

  durationSlider.addEventListener('input', () => {
    const val = Math.min(30, parseFloat(durationSlider.value) || 10);
    durationValBadge.textContent = `${val.toFixed(1)}s`;
  });

  document.querySelectorAll('#fpsGroup .opt-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#fpsGroup .opt-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFps = parseInt(btn.dataset.fps, 10) || 12;
      fpsValBadge.textContent = `${selectedFps} FPS`;
    });
  });

  document.querySelectorAll('#widthGroup .opt-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#widthGroup .opt-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedWidth = parseInt(btn.dataset.w, 10) || 480;
      widthValBadge.textContent = `${selectedWidth} px`;
    });
  });

  btnChooseVideo.addEventListener('click', (e) => {
    e.stopPropagation();
    videoInput.click();
  });
  videoDropZone.addEventListener('click', () => videoInput.click());
  btnChangeVideo.addEventListener('click', () => videoInput.click());

  videoDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    videoDropZone.classList.add('drag-over');
  });
  videoDropZone.addEventListener('dragleave', () => videoDropZone.classList.remove('drag-over'));
  videoDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    videoDropZone.classList.remove('drag-over');
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadVideoFile(e.dataTransfer.files[0]);
    }
  });
  videoInput.addEventListener('change', () => {
    if (videoInput.files && videoInput.files[0]) {
      loadVideoFile(videoInput.files[0]);
    }
    videoInput.value = '';
  });

  async function convertVideoToGifInBrowser(file, startSec, durationSec, fpsVal, widthVal, onProgress) {
    const { GIFEncoder, quantize, applyPalette } = await import('https://cdn.jsdelivr.net/npm/gifenc@1.0.3/dist/gifenc.esm.js');

    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    const objUrl = URL.createObjectURL(file);
    video.src = objUrl;

    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = reject;
    });

    const vw = video.videoWidth || 480;
    const vh = video.videoHeight || 270;
    const outW = Math.min(960, Math.max(200, widthVal || 480));
    const outH = Math.max(2, Math.round((outW * vh) / vw));

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const totalDur = Math.min(durationSec, Math.max(0.2, (video.duration || durationSec) - startSec));
    const totalFrames = Math.max(2, Math.min(360, Math.round(totalDur * fpsVal)));
    const stepSec = totalDur / totalFrames;
    const delayMs = Math.round(1000 / fpsVal);

    const gif = GIFEncoder();

    for (let i = 0; i < totalFrames; i++) {
      const t = startSec + i * stepSec;
      video.currentTime = t;
      await new Promise(resolve => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          resolve();
        };
        video.addEventListener('seeked', onSeeked, { once: true });
      });

      ctx.drawImage(video, 0, 0, outW, outH);
      const imgData = ctx.getImageData(0, 0, outW, outH);
      const palette = quantize(imgData.data, 256);
      const index = applyPalette(imgData.data, palette);
      gif.writeFrame(index, outW, outH, { palette, delay: delayMs });

      if (onProgress) {
        onProgress(Math.min(98, Math.round(15 + ((i + 1) / totalFrames) * 82)));
      }
    }

    gif.finish();
    URL.revokeObjectURL(objUrl);

    const bytes = gif.bytes();
    const blob = new Blob([bytes], { type: 'image/gif' });
    const dataUrl = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });

    return {
      success: true,
      originalSize: file.size,
      gifSize: blob.size,
      duration: Math.round(totalDur * 10) / 10,
      fps: fpsVal,
      width: outW,
      dataUrl
    };
  }

  btnGenerateGif.addEventListener('click', async () => {
    if (!selectedFile) return;

    btnGenerateGif.disabled = true;
    gifProgressBox.style.display = 'block';
    gifResultCard.style.display = 'none';
    gifProgressText.textContent = dict.generating;

    let pct = 10;
    gifProgressPct.textContent = `${pct}%`;
    gifProgressFill.style.width = `${pct}%`;

    const timer = setInterval(() => {
      if (pct < 92) {
        pct = Math.min(92, pct + (pct < 50 ? 6 : 2));
        gifProgressPct.textContent = `${pct}%`;
        gifProgressFill.style.width = `${pct}%`;
      }
    }, 180);

    try {
      const start = parseFloat(startSlider.value) || 0;
      const duration = Math.min(30, parseFloat(durationSlider.value) || 10);
      const ext = (selectedFile.name.split('.').pop() || 'mp4').toLowerCase();

      const qs = new URLSearchParams({
        start: String(start),
        duration: String(duration),
        fps: String(selectedFps),
        width: String(selectedWidth),
        ext
      });

      let data = null;
      try {
        const res = await fetch(`/api/video-to-gif?${qs.toString()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: selectedFile
        });
        if (res.ok) {
          data = await res.json();
        }
      } catch {
        data = null;
      }

      clearInterval(timer);

      if (!data || !data.success) {
        data = await convertVideoToGifInBrowser(selectedFile, start, duration, selectedFps, selectedWidth, (p) => {
          gifProgressPct.textContent = `${p}%`;
          gifProgressFill.style.width = `${p}%`;
        });
      }

      if (data && data.success) {
        gifProgressPct.textContent = '100%';
        gifProgressFill.style.width = '100%';
        gifResultImg.src = data.dataUrl;
        const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
        btnDownloadGif.href = data.dataUrl;
        btnDownloadGif.download = `${baseName}.gif`;
        gifResultMeta.textContent = `${formatBytes(data.originalSize)} → ${formatBytes(data.gifSize)} • ${data.duration}s • ${data.fps} FPS • ${data.width}px`;
        gifResultCard.style.display = 'block';
      } else {
        alert((data && data.error) || dict.errFailed);
      }
    } catch {
      clearInterval(timer);
      alert(dict.errFailed);
    } finally {
      btnGenerateGif.disabled = false;
    }
  });
})();

(function initMobileMenu() {
  const bind = () => {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('headerNav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
