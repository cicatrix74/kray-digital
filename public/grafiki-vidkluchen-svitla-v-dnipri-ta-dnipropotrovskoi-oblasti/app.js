// Cache keys
const CACHE_KEY_PROVIDER = 'kray_light_provider';
const CACHE_KEY_GROUP = 'kray_light_group';
const CACHE_KEY_CITY = 'kray_light_city';
const CACHE_KEY_STREET = 'kray_light_street';
const CACHE_KEY_BUILDING = 'kray_light_building';

// State with cache restoration
let currentProvider = localStorage.getItem(CACHE_KEY_PROVIDER) || 'dtek_dnipro';
let currentGroup = localStorage.getItem(CACHE_KEY_GROUP) || '5.1';
let currentCity = localStorage.getItem(CACHE_KEY_CITY) || 'Дніпро';
let savedStreet = localStorage.getItem(CACHE_KEY_STREET) || '';
let savedBuilding = localStorage.getItem(CACHE_KEY_BUILDING) || '';

let currentDayView = 'today';
let scheduleData = null;
let systemStatus = null;
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
const gridStatusChip = document.getElementById('gridStatusChip');
const gridStatusText = document.getElementById('gridStatusText');
const storageIndicator = document.getElementById('storageIndicator');
const liveDtekStatusText = document.getElementById('liveDtekStatusText');
const activeSourceLabel = document.getElementById('activeSourceLabel');

// Status card DOM
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
      fetchSchedule();
    });

    subgroupGrid.appendChild(btn);
  });
}

// Fetch System Status (Ukrenergo / DTEK Dnipro)
async function fetchSystemStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    systemStatus = data;
    window.systemStatus = data;
    renderSystemStatus();
    if (window.refreshDniproMap) window.refreshDniproMap();
  } catch (e) {
    console.error('Error fetching system status:', e);
  }
}

function renderSystemStatus() {
  if (!systemStatus) return;
  const isEmergency = systemStatus.mode === 'emergency';
  if (emergencyBanner) emergencyBanner.style.display = isEmergency ? 'block' : 'none';
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

    const res = await fetch(`/api/schedule?provider=${currentProvider}&group=${currentGroup}`);
    const data = await res.json();
    scheduleData = data;
    window.scheduleData = data;
    window.currentGroup = currentGroup;
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
  const isEmergency = systemStatus && systemStatus.mode === 'emergency';
  const subPrefix = window.i18n ? window.i18n.t('subgroupPrefix') : 'Підгрупа';
  
  if (activeGroupLabel) {
    activeGroupLabel.textContent = `${subPrefix} ${currentGroup}`;
  }

  if (activeProviderLabel && window.i18n) {
    if (currentProvider === 'dtek_dnipro') activeProviderLabel.textContent = window.i18n.t('providerDtek');
    else if (currentProvider === 'yasno_dnipro') activeProviderLabel.textContent = window.i18n.t('providerYasno');
    else if (currentProvider === 'cek_dnipro') activeProviderLabel.textContent = window.i18n.t('providerCek');
  }

  if (activeSourceLabel) {
    if (isEmergency) {
      activeSourceLabel.textContent = window.i18n ? window.i18n.t('sourceEmergency') : 'НЕК Укренерго (ГАВ/САВ)';
      activeSourceLabel.style.background = 'rgba(239, 68, 68, 0.25)';
      activeSourceLabel.style.color = '#f87171';
    } else {
      activeSourceLabel.textContent = window.i18n ? window.i18n.t('sourceLive') : 'ДТЕК Live Дніпро';
      activeSourceLabel.style.background = 'rgba(16, 185, 129, 0.2)';
      activeSourceLabel.style.color = 'var(--color-on)';
    }
  }
}

