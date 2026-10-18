// For the Hams! — mobile web app
// www.forthehams.co.uk | UK hamster care, checked against India's Hamster Rescue standards
// Theme: "Zine × 2005" (see assets/css/style.css)

import { speciesList } from './data/species.js?v=3.0';
import { careGuides } from './data/guides.js?v=3.0';
import { unsafeItems } from './data/unsafe.js?v=3.0';
import { products } from './data/products.js?v=3.0';
import { foodDatabase } from './data/foods.js?v=3.0';
import { rescuesList } from './data/rescues.js?v=3.0';
import { adoptionChecklist } from './data/checklist.js?v=3.0';
import { icon, clean, cleanHtml } from './icons.js?v=3.0';

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

// Species colours (flat zine palette)
const speciesColour = {
  all: 'ink',
  syrian: 'mustard',
  roborovski: 'sky',
  winter_white: 'lilac',
  campbells: 'pink',
  chinese: 'mint'
};

const speciesOptions = [
  { id: 'all', name: 'All hamsters' },
  { id: 'syrian', name: 'Syrian' },
  { id: 'roborovski', name: 'Roborovski' },
  { id: 'winter_white', name: 'Winter White' },
  { id: 'campbells', name: "Campbell's" },
  { id: 'chinese', name: 'Chinese' }
];

// Doodle icon per guide
const guideIcons = {
  enclosures: 'cage',
  bedding: 'cloud',
  wheels: 'wheel',
  sand_baths: 'sand',
  multi_chamber: 'hide',
  substrates_textures: 'log',
  forage_sprays: 'sprout',
  food_mixes_nutrition: 'bowl',
  solitary_rule: 'solo'
};

const cardColours = ['mint', 'sky', 'pink', 'lilac', 'lime', 'mustard-soft', 'sky-soft', 'pink-soft'];

const checklistColours = {
  Habitat: 'sky',
  Exercise: 'mustard',
  Nesting: 'lilac',
  Hygiene: 'mustard',
  Enrichment: 'mint',
  Safety: 'pink',
  Welfare: 'tomato'
};

const speciesLabel = (id) => (speciesOptions.find(s => s.id === id)?.name) || String(id).replace('_', ' ');

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  injectStaticIcons();
  initRouting();
  setupBottomSheetListeners();
  renderSpeciesBar();
  renderCurrentTab();
  setupNavigationListeners();
});

function injectStaticIcons() {
  const logo = document.getElementById('logo-hamster');
  if (logo) logo.innerHTML = icon('hamster', 46);
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    const slot = btn.querySelector('.dock-icon');
    if (slot) slot.innerHTML = icon(btn.getAttribute('data-icon') || 'paw', 24);
  });
  const closeBtn = document.getElementById('bottom-sheet-close');
  if (closeBtn) closeBtn.innerHTML = icon('close', 18);
}

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

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (['guides', 'food', 'shop', 'checklist', 'rescues'].includes(hash) && hash !== state.activeTab) {
    state.activeTab = hash;
    updateNavState();
    renderCurrentTab();
  }
});

function updateNavState() {
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    const isActive = btn.getAttribute('data-nav-tab') === state.activeTab;
    btn.classList.toggle('is-active', isActive);
    if (isActive) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
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

  titleEl.textContent = clean(title) || 'Care guide';
  bodyEl.innerHTML = `
    ${htmlContent || ''}
    <div class="mt-6 pt-4" style="border-top: 2px dashed rgba(34,24,15,.3)">
      <button type="button" data-close-sheet-bottom class="btn btn-block">
        ${icon('close', 16)} <span>Close</span>
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

// ==========================================
// Species chips (wrap, always fully visible)
// ==========================================
function renderSpeciesBar() {
  const container = document.getElementById('species-filter-container');
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-3xl mx-auto flex flex-wrap items-center gap-1.5">
      <span class="hand text-lg leading-none mr-0.5">which ham?</span>
      ${speciesOptions.map(opt => {
        const isActive = state.currentSpecies === opt.id;
        const col = speciesColour[opt.id];
        return `
          <button type="button" data-species-btn="${opt.id}" class="chip ${isActive ? 'is-active' : ''}" aria-pressed="${isActive}">
            ${opt.id !== 'all' ? `<span class="swatch bg-${col}"></span>` : ''}
            <span>${opt.name}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('[data-species-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      state.currentSpecies = btn.getAttribute('data-species-btn') || 'all';
      renderSpeciesBar();
      renderCurrentTab();
    });
  });

  renderSpeciesDetailBanner();
}

