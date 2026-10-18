// For the Hams! Main Application Logic
// www.forthehams.co.uk

import { speciesList } from './data/species.js';
import { careGuides } from './data/guides.js';
import { unsafeItems } from './data/unsafe.js';
import { products } from './data/products.js';
import { foodDatabase } from './data/foods.js';
import { rescuesList } from './data/rescues.js';
import { adoptionChecklist } from './data/checklist.js';

// Application State
const state = {
  currentSpecies: 'all', // 'all' or species id
  activeTab: 'guides',   // 'guides' | 'unsafe' | 'shop' | 'food' | 'checklist' | 'rescues' | 'inspiration'
  activeGuideId: 'enclosures',
  foodSearch: '',
  foodFilter: 'all',     // 'all' | 'SAFE' | 'CAUTION_DIABETES' | 'TOXIC' | 'vegetables' | 'fruits'
  shopCategory: 'all',
  shopRetailer: 'all',
  shopSearch: '',
  rescueRegion: 'all',
  checkedItems: JSON.parse(localStorage.getItem('fth_checklist') || '{}')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initRouting();
  renderSpeciesBar();
  renderCurrentTab();
  setupEventListeners();
  updateIcons();
});

// Hash routing support
function initRouting() {
  const hash = window.location.hash.replace('#', '');
  if (['guides', 'unsafe', 'shop', 'food', 'checklist', 'rescues', 'inspiration'].includes(hash)) {
    state.activeTab = hash;
  }
  updateNavState();
}

function updateNavState() {
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    const tab = btn.getAttribute('data-nav-tab');
    if (tab === state.activeTab) {
      btn.classList.add('bg-amber-100', 'text-amber-900', 'font-bold');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-amber-100', 'text-amber-900', 'font-bold');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    }
  });
}

function setupEventListeners() {
  // Navigation tabs
  document.querySelectorAll('[data-nav-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-nav-tab');
      state.activeTab = tab;
      window.location.hash = tab;
      updateNavState();
      renderCurrentTab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // Close mobile menu on tab click
    mobileMenu.querySelectorAll('[data-nav-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Render Species Filter Selector Bar
function renderSpeciesBar() {
  const container = document.getElementById('species-filter-container');
  if (!container) return;

  const speciesOptions = [
    { id: 'all', name: '🐹 All Species / General Care' },
    ...speciesList.map(s => ({ id: s.id, name: s.name }))
  ];

  container.innerHTML = `
    <div class="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
      <span class="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap pl-1">Species Filter:</span>
      ${speciesOptions.map(opt => `
        <button 
          data-species-btn="${opt.id}"
          class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
            state.currentSpecies === opt.id
              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-600 ring-offset-1'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400 hover:bg-amber-50'
          }">
          ${opt.name}
        </button>
      `).join('')}
    </div>
  `;

  // Attach species click handlers
  container.querySelectorAll('[data-species-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentSpecies = btn.getAttribute('data-species-btn');
      renderSpeciesBar();
      renderSpeciesDetailBanner();
      // If currently on shop or guides, re-render to reflect species
      if (state.activeTab === 'shop') renderShop();
      if (state.activeTab === 'guides') renderCareGuides();
      if (state.activeTab === 'checklist') renderChecklist();
    });
  });

  renderSpeciesDetailBanner();
}

