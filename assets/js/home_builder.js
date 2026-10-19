// For the Hams! — Hamster Home Builder (Budget Setup Planner)
// www.forthehams.co.uk | UK hamster care, checked against India's Hamster Rescue standards
// Theme: "Zine × 2005" (see assets/css/style.css)

import { products } from './data/products.js?v=3.6';
import { speciesList } from './data/species.js?v=3.6';
import { icon, clean } from './icons.js?v=3.6';

// Slots required for an ethical UK setup
export const BUILDER_SLOTS = [
  {
    id: 'enclosure',
    name: '1. Enclosure',
    icon: 'cage',
    category: 'enclosures',
    required: true,
    tagline: '100x50cm (5,000 cm²) minimum',
    tip: 'Unbroken floor space is paramount. No modular tubes or wire shelves with drop hazards.'
  },
  {
    id: 'wheel',
    name: '2. Running Wheel',
    icon: 'wheel',
    category: 'wheels',
    required: true,
    tagline: 'Solid & upright (28cm+ Syrian / 20–26cm Dwarf)',
    tip: 'Syrians need 28–32cm to prevent painful spine curving. Wire rungs or mesh are dangerous.'
  },
  {
    id: 'bedding',
    name: '3. Burrowing Bedding',
    icon: 'cloud',
    category: 'bedding',
    required: true,
    tagline: '20cm–30cm deep burrow support',
    tip: 'Must hold tunnels without collapsing. Compressed paper, kiln-dried aspen, or hemp. No hay or fluffy wool.'
  },
  {
    id: 'sand',
    name: '4. Sand Bath & Dish',
    icon: 'sand',
    category: 'sand',
    required: true,
    tagline: 'Essential hygiene & coat care',
    tip: 'Use non-calcium reptile desert sand or safe play sand. Hamsters groom their oils in sand.'
  },
  {
    id: 'hide',
    name: '5. Multi-Chamber Hide',
    icon: 'hide',
    category: 'hides',
    required: true,
    tagline: 'Bottomless dark underground burrow',
    tip: 'Simulates natural burrows with chambers for sleeping, food hoard, and pee corner. Place directly on base.'
  },
  {
    id: 'food',
    name: '6. Species Seed Mix',
    icon: 'bowl',
    category: 'food_mixes',
    required: true,
    tagline: '100% pellet-free species nutrition',
    tip: 'Diverse natural seeds, grains, mealworms, and herbs. Zero compressed pellets or dyed biscuits.'
  },
  {
    id: 'forage',
    name: '7. Forage & Enrichment',
    icon: 'sprout',
    category: 'forage',
    required: false,
    tagline: 'Sprays, cork log & dig textures',
    tip: 'Flax, sorghum, millets, cork bark tunnels, and coco coir soil create sensory foraging joy.'
  }
];

