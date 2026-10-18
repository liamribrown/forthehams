// For the Hams! Mobile Web App Logic
// www.forthehams.co.uk | UK Ethical Hamster Care & Rescue Standards
// Punchy, Quirky, Colourful & Fun! 🐹✨

import { speciesList } from './data/species.js';
import { careGuides } from './data/guides.js';
import { unsafeItems } from './data/unsafe.js';
import { products } from './data/products.js';
import { foodDatabase } from './data/foods.js';
import { rescuesList } from './data/rescues.js';
import { adoptionChecklist } from './data/checklist.js';

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

// Tab Colour Matrix (Punchy & Pop!)
const tabColours = {
  guides: { activeBg: 'bg-[#FDE047]', text: 'text-stone-950' },   // Sunny Yellow
  food: { activeBg: 'bg-[#34D399]', text: 'text-stone-950' },     // Electric Mint
  shop: { activeBg: 'bg-[#FF5C00]', text: 'text-white' },         // Tangy Orange
  checklist: { activeBg: 'bg-[#F472B6]', text: 'text-white' },    // Bubblegum Pink
  rescues: { activeBg: 'bg-[#38BDF8]', text: 'text-stone-950' }    // Electric Sky
};

// Species Colour Palette
const speciesColours = {
  all: 'bg-[#FF5C00] text-white',
  syrian: 'bg-[#FFB800] text-stone-950',
  roborovski: 'bg-[#38BDF8] text-stone-950',
  winter_white: 'bg-[#34D399] text-stone-950',
  campbells: 'bg-[#F472B6] text-white',
  chinese: 'bg-[#A78BFA] text-white'
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

function updateNavState() {
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    const tab = btn.getAttribute('data-nav-tab');
    const iconBg = btn.querySelector('.tab-icon-bg');
    const label = btn.querySelector('.tab-label');
    const cfg = tabColours[tab] || { activeBg: 'bg-amber-400', text: 'text-stone-950' };

    // Reset base classes
    if (iconBg) {
      iconBg.className = 'w-9 h-9 rounded-2xl flex items-center justify-center transition-all tab-icon-bg';
      if (tab === state.activeTab) {
        iconBg.classList.add(...cfg.activeBg.split(' '), ...cfg.text.split(' '), 'border-2', 'border-stone-900', 'shadow-[2px_2px_0px_#18181b]', '-translate-y-0.5');
      } else {
        iconBg.classList.add('text-stone-400', 'hover:bg-stone-100');
      }
    }

    if (label) {
      label.className = 'text-[10px] font-black mt-0.5 tracking-tight tab-label';
      if (tab === state.activeTab) {
        label.classList.add('text-stone-950', 'font-black');
      } else {
        label.classList.add('text-stone-400');
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

      state.activeTab = tab;
      window.location.hash = tab;
      updateNavState();
      renderCurrentTab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Mobile Bottom Sheet Utility
function openBottomSheet(title, htmlContent) {
  const backdrop = document.getElementById('bottom-sheet-backdrop');
  const titleEl = document.getElementById('bottom-sheet-title');
  const bodyEl = document.getElementById('bottom-sheet-body');

  if (!backdrop || !titleEl || !bodyEl) return;

  titleEl.textContent = title;
  bodyEl.innerHTML = htmlContent;
  backdrop.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  updateIcons();
}

function closeBottomSheet() {
  const backdrop = document.getElementById('bottom-sheet-backdrop');
  if (backdrop) {
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function setupBottomSheetListeners() {
  const backdrop = document.getElementById('bottom-sheet-backdrop');
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
}

// Species Filter Carousel
function renderSpeciesBar() {
  const container = document.getElementById('species-filter-container');
  if (!container) return;

  const speciesOptions = [
    { id: 'all', emoji: '🐾', name: 'All' },
    { id: 'syrian', emoji: '🐹', name: 'Syrian' },
    { id: 'roborovski', emoji: '⚡', name: 'Robo' },
    { id: 'winter_white', emoji: '❄️', name: 'Winter White' },
    { id: 'campbells', emoji: '🌾', name: "Campbell's" },
    { id: 'chinese', emoji: '🌿', name: 'Chinese' }
  ];

  container.innerHTML = `
    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-3xl mx-auto">
      <span class="text-[10px] font-black text-stone-900 uppercase tracking-wider shrink-0 pl-1 mr-1">Species:</span>
      ${speciesOptions.map(opt => {
        const isActive = state.currentSpecies === opt.id;
        const activeClass = speciesColours[opt.id] || 'bg-amber-400 text-stone-950';
        return `
          <button 
            data-species-btn="${opt.id}"
            class="px-3 py-1 rounded-full text-xs font-black whitespace-nowrap transition-all duration-150 shrink-0 flex items-center gap-1 border-2 border-stone-900 ${
              isActive
                ? `${activeClass} shadow-[2px_2px_0px_#18181b] -translate-y-0.5`
                : 'bg-white text-stone-700 hover:bg-yellow-100 shadow-[1px_1px_0px_#18181b]'
            }">
            <span>${opt.emoji}</span>
            <span>${opt.name}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('[data-species-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentSpecies = btn.getAttribute('data-species-btn');
      renderSpeciesBar();
      renderSpeciesDetailBanner();
      if (state.activeTab === 'shop') renderShop();
      if (state.activeTab === 'food') renderFoodHub();
      if (state.activeTab === 'guides') renderCareGuides();
    });
  });

  renderSpeciesDetailBanner();
}

// Species Metric Quick Card (Vibrant & Playful)
function renderSpeciesDetailBanner() {
  const banner = document.getElementById('species-banner-area');
  if (!banner) return;

  if (state.currentSpecies === 'all') {
    banner.innerHTML = '';
    return;
  }

  const spec = speciesList.find(s => s.id === state.currentSpecies);
  if (!spec) return;

  banner.innerHTML = `
    <div class="bg-[#FEF08A] border-2.5 border-stone-900 shadow-[3.5px_3.5px_0px_#18181b] rounded-2xl p-4 my-2.5 relative overflow-hidden">
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-base font-black text-stone-950 font-heading">${spec.name}</span>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-900 text-stone-800 -rotate-1">${spec.badge}</span>
          </div>
          <p class="text-xs font-medium text-stone-800 mt-1 line-clamp-2 leading-relaxed">${spec.summary}</p>
        </div>
        <button id="close-species-banner" class="w-6 h-6 rounded-full bg-white border-2 border-stone-900 flex items-center justify-center text-xs font-black shadow-[1.5px_1.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5">✕</button>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2.5 border-t-2 border-stone-900/20 text-xs">
        <div class="bg-white rounded-xl p-2.5 border-2 border-stone-900 shadow-[1.5px_1.5px_0px_#18181b]">
          <div class="text-[9px] font-black text-stone-500 uppercase">Min Wheel</div>
          <div class="font-black text-sm text-stone-900">${spec.careMatrix.minWheelDiameter}</div>
        </div>

        <div class="bg-white rounded-xl p-2.5 border-2 border-stone-900 shadow-[1.5px_1.5px_0px_#18181b]">
          <div class="text-[9px] font-black text-stone-500 uppercase">Min Cage</div>
          <div class="font-black text-sm text-stone-900">${spec.careMatrix.minCageFloorSpace}</div>
        </div>

        <div class="bg-white rounded-xl p-2.5 border-2 border-stone-900 shadow-[1.5px_1.5px_0px_#18181b]">
          <div class="text-[9px] font-black text-rose-600 uppercase">Housing</div>
          <div class="font-black text-sm text-rose-600">${spec.careMatrix.socialStatus}</div>
        </div>

        <div class="bg-white rounded-xl p-2.5 border-2 border-stone-900 shadow-[1.5px_1.5px_0px_#18181b]">
          <div class="text-[9px] font-black text-stone-500 uppercase">Sand Area</div>
          <div class="font-black text-sm text-stone-900">${spec.careMatrix.sandBathNeeds}</div>
        </div>
      </div>

      <!-- Diabetes & Diet Warning Pill -->
      <div class="mt-2.5 p-2 bg-white/90 rounded-xl border border-stone-900 text-[11px] font-bold text-stone-900 flex items-center gap-1.5">
        <span class="text-sm">⚠️</span>
        <span><strong>Diet Rule:</strong> ${spec.careMatrix.diabetesRisk}</span>
      </div>
    </div>
  `;

  document.getElementById('close-species-banner')?.addEventListener('click', () => {
    state.currentSpecies = 'all';
    renderSpeciesBar();
    renderSpeciesDetailBanner();
    if (state.activeTab === 'shop') renderShop();
    if (state.activeTab === 'food') renderFoodHub();
  });
}

// Router View Renderer
function renderCurrentTab() {
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
// 1. CARE GUIDES (Punchy & Fun)
// ==========================================
function renderCareGuides() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div>
      <!-- Sub-Tab Switcher (Quirky Pill Buttons) -->
      <div class="flex items-center gap-2 mb-4 max-w-sm mx-auto justify-center">
        <button data-guide-sub="core" class="px-3.5 py-1.5 rounded-full text-xs font-black transition-all border-2 border-stone-900 ${
          state.guidesSubTab === 'core' ? 'bg-[#FDE047] text-stone-950 shadow-[2.5px_2.5px_0px_#18181b] -translate-y-0.5' : 'bg-white text-stone-700 hover:bg-yellow-50'
        }">
          📖 Core Care
        </button>
        <button data-guide-sub="unsafe" class="px-3.5 py-1.5 rounded-full text-xs font-black transition-all border-2 border-stone-900 ${
          state.guidesSubTab === 'unsafe' ? 'bg-[#F43F5E] text-white shadow-[2.5px_2.5px_0px_#18181b] -translate-y-0.5' : 'bg-white text-rose-700 hover:bg-rose-50'
        }">
          🛑 Unsafe Items
        </button>
        <button data-guide-sub="inspiration" class="px-3.5 py-1.5 rounded-full text-xs font-black transition-all border-2 border-stone-900 ${
          state.guidesSubTab === 'inspiration' ? 'bg-[#38BDF8] text-stone-950 shadow-[2.5px_2.5px_0px_#18181b] -translate-y-0.5' : 'bg-white text-stone-700 hover:bg-sky-50'
        }">
          📸 Inspo Setups
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

  document.querySelectorAll('[data-open-guide]').forEach(card => {
    card.addEventListener('click', () => {
      const guideId = card.getAttribute('data-open-guide');
      const guide = careGuides.find(g => g.id === guideId);
      if (guide) {
        openBottomSheet(
          guide.title,
          `
            <div class="guide-content">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#FDE047] border border-stone-900 text-stone-950 mb-3 -rotate-1">${guide.badge}</span>
              ${guide.content}
            </div>
          `
        );
      }
    });
  });
}

