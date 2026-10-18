// For the Hams! Mobile Web App Logic
// www.forthehams.co.uk | UK Ethical Hamster Care & Rescue Standards

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

// Application Bootstrap
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

    if (tab === state.activeTab) {
      if (iconBg) {
        iconBg.classList.add('bg-amber-100', 'text-amber-800');
        iconBg.classList.remove('text-stone-400');
      }
      if (label) {
        label.classList.add('text-amber-900', 'font-bold');
        label.classList.remove('text-stone-400');
      }
    } else {
      if (iconBg) {
        iconBg.classList.remove('bg-amber-100', 'text-amber-800');
        iconBg.classList.add('text-stone-400');
      }
      if (label) {
        label.classList.remove('text-amber-900', 'font-bold');
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

  if (closeBtn) {
    closeBtn.addEventListener('click', closeBottomSheet);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeBottomSheet();
      }
    });
  }

  // Escape key to dismiss
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBottomSheet();
  });
}

// Species Filter Carousel
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
    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-3xl mx-auto">
      <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 pl-1 mr-1">Filter:</span>
      ${speciesOptions.map(opt => `
        <button 
          data-species-btn="${opt.id}"
          class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 flex items-center gap-1 ${
            state.currentSpecies === opt.id
              ? 'bg-amber-600 text-white shadow-xs font-bold ring-2 ring-amber-300 ring-offset-1'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }">
          <span>${opt.emoji}</span>
          <span>${opt.name}</span>
        </button>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('[data-species-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentSpecies = btn.getAttribute('data-species-btn');
      renderSpeciesBar();
      renderSpeciesDetailBanner();
      // Re-render views affected by species
      if (state.activeTab === 'shop') renderShop();
      if (state.activeTab === 'food') renderFoodHub();
      if (state.activeTab === 'guides') renderCareGuides();
    });
  });

  renderSpeciesDetailBanner();
}

// Species Metric Quick Card (Mobile-friendly summary)
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
    <div class="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-3.5 my-2 shadow-xs">
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="flex items-center gap-1.5">
            <span class="text-sm font-black text-amber-950">${spec.name}</span>
            <span class="text-[11px] font-mono italic text-stone-500">(${spec.scientificName})</span>
          </div>
          <p class="text-xs text-stone-700 mt-0.5 line-clamp-2">${spec.summary}</p>
        </div>
        <button id="close-species-banner" class="text-stone-400 hover:text-stone-700 p-1 text-xs font-bold">✕</button>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-amber-200/60 text-xs">
        <div class="bg-white/80 rounded-xl p-2 border border-amber-100">
          <div class="text-[10px] font-bold text-amber-800 uppercase">Min Wheel</div>
          <div class="font-extrabold text-stone-900">${spec.careMatrix.minWheelDiameter}</div>
        </div>

        <div class="bg-white/80 rounded-xl p-2 border border-amber-100">
          <div class="text-[10px] font-bold text-amber-800 uppercase">Min Cage</div>
          <div class="font-extrabold text-stone-900">${spec.careMatrix.minCageFloorSpace}</div>
        </div>

        <div class="bg-white/80 rounded-xl p-2 border border-amber-100">
          <div class="text-[10px] font-bold text-amber-800 uppercase">Social Housing</div>
          <div class="font-extrabold text-rose-700">${spec.careMatrix.socialStatus}</div>
        </div>

        <div class="bg-white/80 rounded-xl p-2 border border-amber-100">
          <div class="text-[10px] font-bold text-amber-800 uppercase">Sand Bath Area</div>
          <div class="font-extrabold text-stone-900">${spec.careMatrix.sandBathNeeds}</div>
        </div>
      </div>

      <!-- Diabetes & Diet Warning -->
      <div class="mt-2 text-[11px] text-amber-900 flex items-center gap-1">
        <span class="font-bold">⚠️ Diet Advisory:</span>
        <span>${spec.careMatrix.diabetesRisk}</span>
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
// 1. CARE GUIDES (with Unsafe & Inspo sub-views)
// ==========================================
function renderCareGuides() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div>
      <!-- Sub-Tab Switcher -->
      <div class="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl mb-4 max-w-sm mx-auto">
        <button data-guide-sub="core" class="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
          state.guidesSubTab === 'core' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
        }">
          📖 Core Care
        </button>
        <button data-guide-sub="unsafe" class="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
          state.guidesSubTab === 'unsafe' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:text-rose-900'
        }">
          🛑 Unsafe Items
        </button>
        <button data-guide-sub="inspiration" class="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
          state.guidesSubTab === 'inspiration' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
        }">
          📸 Inspo Gallery
        </button>
      </div>

      <!-- Render Sub-View -->
      ${state.guidesSubTab === 'core' ? renderCoreGuidesView() : ''}
      ${state.guidesSubTab === 'unsafe' ? renderUnsafeView() : ''}
      ${state.guidesSubTab === 'inspiration' ? renderInspirationView() : ''}
    </div>
  `;

  // Attach sub-tab handlers
  document.querySelectorAll('[data-guide-sub]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.guidesSubTab = btn.getAttribute('data-guide-sub');
      renderCareGuides();
    });
  });

  // Attach guide bottom-sheet openers
  document.querySelectorAll('[data-open-guide]').forEach(card => {
    card.addEventListener('click', () => {
      const guideId = card.getAttribute('data-open-guide');
      const guide = careGuides.find(g => g.id === guideId);
      if (guide) {
        openBottomSheet(
          guide.title,
          `
            <div class="guide-content">
              <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-3">${guide.badge}</span>
              ${guide.content}
            </div>
          `
        );
      }
    });
  });
}

