// Cache keys
const CACHE_KEY_PROVIDER = 'kray_light_provider';
const CACHE_KEY_GROUP = 'kray_light_group';
const CACHE_KEY_CITY = 'kray_light_city';
const CACHE_KEY_STREET = 'kray_light_street';
const CACHE_KEY_BUILDING = 'kray_light_building';

// State with cache restoration
let currentProvider = localStorage.getItem(CACHE_KEY_PROVIDER) || 'dtek_dnipro';
let currentGroup = localStorage.getItem(CACHE_KEY_GROUP) || '';
let currentCity = localStorage.getItem(CACHE_KEY_CITY) || 'Дніпро';
let savedStreet = localStorage.getItem(CACHE_KEY_STREET) || '';
let savedBuilding = localStorage.getItem(CACHE_KEY_BUILDING) || '';
if (savedStreet && savedStreet.toLowerCase().includes('мандрик') && currentGroup === '6.1') {
  currentGroup = '5.1';
  localStorage.setItem(CACHE_KEY_GROUP, '5.1');
}

let currentDayView = 'today';
let scheduleData = null;
let systemStatus = null;
let currentAddressOutage = null;
try {
  const savedOutage = localStorage.getItem('kray_address_outage');
  if (savedOutage) currentAddressOutage = JSON.parse(savedOutage);
} catch (e) {}

function isEmergencyModeActive() {
  const isGlobalEmergency = Boolean(systemStatus && systemStatus.mode === 'emergency');
  const isAddressEmergency = Boolean(currentAddressOutage && currentAddressOutage.hasOutage);
  return isGlobalEmergency || isAddressEmergency;
}
window.isEmergencyModeActive = isEmergencyModeActive;
window.currentAddressOutage = currentAddressOutage;
window.currentProvider = currentProvider;
window.currentGroup = currentGroup;

let providersList = [];
const allSubgroups = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2', '5.1', '5.2', '6.1', '6.2'];
let countdownInterval = null;

// DOM Elements
const providerSelect = document.getElementById('providerSelect');
const subgroupGrid = document.getElementById('subgroupGrid');
const tabToday = document.getElementById('tabToday');
const tabTomorrow = document.getElementById('tabTomorrow');
const todayDateStr = document.getElementById('todayDateStr');
const tomorrowDateStr = document.getElementById('tomorrowDateStr');
const timelineGrid = document.getElementById('timelineGrid');
const timeMarker = document.getElementById('timeMarker');
const btnManualRefresh = document.getElementById('btnManualRefresh');
const btnToggleEmergency = document.getElementById('btnToggleEmergency');
const emergencyBanner = document.getElementById('emergencyBanner');
const emergencyBannerClose = document.getElementById('emergencyBannerClose');
let isEmergencyBannerDismissed = false;
function setEmergencyBannerVisible(visible) {
  if (!emergencyBanner) return;
  emergencyBanner.style.display = visible ? 'block' : 'none';
  document.body.classList.toggle('emergency-banner-visible', Boolean(visible));
}
if (emergencyBannerClose && emergencyBanner) {
  emergencyBannerClose.addEventListener('click', () => {
    isEmergencyBannerDismissed = true;
    setEmergencyBannerVisible(false);
  });
}
const gridStatusChip = document.getElementById('gridStatusChip');
const gridStatusText = document.getElementById('gridStatusText');
const storageIndicator = document.getElementById('storageIndicator');
const liveDtekStatusText = document.getElementById('liveDtekStatusText');
const activeSourceLabel = document.getElementById('activeSourceLabel');

// Status card DOM
const statusSectionEl = document.getElementById('liveStatusSection') || document.querySelector('.live-status-section');
const scheduleSectionEl = document.querySelector('.schedule-section');

function updateGroupSelectionVisibility() {
  const hasSelection = Boolean(currentGroup || savedStreet);
  if (statusSectionEl) statusSectionEl.style.display = hasSelection ? 'block' : 'none';
  if (scheduleSectionEl) scheduleSectionEl.style.display = hasSelection ? 'block' : 'none';
}
updateGroupSelectionVisibility();

const statusCard = document.getElementById('statusCard');
const statusIcon = document.getElementById('statusIcon');
const statusTitle = document.getElementById('statusTitle');
const activeProviderLabel = document.getElementById('activeProviderLabel');
const activeGroupLabel = document.getElementById('activeGroupLabel');
const countdownLabel = document.getElementById('countdownLabel');
const countdownTimer = document.getElementById('countdownTimer');
const countdownSub = document.getElementById('countdownSub');

// Stats DOM
const statHoursOn = document.getElementById('statHoursOn');
const statHoursMaybe = document.getElementById('statHoursMaybe');
const statHoursOff = document.getElementById('statHoursOff');
const matrixTableBody = document.getElementById('matrixTableBody');

// Search DOM
const citySelect = document.getElementById('citySelect');
const addressSearch = document.getElementById('addressSearch');
const buildingInput = document.getElementById('buildingInput');
const btnFindAddress = document.getElementById('btnFindAddress');
const clearSearch = document.getElementById('clearSearch');
const searchResults = document.getElementById('searchResults');
const activeAddressChip = document.getElementById('activeAddressChip');
const chipAddressText = document.getElementById('chipAddressText');
const chipGroupBadge = document.getElementById('chipGroupBadge');
const btnRemoveSavedAddress = document.getElementById('btnRemoveSavedAddress');

// Restore saved city
if (citySelect && currentCity) {
  citySelect.value = currentCity;
}

// Flash cache saved badge
function notifyCacheSaved() {
  if (!storageIndicator) return;
  storageIndicator.style.background = 'rgba(16, 185, 129, 0.25)';
  storageIndicator.style.borderColor = 'var(--color-on)';
  storageIndicator.querySelector('span:last-child').textContent = 'Вибір збережено!';
  setTimeout(() => {
    storageIndicator.style.background = 'rgba(6, 182, 212, 0.1)';
    storageIndicator.style.borderColor = 'rgba(6, 182, 212, 0.3)';
    storageIndicator.querySelector('span:last-child').textContent = 'Кеш увімкнено';
  }, 1500);
}