function renderCoreGuidesView() {
  const badgeColors = [
    'bg-[#FDE047]', // yellow
    'bg-[#86EFAC]', // mint
    'bg-[#FBCFE8]', // pink
    'bg-[#BAE6FD]', // sky
    'bg-[#DDD6FE]', // lavender
    'bg-[#FED7AA]'  // peach
  ];

  return `
    <div class="space-y-3">
      <!-- Friendly Volunteer Banner -->
      <div class="bg-[#CCFBF1] border-2 border-stone-900 shadow-[3px_3px_0px_#18181b] rounded-2xl p-3.5 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2.5">
          <span class="text-2xl animate-spin-slow">🌻</span>
          <div>
            <div class="font-black text-stone-950 font-heading text-sm">Real Rescue Knowledge ✨</div>
            <p class="text-[11px] font-medium text-stone-700">Synthesized from India's Hamster Rescue (#1213919) foster standards.</p>
          </div>
        </div>
      </div>

      <!-- Guides List Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${careGuides.map((guide, idx) => {
          const badgeBg = badgeColors[idx % badgeColors.length];
          return `
            <div data-open-guide="${guide.id}" class="bg-white pop-card p-4 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2.5 py-0.5 rounded-lg text-[10px] font-black border border-stone-900 ${badgeBg} text-stone-950">${guide.badge}</span>
                  <div class="w-6 h-6 rounded-full bg-stone-100 border border-stone-900 flex items-center justify-center text-stone-900">
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </div>
                </div>
                <h3 class="font-black text-base text-stone-950 font-heading leading-tight mb-1.5">${guide.title}</h3>
                <p class="text-xs font-medium text-stone-600 line-clamp-2 leading-relaxed">${guide.summary}</p>
              </div>
              <div class="mt-3 pt-2.5 border-t-2 border-stone-100 flex items-center justify-between text-[11px] font-black text-[#FF5C00]">
                <span>Tap to read guide</span>
                <span>✨</span>
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
    <div class="space-y-3">
      <div class="bg-[#FFE4E6] border-2.5 border-stone-900 shadow-[3.5px_3.5px_0px_#18181b] rounded-2xl p-4 text-xs text-stone-950">
        <h3 class="font-black text-base text-stone-950 font-heading mb-1 flex items-center gap-1.5">
          <span>🛑</span>
          <span>Unsafe Items Hall of Shame!</span>
        </h3>
        <p class="text-[11px] font-medium leading-relaxed">
          Pet shops regularly sell these products despite veterinary warnings. Here is exactly why rescues ban them!
        </p>
      </div>

      <div class="space-y-3">
        ${unsafeItems.map(item => `
          <div class="bg-white pop-card p-4 border-rose-600">
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#F43F5E] text-white border border-stone-900 uppercase tracking-wider">${item.badge}</span>
              <span class="text-[10px] font-black text-rose-800 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded-md">🚫 Rescues Ban This</span>
            </div>
            <h4 class="font-black text-stone-950 text-base font-heading mb-1">${item.name}</h4>
            <p class="text-xs font-medium text-stone-700 leading-relaxed mb-2.5">${item.danger}</p>
            <div class="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-950 font-medium">
              <strong class="font-black text-rose-900">⚠️ Vet Danger:</strong> ${item.vetExplanation}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderInspirationView() {
  const photos = [
    {
      title: "Natural Syrian Enclosure (120x60cm)",
      subtitle: "Bucatstate 3.0 / DIY Wood Setup",
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
      details: "Features coco coir, terrarium moss, beech chips, and kiln-dried softwood shaving layers holding stable tunnels."
    }
  ];

  return `
    <div class="space-y-4">
      <div class="bg-[#DDD6FE] border-2.5 border-stone-900 shadow-[3.5px_3.5px_0px_#18181b] rounded-2xl p-4 text-xs">
        <h3 class="font-black text-stone-950 text-base font-heading">Real UK Foster Setups 📸</h3>
        <p class="text-[11px] font-medium text-stone-800 mt-0.5">Real enclosure setups from India's Hamster Rescue fosterers showcasing deep burrowing, stilts, and enrichment!</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${photos.map(p => `
          <div class="bg-white pop-card overflow-hidden">
            <div class="relative h-48 bg-stone-100 overflow-hidden border-b-2 border-stone-900">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy">
            </div>
            <div class="p-4">
              <h4 class="font-black text-sm text-stone-950 font-heading">${p.title}</h4>
              <div class="text-[11px] font-black text-[#FF5C00] mb-1">${p.subtitle}</div>
              <p class="text-xs font-medium text-stone-600 leading-relaxed">${p.details}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// 2. FOOD HUB (Vibrant, Clear & Verified)
// ==========================================
function renderFoodHub() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div>
      <!-- Food Hub Switcher -->
      <div class="flex items-center gap-2 mb-4 max-w-sm mx-auto justify-center">
        <button data-food-sub="mixes" class="px-3.5 py-1.5 rounded-full text-xs font-black transition-all border-2 border-stone-900 ${
          state.foodSubTab === 'mixes' ? 'bg-[#FFB800] text-stone-950 shadow-[2.5px_2.5px_0px_#18181b] -translate-y-0.5' : 'bg-white text-stone-700 hover:bg-yellow-50'
        }">
          🥣 Seed Mixes
        </button>
        <button data-food-sub="fresh" class="px-3.5 py-1.5 rounded-full text-xs font-black transition-all border-2 border-stone-900 ${
          state.foodSubTab === 'fresh' ? 'bg-[#34D399] text-stone-950 shadow-[2.5px_2.5px_0px_#18181b] -translate-y-0.5' : 'bg-white text-stone-700 hover:bg-green-50'
        }">
          🥗 Fresh Foods
        </button>
        <button data-food-sub="toxic" class="px-3.5 py-1.5 rounded-full text-xs font-black transition-all border-2 border-stone-900 ${
          state.foodSubTab === 'toxic' ? 'bg-[#F43F5E] text-white shadow-[2.5px_2.5px_0px_#18181b] -translate-y-0.5' : 'bg-white text-rose-700 hover:bg-rose-50'
        }">
          🛑 Toxic List
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
}