function renderCoreGuidesView() {
  return `
    <div class="space-y-3">
      <!-- Rescue Partnership Note -->
      <div class="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-3.5 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <span class="text-lg">🌿</span>
          <div>
            <span class="font-bold text-amber-950">UK Rescue Vetted Care</span>
            <p class="text-[11px] text-stone-600">Synthesized from India's Hamster Rescue (#1213919) and UK rescue networks.</p>
          </div>
        </div>
      </div>

      <!-- Guides List Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${careGuides.map(guide => `
          <div data-open-guide="${guide.id}" class="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-xs hover:border-amber-400 active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">${guide.badge}</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-stone-400"></i>
              </div>
              <h3 class="font-extrabold text-sm text-stone-900 leading-snug mb-1">${guide.title}</h3>
              <p class="text-xs text-stone-600 line-clamp-2 leading-relaxed">${guide.summary}</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-stone-100 flex items-center text-[11px] font-bold text-amber-700">
              <span>Read Full Rescue Guide</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderUnsafeView() {
  return `
    <div class="space-y-3">
      <div class="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-900 mb-2">
        <h3 class="font-black text-sm text-rose-950 mb-0.5 flex items-center gap-1.5">
          <span>🛑</span>
          <span>Unsafe Items Hall of Shame</span>
        </h3>
        <p class="text-[11px] leading-relaxed">
          Common items marketed to hamsters in UK pet shops that cause fatal injuries, respiratory disease, or severe chronic stress.
        </p>
      </div>

      <div class="space-y-3">
        ${unsafeItems.map(item => `
          <div class="bg-white rounded-2xl border border-rose-200 p-4 shadow-xs">
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white tracking-wider uppercase">${item.badge}</span>
              <span class="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">Banned by Rescues</span>
            </div>
            <h4 class="font-black text-stone-900 text-sm mb-1">${item.name}</h4>
            <p class="text-xs text-stone-600 leading-relaxed mb-2">${item.danger}</p>
            <div class="bg-rose-50/70 rounded-xl p-2.5 text-xs text-rose-900">
              <span class="font-bold">⚠️ Veterinary Risk:</span> ${item.vetExplanation}
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
      <div class="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-3.5 text-xs">
        <h3 class="font-bold text-amber-950 text-sm">Real UK Rescue Foster Setups</h3>
        <p class="text-[11px] text-stone-600 mt-0.5">Real foster home enclosures from India's Hamster Rescue showcasing safe bedding depth, clutter, and stilts.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${photos.map(p => `
          <div class="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
            <div class="relative h-48 bg-stone-100 overflow-hidden">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy">
            </div>
            <div class="p-3.5">
              <h4 class="font-extrabold text-sm text-stone-900">${p.title}</h4>
              <div class="text-[11px] font-bold text-amber-700 mb-1">${p.subtitle}</div>
              <p class="text-xs text-stone-600 leading-relaxed">${p.details}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// 2. FOOD HUB (Mixes, Fresh Foods, Toxic Lookup)
// ==========================================
function renderFoodHub() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div>
      <!-- Food Hub Segmented Switcher -->
      <div class="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl mb-4 max-w-sm mx-auto">
        <button data-food-sub="mixes" class="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
          state.foodSubTab === 'mixes' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
        }">
          🥣 Approved Mixes
        </button>
        <button data-food-sub="fresh" class="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
          state.foodSubTab === 'fresh' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
        }">
          🥗 Fresh Staples
        </button>
        <button data-food-sub="toxic" class="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
          state.foodSubTab === 'toxic' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:text-rose-900'
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
  // Filter mixes by active species
  const mixes = products.filter(p => {
    if (p.category !== 'food_mixes') return false;
    if (state.currentSpecies !== 'all' && !p.species.includes(state.currentSpecies)) return false;
    return true;
  });

  return `
    <div class="space-y-4">
      <!-- 48-Hour Freezer Protocol Alert -->
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
        <div class="flex items-start gap-2.5">
          <span class="text-2xl">❄️</span>
          <div>
            <h3 class="font-extrabold text-sm text-amber-950">The 48-Hour Freezer Protocol</h3>
            <p class="text-xs text-amber-900/90 leading-relaxed mt-0.5">
              High-welfare seed mixes and natural sprays are 100% pesticide-free, meaning harmless grain mite eggs can hatch in warm houses. <strong>Always freeze new bags of food for 48 hours</strong> upon delivery to safely terminate any eggs. Let food return to room temperature before feeding.
            </p>
          </div>
        </div>
      </div>

      <!-- Species Nutrition Standards -->
      <div class="bg-white rounded-2xl border border-stone-200 p-3.5 text-xs text-stone-700">
        <div class="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
          <span>🌾</span>
          <span>Why Pellet-Free Mueslis Matter</span>
        </div>
        <p class="text-stone-600 text-[11px] leading-relaxed">
          Standard pet store mixes (like Harry Hamster) contain dyed sugary biscuits and hard pellets that hamsters leave behind. High-welfare seed mixes use 25+ real whole grains, grass seeds, and dried mealworms with <strong>15–18% protein</strong> (18–22% for young hams) and <strong>zero fruit/sugar for dwarfs</strong>.
        </p>
      </div>

      <!-- Mix Cards Grid -->
      <div class="space-y-3">
        ${mixes.map(p => `
          <div class="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap gap-1 mb-1.5">
                ${p.badges.map(b => `
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    b.includes('Favourite') || b.includes('Hope')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }">${b}</span>
                `).join('')}
              </div>
              <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">${p.brand} • ${p.retailer}</div>
              <h4 class="font-black text-sm text-stone-900 mt-0.5 mb-1 leading-snug">${p.name}</h4>
              <p class="text-xs text-stone-600 leading-relaxed mb-3">${p.summary}</p>

              <div class="flex flex-wrap items-center gap-1 mb-3">
                <span class="text-[10px] text-stone-400">Suitable For:</span>
                ${p.species.map(sp => `
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-medium capitalize">
                    ${sp.replace('_', ' ')}
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="pt-2.5 border-t border-stone-100 flex items-center justify-between">
              <div>
                <div class="text-[10px] text-stone-400">Price Guide</div>
                <div class="text-sm font-black text-stone-900">${p.priceGuide}</div>
              </div>

              <a 
                href="${p.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs flex items-center gap-1">
                <span>Buy Mix ↗</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Scatter Feeding Tip -->
      <div class="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-xs text-stone-600">
        <span class="font-bold text-stone-800">💡 Feeding Advice:</span> Never use a food bowl! Scatter 1–2 level tablespoons of seed mix directly around the cage bedding every 1–2 days. This provides essential foraging enrichment and satisfies pouching instincts.
      </div>
    </div>
  `;
}

function renderFreshFoodsView() {
  const safeFoods = foodDatabase.filter(f => f.status === 'SAFE' || f.status === 'CAUTION_DIABETES');

  // Search filter
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
        <i data-lucide="search" class="w-4 h-4 text-stone-400 absolute left-3 top-2.5"></i>
        <input 
          type="text" 
          id="food-search-input" 
          value="${state.foodSearch}"
          placeholder="Search fresh vegetables, proteins, treats..."
          class="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500">
        ${state.foodSearch ? `
          <button id="clear-food-search" class="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 text-xs font-bold">✕</button>
        ` : ''}
      </div>

      <div class="space-y-2.5">
        ${filtered.map(food => `
          <div class="bg-white rounded-2xl border ${
            food.status === 'SAFE' ? 'border-emerald-200/80' : 'border-amber-200/80'
          } p-3.5 shadow-xs">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-extrabold text-sm text-stone-900">${food.name}</h4>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                food.status === 'SAFE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
              }">
                ${food.status === 'SAFE' ? '🟢 Safe Staple' : '🟡 Caution / Diabetes'}
              </span>
            </div>
            <p class="text-xs text-stone-600 leading-relaxed mb-2">${food.details}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] pt-2 border-t border-stone-100">
              <div class="text-stone-700"><strong>Portion:</strong> ${food.portionGuide}</div>
              <div class="text-stone-700"><strong>Prep:</strong> ${food.prepInstructions}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderToxicFoodsView() {
  const toxicFoods = foodDatabase.filter(f => f.status === 'TOXIC');

  return `
    <div class="space-y-3">
      <div class="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-900">
        <h3 class="font-black text-sm text-rose-950 mb-0.5">⚠️ Strictly Forbidden & Toxic Foods</h3>
        <p class="text-[11px] leading-relaxed">
          These items are dangerous or fatal to hamsters due to toxic chemical compounds (allium, cyanide, solanine, persin, theobromine) or severe choking hazards.
        </p>
      </div>

      <div class="space-y-2.5">
        ${toxicFoods.map(food => `
          <div class="bg-white rounded-2xl border border-rose-200 p-3.5 shadow-xs">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-extrabold text-sm text-stone-900">${food.name}</h4>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white uppercase tracking-wider">
                🔴 Strictly Forbidden
              </span>
            </div>
            <p class="text-xs text-rose-900/90 leading-relaxed mb-1.5">${food.details}</p>
            <div class="text-[11px] text-stone-600 pt-1.5 border-t border-stone-100">
              <strong>Why Dangerous:</strong> ${food.prepInstructions}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Attach food input listener
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
// 3. ETHICAL SHOP & PRODUCT DIRECTORY
// ==========================================
function renderShop() {
  const main = document.getElementById('main-tab-content');

  // Filter products
  const filtered = products.filter(p => {
    // Species filter
    if (state.currentSpecies !== 'all' && !p.species.includes(state.currentSpecies)) return false;
    // Category filter
    if (state.shopCategory !== 'all' && p.category !== state.shopCategory) return false;
    // Retailer filter
    if (state.shopRetailer !== 'all' && !p.retailer.toLowerCase().includes(state.shopRetailer.toLowerCase())) return false;
    // Search query
    if (state.shopSearch.trim()) {
      const q = state.shopSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'food_mixes', label: '🥣 Seed Mixes' },
    { id: 'enclosures', label: '🏠 Enclosures' },
    { id: 'wheels', label: '🎡 Wheels' },
    { id: 'bedding', label: '🛏️ Bedding' },
    { id: 'substrates', label: '🪵 Substrates' },
    { id: 'sand', label: '🏖️ Sand Baths' },
    { id: 'hides', label: '🏡 Hides' },
    { id: 'forage', label: '🌾 Forage & Sprays' }
  ];

  main.innerHTML = `
    <div class="space-y-3">
      <!-- Search Input -->
      <div class="relative">
        <i data-lucide="search" class="w-4 h-4 text-stone-400 absolute left-3 top-2.5"></i>
        <input 
          type="text" 
          id="shop-search-input" 
          value="${state.shopSearch}"
          placeholder="Search verified products, brands, or retailers..."
          class="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500">
        ${state.shopSearch ? `
          <button id="clear-shop-search" class="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 text-xs font-bold">✕</button>
        ` : ''}
      </div>

      <!-- Horizontal Scroll Category Chips -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        ${categories.map(c => `
          <button 
            data-cat-btn="${c.id}"
            class="px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
              state.shopCategory === c.id
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }">
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Product Cards List -->
      ${filtered.length === 0 ? `
        <div class="bg-white rounded-2xl border border-stone-200 p-8 text-center my-6">
          <p class="text-xs text-stone-500">No matching products found. Try clearing your filters.</p>
          <button id="reset-shop-filters" class="mt-3 px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-xl">Clear Filters</button>
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${filtered.map(p => `
            <div class="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap gap-1 mb-1.5">
                  ${p.badges.map(b => `
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      b.includes('India') || b.includes('Profits')
                        ? 'bg-rose-100 text-rose-800'
                        : b.includes('Hope')
                        ? 'bg-emerald-100 text-emerald-800'
                        : b.includes('Favourite')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-100 text-stone-700'
                    }">${b}</span>
                  `).join('')}
                </div>

                <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">${p.brand} • ${p.retailer}</div>
                <h4 class="font-black text-sm text-stone-900 mt-0.5 mb-1 leading-snug">${p.name}</h4>
                <p class="text-xs text-stone-600 leading-relaxed mb-3">${p.summary}</p>
              </div>

              <div class="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div class="text-[10px] text-stone-400">Price Guide</div>
                  <div class="text-sm font-black text-stone-900">${p.priceGuide}</div>
                </div>

                <a 
                  href="${p.url}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center gap-1 transition-colors">
                  <span>Buy From Seller ↗</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `}

      <div class="text-center text-[10px] text-stone-400 pt-3">
        UK ASA Disclosure: Vetted against rescue standards. Some merchant links may support charity operations.
      </div>
    </div>
  `;

  // Attach shop category listeners
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
      <!-- Progress Bar Card -->
      <div class="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="font-black text-sm text-stone-900">Adoption Readiness Score</h3>
            <p class="text-[11px] text-stone-500">Meets UK Hamster Rescue vetting criteria</p>
          </div>
          <span class="text-lg font-black text-amber-700">${percent}%</span>
        </div>

        <div class="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
          <div class="bg-gradient-to-r from-amber-500 to-amber-600 h-2.5 rounded-full transition-all duration-300" style="width: ${percent}%"></div>
        </div>

        <div class="text-[11px] text-stone-600 mt-2 flex items-center justify-between">
          <span>${checkedCount} of ${total} requirements satisfied</span>
          ${percent === 100 ? '<span class="text-emerald-700 font-bold">🎉 Rescue Vetting Ready!</span>' : ''}
        </div>
      </div>

      <!-- Checklist Items -->
      <div class="space-y-2.5">
        ${adoptionChecklist.map(item => {
          const isChecked = !!state.checkedItems[item.id];
          return `
            <label class="bg-white rounded-2xl border ${
              isChecked ? 'border-amber-300 bg-amber-50/30' : 'border-stone-200'
            } p-3.5 shadow-xs flex items-start gap-3 cursor-pointer select-none transition-all">
              <input 
                type="checkbox" 
                data-check-id="${item.id}"
                ${isChecked ? 'checked' : ''}
                class="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300">
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-xs text-stone-900">${item.title}</h4>
                  <span class="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">${item.badge}</span>
                </div>
                <p class="text-xs text-stone-600 mt-0.5 leading-relaxed">${item.description}</p>
              </div>
            </label>
          `;
        }).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-2 pt-2">
        <button id="copy-summary-btn" class="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5">
          <i data-lucide="copy" class="w-4 h-4"></i>
          <span>Copy Adoption Summary</span>
        </button>
        <button id="reset-checklist-btn" class="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors">
          Reset
        </button>
      </div>
    </div>
  `;

  // Checklist item toggle listeners
  document.querySelectorAll('[data-check-id]').forEach(input => {
    input.addEventListener('change', () => {
      const id = input.getAttribute('data-check-id');
      state.checkedItems[id] = input.checked;
      localStorage.setItem('fth_checklist', JSON.stringify(state.checkedItems));

      // Trigger confetti if hit 100%
      const newCheckedCount = Object.values(state.checkedItems).filter(Boolean).length;
      if (newCheckedCount === total && typeof confetti === 'function') {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
      }

      renderChecklist();
    });
  });

  // Copy summary handler
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
      if (btn) btn.innerHTML = `<span>✓ Copied to Clipboard!</span>`;
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
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        ${regions.map(reg => `
          <button 
            data-region-btn="${reg.id}"
            class="px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
              state.rescueRegion === reg.id
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }">
            ${reg.label}
          </button>
        `).join('')}
      </div>

      <!-- Rescues Grid -->
      <div class="space-y-3">
        ${filtered.map(r => `
          <div class="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs">
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h4 class="font-black text-sm text-stone-900">${r.name}</h4>
                <div class="text-[11px] font-semibold text-amber-800">${r.charityNumber} • ${r.coverage}</div>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60 shrink-0">
                ${r.region}
              </span>
            </div>

            <p class="text-xs text-stone-600 leading-relaxed mb-3">${r.summary}</p>

            <div class="flex items-center gap-2 pt-2.5 border-t border-stone-100">
              <a 
                href="${r.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors">
                Apply to Adopt ↗
              </a>
              <a 
                href="${r.donateUrl}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors">
                Donate
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