function updateActiveAddressChip() {
  if (savedStreet) {
    const bldPrefix = window.i18n ? window.i18n.t('buildingPrefix') : 'буд.';
    const subPrefix = window.i18n ? window.i18n.t('subgroupPrefix') : 'Підгрупа';
    const fullText = savedBuilding ? `${savedStreet}, ${bldPrefix} ${savedBuilding}` : savedStreet;
    chipAddressText.textContent = fullText;
    chipGroupBadge.textContent = `${subPrefix} ${currentGroup}`;
    activeAddressChip.style.display = 'flex';
    addressSearch.value = savedStreet;
    if (savedBuilding) buildingInput.value = savedBuilding;
    clearSearch.style.display = 'block';
  } else {
    activeAddressChip.style.display = 'none';
  }
}

function formatDateUA(d) {
  if (window.i18n) return window.i18n.formatDate(d);
  const months = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

// Load Dnipropetrovsk Oblast Providers
async function loadProviders() {
  try {
    const res = await fetch('/api/providers');
    const data = await res.json();
    providersList = Array.isArray(data) ? data : (data.providers || []);

    const syncStatusText = data.liveSyncStatus || (systemStatus && systemStatus.liveStatus) || 'Активно (ДТЕК Дніпро)';
    if (liveDtekStatusText) {
      liveDtekStatusText.textContent = `ДТЕК Дніпро: ${syncStatusText}`;
    }

    if (providersList.length > 0) {
      providerSelect.innerHTML = '';
      providersList.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        if (window.i18n) {
          if (p.id === 'dtek_dnipro') opt.textContent = window.i18n.t('providerDtek') + ' (Дніпро, Кривий Ріг)';
          else if (p.id === 'yasno_dnipro') opt.textContent = window.i18n.t('providerYasno');
          else if (p.id === 'cek_dnipro') opt.textContent = window.i18n.t('providerCek');
          else opt.textContent = p.name;
        } else {
          opt.textContent = p.name;
        }
        if (p.id === currentProvider) opt.selected = true;
        providerSelect.appendChild(opt);
      });
    }

    renderSubgroupButtons();
  } catch (err) {
    console.error('Failed to load providers:', err);
  }
}

// Render 12 Subgroup Buttons (1.1 - 6.2)
function renderSubgroupButtons() {
  subgroupGrid.innerHTML = '';
  const subPrefix = window.i18n ? window.i18n.t('subgroupPrefix') : 'Підгрупа';
  allSubgroups.forEach(g => {
    const btn = document.createElement('button');
    btn.className = `subgroup-btn ${g === currentGroup ? 'active' : ''}`;
    btn.dataset.group = g;
    btn.textContent = g;
    btn.title = `${subPrefix} ${g}`;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.subgroup-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGroup = g;
      localStorage.setItem(CACHE_KEY_GROUP, currentGroup);
      notifyCacheSaved();
      updateActiveAddressChip();
      updateGroupSelectionVisibility();
      fetchSchedule();
    });

    subgroupGrid.appendChild(btn);
  });
}

// Fetch System Status (Ukrenergo / DTEK Dnipro)
async function fetchSystemStatus() {
  try {
    const res = await fetch(`/api/status?group=${encodeURIComponent(currentGroup || '5.1')}`);
    const data = await res.json();
    systemStatus = data;
    window.systemStatus = data;
    renderSystemStatus();
    updateLocationInfo();
    updateLiveStatusCard();
    renderActiveSchedule();
    if (window.refreshDniproMap) window.refreshDniproMap();
  } catch (e) {
    console.error('Error fetching system status:', e);
  }
}

function renderSystemStatus() {
  if (!systemStatus) return;
  const isEmergency = systemStatus.mode === 'emergency';
  setEmergencyBannerVisible(isEmergency && !isEmergencyBannerDismissed);
  if (gridStatusText) gridStatusText.textContent = systemStatus.modeLabel || systemStatus.modeTitle || 'Стабілізаційні відключення (ДТЕК Дніпро)';
  if (btnToggleEmergency) btnToggleEmergency.textContent = isEmergency ? 'Вимкнути Аварійний тест' : 'Тест: Аварійний режим';

  if (gridStatusChip) {
    if (isEmergency) {
      gridStatusChip.style.borderColor = 'var(--color-off)';
      const dot = gridStatusChip.querySelector('.pulse-dot');
      if (dot) dot.style.background = 'var(--color-off)';
    } else {
      gridStatusChip.style.borderColor = 'var(--border-color)';
      const dot = gridStatusChip.querySelector('.pulse-dot');
      if (dot) dot.style.background = 'var(--color-on)';
    }
  }
}

// Fetch Schedule Data for Dnipropetrovsk Oblast
async function fetchSchedule() {
  try {
    btnManualRefresh.style.transform = 'rotate(360deg)';
    setTimeout(() => { btnManualRefresh.style.transform = 'none'; }, 400);

    const res = await fetch(`/api/schedule?provider=${currentProvider}&group=${encodeURIComponent(currentGroup || '5.1')}`);
    const data = await res.json();
    scheduleData = data;
    window.scheduleData = data;
    window.currentGroup = currentGroup;
    updateGroupSelectionVisibility();
    renderDates();
    renderActiveSchedule();
    renderFullMatrixTable();
    startCountdownLoop();
    if (window.refreshDniproMap) window.refreshDniproMap();
  } catch (e) {
    console.error('Error fetching schedule:', e);
  }
}

function renderDates() {
  const now = new Date();
  const tomorrow = new Date(Date.now() + 86400000);
  const tabTodayLabel = document.getElementById('tabTodayLabel');
  const tabTomorrowLabel = document.getElementById('tabTomorrowLabel');
  if (tabTodayLabel && window.i18n) tabTodayLabel.textContent = window.i18n.t('tabToday');
  if (tabTomorrowLabel && window.i18n) tabTomorrowLabel.textContent = window.i18n.t('tabTomorrow');
  if (todayDateStr) todayDateStr.textContent = window.i18n ? window.i18n.formatDate(now) : formatDateUA(now);
  if (tomorrowDateStr) tomorrowDateStr.textContent = window.i18n ? window.i18n.formatDate(tomorrow) : formatDateUA(tomorrow);
}

