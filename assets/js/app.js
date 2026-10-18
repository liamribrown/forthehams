// For the Hams! Mobile Web App Logic
// www.forthehams.co.uk | UK Ethical Hamster Care & Rescue Standards
// Authentic 2000s / Noughties Glossy Web 2.0 Theme 🐹✨

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
    const gelClass = tabGelClasses[tab] || 'gel-orange';

    if (iconBg) {
      // Remove any previously set gel classes
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

// 2000s Species Filter Carousel (Glossy Candy Pills)
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
      <span class="text-[10px] font-black text-slate-500 uppercase tracking-wider shrink-0 pl-1 mr-1">Species:</span>
      ${speciesOptions.map(opt => {
        const isActive = state.currentSpecies === opt.id;
        const activeGel = speciesGelClasses[opt.id] || 'gel-orange';
        return `
          <button 
            data-species-btn="${opt.id}"
            class="gel-btn ${isActive ? activeGel : 'gel-silver'} px-3 py-1 text-xs font-black whitespace-nowrap transition-all duration-150 shrink-0 flex items-center gap-1">
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

// 2000s Species Metric Quick Card (Glossy Web 2.0 Panel)
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
    <div class="web2-card my-2.5">
      <div class="web2-header-bar px-4 py-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base font-black text-slate-900 font-heading">${spec.name}</span>
          <span class="gel-badge gel-yellow text-[10px] font-black">${spec.badge}</span>
        </div>
        <button id="close-species-banner" class="w-6 h-6 rounded-full gel-btn gel-silver text-xs font-black">✕</button>
      </div>

      <div class="p-3.5 bg-white">
        <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">${spec.summary}</p>

        <!-- Quick Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div class="p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 shadow-xs">
            <div class="text-[9px] font-black text-sky-800 uppercase">Min Wheel</div>
            <div class="font-black text-sm text-slate-900">${spec.careMatrix.minWheelDiameter}</div>
          </div>

          <div class="p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 shadow-xs">
            <div class="text-[9px] font-black text-sky-800 uppercase">Min Cage</div>
            <div class="font-black text-sm text-slate-900">${spec.careMatrix.minCageFloorSpace}</div>
          </div>

          <div class="p-2.5 rounded-xl border border-rose-100 bg-rose-50/50 shadow-xs">
            <div class="text-[9px] font-black text-rose-700 uppercase">Housing</div>
            <div class="font-black text-sm text-rose-700">${spec.careMatrix.socialStatus}</div>
          </div>

          <div class="p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 shadow-xs">
            <div class="text-[9px] font-black text-sky-800 uppercase">Sand Area</div>
            <div class="font-black text-sm text-slate-900">${spec.careMatrix.sandBathNeeds}</div>
          </div>
        </div>

        <!-- Diabetes & Diet Warning Pill -->
        <div class="mt-2.5 p-2 rounded-xl border border-amber-200 bg-amber-50 text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
          <span class="text-sm">⚠️</span>
          <span><strong>Diet Advisory:</strong> ${spec.careMatrix.diabetesRisk}</span>
        </div>
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
// 1. CARE GUIDES (2000s Web 2.0 Style)
// ==========================================
function renderCareGuides() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div>
      <!-- Sub-Tab Switcher (Noughties Glossy Pills) -->
      <div class="flex items-center gap-2 mb-4 max-w-sm mx-auto justify-center">
        <button data-guide-sub="core" class="gel-btn ${
          state.guidesSubTab === 'core' ? 'gel-orange' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          📖 Core Care
        </button>
        <button data-guide-sub="unsafe" class="gel-btn ${
          state.guidesSubTab === 'unsafe' ? 'gel-red' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          🛑 Unsafe Items
        </button>
        <button data-guide-sub="inspiration" class="gel-btn ${
          state.guidesSubTab === 'inspiration' ? 'gel-blue' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
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
              <span class="gel-badge gel-yellow px-3 py-1 text-xs font-black mb-3 inline-block">${guide.badge}</span>
              ${guide.content}
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
    <div class="space-y-3">
      <!-- Volunteer Banner -->
      <div class="web2-card p-3.5 bg-gradient-to-r from-sky-50 via-white to-sky-50 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2.5">
          <span class="text-2xl">🌿</span>
          <div>
            <div class="font-black text-slate-900 font-heading text-sm">UK Rescue Standards ✨</div>
            <p class="text-[11px] font-medium text-slate-600">Synthesized from India's Hamster Rescue (#1213919) and UK rescue networks.</p>
          </div>
        </div>
      </div>

      <!-- Guides List Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${careGuides.map((guide, idx) => {
          const badgeClass = badgeGels[idx % badgeGels.length];
          return `
            <div data-open-guide="${guide.id}" class="web2-card p-4 hover:shadow-lg active:scale-[0.99] cursor-pointer flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="gel-badge ${badgeClass}">${guide.badge}</span>
                  <div class="w-6 h-6 rounded-full gel-btn gel-silver flex items-center justify-center text-slate-700">
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                  </div>
                </div>
                <h3 class="font-black text-base text-slate-900 font-heading leading-tight mb-1.5">${guide.title}</h3>
                <p class="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">${guide.summary}</p>
              </div>
              <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-black text-amber-700">
                <span>Tap to read full guide</span>
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
      <div class="web2-card p-4 bg-rose-50/60 border-rose-200 text-xs">
        <h3 class="font-black text-base text-rose-950 font-heading mb-1 flex items-center gap-1.5">
          <span>🛑</span>
          <span>Unsafe Items Hall of Shame!</span>
        </h3>
        <p class="text-[11px] text-slate-600 font-medium leading-relaxed">
          Common pet shop items banned by ethical UK rescues due to risk of fatal bowel blockages, amputation, and spinal damage.
        </p>
      </div>

      <div class="space-y-3">
        ${unsafeItems.map(item => `
          <div class="web2-card p-4 border-rose-200">
            <div class="flex items-center justify-between mb-1.5">
              <span class="gel-badge gel-red text-[10px] font-black">${item.badge}</span>
              <span class="text-[10px] font-bold text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full">Banned by Rescues</span>
            </div>
            <h4 class="font-black text-slate-900 text-base font-heading mb-1">${item.name}</h4>
            <p class="text-xs font-medium text-slate-600 leading-relaxed mb-2.5">${item.danger}</p>
            <div class="bg-rose-50 border border-rose-100 rounded-xl p-2.5 text-xs text-rose-900 font-medium">
              <strong class="font-black text-rose-950">⚠️ Veterinary Risk:</strong> ${item.vetExplanation}
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
      <div class="web2-card p-4 bg-sky-50/70 border-sky-200 text-xs">
        <h3 class="font-black text-slate-900 text-base font-heading">Real UK Foster Setups 📸</h3>
        <p class="text-[11px] font-medium text-slate-600 mt-0.5">Real enclosure setups from India's Hamster Rescue fosterers showcasing deep burrowing, stilts, and enrichment!</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${photos.map(p => `
          <div class="web2-card overflow-hidden">
            <div class="relative h-48 bg-slate-100 overflow-hidden border-b border-sky-100">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy">
            </div>
            <div class="p-3.5">
              <h4 class="font-black text-sm text-slate-900 font-heading">${p.title}</h4>
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
      <div class="flex items-center gap-2 mb-4 max-w-sm mx-auto justify-center">
        <button data-food-sub="mixes" class="gel-btn ${
          state.foodSubTab === 'mixes' ? 'gel-yellow' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          🥣 Seed Mixes
        </button>
        <button data-food-sub="fresh" class="gel-btn ${
          state.foodSubTab === 'fresh' ? 'gel-green' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
          🥗 Fresh Foods
        </button>
        <button data-food-sub="toxic" class="gel-btn ${
          state.foodSubTab === 'toxic' ? 'gel-red' : 'gel-silver'
        } px-4 py-1.5 text-xs font-black">
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
          <div class="web2-card p-4 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap gap-1 mb-2">
                ${p.badges.map(b => `
                  <span class="gel-badge ${
                    b.includes('Favourite') || b.includes('Hope')
                      ? 'gel-yellow'
                      : 'gel-green'
                  }">${b}</span>
                `).join('')}
              </div>
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider">${p.brand} • ${p.retailer}</div>
              <h4 class="font-black text-base text-slate-900 font-heading mt-0.5 mb-1 leading-snug">${p.name}</h4>
              <p class="text-xs font-medium text-slate-600 leading-relaxed mb-3">${p.summary}</p>

              <div class="flex flex-wrap items-center gap-1 mb-3">
                <span class="text-[10px] font-bold text-slate-400">Suitable For:</span>
                ${p.species.map(sp => `
                  <span class="text-[10px] px-2 py-0.5 rounded-full border border-sky-200 bg-sky-50 text-sky-900 font-bold capitalize">
                    ${sp.replace('_', ' ')}
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div class="text-[9px] font-black text-slate-400 uppercase">Price Guide</div>
                <div class="text-base font-black text-slate-900 font-heading">${p.priceGuide}</div>
              </div>

              <a 
                href="${p.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="gel-btn gel-orange px-4 py-1.5 text-xs font-black shadow-md flex items-center gap-1">
                <span>Buy Mix ↗</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Scatter Feed Pill -->
      <div class="web2-card p-3.5 bg-amber-50/60 border-amber-200 text-xs text-slate-700 font-medium">
        <strong class="font-black text-slate-900">💡 Scatter Feed Tip:</strong> Ditch the food bowl! Scatter 1–2 tablespoons of seeds across deep bedding every 1–2 days. It burns energy, eliminates boredom, and lets hamsters pouch like they do in the wild.
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
        <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
        <input 
          type="text" 
          id="food-search-input" 
          value="${state.foodSearch}"
          placeholder="Search fresh vegetables, proteins, treats..."
          class="w-full bg-white border border-sky-300 rounded-2xl pl-10 pr-8 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-xs">
        ${state.foodSearch ? `
          <button id="clear-food-search" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900 font-black text-xs">✕</button>
        ` : ''}
      </div>

      <div class="space-y-2.5">
        ${filtered.map(food => {
          const isSafe = food.status === 'SAFE';
          return `
            <div class="web2-card p-4">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-black text-base text-slate-900 font-heading">${food.name}</h4>
                <span class="gel-badge ${isSafe ? 'gel-green' : 'gel-yellow'}">
                  ${isSafe ? '🟢 Safe' : '🟡 Caution'}
                </span>
              </div>
              <p class="text-xs font-medium text-slate-600 leading-relaxed mb-2.5">${food.details}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] pt-2 border-t border-slate-100 font-medium">
                <div class="text-slate-700"><strong>Portion:</strong> ${food.portionGuide}</div>
                <div class="text-slate-700"><strong>Prep:</strong> ${food.prepInstructions}</div>
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
      <div class="web2-card p-4 border-rose-300 bg-rose-50/60 text-xs">
        <h3 class="font-black text-base text-rose-950 font-heading mb-1">⚠️ Strictly Forbidden Toxic Foods!</h3>
        <p class="text-[11px] text-slate-600 font-medium leading-relaxed">
          These items contain toxic compounds (cyanide, allium, solanine, theobromine) or pose fatal gastrointestinal blockages. Never feed these!
        </p>
      </div>

      <div class="space-y-2.5">
        ${toxicFoods.map(food => `
          <div class="web2-card p-4 border-rose-200">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-black text-base text-slate-900 font-heading">${food.name}</h4>
              <span class="gel-badge gel-red">
                🔴 Forbidden
              </span>
            </div>
            <p class="text-xs font-medium text-rose-950 leading-relaxed mb-1.5">${food.details}</p>
            <div class="text-[11px] text-slate-600 pt-1.5 border-t border-slate-100 font-medium">
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
// 3. ETHICAL SHOP (2000s Web 2.0 Style)
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
        <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
        <input 
          type="text" 
          id="shop-search-input" 
          value="${state.shopSearch}"
          placeholder="Search verified cages, wheels, mixes..."
          class="w-full bg-white border border-sky-300 rounded-2xl pl-10 pr-8 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-xs">
        ${state.shopSearch ? `
          <button id="clear-shop-search" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900 font-black text-xs">✕</button>
        ` : ''}
      </div>

      <!-- Horizontal Scroll Category Chips (Noughties Gloss Pills) -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        ${categories.map(c => `
          <button 
            data-cat-btn="${c.id}"
            class="gel-btn ${
              state.shopCategory === c.id ? 'gel-orange' : 'gel-silver'
            } px-3.5 py-1 text-xs font-black whitespace-nowrap">
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Products Grid -->
      ${filtered.length === 0 ? `
        <div class="web2-card p-8 text-center my-6">
          <p class="text-xs font-medium text-slate-500">No matching items found. Try clearing your search.</p>
          <button id="reset-shop-filters" class="mt-3 gel-btn gel-yellow px-4 py-1.5 text-xs font-black">Clear Filters</button>
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${filtered.map(p => `
            <div class="web2-card p-4 flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap gap-1 mb-2">
                  ${p.badges.map(b => `
                    <span class="gel-badge ${
                      b.includes('India') || b.includes('Profits')
                        ? 'gel-pink'
                        : b.includes('Hope')
                        ? 'gel-green'
                        : b.includes('Favourite')
                        ? 'gel-yellow'
                        : 'gel-blue'
                    }">${b}</span>
                  `).join('')}
                </div>

                <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider">${p.brand} • ${p.retailer}</div>
                <h4 class="font-black text-base text-slate-900 font-heading mt-0.5 mb-1 leading-snug">${p.name}</h4>
                <p class="text-xs font-medium text-slate-600 leading-relaxed mb-3">${p.summary}</p>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div class="text-[9px] font-black text-slate-400 uppercase">Price Guide</div>
                  <div class="text-sm font-black text-slate-900 font-heading">${p.priceGuide}</div>
                </div>

                <a 
                  href="${p.url}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="gel-btn gel-orange px-3.5 py-1.5 text-xs font-black shadow-md flex items-center gap-1">
                  <span>Buy From Seller ↗</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `}

      <div class="text-center text-[10px] font-bold text-slate-400 pt-3">
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
      <!-- 2000s Progress Score Panel -->
      <div class="web2-card p-4.5 bg-gradient-to-br from-pink-50 via-white to-sky-50 border-pink-200">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="font-black text-base text-slate-900 font-heading">Adoption Readiness Score ✨</h3>
            <p class="text-[11px] font-bold text-slate-500">Official UK Rescue Vetting Criteria</p>
          </div>
          <span class="text-2xl font-black text-pink-700 font-heading">${percent}%</span>
        </div>

        <!-- 2000s Glossy Progress Bar -->
        <div class="w-full bg-slate-100 border border-slate-300 rounded-full h-4 p-0.5 overflow-hidden shadow-inner">
          <div class="h-full rounded-full transition-all duration-300 gel-orange" style="width: ${percent}%"></div>
        </div>

        <div class="text-[11px] font-bold text-slate-600 mt-2 flex items-center justify-between">
          <span>${checkedCount} of ${total} requirements satisfied</span>
          ${percent === 100 ? '<span class="gel-badge gel-green">🎉 100% Rescue Ready!</span>' : ''}
        </div>
      </div>

      <!-- Checklist Items -->
      <div class="space-y-2.5">
        ${adoptionChecklist.map(item => {
          const isChecked = !!state.checkedItems[item.id];
          return `
            <label class="web2-card p-3.5 flex items-start gap-3 cursor-pointer select-none transition-all ${
              isChecked ? 'bg-sky-50/40 border-sky-300' : ''
            }">
              <input 
                type="checkbox" 
                data-check-id="${item.id}"
                ${isChecked ? 'checked' : ''}
                class="mt-1 w-5 h-5 rounded-md text-amber-500 focus:ring-amber-400 border-slate-300 accent-amber-500">
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <h4 class="font-black text-xs text-slate-900 font-heading">${item.title}</h4>
                  <span class="gel-badge gel-yellow">${item.badge}</span>
                </div>
                <p class="text-xs font-medium text-slate-600 mt-0.5 leading-relaxed">${item.description}</p>
              </div>
            </label>
          `;
        }).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-2 pt-2">
        <button id="copy-summary-btn" class="flex-1 py-2.5 gel-btn gel-orange text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5">
          <i data-lucide="copy" class="w-4 h-4"></i>
          <span>Copy Adoption Summary</span>
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
    { id: 'all', label: 'All Rescues (16+)' },
    { id: 'England', label: 'England' },
    { id: 'Wales', label: 'Wales' },
    { id: 'Scotland', label: 'Scotland' }
  ];

  main.innerHTML = `
    <div class="space-y-3">
      <!-- Rescue Header Banner -->
      <div class="web2-card p-3.5 bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border-purple-200">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xl">🏡</span>
          <h3 class="font-black text-sm text-purple-950 font-heading">Verified Ethical UK Rescue Network</h3>
        </div>
        <p class="text-xs font-medium text-slate-700 leading-relaxed">
          Adopt, don't shop! Every foster rescue listed here upholds ethical 100x50cm habitats, veterinary care, and species-appropriate setups.
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
      <div class="space-y-3">
        ${filtered.map(r => {
          const charityText = r.charityNumber.startsWith('1') || r.charityNumber.startsWith('2') || r.charityNumber.startsWith('SC') 
            ? `Charity #${r.charityNumber}` 
            : r.charityNumber;
          const targetUrl = r.adoptUrl || r.website || r.url || '#';
          const donationUrl = r.donateUrl || r.website || '#';
          const details = r.speciality || r.summary || '';
          const locationText = r.locations || r.coverage || r.region;
          const badges = r.badges || [];

          return `
            <div class="web2-card p-4">
              <div class="flex flex-wrap items-center gap-1 mb-2">
                ${badges.map(b => `
                  <span class="gel-badge ${
                    b.includes('Partner') || b.includes('1213919') 
                      ? 'gel-yellow' 
                      : b.includes('Charity') || b.includes('Standard')
                      ? 'gel-purple'
                      : 'gel-blue'
                  }">${b}</span>
                `).join('')}
              </div>

              <div class="flex items-start justify-between gap-2 mb-1">
                <div>
                  <h4 class="font-black text-base text-slate-900 font-heading">${r.name}</h4>
                  <div class="text-[11px] font-bold text-purple-800">${charityText} • ${r.region}</div>
                </div>
              </div>

              <div class="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1">
                <span>📍</span>
                <span>${locationText}</span>
              </div>

              <p class="text-xs font-medium text-slate-600 leading-relaxed mb-3">${details}</p>

              <div class="flex items-center gap-2 pt-2.5 border-t border-slate-100">
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
