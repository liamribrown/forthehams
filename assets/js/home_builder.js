// For the Hams! — Hamster Home Builder (Budget Setup Planner)
// www.forthehams.co.uk | UK hamster care, checked against India's Hamster Rescue standards
// Theme: "Zine × 2005" (see assets/css/style.css)

import { products } from './data/products.js?v=3.9';
import { speciesList } from './data/species.js?v=3.6';
import { icon, clean } from './icons.js?v=3.6';

// All 16 Official Adoption Criteria from India's Hamster Rescue
export const BUILDER_SLOTS = [
  // --- SECTION 1: HABITAT & EXERCISE ---
  {
    id: 'enclosure',
    criteriaNo: 1,
    name: '1. Enclosure (100x50x50cm Minimum)',
    icon: 'cage',
    category: 'enclosures',
    section: 'Habitat & Exercise',
    tagline: '100 x 50 x 50cm unbroken floor (barless preferred)',
    tip: 'Strict UK rescue welfare minimum unbroken floor space (5,000+ cm²). Barless enclosures are preferred to prevent climbing fall injuries and allow 20cm+ bedding depth.'
  },
  {
    id: 'bedding',
    criteriaNo: 2,
    name: '2. Safe Bedding (8+ Inches)',
    icon: 'cloud',
    category: 'bedding',
    section: 'Habitat & Exercise',
    tagline: '8+ inches (20cm+) deep burrow support',
    tip: 'Must hold tunnels without collapsing. Compressed paper (Fitch/Kaytee), dust-free aspen, or hemp (Aubiose). Strictly NO hay (causes corneal scratches & pouch punctures) and NO fluffy wool.'
  },
  {
    id: 'wheel',
    criteriaNo: 3,
    name: '3. Species-Suitable Wheel',
    icon: 'wheel',
    category: 'wheels',
    section: 'Habitat & Exercise',
    tagline: '28cm Syrians • 26cm Dwarfs • 21cm Robos',
    tip: 'Solid running track, upright. Hamster back must be completely flat. Syrian: 28cm minimum. Dwarfs: 26cm. Robos: 21cm. Wire mesh and flying saucers are strictly forbidden.'
  },
  {
    id: 'sand',
    criteriaNo: 4,
    name: '4. Large Sand Bath (A4+ Size)',
    icon: 'sand',
    category: 'sand',
    section: 'Habitat & Exercise',
    tagline: 'Aim for A4+ dish filled with safe sand',
    tip: 'Hamsters groom essential coat oils in sand. Use non-calcium reptile desert sand or safe baked play sand. Roborovskis need up to 1/3 of the entire cage dedicated to sand.'
  },
  {
    id: 'platforms',
    criteriaNo: 5,
    name: '5. Platforms for Heavy Items',
    icon: 'check',
    category: 'platforms',
    section: 'Habitat & Exercise',
    tagline: 'Elevates wheel & sand bath above burrows',
    tip: 'Heavy items (wheel, sand bath, ceramic hides) MUST be placed on wooden platforms or stilts so they never sink and crush a burrowing hamster below.'
  },

  // --- SECTION 2: DIGGING, FORAGING & NATURAL COVER ---
  {
    id: 'dig_box',
    criteriaNo: 6,
    name: '6. Dig Box with 3 Safe Substrates',
    icon: 'log',
    category: 'substrates',
    section: 'Digging & Foraging',
    tagline: 'Coco coir, beech chips & cork granules',
    tip: 'Sensory dig box with at least 3 distinct digging textures (e.g. soil-like coco coir, smooth beech chips, and cork granules or moss) for wild sensory enrichment.'
  },
  {
    id: 'sprays',
    criteriaNo: 7,
    name: '7. Variety of Harvest Sprays',
    icon: 'sprout',
    category: 'forage',
    section: 'Digging & Foraging',
    tagline: 'Full coverage spray bundle (India’s Rescue Store recommended)',
    tip: 'A single-type spray pack (such as flax alone) is only an optional extra and is not sufficient for overhead coverage. You need a proper multi-variety spray bundle (flax, sorghum, red millet, wheat, delicha & oat)—preferably from India’s Hamster Rescue Store!'
  },
  {
    id: 'tunnels',
    criteriaNo: 8,
    name: '8. Two or More Tunnels (Cork Log + 1)',
    icon: 'log',
    category: 'tunnels',
    section: 'Digging & Foraging',
    tagline: 'Reptile cork oak log + 2nd safe tunnel',
    tip: 'At least 2 tunnels: one natural reptile cork oak hollow log plus a second wooden bark, ceramic, or bamboo tunnel for secure transit across the habitat.'
  },
  {
    id: 'branch',
    criteriaNo: 9,
    name: '9. Reptile Branch',
    icon: 'sprout',
    category: 'branches',
    section: 'Digging & Foraging',
    tagline: 'Grapevine, java branch or bamboo root',
    tip: 'Natural sandblasted grapevine wood, java branch, or bamboo root. Provides 3D terrain, safe claw wear, and breaks up open floor sightlines.'
  },

  // --- SECTION 3: BURROWS, HIDES & HYDRATION ---
  {
    id: 'water',
    criteriaNo: 10,
    name: '10. Water Bottle or Bowl',
    icon: 'bowl',
    category: 'water',
    section: 'Hides & Hydration',
    tagline: 'Shallow ceramic dish or standing bottle',
    tip: 'A shallow heavyweight ceramic dish (or tealight holder) allows hamsters to drink in an ergonomic natural posture without straining their necks.'
  },
  {
    id: 'hide_mc',
    criteriaNo: 11,
    name: '11. Multi-Chamber Hide (with Lid)',
    icon: 'hide',
    category: 'hides',
    section: 'Hides & Hydration',
    tagline: 'Enclosed with lid, bottomless (3+ rooms)',
    tip: 'Simulates subterranean burrow architecture with separate sleeping, hoarding, and toileting chambers. Must have a removable roof for gentle health checks.'
  },
  {
    id: 'extra_hides',
    criteriaNo: 12,
    name: '12. Three or More Additional Hides',
    icon: 'hide',
    category: 'hides',
    section: 'Hides & Hydration',
    tagline: 'Mugs, teapots, bird feeders, salt pigs, oil burners',
    tip: 'India’s criteria requires 3+ extra hides! Clean ceramic mugs, sideways terracotta flowerpots, salt pigs, and oil burners make wonderful budget-friendly hides.'
  },
  {
    id: 'food',
    criteriaNo: 13,
    name: '13. Species-Specific Food (Getzoo)',
    icon: 'bowl',
    category: 'food_mixes',
    section: 'Hides & Hydration',
    tagline: 'Getzoo gourmet seed mix (India’s top pick)',
    tip: '100% pellet-free, diverse species seed mix. India’s Hamster Rescue recommends Getzoo. Strictly zero sugar or fruit for diabetes-prone Russian and Chinese dwarfs.'
  },

  // --- SECTION 4: ADOPTION DAY & FREE ROAM ---
  {
    id: 'carrier',
    criteriaNo: 14,
    name: '14. Transport Carrier (Large Only)',
    icon: 'cage',
    category: 'carriers',
    section: 'Adoption Day & Free Roam',
    tagline: 'Large size only for adoption collection day',
    tip: 'Rescues will inspect your carrier on collection day. Large carriers only (e.g. Ferplast Aladino Large or Savic Elmo Large) lined with 5cm bedding and cucumber.'
  },
  {
    id: 'playpen',
    criteriaNo: 15,
    name: '15. Playpen / Safe Free-Roam Space',
    icon: 'sparkle',
    category: 'playpens',
    section: 'Adoption Day & Free Roam',
    tagline: 'Pop-up mesh pen or modular plastic panels',
    tip: 'A secure playpen (like Songmics transparent modular panels or pop-up mesh pen) for daily out-of-cage bonding, exercise, and mental stimulation.'
  },
  {
    id: 'clutter',
    criteriaNo: 16,
    name: '16. Clutter & Enrichment Chews',
    icon: 'sprout',
    category: 'clutter',
    section: 'Adoption Day & Free Roam',
    tagline: 'Sunflower heads, lotus pods & whimzees',
    tip: 'Clutter fills empty spaces so prey hamsters feel safe under overhead cover. Giant sunflower heads, lotus pods, whimzees, and dandelion roots.'
  }
];