// Render prominent banner when a specific species is selected
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
    <div class="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border border-amber-200 rounded-2xl p-5 mb-8 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200 text-amber-900">${spec.badge}</span>
            <span class="text-xs italic text-slate-500 font-mono">${spec.scientificName}</span>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">${spec.name} Care Profile</h2>
          <p class="text-xs text-slate-600 mt-1 max-w-2xl">${spec.description}</p>
        </div>
        <button id="reset-species-btn" class="self-start md:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-800 bg-amber-200/80 hover:bg-amber-200 transition-colors">
          Clear Species Filter ✕
        </button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-amber-200/60">
        <div class="bg-white/80 p-3 rounded-xl border border-amber-100">
          <div class="text-[11px] font-bold text-slate-500 uppercase">Wheel Minimum</div>
          <div class="text-base font-extrabold text-amber-700">${spec.minWheelSize}</div>
          <div class="text-[11px] text-slate-600 mt-0.5">${spec.wheelNote}</div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-amber-100">
          <div class="text-[11px] font-bold text-slate-500 uppercase">Cage Baseline</div>
          <div class="text-base font-extrabold text-slate-900">100 x 50 x 50 cm</div>
          <div class="text-[11px] text-slate-600 mt-0.5">${spec.cageNote}</div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-amber-100">
          <div class="text-[11px] font-bold text-slate-500 uppercase">Social Housing</div>
          <div class="text-base font-extrabold text-rose-600">${spec.solitaryStatus}</div>
          <div class="text-[11px] text-slate-600 mt-0.5">${spec.solitaryNote}</div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-amber-100">
          <div class="text-[11px] font-bold text-slate-500 uppercase">Diet & Diabetes</div>
          <div class="text-base font-extrabold text-slate-900">Special Care</div>
          <div class="text-[11px] text-slate-600 mt-0.5">${spec.dietSpecial}</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('reset-species-btn')?.addEventListener('click', () => {
    state.currentSpecies = 'all';
    renderSpeciesBar();
    if (state.activeTab === 'shop') renderShop();
    if (state.activeTab === 'guides') renderCareGuides();
  });
}

// Router to render active tab content
function renderCurrentTab() {
  const main = document.getElementById('main-tab-content');
  if (!main) return;

  switch (state.activeTab) {
    case 'guides':
      renderCareGuides();
      break;
    case 'unsafe':
      renderUnsafeItems();
      break;
    case 'shop':
      renderShop();
      break;
    case 'food':
      renderFoodSafety();
      break;
    case 'checklist':
      renderChecklist();
      break;
    case 'rescues':
      renderRescues();
      break;
    case 'inspiration':
      renderInspiration();
      break;
    default:
      renderCareGuides();
  }

  updateIcons();
}