function renderActiveSchedule() {
  if (!scheduleData) return;

  const isEmergency = systemStatus && systemStatus.mode === 'emergency';
  const currentSchedule = currentDayView === 'today' ? scheduleData.today : scheduleData.tomorrow;
  const hours = currentSchedule.hours;

  updateLocationInfo();

  // 24 Timeline Blocks
  timelineGrid.innerHTML = '';
  let countOn = 0, countMaybe = 0, countOff = 0;

  hours.forEach(item => {
    if (item.status === 'on') countOn++;
    else if (item.status === 'maybe') countMaybe++;
    else countOff++;

    const block = document.createElement('div');
    if (isEmergency) {
      block.className = 'hour-block state-emergency';
      block.textContent = item.hour;
      block.title = `${item.time}: Графік не діє (Аварійні відключення)`;
    } else {
      block.className = `hour-block state-${item.status}`;
      block.textContent = item.hour;
      block.title = `${item.time}: ${getStatusName(item.status)}`;
    }
    timelineGrid.appendChild(block);
  });

  // Stats
  const uHour = window.i18n ? window.i18n.t('unitHour') : 'год';
  if (isEmergency) {
    statHoursOn.textContent = '—';
    statHoursMaybe.textContent = '—';
    statHoursOff.textContent = window.i18n ? window.i18n.t('statEmergencyValue') : 'Аварійні';
  } else {
    statHoursOn.textContent = `${countOn} ${uHour}`;
    statHoursMaybe.textContent = `${countMaybe} ${uHour}`;
    statHoursOff.textContent = `${countOff} ${uHour}`;
  }

  updateTimelineNeedle();
  updateLiveStatusCard();
}