function renderCommercialMixesView() {
  const mixes = products.filter(p => {
    if (p.category !== 'food_mixes') return false;
    if (state.currentSpecies !== 'all' && !p.species.includes(state.currentSpecies)) return false;
    return true;
  });

  return `
    <div class="space-y-4">
      <!-- 48-Hour Freezer Protocol Card (Icy Pop Style) -->
      <div class="bg-[#E0F2FE] border-2.5 border-stone-900 shadow-[3.5px_3.5px_0px_#18181b] rounded-2xl p-4">
        <div class="flex items-start gap-3">
          <span class="text-3xl animate-bounce">❄️</span>
          <div>
            <h3 class="font-black text-base text-stone-950 font-heading">The 48-Hour Freezer Rule!</h3>
            <p class="text-xs font-medium text-stone-800 leading-relaxed mt-0.5">
              High-welfare seed mixes and sprays are 100% pesticide-free, meaning harmless grain mite eggs can hatch in warm rooms. <strong>Always freeze new food bags for 48 hours</strong> upon delivery to safely neutralise any eggs. Thaw to room temperature before feeding!
            </p>
          </div>
        </div>
      </div>

      <!-- Pellet-Free Warning Pill -->
      <div class="bg-white pop-card p-4">
        <div class="font-black text-sm text-stone-950 font-heading mb-1 flex items-center gap-1.5">
          <span>🌾</span>
          <span>Why Pellet-Free Mueslis are Best</span>
        </div>
        <p class="text-xs font-medium text-stone-600 leading-relaxed">
          Standard pet shop mueslis (like Harry Hamster) contain dyed sugary biscuits and hard pellets that hamsters hate. Rescue-approved seed diets provide 25+ whole seeds, grains, and mealworms with <strong>15–18% protein</strong> and <strong>zero fruit/sugars for dwarfs</strong>.
        </p>
      </div>

      <!-- Mix Cards List -->
      <div class="space-y-3">
        ${mixes.map(p => `
          <div class="bg-white pop-card p-4 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap gap-1 mb-2">
                ${p.badges.map(b => `
                  <span class="px-2.5 py-0.5 rounded-lg text-[10px] font-black border border-stone-900 ${
                    b.includes('Favourite') || b.includes('Hope')
                      ? 'bg-[#FEF08A] text-stone-950'
                      : 'bg-[#A7F3D0] text-stone-950'
                  }">${b}</span>
                `).join('')}
              </div>
              <div class="text-[10px] font-black text-stone-400 uppercase tracking-wider">${p.brand} • ${p.retailer}</div>
              <h4 class="font-black text-base text-stone-950 font-heading mt-0.5 mb-1 leading-snug">${p.name}</h4>
              <p class="text-xs font-medium text-stone-600 leading-relaxed mb-3">${p.summary}</p>

              <div class="flex flex-wrap items-center gap-1 mb-3">
                <span class="text-[10px] font-bold text-stone-400">Suitable For:</span>
                ${p.species.map(sp => `
                  <span class="text-[10px] px-2 py-0.5 rounded-md border border-stone-900 bg-stone-100 text-stone-800 font-extrabold capitalize">
                    ${sp.replace('_', ' ')}
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="pt-3 border-t-2 border-stone-100 flex items-center justify-between">
              <div>
                <div class="text-[9px] font-black text-stone-400 uppercase">Price Guide</div>
                <div class="text-base font-black text-stone-950 font-heading">${p.priceGuide}</div>
              </div>

              <a 
                href="${p.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="pop-btn px-4 py-2 bg-[#FF5C00] text-white text-xs hover:bg-[#e05200] flex items-center gap-1.5">
                <span>Buy Mix ↗</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Scatter Feed Pill -->
      <div class="bg-[#FEF9C3] border-2 border-stone-900 shadow-[2px_2px_0px_#18181b] rounded-2xl p-3.5 text-xs text-stone-800 font-medium">
        <strong class="font-black text-stone-950">💡 Scatter Feed Tip:</strong> Ditch the food bowl! Scatter 1–2 tablespoons of seeds across deep bedding every 1–2 days. It burns energy, eliminates boredom, and lets hamsters pouch like they do in the wild.
      </div>
    </div>
  `;
}

function renderFreshFoodsView() {
  const safeFoods = foodDatabase.filter(f => f.status === 'SAFE' || f.status === 'CAUTION_DIABETES');

  const filtered = safeFoods.filter(food => {
    if (state.foodSearch.trim()) {
      const q = state.foodSearch.toLowerCase();
      return food.name.toLowerCase().includes(q) || food.details.toLowerCase().includes(q);
    }
    return true;
  });

  return `
    <div class="space-y-3">
      <!-- Search Bar -->
      <div class="relative">
        <i data-lucide="search" class="w-4 h-4 text-stone-400 absolute left-3.5 top-3"></i>
        <input 
          type="text" 
          id="food-search-input" 
          value="${state.foodSearch}"
          placeholder="Search fresh vegetables, proteins, treats..."
          class="w-full bg-white border-2 border-stone-900 shadow-[2.5px_2.5px_0px_#18181b] rounded-2xl pl-10 pr-8 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400">
        ${state.foodSearch ? `
          <button id="clear-food-search" class="absolute right-3 top-2.5 text-stone-400 hover:text-stone-900 font-black text-xs">✕</button>
        ` : ''}
      </div>

      <div class="space-y-2.5">
        ${filtered.map(food => {
          const isSafe = food.status === 'SAFE';
          return `
            <div class="bg-white pop-card p-4">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-black text-base text-stone-950 font-heading">${food.name}</h4>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black border border-stone-900 ${
                  isSafe ? 'bg-[#86EFAC] text-stone-950' : 'bg-[#FEF08A] text-stone-950'
                }">
                  ${isSafe ? '🟢 Safe Staple' : '🟡 Caution / Diabetes'}
                </span>
              </div>
              <p class="text-xs font-medium text-stone-700 leading-relaxed mb-2.5">${food.details}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] pt-2 border-t border-stone-100 font-medium">
                <div class="text-stone-800"><strong>Portion:</strong> ${food.portionGuide}</div>
                <div class="text-stone-800"><strong>Prep:</strong> ${food.prepInstructions}</div>
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

  return `
    <div class="space-y-3">
      <div class="bg-[#FFE4E6] border-2.5 border-stone-900 shadow-[3.5px_3.5px_0px_#18181b] rounded-2xl p-4 text-xs text-stone-950">
        <h3 class="font-black text-base text-stone-950 font-heading mb-1">⚠️ Strictly Forbidden Toxic Foods!</h3>
        <p class="text-[11px] font-medium leading-relaxed">
          These items contain toxic compounds (cyanide, allium, solanine, theobromine) or pose fatal gastrointestinal blockages. Never feed these!
        </p>
      </div>

      <div class="space-y-2.5">
        ${toxicFoods.map(food => `
          <div class="bg-white pop-card p-4 border-rose-600">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-black text-base text-stone-950 font-heading">${food.name}</h4>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#F43F5E] text-white border border-stone-900 uppercase">
                🔴 Strictly Forbidden
              </span>
            </div>
            <p class="text-xs font-medium text-rose-950 leading-relaxed mb-1.5">${food.details}</p>
            <div class="text-[11px] text-stone-700 pt-1.5 border-t border-stone-100 font-medium">
              <strong>Why Dangerous:</strong> ${food.prepInstructions}
            </div>
          </div>
        `).join('')}
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

// ==========================================
// 3. ETHICAL SHOP (Punchy Neo-Pop Cards)
// ==========================================
function renderShop() {
  const main = document.getElementById('main-tab-content');

  const filtered = products.filter(p => {
    if (state.currentSpecies !== 'all' && !p.species.includes(state.currentSpecies)) return false;
    if (state.shopCategory !== 'all' && p.category !== state.shopCategory) return false;
    if (state.shopRetailer !== 'all' && !p.retailer.toLowerCase().includes(state.shopRetailer.toLowerCase())) return false;
    if (state.shopSearch.trim()) {
      const q = state.shopSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  const categories = [
    { id: 'all', label: '🌟 All Items' },
    { id: 'food_mixes', label: '🥣 Seed Mixes' },
    { id: 'enclosures', label: '🏠 Enclosures' },
    { id: 'wheels', label: '🎡 Wheels' },
    { id: 'bedding', label: '🛏️ Bedding' },
    { id: 'substrates', label: '🪵 Substrates' },
    { id: 'sand', label: '🏖️ Sand Baths' },
    { id: 'hides', label: '🏡 Hides' },
    { id: 'forage', label: '🌾 Forage' }
  ];

  main.innerHTML = `
    <div class="space-y-3">
      <!-- Search Input -->
      <div class="relative">
        <i data-lucide="search" class="w-4 h-4 text-stone-400 absolute left-3.5 top-3"></i>
        <input 
          type="text" 
          id="shop-search-input" 
          value="${state.shopSearch}"
          placeholder="Search verified cages, wheels, mixes..."
          class="w-full bg-white border-2 border-stone-900 shadow-[2.5px_2.5px_0px_#18181b] rounded-2xl pl-10 pr-8 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400">
        ${state.shopSearch ? `
          <button id="clear-shop-search" class="absolute right-3 top-2.5 text-stone-400 hover:text-stone-900 font-black text-xs">✕</button>
        ` : ''}
      </div>

      <!-- Horizontal Scroll Category Chips -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        ${categories.map(c => `
          <button 
            data-cat-btn="${c.id}"
            class="px-3.5 py-1 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 border-stone-900 ${
              state.shopCategory === c.id
                ? 'bg-[#FF5C00] text-white shadow-[2px_2px_0px_#18181b] -translate-y-0.5'
                : 'bg-white text-stone-700 hover:bg-yellow-50'
            }">
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Products Grid -->
      ${filtered.length === 0 ? `
        <div class="bg-white pop-card p-8 text-center my-6">
          <p class="text-xs font-medium text-stone-500">No matching items found. Try clearing your search.</p>
          <button id="reset-shop-filters" class="mt-3 pop-btn px-4 py-2 bg-[#FDE047] text-stone-950 text-xs">Clear Filters</button>
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${filtered.map(p => `
            <div class="bg-white pop-card p-4 flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap gap-1 mb-2">
                  ${p.badges.map(b => `
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-black border border-stone-900 ${
                      b.includes('India') || b.includes('Profits')
                        ? 'bg-[#FDA4AF] text-stone-950'
                        : b.includes('Hope')
                        ? 'bg-[#A7F3D0] text-stone-950'
                        : b.includes('Favourite')
                        ? 'bg-[#FEF08A] text-stone-950'
                        : 'bg-stone-100 text-stone-800'
                    }">${b}</span>
                  `).join('')}
                </div>

                <div class="text-[10px] font-black text-stone-400 uppercase tracking-wider">${p.brand} • ${p.retailer}</div>
                <h4 class="font-black text-base text-stone-950 font-heading mt-0.5 mb-1 leading-snug">${p.name}</h4>
                <p class="text-xs font-medium text-stone-600 leading-relaxed mb-3">${p.summary}</p>
              </div>

              <div class="pt-3 border-t-2 border-stone-100 flex items-center justify-between">
                <div>
                  <div class="text-[9px] font-black text-stone-400 uppercase">Price Guide</div>
                  <div class="text-sm font-black text-stone-950 font-heading">${p.priceGuide}</div>
                </div>

                <a 
                  href="${p.url}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="pop-btn px-3.5 py-1.5 bg-stone-950 hover:bg-[#FF5C00] text-white text-xs flex items-center gap-1 transition-colors">
                  <span>Buy From Seller ↗</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `}

      <div class="text-center text-[10px] font-bold text-stone-400 pt-3">
        UK ASA Disclosure: Vetted against rescue standards. Some links directly fund independent rescues.
      </div>
    </div>
  `;

  document.querySelectorAll('[data-cat-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.shopCategory = btn.getAttribute('data-cat-btn');
      renderShop();
    });
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
    renderShop();
  });
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
      <!-- Punchy Progress Score Card -->
      <div class="bg-[#FBCFE8] border-2.5 border-stone-900 shadow-[3.5px_3.5px_0px_#18181b] rounded-2xl p-4.5">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="font-black text-base text-stone-950 font-heading">Adoption Readiness Score ✨</h3>
            <p class="text-[11px] font-bold text-stone-700">Official UK Rescue Vetting Criteria</p>
          </div>
          <span class="text-2xl font-black text-stone-950 font-heading">${percent}%</span>
        </div>

        <div class="w-full bg-white border-2 border-stone-900 rounded-full h-3.5 p-0.5 overflow-hidden">
          <div class="bg-[#FF5C00] h-full rounded-full transition-all duration-300" style="width: ${percent}%"></div>
        </div>

        <div class="text-[11px] font-black text-stone-800 mt-2 flex items-center justify-between">
          <span>${checkedCount} of ${total} requirements satisfied</span>
          ${percent === 100 ? '<span class="text-emerald-900 font-black bg-white px-2 py-0.5 rounded-full border border-stone-900">🎉 100% Rescue Ready!</span>' : ''}
        </div>
      </div>

      <!-- Checklist Items -->
      <div class="space-y-2.5">
        ${adoptionChecklist.map(item => {
          const isChecked = !!state.checkedItems[item.id];
          return `
            <label class="bg-white pop-card p-3.5 flex items-start gap-3 cursor-pointer select-none transition-all ${
              isChecked ? 'bg-[#FEFCE8] border-amber-500' : ''
            }">
              <input 
                type="checkbox" 
                data-check-id="${item.id}"
                ${isChecked ? 'checked' : ''}
                class="mt-1 w-5 h-5 rounded-md text-[#FF5C00] focus:ring-yellow-400 border-2 border-stone-900 accent-[#FF5C00]">
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <h4 class="font-black text-xs text-stone-950 font-heading">${item.title}</h4>
                  <span class="text-[10px] font-black text-stone-950 bg-[#FDE047] border border-stone-900 px-2 py-0.5 rounded-md">${item.badge}</span>
                </div>
                <p class="text-xs font-medium text-stone-600 mt-0.5 leading-relaxed">${item.description}</p>
              </div>
            </label>
          `;
        }).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-2 pt-2">
        <button id="copy-summary-btn" class="flex-1 py-3 pop-btn bg-[#FF5C00] text-white text-xs hover:bg-[#e05200] flex items-center justify-center gap-1.5">
          <i data-lucide="copy" class="w-4 h-4"></i>
          <span>Copy Adoption Summary</span>
        </button>
        <button id="reset-checklist-btn" class="py-3 px-5 pop-btn bg-white text-stone-800 text-xs hover:bg-stone-100">
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
      summaryText += `${status} ${item.title} (${item.badge})\n`;
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
// 5. RESCUE DIRECTORY
// ==========================================
function renderRescues() {
  const main = document.getElementById('main-tab-content');

  const filtered = rescuesList.filter(r => {
    if (state.rescueRegion !== 'all' && r.region !== state.rescueRegion && r.region !== 'All UK') {
      return false;
    }
    return true;
  });

  const regions = [
    { id: 'all', label: 'All Rescues' },
    { id: 'England', label: 'England' },
    { id: 'Wales', label: 'Wales' },
    { id: 'Scotland', label: 'Scotland' }
  ];

  main.innerHTML = `
    <div class="space-y-3">
      <!-- Region Filter -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        ${regions.map(reg => `
          <button 
            data-region-btn="${reg.id}"
            class="px-3.5 py-1 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 border-stone-900 ${
              state.rescueRegion === reg.id
                ? 'bg-[#38BDF8] text-stone-950 shadow-[2px_2px_0px_#18181b] -translate-y-0.5'
                : 'bg-white text-stone-700 hover:bg-sky-50'
            }">
            ${reg.label}
          </button>
        `).join('')}
      </div>

      <!-- Rescues Grid -->
      <div class="space-y-3">
        ${filtered.map(r => `
          <div class="bg-white pop-card p-4">
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h4 class="font-black text-base text-stone-950 font-heading">${r.name}</h4>
                <div class="text-[11px] font-bold text-[#FF5C00]">${r.charityNumber} • ${r.coverage}</div>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FED7AA] text-stone-950 border border-stone-900 shrink-0">
                ${r.region}
              </span>
            </div>

            <p class="text-xs font-medium text-stone-600 leading-relaxed mb-3">${r.summary}</p>

            <div class="flex items-center gap-2 pt-2.5 border-t-2 border-stone-100">
              <a 
                href="${r.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1 py-2 bg-[#FF5C00] hover:bg-[#e05200] text-white text-xs pop-btn text-center">
                Adopt From Rescue ✨
              </a>
              <a 
                href="${r.donateUrl}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="px-4 py-2 bg-white hover:bg-stone-100 text-stone-900 text-xs pop-btn">
                Donate 💖
              </a>
            </div>
          </div>
        `).join('')}
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
