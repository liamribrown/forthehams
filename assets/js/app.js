// For the Hams! Mobile Web App Logic
// www.forthehams.co.uk | UK Ethical Hamster Care & Rescue Standards
// Authentic 2000s / Noughties Glossy Web 2.0 Theme 🐹✨

import { speciesList } from './data/species.js?v=2.4';
import { careGuides } from './data/guides.js?v=2.4';
import { unsafeItems } from './data/unsafe.js?v=2.4';
import { products } from './data/products.js?v=2.4';
import { foodDatabase } from './data/foods.js?v=2.4';
import { rescuesList } from './data/rescues.js?v=2.4';
import { adoptionChecklist } from './data/checklist.js?v=2.4';

// Application State
const state = {
  currentSpecies: 'all', // 'all' | species id
  activeTab: 'guides',   // 'guides' | 'food' | 'shop' | 'checklist' | 'rescues'
  guidesSubTab: 'core',  // 'core' | 'unsafe' | 'inspiration'
  foodSubTab: 'mixes',   // 'mixes' | 'fresh' | 'toxic'
  foodSearch: '',
  shopCategory: 'all',
  shopRetailer: 'all',
  shopSearch: '',
  rescueRegion: 'all',
  checkedItems: JSON.parse(localStorage.getItem('fth_checklist') || '{}')
};

// 2000s Tab Gel Highlighting Matrix
const tabGelClasses = {
  guides: 'gel-orange',
  food: 'gel-green',
  shop: 'gel-blue',
  checklist: 'gel-pink',
  rescues: 'gel-purple'
};

// 2000s Species Gel Color Mapping
const speciesGelClasses = {
  all: 'gel-orange',
  syrian: 'gel-yellow',
  roborovski: 'gel-blue',
  winter_white: 'gel-green',
  campbells: 'gel-pink',
  chinese: 'gel-purple'
};

// Emoji icons for guides
const guideEmojis = {
  enclosures: '🏰',
  bedding: '☁️',
  wheels: '🎡',
  sand_baths: '🏖️',
  multi_chamber: '🏡',
  substrates_textures: '🪵',
  forage_sprays: '🌾',
  food_mixes_nutrition: '🥣',
  solitary_rule: '🛡️'
};

// Category badge color mapping for checklist
const checklistCategoryGels = {
  Habitat: 'gel-blue',
  Exercise: 'gel-orange',
  Nesting: 'gel-purple',
  Hygiene: 'gel-yellow',
  Enrichment: 'gel-green',
  Safety: 'gel-pink',
  Welfare: 'gel-red'
};

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initRouting();
  setupBottomSheetListeners();
  renderSpeciesBar();
  renderCurrentTab();
  setupNavigationListeners();
  updateIcons();
});

// Routing
function initRouting() {
  const hash = window.location.hash.replace('#', '');
  if (['guides', 'food', 'shop', 'checklist', 'rescues'].includes(hash)) {
    state.activeTab = hash;
  }
  updateNavState();
}

function switchTab(tab, subTab = null) {
  state.activeTab = tab;
  if (tab === 'guides' && subTab) state.guidesSubTab = subTab;
  if (tab === 'food' && subTab) state.foodSubTab = subTab;
  if (tab === 'shop' && subTab) state.shopCategory = subTab;
  window.location.hash = tab;
  updateNavState();
  renderCurrentTab();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavState() {
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    const tab = btn.getAttribute('data-nav-tab');
    const iconBg = btn.querySelector('.tab-icon-bg');
    const label = btn.querySelector('.tab-label');
    const gelClass = tabGelClasses[tab] || 'gel-orange';

    if (iconBg) {
      iconBg.classList.remove('gel-btn', 'gel-orange', 'gel-green', 'gel-blue', 'gel-pink', 'gel-purple', 'gel-silver', 'text-slate-400');
      
      if (tab === state.activeTab) {
        iconBg.classList.add('gel-btn', gelClass, 'shadow-md', '-translate-y-0.5');
      } else {
        iconBg.classList.add('text-slate-400', 'hover:bg-sky-50');
      }
    }

    if (label) {
      if (tab === state.activeTab) {
        label.classList.add('text-sky-950', 'font-black');
        label.classList.remove('text-slate-400');
      } else {
        label.classList.remove('text-sky-950', 'font-black');
        label.classList.add('text-slate-400');
      }
    }
  });
}

function setupNavigationListeners() {
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-nav-tab');
      if (state.activeTab === tab) return;
      switchTab(tab);
    });
  });
}

// Mobile Bottom Sheet Utility (with Swipe-Down-to-Close Gesture)
function openBottomSheet(title, htmlContent) {
  const backdrop = document.getElementById('bottom-sheet-backdrop');
  const container = document.getElementById('bottom-sheet-container');
  const titleEl = document.getElementById('bottom-sheet-title');
  const bodyEl = document.getElementById('bottom-sheet-body');

  if (!backdrop || !titleEl || !bodyEl) return;

  titleEl.textContent = title || 'Care Guide';
  bodyEl.innerHTML = `
    ${htmlContent || ''}
    <div class="mt-6 pt-4 border-t border-sky-100 flex justify-center">
      <button type="button" data-close-sheet-bottom class="w-full py-2.5 gel-btn gel-silver text-xs font-black text-slate-700 flex items-center justify-center gap-1.5">
        <span>✕ Close Guide</span>
      </button>
    </div>
  `;

  bodyEl.querySelector('[data-close-sheet-bottom]')?.addEventListener('click', closeBottomSheet);

  if (container) {
    container.style.transition = '';
    container.style.transform = '';
    container.classList.add('animate-slide-up');
  }
  backdrop.style.opacity = '';
  backdrop.classList.remove('hidden');
  bodyEl.scrollTop = 0;
  document.body.classList.add('overflow-hidden');
  updateIcons();
}

function closeBottomSheet() {
  const backdrop = document.getElementById('bottom-sheet-backdrop');
  const container = document.getElementById('bottom-sheet-container');
  if (backdrop) {
    backdrop.classList.add('hidden');
    backdrop.style.opacity = '';
    document.body.classList.remove('overflow-hidden');
  }
  if (container) {
    container.style.transition = '';
    container.style.transform = '';
  }
}

function setupBottomSheetListeners() {
  const backdrop = document.getElementById('bottom-sheet-backdrop');
  const container = document.getElementById('bottom-sheet-container');
  const headerEl = document.getElementById('bottom-sheet-header');
  const bodyEl = document.getElementById('bottom-sheet-body');
  const closeBtn = document.getElementById('bottom-sheet-close');

  if (closeBtn) closeBtn.addEventListener('click', closeBottomSheet);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeBottomSheet();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBottomSheet();
  });

  if (!container || !bodyEl) return;

  // Touch Swipe-Down-to-Close State
  let touchStartY = 0;
  let touchStartX = 0;
  let touchStartTime = 0;
  let currentDeltaY = 0;
  let isDraggingSheet = false;
  let canDragFromBody = false;
  let startedOnHeader = false;

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    // Ignore if tapping the close button directly
    if (e.target.closest('#bottom-sheet-close')) return;

    const touch = e.touches[0];
    touchStartY = touch.clientY;
    touchStartX = touch.clientX;
    touchStartTime = Date.now();
    currentDeltaY = 0;
    isDraggingSheet = false;

    startedOnHeader = !!(headerEl && headerEl.contains(e.target));
    // Allow swipe-to-close from the content area ONLY if the scroll position is already at the very top
    canDragFromBody = bodyEl.scrollTop <= 1;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartY;
    const deltaX = touch.clientX - touchStartX;

    if (!isDraggingSheet) {
      // Only initiate sheet drag on a downward vertical movement
      if (deltaY <= 6 || Math.abs(deltaX) > Math.abs(deltaY)) return;

      // Must either start on the header bar, or start at the top of the scrollable body while pulling down
      if (startedOnHeader || (canDragFromBody && bodyEl.scrollTop <= 0)) {
        isDraggingSheet = true;
        container.classList.remove('animate-slide-up');
        container.style.transition = 'none';
      } else {
        return;
      }
    }

    if (isDraggingSheet) {
      currentDeltaY = Math.max(0, deltaY);
      if (e.cancelable) e.preventDefault();
      container.style.transform = `translateY(${currentDeltaY}px)`;
      if (backdrop) {
        const progress = Math.min(1, currentDeltaY / 320);
        backdrop.style.opacity = String(1 - progress * 0.65);
      }
    }
  }, { passive: false });

  const handleTouchEnd = () => {
    if (!isDraggingSheet) return;
    isDraggingSheet = false;

    const elapsed = Math.max(1, Date.now() - touchStartTime);
    const velocity = currentDeltaY / elapsed; // px per ms

    // Close if dragged down past 85px or flicked down quickly
    if (currentDeltaY > 85 || (currentDeltaY > 35 && velocity > 0.45)) {
      container.style.transition = 'transform 0.2s ease-out';
      container.style.transform = 'translateY(100%)';
      if (backdrop) backdrop.style.opacity = '0';
      setTimeout(() => {
        closeBottomSheet();
      }, 190);
    } else {
      // Snap back into open position
      container.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
      container.style.transform = 'translateY(0)';
      if (backdrop) backdrop.style.opacity = '';
    }
    currentDeltaY = 0;
  };

  container.addEventListener('touchend', handleTouchEnd, { passive: true });
  container.addEventListener('touchcancel', handleTouchEnd, { passive: true });
}