// Species profile card
function renderSpeciesDetailBanner() {
  const banner = document.getElementById('species-banner-area');
  if (!banner) return;

  const spec = state.currentSpecies === 'all' ? null : speciesList.find(s => s.id === state.currentSpecies);
  if (!spec) {
    banner.innerHTML = '';
    return;
  }

  const col = speciesColour[spec.id] || 'mustard';
  // Keep compact by default when browsing Safe Picks or Food so filtered items stay in view
  const showFullByDefault = state.activeTab === 'guides';
  const isExpanded = state.speciesBannerExpanded !== undefined ? state.speciesBannerExpanded : showFullByDefault;

  const fact = (label, value, note = '', tone = 'white') => `
    <div class="rounded-lg p-2.5 bg-${tone}" style="border:1.5px solid var(--ink)">
      <div class="v2005 text-[10px] font-bold uppercase tracking-wide muted">${label}</div>
      <div class="font-display text-[17px] mt-0.5">${clean(value)}</div>
      ${note ? `<div class="text-[12.5px] leading-snug mt-0.5 muted">${clean(note)}</div>` : ''}
    </div>`;

  banner.innerHTML = `
    <div class="panel mt-3">
      <div class="panel-bar bg-${col}">
        <div class="flex items-center gap-2 min-w-0">
          ${icon('hamster', 22)}
          <span class="font-display text-[15px] normal-case tracking-normal truncate">${clean(spec.name)}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button type="button" id="toggle-species-details" class="btn btn-xs">${isExpanded ? 'Less' : 'More'}</button>
          <button type="button" id="close-species-banner" class="btn btn-xs" aria-label="Show all hamsters">${icon('close', 12)}</button>
        </div>
      </div>
      <div class="px-3 py-2.5 flex flex-wrap gap-1.5">
        <span class="tag">${icon('cage', 13)} 100 x 50cm+</span>
        <span class="tag">${icon('wheel', 13)} Wheel ${clean(spec.minWheelSize || '28cm+')}</span>
        <span class="tag">${icon('cloud', 13)} Bedding ${clean(spec.beddingDepth || '20cm+')}</span>
        <span class="tag tag-tomato">${icon('solo', 13)} ${clean(spec.solitaryStatus || 'Lives alone')}</span>
      </div>
      ${isExpanded ? `
        <div class="px-3 pb-3">
          ${spec.description ? `<p class="text-[14px] leading-relaxed mb-3">${clean(spec.description)}</p>` : ''}
          <div class="grid grid-cols-2 gap-2">
            ${fact('Wheel', spec.minWheelSize || '28cm+', spec.wheelNote)}
            ${fact('Enclosure', spec.minCageSize || '100 x 50 x 50 cm', spec.cageNote)}
            ${fact('Bedding depth', spec.beddingDepth || '20cm+', 'Packed paper or aspen. Never hay.')}
            ${fact('Sand bath', spec.sandBathSize || 'A4 size+', spec.sandNote)}
            ${fact('Living situation', spec.solitaryStatus || 'Alone', spec.solitaryNote, 'tomato-soft')}
            ${fact('Hide doorways', `${spec.entranceHoleMin || '5cm+'}`, `Lives ${spec.lifespan || '2-3 yrs'}${spec.avgSize ? ' · ' + spec.avgSize : ''}`)}
          </div>
          ${spec.dietSpecial ? `
            <div class="note mt-3">
              <div class="note-title">Food notes</div>
              ${clean(spec.dietSpecial)}
            </div>` : ''}
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
    case 'guides': renderCareGuides(); break;
    case 'food': renderFoodHub(); break;
    case 'shop': renderShop(); break;
    case 'checklist': renderChecklist(); break;
    case 'rescues': renderRescues(); break;
    default: renderCareGuides();
  }
}

// Shared bits
function folderTabs(items, active, attr) {
  return `
    <div class="folder-tabs" role="tablist">
      ${items.map(t => `
        <button type="button" role="tab" aria-selected="${active === t.id}" ${attr}="${t.id}" class="folder-tab ${active === t.id ? 'is-active' : ''}">${t.label}</button>
      `).join('')}
    </div>`;
}

function sectionTitle(title, aside = '') {
  return `
    <div class="flex items-end justify-between gap-2 mb-3 mt-1">
      <h2 class="text-[24px]">${title}</h2>
      ${aside ? `<span class="hand text-lg leading-none -rotate-2 inline-block" style="color:var(--tomato)">${aside}</span>` : ''}
    </div>`;
}

function speciesTags(list) {
  return (list || []).map(sp => {
    const on = state.currentSpecies === sp;
    return `<span class="tag ${on ? 'tag-ink' : ''}">${on ? icon('tick', 11) : ''}${speciesLabel(sp)}</span>`;
  }).join('');
}

function pickBadge(badges) {
  const list = (badges || []).map(clean).filter(Boolean);
  if (!list.length) return null;
  const charity = list.find(b => /India|Profits|Charity/i.test(b));
  if (charity) return { text: charity, tone: 'pink' };
  const fav = list.find(b => /Favourite/i.test(b));
  if (fav) return { text: fav, tone: 'mustard' };
  const video = list.find(b => /Video|DIY/i.test(b));
  if (video) return { text: video, tone: 'lilac' };
  return { text: list[0], tone: 'mint' };
}