function updateLocationInfo() {
  const isEmergency = isEmergencyModeActive();
  const isAddressEmergency = Boolean(currentAddressOutage && currentAddressOutage.hasOutage);
  const lang = (window.i18n && window.i18n.current) || 'ua';
  const dict = (window.i18n && window.i18n.dict) || {};
  const subPrefix = (dict && dict.subgroupPrefix) || (lang === 'en' ? 'Subgroup' : (lang === 'ru' ? 'Подгруппа' : 'Підгрупа'));
  
  window.currentProvider = currentProvider;
  window.currentGroup = currentGroup;
  window.currentAddressOutage = currentAddressOutage;

  if (activeGroupLabel) {
    activeGroupLabel.textContent = `${subPrefix} ${currentGroup}`;
  }

  if (activeProviderLabel) {
    if (currentProvider === 'dtek_dnipro') {
      activeProviderLabel.textContent = (dict && dict.providerDtek) || (lang === 'en' ? 'DTEK Dnipro Grids' : (lang === 'ru' ? 'ДТЭК Днепровские электросети' : 'ДТЕК Дніпровські електромережі'));
    } else if (currentProvider === 'yasno_dnipro') {
      activeProviderLabel.textContent = (dict && dict.providerYasno) || (lang === 'en' ? 'YASNO (Dnipro Energy Services)' : (lang === 'ru' ? 'YASNO (Днепровские энергетические услуги)' : 'YASNO (Дніпровські енергетичні послуги)'));
    } else if (currentProvider === 'cek_dnipro') {
      activeProviderLabel.textContent = (dict && dict.providerCek) || (lang === 'en' ? 'PJSC PEEM CEK' : (lang === 'ru' ? 'ЧАО «ПЭЭМ «ЦЭК»' : 'ПрАТ «ПЕЕМ «ЦЕК»'));
    }
  }

  if (activeSourceLabel) {
    if (isEmergency) {
      if (isAddressEmergency && currentAddressOutage) {
        activeSourceLabel.textContent = (dict && dict.sourceEmergencyRepairs) || (lang === 'en' ? 'DTEK Emergency Repairs' : (lang === 'ru' ? 'Аварийные работы ДТЭК' : 'Аварійні роботи ДТЕК'));
      } else {
        activeSourceLabel.textContent = (dict && dict.sourceEmergency) || (lang === 'en' ? 'NPC Ukrenergo (Emergency Outages)' : (lang === 'ru' ? 'НЭК Укрэнерго (ГАО/САО)' : 'НЕК Укренерго (ГАВ/САВ)'));
      }
      activeSourceLabel.style.background = 'rgba(239, 68, 68, 0.25)';
      activeSourceLabel.style.color = '#f87171';
    } else {
      activeSourceLabel.textContent = (dict && dict.sourceLive) || (lang === 'en' ? 'DTEK Live Dnipro' : (lang === 'ru' ? 'ДТЭК Live Днепр' : 'ДТЕК Live Дніпро'));
      activeSourceLabel.style.background = 'rgba(16, 185, 129, 0.2)';
      activeSourceLabel.style.color = 'var(--color-on)';
    }
  }
}
window.updateLocationInfo = updateLocationInfo;

function renderActiveSchedule() {
  updateGroupSelectionVisibility();
  if (!currentGroup && !savedStreet) {
    return;
  }
  if (!scheduleData) return;

  const isEmergency = isEmergencyModeActive();
  const isAddressEmergency = Boolean(currentAddressOutage && currentAddressOutage.hasOutage);
  const currentSchedule = currentDayView === 'today' ? scheduleData.today : scheduleData.tomorrow;
  const hours = currentSchedule.hours;

  updateLocationInfo();

  // 24 Timeline Blocks
  timelineGrid.innerHTML = '';
  let countOn = 0, countMaybe = 0, countOff = 0;

  hours.forEach(item => {
    if (item.status === 'on') countOn += 1;
    else if (item.status === 'maybe') countMaybe += 1;
    else if (item.status === 'off-first' || item.status === 'off-second') {
      countOff += 0.5;
      countOn += 0.5;
    }
    else countOff += 1;

    const block = document.createElement('div');
    block.textContent = item.hour;
    const lang = (window.i18n && window.i18n.current) || 'ua';

    if (isEmergency) {
      if (item.status === 'off') {
        block.className = 'hour-block state-off';
        block.title = `${item.time}: ${getStatusName('off')} (аварійний режим)`;
      } else if (item.status === 'off-first' || item.status === 'off-second') {
        block.className = `hour-block state-${item.status}-neutral`;
        block.title = `${item.time}: ${getStatusName(item.status)} (аварійний режим)`;
      } else if (item.status === 'maybe') {
        block.className = 'hour-block state-maybe';
        block.title = `${item.time}: ${getStatusName('maybe')}`;
      } else {
        block.className = 'hour-block state-neutral';
        block.title = `${item.time}: ${lang === 'en' ? 'Schedule suspended (emergency mode)' : (lang === 'ru' ? 'График не действует (аварийный режим)' : 'Графік не діє (аварійний режим)')}`;
      }
    } else {
      block.className = `hour-block state-${item.status}`;
      block.title = `${item.time}: ${getStatusName(item.status)}`;
    }
    timelineGrid.appendChild(block);
  });

  // Stats
  const uHour = window.i18n ? window.i18n.t('unitHour') : 'год';
  const statOffLabel = document.getElementById('statOffLabel') || document.querySelector('.stat-card:nth-child(3) .stat-desc');
  if (isEmergency) {
    statHoursOn.textContent = '—';
    statHoursMaybe.textContent = '—';
    statHoursOff.textContent = '—';
    if (statOffLabel && window.i18n) {
      statOffLabel.textContent = window.i18n.t('statEmergencyLabel');
    }
  } else {
    statHoursOn.textContent = `${countOn} ${uHour}`;
    statHoursMaybe.textContent = `${countMaybe} ${uHour}`;
    statHoursOff.textContent = `${countOff} ${uHour}`;
    if (statOffLabel && window.i18n) {
      statOffLabel.textContent = window.i18n.t('statOff');
    }
  }

  updateTimelineNeedle();
  updateLiveStatusCard();
}