// Curated setup presets (All 100% Rescue-Approved Welfare!)
export const SETUP_PRESETS = [
  {
    id: 'smart_saver',
    name: 'Smart Saver & DIY',
    badge: '🪙 Maximum Value',
    tone: 'mint',
    tagline: 'Clever DIY conversions & bulk savings',
    desc: 'Proof that ethical care does not require a fortune. Meets the full 100x50cm standard and deep burrowing requirements with high-value UK favorites.',
    targetBudget: 135,
    items: {
      syrian: {
        enclosure: 'enc-pawhut-115',
        wheel: 'wheel-pah-plastic-28',
        bedding: 'bed-aubiose-hemp',
        sand: 'sand-suburban-play',
        hide: 'hide-happy-henrys',
        food: 'food-mixerama-syrian',
        forage: 'forage-flax-sprays'
      },
      dwarf: {
        enclosure: 'enc-pawhut-115',
        wheel: 'wheel-trixie-wooden-28',
        bedding: 'bed-aubiose-hemp',
        sand: 'sand-suburban-play',
        hide: 'hide-happy-henrys',
        food: 'food-mixerama-dwarf',
        forage: 'forage-flax-sprays'
      },
      roborovski: {
        enclosure: 'enc-pawhut-115',
        wheel: 'wheel-trixie-wooden-28',
        bedding: 'bed-aubiose-hemp',
        sand: 'sand-suburban-play',
        hide: 'hide-happy-henrys',
        food: 'food-mixerama-robo',
        forage: 'forage-flax-sprays'
      }
    }
  },
  {
    id: 'classic_turnkey',
    name: 'Classic Turnkey & Wire',
    badge: '⚖️ UK Rescue Favorite',
    tone: 'mustard',
    tagline: 'Popular barred cages & premium bearings',
    desc: 'The UK rescue community standard. Spacious barred enclosure, ultra-smooth silent wheel, paper bedding, and a handcrafted multi-chamber hide.',
    targetBudget: 215,
    items: {
      syrian: {
        enclosure: 'enc-savic-plaza-120',
        wheel: 'wheel-bucatstate-32',
        bedding: 'bed-fitch-paper-70l',
        sand: 'sand-pets-desert',
        hide: 'hide-hopes-mc',
        food: 'food-mixerama-syrian',
        forage: 'forage-flax-sprays'
      },
      dwarf: {
        enclosure: 'enc-savic-plaza-100',
        wheel: 'wheel-bucatstate-26',
        bedding: 'bed-fitch-paper-70l',
        sand: 'sand-pets-desert',
        hide: 'hide-hopes-mc',
        food: 'food-mixerama-dwarf',
        forage: 'forage-flax-sprays'
      },
      roborovski: {
        enclosure: 'enc-savic-plaza-100',
        wheel: 'wheel-bucatstate-26',
        bedding: 'bed-fitch-paper-70l',
        sand: 'sand-pets-desert',
        hide: 'hide-hopes-mc',
        food: 'food-mixerama-robo',
        forage: 'forage-sorghum-dari'
      }
    }
  },
  {
    id: 'showcase_acrylic',
    name: 'Acrylic & Showcase',
    badge: '✨ Pre-Assembled Glass/Acrylic',
    tone: 'lilac',
    tagline: 'Barless front-viewing & modern aesthetics',
    desc: 'Turnkey acrylic hybrid enclosure with 360° viewing, magnetic front door, dual bearing wheel, and boutique German artisan nutrition.',
    targetBudget: 330,
    items: {
      syrian: {
        enclosure: 'enc-bucatstate-3',
        wheel: 'wheel-bucatstate-32',
        bedding: 'bed-kaytee-clean-cozy',
        sand: 'bath-niteangel-glass',
        hide: 'hide-bucatstate-mc',
        food: 'food-kornerbude-syrian',
        forage: 'forage-indias-bouquet'
      },
      dwarf: {
        enclosure: 'enc-bucatstate-3',
        wheel: 'wheel-bucatstate-26',
        bedding: 'bed-kaytee-clean-cozy',
        sand: 'bath-niteangel-glass',
        hide: 'hide-bucatstate-mc',
        food: 'food-kornerbude-dwarf',
        forage: 'forage-indias-bouquet'
      },
      roborovski: {
        enclosure: 'enc-bucatstate-3',
        wheel: 'wheel-bucatstate-26',
        bedding: 'bed-kaytee-clean-cozy',
        sand: 'bath-niteangel-glass',
        hide: 'hide-bucatstate-mc',
        food: 'food-kornerbude-dwarf',
        forage: 'forage-sorghum-dari'
      }
    }
  }
];

// Helper to extract base numeric price in GBP
export function getProductPrice(p) {
  if (!p) return 0;
  if (typeof p.priceNum === 'number') return p.priceNum;
  if (p.priceGuide) {
    const m = String(p.priceGuide).match(/£([0-9]+(?:\.[0-9]{1,2})?)/);
    if (m) return parseFloat(m[1]);
  }
  return 0;
}

// Internal Builder State
const builderState = {
  mode: 'presets', // 'presets' | 'custom'
  activePresetId: 'smart_saver',
  targetBudget: 150,
  selectedSlots: {}, // { enclosure: 'enc-pawhut-115', ... }
  pickerActiveSlot: null, // slot id if item picker modal/drawer is open
  onCartChange: null
};

// Map general species ID ('syrian' / 'roborovski' / 'winter_white' etc.) to preset key
function getPresetSpeciesKey(speciesId) {
  if (speciesId === 'syrian') return 'syrian';
  if (speciesId === 'roborovski') return 'roborovski';
  return 'dwarf'; // winter_white, campbells, chinese, or 'all'
}

// Initialize builder selections from a preset
export function applyPreset(presetId, speciesId = 'all') {
  const preset = SETUP_PRESETS.find(p => p.id === presetId) || SETUP_PRESETS[0];
  const specKey = getPresetSpeciesKey(speciesId);
  const mapping = preset.items[specKey] || preset.items.syrian;

  builderState.activePresetId = preset.id;
  builderState.selectedSlots = { ...mapping };
  builderState.targetBudget = preset.targetBudget;
}