function productCard(p, idx = 0) {
  const isVideo = /youtube\.com|youtu\.be/.test(p.url || '');
  const badge = pickBadge(p.badges);
  return `
    <article class="panel flex flex-col ${idx % 3 === 1 ? 'tilt-r' : ''}">
      <div class="panel-body flex-grow">
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="v2005 text-[11px] muted flex items-center gap-1 min-w-0">${icon('pin', 13)}<span class="truncate">${clean(p.retailer || 'UK stockists')}</span></span>
          ${badge ? `<span class="tag tag-${badge.tone} shrink-0">${badge.text}</span>` : ''}
        </div>
        <h3 class="text-[18px] mb-1.5">${clean(p.name)}</h3>
        <p class="text-[14px] leading-relaxed mb-3">${clean(p.summary)}</p>
        <div class="flex flex-wrap items-center gap-1">
          <span class="v2005 text-[10px] font-bold uppercase muted mr-0.5">Good for</span>
          ${speciesTags(p.species)}
        </div>
      </div>
      <div class="panel-foot">
        <div>
          <div class="v2005 text-[10px] uppercase font-bold muted">${isVideo ? 'DIY cost' : 'Around'}</div>
          <div class="font-display text-[17px]">${clean(p.priceGuide)}</div>
        </div>
        <a href="${p.url || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-sm ${isVideo ? 'btn-lilac' : 'btn-tomato'}">
          ${isVideo ? `${icon('play', 16)} Watch how` : `Where to buy ${icon('ext', 14)}`}
        </a>
      </div>
    </article>`;
}

function searchField(id, value, placeholder, clearId) {
  return `
    <div class="field">
      <span class="field-icon">${icon('search', 18)}</span>
      <input type="text" id="${id}" value="${value.replace(/"/g, '&quot;')}" placeholder="${placeholder}" autocomplete="off">
      ${value ? `<button type="button" id="${clearId}" class="field-clear" aria-label="Clear search">${icon('close', 16)}</button>` : ''}
    </div>`;
}