// Render dynamic Matrix Table (All 12 Subgroups in Dnipro Region)
function renderFullMatrixTable() {
  if (!matrixTableBody || !scheduleData) return;
  matrixTableBody.innerHTML = '';

  const isEmergency = isEmergencyModeActive();
  const activeMatrix = currentDayView === 'today' ? scheduleData.todayMatrix : scheduleData.tomorrowMatrix;
  if (!activeMatrix) return;

  const matrixStatusBadge = document.getElementById('matrixStatusBadge');
  if (matrixStatusBadge) {
    if (isEmergency) {
      matrixStatusBadge.textContent = window.i18n ? window.i18n.t('matrixStatusEmergency') : '🚨 Аварійні відключення: графіки не діють!';
      matrixStatusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
      matrixStatusBadge.style.color = '#f87171';
    } else {
      matrixStatusBadge.textContent = window.i18n ? window.i18n.t('matrixStatusNormal') : '🟢 Сьогодні: без відключень';
      matrixStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      matrixStatusBadge.style.color = '#34d399';
    }
  }

  let hasAnyOff = false;

  allSubgroups.forEach(g => {
    const row = document.createElement('tr');
    const isCurrent = g === currentGroup;
    if (isCurrent) row.className = 'active-row';

    let cellsHtml = `<td class="sticky-col">${g}${isCurrent ? ' ⭐' : ''}</td>`;
    const pattern = activeMatrix[g] || [];

    pattern.forEach((st, h) => {
      if (isEmergency) {
        if (st === 'off') {
          hasAnyOff = true;
          cellsHtml += `<td class="matrix-cell-off" title="${h}:00 - ${window.i18n ? window.i18n.t('mapTooltipOff') : 'Відключено за графіком'} (аварійний режим)"><span class="cell-icon-off">⚡</span></td>`;
        } else if (st === 'off-first' || st === 'off-second') {
          hasAnyOff = true;
          cellsHtml += `<td class="matrix-cell-${st}-neutral" title="${h}:00 - ${getStatusName(st)} (аварійний режим)"><span class="cell-icon-off">⚡</span></td>`;
        } else if (st === 'maybe') {
          cellsHtml += `<td class="matrix-cell-maybe" title="${h}:00 - ${window.i18n ? window.i18n.t('mapTooltipMaybe') : 'Можливе відключення'}"><span class="cell-icon-maybe">⚡</span></td>`;
        } else {
          // Пусті поля при аварійних відключеннях: галочки НЕ ставимо і зеленим НЕ підкрашуємо
          const noScheduleText = (window.i18n && window.i18n.current === 'en') ? 'Schedule suspended' : ((window.i18n && window.i18n.current === 'ru') ? 'График не действует' : 'Графік не діє');
          cellsHtml += `<td class="matrix-cell-neutral" title="${h}:00 - ${noScheduleText}"><span class="cell-icon-neutral">—</span></td>`;
        }
      } else {
        if (st === 'off') {
          hasAnyOff = true;
          cellsHtml += `<td class="matrix-cell-off" title="${h}:00 - Відключення"><span class="cell-icon-off">⚡</span></td>`;
        } else if (st === 'off-first' || st === 'off-second') {
          hasAnyOff = true;
          cellsHtml += `<td class="matrix-cell-${st}" title="${h}:00 - ${getStatusName(st)}"><span class="cell-icon-off">⚡</span></td>`;
        } else if (st === 'maybe') {
          cellsHtml += `<td class="matrix-cell-maybe" title="${h}:00 - Можливе відключення"><span class="cell-icon-maybe">⚡</span></td>`;
        } else {
          cellsHtml += `<td class="matrix-cell-on" title="${h}:00 - Світло є"><span class="cell-icon-on">✓</span></td>`;
        }
      }
    });

    row.innerHTML = cellsHtml;
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      currentGroup = g;
      localStorage.setItem(CACHE_KEY_GROUP, currentGroup);
      notifyCacheSaved();
      updateActiveAddressChip();
      updateGroupSelectionVisibility();
      renderSubgroupButtons();
      fetchSchedule();
    });

    matrixTableBody.appendChild(row);
  });

  if (matrixStatusBadge) {
    if (isEmergency) {
      matrixStatusBadge.textContent = window.i18n ? window.i18n.t('matrixStatusEmergency') : '🚨 Аварійні відключення: графіки не діють!';
      matrixStatusBadge.style.background = 'rgba(239, 68, 68, 0.25)';
      matrixStatusBadge.style.color = '#fca5a5';
    } else {
      matrixStatusBadge.textContent = window.i18n ? window.i18n.t('matrixStatusNormal') : '🟢 Сьогодні: без відключень';
      matrixStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      matrixStatusBadge.style.color = '#34d399';
    }
  }
}

function getStatusName(status) {
  const lang = (window.i18n && window.i18n.current) || 'ua';
  if (status === 'on') return window.i18n ? window.i18n.t('legendOn') : 'Світло є (гарантовано)';
  if (status === 'maybe') return window.i18n ? window.i18n.t('legendMaybe') : 'Можливе відключення (жовта зона)';
  if (status === 'off-first') return lang === 'en' ? 'No power first 30 min' : (lang === 'ru' ? 'Света не будет первые 30 мин' : 'Світла не буде перші 30 хв');
  if (status === 'off-second') return lang === 'en' ? 'No power second 30 min' : (lang === 'ru' ? 'Света не будет вторые 30 мин' : 'Світла не буде другі 30 хв');
  return window.i18n ? window.i18n.t('legendOff') : 'Відключено за графіком';
}

function updateTimelineNeedle() {
  if (currentDayView !== 'today') {
    timeMarker.style.display = 'none';
    return;
  }
  timeMarker.style.display = 'block';
  const markerPin = document.querySelector('.marker-pin');
  if (markerPin && window.i18n) {
    markerPin.textContent = window.i18n.t('markerNow');
  }
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const percent = (totalMinutes / 1440) * 100;
  timeMarker.style.left = `${percent}%`;
}