// Render dynamic Matrix Table (All 12 Subgroups in Dnipro Region)
function renderFullMatrixTable() {
  if (!matrixTableBody || !scheduleData) return;
  matrixTableBody.innerHTML = '';

  const isEmergency = systemStatus && systemStatus.mode === 'emergency';
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
        // У разі аварійних відключень галочки ПРИБИРАЄМО
        cellsHtml += `<td class="matrix-cell-emergency" title="${h}:00 - Стабілізаційний графік не діє (екстрені відключення)"><span class="cell-icon-emergency">—</span></td>`;
      } else {
        if (st === 'off') {
          hasAnyOff = true;
          cellsHtml += `<td class="matrix-cell-off" title="${h}:00 - Відключення"><span class="cell-icon-off">⚡</span></td>`;
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
  if (status === 'on') return window.i18n ? window.i18n.t('legendOn') : 'Світло є (гарантовано)';
  if (status === 'maybe') return window.i18n ? window.i18n.t('legendMaybe') : 'Можливе відключення (жовта зона)';
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
  if (!scheduleData || !scheduleData.today) return;

  const countdownCol = document.getElementById('statusRight') || document.querySelector('.status-right');
  const isEmergency = systemStatus && systemStatus.mode === 'emergency';

  updateLocationInfo();

  if (isEmergency) {
    if (emergencyBanner) emergencyBanner.style.display = 'block';
    statusCard.className = 'current-status-card status-off emergency-active';
    statusIcon.textContent = '⚠️';
    statusTitle.textContent = window.i18n ? window.i18n.t('statusEmergencyTitle') : 'Аварійні та екстрені відключення (ГАВ)';
    
    // Приховуємо таймер в аварійному режимі
    if (countdownCol) {
      countdownCol.style.display = 'none';
    }
    return;
  }

  // Як тільки графіки стають стабілізаційні — приховуємо червоний банер і ОДРАЗУ виводимо таймер
  if (emergencyBanner) emergencyBanner.style.display = 'none';
  if (countdownCol) {
    countdownCol.style.display = 'block';
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentSlot = scheduleData.today.hours[currentHour];

  statusCard.className = 'current-status-card';
  if (currentSlot.status === 'on') {
    statusCard.classList.add('status-on');
    statusIcon.textContent = '💡';
    statusTitle.textContent = window.i18n ? window.i18n.t('statusPowerOn') : 'Світло зараз Є';
  } else if (currentSlot.status === 'maybe') {
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
      const stName = getStatusName(nextStatus).toLowerCase();
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
  notifyCacheSaved();
  updateActiveAddressChip();
  document.querySelectorAll('.subgroup-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.group === group);
  });
  fetchSchedule();
};

window.toggleEmergencyMode = async () => {
  try {
    await fetch('/api/toggle-mode', { method: 'POST' });
    await fetchSystemStatus();
    renderActiveSchedule();
    renderFullMatrixTable();
    updateLiveStatusCard();
    if (window.refreshDniproMap) window.refreshDniproMap();
  } catch (e) {
    console.error('Error toggling emergency mode:', e);
  }
};

if (btnToggleEmergency) {
  btnToggleEmergency.addEventListener('click', window.toggleEmergencyMode);
}

const liveApiTag = document.getElementById('liveApiTag');
if (liveApiTag) {
  liveApiTag.style.cursor = 'pointer';
  liveApiTag.title = 'Клікніть для перемикання режиму (Аварійний / Стабілізаційний)';
  liveApiTag.addEventListener('click', window.toggleEmergencyMode);
}

const btnFooterToggle = document.getElementById('btnFooterToggleEmergency');
if (btnFooterToggle) {
  btnFooterToggle.addEventListener('click', window.toggleEmergencyMode);
}

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

        let bldSubtitle = '';
        if (bldQuery) {
          bldSubtitle = `<span style="color:#38bdf8; font-weight:600;">буд. ${bldQuery}</span> ${item.matchedRange ? '<span style="opacity:0.75; font-size:11px;">(' + item.matchedRange + ')</span>' : ''}`;
        } else if (item.ranges && item.ranges.length > 1) {
          bldSubtitle = `<div style="font-size:11px; opacity:0.8; margin-top:2px;">Номери: ${item.ranges.map(r => `${r.buildings} → гр.${r.group}`).join(', ')}</div>`;
        } else if (item.ranges && item.ranges.length === 1) {
          bldSubtitle = `<div style="font-size:11px; opacity:0.75; margin-top:1px;">${item.ranges[0].buildings}</div>`;
        }

        const calculatedBadge = item.isCalculated ? '<span style="font-size:10px; padding:2px 5px; border-radius:4px; background:rgba(234,179,8,0.2); color:#facc15; margin-left:6px;">розрахункова</span>' : '';

        div.innerHTML = `
          <div style="flex:1; padding-right:10px;">
            <div style="display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
              <strong style="color:#f8fafc; font-size:13px;">${item.street}</strong>
              ${calculatedBadge}
            </div>
            ${bldSubtitle ? `<div style="margin-top:2px;">${bldSubtitle}</div>` : ''}
            <div style="color:var(--brand-cyan); font-size:11px; font-weight:600; margin-top:3px;">${item.city} • ДТЕК Дніпровські електромережі</div>
          </div>
          <span class="search-result-group" style="white-space:nowrap;">Підгрупа ${item.group}</span>
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
  currentGroup = item.group;
  savedStreet = item.street;
  savedBuilding = buildingVal || (buildingInput.value.trim());

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
  notifyCacheSaved();

  updateActiveAddressChip();
  renderSubgroupButtons();
  searchResults.style.display = 'none';
  addressSearch.value = item.street;
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
  localStorage.removeItem(CACHE_KEY_STREET);
  localStorage.removeItem(CACHE_KEY_BUILDING);
  updateActiveAddressChip();
  notifyCacheSaved();
});

btnRemoveSavedAddress.addEventListener('click', () => {
  savedStreet = '';
  savedBuilding = '';
  addressSearch.value = '';
  buildingInput.value = '';
  clearSearch.style.display = 'none';
  localStorage.removeItem(CACHE_KEY_STREET);
  localStorage.removeItem(CACHE_KEY_BUILDING);
  updateActiveAddressChip();
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

// Initialize
(async () => {
  updateLocationInfo();
  renderDates();
  await loadProviders();
  updateActiveAddressChip();
  await fetchSystemStatus();
  await fetchSchedule();
})();