// 2000s Species Filter Bar (Wrap-Friendly Glossy Candy Pills — All Names Always Visible)
function renderSpeciesBar() {
  const container = document.getElementById('species-filter-container');
  if (!container) return;

  const speciesOptions = [
    { id: 'all', emoji: '🐾', name: 'All Species' },
    { id: 'syrian', emoji: '🐹', name: 'Syrian' },
    { id: 'roborovski', emoji: '⚡', name: 'Roborovski' },
    { id: 'winter_white', emoji: '❄️', name: 'Winter White' },
    { id: 'campbells', emoji: '🌾', name: "Campbell's" },
    { id: 'chinese', emoji: '🌿', name: 'Chinese' }
  ];

  container.innerHTML = `
    <div class="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 py-1 max-w-3xl mx-auto">
      <span class="text-[10px] font-black text-sky-950 uppercase tracking-wider shrink-0 px-1">Filter by Hamster:</span>
      ${speciesOptions.map(opt => {
        const isActive = state.currentSpecies === opt.id;
        const activeGel = speciesGelClasses[opt.id] || 'gel-orange';
        return `
          <button 
            type="button"
            data-species-btn="${opt.id}"
            class="gel-btn ${isActive ? activeGel : 'gel-silver'} px-3 py-1.5 text-xs font-black transition-all duration-150 shrink-0 flex items-center gap-1">
            <span>${opt.emoji}</span>
            <span>${opt.name}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('[data-species-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = btn.getAttribute('data-species-btn') || 'all';
      state.currentSpecies = selected;
      renderSpeciesBar();
      renderCurrentTab();
    });
  });

  renderSpeciesDetailBanner();
}

// 2000s Species Metric Quick Card (Glossy Web 2.0 Pet Profile Panel)
function renderSpeciesDetailBanner() {
  const banner = document.getElementById('species-banner-area');
  if (!banner) return;

  if (state.currentSpecies === 'all') {
    banner.innerHTML = '';
    return;
  }

  const spec = speciesList.find(s => s.id === state.currentSpecies);
  if (!spec) {
    banner.innerHTML = '';
    return;
  }

  const activeGel = speciesGelClasses[spec.id] || 'gel-yellow';
  // Keep compact by default when browsing Safe Picks or Food Hub so filtered items stay right in view
  const showFullByDefault = state.activeTab === 'guides';
  const isExpanded = state.speciesBannerExpanded !== undefined ? state.speciesBannerExpanded : showFullByDefault;

  banner.innerHTML = `
    <div class="web2-card my-2.5 border-sky-300 shadow-md">
      <div class="web2-header-bar px-3.5 py-2 flex items-center justify-between gap-2">
        <div class="flex items-center gap-1.5 flex-wrap">
          <div class="hidden sm:flex items-center gap-1 mr-1">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-400 border border-rose-600 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600 inline-block"></span>
          </div>
          <span class="text-sm sm:text-base font-black text-slate-900 font-heading">${spec.name}</span>
          <span class="gel-badge ${activeGel} text-[10px] font-black">${spec.badge || 'UK Standard'}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button type="button" id="toggle-species-details" class="gel-btn gel-silver px-2.5 py-1 text-[10px] font-black">
            ${isExpanded ? 'Hide Stats ▴' : 'Full Stats ▾'}
          </button>
          <button type="button" id="close-species-banner" class="w-6 h-6 rounded-full gel-btn gel-silver text-xs font-black" title="Reset species filter">✕</button>
        </div>
      </div>

      <!-- Compact Summary Strip (Always Visible) -->
      <div class="px-3.5 py-2 bg-sky-50/70 border-b border-sky-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-slate-700">
        <span>🎡 <strong>Wheel:</strong> ${spec.minWheelSize || '28cm+'}</span>
        <span>🏠 <strong>Cage:</strong> 100x50cm+</span>
        <span>☁️ <strong>Bedding:</strong> ${spec.beddingDepth || '20cm+'}</span>
        <span class="text-rose-700">🛡️ ${spec.solitaryStatus || 'Strictly Solitary'}</span>
      </div>

      ${isExpanded ? `
        <div class="p-3.5 bg-gradient-to-b from-white to-sky-50/40">
          <p class="text-xs font-medium text-slate-700 leading-relaxed mb-3">${spec.description || ''}</p>

          <!-- Quick Metrics Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div class="p-2.5 rounded-xl border border-sky-200 bg-white shadow-xs">
              <div class="text-[9px] font-black text-sky-800 uppercase">🎡 Min Upright Wheel</div>
              <div class="font-black text-sm text-slate-900 mt-0.5">${spec.minWheelSize || '28cm+'}</div>
              <div class="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">${spec.wheelNote || ''}</div>
            </div>

            <div class="p-2.5 rounded-xl border border-sky-200 bg-white shadow-xs">
              <div class="text-[9px] font-black text-sky-800 uppercase">🏠 Min Unbroken Cage</div>
              <div class="font-black text-sm text-slate-900 mt-0.5">${spec.minCageSize || '100 x 50 x 50 cm'}</div>
              <div class="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">${spec.cageNote || ''}</div>
            </div>

            <div class="p-2.5 rounded-xl border border-rose-200 bg-rose-50/60 shadow-xs">
              <div class="text-[9px] font-black text-rose-800 uppercase">🛡️ Social Housing</div>
              <div class="font-black text-sm text-rose-700 mt-0.5">${spec.solitaryStatus || 'Strictly Solitary'}</div>
              <div class="text-[10px] text-rose-900/80 font-medium leading-tight mt-0.5">${spec.solitaryNote || ''}</div>
            </div>

            <div class="p-2.5 rounded-xl border border-sky-200 bg-white shadow-xs">
              <div class="text-[9px] font-black text-sky-800 uppercase">☁️ Bedding Depth</div>
              <div class="font-black text-sm text-slate-900 mt-0.5">${spec.beddingDepth || '20cm+'}</div>
              <div class="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Compacted paper or safe aspen</div>
            </div>

            <div class="p-2.5 rounded-xl border border-amber-200 bg-amber-50/50 shadow-xs">
              <div class="text-[9px] font-black text-amber-900 uppercase">🏖️ Sand Bath Size</div>
              <div class="font-black text-sm text-slate-900 mt-0.5">${spec.sandBathSize || 'A4 Size+'}</div>
              <div class="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">${spec.sandNote || ''}</div>
            </div>

            <div class="p-2.5 rounded-xl border border-purple-200 bg-purple-50/40 shadow-xs">
              <div class="text-[9px] font-black text-purple-900 uppercase">📏 Vital Stats & Holes</div>
              <div class="font-black text-sm text-slate-900 mt-0.5">${spec.entranceHoleMin || '5cm+'} Hide Entrances</div>
              <div class="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Lifespan: ${spec.lifespan || '2-3 yrs'} • Size: ${spec.avgSize || ''}</div>
            </div>
          </div>

          <!-- Diabetes & Diet Warning Pill -->
          <div class="mt-2.5 p-2.5 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 text-[11px] font-bold text-amber-950 flex items-start gap-2 shadow-xs">
            <span class="text-base leading-none mt-0.5">🥗</span>
            <div>
              <strong class="font-black uppercase tracking-wide text-amber-900">Species Diet & Diabetes Profile:</strong>
              <span class="font-medium text-slate-800 ml-1">${spec.dietSpecial || ''}</span>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById('toggle-species-details')?.addEventListener('click', () => {
    state.speciesBannerExpanded = !isExpanded;
    renderSpeciesDetailBanner();
  });

  document.getElementById('close-species-banner')?.addEventListener('click', () => {
    state.currentSpecies = 'all';
    renderSpeciesBar();
    renderCurrentTab();
  });
}