// --- 1. CARE GUIDES ---
function renderCareGuides() {
  const main = document.getElementById('main-tab-content');
  const activeGuide = careGuides.find(g => g.id === state.activeGuideId) || careGuides[0];

  main.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Sidebar Guide Selector -->
      <div class="lg:col-span-4 space-y-2">
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Welfare Care Guides</h3>
          <div class="space-y-1.5" id="guide-sidebar-links">
            ${careGuides.map(guide => `
              <button 
                data-guide-id="${guide.id}"
                class="w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-sm ${
                  guide.id === state.activeGuideId
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : 'bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-transparent hover:border-amber-200'
                }">
                <div class="flex items-center gap-2.5">
                  <i data-lucide="${guide.icon}" class="w-4 h-4"></i>
                  <span>${guide.title}</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full ${
                  guide.id === state.activeGuideId ? 'bg-amber-700/80 text-white' : 'bg-slate-200 text-slate-600'
                }">${guide.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Partnership Callout -->
        <div class="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4 text-xs text-teal-900">
          <div class="flex items-center gap-2 font-bold mb-1.5">
            <i data-lucide="heart" class="w-4 h-4 text-rose-500 fill-rose-500"></i>
            <span>India's Hamster Rescue Partnership</span>
          </div>
          <p class="text-teal-800 leading-relaxed">
            Content is verified in accordance with <strong>India's Hamster Rescue (Charity #1213919)</strong> standards and synthesized with top UK welfare rescues (Woodgreen, PDSA, Blue Cross).
          </p>
        </div>
      </div>

      <!-- Main Guide Reader -->
      <div class="lg:col-span-8">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm guide-content">
          <div class="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <i data-lucide="${activeGuide.icon}" class="w-4 h-4"></i>
            <span>${activeGuide.badge}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">${activeGuide.title}</h1>
          <p class="text-sm text-slate-500 pb-4 border-b border-slate-100">${activeGuide.summary}</p>

          <div class="mt-6 text-slate-700 leading-relaxed">
            ${activeGuide.content}
          </div>

          <div class="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span class="text-xs text-slate-500">Need rescue-approved items for this setup?</span>
            <button onclick="window.location.hash='shop'; document.querySelector('[data-nav-tab=shop]').click();" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>Browse Ethical Products</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Guide sidebar clicks
  document.querySelectorAll('[data-guide-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeGuideId = btn.getAttribute('data-guide-id');
      renderCareGuides();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  });
}

// --- 2. UNSAFE ITEMS HALL OF SHAME ---
function renderUnsafeItems() {
  const main = document.getElementById('main-tab-content');

  main.innerHTML = `
    <div class="max-w-5xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 uppercase tracking-wider">Veterinary Welfare Alert</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Unsafe Items Hall of Shame</h1>
        <p class="text-slate-600 text-sm mt-2">
          Unfortunately, high-street pet shops continue to sell dangerous products that cause trauma, limb amputations, and respiratory failure. Here are items strictly banned by UK rescues.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${unsafeItems.map(item => `
          <div class="bg-white rounded-2xl border border-rose-200/80 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-1.5 ${item.dangerLevel === 'FATAL' || item.dangerLevel === 'CRITICAL' ? 'bg-rose-600' : 'bg-amber-500'}"></div>
            
            <div class="flex items-center justify-between mb-3 pt-1">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">${item.category}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                item.dangerLevel === 'FATAL' 
                  ? 'bg-rose-600 text-white animate-pulse'
                  : item.dangerLevel === 'CRITICAL'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }">${item.dangerLevel} RISK</span>
            </div>

            <h3 class="text-lg font-bold text-slate-900 mb-1.5">${item.title}</h3>
            <p class="text-xs text-slate-600 mb-4">${item.description}</p>

            <div class="bg-rose-50/70 border border-rose-100 rounded-xl p-3 mb-4">
              <div class="text-[11px] font-bold text-rose-900 mb-1">Common Examples in UK Pet Stores:</div>
              <ul class="text-xs text-rose-800 space-y-1">
                ${item.examples.map(ex => `<li class="flex items-start gap-1.5"><span class="text-rose-500 font-bold">✕</span> <span>${ex}</span></li>`).join('')}
              </ul>
            </div>

            <div class="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span class="font-bold text-slate-900">Why Rescues Ban This:</span> ${item.whyDangerous}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// --- 3. PRODUCT DIRECTORY / SHOP ---
function renderShop() {
  const main = document.getElementById('main-tab-content');

  // Filter products by species, category, retailer, and search
  const filtered = products.filter(p => {
    // species filter
    if (state.currentSpecies !== 'all' && !p.species.includes(state.currentSpecies)) {
      return false;
    }
    // category filter
    if (state.shopCategory !== 'all' && p.category !== state.shopCategory) {
      return false;
    }
    // retailer filter
    if (state.shopRetailer !== 'all') {
      if (state.shopRetailer === 'hopes' && !p.retailer.toLowerCase().includes('hope')) return false;
      if (state.shopRetailer === 'indias' && !p.retailer.toLowerCase().includes('india')) return false;
      if (state.shopRetailer === 'amazon' && !p.retailer.toLowerCase().includes('amazon')) return false;
      if (state.shopRetailer === 'ikea' && !p.retailer.toLowerCase().includes('ikea')) return false;
      if (state.shopRetailer === 'petsathome' && !p.retailer.toLowerCase().includes('pets at home')) return false;
    }
    // search filter
    if (state.shopSearch.trim()) {
      const q = state.shopSearch.toLowerCase();
      const match = p.name.toLowerCase().includes(q) ||
                    p.brand.toLowerCase().includes(q) ||
                    p.summary.toLowerCase().includes(q) ||
                    p.badges.some(b => b.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'enclosures', name: 'Cages & Enclosures' },
    { id: 'wheels', name: 'Safe Wheels' },
    { id: 'bedding', name: 'Bedding & Substrates' },
    { id: 'sand', name: 'Sand & Baths' },
    { id: 'hides', name: 'Multi-Chambers & Hides' },
    { id: 'substrates', name: 'Dig Boxes & Textures' },
    { id: 'forage', name: 'Sprays & Healthy Forage' }
  ];

  main.innerHTML = `
    <div>
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">Ethical UK Catalog</span>
          <h1 class="text-3xl font-extrabold text-slate-900 mt-2">Ethical Hamster Product Library</h1>
          <p class="text-slate-600 text-sm mt-1">
            Every product is hand-vetted to meet UK rescue welfare baselines. Featuring small UK businesses, <strong>Hope's Healthy Treats</strong>, and <strong>India's Hamster Rescue Store</strong>.
          </p>
        </div>

        <div class="flex items-center gap-2 self-start md:self-auto">
          <input 
            type="text" 
            id="shop-search-input"
            value="${state.shopSearch}"
            placeholder="Search products or brands..." 
            class="px-3.5 py-2 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-60 shadow-sm"
          />
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        ${categories.map(cat => `
          <button 
            data-cat-btn="${cat.id}"
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              state.shopCategory === cat.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }">
            ${cat.name}
          </button>
        `).join('')}
      </div>

      <!-- Retailer Quick Filter Bar -->
      <div class="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 mb-6 flex flex-wrap items-center gap-2 text-xs">
        <span class="font-bold text-amber-900">Featured Stores:</span>
        <button data-retailer-btn="all" class="px-2.5 py-1 rounded-lg ${state.shopRetailer === 'all' ? 'bg-amber-700 text-white font-bold' : 'bg-white text-amber-900 border border-amber-200'}">All Retailers</button>
        <button data-retailer-btn="indias" class="px-2.5 py-1 rounded-lg ${state.shopRetailer === 'indias' ? 'bg-amber-700 text-white font-bold' : 'bg-white text-amber-900 border border-amber-200'}">India's Rescue Store 🛒</button>
        <button data-retailer-btn="hopes" class="px-2.5 py-1 rounded-lg ${state.shopRetailer === 'hopes' ? 'bg-amber-700 text-white font-bold' : 'bg-white text-amber-900 border border-amber-200'}">Hope's Healthy Treats 🌿</button>
        <button data-retailer-btn="ikea" class="px-2.5 py-1 rounded-lg ${state.shopRetailer === 'ikea' ? 'bg-amber-700 text-white font-bold' : 'bg-white text-amber-900 border border-amber-200'}">IKEA Hacks 🔨</button>
        <button data-retailer-btn="petsathome" class="px-2.5 py-1 rounded-lg ${state.shopRetailer === 'petsathome' ? 'bg-amber-700 text-white font-bold' : 'bg-white text-amber-900 border border-amber-200'}">Pets at Home (Safe Gems Only)</button>
      </div>

      <!-- Products Grid -->
      ${filtered.length === 0 ? `
        <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
          <i data-lucide="package-open" class="w-12 h-12 text-slate-300 mx-auto mb-3"></i>
          <h3 class="text-base font-bold text-slate-800">No matching products found</h3>
          <p class="text-xs text-slate-500 mt-1">Try resetting your filters or search terms.</p>
          <button id="reset-shop-filters" class="mt-4 px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl">Clear All Filters</button>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filtered.map(p => `
            <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <!-- Badges -->
                <div class="flex flex-wrap gap-1.5 mb-2.5">
                  ${p.badges.map(b => `
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      b.includes('Profits') || b.includes('India')
                        ? 'bg-rose-100 text-rose-800'
                        : b.includes('Favourite')
                        ? 'bg-amber-100 text-amber-800'
                        : b.includes('Hope')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }">${b}</span>
                  `).join('')}
                </div>

                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">${p.brand}</div>
                <h3 class="text-base font-bold text-slate-900 mb-1.5 leading-snug">${p.name}</h3>
                <p class="text-xs text-slate-600 mb-3 leading-relaxed">${p.summary}</p>
                
                <!-- Species suitability tags -->
                <div class="flex flex-wrap items-center gap-1 mb-4">
                  <span class="text-[10px] text-slate-400">Suitable For:</span>
                  ${p.species.map(sp => `
                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium capitalize">
                      ${sp.replace('_', ' ')}
                    </span>
                  `).join('')}
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                <div>
                  <div class="text-[10px] text-slate-400">Price Guide</div>
                  <div class="text-sm font-extrabold text-slate-900">${p.priceGuide}</div>
                </div>

                <a 
                  href="${p.url}" 
                  target="_blank" 
                  rel="noopener noreferrer sponsored"
                  class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm">
                  <span>Buy From Seller</span>
                  <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `}

      <div class="mt-8 text-center text-xs text-slate-400 border-t border-slate-200/60 pt-4">
        Disclaimer: As per UK ASA guidelines, some links may be affiliated. We only recommend products meeting strict UK rescue standards.
      </div>
    </div>
  `;

  // Attach shop listeners
  document.querySelectorAll('[data-cat-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.shopCategory = btn.getAttribute('data-cat-btn');
      renderShop();
    });
  });

  document.querySelectorAll('[data-retailer-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.shopRetailer = btn.getAttribute('data-retailer-btn');
      renderShop();
    });
  });

  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.shopSearch = e.target.value;
      renderShop();
      // Keep focus on input
      const newInput = document.getElementById('shop-search-input');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    });
  }

  document.getElementById('reset-shop-filters')?.addEventListener('click', () => {
    state.shopCategory = 'all';
    state.shopRetailer = 'all';
    state.shopSearch = '';
    renderShop();
  });
}