function updateLiveStatusCard() {
  updateGroupSelectionVisibility();
  if (!currentGroup && !savedStreet) {
    const dtekNotice = document.getElementById('dtekOfficialNotice');
    if (dtekNotice) dtekNotice.style.display = 'none';
    return;
  }
  if (!scheduleData || !scheduleData.today) return;

  const countdownCol = document.getElementById('statusRight') || document.querySelector('.status-right');
  const isEmergency = isEmergencyModeActive();
  const isAddressEmergency = Boolean(currentAddressOutage && currentAddressOutage.hasOutage);
  const lang = (window.i18n && window.i18n.current) || 'ua';

  updateLocationInfo();

  if (isEmergency) {
    if (emergencyBanner) {
      setEmergencyBannerVisible(!isEmergencyBannerDismissed);
      const bTitle = emergencyBanner.querySelector('.emergency-text strong') || emergencyBanner.querySelector('strong');
      const bSub = emergencyBanner.querySelector('.emergency-text span');
      if (isAddressEmergency && currentAddressOutage) {
        const reason = lang === 'en' ? currentAddressOutage.reasonEn : (lang === 'ru' ? currentAddressOutage.reasonRu : currentAddressOutage.reasonUa);
        const restore = currentAddressOutage.estimatedRestore || 'до 12:25';
        const addrStr = savedBuilding ? `${savedStreet}, ${savedBuilding}` : (savedStreet || 'м. Дніпро');
        if (bTitle) {
          bTitle.textContent = lang === 'en' 
            ? `ATTENTION: ${reason.toUpperCase()} AT ${addrStr.toUpperCase()}!` 
            : (lang === 'ru' 
              ? `ВНИМАНИЕ: ПО АДРЕСУ ${addrStr.toUpperCase()} ВЕДУТСЯ ${reason.toUpperCase()}!` 
              : `УВАГА: ЗА АДРЕСОЮ ${addrStr.toUpperCase()} ТРИВАЮТЬ ${reason.toUpperCase()}!`);
        }
        if (bSub) {
          bSub.textContent = lang === 'en'
            ? `Estimated power restoration: ${restore}. Scheduled hourly outages do NOT apply.`
            : (lang === 'ru'
              ? `Ориентировочное время восстановления: ${restore}. Почасовые графики отключений НЕ ДЕЙСТВУЮТ.`
              : `Орієнтовний час відновлення: ${restore}. Погодинні графіки відключень НЕ ДІЮТЬ.`);
        }
      } else {
        if (bTitle && window.i18n) bTitle.textContent = window.i18n.t('emergencyBannerTitle');
        if (bSub && window.i18n) bSub.textContent = window.i18n.t('emergencyBannerSub');
      }
    }
    statusCard.className = 'current-status-card status-off emergency-active';
    statusIcon.textContent = '⚠️';
    statusTitle.textContent = window.i18n ? window.i18n.t('statusEmergencyTitle') : 'Аварійні та екстрені відключення (ГАВ)';

    // Render dynamic DTEK-style detailed notice block
    const dtekNotice = document.getElementById('dtekOfficialNotice');
    if (dtekNotice) {
      const details = (isAddressEmergency && currentAddressOutage)
        ? currentAddressOutage
        : (systemStatus && systemStatus.emergencyDetails ? systemStatus.emergencyDetails : null);

      const reason = details
        ? (lang === 'en' ? details.reasonEn : (lang === 'ru' ? details.reasonRu : details.reasonUa))
        : (lang === 'en' ? 'Emergency shutdowns (Emergency outage without hourly schedule)' : (lang === 'ru' ? 'Экстренные отключения (Аварийное без применения графика почасовых отключений)' : 'Екстрені відключення (Аварійне без застосування графіку погодинних відключень)'));
      const startTime = (details && details.startTime) || '—';
      const restore = details
        ? (lang === 'en' ? (details.estimatedRestoreEn || details.estimatedRestore) : (lang === 'ru' ? (details.estimatedRestoreRu || details.estimatedRestore) : (details.estimatedRestoreUa || details.estimatedRestore)))
        : (lang === 'en' ? 'pending grid stabilization' : (lang === 'ru' ? 'уточняется (по команде НЭК Укрэнерго)' : 'уточнюється (за командою НЕК Укренерго)'));
      const updated = (details && details.updatedAt) || '—';

      const leadEl = document.getElementById('dtekNoticeLead');
      const lReason = document.getElementById('dtekLabelReason');
      const vReason = document.getElementById('dtekValReason');
      const lStart = document.getElementById('dtekLabelStart');
      const vStart = document.getElementById('dtekValStart');
      const lRestore = document.getElementById('dtekLabelRestore');
      const vRestore = document.getElementById('dtekValRestore');
      const updEl = document.getElementById('dtekNoticeUpdated');
      const attTitle = document.getElementById('dtekAttentionTitle');
      const attText = document.getElementById('dtekAttentionText');

      if (leadEl) {
        leadEl.textContent = lang === 'en'
          ? (savedStreet ? 'Power is currently cut at your address' : 'Emergency shutdowns are currently active for this subgroup')
          : (lang === 'ru'
            ? (savedStreet ? 'По вашему адресу в данный момент отсутствует электроэнергия' : 'По выбранной подгруппе в данный момент действуют экстренные отключения')
            : (savedStreet ? 'За вашою адресою в даний момент відсутня електроенергія' : 'За обраною підгрупою в даний момент діють екстрені відключення'));
      }
      if (lReason) lReason.textContent = lang === 'en' ? 'Reason:' : 'Причина:';
      if (vReason) vReason.textContent = reason;
      if (lStart) lStart.textContent = lang === 'en' ? 'Start time –' : (lang === 'ru' ? 'Время начала –' : 'Час початку –');
      if (vStart) vStart.textContent = startTime;
      if (lRestore) lRestore.textContent = lang === 'en' ? 'Estimated restoration time –' : (lang === 'ru' ? 'Ориентировочное время восстановления электроэнергии –' : 'Орієнтовний час відновлення електроенергії –');
      if (vRestore) vRestore.textContent = restore;
      if (updEl) updEl.textContent = lang === 'en' ? `Information updated – ${updated}` : (lang === 'ru' ? `Дата обновления информации – ${updated}` : `Дата оновлення інформації – ${updated}`);
      if (attTitle) attTitle.textContent = lang === 'en' ? 'Attention!' : (lang === 'ru' ? 'Внимание!' : 'Увага!');
      if (attText) {
        attText.textContent = lang === 'en'
          ? 'Stabilization outage schedules are not in effect. Power restoration time may change depending on the grid situation and NEC Ukrenergo commands.'
          : (lang === 'ru'
            ? 'Графики стабилизационных отключений не действуют. Время восстановления света может меняться в зависимости от ситуации в энергосистеме и команд НЭК Укрэнерго.'
            : 'Графіки стабілізаційних відключень не діють. Час відновлення світла може змінюватись відповідно до ситуації в енергосистемі та команд НЕК Укренерго');
      }

      dtekNotice.style.display = 'block';
    }
    
    // Приховуємо таймер в аварійному режимі
    if (countdownCol) {
      countdownCol.style.display = 'none';
    }
    return;
  }

  // Як тільки графіки стають стабілізаційні — приховуємо червоний банер, детальну картку і ОДРАЗУ виводимо таймер
  const dtekNotice = document.getElementById('dtekOfficialNotice');
  if (dtekNotice) dtekNotice.style.display = 'none';
  setEmergencyBannerVisible(false);
  if (countdownCol) {
    countdownCol.style.display = 'block';
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentSlot = scheduleData.today.hours[currentHour];

  let effectiveStatus = currentSlot.status;
  if (effectiveStatus === 'off-first') {
    effectiveStatus = currentMin < 30 ? 'off' : 'on';
  } else if (effectiveStatus === 'off-second') {
    effectiveStatus = currentMin < 30 ? 'on' : 'off';
  }

  statusCard.className = 'current-status-card';
  if (effectiveStatus === 'on') {
    statusCard.classList.add('status-on');
    statusIcon.textContent = '💡';
    statusTitle.textContent = window.i18n ? window.i18n.t('statusPowerOn') : 'Світло зараз Є';
  } else if (effectiveStatus === 'maybe') {
    statusCard.classList.add('status-maybe');
    statusIcon.textContent = '⚡';
    statusTitle.textContent = window.i18n ? window.i18n.t('statusPowerMaybe') : 'Можливе відключення';
  } else {
    statusCard.classList.add('status-off');
    statusIcon.textContent = '🔌';
    statusTitle.textContent = window.i18n ? window.i18n.t('statusPowerOff') : 'Світло ВІДСУТНЄ';
  }

  let nextTransitionHour = null;
  let nextStatus = null;
  const hours = scheduleData.today.hours;

  for (let h = currentHour + 1; h < 24; h++) {
    if (hours[h].status !== currentSlot.status) {
      nextTransitionHour = h;
      nextStatus = hours[h].status;
      break;
    }
  }

  if (nextTransitionHour === null && scheduleData.tomorrow) {
    for (let h = 0; h < 24; h++) {
      if (scheduleData.tomorrow.hours[h].status !== currentSlot.status) {
        nextTransitionHour = h + 24;
        nextStatus = scheduleData.tomorrow.hours[h].status;
        break;
      }
    }
  }

  if (nextTransitionHour !== null) {
    const actionKey = nextStatus === 'off' ? 'countdownLabelToOff' : (nextStatus === 'maybe' ? 'countdownLabelToMaybe' : 'countdownLabelToOn');
    countdownLabel.textContent = window.i18n ? window.i18n.t(actionKey) : `До ${nextStatus === 'off' ? 'відключення' : 'увімкнення'}:`;

    const targetDate = new Date();
    targetDate.setHours(nextTransitionHour % 24, 0, 0, 0);
    if (nextTransitionHour >= 24) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const diffMs = targetDate - now;
    if (diffMs > 0) {
      countdownTimer.style.fontSize = '';
      countdownTimer.style.color = '';
      const diffSec = Math.floor(diffMs / 1000);
      const hoursLeft = String(Math.floor(diffSec / 3600)).padStart(2, '0');
      const minsLeft = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
      const secsLeft = String(diffSec % 60).padStart(2, '0');
      countdownTimer.textContent = `${hoursLeft}:${minsLeft}:${secsLeft}`;
      const hourFmt = String(nextTransitionHour % 24).padStart(2, '0');
      const nextStatusKey = nextStatus === 'off' ? 'countdownNextOff' : (nextStatus === 'maybe' ? 'countdownNextMaybe' : 'countdownNextOn');
      const fallbackNextName = nextStatus === 'off' ? 'відключення світла (червона зона)' : (nextStatus === 'maybe' ? 'можливе відключення (жовта зона)' : 'увімкнення світла (біла зона)');
      const stName = window.i18n ? (window.i18n.t(nextStatusKey) || getStatusName(nextStatus).toLowerCase()) : fallbackNextName;
      if (window.i18n) {
        countdownSub.textContent = (window.i18n.t('countdownExpectedAt') || 'О {time}:00 очікується {status}').replace('{time}', hourFmt).replace('{status}', stName);
      } else {
        countdownSub.textContent = `О ${hourFmt}:00 очікується ${stName}`;
      }
    }
  } else {
    if (currentSlot.status === 'on') {
      countdownLabel.textContent = window.i18n ? window.i18n.t('countdownPowerStatus') : 'Статус електропостачання:';
      countdownTimer.textContent = window.i18n ? window.i18n.t('countdown247') : '24/7 БЕЗ ВІДКЛЮЧЕНЬ';
      countdownTimer.style.fontSize = '24px';
      countdownTimer.style.color = '#34d399';
      countdownSub.textContent = window.i18n ? window.i18n.t('countdownNoOutagesSub') : 'Укренерго та ДТЕК не застосовують графіків на сьогодні';
    } else {
      countdownLabel.textContent = window.i18n ? window.i18n.t('countdownUntilChange') : 'До зміни стану:';
      countdownTimer.textContent = '--:--:--';
      countdownSub.textContent = window.i18n ? window.i18n.t('countdownNoChanges') : 'Змін у найближчі години не очікується';
    }
  }
}

function startCountdownLoop() {
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    updateLiveStatusCard();
    updateTimelineNeedle();
  }, 1000);
}