// ==========================================
// 1. CARE GUIDES
// ==========================================
function renderCareGuides() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    ${folderTabs([
      { id: 'core', label: 'Care guides' },
      { id: 'unsafe', label: 'Things to avoid' },
      { id: 'inspiration', label: 'Real setups' }
    ], state.guidesSubTab, 'data-guide-sub')}
    <div class="folder-body">
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
      switchTab(btn.getAttribute('data-quick-jump'), btn.getAttribute('data-quick-sub') || null);
    });
  });

  document.querySelectorAll('[data-open-guide]').forEach(card => {
    const open = () => {
      const guide = careGuides.find(g => g.id === card.getAttribute('data-open-guide'));
      if (!guide) return;
      openBottomSheet(
        guide.title,
        `<div class="guide-content">
           <span class="tag tag-mustard mb-2">${clean(guide.badge || 'Rescue standard')}</span>
           ${cleanHtml(guide.content || '')}
         </div>`
      );
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

function renderCoreGuidesView() {
  const rest = careGuides.filter(g => g.id !== 'enclosures');

  return `
    <section class="mb-5 pt-1">
      <p class="hand text-[22px] leading-none -rotate-2 inline-block" style="color:var(--tomato)">psst, hamster people...</p>
      <h1 class="text-[32px] sm:text-[40px] mt-1.5">Hamsters need <span class="scribble">way more space</span> than you think.</h1>
      <p class="mt-3 text-[15px] leading-relaxed">Plain-English care guides, checked against India's Hamster Rescue standards. No pet shop myths, no hay, no tiny cages.</p>
    </section>

    <!-- Featured: enclosure -->
    <div data-open-guide="enclosures" role="button" tabindex="0" class="panel bg-mustard tappable p-4 mb-4 flex items-center gap-3">
      <div class="shrink-0" style="color:var(--ink)">${icon('cage', 78)}</div>
      <div class="min-w-0">
        <div class="stat">100 × 50<span class="text-[24px]">cm</span></div>
        <div class="text-[14px] font-bold mt-1 leading-snug">of unbroken floor. The minimum, for every species.</div>
        <div class="font-display text-[14px] mt-2 flex items-center gap-1">Read the cage guide ${icon('arrow', 18)}</div>
      </div>
    </div>

    <!-- Quick jumps -->
    <div class="grid grid-cols-2 gap-2 mb-6">
      <button data-quick-jump="food" data-quick-sub="fresh" class="btn btn-sm btn-mint justify-start">${icon('apple', 18)} Can they eat this?</button>
      <button data-quick-jump="checklist" class="btn btn-sm btn-pink justify-start">${icon('check', 18)} Am I ready?</button>
      <button data-quick-jump="shop" data-quick-sub="enclosures" class="btn btn-sm btn-sky justify-start">${icon('cage', 18)} Big enough cages</button>
      <button data-quick-jump="rescues" class="btn btn-sm btn-lilac justify-start">${icon('heart', 18)} Find a rescue</button>
    </div>

    ${sectionTitle('The guides', 'tap one!')}

    <div class="grid grid-cols-2 gap-3">
      ${rest.map((guide, idx) => `
        <div data-open-guide="${guide.id}" role="button" tabindex="0"
             class="panel tappable bg-${cardColours[idx % cardColours.length]} p-3 flex flex-col ${idx % 2 ? 'tilt-r' : 'tilt-l'}">
          <div class="mb-2">${icon(guideIcons[guide.id] || 'paw', 36)}</div>
          <h3 class="text-[16px] leading-tight mb-1.5">${clean(guide.title)}</h3>
          <p class="text-[12.5px] leading-snug clamp-3 mb-2">${clean(guide.summary)}</p>
          <span class="tag mt-auto self-start">${clean(guide.badge || 'Essential')}</span>
        </div>
      `).join('')}
    </div>

    <div class="note mt-6 tilt-l">
      <div class="note-title flex items-center gap-1.5">${icon('bulb', 22)} Did you know?</div>
      Wild hamsters cover up to <span class="highlight font-bold">9km a night</span>. That's why a big enclosure, a proper wheel and deep bedding to dig in aren't optional extras.
    </div>
  `;
}

function renderUnsafeView() {
  return `
    <section class="mb-4">
      <h2 class="text-[26px]">Still sold in UK pet shops. <span class="scribble">Still not safe.</span></h2>
      <p class="mt-2 text-[14.5px] leading-relaxed">These are on shelves right now, and rescues see the injuries they cause: blocked guts, lost limbs, eye injuries and bent spines.</p>
    </section>

    <div class="space-y-4">
      ${unsafeItems.map((item, i) => {
        const examples = Array.isArray(item.examples) ? item.examples : [];
        return `
          <article class="panel ${i % 2 ? 'tilt-r' : ''}">
            <div class="panel-bar bg-tomato" style="color:var(--white)">
              <span class="flex items-center gap-1.5">${icon('nope', 16)} Nope</span>
              <span class="tag">${clean(item.badge || 'Serious hazard')}</span>
            </div>
            <div class="panel-body">
              <h3 class="text-[19px] mb-1.5">${clean(item.name)}</h3>
              <p class="text-[14.5px] font-bold leading-relaxed mb-3">${clean(item.danger)}</p>
              <div class="rounded-lg p-3 bg-tomato-soft text-[14px] leading-relaxed mb-3" style="border:1.5px solid var(--ink)">
                <div class="v2005 text-[10px] font-bold uppercase mb-1">What vets see</div>
                ${clean(item.vetExplanation)}
              </div>
              ${examples.length ? `
                <div class="v2005 text-[10px] font-bold uppercase muted mb-1.5">Look out for</div>
                <div class="flex flex-wrap gap-1.5">
                  ${examples.map(ex => `<span class="tag">${icon('close', 11)} ${clean(ex)}</span>`).join('')}
                </div>` : ''}
            </div>
          </article>`;
      }).join('')}
    </div>
  `;
}

function renderInspirationView() {
  const photos = [
    {
      title: "Syrian setup, 120x60cm",
      subtitle: "Bucatstate 3.0 / Bandaby / DIY",
      image: "assets/images/enclosures/setup_inspiration_1.jpg",
      details: "30cm of packed paper bedding, a 32cm wheel up on stilts, a deep A4 sand bath, a multi-chamber hide and loads of flax sprays."
    },
    {
      title: "Robo sand paradise",
      subtitle: "Desert-style layout",
      image: "assets/images/enclosures/setup_inspiration_2.jpg",
      details: "Over a third of the floor is deep natural sand, plus a 26cm wheel, a coco coir dig box and dried millet sprays."
    },
    {
      title: "Russian dwarf steppe",
      subtitle: "Lots of textures",
      image: "assets/images/enclosures/setup_inspiration_3.jpg",
      details: "Beech chip dig zone, cork granules, 20cm of paper/aspen to burrow in and a bottomless 3-room wooden hide."
    },
    {
      title: "IKEA Platsa build",
      subtitle: "Budget 120cm foster tank",
      image: "assets/images/enclosures/setup_inspiration_4.jpg",
      details: "IKEA Platsa frame with an acrylic front. Huge burrowing depth and mesh on top for airflow."
    },
    {
      title: "Forage jungle",
      subtitle: "Cover everywhere",
      image: "assets/images/enclosures/setup_inspiration_5.jpg",
      details: "Sorghum, flax bouquets, hollow cork logs and a ceramic hide to cool off in. Prey animals feel safer with cover."
    },
    {
      title: "Digging heaven",
      subtitle: "Multi-substrate",
      image: "assets/images/enclosures/setup_inspiration_6.jpg",
      details: "Coco coir, terrarium moss, beech chips and aspen layers that hold their tunnels."
    }
  ];

  return `
    <section class="mb-5">
      <h2 class="text-[26px]">Real setups from <span class="scribble">real fosterers</span></h2>
      <p class="mt-2 text-[14.5px] leading-relaxed">Enclosures from India's Hamster Rescue fosterers. Deep bedding, no hay, and plenty to do.</p>
    </section>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-7 pt-2">
      ${photos.map((p, i) => `
        <figure class="polaroid tape ${['tape-pink', '', 'tape-mustard'][i % 3]} ${i % 2 ? 'tilt-r' : 'tilt-l'}">
          <div class="h-56 overflow-hidden"><img src="${p.image}" alt="${p.title}: ${p.details}" class="w-full h-full object-cover" loading="lazy"></div>
          <figcaption>
            <div class="caption">${p.title}</div>
            <div class="v2005 text-[11px] muted mt-0.5">${p.subtitle}</div>
            <p class="text-[13.5px] leading-snug mt-1.5">${p.details}</p>
          </figcaption>
        </figure>
      `).join('')}
    </div>
  `;
}

// ==========================================
// 2. FOOD
// ==========================================
function renderFoodHub() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    ${folderTabs([
      { id: 'mixes', label: 'Seed mixes' },
      { id: 'fresh', label: 'Fresh food' },
      { id: 'toxic', label: 'Never feed' }
    ], state.foodSubTab, 'data-food-sub')}
    <div class="folder-body">
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
}

function speciesFilterNote(spec, text, resetId) {
  return `
    <div class="rounded-xl p-3 mb-4 bg-${speciesColour[spec.id] || 'mustard'}-soft flex items-start justify-between gap-2" style="border:2px solid var(--ink)">
      <div class="text-[14px] leading-snug"><strong class="font-display">Showing: ${clean(spec.name)}.</strong> ${text}</div>
      <button type="button" id="${resetId}" class="btn btn-xs shrink-0">All</button>
    </div>`;
}

function renderCommercialMixesView() {
  const mixes = products.filter(p => {
    if (p.category !== 'food_mixes') return false;
    if (state.currentSpecies !== 'all' && !(p.species || []).includes(state.currentSpecies)) return false;
    return true;
  });

  const activeSpecObj = speciesList.find(s => s.id === state.currentSpecies);

  return `
    <h2 class="text-[26px] mb-2">What goes in the bowl <span class="hand text-[22px]" style="color:var(--tomato)">(well, the bedding)</span></h2>

    ${activeSpecObj ? speciesFilterNote(activeSpecObj, `${mixes.length} mixes that suit them. ${clean(activeSpecObj.dietSpecial || '')}`, 'reset-food-species') : ''}

    <div class="note mb-4">
      <div class="note-title flex items-center gap-1.5">${icon('snow', 20)} Freeze it first</div>
      Good mixes and sprays aren't sprayed with pesticides, so grain mite eggs can hatch in a warm room. <strong>Freeze new bags for 48 hours</strong>, then let them come back to room temperature before feeding.
    </div>

    <div class="panel p-4 mb-5 bg-lime-soft">
      <h3 class="text-[17px] mb-1 flex items-center gap-1.5">${icon('sprout', 22)} Why no pellets?</h3>
      <p class="text-[14px] leading-relaxed">Pet shop muesli (like Harry Hamster) is full of dyed, sugary biscuits and hard pellets that hamsters leave behind. Rescue-approved mixes have 25+ whole seeds, grains and mealworms, with <strong>15–18% protein</strong> and <strong>no fruit or sugar for dwarfs</strong>.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${mixes.map((p, i) => productCard(p, i)).join('')}
    </div>

    <div class="panel p-4 mt-5 bg-sky-soft tilt-l">
      <h3 class="text-[17px] mb-1">Ditch the bowl</h3>
      <p class="text-[14px] leading-relaxed">Scatter 1–2 tablespoons of seed across the bedding every day or two. Foraging burns energy, beats boredom, and lets them fill their pouches like they would in the wild.</p>
    </div>
  `;
}

function renderFreshFoodsView() {
  const isDwarfSelected = ['winter_white', 'campbells', 'chinese', 'roborovski'].includes(state.currentSpecies);
  const activeSpecObj = speciesList.find(s => s.id === state.currentSpecies);

  const safeFoods = foodDatabase.filter(f => {
    if (f.status !== 'SAFE' && f.status !== 'CAUTION_DIABETES') return false;
    // If a diabetes-prone dwarf species is selected, hide sugary Syrian-only foods
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
    <h2 class="text-[26px] mb-1">Can they eat this?</h2>
    <p class="text-[14px] mb-3 muted">Tiny portions. Think pea-sized, a few times a week.</p>

    ${activeSpecObj ? speciesFilterNote(activeSpecObj, isDwarfSelected
      ? 'Sugary foods are hidden, because dwarf hamsters are prone to diabetes.'
      : 'Showing safe veg, protein and the odd fruit treat.', 'reset-food-species') : ''}

    <div class="mb-4">${searchField('food-search-input', state.foodSearch, 'Try broccoli, egg, cucumber...', 'clear-food-search')}</div>

    <div class="space-y-3">
      ${filtered.length === 0 ? `<p class="hand text-2xl text-center py-6">nothing found, try another food?</p>` : ''}
      ${filtered.map(food => {
        const isSafe = food.status === 'SAFE';
        const speciesInfo = food.speciesNotes || food.portionGuide || 'All species';
        const prepInfo = food.prep || food.prepInstructions || 'Wash well and give a pea-sized piece.';
        return `
          <article class="panel">
            <div class="panel-body">
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <h3 class="text-[18px]">${clean(food.name)}</h3>
                <span class="tag ${isSafe ? 'tag-mint' : 'tag-mustard'} shrink-0">${isSafe ? 'Safe' : 'Sparingly'}</span>
              </div>
              <p class="text-[14px] leading-relaxed mb-3">${clean(food.details)}</p>
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13.5px]">
                <div class="rounded-lg p-2.5 bg-paper" style="border:1.5px solid var(--ink)">
                  <dt class="v2005 text-[10px] font-bold uppercase muted">Who</dt>
                  <dd>${clean(speciesInfo)}</dd>
                </div>
                <div class="rounded-lg p-2.5 bg-mint-soft" style="border:1.5px solid var(--ink)">
                  <dt class="v2005 text-[10px] font-bold uppercase muted">How</dt>
                  <dd>${clean(prepInfo)}</dd>
                </div>
              </dl>
            </div>
          </article>`;
      }).join('')}
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
    <h2 class="text-[26px] mb-1">Never, <span class="scribble">ever</span> feed these</h2>
    <p class="text-[14px] mb-3 leading-relaxed">They're either poisonous (onion, garlic, citrus, raw potato, chocolate and more) or can block a hamster's gut.</p>

    <div class="mb-4">${searchField('food-search-input', state.foodSearch, 'Search onion, citrus, chocolate...', 'clear-food-search')}</div>

    <div class="space-y-3">
      ${filtered.length === 0 ? `<p class="hand text-2xl text-center py-6">not on the list, but if in doubt, leave it out</p>` : ''}
      ${filtered.map(food => `
        <article class="panel bg-tomato-soft">
          <div class="panel-body">
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <h3 class="text-[18px] flex items-center gap-1.5">${icon('nope', 20)} ${clean(food.name)}</h3>
              <span class="tag tag-ink shrink-0">Never</span>
            </div>
            <p class="text-[14px] leading-relaxed mb-2">${clean(food.details)}</p>
            <div class="text-[13px] flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>Who:</strong> ${clean(food.speciesNotes || 'All hamsters')}</span>
              <span><strong>Rule:</strong> ${clean(food.prep || food.prepInstructions || 'Do not feed.')}</span>
            </div>
          </div>
        </article>
      `).join('')}
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
  if (e.target.closest('#clear-food-search')) {
    state.foodSearch = '';
    renderFoodHub();
  }
});

// Species-specific guidance per category
function getCategorySpeciesGuidance(category, speciesId) {
  const spec = speciesList.find(s => s.id === speciesId);
  if (!spec) return '';
  const n = clean(spec.name);
  switch (category) {
    case 'bedding':
      return `${n}s need at least <strong>${clean(spec.beddingDepth)}</strong> of packed-down paper or kiln-dried aspen. No hay, no fluffy cotton.`;
    case 'enclosures':
      return `At least <strong>${clean(spec.minCageSize)}</strong>. ${clean(spec.cageNote)}`;
    case 'wheels':
      return `A solid upright wheel of <strong>${clean(spec.minWheelSize)}</strong>. ${clean(spec.wheelNote)}`;
    case 'sand':
      return `${clean(spec.sandBathSize)}. ${clean(spec.sandNote)}`;
    case 'hides':
      return `Doorways at least <strong>${clean(spec.entranceHoleMin)}</strong> wide, so full cheek pouches never get stuck.`;
    case 'food_mixes':
      return clean(spec.dietSpecial);
    default:
      return `Everything here suits ${n}s: ${clean(spec.entranceHoleMin)} doorways, ${clean(spec.minWheelSize)} wheel, ${clean(spec.beddingDepth)} bedding.`;
  }
}

// ==========================================
// 3. SAFE PICKS (independent directory, not a shop)
// ==========================================
function renderShop() {
  const main = document.getElementById('main-tab-content');

  const categories = [
    { id: 'all', label: 'Everything' },
    { id: 'enclosures', label: 'Enclosures' },
    { id: 'wheels', label: 'Wheels' },
    { id: 'bedding', label: 'Bedding' },
    { id: 'food_mixes', label: 'Seed mixes' },
    { id: 'substrates', label: 'Dig stuff' },
    { id: 'sand', label: 'Sand & baths' },
    { id: 'hides', label: 'Hides' },
    { id: 'forage', label: 'Sprays & forage' }
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

  // Species-specific items first when a species is chosen
  if (state.currentSpecies !== 'all') {
    filtered.sort((a, b) => (a.species?.length || 5) - (b.species?.length || 5));
  }

  const activeCategoryObj = categories.find(c => c.id === state.shopCategory) || categories[0];
  const activeSpecObj = speciesList.find(s => s.id === state.currentSpecies);
  const speciesGuidance = activeSpecObj ? getCategorySpeciesGuidance(state.shopCategory, state.currentSpecies) : '';

  main.innerHTML = `
    <section class="mb-4 relative">
      <span class="sticker tilt-r absolute right-0 -top-1">we don't sell<br>anything!</span>
      <h1 class="text-[32px]">Safe picks</h1>
      <p class="mt-2 text-[14.5px] leading-relaxed pr-2">Kit we'd happily put in our own enclosures, all checked against rescue standards. Links go straight to the maker, shop or DIY video.</p>
    </section>

    <div class="mb-3">${searchField('shop-search-input', state.shopSearch, 'Search Bandaby, Fitch, IKEA...', 'clear-shop-search')}</div>

    <div class="flex flex-wrap gap-1.5 mb-2">
      ${categories.map(c => `
        <button type="button" data-cat-btn="${c.id}" class="chip ${state.shopCategory === c.id ? 'is-active' : ''}" aria-pressed="${state.shopCategory === c.id}">${c.label}</button>
      `).join('')}
    </div>
    <div class="v2005 text-[11px] muted mb-4">${filtered.length} ${filtered.length === 1 ? 'pick' : 'picks'} · ${activeCategoryObj.label.toLowerCase()}${activeSpecObj ? ` · ${clean(activeSpecObj.name)}` : ''}</div>

    ${activeSpecObj ? `
      <div class="rounded-xl p-3 mb-4 bg-${speciesColour[activeSpecObj.id] || 'mustard'}-soft flex items-start justify-between gap-2" style="border:2px solid var(--ink)">
        <div class="text-[14px] leading-snug"><strong class="font-display">${clean(activeSpecObj.name)}:</strong> ${speciesGuidance}</div>
        <button type="button" id="clear-species-in-shop" class="btn btn-xs shrink-0">All</button>
      </div>` : ''}

    ${filtered.length === 0 ? `
      <div class="panel p-6 text-center">
        <p class="hand text-2xl mb-3">hmm, nothing matches that</p>
        <button type="button" id="reset-shop-filters" class="btn btn-sm btn-mustard">${icon('reset', 16)} Reset filters</button>
      </div>
    ` : `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${filtered.map((p, i) => productCard(p, i)).join('')}
      </div>
    `}
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
}

// ==========================================
// 4. ADOPTION CHECKLIST
// ==========================================
function renderChecklist() {
  const main = document.getElementById('main-tab-content');

  const total = adoptionChecklist.length;
  const checkedCount = adoptionChecklist.filter(i => state.checkedItems[i.id]).length;
  const percent = total ? Math.round((checkedCount / total) * 100) : 0;

  main.innerHTML = `
    <section class="panel bg-pink p-4 mb-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-[28px]">Ready for a hamster?</h1>
          <p class="text-[14px] leading-snug mt-1">Tick off what you've got. Rescues check the same things on a home visit.</p>
        </div>
        <div class="text-right shrink-0">
          <div class="stat">${percent}<span class="text-[22px]">%</span></div>
          <div class="v2005 text-[10px] font-bold">${checkedCount} of ${total}</div>
        </div>
      </div>
      <div class="progress mt-3"><div class="progress-fill" style="width:${percent}%"></div></div>
      ${percent === 100 ? `<p class="hand text-2xl mt-2">you're ready! go and find your ham</p>` : ''}
    </section>

    <div class="space-y-3">
      ${adoptionChecklist.map(item => {
        const isChecked = !!state.checkedItems[item.id];
        const cat = clean(item.category || item.badge || 'Standard');
        const tone = checklistColours[cat] || 'mustard';
        return `
          <label class="panel block cursor-pointer select-none ${isChecked ? 'is-checked bg-mint-soft' : ''}">
            <div class="panel-body flex gap-3">
              <input type="checkbox" data-check-id="${item.id}" ${isChecked ? 'checked' : ''} class="sr-only">
              <span class="check-box mt-0.5">${isChecked ? icon('tick', 18) : ''}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2 mb-1">
                  <h3 class="text-[16.5px] leading-tight">${item.step ? `<span class="muted">${item.step}.</span> ` : ''}${clean(item.title)}</h3>
                  <span class="tag tag-${tone} shrink-0">${cat}</span>
                </div>
                <p class="text-[14px] font-bold leading-snug">${clean(item.requirement || item.description)}</p>
                ${item.whyImportant ? `<p class="text-[13.5px] leading-relaxed mt-1 muted">${clean(item.whyImportant)}</p>` : ''}
                ${item.rescueTip ? `<p class="text-[13.5px] leading-snug mt-2"><span class="hand text-[19px]" style="color:var(--tomato)">rescue tip:</span> ${clean(item.rescueTip)}</p>` : ''}
              </div>
            </div>
          </label>`;
      }).join('')}
    </div>

    <div class="flex gap-2 pt-5">
      <button id="copy-summary-btn" class="btn btn-tomato flex-1">${icon('copy', 18)} <span>Copy summary for your application</span></button>
      <button id="reset-checklist-btn" class="btn" aria-label="Reset checklist">${icon('reset', 18)}</button>
    </div>
  `;

  document.querySelectorAll('[data-check-id]').forEach(input => {
    input.addEventListener('change', () => {
      const id = input.getAttribute('data-check-id');
      state.checkedItems[id] = input.checked;
      localStorage.setItem('fth_checklist', JSON.stringify(state.checkedItems));

      const newCheckedCount = adoptionChecklist.filter(i => state.checkedItems[i.id]).length;
      if (newCheckedCount === total && typeof confetti === 'function') {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ['#ef5a3c', '#f6bc2f', '#8fd6b1', '#bfaaf3', '#f8acc8'] });
      }

      renderChecklist();
    });
  });

  document.getElementById('copy-summary-btn')?.addEventListener('click', () => {
    let summaryText = `For the Hams! Adoption readiness summary\n`;
    summaryText += `Score: ${checkedCount}/${total} (${percent}%)\n\n`;
    adoptionChecklist.forEach(item => {
      const status = state.checkedItems[item.id] ? '[x]' : '[ ]';
      const cat = clean(item.category || item.badge || 'Requirement');
      summaryText += `${status} ${clean(item.title)} (${cat}): ${clean(item.requirement || '')}\n`;
    });
    summaryText += `\nChecked against India's Hamster Rescue standards via www.forthehams.co.uk`;

    navigator.clipboard.writeText(summaryText).then(() => {
      const btn = document.getElementById('copy-summary-btn');
      if (btn) btn.innerHTML = `${icon('tick', 18)} <span>Copied!</span>`;
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
// 5. RESCUES
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
    { id: 'all', label: `Everywhere (${rescuesList.length})` },
    { id: 'England', label: 'England' },
    { id: 'Wales', label: 'Wales' },
    { id: 'Scotland', label: 'Scotland' }
  ];

  main.innerHTML = `
    <section class="mb-4">
      <p class="hand text-[22px] leading-none -rotate-2 inline-block" style="color:var(--tomato)">adopt, don't shop</p>
      <h1 class="text-[32px] mt-1">Find a <span class="scribble">rescue</span></h1>
      <p class="mt-2 text-[14.5px] leading-relaxed">Every rescue here keeps hamsters in 100x50cm+ setups, alone, with proper vet care. Lots of lovely hams are waiting.</p>
    </section>

    <div class="flex flex-wrap gap-1.5 mb-4">
      ${regions.map(reg => `
        <button type="button" data-region-btn="${reg.id}" class="chip ${state.rescueRegion === reg.id ? 'is-active' : ''}" aria-pressed="${state.rescueRegion === reg.id}">${reg.label}</button>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${filtered.map((r, i) => {
        const cNum = String(r.charityNumber || 'Community rescue');
        const charityText = /^(1|2|SC)/.test(cNum) ? `Charity #${cNum}` : cNum;
        const targetUrl = r.adoptUrl || r.website || r.url || '#';
        const donationUrl = r.donateUrl || r.website || '#';
        const details = r.speciality || r.summary || '';
        const locationText = r.locations || r.coverage || r.region || 'UK';
        const isPartner = (r.badges || []).some(b => /Partner|1213919/.test(b)) || /India/.test(r.name || '');
        return `
          <article class="panel flex flex-col ${isPartner ? 'bg-mustard-soft tape tape-pink' : ''} ${i % 3 === 2 ? 'tilt-r' : ''}">
            <div class="panel-body flex-grow">
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <span class="v2005 text-[11px] font-bold muted">${clean(charityText)}</span>
                ${isPartner ? `<span class="tag tag-pink">Our partner</span>` : ''}
              </div>
              <h3 class="text-[19px]">${clean(r.name)}</h3>
              <div class="text-[13.5px] mt-1 mb-2 flex items-start gap-1">${icon('pin', 15)} <span>${clean(locationText)}</span></div>
              <p class="text-[14px] leading-relaxed">${clean(details)}</p>
            </div>
            <div class="panel-foot">
              <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-tomato flex-1">Adopt ${icon('ext', 14)}</a>
              <a href="${donationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-pink">${icon('heart', 15)} Donate</a>
            </div>
          </article>`;
      }).join('')}
    </div>
  `;

  document.querySelectorAll('[data-region-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.rescueRegion = btn.getAttribute('data-region-btn');
      renderRescues();
    });
  });
}