// --- 4. SAFE VS TOXIC FOOD SEARCH ENGINE ---
function renderFoodSafety() {
  const main = document.getElementById('main-tab-content');

  // Filter foods
  const filtered = foodDatabase.filter(food => {
    // Status / Category filter
    if (state.foodFilter !== 'all') {
      if (['SAFE', 'CAUTION_DIABETES', 'TOXIC'].includes(state.foodFilter)) {
        if (food.status !== state.foodFilter) return false;
      } else {
        if (food.category !== state.foodFilter) return false;
      }
    }

    // Search query
    if (state.foodSearch.trim()) {
      const q = state.foodSearch.toLowerCase();
      const match = food.name.toLowerCase().includes(q) ||
                    food.details.toLowerCase().includes(q) ||
                    food.speciesNotes.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  main.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-8">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">Nutrition & Safety Database</span>
        <h1 class="text-3xl font-extrabold text-slate-900 mt-2">Safe vs Toxic Food Checker</h1>
        <p class="text-slate-600 text-sm mt-1">
          Instantly look up any vegetable, fruit, protein, or plant to verify safety, portion limits, and diabetes risk by species.
        </p>
      </div>

      <!-- Search Bar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <div class="relative">
          <i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5"></i>
          <input 
            type="text" 
            id="food-search-input"
            value="${state.foodSearch}"
            placeholder="Type a food (e.g. apple, broccoli, onion, cucumber, spinach, banana)..."
            class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
          />
        </div>

        <div class="flex items-center gap-2 overflow-x-auto mt-3 pt-2 border-t border-slate-100 scrollbar-none text-xs">
          <span class="font-bold text-slate-400 whitespace-nowrap pl-1">Quick Filters:</span>
          <button data-food-btn="all" class="px-3 py-1 rounded-lg font-semibold ${state.foodFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}">All Foods</button>
          <button data-food-btn="SAFE" class="px-3 py-1 rounded-lg font-semibold ${state.foodFilter === 'SAFE' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">🟢 Safe Staples</button>
          <button data-food-btn="CAUTION_DIABETES" class="px-3 py-1 rounded-lg font-semibold ${state.foodFilter === 'CAUTION_DIABETES' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200'}">🟡 Caution / Dwarf Diabetes</button>
          <button data-food-btn="TOXIC" class="px-3 py-1 rounded-lg font-semibold ${state.foodFilter === 'TOXIC' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 border border-rose-200'}">🔴 Toxic / Banned</button>
        </div>
      </div>

      <!-- Food Results Cards -->
      <div class="space-y-3.5">
        ${filtered.map(food => {
          const isSafe = food.status === 'SAFE';
          const isCaution = food.status === 'CAUTION_DIABETES';
          const isToxic = food.status === 'TOXIC';

          return `
            <div class="bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition-all ${
              isToxic
                ? 'border-rose-200/90 bg-rose-50/20'
                : isCaution
                ? 'border-amber-200/90 bg-amber-50/20'
                : 'border-emerald-200/90 bg-emerald-50/10'
            }">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2.5">
                  <span class="w-3 h-3 rounded-full ${
                    isToxic ? 'bg-rose-600' : isCaution ? 'bg-amber-500' : 'bg-emerald-500'
                  }"></span>
                  <h3 class="text-base font-bold text-slate-900">${food.name}</h3>
                </div>

                <span class="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  isToxic
                    ? 'bg-rose-100 text-rose-900'
                    : isCaution
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-emerald-100 text-emerald-900'
                }">
                  ${isToxic ? 'Strictly Forbidden' : isCaution ? 'Caution / Species Specific' : 'Safe to Feed'}
                </span>
              </div>

              <div class="text-xs text-slate-600 leading-relaxed mb-3">
                ${food.details}
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-[11px]">
                <div class="text-slate-500">
                  <strong class="text-slate-700">Species Advice:</strong> ${food.speciesNotes}
                </div>
                <div class="text-slate-500">
                  <strong class="text-slate-700">Preparation:</strong> ${food.prep}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Listeners for food search
  const foodInput = document.getElementById('food-search-input');
  if (foodInput) {
    foodInput.addEventListener('input', (e) => {
      state.foodSearch = e.target.value;
      renderFoodSafety();
      const nextInput = document.getElementById('food-search-input');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    });
  }

  document.querySelectorAll('[data-food-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.foodFilter = btn.getAttribute('data-food-btn');
      renderFoodSafety();
    });
  });
}

// --- 5. "LET'S GET YOU ADOPTION READY!" CHECKLIST ---
function renderChecklist() {
  const main = document.getElementById('main-tab-content');
  const total = adoptionChecklist.length;
  const completed = Object.values(state.checkedItems).filter(Boolean).length;
  const percent = Math.round((completed / total) * 100);
  const isAllDone = completed === total;

  main.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-8">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">Rescue Vetting Preparation</span>
        <h1 class="text-3xl font-extrabold text-slate-900 mt-2">Let's Get You Adoption Ready!</h1>
        <p class="text-slate-600 text-sm mt-1">
          UK rescues require evidence of ethical care before approving adoption. Check off each requirement to ensure your setup passes rescue vetting with flying colours.
        </p>
      </div>

      <!-- Progress Card -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div class="flex items-center justify-between mb-2">
          <div>
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Adoption Readiness Score</span>
            <div class="text-2xl font-black text-slate-900">${completed} / ${total} Requirements Met (${percent}%)</div>
          </div>
          <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-base ${
            isAllDone ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-800'
          }">
            ${isAllDone ? '✓' : `${percent}%`}
          </div>
        </div>

        <!-- Progress bar -->
        <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div 
            class="h-full transition-all duration-500 ${isAllDone ? 'bg-emerald-500' : 'bg-amber-500'}" 
            style="width: ${percent}%;"></div>
        </div>

        <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <span class="text-xs text-slate-500">
            ${isAllDone 
              ? '🎉 Fantastic! Your setup meets the strictest UK rescue adoption standards!' 
              : 'Complete all 10 items to generate your verified Adoption Readiness Certificate.'}
          </span>
          <button 
            id="open-summary-btn"
            ${!isAllDone ? 'disabled' : ''}
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isAllDone 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }">
            <i data-lucide="award" class="w-4 h-4"></i>
            <span>View Adoption Certificate</span>
          </button>
        </div>
      </div>

      <!-- Checklist Items -->
      <div class="space-y-3.5" id="checklist-items-container">
        ${adoptionChecklist.map(item => {
          const isChecked = !!state.checkedItems[item.id];
          return `
            <div class="bg-white rounded-2xl border p-5 shadow-sm transition-all ${
              isChecked ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
            }">
              <div class="flex items-start gap-3.5">
                <input 
                  type="checkbox" 
                  id="${item.id}"
                  ${isChecked ? 'checked' : ''}
                  class="mt-1 w-5 h-5 rounded-md text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
                />
                <div class="flex-1">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <label for="${item.id}" class="text-base font-bold text-slate-900 cursor-pointer">
                      ${item.step}. ${item.title}
                    </label>
                    <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600 self-start sm:self-auto uppercase">
                      ${item.category}
                    </span>
                  </div>

                  <p class="text-xs font-semibold text-slate-700 mb-1.5">${item.requirement}</p>
                  <p class="text-xs text-slate-500 leading-relaxed mb-2">${item.whyImportant}</p>

                  <div class="bg-amber-50/80 rounded-xl p-2.5 text-xs text-amber-900 border border-amber-200/60 flex items-start gap-2">
                    <i data-lucide="lightbulb" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
                    <span><strong>Rescue Top Tip:</strong> ${item.rescueTip}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach checkbox change listeners
  adoptionChecklist.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.addEventListener('change', (e) => {
        state.checkedItems[item.id] = e.target.checked;
        localStorage.setItem('fth_checklist', JSON.stringify(state.checkedItems));
        
        // Check if just reached 100%
        const newCount = Object.values(state.checkedItems).filter(Boolean).length;
        if (newCount === total && typeof confetti === 'function') {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        
        renderChecklist();
      });
    }
  });

  document.getElementById('open-summary-btn')?.addEventListener('click', showCertificateModal);
}

// Show Printable / Copyable Certificate Modal
function showCertificateModal() {
  const modal = document.createElement('div');
  modal.id = 'adoption-summary-modal';
  modal.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  
  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative animate-in fade-in duration-200">
      <button id="close-modal-btn" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1">✕</button>

      <div class="text-center mb-6">
        <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-black">
          ✓
        </div>
        <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">For the Hams! UK Adoption Standard</span>
        <h2 class="text-2xl font-black text-slate-900 mt-1">Adoption-Ready Certificate</h2>
        <p class="text-xs text-slate-500 mt-1">This setup has been verified against India's Hamster Rescue & UK welfare standards.</p>
      </div>

      <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-1.5 mb-6 max-h-60 overflow-y-auto">
        <div class="font-bold text-slate-900 pb-1 border-b border-slate-200">Verified Checklist Summary:</div>
        ${adoptionChecklist.map(c => `
          <div class="flex items-center gap-1.5 text-[11px]">
            <span class="text-emerald-600 font-bold">✓</span>
            <span>${c.title} (${c.requirement})</span>
          </div>
        `).join('')}
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-3">
        <button id="copy-summary-btn" class="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
          📋 Copy Summary for Rescue Form
        </button>
        <button onclick="window.print()" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors">
          🖨️ Print Certificate
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('close-modal-btn')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.getElementById('copy-summary-btn')?.addEventListener('click', () => {
    const text = `=== FOR THE HAMS! ADOPTION READINESS SUMMARY ===\nVerified against UK Rescue Standards (100x50x50cm, 20cm+ bedding, proper wheel, multi-chamber hide, sand bath, dig boxes).\n\n` +
      adoptionChecklist.map(c => `[✓] ${c.title}: ${c.requirement}`).join('\n') +
      `\n\nGenerated at www.forthehams.co.uk`;
    navigator.clipboard.writeText(text);
    alert('Summary copied to clipboard! You can now paste this directly into your rescue adoption application.');
  });
}

// --- 6. UK RESCUE DIRECTORY ---
function renderRescues() {
  const main = document.getElementById('main-tab-content');

  const filtered = rescuesList.filter(r => {
    if (state.rescueRegion === 'all') return true;
    if (state.rescueRegion === 'england' && r.region.toLowerCase().includes('england')) return true;
    if (state.rescueRegion === 'scotland' && r.region.toLowerCase().includes('scotland')) return true;
    if (state.rescueRegion === 'wales' && r.region.toLowerCase().includes('wales')) return true;
    return true;
  });

  main.innerHTML = `
    <div>
      <div class="text-center max-w-2xl mx-auto mb-8">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">Adopt, Don't Shop</span>
        <h1 class="text-3xl font-extrabold text-slate-900 mt-2">UK Hamster Rescue Directory</h1>
        <p class="text-slate-600 text-sm mt-1">
          An inclusive directory connecting adopters with verified, ethical small pet rescues and foster networks across the United Kingdom.
        </p>
      </div>

      <!-- Region Filter -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <button data-region-btn="all" class="px-3 py-1.5 rounded-xl text-xs font-bold ${state.rescueRegion === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}">All UK Rescues</button>
        <button data-region-btn="england" class="px-3 py-1.5 rounded-xl text-xs font-bold ${state.rescueRegion === 'england' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}">England</button>
        <button data-region-btn="wales" class="px-3 py-1.5 rounded-xl text-xs font-bold ${state.rescueRegion === 'wales' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}">Wales</button>
        <button data-region-btn="scotland" class="px-3 py-1.5 rounded-xl text-xs font-bold ${state.rescueRegion === 'scotland' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}">Scotland</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered.map(r => `
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
            r.id === 'indias-rescue' ? 'ring-2 ring-amber-500 bg-amber-50/10' : ''
          }">
            <div>
              <div class="flex flex-wrap gap-1.5 mb-2.5">
                ${r.badges.map(b => `
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    b.includes('Partner') ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                  }">${b}</span>
                `).join('')}
              </div>

              <h3 class="text-xl font-bold text-slate-900 mb-1">${r.name}</h3>
              <div class="text-xs font-semibold text-amber-700 mb-2">📍 ${r.region}</div>
              
              <div class="text-[11px] text-slate-500 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <strong>Foster Bases / Coverage:</strong> ${r.locations}
              </div>

              <p class="text-xs text-slate-600 leading-relaxed mb-4">${r.speciality}</p>
            </div>

            <div class="pt-4 border-t border-slate-100 space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <a 
                  href="${r.adoptUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-full text-center py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
                  Adopt a Hamster
                </a>
                <a 
                  href="${r.donateUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors">
                  Support / Donate
                </a>
              </div>
              <a 
                href="${r.website}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="block text-center text-[11px] text-slate-400 hover:text-slate-600 pt-1">
                Visit Official Website ↗
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

// --- 7. REAL ENCLOSURE INSPIRATION GALLERY ---
function renderInspiration() {
  const main = document.getElementById('main-tab-content');

  const inspirationSetups = [
    {
      id: 1,
      image: "assets/images/enclosures/setup_inspiration_1.jpg",
      title: "Natural Wooden Enclosure Setup",
      rescueCredit: "India's Hamster Rescue",
      highlights: ["30cm+ paper & aspen bedding", "Large A4 glass sand bath dish", "Reptile cork oak tunnels", "Flax & sorghum spray clutter"]
    },
    {
      id: 2,
      image: "assets/images/enclosures/setup_inspiration_2.jpg",
      title: "Subterranean Multi-Chamber Layout",
      rescueCredit: "India's Hamster Rescue",
      highlights: ["Platform-supported upright wheel", "Multi-chamber hide on stilts", "Textured dig boxes (coco coir & beech)", "Ceramic cooling hides"]
    },
    {
      id: 3,
      image: "assets/images/enclosures/setup_inspiration_3.jpg",
      title: "Desert Dune Roborovski Habitat",
      rescueCredit: "India's Hamster Rescue",
      highlights: ["1/3 enclosure pure desert sand", "Low climbing barriers", "Small seed foraging sprays", "Smooth hiding spots"]
    },
    {
      id: 4,
      image: "assets/images/enclosures/setup_inspiration_4.jpg",
      title: "Enriched Natural Syrian Setup",
      rescueCredit: "India's Hamster Rescue",
      highlights: ["32cm silent wheel on platform", "Deep 30cm burrowing zone", "Multiple hollow logs", "Zero wire rungs"]
    },
    {
      id: 5,
      image: "assets/images/enclosures/setup_inspiration_5.jpg",
      title: "Barless Acrylic Natural World",
      rescueCredit: "India's Hamster Rescue",
      highlights: ["100x50cm continuous space", "Clear acrylic viewing front", "Triple substrate foraging", "Safe ceramic hides"]
    },
    {
      id: 6,
      image: "assets/images/enclosures/setup_inspiration_6.jpg",
      title: "High Welfare Cluttered Ecosystem",
      rescueCredit: "India's Hamster Rescue",
      highlights: ["Covered foraging pathways", "Sphagnum moss accents", "Safe beech chip digging area", "Heavy items elevated"]
    }
  ];

  main.innerHTML = `
    <div>
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">Real Foster Setups</span>
        <h1 class="text-3xl font-extrabold text-slate-900 mt-2">Enclosure Inspiration Gallery</h1>
        <p class="text-slate-600 text-sm mt-1">
          Real enclosures from <strong>India's Hamster Rescue</strong> volunteers and foster network, demonstrating how to achieve deep burrowing, sensory textures, and safe platforms.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${inspirationSetups.map(setup => `
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div class="h-64 overflow-hidden bg-slate-100 relative group cursor-pointer" onclick="window.open('${setup.image}', '_blank')">
              <img 
                src="${setup.image}" 
                alt="${setup.title}"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                <span>View Full Image</span>
                <i data-lucide="zoom-in" class="w-4 h-4"></i>
              </div>
            </div>

            <div class="p-5">
              <div class="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                📸 ${setup.rescueCredit}
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">${setup.title}</h3>

              <div class="space-y-1">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Welfare Features:</span>
                <ul class="text-xs text-slate-600 space-y-1 pt-1">
                  ${setup.highlights.map(h => `<li class="flex items-center gap-1.5"><span class="text-emerald-500 font-bold">✓</span> <span>${h}</span></li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Re-render Lucide icons
function updateIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}
