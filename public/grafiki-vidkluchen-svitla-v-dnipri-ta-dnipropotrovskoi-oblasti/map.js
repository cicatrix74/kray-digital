// Interactive Outages Map of Dnipro (Leaflet.js + CartoDB Dark Matter)
(function() {
  let map = null;
  let polygonLayers = [];
  let userMarker = null;

  // Райони та мікрорайони Дніпра з гео-полігонами та підгрупами ДТЕК
  const DNIPRO_DISTRICTS = [
    {
      id: 'mandrykivka',
      name: 'Мандриківка / Перемога-3',
      subgroup: '5.1',
      center: [48.436, 35.062],
      polygon: [
        [48.445, 35.056],
        [48.445, 35.067],
        [48.436, 35.069],
        [48.427, 35.070],
        [48.427, 35.056],
        [48.436, 35.054]
      ]
    },
    {
      id: 'peremoga_1_3',
      name: 'ж/м Перемога (1 - 2)',
      subgroup: '2.1',
      center: [48.449, 35.059],
      polygon: [
        [48.454, 35.054],
        [48.451, 35.065],
        [48.445, 35.066],
        [48.445, 35.053]
      ]
    },
    {
      id: 'peremoga_4_5',
      name: 'ж/м Перемога (4 - 5)',
      subgroup: '5.1',
      center: [48.420, 35.065],
      polygon: [
        [48.427, 35.059],
        [48.427, 35.070],
        [48.414, 35.073],
        [48.414, 35.058]
      ]
    },
    {
      id: 'peremoga_6',
      name: 'ж/м Перемога-6 / Пд. міст',
      subgroup: '1.2',
      center: [48.406, 35.069],
      polygon: [
        [48.414, 35.061],
        [48.414, 35.074],
        [48.399, 35.077],
        [48.399, 35.062]
      ]
    },
    {
      id: 'sokil',
      name: 'ж/м Сокіл (1, 2)',
      subgroup: '5.1',
      center: [48.418, 35.055],
      polygon: [
        [48.426, 35.050],
        [48.425, 35.068],
        [48.410, 35.066],
        [48.412, 35.046]
      ]
    },
    {
      id: 'centre_yavornytsky',
      name: 'Центр / просп. Дмитра Яворницького',
      subgroup: '2.2',
      center: [48.464, 35.045],
      polygon: [
        [48.472, 35.035],
        [48.470, 35.055],
        [48.458, 35.058],
        [48.456, 35.032]
      ]
    },
    {
      id: 'nagirny',
      name: 'Нагірний / Парк Шевченка / ДНУ',
      subgroup: '2.1',
      center: [48.458, 35.062],
      polygon: [
        [48.465, 35.056],
        [48.463, 35.070],
        [48.451, 35.067],
        [48.453, 35.054]
      ]
    },
    {
      id: 'gagarina_pidstantsiya',
      name: 'просп. Науки (Гагаріна) / Підстанція',
      subgroup: '5.2',
      center: [48.432, 35.035],
      polygon: [
        [48.448, 35.035],
        [48.445, 35.050],
        [48.422, 35.044],
        [48.425, 35.025]
      ]
    },
    {
      id: 'topolya_1',
      name: 'ж/м Тополя-1',
      subgroup: '1.1',
      center: [48.397, 35.025],
      polygon: [
        [48.405, 35.020],
        [48.403, 35.035],
        [48.392, 35.034],
        [48.393, 35.018]
      ]
    },
    {
      id: 'topolya_2_3',
      name: 'ж/м Тополя (2, 3) / Терра',
      subgroup: '5.2',
      center: [48.388, 35.028],
      polygon: [
        [48.392, 35.018],
        [48.392, 35.038],
        [48.378, 35.036],
        [48.380, 35.015]
      ]
    },
    {
      id: 'polya_kirova',
      name: 'просп. Олександра Поля (Кірова)',
      subgroup: '4.1',
      center: [48.452, 35.022],
      polygon: [
        [48.465, 35.022],
        [48.462, 35.032],
        [48.438, 35.026],
        [48.440, 35.016]
      ]
    },
    {
      id: 'robocha',
      name: 'вул. Робоча / Каверіна',
      subgroup: '4.2',
      center: [48.451, 35.002],
      polygon: [
        [48.468, 35.005],
        [48.465, 35.016],
        [48.438, 35.008],
        [48.440, 34.996]
      ]
    },
    {
      id: 'titova',
      name: 'вул. Титова / Метеор / Аполло',
      subgroup: '5.2',
      center: [48.435, 35.011],
      polygon: [
        [48.440, 35.000],
        [48.440, 35.025],
        [48.428, 35.022],
        [48.428, 34.998]
      ]
    },
    {
      id: 'kvartal_12',
      name: '12 Квартал / просп. Б. Хмельницького',
      subgroup: '5.1',
      center: [48.415, 35.008],
      polygon: [
        [48.428, 34.998],
        [48.428, 35.020],
        [48.400, 35.015],
        [48.402, 34.992]
      ]
    },
    {
      id: 'chervony_kamin',
      name: 'ж/м Червоний Камінь',
      subgroup: '6.1',
      center: [48.488, 34.965],
      polygon: [
        [48.498, 34.956],
        [48.498, 34.978],
        [48.476, 34.974],
        [48.476, 34.954]
      ]
    },
    {
      id: 'pokrovsky',
      name: 'ж/м Покровський (Комунар)',
      subgroup: '1.1',
      center: [48.484, 34.945],
      polygon: [
        [48.496, 34.936],
        [48.496, 34.956],
        [48.473, 34.954],
        [48.473, 34.934]
      ]
    },
    {
      id: 'parus',
      name: 'ж/м Парус (1, 2)',
      subgroup: '6.2',
      center: [48.482, 34.922],
      polygon: [
        [48.494, 34.910],
        [48.495, 34.936],
        [48.472, 34.934],
        [48.470, 34.910]
      ]
    },
    {
      id: 'mazepy',
      name: 'просп. Івана Мазепи / Нігояна',
      subgroup: '4.1',
      center: [48.465, 34.985],
      polygon: [
        [48.476, 34.975],
        [48.475, 35.002],
        [48.452, 34.995],
        [48.455, 34.968]
      ]
    },
    {
      id: 'vokzal',
      name: 'Вокзали / Старомостова / Озерка',
      subgroup: '1.1',
      center: [48.475, 35.020],
      polygon: [
        [48.484, 35.010],
        [48.482, 35.035],
        [48.468, 35.030],
        [48.470, 35.005]
      ]
    },
    {
      id: 'sonyachny',
      name: 'ж/м Сонячний / ТРЦ Вавилон',
      subgroup: '2.1',
      center: [48.482, 35.062],
      polygon: [
        [48.488, 35.050],
        [48.487, 35.076],
        [48.476, 35.074],
        [48.478, 35.048]
      ]
    },
    {
      id: 'slobozhansky',
      name: 'просп. Слобожанський (Правди)',
      subgroup: '3.1',
      center: [48.498, 35.072],
      polygon: [
        [48.515, 35.060],
        [48.512, 35.082],
        [48.484, 35.078],
        [48.486, 35.056]
      ]
    },
    {
      id: 'kalynova_kosiora',
      name: 'вул. Калинова / Петра Калнишевського',
      subgroup: '3.2',
      center: [48.512, 35.072],
      polygon: [
        [48.525, 35.050],
        [48.522, 35.095],
        [48.505, 35.092],
        [48.508, 35.048]
      ]
    },
    {
      id: 'livoberezhny',
      name: 'ж/м Лівобережний (1-3) / Караван',
      subgroup: '3.2',
      center: [48.538, 35.025],
      polygon: [
        [48.556, 35.008],
        [48.552, 35.045],
        [48.525, 35.042],
        [48.528, 35.005]
      ]
    },
    {
      id: 'prydniprovsk',
      name: 'ж/м Придніпровськ',
      subgroup: '2.2',
      center: [48.405, 35.130],
      polygon: [
        [48.416, 35.120],
        [48.415, 35.145],
        [48.393, 35.140],
        [48.395, 35.118]
      ]
    },
    {
      id: 'lomyvsky_kamyansky',
      name: 'ж/м Ломівський / Кам\'янський (Фрунзенський)',
      subgroup: '3.2',
      center: [48.511, 34.978],
      polygon: [
        [48.522, 34.962],
        [48.520, 34.995],
        [48.501, 34.992],
        [48.503, 34.960]
      ]
    },
    {
      id: 'amur_peredova',
      name: 'Амур / вул. Передова / Мануйлівський',
      subgroup: '3.1',
      center: [48.496, 35.020],
      polygon: [
        [48.508, 35.000],
        [48.506, 35.042],
        [48.486, 35.038],
        [48.488, 34.998]
      ]
    },
    {
      id: 'klochko_berezynka',
      name: 'ж/м Клочко-6 / Березинка / Янтарна',
      subgroup: '3.2',
      center: [48.516, 35.038],
      polygon: [
        [48.526, 35.025],
        [48.525, 35.052],
        [48.506, 35.048],
        [48.508, 35.022]
      ]
    },
    {
      id: 'kaidaky_svobody',
      name: 'Кайдаки / просп. Свободи',
      subgroup: '6.1',
      center: [48.479, 34.992],
      polygon: [
        [48.486, 34.978],
        [48.484, 35.008],
        [48.472, 35.005],
        [48.474, 34.976]
      ]
    },
    {
      id: 'pivnichny',
      name: 'ж/м Північний / Нижньодніпровськ-Вузол',
      subgroup: '3.2',
      center: [48.508, 35.118],
      polygon: [
        [48.520, 35.096],
        [48.518, 35.140],
        [48.496, 35.136],
        [48.498, 35.094]
      ]
    },
    {
      id: 'nyzhnodniprovsk_malynovskoho',
      name: 'Нижньодніпровськ / Сонячна Набережна',
      subgroup: '2.1',
      center: [48.485, 35.096],
      polygon: [
        [48.495, 35.078],
        [48.494, 35.118],
        [48.477, 35.114],
        [48.476, 35.076]
      ]
    },
    {
      id: 'igren',
      name: 'Стара Ігрень / Рибальське',
      subgroup: '2.2',
      center: [48.449, 35.160],
      polygon: [
        [48.462, 35.142],
        [48.460, 35.180],
        [48.436, 35.176],
        [48.438, 35.138]
      ]
    },
    {
      id: 'zakhidny',
      name: 'ж/м Західний',
      subgroup: '4.2',
      center: [48.460, 34.952],
      polygon: [
        [48.470, 34.936],
        [48.468, 34.968],
        [48.450, 34.965],
        [48.452, 34.934]
      ]
    },
    {
      id: 'myrny',
      name: 'ж/м Мирний / Краснопілля',
      subgroup: '5.1',
      center: [48.389, 35.000],
      polygon: [
        [48.400, 34.988],
        [48.399, 35.014],
        [48.378, 35.012],
        [48.380, 34.985]
      ]
    }
  ];

  function getStatusColor(status) {
    if (status === 'off' || status === 'off-first' || status === 'off-second') return { fill: '#ef4444', stroke: '#dc2626' };
    if (status === 'maybe') return { fill: '#f59e0b', stroke: '#d97706' };
    return { fill: '#10b981', stroke: '#059669' };
  }

  function getSubgroupCurrentStatus(subgroup) {
    if (window.systemStatus && window.systemStatus.mode === 'emergency') {
      return 'emergency';
    }
    if (window.scheduleData && window.scheduleData.today && window.scheduleData.todayMatrix) {
      const currentHour = new Date().getHours();
      const pattern = window.scheduleData.todayMatrix[subgroup];
      if (pattern && pattern[currentHour]) {
        return pattern[currentHour];
      }
    }
    return 'on';
  }

  function initDniproMap() {
    const mapContainer = document.getElementById('dniproMap');
    if (!mapContainer || typeof L === 'undefined') return;

    // Центр Дніпра
    map = L.map('dniproMap', {
      center: [48.464, 35.045],
      zoom: 12,
      minZoom: 10,
      maxZoom: 17,
      zoomControl: true,
      attributionControl: false
    });

    // OpenStreetMap with dark mode CSS filter (no API key required, 100% reliable)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    renderDistrictPolygons();
  }

  function renderDistrictPolygons() {
    if (!map) return;

    // Очистити старі
    polygonLayers.forEach(l => map.removeLayer(l));
    polygonLayers = [];

    const isEmergency = window.systemStatus && window.systemStatus.mode === 'emergency';
    const activeSubgroup = window.currentGroup || '';

    DNIPRO_DISTRICTS.forEach(d => {
      const status = isEmergency ? 'emergency' : getSubgroupCurrentStatus(d.subgroup);
      const isSelected = d.subgroup === activeSubgroup;

      let fillColor = '#10b981';
      let strokeColor = '#059669';
      let fillOpacity = 0.35;
      let statusText = window.i18n ? window.i18n.t('mapTooltipOn') : '🟢 Світло є (гарантовано)';

      if (isEmergency) {
        fillColor = '#ef4444';
        strokeColor = '#b91c1c';
        fillOpacity = 0.25;
        statusText = window.i18n ? window.i18n.t('mapTooltipEmergency') : '🚨 Аварійні відключення (графік не діє)';
      } else if (status === 'off') {
        fillColor = '#ef4444';
        strokeColor = '#dc2626';
        fillOpacity = 0.55;
        statusText = window.i18n ? window.i18n.t('mapTooltipOff') : '🔴 Відключено за графіком';
      } else if (status === 'maybe') {
        fillColor = '#f59e0b';
        strokeColor = '#d97706';
        fillOpacity = 0.45;
        statusText = window.i18n ? window.i18n.t('mapTooltipMaybe') : '🟠 Можливе відключення (жовта зона)';
      }

      if (isSelected) {
        strokeColor = '#06b6d4';
        fillOpacity = Math.min(fillOpacity + 0.2, 0.75);
      }

      const poly = L.polygon(d.polygon, {
        color: strokeColor,
        weight: isSelected ? 3 : 1.5,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        className: `district-poly ${isSelected ? 'active-poly' : ''}`
      }).addTo(map);

      // Tooltip при наведенні
      const subPrefix = window.i18n ? window.i18n.t('subgroupPrefix') : 'Підгрупа';
      poly.bindTooltip(`
        <strong>${d.name}</strong><br>
        <span style="color:#38bdf8;">${subPrefix} ${d.subgroup}</span> • ${statusText}
      `, { sticky: true, className: 'map-custom-tooltip' });

      // Клік по району -> вибір підгрупи
      poly.on('click', () => {
        selectDistrictOnMap(d);
      });

      polygonLayers.push(poly);
    });
  }

  function selectDistrictOnMap(d) {
    if (window.selectSubgroupExternal) {
      window.selectSubgroupExternal(d.subgroup);
    }

    if (map) {
      map.flyTo(d.center, 13, { duration: 0.8 });
    }

    // Відкрити попап
    const isEmergency = window.systemStatus && window.systemStatus.mode === 'emergency';
    const status = isEmergency ? 'emergency' : getSubgroupCurrentStatus(d.subgroup);
    let statusLabel = window.i18n ? window.i18n.t('mapPopupPowerOn') : '🟢 Світло зараз є';
    if (isEmergency) statusLabel = window.i18n ? window.i18n.t('mapPopupEmergency') : '🚨 Аварійне знеструмлення';
    else if (status === 'off') statusLabel = window.i18n ? window.i18n.t('mapPopupPowerOff') : '⚡ Світло відсутнє';
    else if (status === 'maybe') statusLabel = window.i18n ? window.i18n.t('mapPopupPowerMaybe') : '🟠 Можливе відключення';

    const subPrefix = window.i18n ? window.i18n.t('subgroupPrefix') : 'Підгрупа';
    const popupCity = window.i18n ? window.i18n.t('mapPopupCity') : 'м. Дніпро • ДТЕК Дніпровські електромережі';

    L.popup({ className: 'map-district-popup' })
      .setLatLng(d.center)
      .setContent(`
        <div style="font-family:inherit; min-width:180px;">
          <h4 style="margin:0 0 4px; color:#f8fafc; font-size:14px;">${d.name}</h4>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
            <span style="background:rgba(6,182,212,0.2); color:#38bdf8; padding:2px 6px; border-radius:4px; font-weight:700; font-size:12px;">${subPrefix} ${d.subgroup}</span>
            <span style="font-size:12px; font-weight:600;">${statusLabel}</span>
          </div>
          <div style="margin-top:6px; font-size:11px; opacity:0.8;">${popupCity}</div>
        </div>
      `)
      .openOn(map);

    renderDistrictPolygons();
  }

  function renderDistrictPills() {
    const container = document.getElementById('mapDistrictPills');
    if (!container) return;
    container.innerHTML = '';

    const popular = [
      { name: 'Мандрик.', id: 'mandrykivka' },
      { name: 'Перемога', id: 'peremoga_4_5' },
      { name: 'Перемога-6', id: 'peremoga_6' },
      { name: 'Тополя-1', id: 'topolya_1' },
      { name: 'Тополя-2,3', id: 'topolya_2_3' },
      { name: 'Титова', id: 'titova' },
      { name: 'Центр', id: 'centre_yavornytsky' },
      { name: 'Поля', id: 'polya_kirova' },
      { name: 'Робоча', id: 'robocha' },
      { name: 'Слобожан.', id: 'slobozhansky' },
      { name: 'Калинова', id: 'kalynova_kosiora' },
      { name: 'Лівобереж.', id: 'livoberezhny' },
      { name: 'Придніпровськ', id: 'prydniprovsk' },
      { name: 'Покровський', id: 'pokrovsky' },
      { name: 'Червоний Камінь', id: 'chervony_kamin' },
      { name: 'Парус', id: 'parus' },
      { name: 'Сонячний', id: 'sonyachny' }
    ];

    popular.forEach(item => {
      const d = DNIPRO_DISTRICTS.find(x => x.id === item.id);
      if (!d) return;

      const btn = document.createElement('button');
      btn.className = 'map-pill-btn';
      btn.textContent = `${item.name} (${d.subgroup})`;
      btn.addEventListener('click', () => {
        selectDistrictOnMap(d);
      });
      container.appendChild(btn);
    });
  }

  // Публічні методи для взаємодії з app.js
  window.refreshDniproMap = function() {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
        renderDistrictPolygons();
      }, 100);
    }
  };

  window.flyMapToAddress = function(streetName, group) {
    if (!map) return;

    // Знайти відповідний район
    const lower = (streetName || '').toLowerCase();
    let matched = null;

    if (lower.includes('мандрик')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'mandrykivka');
    else if (lower.includes('героїв') && !lower.includes('крут') && !lower.includes('рятувальник')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'peremoga_4_5');
    else if (lower.includes('слави') || lower.includes('косміч')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'peremoga_4_5');
    else if (lower.includes('перемога') && (lower.includes('6') || lower.includes('півден'))) matched = DNIPRO_DISTRICTS.find(d => d.id === 'peremoga_6');
    else if (lower.includes('перемог')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'peremoga_4_5');
    else if (lower.includes('топол') && (lower.includes('2') || lower.includes('3') || lower.includes('терра'))) matched = DNIPRO_DISTRICTS.find(d => d.id === 'topolya_2_3');
    else if (lower.includes('топол') || lower.includes('паніках')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'topolya_1');
    else if (lower.includes('придніпр') || lower.includes('космонавт') || lower.includes('роторн')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'prydniprovsk');
    else if (lower.includes('покровськ') || lower.includes('комунар') || lower.includes('кондратюк')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'pokrovsky');
    else if (lower.includes('червоний кам') || lower.includes('красный кам') || lower.includes('діївськ')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'chervony_kamin');
    else if (lower.includes('парус') || lower.includes('метробуд') || lower.includes('монітор') || lower.includes('гідропарк')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'parus');
    else if (lower.includes('соняч') || lower.includes('малиновськ')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'sonyachny');
    else if (lower.includes('яворниц') || lower.includes('карла маркса') || lower.includes('короленк') || lower.includes('воскресен') || lower.includes('харківськ') || lower.includes('січеслав')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'centre_yavornytsky');
    else if (lower.includes('поля') || lower.includes('кірова')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'polya_kirova');
    else if (lower.includes('робоч') || lower.includes('криворізьк') || lower.includes('алексєєнко')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'robocha');
    else if (lower.includes('титов') || lower.includes('незалеж') || lower.includes('новокрим') || lower.includes('макаров') || lower.includes('будівельник')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'titova');
    else if (lower.includes('слобожан') || lower.includes('правд') || lower.includes('батум')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'slobozhansky');
    else if (lower.includes('калин')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'kalynova_kosiora');
    else if (lower.includes('березин') || lower.includes('янтар') || lower.includes('клочко') || lower.includes('старочумацьк')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'klochko_berezynka');
    else if (lower.includes('донецьк') || lower.includes('ломів') || lower.includes('фрунзен')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'lomyvsky_kamyansky');
    else if (lower.includes('передов') || lower.includes('амур')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'amur_peredova');
    else if (lower.includes('свобод') || lower.includes('кайдак') || lower.includes('набережна завод')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'kaidaky_svobody');
    else if (lower.includes('північн')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'pivnichny');
    else if (lower.includes('ігрен')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'igren');
    else if (lower.includes('західн')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'zakhidny');
    else if (lower.includes('мирн')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'myrny');
    else if (lower.includes('лівобереж')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'livoberezhny');
    else if (lower.includes('сокіл')) matched = DNIPRO_DISTRICTS.find(d => d.id === 'sokil');
    else {
      matched = DNIPRO_DISTRICTS.find(d => d.subgroup === group) || DNIPRO_DISTRICTS[0];
    }

    if (matched) {
      map.flyTo(matched.center, 14, { duration: 1 });

      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.circleMarker(matched.center, {
        radius: 8,
        fillColor: '#38bdf8',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(map);

      userMarker.bindPopup(`
        <strong>${streetName}</strong><br>
        Підгрупа: <strong style="color:#06b6d4;">${group || matched.subgroup}</strong>
      `).openPopup();
    }
  };

  // Авто-ініціалізація після завантаження DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDniproMap);
  } else {
    initDniproMap();
  }
})();