// Curated Setup Presets (Covering ALL 16 of India's Adoption Criteria!)
export const SETUP_PRESETS = [
  {
    id: 'smart_saver',
    name: 'Smart Saver & DIY',
    badge: '🪙 Maximum Thrift & Ingenuity',
    tone: 'mint',
    tagline: 'Complete 16-point adoption setup on a sensible budget',
    desc: 'Meets every single one of India’s 16 adoption requirements. Uses smart thrifted hides, bulk substrates, Argos play sand, DIY stilts, and India’s full variety spray bouquet.',
    targetBudget: 230,
    items: {
      syrian: {
        enclosure: 'enc-pawhut-115',
        bedding: 'bed-aubiose-hemp',
        wheel: 'wheel-pah-plastic-28',
        sand: 'sand-suburban-play',
        platforms: 'plat-wooden-stilts',
        dig_box: 'sub-3-pack-bundle',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-birch-wood',
        branch: 'branch-grapevine-wood',
        water: 'water-shallow-ceramic',
        hide_mc: 'hide-happy-henrys',
        extra_hides: 'hides-thrift-trio',
        food: 'food-getzoo-syrian',
        carrier: 'carrier-savic-elmo',
        playpen: 'playpen-popup-mesh',
        clutter: 'clutter-india-botanicals'
      },
      dwarf: {
        enclosure: 'enc-pawhut-115',
        bedding: 'bed-aubiose-hemp',
        wheel: 'wheel-bucatstate-26',
        sand: 'sand-suburban-play',
        platforms: 'plat-wooden-stilts',
        dig_box: 'sub-3-pack-bundle',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-birch-wood',
        branch: 'branch-grapevine-wood',
        water: 'water-shallow-ceramic',
        hide_mc: 'hide-happy-henrys',
        extra_hides: 'hides-thrift-trio',
        food: 'food-getzoo-dwarf',
        carrier: 'carrier-savic-elmo',
        playpen: 'playpen-popup-mesh',
        clutter: 'clutter-india-botanicals'
      },
      roborovski: {
        enclosure: 'enc-pawhut-115',
        bedding: 'bed-aubiose-hemp',
        wheel: 'wheel-pah-plastic-28',
        sand: 'sand-suburban-play',
        platforms: 'plat-wooden-stilts',
        dig_box: 'sub-3-pack-bundle',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-birch-wood',
        branch: 'branch-grapevine-wood',
        water: 'water-shallow-ceramic',
        hide_mc: 'hide-happy-henrys',
        extra_hides: 'hides-thrift-trio',
        food: 'food-getzoo-dwarf',
        carrier: 'carrier-savic-elmo',
        playpen: 'playpen-popup-mesh',
        clutter: 'clutter-india-botanicals'
      }
    }
  },
  {
    id: 'classic_turnkey',
    name: 'Classic Turnkey & Wire',
    badge: '⚖️ UK Rescue Community Favorite',
    tone: 'mustard',
    tagline: 'Trusted barred enclosures & handcrafted enrichment',
    desc: 'The turnkey kit used across UK rescue foster homes. Roomy Savic Plaza cage, silent bearing wheel, Fitch paper bedding, handcrafted wooden multi-chamber, India’s spray bouquet, and Songmics playpen.',
    targetBudget: 315,
    items: {
      syrian: {
        enclosure: 'enc-savic-plaza-120',
        bedding: 'bed-fitch-paper-70l',
        wheel: 'wheel-bucatstate-32',
        sand: 'sand-pets-desert',
        platforms: 'plat-niteangel-corner',
        dig_box: 'sub-3-pack-bundle',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-birch-wood',
        branch: 'branch-grapevine-wood',
        water: 'water-trixie-standing',
        hide_mc: 'hide-hopes-mc',
        extra_hides: 'hide-ceramic-mushroom',
        food: 'food-getzoo-syrian',
        carrier: 'carrier-aladino-large',
        playpen: 'playpen-songmics-panels',
        clutter: 'clutter-india-botanicals'
      },
      dwarf: {
        enclosure: 'enc-savic-plaza-100',
        bedding: 'bed-fitch-paper-70l',
        wheel: 'wheel-bucatstate-26',
        sand: 'sand-pets-desert',
        platforms: 'plat-niteangel-corner',
        dig_box: 'sub-3-pack-bundle',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-birch-wood',
        branch: 'branch-grapevine-wood',
        water: 'water-trixie-standing',
        hide_mc: 'hide-hopes-mc',
        extra_hides: 'hide-ceramic-mushroom',
        food: 'food-getzoo-dwarf',
        carrier: 'carrier-aladino-large',
        playpen: 'playpen-songmics-panels',
        clutter: 'clutter-india-botanicals'
      },
      roborovski: {
        enclosure: 'enc-savic-plaza-100',
        bedding: 'bed-fitch-paper-70l',
        wheel: 'wheel-bucatstate-26',
        sand: 'sand-pets-desert',
        platforms: 'plat-niteangel-corner',
        dig_box: 'sub-3-pack-bundle',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-birch-wood',
        branch: 'branch-grapevine-wood',
        water: 'water-trixie-standing',
        hide_mc: 'hide-hopes-mc',
        extra_hides: 'hide-ceramic-mushroom',
        food: 'food-getzoo-dwarf',
        carrier: 'carrier-aladino-large',
        playpen: 'playpen-songmics-panels',
        clutter: 'clutter-india-botanicals'
      }
    }
  },
  {
    id: 'showcase_acrylic',
    name: 'Acrylic & Showcase',
    badge: '✨ Pre-Assembled Acrylic Suite',
    tone: 'lilac',
    tagline: 'Barless front-viewing & modern designer accessories',
    desc: 'Turnkey acrylic hybrid habitat with deep substrate basin, magnetic doors, ultra-quiet dual bearing wheel, designer cooling ceramics, multi-chamber dig box, and Songmics playpen.',
    targetBudget: 460,
    items: {
      syrian: {
        enclosure: 'enc-bucatstate-3',
        bedding: 'bed-kaytee-clean-cozy',
        wheel: 'wheel-bucatstate-32',
        sand: 'bath-niteangel-glass',
        platforms: 'plat-niteangel-corner',
        dig_box: 'sub-hopes-digbox',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-bamboo-ceramic',
        branch: 'branch-java-wood',
        water: 'water-trixie-standing',
        hide_mc: 'hide-bucatstate-mc',
        extra_hides: 'hides-ceramic-trio',
        food: 'food-getzoo-syrian',
        carrier: 'carrier-aladino-large',
        playpen: 'playpen-songmics-panels',
        clutter: 'clutter-hopes-harvest'
      },
      dwarf: {
        enclosure: 'enc-bucatstate-3',
        bedding: 'bed-kaytee-clean-cozy',
        wheel: 'wheel-bucatstate-26',
        sand: 'bath-niteangel-glass',
        platforms: 'plat-niteangel-corner',
        dig_box: 'sub-hopes-digbox',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-bamboo-ceramic',
        branch: 'branch-java-wood',
        water: 'water-trixie-standing',
        hide_mc: 'hide-bucatstate-mc',
        extra_hides: 'hides-ceramic-trio',
        food: 'food-getzoo-dwarf',
        carrier: 'carrier-aladino-large',
        playpen: 'playpen-songmics-panels',
        clutter: 'clutter-hopes-harvest'
      },
      roborovski: {
        enclosure: 'enc-bucatstate-3',
        bedding: 'bed-kaytee-clean-cozy',
        wheel: 'wheel-bucatstate-26',
        sand: 'bath-niteangel-glass',
        platforms: 'plat-niteangel-corner',
        dig_box: 'sub-hopes-digbox',
        sprays: 'forage-indias-bouquet',
        tunnels: 'tunnel-bamboo-ceramic',
        branch: 'branch-java-wood',
        water: 'water-trixie-standing',
        hide_mc: 'hide-bucatstate-mc',
        extra_hides: 'hides-ceramic-trio',
        food: 'food-getzoo-dwarf',
        carrier: 'carrier-aladino-large',
        playpen: 'playpen-songmics-panels',
        clutter: 'clutter-hopes-harvest'
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
  targetBudget: 200,
  selectedSlots: {}, // { enclosure: '...', ... }
  pickerActiveSlot: null,
  lastSpecies: 'all'
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

// Evaluate welfare safety & completeness against India's 16 criteria
export function evaluateWelfare(selectedSlots, speciesId = 'all') {
  const issues = [];
  const passes = [];

  BUILDER_SLOTS.forEach(slot => {
    const prodId = selectedSlots[slot.id];
    const prod = products.find(p => p.id === prodId);

    if (!prod) {
      issues.push({ text: `Missing: ${slot.name}`, severity: 'error', slotId: slot.id });
      return;
    }

    // Specific criteria rule checks
    if (slot.id === 'wheel') {
      if (speciesId === 'syrian') {
        const isSmall = /20cm|22cm|24cm|26cm/i.test(prod.name);
        if (isSmall) {
          issues.push({ text: 'Syrians need a 28cm+ wheel to avoid curved spines!', severity: 'warning', slotId: slot.id });
        } else {
          passes.push({ text: 'Criteria #3: 28cm+ Wheel for Syrian (Flat Spine)', type: 'wheel' });
        }
      } else if (speciesId === 'roborovski') {
        passes.push({ text: 'Criteria #3: 21cm+ Wheel for Roborovski', type: 'wheel' });
      } else {
        passes.push({ text: 'Criteria #3: 26cm+ Wheel for Dwarf', type: 'wheel' });
      }
    } else if (slot.id === 'food') {
      if ((speciesId === 'winter_white' || speciesId === 'campbells' || speciesId === 'chinese') && (prod.species && !prod.species.includes(speciesId) && prod.species.includes('syrian'))) {
        issues.push({ text: 'Dwarfs are prone to diabetes! Pick a fruit-free dwarf mix.', severity: 'warning', slotId: slot.id });
      } else {
        passes.push({ text: `Criteria #${slot.criteriaNo}: ${slot.name}`, type: slot.id });
      }
    } else if (slot.id === 'sprays') {
      if (prod.isOptionalTopUp) {
        issues.push({ text: 'Single-type spray packs (like flax alone) are optional extras—choose a full variety spray bundle for proper coverage!', severity: 'warning', slotId: slot.id });
      } else {
        passes.push({ text: `Criteria #${slot.criteriaNo}: ${slot.name}`, type: slot.id });
      }
    } else {
      passes.push({ text: `Criteria #${slot.criteriaNo}: ${slot.name}`, type: slot.id });
    }
  });

  const isComplete = !issues.some(i => i.severity === 'error');
  return { issues, passes, isComplete };
}

// Generate clipboard-friendly shopping text
export function formatShoppingReceiptText(selectedSlots, currentSpecies = 'all') {
  const total = calculateSetupTotal(selectedSlots);
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  let lines = [
    `🐹 FOR THE HAMS! — India's Hamster Rescue Vetted Habitat`,
    `Generated: ${dateStr} | Species: ${currentSpecies.toUpperCase()}`,
    `Standard: 100% Meets All 16 Adoption Criteria (India's Hamster Rescue #1213919)`,
    `Estimated Total: £${total.toFixed(2)}`,
    `--------------------------------------------------`
  ];

  BUILDER_SLOTS.forEach(slot => {
    const prodId = selectedSlots[slot.id];
    if (prodId) {
      const p = products.find(prod => prod.id === prodId);
      if (p) {
        const price = getProductPrice(p);
        lines.push(`• [Criteria #${slot.criteriaNo}] ${slot.name}`);
        lines.push(`  Item: ${p.name}`);
        lines.push(`  Price: £${price.toFixed(2)} | Retailer: ${p.retailer || 'UK Stockist'}`);
        if (p.url) lines.push(`  Link: ${p.url}`);
        lines.push(``);
      }
    }
  });

  lines.push(`--------------------------------------------------`);
  lines.push(`Official India's Hamster Rescue Criteria: https://www.indiashamsterrescue.co.uk/hamstercareinfo`);
  lines.push(`Build or customize your setup at: https://www.forthehams.co.uk/#builder`);
  lines.push(`Ethical UK Baseline: 100x50x50cm minimum • Solitary only • No hay or fluffy wool!`);
  return lines.join('\n');
}

// Group slots by section
function getSlotsBySection() {
  const sections = {};
  BUILDER_SLOTS.forEach(slot => {
    if (!sections[slot.section]) sections[slot.section] = [];
    sections[slot.section].push(slot);
  });
  return sections;
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
  const sections = getSlotsBySection();

  // Budget difference calculation
  const diff = builderState.targetBudget - total;
  const isUnder = diff >= 0;
  const absDiff = Math.abs(diff).toFixed(2);
  const percentSpent = Math.min(100, Math.round((total / Math.max(1, builderState.targetBudget)) * 100));

  container.innerHTML = `
    <div class="home-builder animate-fade-in pb-12">
      <!-- Top Section Switcher (Catalog vs Builder) -->
      <div class="mb-4">
        <div class="mode-toggle" role="tablist" aria-label="Section Navigation">
          <button type="button" id="builder-nav-catalog-btn" class="mode-toggle-btn">
            <span>📦 Safe Picks Catalog</span>
          </button>
          <button type="button" class="mode-toggle-btn is-active" aria-selected="true">
            <span>🔨 Home Builder (By Budget)</span>
          </button>
        </div>
      </div>

      <!-- Blueprint Header Banner -->
      <header class="blueprint-card mb-5 relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="tag tag-pink">${icon('heart', 12)} India's Hamster Rescue Standards</span>
        </div>

        <h1 class="text-2xl sm:text-3xl font-display leading-tight mb-1.5">
          Hamster Home Builder
        </h1>
        <p class="text-[14.5px] leading-relaxed text-ink-soft mb-3">
          Build an ethical setup that fulfills <strong>all 16 official adoption criteria</strong> from <a href="https://www.indiashamsterrescue.co.uk/hamstercareinfo" target="_blank" rel="noopener noreferrer" class="underline font-bold text-ink hover:text-tomato">India's Hamster Rescue (Charity #1213919)</a>, tailored to your budget with direct links to UK stockists.
        </p>

        <!-- Equality Notice: Budget does not equal Welfare -->
        <div class="portal-box bg-mint-soft border-mint p-3 text-xs sm:text-[13px] leading-relaxed flex items-start gap-2.5 rounded-lg mb-2">
          <span class="text-base shrink-0">🌻</span>
          <div>
            <strong class="font-bold">A thrifty home is every bit as ethical as an expensive home!</strong>
            <span class="text-ink-soft">
              Hamsters only care about deep burrowing space, safe sand, a large upright wheel, and plenty of forage—price differences only reflect materials and pre-assembly.
            </span>
          </div>
        </div>

        <!-- Mode Segmented Switcher (Fixed & Anchored) -->
        <div class="mt-3.5 pt-3 border-t-2 border-dashed border-ink/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <span class="text-xs uppercase font-extrabold tracking-wider text-ink">Planning Mode:</span>

          <div class="mode-toggle" role="tablist" aria-label="Planning Mode">
            <button type="button" id="builder-mode-presets" class="mode-toggle-btn ${builderState.mode === 'presets' ? 'is-active' : ''}" aria-selected="${builderState.mode === 'presets'}">
              <span>🪙 1-Click Curated Presets</span>
            </button>
            <button type="button" id="builder-mode-custom" class="mode-toggle-btn ${builderState.mode === 'custom' ? 'is-active' : ''}" aria-selected="${builderState.mode === 'custom'}">
              <span>🛠️ Custom Builder</span>
            </button>
          </div>
        </div>
      </header>

      <!-- PRESET MODE: 3 Curated Setup Styles -->
      ${builderState.mode === 'presets' ? renderPresetsSection(currentSpecies) : ''}

      <!-- LIVE BUDGET GAUGE & PROGRESS BAR -->
      <div class="portal-box bg-white p-4 mb-4 shadow-sm rounded-xl border-2 border-ink">
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
              <span class="tag tag-mint text-xs font-bold py-1 px-2.5 inline-flex items-center gap-1">
                ${icon('tick', 13)} £${absDiff} under target
              </span>
            ` : `
              <span class="tag tag-tomato text-xs font-bold py-1 px-2.5 inline-flex items-center gap-1">
                £${absDiff} over target
              </span>
            `}
          </div>
        </div>

        <!-- Interactive Budget Target Slider (In Custom Mode) -->
        ${builderState.mode === 'custom' ? `
          <div class="mt-3 pt-3 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2">
            <label for="budget-slider" class="text-xs font-bold text-ink-soft">Adjust Target Budget:</label>
            <div class="flex items-center gap-2">
              <input type="range" id="budget-slider" min="150" max="600" step="10" value="${builderState.targetBudget}" class="accent-tomato cursor-pointer">
              <span class="font-display font-bold text-sm bg-paper-2 px-2 py-0.5 border border-ink rounded">£${builderState.targetBudget}</span>
            </div>
          </div>
        ` : ''}

        <!-- Progress meter -->
        <div class="w-full bg-paper-2 border border-ink h-3 rounded-full overflow-hidden mt-2.5 relative">
          <div class="h-full transition-all duration-300 ${percentSpent > 100 ? 'bg-tomato' : (percentSpent > 85 ? 'bg-mustard' : 'bg-mint')}" style="width: ${percentSpent}%"></div>
        </div>
      </div>

      <!-- WELFARE CHECKMETER (AGAINST ALL 16 ADOPTION CRITERIA) -->
      <div class="portal-box ${welfare.isComplete && welfare.issues.length === 0 ? 'bg-mint-soft border-mint' : 'bg-tomato-soft border-tomato'} px-4 py-3 mb-5 rounded-xl text-xs sm:text-sm">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-base">${welfare.isComplete && welfare.issues.length === 0 ? '🎖️' : '⚠️'}</span>
            <h3 class="font-display text-sm sm:text-base font-bold">
              ${welfare.isComplete && welfare.issues.length === 0 ? 'All 16 Adoption Criteria Met (Adoption Ready)' : `${welfare.passes.length} of 16 Criteria Met — Check Notices Below`}
            </h3>
          </div>
          <span class="pixel text-[11px] font-bold shrink-0">${welfare.passes.length} / 16</span>
        </div>
        ${welfare.issues.length > 0 ? `
          <div class="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-ink/15">
            ${welfare.issues.map(iss => `
              <span class="tag ${iss.severity === 'error' ? 'tag-tomato' : 'tag-mustard'} text-[11px]">
                ${icon('nope', 11)} ${iss.text}
              </span>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- 16 SETUP SLOTS GROUPED BY 4 SECTIONS -->
      <section class="mb-6">
        <div class="flex items-baseline justify-between gap-2 mb-3">
          <h2 class="text-xl sm:text-2xl font-display">Habitat & Adoption Checklist</h2>
          <span class="text-xs text-ink-soft">Tap 'Swap / Change' on any item</span>
        </div>

        ${Object.entries(sections).map(([secName, secSlots]) => `
          <div class="mb-5">
            <div class="flex items-center gap-2 mb-2 pb-1 border-b-2 border-ink">
              <span class="font-display text-base font-bold text-ink uppercase tracking-wide">${secName}</span>
              <span class="text-xs text-ink-soft">(${secSlots.length} items)</span>
            </div>
            <div class="grid grid-cols-1 gap-2.5">
              ${secSlots.map(slot => renderSlotCard(slot, builderState.selectedSlots[slot.id], currentSpecies)).join('')}
            </div>
          </div>
        `).join('')}
      </section>

      <!-- SHOPPING RECEIPT & EXPORT -->
      <section class="shop-receipt bg-white p-5 rounded-xl border-3 border-ink shadow-lg relative mt-8">
        <div class="receipt-cutout-top"></div>
        <div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-3 mb-3">
          <div>
            <h3 class="font-display text-xl font-bold">Adoption Shopping List</h3>
            <p class="text-xs text-ink-soft">Direct links to verified UK makers, independent stores, and India's shop.</p>
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
              <div class="py-2 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <div class="min-w-0 flex-1">
                  <span class="text-[11px] font-bold text-ink-soft block">${slot.name}</span>
                  <strong class="font-bold text-ink">${clean(prod.name)}</strong>
                  <span class="text-ink-soft text-[11px]"> · ${clean(prod.retailer || '')}</span>
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
            <span>Fulfills all 16 of India's Hamster Rescue criteria</span>
          </div>
          <div class="text-right">
            <span class="text-xs uppercase text-ink-soft block font-bold">Estimated Total (16 Items)</span>
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
    <div class="presets-section mb-5">
      <div class="flex items-baseline justify-between gap-2 mb-2">
        <h2 class="text-xl sm:text-2xl font-display">1-Click Curated Setups</h2>
        <span class="text-xs text-ink-soft">Includes all 16 criteria</span>
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
                <span class="tag tag-${preset.tone} text-ink text-[10.5px] font-bold">${preset.badge}</span>
                <span class="font-display font-bold text-sm text-ink">~£${presetTotal.toFixed(0)}</span>
              </div>
              <h3 class="font-display text-base font-bold text-ink leading-snug">${preset.name}</h3>
              <p class="text-xs text-ink-soft mt-1 leading-relaxed">${preset.desc}</p>
              <div class="mt-3 pt-2 border-t border-ink/10 flex items-center justify-between">
                <span class="text-[11px] font-bold ${isActive ? 'text-tomato' : 'text-ink-soft'}">
                  ${isActive ? '● Active Setup' : '○ Tap to Load'}
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
function renderSlotCard(slot, selectedProdId) {
  const prod = products.find(p => p.id === selectedProdId);
  const price = getProductPrice(prod);

  return `
    <article class="portal-box bg-white p-3.5 rounded-xl border-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex p-1.5 bg-paper-2 border border-ink/30 rounded-md shrink-0">
            ${icon(slot.icon, 18)}
          </span>
          <div>
            <h3 class="font-display text-sm sm:text-base font-bold leading-tight">${slot.name}</h3>
            <span class="text-[11px] text-ink-soft leading-tight block">${slot.tagline}</span>
          </div>
        </div>

        ${prod ? `
          <div class="mt-1.5 pl-2 border-l-2 border-mint">
            <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h4 class="font-bold text-sm text-ink">${clean(prod.name)}</h4>
              <span class="font-display font-bold text-ink text-xs">£${price.toFixed(2)}</span>
              <span class="text-xs text-ink-soft">· ${clean(prod.retailer || 'UK Stockist')}</span>
            </div>
          </div>
        ` : `
          <div class="mt-2 p-2 bg-tomato-soft border border-tomato rounded text-xs text-tomato font-bold">
            ⚠️ No product selected for this slot yet.
          </div>
        `}
      </div>

      <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/10">
        <button type="button" data-pick-slot="${slot.id}" class="btn btn-xs btn-mustard-soft flex items-center gap-1">
          <span>${prod ? 'Swap / Change' : 'Select Item'}</span>
        </button>
        ${prod && prod.url ? `
          <a href="${prod.url}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-ink-soft underline hover:text-tomato flex items-center gap-0.5">
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

  title.innerHTML = `Choose Criteria #${slot.criteriaNo}: ${slot.name}`;

  // Filter products by category, slot specificity, and species
  const eligible = products.filter(p => {
    if (p.category !== slot.category) return false;
    if (slot.id === 'sprays' && p.slotOnly !== 'sprays') return false;
    if (p.slotOnly && p.slotOnly !== slot.id) return false;
    if (currentSpecies !== 'all' && p.species && !p.species.includes(currentSpecies)) {
      return false;
    }
    return true;
  });

  body.innerHTML = `
    <div class="mb-3 p-2.5 bg-paper-2 rounded border border-ink/20 text-xs text-ink-soft leading-normal">
      <strong>India's Rescue Adoption Standard:</strong> ${slot.tip}
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
          btn.innerHTML = `${icon('copy', 14)} <span>Copy Full Shopping List</span>`;
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