// Calculate setup total
export function calculateSetupTotal(selectedSlots) {
  let total = 0;
  BUILDER_SLOTS.forEach(slot => {
    const prodId = selectedSlots[slot.id];
    if (prodId) {
      const prod = products.find(p => p.id === prodId);
      if (prod) total += getProductPrice(prod);
    }
  });
  return parseFloat(total.toFixed(2));
}

// Evaluate welfare safety & completeness
export function evaluateWelfare(selectedSlots, speciesId = 'all') {
  const issues = [];
  const passes = [];

  const encId = selectedSlots.enclosure;
  const wheelId = selectedSlots.wheel;
  const bedId = selectedSlots.bedding;
  const sandId = selectedSlots.sand;
  const hideId = selectedSlots.hide;
  const foodId = selectedSlots.food;

  const enc = products.find(p => p.id === encId);
  const wheel = products.find(p => p.id === wheelId);
  const bed = products.find(p => p.id === bedId);
  const sand = products.find(p => p.id === sandId);
  const hide = products.find(p => p.id === hideId);
  const food = products.find(p => p.id === foodId);

  // 1. Enclosure check
  if (enc) {
    passes.push({ text: '100x50cm Minimum Floor Space Met (5,000+ cm²)', type: 'enc' });
  } else {
    issues.push({ text: 'Missing essential enclosure', severity: 'error' });
  }

  // 2. Wheel diameter check
  if (wheel) {
    if (speciesId === 'syrian') {
      const isSmall = /20cm|22cm|24cm|26cm/i.test(wheel.name);
      if (isSmall) {
        issues.push({ text: 'Wheel may be under 28cm for a Syrian! Syrians need 28–32cm to avoid spinal damage.', severity: 'warning' });
      } else {
        passes.push({ text: 'Spine-Safe Upright Wheel (28cm+ for Syrian)', type: 'wheel' });
      }
    } else {
      passes.push({ text: 'Spine-Safe Upright Wheel (20cm+ diameter)', type: 'wheel' });
    }
  } else {
    issues.push({ text: 'Missing essential running wheel', severity: 'error' });
  }

  // 3. Bedding check
  if (bed) {
    passes.push({ text: 'Deep Burrowing Substrate (Safe, Dust-Free, No Hay)', type: 'bedding' });
  } else {
    issues.push({ text: 'Missing burrowing bedding', severity: 'error' });
  }

  // 4. Sand bath check
  if (sand) {
    passes.push({ text: 'Safe Sand Grooming Bath Included', type: 'sand' });
  } else {
    issues.push({ text: 'Missing essential sand bath', severity: 'error' });
  }

  // 5. Hide check
  if (hide) {
    passes.push({ text: 'Bottomless Multi-Chamber Burrow Hide', type: 'hide' });
  } else {
    issues.push({ text: 'Missing multi-chamber hide', severity: 'error' });
  }

  // 6. Food check
  if (food) {
    if ((speciesId === 'winter_white' || speciesId === 'campbells' || speciesId === 'chinese') && (food.species && !food.species.includes(speciesId) && food.species.includes('syrian'))) {
      issues.push({ text: 'Dwarf hamsters are prone to diabetes! Ensure you pick a fruit-free dwarf seed mix.', severity: 'warning' });
    } else {
      passes.push({ text: '100% Pellet-Free Species-Specific Seed Mix', type: 'food' });
    }
  } else {
    issues.push({ text: 'Missing ethical seed mix', severity: 'error' });
  }

  const isComplete = !issues.some(i => i.severity === 'error');
  return { issues, passes, isComplete };
}