// Router View Renderer
function renderCurrentTab() {
  renderSpeciesDetailBanner();
  switch (state.activeTab) {
    case 'guides':
      renderCareGuides();
      break;
    case 'food':
      renderFoodHub();
      break;
    case 'shop':
      renderShop();
      break;
    case 'checklist':
      renderChecklist();
      break;
    case 'rescues':
      renderRescues();
      break;
    default:
      renderCareGuides();
  }
  updateIcons();
}

// ==========================================
// 1. CARE GUIDES (2000s Web 2.0 Style)
// ==========================================
function renderCareGuides() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div>
      <!-- Sub-Tab Switcher (Noughties Glossy Pills) -->
      <div class="flex items-center gap-2 mb-4 max-w-md mx-auto justify-center flex-wrap">
        <button data-guide-sub="core" class="gel-btn ${
          state.guidesSubTab === 'core' ? 'gel-orange' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          📖 Core Care Guides
        </button>
        <button data-guide-sub="unsafe" class="gel-btn ${
          state.guidesSubTab === 'unsafe' ? 'gel-red' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          🛑 Unsafe Hall of Shame
        </button>
        <button data-guide-sub="inspiration" class="gel-btn ${
          state.guidesSubTab === 'inspiration' ? 'gel-blue' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          📸 Real Foster Setups
        </button>
      </div>

      <!-- Render Sub-View -->
      ${state.guidesSubTab === 'core' ? renderCoreGuidesView() : ''}
      ${state.guidesSubTab === 'unsafe' ? renderUnsafeView() : ''}
      ${state.guidesSubTab === 'inspiration' ? renderInspirationView() : ''}
    </div>
  `;

  document.querySelectorAll('[data-guide-sub]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.guidesSubTab = btn.getAttribute('data-guide-sub');
      renderCareGuides();
    });
  });

  document.querySelectorAll('[data-quick-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-quick-jump');
      const sub = btn.getAttribute('data-quick-sub') || null;
      switchTab(target, sub);
    });
  });

  document.querySelectorAll('[data-open-guide]').forEach(card => {
    card.addEventListener('click', () => {
      const guideId = card.getAttribute('data-open-guide');
      const guide = careGuides.find(g => g.id === guideId);
      if (guide) {
        const emoji = guideEmojis[guide.id] || '🐹';
        openBottomSheet(
          `${emoji} ${guide.title}`,
          `
            <div class="guide-content">
              <span class="gel-badge gel-yellow px-3 py-1 text-xs font-black mb-3 inline-block">${guide.badge || 'Rescue Standard'}</span>
              ${guide.content || ''}
            </div>
          `
        );
      }
    });
  });
}

function renderCoreGuidesView() {
  const badgeGels = ['gel-yellow', 'gel-green', 'gel-blue', 'gel-pink', 'gel-purple', 'gel-orange'];

  return `
    <div class="space-y-3.5">
      <!-- 2000s Web 2.0 Glossy Welcome Hero Card -->
      <div class="web2-card overflow-hidden border-sky-300">
        <div class="web2-header-bar px-4 py-2 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-400 border border-rose-600 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600 inline-block"></span>
            <span class="text-[11px] font-black text-sky-950 uppercase tracking-wide ml-1 font-heading">Welcome to For the Hams! v2.0 ✨</span>
          </div>
          <span class="gel-badge gel-green text-[9px]">UK Welfare Hub</span>
        </div>
        <div class="p-4 bg-gradient-to-br from-sky-50 via-white to-amber-50/50">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-2xl gel-yellow flex items-center justify-center text-2xl shrink-0 shadow-sm">
              🏆
            </div>
            <div>
              <h2 class="font-black text-base sm:text-lg text-slate-900 font-heading leading-snug">
                The UK's Ethical Hamster Care & Rescue Bible
              </h2>
              <p class="text-xs font-medium text-slate-600 leading-relaxed mt-1">
                Built alongside <strong>India's Hamster Rescue (#1213919)</strong>, <strong>Bright Horizon</strong>, and <strong>Fable's Product Library</strong>. 100x50cm unbroken cages, 20cm+ hay-free burrowing bedding, and zero pet shop myths!
              </p>
            </div>
          </div>

          <!-- Quick Action Candy Buttons -->
          <div class="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-sky-200/70">
            <button data-quick-jump="shop" data-quick-sub="enclosures" class="gel-btn gel-blue px-3 py-1 text-[11px] font-black">
              🏠 100x50cm Cages
            </button>
            <button data-quick-jump="food" data-quick-sub="fresh" class="gel-btn gel-green px-3 py-1 text-[11px] font-black">
              🥗 Safe / Toxic Food Lookup
            </button>
            <button data-quick-jump="checklist" class="gel-btn gel-pink px-3 py-1 text-[11px] font-black">
              ✅ Adoption Readiness Quiz
            </button>
            <button data-quick-jump="rescues" class="gel-btn gel-purple px-3 py-1 text-[11px] font-black">
              💖 16+ UK Rescues
            </button>
          </div>
        </div>
      </div>

      <!-- Guides List Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        ${careGuides.map((guide, idx) => {
          const badgeClass = badgeGels[idx % badgeGels.length];
          const emoji = guideEmojis[guide.id] || '🐹';
          return `
            <div data-open-guide="${guide.id}" class="web2-card hover:shadow-lg active:scale-[0.99] cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="web2-header-bar px-3.5 py-2 flex items-center justify-between">
                  <span class="gel-badge ${badgeClass}">${guide.badge || 'Essential'}</span>
                  <div class="w-6 h-6 rounded-full gel-btn gel-silver flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                  </div>
                </div>
                <div class="p-4 pb-3">
                  <div class="flex items-start gap-2.5 mb-1.5">
                    <span class="text-2xl leading-none select-none">${emoji}</span>
                    <h3 class="font-black text-base text-slate-900 font-heading leading-snug group-hover:text-sky-800 transition-colors">${guide.title}</h3>
                  </div>
                  <p class="text-xs font-medium text-slate-600 leading-relaxed">${guide.summary || ''}</p>
                </div>
              </div>
              <div class="px-4 py-2.5 bg-sky-50/50 border-t border-sky-100 flex items-center justify-between text-[11px] font-black text-amber-700">
                <span>Tap to open full guide</span>
                <span class="group-hover:translate-x-1 transition-transform">Read Now ➔</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderUnsafeView() {
  return `
    <div class="space-y-3.5">
      <div class="web2-card overflow-hidden border-rose-300">
        <div class="px-4 py-2 bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 text-white flex items-center justify-between">
          <span class="text-xs font-black uppercase tracking-wider font-heading flex items-center gap-1.5">
            <span>🚨</span>
            <span>Rescue Blacklist • Do Not Buy</span>
          </span>
          <span class="gel-badge gel-yellow text-[9px]">Veterinary Alert</span>
        </div>
        <div class="p-4 bg-rose-50/70 text-xs">
          <h3 class="font-black text-base text-rose-950 font-heading mb-1">
            Unsafe Pet Shop Items Hall of Shame!
          </h3>
          <p class="text-xs text-slate-700 font-medium leading-relaxed">
            These items are still legally sold in major UK pet shops despite causing fatal bowel obstructions, limb amputations, corneal eye punctures, and severe spinal warping.
          </p>
        </div>
      </div>

      <div class="space-y-3.5">
        ${unsafeItems.map(item => {
          const examples = Array.isArray(item.examples) ? item.examples : [];
          return `
            <div class="web2-card border-rose-200 overflow-hidden">
              <div class="web2-header-bar px-4 py-2 flex items-center justify-between bg-rose-50">
                <span class="gel-badge gel-red text-[10px] font-black">${item.badge || 'Severe Hazard'}</span>
                <span class="text-[10px] font-black text-rose-800 bg-rose-100 border border-rose-300 px-2.5 py-0.5 rounded-full">🚫 Banned by UK Rescues</span>
              </div>
              <div class="p-4">
                <h4 class="font-black text-slate-900 text-base font-heading mb-1">${item.name || ''}</h4>
                <p class="text-xs font-bold text-rose-900 leading-relaxed mb-2.5">${item.danger || ''}</p>
                <div class="bg-rose-50/90 border border-rose-200 rounded-xl p-3 text-xs text-slate-800 font-medium mb-3 leading-relaxed">
                  <strong class="font-black text-rose-950 block mb-0.5">🔬 Veterinary Pathology & Risk:</strong>
                  ${item.vetExplanation || ''}
                </div>
                ${examples.length > 0 ? `
                  <div>
                    <div class="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Common Offending Products to Avoid:</div>
                    <div class="flex flex-wrap gap-1.5">
                      ${examples.map(ex => `
                        <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-900">
                          ❌ ${ex}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderInspirationView() {
  const photos = [
    {
      title: "Natural Syrian Enclosure (120x60cm)",
      subtitle: "Bucatstate 3.0 / Bandaby / DIY Setup",
      image: "assets/images/enclosures/setup_inspiration_1.jpg",
      details: "30cm compacted paper bedding, 32cm upright wheel on heavy stilts, deep A4 sand bath, multi-chamber hide, and rich flax spray clutter."
    },
    {
      title: "Roborovski Sand-Rich Habitat",
      subtitle: "Desert Welfare Standard",
      image: "assets/images/enclosures/setup_inspiration_2.jpg",
      details: "Over 1/3 of floor space dedicated to deep natural desert sand, 26cm running wheel, coco coir dig box, and dried millet sprays."
    },
    {
      title: "Russian Dwarf Naturalistic Setup",
      subtitle: "Multi-Texture Steppe Environment",
      image: "assets/images/enclosures/setup_inspiration_3.jpg",
      details: "Beech chip dig zone, cork granules, 20cm paper/aspen burrowing layers, and bottomless 3-room wooden hide."
    },
    {
      title: "IKEA DIY Platsa Conversion",
      subtitle: "Affordable 120cm Foster Enclosure",
      image: "assets/images/enclosures/setup_inspiration_4.jpg",
      details: "Constructed using IKEA Platsa frame with acrylic front panel. Massive unbroken burrowing depth and top mesh airflow."
    },
    {
      title: "Natural Foraging & Clutter Layout",
      subtitle: "Prey-Animal Comfort Design",
      image: "assets/images/enclosures/setup_inspiration_5.jpg",
      details: "Dense coverage using sorghum, flax bouquets, hollow cork logs, and ceramic hideaway cooling zones."
    },
    {
      title: "Multi-Substrate Digging Haven",
      subtitle: "Full Tactile Enrichment",
      image: "assets/images/enclosures/setup_inspiration_6.jpg",
      details: "Features coco coir, terrarium moss, beech chips, and kiln-dried aspen shaving layers holding stable tunnels."
    }
  ];

  return `
    <div class="space-y-4">
      <div class="web2-card p-4 bg-gradient-to-r from-sky-50 via-white to-amber-50 border-sky-300 text-xs">
        <h3 class="font-black text-slate-900 text-base font-heading">Real UK Foster Setups 📸</h3>
        <p class="text-xs font-medium text-slate-600 mt-0.5">Real enclosure setups from India's Hamster Rescue fosterers showcasing deep hay-free burrowing, stilts, and enrichment!</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${photos.map(p => `
          <div class="web2-card overflow-hidden">
            <div class="web2-header-bar px-3.5 py-2 flex items-center justify-between">
              <span class="font-black text-xs text-slate-900 font-heading truncate">${p.title}</span>
              <span class="gel-badge gel-blue text-[9px]">Verified Setup</span>
            </div>
            <div class="relative h-52 bg-slate-100 overflow-hidden border-b border-sky-100">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy">
            </div>
            <div class="p-3.5">
              <div class="text-[11px] font-black text-amber-700 mb-1">${p.subtitle}</div>
              <p class="text-xs font-medium text-slate-600 leading-relaxed">${p.details}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// 2. FOOD HUB (2000s Web 2.0 Style)
// ==========================================
function renderFoodHub() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div>
      <!-- Food Hub Switcher -->
      <div class="flex items-center gap-2 mb-4 max-w-md mx-auto justify-center flex-wrap">
        <button type="button" data-food-sub="mixes" class="gel-btn ${
          state.foodSubTab === 'mixes' ? 'gel-yellow' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          🥣 Approved Seed Mixes
        </button>
        <button type="button" data-food-sub="fresh" class="gel-btn ${
          state.foodSubTab === 'fresh' ? 'gel-green' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          🥗 Safe Fresh Foods
        </button>
        <button type="button" data-food-sub="toxic" class="gel-btn ${
          state.foodSubTab === 'toxic' ? 'gel-red' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          🛑 Toxic Forbidden List
        </button>
      </div>

      <!-- Render Selected Food Sub-View -->
      ${state.foodSubTab === 'mixes' ? renderCommercialMixesView() : ''}
      ${state.foodSubTab === 'fresh' ? renderFreshFoodsView() : ''}
      ${state.foodSubTab === 'toxic' ? renderToxicFoodsView() : ''}
    </div>
  `;

  document.querySelectorAll('[data-food-sub]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.foodSubTab = btn.getAttribute('data-food-sub');
      renderFoodHub();
    });
  });

  document.getElementById('reset-food-species')?.addEventListener('click', () => {
    state.currentSpecies = 'all';
    renderSpeciesBar();
    renderCurrentTab();
  });

  updateIcons();
}

function renderCommercialMixesView() {
  const mixes = products.filter(p => {
    if (p.category !== 'food_mixes') return false;
    if (state.currentSpecies !== 'all' && !(p.species || []).includes(state.currentSpecies)) return false;
    return true;
  });

  const activeSpecObj = speciesList.find(s => s.id === state.currentSpecies);

  return `
    <div class="space-y-4">
      ${activeSpecObj ? `
        <div class="web2-card p-3.5 bg-gradient-to-r from-amber-50 via-yellow-50 to-sky-50 border-amber-300 flex items-center justify-between gap-2 flex-wrap">
          <div class="text-xs font-bold text-slate-800">
            <span class="font-black text-amber-950">🐹 Filtered for ${activeSpecObj.name}:</span>
            Showing <strong>${mixes.length}</strong> species-appropriate seed mixes (${activeSpecObj.dietSpecial})
          </div>
          <button type="button" id="reset-food-species" class="gel-btn gel-silver px-3 py-1 text-[11px] font-black">Show All Species</button>
        </div>
      ` : ''}

      <!-- 48-Hour Freezer Protocol Card -->
      <div class="web2-card p-4 border-sky-300 bg-gradient-to-br from-sky-50 via-white to-sky-100/50">
        <div class="flex items-start gap-3">
          <span class="text-3xl animate-bounce">❄️</span>
          <div>
            <h3 class="font-black text-base text-slate-900 font-heading">The 48-Hour Freezer Protocol!</h3>
            <p class="text-xs font-medium text-slate-700 leading-relaxed mt-0.5">
              High-welfare seed mixes and sprays are 100% pesticide-free, meaning harmless grain mite eggs can hatch in warm rooms. <strong>Always freeze new food bags for 48 hours</strong> upon delivery to safely neutralise any eggs. Thaw to room temperature before feeding!
            </p>
          </div>
        </div>
      </div>

      <!-- Pellet-Free Warning Panel -->
      <div class="web2-card p-4">
        <div class="font-black text-sm text-slate-900 font-heading mb-1 flex items-center gap-1.5">
          <span>🌾</span>
          <span>Why Pellet-Free Mueslis are Best</span>
        </div>
        <p class="text-xs font-medium text-slate-600 leading-relaxed">
          Standard pet shop mueslis (like Harry Hamster) contain dyed sugary biscuits and hard pellets that hamsters hate. Rescue-approved seed diets provide 25+ whole seeds, grains, and mealworms with <strong>15–18% protein</strong> and <strong>zero fruit/sugars for dwarfs</strong>.
        </p>
      </div>

      <!-- Mix Cards List -->
      <div class="space-y-3">
        ${mixes.map(p => `
          <div class="web2-card overflow-hidden flex flex-col justify-between">
            <div class="web2-header-bar px-4 py-2 flex flex-wrap items-center justify-between gap-1">
              <span class="text-[10px] font-black text-sky-900 uppercase tracking-wider">${p.brand || ''} • ${p.retailer || ''}</span>
              <div class="flex flex-wrap gap-1">
                ${(p.badges || []).map(b => `
                  <span class="gel-badge ${
                    b.includes('Favourite') || b.includes('Hope')
                      ? 'gel-yellow'
                      : 'gel-green'
                  }">${b}</span>
                `).join('')}
              </div>
            </div>
            <div class="p-4">
              <h4 class="font-black text-base text-slate-900 font-heading mb-1 leading-snug">${p.name || ''}</h4>
              <p class="text-xs font-medium text-slate-600 leading-relaxed mb-3">${p.summary || ''}</p>

              <div class="flex flex-wrap items-center gap-1.5 mb-3">
                <span class="text-[10px] font-black text-slate-500 uppercase mr-1">Suitable For:</span>
                ${(p.species || []).map(sp => {
                  const isSelected = state.currentSpecies === sp;
                  return `
                    <span class="text-[10px] px-2.5 py-0.5 rounded-full border ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-300'
                        : 'border-sky-200 bg-sky-50 text-sky-900 font-bold'
                    } capitalize">
                      ${isSelected ? '✓ ' : '🐹 '}${sp.replace('_', ' ')}
                    </span>
                  `;
                }).join('')}
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div class="text-[9px] font-black text-slate-400 uppercase">Price Guide</div>
                  <div class="text-base font-black text-slate-900 font-heading">${p.priceGuide || ''}</div>
                </div>

                <a 
                  href="${p.url || '#'}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="gel-btn gel-orange px-4 py-1.5 text-xs font-black shadow-md flex items-center gap-1">
                  <span>Where to Buy ↗</span>
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Scatter Feed Pill -->
      <div class="web2-card p-3.5 bg-amber-50/70 border-amber-300 text-xs text-slate-700 font-medium">
        <strong class="font-black text-slate-900">💡 Scatter Feed Tip:</strong> Ditch the food bowl! Scatter 1–2 tablespoons of seeds across deep bedding every 1–2 days. It burns energy, eliminates boredom, and lets hamsters pouch like they do in the wild.
      </div>
    </div>
  `;
}

function renderFreshFoodsView() {
  const isDwarfSelected = ['winter_white', 'campbells', 'chinese', 'roborovski'].includes(state.currentSpecies);
  const activeSpecObj = speciesList.find(s => s.id === state.currentSpecies);

  const safeFoods = foodDatabase.filter(f => {
    if (f.status !== 'SAFE' && f.status !== 'CAUTION_DIABETES') return false;
    // If a diabetes-prone dwarf species is selected, hide sugary Syrian-only fruits (or filter to safe items)
    if (isDwarfSelected && f.status === 'CAUTION_DIABETES' && (f.speciesNotes || '').toLowerCase().includes('syrian')) {
      return false;
    }
    return true;
  });

  const filtered = safeFoods.filter(food => {
    if (state.foodSearch.trim()) {
      const q = state.foodSearch.toLowerCase();
      return (food.name || '').toLowerCase().includes(q) || 
             (food.details || '').toLowerCase().includes(q) ||
             (food.speciesNotes || '').toLowerCase().includes(q);
    }
    return true;
  });

  return `
    <div class="space-y-3">
      ${activeSpecObj ? `
        <div class="web2-card p-3.5 bg-gradient-to-r from-emerald-50 via-white to-amber-50 border-emerald-300 flex items-center justify-between gap-2 flex-wrap">
          <div class="text-xs font-bold text-slate-800">
            <span class="font-black text-emerald-950">🥗 Filtered for ${activeSpecObj.name}:</span>
            ${isDwarfSelected 
              ? 'Sugary fruits (Apples, Bananas, Carrots/Corn) have been automatically hidden to protect against Dwarf Diabetes!' 
              : 'Showing all safe vegetables, proteins, and occasional Syrian fruit treats.'}
          </div>
          <button type="button" id="reset-food-species" class="gel-btn gel-silver px-3 py-1 text-[11px] font-black">Show All Species</button>
        </div>
      ` : ''}

      <!-- Search Bar -->
      <div class="relative">
        <i data-lucide="search" class="w-4 h-4 text-sky-600 absolute left-3.5 top-3"></i>
        <input 
          type="text" 
          id="food-search-input" 
          value="${state.foodSearch}"
          placeholder="Search broccoli, apple, egg, mealworms, cucumber..."
          class="w-full bg-white border-2 border-sky-300 rounded-2xl pl-10 pr-8 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm">
        ${state.foodSearch ? `
          <button id="clear-food-search" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900 font-black text-xs">✕</button>
        ` : ''}
      </div>

      <div class="space-y-3">
        ${filtered.map(food => {
          const isSafe = food.status === 'SAFE';
          const speciesInfo = food.speciesNotes || food.portionGuide || 'All Species';
          const prepInfo = food.prep || food.prepInstructions || 'Wash thoroughly and serve a pea-sized portion.';

          return `
            <div class="web2-card overflow-hidden">
              <div class="web2-header-bar px-4 py-2 flex items-center justify-between">
                <h4 class="font-black text-sm sm:text-base text-slate-900 font-heading">${food.name || ''}</h4>
                <span class="gel-badge ${isSafe ? 'gel-green' : 'gel-yellow'}">
                  ${isSafe ? '🟢 Safe Staple' : '🟡 Diabetes Caution'}
                </span>
              </div>
              <div class="p-4">
                <p class="text-xs font-medium text-slate-700 leading-relaxed mb-3">${food.details || ''}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2.5 border-t border-sky-100">
                  <div class="p-2 rounded-xl bg-sky-50/70 border border-sky-200 text-slate-800">
                    <span class="font-black text-sky-900 block text-[10px] uppercase">🐾 Species Suitability</span>
                    <span class="font-bold">${speciesInfo}</span>
                  </div>
                  <div class="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-slate-800">
                    <span class="font-black text-emerald-900 block text-[10px] uppercase">🍽️ Portion & Prep Guide</span>
                    <span class="font-bold">${prepInfo}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderToxicFoodsView() {
  const toxicFoods = foodDatabase.filter(f => f.status === 'TOXIC');

  const filtered = toxicFoods.filter(food => {
    if (state.foodSearch.trim()) {
      const q = state.foodSearch.toLowerCase();
      return (food.name || '').toLowerCase().includes(q) || (food.details || '').toLowerCase().includes(q);
    }
    return true;
  });

  return `
    <div class="space-y-3">
      <!-- Search Bar -->
      <div class="relative">
        <i data-lucide="search" class="w-4 h-4 text-rose-600 absolute left-3.5 top-3"></i>
        <input 
          type="text" 
          id="food-search-input" 
          value="${state.foodSearch}"
          placeholder="Search toxic foods (onion, garlic, citrus, chocolate, potato)..."
          class="w-full bg-white border-2 border-rose-300 rounded-2xl pl-10 pr-8 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm">
        ${state.foodSearch ? `
          <button id="clear-food-search" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900 font-black text-xs">✕</button>
        ` : ''}
      </div>

      <div class="web2-card p-4 border-rose-300 bg-rose-50/70 text-xs">
        <h3 class="font-black text-base text-rose-950 font-heading mb-1">⚠️ Strictly Forbidden Toxic Foods!</h3>
        <p class="text-xs text-slate-700 font-medium leading-relaxed">
          These items contain toxic compounds (cyanide, allium disulfides, solanine, oxalic acid, theobromine) or pose fatal gastrointestinal blockages. Never feed these!
        </p>
      </div>

      <div class="space-y-3">
        ${filtered.map(food => {
          const speciesInfo = food.speciesNotes || 'All Hamster Species';
          const ruleInfo = food.prep || food.prepInstructions || 'Strictly forbidden.';

          return `
            <div class="web2-card border-rose-200 overflow-hidden">
              <div class="web2-header-bar px-4 py-2 flex items-center justify-between bg-rose-50">
                <h4 class="font-black text-sm sm:text-base text-slate-900 font-heading">${food.name || ''}</h4>
                <span class="gel-badge gel-red">
                  🔴 Toxic / Lethal
                </span>
              </div>
              <div class="p-4">
                <p class="text-xs font-medium text-rose-950 leading-relaxed mb-2.5">${food.details || ''}</p>
                <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-2 border-t border-rose-100 font-bold text-rose-900">
                  <span>🚫 Applies To: ${speciesInfo}</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-950">⚠️ Action: ${ruleInfo}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Food input event delegator
document.addEventListener('input', (e) => {
  if (e.target.id === 'food-search-input') {
    state.foodSearch = e.target.value;
    renderFoodHub();
    const input = document.getElementById('food-search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }
});
document.addEventListener('click', (e) => {
  if (e.target.id === 'clear-food-search') {
    state.foodSearch = '';
    renderFoodHub();
  }
});

// Species-specific guidance per category so filtering any category by species gives immediate tailored advice
function getCategorySpeciesGuidance(category, speciesId) {
  const spec = speciesList.find(s => s.id === speciesId);
  if (!spec) return '';
  switch (category) {
    case 'bedding':
      return `<strong>${spec.name} Bedding Rule:</strong> Provide at least <strong>${spec.beddingDepth}</strong> of tightly compacted paper or kiln-dried aspen bedding (strictly no hay or fluffy cotton wool).`;
    case 'enclosures':
      return `<strong>${spec.name} Enclosure Rule:</strong> Minimum <strong>${spec.minCageSize}</strong>. ${spec.cageNote}`;
    case 'wheels':
      return `<strong>${spec.name} Wheel Rule:</strong> Requires an upright solid wheel of <strong>${spec.minWheelSize}</strong>. ${spec.wheelNote}`;
    case 'sand':
      return `<strong>${spec.name} Sand Bath Rule:</strong> ${spec.sandBathSize}. ${spec.sandNote}`;
    case 'hides':
      return `<strong>${spec.name} Multi-Chamber Rule:</strong> Entrance holes must be at least <strong>${spec.entranceHoleMin}</strong> wide so stuffed cheek pouches never get scraped or trapped.`;
    case 'food_mixes':
      return `<strong>${spec.name} Diet Rule:</strong> ${spec.dietSpecial}`;
    default:
      return `<strong>${spec.name} Welfare Standard:</strong> All ${filteredCountText(speciesId)} items below are verified safe for ${spec.name}s (${spec.entranceHoleMin} entrances, ${spec.minWheelSize} wheel, ${spec.beddingDepth} bedding).`;
  }
}

function filteredCountText(speciesId) {
  const s = speciesList.find(x => x.id === speciesId);
  return s ? s.name : 'all';
}

// ==========================================
// 3. SAFE PICKS — RESCUE-APPROVED PRODUCT DIRECTORY
// ==========================================
function renderShop() {
  const main = document.getElementById('main-tab-content');

  const categories = [
    { id: 'all', label: '🌟 All Safe Picks' },
    { id: 'enclosures', label: '🏠 Enclosures & Cages' },
    { id: 'wheels', label: '🎡 Upright Wheels' },
    { id: 'bedding', label: '🛏️ Safe Bedding' },
    { id: 'food_mixes', label: '🥣 Seed Mixes' },
    { id: 'substrates', label: '🪵 Dig Substrates' },
    { id: 'sand', label: '🏖️ Sand & Baths' },
    { id: 'hides', label: '🏡 Multi-Chamber Hides' },
    { id: 'forage', label: '🌾 Sprays & Forage' }
  ];

  const filtered = products.filter(p => {
    if (state.currentSpecies !== 'all' && !(p.species || []).includes(state.currentSpecies)) return false;
    if (state.shopCategory !== 'all' && p.category !== state.shopCategory) return false;
    if (state.shopRetailer !== 'all' && !(p.retailer || '').toLowerCase().includes(state.shopRetailer.toLowerCase())) return false;
    if (state.shopSearch.trim()) {
      const q = state.shopSearch.toLowerCase();
      return (p.name || '').toLowerCase().includes(q) || 
             (p.summary || '').toLowerCase().includes(q) || 
             (p.brand || '').toLowerCase().includes(q) ||
             (p.retailer || '').toLowerCase().includes(q);
    }
    return true;
  });

  // Sort species-specific items (fewer total species = more specifically tailored to the selected hamster) first when a species is chosen
  if (state.currentSpecies !== 'all') {
    filtered.sort((a, b) => (a.species?.length || 5) - (b.species?.length || 5));
  }

  const activeCategoryObj = categories.find(c => c.id === state.shopCategory) || categories[0];
  const activeSpecObj = speciesList.find(s => s.id === state.currentSpecies);
  const speciesGuidance = activeSpecObj ? getCategorySpeciesGuidance(state.shopCategory, state.currentSpecies) : '';

  main.innerHTML = `
    <div class="space-y-3.5">
      <!-- Directory Header Card (Clarifies this is a Vetted Reference Library, NOT a Store) -->
      <div class="web2-card p-3.5 bg-gradient-to-r from-sky-50 via-white to-amber-50/60 border-sky-300">
        <div class="flex items-center justify-between gap-2 mb-1">
          <div class="flex items-center gap-2">
            <span class="text-xl">🏆</span>
            <h3 class="font-black text-sm sm:text-base text-slate-900 font-heading">Rescue-Approved Safe Picks Directory</h3>
          </div>
          <span class="gel-badge gel-blue text-[9px]">Independent Guide</span>
        </div>
        <p class="text-xs font-medium text-slate-600 leading-relaxed">
          We don't run a shop! This is a curated directory of ethical cages, wheels, beddings, and mixes vetted by UK rescues, with direct links to where you can find them or build them yourself.
        </p>
      </div>

      <!-- Search Input -->
      <div class="relative">
        <i data-lucide="search" class="w-4 h-4 text-sky-600 absolute left-3.5 top-3"></i>
        <input 
          type="text" 
          id="shop-search-input" 
          value="${state.shopSearch}"
          placeholder="Search Bandaby, Bucatstate, Fitch, IKEA DIY, Hope's..."
          class="w-full bg-white border-2 border-sky-300 rounded-2xl pl-10 pr-8 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm">
        ${state.shopSearch ? `
          <button type="button" id="clear-shop-search" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900 font-black text-xs">✕</button>
        ` : ''}
      </div>

      <!-- Full-Visibility Wrap Category Picker (All Full Names Always Visible!) -->
      <div class="web2-card p-3 bg-white/90 border-sky-200">
        <div class="text-[10px] font-black text-sky-900 uppercase tracking-wider mb-2 px-0.5 flex items-center justify-between">
          <span>📂 Choose Category:</span>
          <span class="text-slate-500 font-bold">${filtered.length} Safe Picks Shown</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          ${categories.map(c => `
            <button 
              type="button"
              data-cat-btn="${c.id}"
              class="gel-btn ${
                state.shopCategory === c.id ? 'gel-orange' : 'gel-silver'
              } px-3.5 py-1.5 text-xs font-black">
              ${c.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Active Filter & Species-Specific Category Rule Banner -->
      ${activeSpecObj ? `
        <div class="web2-card p-3.5 bg-gradient-to-r from-emerald-50 via-amber-50/60 to-sky-50 border-emerald-300 shadow-xs">
          <div class="flex items-center justify-between gap-2 flex-wrap mb-1">
            <div class="flex items-center gap-1.5">
              <span class="gel-badge gel-green">✓ Species Filter Active</span>
              <span class="text-xs font-black text-slate-900 font-heading">
                ${activeCategoryObj.label} for ${activeSpecObj.name} (${filtered.length} Items)
              </span>
            </div>
            <button type="button" id="clear-species-in-shop" class="gel-btn gel-silver px-2.5 py-0.5 text-[10px] font-black">
              Show All Species ✕
            </button>
          </div>
          <p class="text-xs font-medium text-slate-700 leading-relaxed">
            ${speciesGuidance}
          </p>
        </div>
      ` : ''}

      <!-- Products Grid -->
      ${filtered.length === 0 ? `
        <div class="web2-card p-8 text-center my-6">
          <p class="text-xs font-bold text-slate-600">No matching items found. Try clearing your search or category filter!</p>
          <button type="button" id="reset-shop-filters" class="mt-3 gel-btn gel-yellow px-4 py-1.5 text-xs font-black">Reset All Filters ✨</button>
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          ${filtered.map(p => {
            const isVideo = (p.url || '').includes('youtube.com') || (p.url || '').includes('youtu.be');
            const ctaLabel = isVideo ? '🎬 Watch DIY Video ↗' : 'Where to Buy ↗';
            const ctaGel = isVideo ? 'gel-purple' : 'gel-orange';
            const priceLabel = isVideo ? 'Est. DIY Cost' : 'Price Guide';

            return `
              <div class="web2-card flex flex-col justify-between overflow-hidden">
                <div>
                  <div class="web2-header-bar px-3.5 py-2 flex flex-wrap gap-1 items-center justify-between">
                    <span class="text-[10px] font-black text-sky-950 uppercase tracking-wider">${p.brand || ''}</span>
                    <div class="flex flex-wrap gap-1">
                      ${(p.badges || []).slice(0, 2).map(b => `
                        <span class="gel-badge ${
                          b.includes('India') || b.includes('Profits')
                            ? 'gel-pink'
                            : b.includes('Hope')
                            ? 'gel-green'
                            : b.includes('Video')
                            ? 'gel-purple'
                            : b.includes('Favourite')
                            ? 'gel-yellow'
                            : 'gel-blue'
                        }">${b}</span>
                      `).join('')}
                    </div>
                  </div>

                  <div class="p-4 pb-3">
                    <div class="text-[10px] font-bold text-slate-500 mb-0.5">📍 ${p.retailer || 'UK Stockist'}</div>
                    <h4 class="font-black text-base text-slate-900 font-heading mb-1.5 leading-snug">${p.name || ''}</h4>
                    <p class="text-xs font-medium text-slate-600 leading-relaxed mb-3">${p.summary || ''}</p>
                    
                    <div class="flex flex-wrap items-center gap-1">
                      <span class="text-[9px] font-black text-slate-400 uppercase mr-0.5">Fits:</span>
                      ${(p.species || []).map(sp => {
                        const isSelected = state.currentSpecies === sp;
                        return `
                          <span class="text-[10px] px-2 py-0.5 rounded-full border ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-300'
                              : 'border-sky-200 bg-sky-50 text-sky-900 font-bold'
                          } capitalize">
                            ${isSelected ? '✓ ' : ''}${sp.replace('_', ' ')}
                          </span>
                        `;
                      }).join('')}
                    </div>
                  </div>
                </div>

                <div class="px-4 py-3 bg-sky-50/40 border-t border-sky-100 flex items-center justify-between">
                  <div>
                    <div class="text-[9px] font-black text-slate-400 uppercase">${priceLabel}</div>
                    <div class="text-sm font-black text-slate-900 font-heading">${p.priceGuide || ''}</div>
                  </div>

                  <a 
                    href="${p.url || '#'}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="gel-btn ${ctaGel} px-3.5 py-1.5 text-xs font-black shadow-md flex items-center gap-1">
                    <span>${ctaLabel}</span>
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}

      <div class="text-center text-[10px] font-bold text-slate-500 pt-2">
        Independent UK Welfare Directory • Every item is vetted against 100x50cm & hay-free rescue criteria.
      </div>
    </div>
  `;

  document.querySelectorAll('[data-cat-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.shopCategory = btn.getAttribute('data-cat-btn');
      renderShop();
    });
  });

  document.getElementById('clear-species-in-shop')?.addEventListener('click', () => {
    state.currentSpecies = 'all';
    renderSpeciesBar();
    renderCurrentTab();
  });

  const shopSearchInput = document.getElementById('shop-search-input');
  if (shopSearchInput) {
    shopSearchInput.addEventListener('input', (e) => {
      state.shopSearch = e.target.value;
      renderShop();
      const input = document.getElementById('shop-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  document.getElementById('clear-shop-search')?.addEventListener('click', () => {
    state.shopSearch = '';
    renderShop();
  });

  document.getElementById('reset-shop-filters')?.addEventListener('click', () => {
    state.shopCategory = 'all';
    state.shopSearch = '';
    state.currentSpecies = 'all';
    renderSpeciesBar();
    renderShop();
  });

  updateIcons();
}

// ==========================================
// 4. ADOPTION READY CHECKLIST
// ==========================================
function renderChecklist() {
  const main = document.getElementById('main-tab-content');

  const total = adoptionChecklist.length;
  const checkedCount = Object.values(state.checkedItems).filter(Boolean).length;
  const percent = Math.round((checkedCount / total) * 100);

  main.innerHTML = `
    <div class="space-y-4">
      <!-- 2000s Progress Score Panel -->
      <div class="web2-card overflow-hidden border-pink-300">
        <div class="web2-header-bar px-4 py-2 flex items-center justify-between">
          <span class="text-xs font-black text-slate-900 font-heading">✨ Let's Get You Adoption Ready!</span>
          <span class="gel-badge gel-pink">${checkedCount}/${total} Complete</span>
        </div>
        <div class="p-4 bg-gradient-to-br from-pink-50 via-white to-sky-50">
          <div class="flex items-center justify-between mb-2">
            <div>
              <h3 class="font-black text-base text-slate-900 font-heading">UK Rescue Home-Check Score</h3>
              <p class="text-[11px] font-bold text-slate-600">Tick each requirement to verify your setup meets UK adoption criteria!</p>
            </div>
            <span class="text-2xl font-black text-pink-700 font-heading">${percent}%</span>
          </div>

          <!-- 2000s Glossy Progress Bar -->
          <div class="w-full bg-slate-100 border-2 border-slate-300 rounded-full h-4 p-0.5 overflow-hidden shadow-inner">
            <div class="h-full rounded-full transition-all duration-300 ${percent === 100 ? 'gel-green' : 'gel-orange'}" style="width: ${percent}%"></div>
          </div>

          <div class="text-[11px] font-bold text-slate-600 mt-2 flex items-center justify-between">
            <span>${checkedCount} of ${total} rescue requirements satisfied</span>
            ${percent === 100 ? '<span class="gel-badge gel-green">🎉 100% Rescue Ready!</span>' : ''}
          </div>
        </div>
      </div>

      <!-- Checklist Items -->
      <div class="space-y-3">
        ${adoptionChecklist.map(item => {
          const isChecked = !!state.checkedItems[item.id];
          const catBadge = item.category || item.badge || 'Standard';
          const badgeGel = checklistCategoryGels[catBadge] || 'gel-yellow';
          const stepNum = item.step ? `Step ${item.step}: ` : '';

          return `
            <label class="web2-card block cursor-pointer select-none transition-all overflow-hidden ${
              isChecked ? 'border-emerald-400 bg-emerald-50/20' : ''
            }">
              <div class="web2-header-bar px-4 py-2 flex items-center justify-between ${isChecked ? 'bg-emerald-50' : ''}">
                <div class="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    data-check-id="${item.id}"
                    ${isChecked ? 'checked' : ''}
                    class="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300 accent-emerald-600">
                  <h4 class="font-black text-xs sm:text-sm text-slate-900 font-heading ${isChecked ? 'line-through text-emerald-900' : ''}">
                    ${stepNum}${item.title || ''}
                  </h4>
                </div>
                <span class="gel-badge ${isChecked ? 'gel-green' : badgeGel}">
                  ${isChecked ? '✓ Verified' : catBadge}
                </span>
              </div>

              <div class="p-3.5 space-y-1.5">
                <p class="text-xs font-bold text-slate-800 leading-relaxed">
                  📌 ${item.requirement || item.description || ''}
                </p>
                ${item.whyImportant ? `
                  <p class="text-xs font-medium text-slate-600 leading-relaxed">
                    ${item.whyImportant}
                  </p>
                ` : ''}
                ${item.rescueTip ? `
                  <div class="mt-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] font-medium text-amber-950">
                    <strong class="font-black">💡 Rescue Tip:</strong> ${item.rescueTip}
                  </div>
                ` : ''}
              </div>
            </label>
          `;
        }).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-2 pt-2">
        <button id="copy-summary-btn" class="flex-1 py-2.5 gel-btn gel-orange text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5">
          <i data-lucide="copy" class="w-4 h-4"></i>
          <span>Copy Adoption Summary for Rescue Application</span>
        </button>
        <button id="reset-checklist-btn" class="py-2.5 px-5 gel-btn gel-silver text-slate-700 text-xs font-black">
          Reset
        </button>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-check-id]').forEach(input => {
    input.addEventListener('change', () => {
      const id = input.getAttribute('data-check-id');
      state.checkedItems[id] = input.checked;
      localStorage.setItem('fth_checklist', JSON.stringify(state.checkedItems));

      const newCheckedCount = Object.values(state.checkedItems).filter(Boolean).length;
      if (newCheckedCount === total && typeof confetti === 'function') {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
      }

      renderChecklist();
    });
  });

  document.getElementById('copy-summary-btn')?.addEventListener('click', () => {
    let summaryText = `🐹 For the Hams! Adoption Readiness Summary\n`;
    summaryText += `Score: ${checkedCount}/${total} Requirements Met (${percent}%)\n\n`;
    adoptionChecklist.forEach(item => {
      const status = state.checkedItems[item.id] ? '✅' : '❌';
      const cat = item.category || item.badge || 'Requirement';
      summaryText += `${status} ${item.title} [${cat}] — ${item.requirement || ''}\n`;
    });
    summaryText += `\nVerified against India's Hamster Rescue criteria via www.forthehams.co.uk`;

    navigator.clipboard.writeText(summaryText).then(() => {
      const btn = document.getElementById('copy-summary-btn');
      if (btn) btn.innerHTML = `<span>✓ Copied to Clipboard! ✨</span>`;
      setTimeout(() => renderChecklist(), 2000);
    });
  });

  document.getElementById('reset-checklist-btn')?.addEventListener('click', () => {
    state.checkedItems = {};
    localStorage.removeItem('fth_checklist');
    renderChecklist();
  });
}

// ==========================================
// 5. RESCUE DIRECTORY (2000s Web 2.0 Style)
// ==========================================
function renderRescues() {
  const main = document.getElementById('main-tab-content');

  const filtered = rescuesList.filter(r => {
    if (state.rescueRegion === 'all') return true;
    const reg = (r.region || '').toLowerCase();
    const loc = (r.locations || '').toLowerCase();
    if (state.rescueRegion === 'England') {
      return reg.includes('england') || reg.includes('london') || reg.includes('midlands') || 
             reg.includes('thames') || reg.includes('south') || reg.includes('north') || 
             loc.includes('london') || reg.includes('national');
    }
    if (state.rescueRegion === 'Wales') {
      return reg.includes('wales') || loc.includes('cardiff') || loc.includes('swansea') || reg.includes('national');
    }
    if (state.rescueRegion === 'Scotland') {
      return reg.includes('scotland') || loc.includes('glasgow') || loc.includes('edinburgh') || reg.includes('national');
    }
    return true;
  });

  const regions = [
    { id: 'all', label: `All Rescues (${rescuesList.length})` },
    { id: 'England', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
    { id: 'Wales', label: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales' },
    { id: 'Scotland', label: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland' }
  ];

  main.innerHTML = `
    <div class="space-y-3.5">
      <!-- Rescue Header Banner -->
      <div class="web2-card p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border-purple-300">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xl">🏡</span>
          <h3 class="font-black text-base text-purple-950 font-heading">Verified Ethical UK Rescue Network</h3>
        </div>
        <p class="text-xs font-medium text-slate-700 leading-relaxed">
          Adopt, don't shop! Every foster rescue and registered charity listed here upholds ethical 100x50cm habitats, veterinary care, and solitary welfare setups.
        </p>
      </div>

      <!-- Region Filter -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        ${regions.map(reg => `
          <button 
            data-region-btn="${reg.id}"
            class="gel-btn ${
              state.rescueRegion === reg.id ? 'gel-purple' : 'gel-silver'
            } px-3.5 py-1 text-xs font-black whitespace-nowrap">
            ${reg.label}
          </button>
        `).join('')}
      </div>

      <!-- Rescues Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        ${filtered.map(r => {
          const cNum = r.charityNumber || 'Community Rescue';
          const charityText = cNum.startsWith('1') || cNum.startsWith('2') || cNum.startsWith('SC') 
            ? `Registered Charity #${cNum}` 
            : cNum;
          const targetUrl = r.adoptUrl || r.website || r.url || '#';
          const donationUrl = r.donateUrl || r.website || '#';
          const details = r.speciality || r.summary || '';
          const locationText = r.locations || r.coverage || r.region || 'UK';
          const badges = Array.isArray(r.badges) ? r.badges : [];

          return `
            <div class="web2-card flex flex-col justify-between overflow-hidden">
              <div>
                <div class="web2-header-bar px-3.5 py-2 flex flex-wrap items-center justify-between gap-1">
                  <span class="text-[10px] font-black text-purple-900 uppercase tracking-wider">${charityText}</span>
                  <div class="flex flex-wrap gap-1">
                    ${badges.slice(0, 2).map(b => `
                      <span class="gel-badge ${
                        b.includes('Partner') || b.includes('1213919') 
                          ? 'gel-yellow' 
                          : b.includes('Charity') || b.includes('Standard')
                          ? 'gel-purple'
                          : 'gel-blue'
                      }">${b}</span>
                    `).join('')}
                  </div>
                </div>

                <div class="p-4 pb-3">
                  <h4 class="font-black text-base text-slate-900 font-heading mb-0.5">${r.name || ''}</h4>
                  <div class="text-[11px] font-bold text-purple-800 mb-1.5">${r.region || 'UK'}</div>

                  <div class="text-[11px] font-bold text-slate-600 mb-2.5 flex items-start gap-1 bg-sky-50/60 border border-sky-100 p-2 rounded-xl">
                    <span class="shrink-0">📍</span>
                    <span>${locationText}</span>
                  </div>

                  <p class="text-xs font-medium text-slate-600 leading-relaxed">${details}</p>
                </div>
              </div>

              <div class="px-4 py-3 bg-purple-50/30 border-t border-purple-100 flex items-center gap-2">
                <a 
                  href="${targetUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="flex-1 py-1.5 gel-btn gel-orange text-white text-xs font-black shadow-md text-center">
                  Apply to Adopt ✨
                </a>
                <a 
                  href="${donationUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-4 py-1.5 gel-btn gel-pink text-white text-xs font-black shadow-md">
                  Donate 💖
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('[data-region-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.rescueRegion = btn.getAttribute('data-region-btn');
      renderRescues();
    });
  });
}

// Icon helper
function updateIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}