// Event Listeners
providerSelect.addEventListener('change', (e) => {
  currentProvider = e.target.value;
  localStorage.setItem(CACHE_KEY_PROVIDER, currentProvider);
  notifyCacheSaved();
  fetchSchedule();
});

tabToday.addEventListener('click', () => {
  tabToday.classList.add('active');
  tabTomorrow.classList.remove('active');
  currentDayView = 'today';
  renderActiveSchedule();
});

tabTomorrow.addEventListener('click', () => {
  tabTomorrow.classList.add('active');
  tabToday.classList.remove('active');
  currentDayView = 'tomorrow';
  renderActiveSchedule();
});

btnManualRefresh.addEventListener('click', async () => {
  try {
    liveDtekStatusText.textContent = 'Синхронізація з ДТЕК Дніпро...';
    await fetch('/api/sync-live', { method: 'POST' });
    await loadProviders();
    await fetchSchedule();
    await fetchSystemStatus();
  } catch (e) {
    console.error(e);
  }
});

window.selectSubgroupExternal = function(group) {
  if (!allSubgroups.includes(group)) return;
  currentGroup = group;
  window.currentGroup = group;
  localStorage.setItem(CACHE_KEY_GROUP, currentGroup);
  updateGroupSelectionVisibility();
  notifyCacheSaved();
  updateActiveAddressChip();
  document.querySelectorAll('.subgroup-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.group === group);
  });
  fetchSchedule();
};