// Generate clipboard-friendly shopping text
export function formatShoppingReceiptText(selectedSlots, currentSpecies = 'all') {
  const total = calculateSetupTotal(selectedSlots);
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  let lines = [
    `🐹 FOR THE HAMS! — Ethical Hamster Home Setup`,
    `Generated: ${dateStr} | Species: ${currentSpecies.toUpperCase()}`,
    `Standard: 100% Rescue-Approved Welfare (India's Hamster Rescue Standards)`,
    `Estimated Total: £${total.toFixed(2)}`,
    `--------------------------------------------------`
  ];

  BUILDER_SLOTS.forEach(slot => {
    const prodId = selectedSlots[slot.id];
    if (prodId) {
      const p = products.find(prod => prod.id === prodId);
      if (p) {
        const price = getProductPrice(p);
        lines.push(`• [${slot.name}] ${p.name}`);
        lines.push(`  Price: £${price.toFixed(2)} | Retailer: ${p.retailer || 'UK Stockist'}`);
        if (p.url) lines.push(`  Link: ${p.url}`);
        lines.push(``);
      }
    }
  });

  lines.push(`--------------------------------------------------`);
  lines.push(`Build your own setup at: https://www.forthehams.co.uk/#builder`);
  lines.push(`UK Hamster Welfare: 100x50cm minimum • Solitary housing only • No hay, fluffy wool or small wheels!`);
  return lines.join('\n');
}