// Search Logic
async function performAddressSearch() {
  const streetQuery = addressSearch.value.trim();
  const bldQuery = buildingInput.value.trim();
  const selectedCity = citySelect ? citySelect.value : 'all';

  clearSearch.style.display = streetQuery ? 'block' : 'none';

  if (!streetQuery) {
    searchResults.style.display = 'none';
    return;
  }

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(streetQuery)}&building=${encodeURIComponent(bldQuery)}&city=${encodeURIComponent(selectedCity)}`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      searchResults.innerHTML = '';
      data.results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-result-item';

        const isOutage = item.outage && item.outage.hasOutage;
        const outageBadge = isOutage
          ? `<span style="font-size:10px; padding:2px 7px; border-radius:4px; background:rgba(239,68,68,0.25); color:#f87171; border:1px solid #ef4444; font-weight:700; margin-left:6px;">🚨 ${window.i18n ? window.i18n.t('searchEmergencyBadge') : 'Аварійні роботи'} (${item.outage.estimatedRestore || 'до 12:25'})`
          : '';
        const lang = (window.i18n && window.i18n.current) || 'ua';
        const providerName = (window.i18n && window.i18n.dict && window.i18n.dict.providerDtek) || 'ДТЕК Дніпровські електромережі';
        const subPrefix = (window.i18n && window.i18n.dict && window.i18n.dict.subgroupPrefix) || 'Підгрупа';
        const bldLabel = lang === 'en' ? 'bld.' : (lang === 'ru' ? 'д.' : 'буд.');

        let bldSubtitle = '';
        if (bldQuery) {
          bldSubtitle = `<span style="color:#38bdf8; font-weight:600;">${bldLabel} ${bldQuery}</span> ${item.matchedRange ? '<span style="opacity:0.75; font-size:11px;">(' + item.matchedRange + ')</span>' : ''}`;
        } else if (item.ranges && item.ranges.length > 1) {
          const numPrefix = lang === 'en' ? 'Numbers' : (lang === 'ru' ? 'Номера' : 'Номери');
          bldSubtitle = `<div style="font-size:11px; opacity:0.8; margin-top:2px;">${numPrefix}: ${item.ranges.map(r => `${r.buildings} → гр.${r.group}`).join(', ')}</div>`;
        } else if (item.ranges && item.ranges.length === 1) {
          bldSubtitle = `<div style="font-size:11px; opacity:0.75; margin-top:1px;">${item.ranges[0].buildings}</div>`;
        }

        const calculatedBadge = item.isCalculated ? '<span style="font-size:10px; padding:2px 5px; border-radius:4px; background:rgba(234,179,8,0.2); color:#facc15; margin-left:6px;">розрахункова</span>' : '';

        div.innerHTML = `
          <div style="flex:1; padding-right:10px;">
            <div style="display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
              <strong style="color:#f8fafc; font-size:13px;">${item.street}</strong>
              ${calculatedBadge}
              ${outageBadge}
            </div>
            ${bldSubtitle ? `<div style="margin-top:2px;">${bldSubtitle}</div>` : ''}
            <div style="color:var(--brand-cyan); font-size:11px; font-weight:600; margin-top:3px;">${item.city} • ${providerName}</div>
          </div>
          <span class="search-result-group" style="white-space:nowrap;">${subPrefix} ${item.group}</span>
        `;

        div.addEventListener('click', () => {
          applyAddressSelection(item, bldQuery);
        });

        searchResults.appendChild(div);
      });
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<div style="padding:10px 14px; font-size:12px; color:#94a3b8;">Вулицю не знайдено. Введіть назву без скорочень (напр. "Хмельницького", "Поля", "Мандриківська").</div>';
      searchResults.style.display = 'block';
    }
  } catch (err) {
    console.error(err);
  }
}

function applyAddressSelection(item, buildingVal) {
  isEmergencyBannerDismissed = false;
  currentGroup = item.group;
  window.currentGroup = currentGroup;
  savedStreet = item.street;
  savedBuilding = buildingVal || (buildingInput.value.trim());

  if (item.outage && item.outage.hasOutage) {
    currentAddressOutage = item.outage;
    window.currentAddressOutage = item.outage;
    localStorage.setItem('kray_address_outage', JSON.stringify(item.outage));
  } else {
    currentAddressOutage = null;
    window.currentAddressOutage = null;
    localStorage.removeItem('kray_address_outage');
  }

  if (citySelect && item.city) {
    if (item.city.includes('Кривий Ріг')) citySelect.value = 'Кривий Ріг';
    else if (item.city.includes('Дніпро')) citySelect.value = 'Дніпро';
    else if (item.city.includes("Кам'янське")) citySelect.value = "Кам'янське";
    else if (item.city.includes('Павлоград')) citySelect.value = 'Павлоград';
    currentCity = citySelect.value;
    localStorage.setItem(CACHE_KEY_CITY, currentCity);
  }

  localStorage.setItem(CACHE_KEY_GROUP, currentGroup);
  localStorage.setItem(CACHE_KEY_STREET, savedStreet);
  localStorage.setItem(CACHE_KEY_BUILDING, savedBuilding);
  updateGroupSelectionVisibility();
  notifyCacheSaved();

  updateActiveAddressChip();
  renderSubgroupButtons();
  searchResults.style.display = 'none';
  addressSearch.value = item.street;
  updateLocationInfo();
  updateLiveStatusCard();
  renderActiveSchedule();
  renderFullMatrixTable();
  fetchSchedule();
  if (window.flyMapToAddress) {
    window.flyMapToAddress(savedStreet, currentGroup);
  }
}

if (citySelect) {
  citySelect.addEventListener('change', () => {
    currentCity = citySelect.value;
    localStorage.setItem(CACHE_KEY_CITY, currentCity);
    notifyCacheSaved();
    if (addressSearch.value.trim()) {
      performAddressSearch();
    }
  });
}

let searchTimeout = null;
addressSearch.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(performAddressSearch, 200);
});

buildingInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(performAddressSearch, 250);
});

btnFindAddress.addEventListener('click', (e) => {
  e.preventDefault();
  performAddressSearch();
});

clearSearch.addEventListener('click', () => {
  addressSearch.value = '';
  buildingInput.value = '';
  clearSearch.style.display = 'none';
  searchResults.style.display = 'none';
  savedStreet = '';
  savedBuilding = '';
  currentAddressOutage = null;
  window.currentAddressOutage = null;
  localStorage.removeItem('kray_address_outage');
  localStorage.removeItem(CACHE_KEY_STREET);
  localStorage.removeItem(CACHE_KEY_BUILDING);
  updateActiveAddressChip();
  updateLocationInfo();
  updateLiveStatusCard();
  renderActiveSchedule();
  renderFullMatrixTable();
  notifyCacheSaved();
});

btnRemoveSavedAddress.addEventListener('click', () => {
  savedStreet = '';
  savedBuilding = '';
  addressSearch.value = '';
  buildingInput.value = '';
  clearSearch.style.display = 'none';
  currentAddressOutage = null;
  window.currentAddressOutage = null;
  localStorage.removeItem('kray_address_outage');
  localStorage.removeItem(CACHE_KEY_STREET);
  localStorage.removeItem(CACHE_KEY_BUILDING);
  updateActiveAddressChip();
  updateLocationInfo();
  updateLiveStatusCard();
  renderActiveSchedule();
  renderFullMatrixTable();
  notifyCacheSaved();
});

document.addEventListener('click', (e) => {
  if (!addressSearch.contains(e.target) && !buildingInput.contains(e.target) && !searchResults.contains(e.target) && !btnFindAddress.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});

window.onLanguageChange = function(lang, dict) {
  updateLocationInfo();
  loadProviders();
  renderDates();
  renderActiveSchedule();
  renderFullMatrixTable();
  updateLiveStatusCard();
  updateActiveAddressChip();
  if (window.refreshDniproMap) window.refreshDniproMap();
};

// Periodic Auto-refresh every 30s
setInterval(() => {
  fetchSchedule();
  fetchSystemStatus();
}, 30000);

// Emergency Toggle Button in Footer
const btnFooterToggleEmergency = document.getElementById('btnFooterToggleEmergency');
if (btnFooterToggleEmergency) {
  btnFooterToggleEmergency.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/toggle-mode', { method: 'POST' });
      const data = await res.json();
      if (data && data.success) {
        if (!systemStatus) systemStatus = {};
        systemStatus.mode = data.mode;
        window.systemStatus = systemStatus;
        updateLocationInfo();
        updateLiveStatusCard();
        renderActiveSchedule();
        renderFullMatrixTable();
        if (window.refreshDniproMap) window.refreshDniproMap();
      }
    } catch (e) {
      console.error('Failed to toggle emergency mode:', e);
    }
  });
}

// Scroll to Top Button (Smooth RAF Scroll - Matching Main Landing Page)
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 350) {
          scrollToTopBtn.classList.add('visible');
        } else {
          scrollToTopBtn.classList.remove('visible');
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScrollToTop = () => {
    const duration = 650;
    const start = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (start <= 0) return;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = easeInOutQuad(elapsed, start, -start, duration);
      window.scrollTo(0, progress);

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, 0);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollToTop();
  });
}

async function loadTelegramFeed() {
  const card = document.getElementById('telegramFeedCard');
  const listEl = document.getElementById('tgFeedList');
  const titleEl = document.getElementById('tgFeedTitle');
  if (!card || !listEl) return;

  const lang = window.i18n ? window.i18n.current : 'ua';
  if (titleEl) {
    titleEl.textContent =
      lang === 'ru'
        ? 'Оперативные сводки из Telegram'
        : lang === 'en'
          ? 'Live Telegram Outage Updates'
          : 'Оперативні зведення з Telegram';
  }
  const readMoreLabel =
    lang === 'ru' ? 'Читать полностью ▾' : lang === 'en' ? 'Read full ▾' : 'Читати повністю ▾';
  const collapseLabel =
    lang === 'ru' ? 'Свернуть ▴' : lang === 'en' ? 'Collapse ▴' : 'Згорнути ▴';

  try {
    const res = await fetch('/api/outages-telegram');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success || !Array.isArray(data.posts) || data.posts.length === 0) return;

    listEl.innerHTML = '';
    for (const post of data.posts) {
      const item = document.createElement('article');
      item.className = 'tg-feed-item';

      const dt = post.publishedAt ? new Date(post.publishedAt) : null;
      const timeStr =
        dt && !Number.isNaN(dt.getTime())
          ? dt.toLocaleTimeString(lang === 'en' ? 'en-GB' : 'uk-UA', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
            })
          : '';

      const meta = document.createElement('div');
      meta.className = 'tg-feed-meta';

      const badge = document.createElement('span');
      badge.className = 'tg-source-badge';
      badge.textContent = post.source;
      meta.appendChild(badge);

      if (post.timeHint) {
        const chip = document.createElement('span');
        chip.className = 'tg-time-chip';
        chip.textContent = `⏱ ${post.timeHint}`;
        meta.appendChild(chip);
      }

      const body = document.createElement('p');
      const isLong = post.text.length > 220 || post.text.split('\n').length > 5;
      body.className = isLong ? 'tg-feed-text is-collapsed' : 'tg-feed-text';
      body.textContent = post.text;

      const footer = document.createElement('div');
      footer.className = 'tg-feed-footer';

      const dateSpan = document.createElement('span');
      dateSpan.textContent = timeStr;
      footer.appendChild(dateSpan);

      if (isLong) {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'tg-feed-link';
        toggleBtn.textContent = readMoreLabel;
        toggleBtn.addEventListener('click', () => {
          const collapsed = body.classList.toggle('is-collapsed');
          toggleBtn.textContent = collapsed ? readMoreLabel : collapseLabel;
        });
        footer.appendChild(toggleBtn);
      }

      item.appendChild(meta);
      item.appendChild(body);
      item.appendChild(footer);
      listEl.appendChild(item);
    }

    card.style.display = 'block';
  } catch (err) {
    console.warn('Telegram feed load failed:', err);
  }
}

// Initialize
(async () => {
  if (window.i18n) {
    window.i18n.setLanguage(window.i18n.current);
  }
  updateLocationInfo();
  renderDates();
  await loadProviders();
  updateActiveAddressChip();
  await fetchSystemStatus();
  await fetchSchedule();
  loadTelegramFeed();
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