// Render the entire Home Builder view
export function renderHomeBuilder(container, options = {}) {
  const currentSpecies = options.currentSpecies || 'all';

  // If species changed or first render without selections, load appropriate preset
  if (Object.keys(builderState.selectedSlots).length === 0 || (builderState.lastSpecies !== currentSpecies && builderState.mode === 'presets')) {
    builderState.lastSpecies = currentSpecies;
    applyPreset(builderState.activePresetId || 'smart_saver', currentSpecies);
  }
  builderState.lastSpecies = currentSpecies;

  const total = calculateSetupTotal(builderState.selectedSlots);
  const welfare = evaluateWelfare(builderState.selectedSlots, currentSpecies);
  const activePreset = SETUP_PRESETS.find(p => p.id === builderState.activePresetId);

  // Budget difference calculation
  const diff = builderState.targetBudget - total;
  const isUnder = diff >= 0;
  const absDiff = Math.abs(diff).toFixed(2);
  const percentSpent = Math.min(100, Math.round((total / Math.max(1, builderState.targetBudget)) * 100));

  container.innerHTML = `
    <div class="home-builder animate-fade-in pb-12">
      <!-- Top Section Switcher (Catalog vs Builder) -->
      <div class="flex items-center gap-2 mb-3">
        <div class="folder-tabs" role="tablist">
          <button type="button" id="builder-nav-catalog-btn" class="folder-tab">
            <span>📦 Safe Picks Catalog</span>
          </button>
          <button type="button" class="folder-tab is-active" aria-selected="true">
            <span>🔨 Home Builder (By Budget)</span>
          </button>
        </div>
      </div>

      <!-- Blueprint Header Banner -->
      <header class="blueprint-card mb-5 relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-2.5 mb-2">
          <div class="flex items-center gap-2">
            <span class="sticker bg-mustard py-0.5 px-2 text-xs font-bold font-display uppercase tracking-wider">Interactive Tool</span>
            <span class="tag tag-mint">${icon('tick', 12)} 100% Rescue Vetted</span>
          </div>
          <span class="pixel text-[11px] text-ink-soft">BLUEPRINT_REV_3.6</span>
        </div>

        <h1 class="text-2xl sm:text-3xl font-display leading-tight mb-2">
          Hamster Home Builder
        </h1>
        <p class="text-[14.5px] leading-relaxed text-ink-soft mb-3">
          Plan an ethical, rescue-approved hamster habitat that fits your budget. Every build here meets the strict <strong>100x50cm unbroken floor space</strong> standard, with species-safe wheels and direct links to trusted UK stockists.
        </p>

        <!-- Equality Notice: Budget does not equal Welfare -->
        <div class="portal-box bg-mint-soft border-mint p-3 text-xs sm:text-[13px] leading-relaxed flex items-start gap-2.5 rounded-lg mb-2">
          <span class="text-base shrink-0">🌻</span>
          <div>
            <strong class="font-bold">A thrifty home is every bit as ethical as an expensive home!</strong>
            <p class="mt-0.5 text-ink-soft">
              Hamsters do not care how much you spend — they care about deep burrowing space, a large upright wheel, safe sand, and plenty of forage. Price differences reflect materials (e.g. acrylic vs DIY/wire) and pre-assembly, not animal happiness.
            </p>
          </div>
        </div>

        <!-- Mode Segmented Switcher -->
        <div class="flex items-center gap-2 mt-4 pt-2 border-t border-ink/10">
          <span class="text-xs font-bold uppercase tracking-wide text-ink-soft shrink-0">Mode:</span>
          <div class="folder-tabs inline-flex m-0" role="tablist">
            <button type="button" id="builder-mode-presets" class="folder-tab ${builderState.mode === 'presets' ? 'is-active' : ''}">
              <span>Curated Setup Styles</span>
            </button>
            <button type="button" id="builder-mode-custom" class="folder-tab ${builderState.mode === 'custom' ? 'is-active' : ''}">
              <span>Custom Builder (Slot-by-Slot)</span>
            </button>
          </div>
        </div>
      </header>

      <!-- PRESET MODE: 3 Curated Setup Styles -->
      ${builderState.mode === 'presets' ? renderPresetsSection(currentSpecies) : ''}

      <!-- LIVE BUDGET GAUGE & PROGRESS BAR -->
      <div class="portal-box bg-white p-4 mb-5 shadow-sm rounded-xl border-2 border-ink">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <span class="text-xs uppercase font-bold text-ink-soft tracking-wider block">Estimated Total</span>
            <div class="flex items-baseline gap-2">
              <span class="font-display text-3xl font-extrabold text-ink">£${total.toFixed(2)}</span>
              <span class="text-xs text-ink-soft">target: £${builderState.targetBudget}</span>
            </div>
          </div>

          <div class="text-right">
            ${isUnder ? `
              <span class="sticker bg-mint text-ink text-xs font-bold py-1 px-2.5 inline-flex items-center gap-1">
                ${icon('tick', 13)} £${absDiff} under target
              </span>
            ` : `
              <span class="sticker bg-tomato text-white text-xs font-bold py-1 px-2.5 inline-flex items-center gap-1">
                £${absDiff} over target
              </span>
            `}
            <p class="text-[11px] text-ink-soft mt-1">
              ${isUnder ? 'Great job! Surplus can fund fresh veggies & vet care.' : 'Adjust any slot below to bring down the cost.'}
            </p>
          </div>
        </div>

        <!-- Interactive Budget Target Slider (In Custom Mode) -->
        ${builderState.mode === 'custom' ? `
          <div class="mt-3 pt-3 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2">
            <label for="budget-slider" class="text-xs font-bold text-ink-soft">Adjust Target Budget:</label>
            <div class="flex items-center gap-2">
              <input type="range" id="budget-slider" min="100" max="450" step="10" value="${builderState.targetBudget}" class="accent-tomato cursor-pointer">
              <span class="font-display font-bold text-sm bg-paper-2 px-2 py-0.5 border border-ink rounded">£${builderState.targetBudget}</span>
            </div>
          </div>
        ` : ''}

        <!-- Progress meter -->
        <div class="w-full bg-paper-2 border border-ink h-3.5 rounded-full overflow-hidden mt-3 relative">
          <div class="h-full transition-all duration-300 ${percentSpent > 100 ? 'bg-tomato' : (percentSpent > 85 ? 'bg-mustard' : 'bg-mint')}" style="width: ${percentSpent}%"></div>
        </div>
      </div>

      <!-- WELFARE CHECKMETER -->
      <div class="portal-box ${welfare.isComplete ? 'bg-mint-soft border-mint' : 'bg-tomato-soft border-tomato'} p-3.5 mb-5 rounded-xl text-xs sm:text-sm">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="text-base">${welfare.isComplete ? '🎖️' : '⚠️'}</span>
          <h3 class="font-display text-sm sm:text-base font-bold">
            ${welfare.isComplete ? 'All 6 Welfare Essentials Fully Covered!' : 'Welfare Checklist Needs Attention'}
          </h3>
        </div>
        <div class="flex flex-wrap gap-1.5 mt-2">
          ${welfare.passes.map(p => `
            <span class="tag tag-mint text-[11px]">${icon('tick', 11)} ${p.text}</span>
          `).join('')}
          ${welfare.issues.map(iss => `
            <span class="tag ${iss.severity === 'error' ? 'tag-tomato' : 'tag-mustard'} text-[11px]">
              ${icon('nope', 11)} ${iss.text}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- 7 SETUP SLOTS (CARDS) -->
      <section class="mb-6">
        <div class="flex items-baseline justify-between gap-2 mb-3">
          <h2 class="text-xl sm:text-2xl font-display">Habitat Components</h2>
          <span class="text-xs text-ink-soft">Tap 'Change' on any slot to swap</span>
        </div>

        <div class="grid grid-cols-1 gap-3.5">
          ${BUILDER_SLOTS.map(slot => renderSlotCard(slot, builderState.selectedSlots[slot.id], currentSpecies)).join('')}
        </div>
      </section>

      <!-- SHOPPING RECEIPT & EXPORT -->
      <section class="shop-receipt bg-white p-5 rounded-xl border-3 border-ink shadow-lg relative mt-8">
        <div class="receipt-cutout-top"></div>
        <div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-3 mb-4">
          <div>
            <span class="sticker bg-ink text-paper py-0.5 px-2 text-[10px] font-pixel">RECEIPT_UK_VET_01</span>
            <h3 class="font-display text-xl font-bold mt-1">Your Curated Shopping Basket</h3>
            <p class="text-xs text-ink-soft">Direct merchant links — we do not take commissions or sell anything.</p>
          </div>
          <button type="button" id="copy-receipt-btn" class="btn btn-sm btn-tomato inline-flex items-center gap-1.5">
            ${icon('copy', 14)}
            <span>Copy Shopping List</span>
          </button>
        </div>

        <!-- Itemized list -->
        <div class="divide-y divide-ink/10 mb-4">
          ${BUILDER_SLOTS.map(slot => {
            const prodId = builderState.selectedSlots[slot.id];
            const prod = products.find(p => p.id === prodId);
            if (!prod) return '';
            const price = getProductPrice(prod);
            const mainLink = (prod.links && prod.links[0]) ? prod.links[0] : { label: prod.retailer || 'Buy', url: prod.url };
            return `
              <div class="py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <div class="min-w-0 flex-1">
                  <span class="text-[10px] uppercase font-bold text-ink-soft block">${slot.name}</span>
                  <strong class="font-bold text-ink">${clean(prod.name)}</strong>
                  <span class="text-ink-soft block text-[11px]">${clean(prod.retailer || '')}</span>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <span class="font-display font-bold text-sm sm:text-base">£${price.toFixed(2)}</span>
                  <a href="${mainLink.url || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-mustard-soft flex items-center gap-1">
                    <span>${clean(mainLink.label || 'Buy')}</span>
                    ${icon('ext', 11)}
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Receipt Total Footer -->
        <div class="pt-3 border-t-2 border-dashed border-ink/40 flex items-center justify-between">
          <div class="text-xs text-ink-soft">
            <span>Checked against India's Hamster Rescue Standards</span>
          </div>
          <div class="text-right">
            <span class="text-xs uppercase text-ink-soft block font-bold">Estimated Grand Total</span>
            <span class="font-display text-2xl font-extrabold text-tomato">£${total.toFixed(2)}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- ITEM PICKER MODAL / BOTTOM SHEET (When 'Change' is clicked) -->
    <div id="builder-picker-backdrop" class="fixed inset-0 z-50 ${builderState.pickerActiveSlot ? '' : 'hidden'} flex items-end sm:items-center justify-center p-0 sm:p-4" style="background: rgba(34,24,15,0.65); backdrop-filter: blur(2px);">
      <div class="sheet w-full sm:max-w-xl max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden animate-slide-up shadow-2xl relative bg-paper border-2 border-ink">
        <div class="sheet-head shrink-0 px-4 py-3 flex items-center justify-between gap-3 border-b border-ink/20">
          <div class="flex items-center gap-2">
            <span class="font-display text-lg font-bold" id="picker-title">Choose Component</span>
          </div>
          <button type="button" id="picker-close-btn" class="btn btn-icon btn-sm shrink-0" aria-label="Close">
            ${icon('close', 18)}
          </button>
        </div>
        <div id="picker-items-body" class="p-4 overflow-y-auto overscroll-contain flex-grow divide-y divide-ink/10">
          <!-- Injected dynamically -->
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  setupBuilderListeners(container, currentSpecies, options);
}

// Render Presets Section (Mode A)
function renderPresetsSection(currentSpecies) {
  return `
    <div class="presets-section mb-6">
      <div class="flex items-baseline justify-between gap-2 mb-2.5">
        <h2 class="text-xl sm:text-2xl font-display">1-Click Curated Setups</h2>
        <span class="text-xs text-ink-soft">Select to prefill all 7 essentials</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${SETUP_PRESETS.map(preset => {
          const isActive = builderState.activePresetId === preset.id;
          const specKey = getPresetSpeciesKey(currentSpecies);
          const mapping = preset.items[specKey] || preset.items.syrian;
          const presetTotal = calculateSetupTotal(mapping);

          return `
            <div data-preset-card="${preset.id}" class="portal-box p-4 rounded-xl cursor-pointer transition-all border-2 ${isActive ? 'bg-white border-ink shadow-md ring-2 ring-tomato' : 'bg-paper-2 hover:bg-white border-ink/40'}">
              <div class="flex items-center justify-between gap-1 mb-1.5">
                <span class="sticker bg-${preset.tone} text-ink text-[11px] font-bold py-0.5 px-2">${preset.badge}</span>
                <span class="font-display font-bold text-sm text-ink">~£${presetTotal.toFixed(0)}</span>
              </div>
              <h3 class="font-display text-base font-bold text-ink leading-snug">${preset.name}</h3>
              <p class="text-xs text-ink-soft mt-1 leading-snug">${preset.tagline}</p>
              <p class="text-[11.5px] text-ink-soft mt-2 leading-relaxed">${preset.desc}</p>
              <div class="mt-3 pt-2 border-t border-ink/10 flex items-center justify-between">
                <span class="text-[11px] font-bold ${isActive ? 'text-tomato' : 'text-ink-soft'}">
                  ${isActive ? '● Selected Setup' : '○ Tap to Load'}
                </span>
                <button type="button" class="btn btn-xs ${isActive ? 'btn-tomato' : 'btn-mustard-soft'}">
                  ${isActive ? 'Active' : 'Apply'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Render individual slot row / card
function renderSlotCard(slot, selectedProdId, currentSpecies) {
  const prod = products.find(p => p.id === selectedProdId);
  const price = getProductPrice(prod);

  return `
    <article class="portal-box bg-white p-3.5 sm:p-4 rounded-xl border-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex p-1.5 bg-paper-2 border border-ink/30 rounded-md shrink-0">
            ${icon(slot.icon, 20)}
          </span>
          <div>
            <h3 class="font-display text-sm sm:text-base font-bold leading-none">${slot.name}</h3>
            <span class="text-[11px] text-ink-soft leading-tight block mt-0.5">${slot.tagline}</span>
          </div>
        </div>

        ${prod ? `
          <div class="mt-2 pl-1 sm:pl-2 border-l-2 border-mint">
            <h4 class="font-bold text-sm text-ink">${clean(prod.name)}</h4>
            <div class="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-ink-soft">
              <span class="font-display font-bold text-ink text-sm">£${price.toFixed(2)}</span>
              <span>•</span>
              <span>${clean(prod.retailer || 'UK Stockist')}</span>
              ${prod.badges ? `<span class="tag tag-mustard py-0 px-1.5 text-[10px]">${clean(prod.badges[0])}</span>` : ''}
            </div>
            <p class="text-[11px] text-ink-soft mt-1 leading-normal line-clamp-1">${clean(prod.summary || '')}</p>
          </div>
        ` : `
          <div class="mt-2 p-2 bg-tomato-soft border border-tomato rounded text-xs text-tomato font-bold">
            ⚠️ No product selected for this slot yet.
          </div>
        `}
      </div>

      <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/10">
        <button type="button" data-pick-slot="${slot.id}" class="btn btn-sm btn-mustard-soft flex items-center gap-1">
          <span>${prod ? 'Swap / Change' : 'Select Item'}</span>
        </button>
        ${prod && prod.url ? `
          <a href="${prod.url}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-ink underline hover:text-tomato flex items-center gap-0.5">
            <span>View link</span>
            ${icon('ext', 10)}
          </a>
        ` : ''}
      </div>
    </article>
  `;
}

// Render the popup item selector
function openSlotPicker(slotId, currentSpecies, container, options) {
  builderState.pickerActiveSlot = slotId;
  const slot = BUILDER_SLOTS.find(s => s.id === slotId);
  const backdrop = document.getElementById('builder-picker-backdrop');
  const title = document.getElementById('picker-title');
  const body = document.getElementById('picker-items-body');

  if (!backdrop || !body || !slot) return;

  title.innerHTML = `Choose ${slot.name}`;

  // Filter products by category and species
  const eligible = products.filter(p => {
    if (p.category !== slot.category) return false;
    if (currentSpecies !== 'all' && p.species && !p.species.includes(currentSpecies)) {
      return false;
    }
    return true;
  });

  body.innerHTML = `
    <div class="mb-3 p-2.5 bg-paper-2 rounded border border-ink/20 text-xs text-ink-soft leading-normal">
      <strong>Rescue Tip:</strong> ${slot.tip}
    </div>
    <div class="divide-y divide-ink/10">
      ${eligible.map(p => {
        const isSelected = builderState.selectedSlots[slot.id] === p.id;
        const price = getProductPrice(p);
        return `
          <div class="py-3 flex items-center justify-between gap-3 ${isSelected ? 'bg-mint-soft -mx-4 px-4' : ''}">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap mb-0.5">
                <h4 class="font-bold text-sm text-ink">${clean(p.name)}</h4>
                ${p.badges && p.badges[0] ? `<span class="tag tag-mustard py-0 px-1 text-[10px]">${clean(p.badges[0])}</span>` : ''}
              </div>
              <div class="text-xs text-ink-soft">
                <span class="font-display font-bold text-ink">£${price.toFixed(2)}</span>
                <span>• ${clean(p.retailer || 'UK Maker')}</span>
              </div>
              <p class="text-[11px] text-ink-soft mt-1 leading-tight">${clean(p.summary || '')}</p>
            </div>
            <button type="button" data-choose-item="${p.id}" class="btn btn-sm ${isSelected ? 'btn-tomato' : 'btn-mustard-soft'} shrink-0">
              ${isSelected ? 'Selected' : 'Choose'}
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;

  backdrop.classList.remove('hidden');

  // Attach choose handlers
  body.querySelectorAll('[data-choose-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prodId = btn.getAttribute('data-choose-item');
      builderState.selectedSlots[slot.id] = prodId;
      builderState.pickerActiveSlot = null;
      backdrop.classList.add('hidden');
      renderHomeBuilder(container, options);
    });
  });
}

// Setup event listeners for the Home Builder
function setupBuilderListeners(container, currentSpecies, options) {
  // Navigation back to catalog
  document.getElementById('builder-nav-catalog-btn')?.addEventListener('click', () => {
    if (options.onNavigate) {
      options.onNavigate('shop');
    } else {
      window.location.hash = 'shop';
    }
  });

  // Mode tabs
  document.getElementById('builder-mode-presets')?.addEventListener('click', () => {
    builderState.mode = 'presets';
    renderHomeBuilder(container, options);
  });

  document.getElementById('builder-mode-custom')?.addEventListener('click', () => {
    builderState.mode = 'custom';
    renderHomeBuilder(container, options);
  });

  // Preset clicks
  container.querySelectorAll('[data-preset-card]').forEach(card => {
    card.addEventListener('click', () => {
      const presetId = card.getAttribute('data-preset-card');
      applyPreset(presetId, currentSpecies);
      renderHomeBuilder(container, options);
    });
  });

  // Slider target budget in custom mode
  document.getElementById('budget-slider')?.addEventListener('input', (e) => {
    builderState.targetBudget = parseInt(e.target.value, 10);
    renderHomeBuilder(container, options);
  });

  // Slot change buttons
  container.querySelectorAll('[data-pick-slot]').forEach(btn => {
    btn.addEventListener('click', () => {
      const slotId = btn.getAttribute('data-pick-slot');
      openSlotPicker(slotId, currentSpecies, container, options);
    });
  });

  // Close picker modal
  document.getElementById('picker-close-btn')?.addEventListener('click', () => {
    builderState.pickerActiveSlot = null;
    document.getElementById('builder-picker-backdrop')?.classList.add('hidden');
  });

  // Click outside picker modal to close
  document.getElementById('builder-picker-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'builder-picker-backdrop') {
      builderState.pickerActiveSlot = null;
      e.target.classList.add('hidden');
    }
  });

  // Copy receipt button
  document.getElementById('copy-receipt-btn')?.addEventListener('click', () => {
    const text = formatShoppingReceiptText(builderState.selectedSlots, currentSpecies);
    navigator.clipboard?.writeText(text).then(() => {
      const btn = document.getElementById('copy-receipt-btn');
      if (btn) {
        btn.innerHTML = `${icon('tick', 14)} <span>Copied to Clipboard!</span>`;
        btn.classList.remove('btn-tomato');
        btn.classList.add('btn-mint');
        setTimeout(() => {
          btn.innerHTML = `${icon('copy', 14)} <span>Copy Shopping List</span>`;
          btn.classList.remove('btn-mint');
          btn.classList.add('btn-tomato');
        }, 2500);
      }
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
      alert('Could not copy automatically. You can copy items directly from the list!');
    });
  });
}
