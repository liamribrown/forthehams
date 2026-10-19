// For the Hams! — Concise Infographic Generator & Share Modal
// Generates high-res, shareable infographic cards in the authentic Zine x 2005 aesthetic
// for both Care Guides and Hamster Species profiles.

import { speciesList } from './data/species.js?v=3.0';
import { careGuides } from './data/guides.js?v=3.0';
import { icon, clean } from './icons.js?v=3.0';

// Concise infographic data matrix
export const infographicCatalog = {
  enclosures: {
    title: "100 × 50 × 50 cm Minimum",
    subtitle: "The UK Rescue Standard for All Hamster Species",
    category: "Housing Welfare",
    accentColor: "#f6bc2f", // mustard
    stat: "100 × 50 cm",
    statLabel: "5,000 cm² unbroken floor minimum",
    keyPoints: [
      { tag: "RULE", text: "Continuous unbroken floor space — connected tubes & modular cages do NOT count." },
      { tag: "HEALTH", text: "Barless enclosures (glass tanks/DIYs) eliminate bar chewing, dental fractures & falls." },
      { tag: "BURROW", text: "Must hold at least 20cm to 30cm+ deep compacted paper or aspen bedding." },
      { tag: "BIOLOGY", text: "Wild hamsters run up to 9km a night. Restricted floor space causes severe chronic distress." }
    ],
    didYouKnow: "Bar chewing is NOT teeth filing — it is a stereotypic sign of claustrophobia and desperation to escape.",
    quote: "No tiny cages. Give your hamster the space they biologically need."
  },
  bedding: {
    title: "Bedding & Burrowing Guide",
    subtitle: "Subterranean Tunnel Architecture & Safety",
    category: "Enclosure Setup",
    accentColor: "#8fd6b1", // mint
    stat: "20cm+",
    statLabel: "Minimum depth (8+ inches)",
    keyPoints: [
      { tag: "SAFE", text: "Compressed paper bedding (Fitch, Kaytee) & kiln-dried aspen shavings hold burrows firmly." },
      { tag: "BAN", text: "NO HAY OR STRAW: Sharp rigid stalks cause corneal eye punctures & cheek pouch abscesses." },
      { tag: "LETHAL", text: "NO FLUFFY COTTON WOOL: The #1 killer — strangles intestines and amputates limbs." },
      { tag: "METHOD", text: "Press bedding down firmly in 5cm layers to lock fibers together for sturdy burrows." }
    ],
    didYouKnow: "Hamsters do not eat hay. Hay stalks frequently poke into eyes and puncture cheek pouches.",
    quote: "Burrowing is their deepest instinct. Compact bedding deep!"
  },
  wheels: {
    title: "Safe Upright Wheel Rules",
    subtitle: "Protecting Spinal Health & Daily Cardio",
    category: "Exercise Welfare",
    accentColor: "#93cdf4", // sky
    stat: "28–32cm",
    statLabel: "Syrian minimum wheel diameter",
    keyPoints: [
      { tag: "SYRIAN", text: "28cm to 32cm upright solid running track (spine must be 100% straight and flat)." },
      { tag: "DWARFS", text: "26cm+ upright wheel for Russian, Campbell's, and Chinese hamsters." },
      { tag: "ROBO", text: "21cm+ upright wheel with a lightweight, smooth ball-bearing spin mechanism." },
      { tag: "BANNED", text: "NO wire mesh or rungs (causes bumblefoot) and NO flying saucers (curved spines & ejections)." }
    ],
    didYouKnow: "If a hamster runs with their spine curved like a banana, the wheel is too small and causes chronic spinal trauma.",
    quote: "Flat spine rule: check their back is completely level while running."
  },
  sand_baths: {
    title: "Sand Baths & Hygiene",
    subtitle: "Coat Degreasing, Claws & Desert Instincts",
    category: "Grooming & Hygiene",
    accentColor: "#f6bc2f", // mustard
    stat: "NO WATER",
    statLabel: "Hamsters clean themselves in sand",
    keyPoints: [
      { tag: "DANGER", text: "NEVER bath a hamster in water: strips natural oils, causing lethal hypothermia & pneumonia." },
      { tag: "ROBOS", text: "Roborovski desert dwellers require at least 1/3 of their entire enclosure as deep sand." },
      { tag: "DISH", text: "Syrians & Dwarfs need an A4-sized dish (approx 25x20cm), 5–8cm deep for full coat rolls." },
      { tag: "SAFE SAND", text: "Reptile desert sand (calcium-free, dye-free) or oven-sterilised children's play sand." }
    ],
    didYouKnow: "Avoid chinchilla dust (respiratory damage) and calcium sand (forms cement-like clumps if swallowed).",
    quote: "Sand naturally removes excess sebum oils and keeps claws neatly filed."
  },
  multi_chamber: {
    title: "Multi-Chamber Hides",
    subtitle: "Replicating Wild Underground Burrows",
    category: "Nesting Welfare",
    accentColor: "#bfaaf3", // lilac
    stat: "3+ Rooms",
    statLabel: "Sleeping nest, food pantry & latrine",
    keyPoints: [
      { tag: "DESIGN", text: "Bottomless design so hamsters can dig deep into bedding directly underneath." },
      { tag: "ROOF", text: "Removable lift-off roof allows spot-cleaning without destroying their precious nest." },
      { tag: "STILTS", text: "Must rest on stilts on the cage floor so it cannot crush hamsters burrowing below." },
      { tag: "DOORWAYS", text: "Entrance holes: 7cm+ for Syrians, 5cm+ for Dwarfs (protects stuffed cheeks)." }
    ],
    didYouKnow: "Hamsters sleep in darkness and security. Single-room plastic igloos trap humidity and cause stress.",
    quote: "A safe underground haven for sleeping, hoarding, and grooming."
  },
  substrates_textures: {
    title: "Tactile Substrates & Dig Boxes",
    subtitle: "Sensory Variety Beyond Bedding",
    category: "Sensory Enrichment",
    accentColor: "#cfe97c", // lime
    stat: "2–3 Textures",
    statLabel: "Different digging materials",
    keyPoints: [
      { tag: "COIR", text: "Coco coir (tropical terrain): expands into rich earthy soil (dry thoroughly before use)." },
      { tag: "CHIPS", text: "Fine beech chips & cork granules provide tactile claw resistance and burrowing fun." },
      { tag: "MOSS", text: "Dried sphagnum moss softens corners and hides foraged seeds." },
      { tag: "SAFETY", text: "Mount heavy ceramic dishes or wooden boxes on stilts to prevent crushing tunnels." }
    ],
    didYouKnow: "In the wild, hamsters cross hard clay, scrub, and sand. Tactile variation keeps minds sharp.",
    quote: "Turn a cage into a naturalistic sensory playground."
  },
  forage_sprays: {
    title: "Sprays, Forage & Clutter",
    subtitle: "Natural Prey-Animal Cover & Harvest Fun",
    category: "Foraging Welfare",
    accentColor: "#8fd6b1", // mint
    stat: "Cover Up",
    statLabel: "Prey animals need clutter",
    keyPoints: [
      { tag: "CLUTTER", text: "Wide open spaces terrify hamsters. Dense sprays make them feel brave & confident." },
      { tag: "SPRAYS", text: "Flax, red/white sorghum, wheat, and millets mimic wild harvest instincts." },
      { tag: "FREEZE", text: "48-Hour Freezer Protocol: Freeze new seed bags for 48h to prevent pantry pests." },
      { tag: "WARNING", text: "NEVER pick garden plants: pesticides, vehicle exhaust, and parasite risks." }
    ],
    didYouKnow: "Flax sprays are rich in essential Omega-3 fatty acids for a glowing, silky coat.",
    quote: "A crowded, cluttered cage makes a confident, happy hamster."
  },
  food_mixes_nutrition: {
    title: "Hamster Nutrition Standard",
    subtitle: "High Biodiversity, Pellet-Free Seed Diets",
    category: "Diet & Nutrition",
    accentColor: "#f6bc2f", // mustard
    stat: "15–18%",
    statLabel: "Crude protein with 25+ seeds",
    keyPoints: [
      { tag: "DIET", text: "25+ wild seeds, grains, mealworms and dried flowers (Mixerama, Getzoo, Bunny Expert)." },
      { tag: "NO PELLETS", text: "Ditch pet store mueslis: dyed sugary biscuits and rejected compressed pellets." },
      { tag: "DIABETES", text: "Dwarf Hamsters: STRICTLY NO dried fruit, sugars, corn syrup or pea flakes." },
      { tag: "FEEDING", text: "Scatter feed 1–2 tbsp across bedding to stimulate natural foraging instincts." }
    ],
    didYouKnow: "Always freeze new seed bags at -18°C for 48 hours upon delivery to eradicate harmless mite eggs.",
    quote: "Ditch the bowl — let them forage and pouch naturally!"
  },
  solitary_rule: {
    title: "1 Hamster, 1 Enclosure",
    subtitle: "All Domestic Hamster Species Must Live Alone",
    category: "Vital Social Welfare",
    accentColor: "#ef5a3c", // tomato
    stat: "1 ONLY",
    statLabel: "Never cohouse domestic hamsters",
    keyPoints: [
      { tag: "MYTH", text: "Pet shop myth: Dwarfs do NOT want companions. In captivity, pairs fail catastrophically." },
      { tag: "VIOLENCE", text: "Sexual maturity (4–8 months) triggers sudden territorial aggression & fatal fighting." },
      { tag: "TERROR", text: "Dominant hamsters block access to food, wheels & water, causing silent starvation." },
      { tag: "PEACE", text: "Hamsters are strictly solitary animals. They feel peaceful only when their territory is theirs." }
    ],
    didYouKnow: "Rescues constantly treat horrific facial puncture wounds and amputations from cohousing.",
    quote: "Hamsters don't get lonely. They love having their kingdom to themselves."
  }
};

// Generates infographic payload for either a guide or a species
export function getInfographicData(id, type = 'guide') {
  if (type === 'species') {
    const spec = speciesList.find(s => s.id === id);
    if (!spec) return null;

    const isDwarf = ['winter_white', 'campbells', 'chinese', 'roborovski'].includes(spec.id);
    const dietWarning = isDwarf
      ? "STRICTLY NO fruit, sugars or honey drops (high diabetes risk). Low-sugar grass seeds only."
      : "High biodiversity seed mix (15–18% protein). Fresh leafy greens and occasional fruit treat safe.";

    return {
      title: `${clean(spec.name)} Care Matrix`,
      subtitle: `Official UK Rescue Care Standard • ${clean(spec.badge || 'Welfare Baseline')}`,
      category: "Species Care Guide",
      accentColor: spec.id === 'syrian' ? '#f6bc2f' : spec.id === 'roborovski' ? '#93cdf4' : spec.id === 'chinese' ? '#8fd6b1' : '#f8acc8',
      stat: clean(spec.minCageSize || '100 × 50 cm'),
      statLabel: "Minimum unbroken cage size",
      keyPoints: [
        { tag: "WHEEL", text: `Upright wheel: ${clean(spec.minWheelSize || '28cm+')}. Flat spine required while running.` },
        { tag: "BEDDING", text: `Bedding depth: at least ${clean(spec.beddingDepth || '20cm+')}. Packed paper or aspen (NO HAY).` },
        { tag: "SAND", text: `Sand bath: ${clean(spec.sandBathSize || 'A4 size')}. ${clean(spec.sandNote || '')}` },
        { tag: "HOUSING", text: `${clean(spec.solitaryStatus || 'Strictly Solitary')}. Must live 100% alone in captivity.` },
        { tag: "DIET", text: dietWarning }
      ],
      didYouKnow: `Doorways must be at least ${clean(spec.entranceHoleMin || '5cm+')} wide so stuffed cheek pouches never get scraped or stuck.`,
      quote: `Average lifespan: ${clean(spec.lifespan || '2–3 years')}. Give them the best life possible.`
    };
  }

  // Guide lookup
  const guideInfo = infographicCatalog[id];
  if (guideInfo) return guideInfo;

  // Fallback to guide object if custom
  const guide = careGuides.find(g => g.id === id);
  if (!guide) return null;

  return {
    title: clean(guide.title),
    subtitle: clean(guide.summary),
    category: "Care Guide",
    accentColor: "#f6bc2f",
    stat: "100 × 50cm",
    statLabel: clean(guide.badge || "Rescue Standard"),
    keyPoints: [
      { tag: "RULE", text: clean(guide.summary) },
      { tag: "WELFARE", text: "Checked against UK rescue welfare baselines (India's Hamster Rescue #1213919)." }
    ],
    didYouKnow: "Always prioritize unbroken floor space, deep compacted bedding, and a correctly sized upright wheel.",
    quote: "Rescue vetted standards for ethical hamster care."
  };
}

// Helper: draws a rounded rectangle with fallback
function roundRect(ctx, x, y, width, height, radius) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

// Helper: wrap text onto canvas and return ending Y
function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + ' ';
      y += lineHeight;
      lineCount++;
      if (lineCount >= maxLines - 1 && n < words.length - 1) {
        // Truncate remaining
        line += '...';
        break;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
  return y + lineHeight;
}

// Render infographic onto an 800 x 1060 px Canvas (2x scale for crystal clarity)
export function renderInfographicToCanvas(data) {
  const width = 800;
  const height = 1060;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Warm paper background
  ctx.fillStyle = '#fff4df';
  ctx.fillRect(0, 0, width, height);

  // Subtle dot pattern
  ctx.fillStyle = 'rgba(34, 24, 15, 0.04)';
  for (let dx = 20; dx < width; dx += 28) {
    for (let dy = 20; dy < height; dy += 28) {
      ctx.beginPath();
      ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Outer vintage ink frame with drop shadow
  const m = 22; // margin
  const fWidth = width - m * 2;
  const fHeight = height - m * 2;

  // Hard offset drop shadow
  ctx.fillStyle = '#22180f';
  roundRect(ctx, m + 7, m + 7, fWidth, fHeight, 18);
  ctx.fill();

  // White paper panel
  ctx.fillStyle = '#fffdf8';
  roundRect(ctx, m, m, fWidth, fHeight, 18);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#22180f';
  ctx.stroke();

  // 3. Header: Brand Wordmark + Tilted Sticker
  // Top brand text
  ctx.fillStyle = '#22180f';
  ctx.font = '800 28px "Bricolage Grotesque", "Trebuchet MS", sans-serif';
  ctx.fillText('For the Hams!', m + 24, m + 50);

  // Small hamster emoji / symbol
  ctx.font = '22px sans-serif';
  ctx.fillText('🐹', m + 215, m + 48);

  // Rescue badge sticker (tilted)
  ctx.save();
  ctx.translate(width - m - 180, m + 28);
  ctx.rotate(-0.05);
  ctx.fillStyle = '#f6bc2f';
  roundRect(ctx, 0, 0, 160, 38, 8);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#22180f';
  ctx.stroke();

  ctx.fillStyle = '#22180f';
  ctx.font = '700 13px "Caveat", cursive, sans-serif';
  ctx.fillText("with India's Hamster Rescue", 12, 18);
  ctx.font = '700 11px "Silkscreen", monospace';
  ctx.fillText("CHARITY #1213919", 12, 32);
  ctx.restore();

  // 4. Category Tag
  let curY = m + 95;
  ctx.fillStyle = '#22180f';
  roundRect(ctx, m + 24, curY, ctx.measureText(data.category.toUpperCase()).width + 24, 26, 6);
  ctx.fill();
  ctx.fillStyle = '#fffdf8';
  ctx.font = '700 11px "Silkscreen", monospace';
  ctx.fillText(data.category.toUpperCase(), m + 36, curY + 17);

  // 5. Main Title Banner
  curY += 48;
  ctx.fillStyle = '#22180f';
  ctx.font = '800 34px "Bricolage Grotesque", "Trebuchet MS", sans-serif';
  curY = wrapText(ctx, data.title, m + 24, curY, fWidth - 48, 40, 2);

  // Subtitle
  ctx.fillStyle = '#5a4a3a';
  ctx.font = '400 17px "Atkinson Hyperlegible", Verdana, sans-serif';
  curY = wrapText(ctx, data.subtitle, m + 24, curY + 4, fWidth - 48, 24, 2);

  // 6. Highlight Big Stat Box
  curY += 12;
  const statBoxH = 88;
  // Box shadow
  ctx.fillStyle = '#22180f';
  roundRect(ctx, m + 28, curY + 5, fWidth - 48, statBoxH, 12);
  ctx.fill();
  // Main box
  ctx.fillStyle = data.accentColor || '#f6bc2f';
  roundRect(ctx, m + 24, curY, fWidth - 48, statBoxH, 12);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#22180f';
  ctx.stroke();

  // Big stat number
  ctx.fillStyle = '#22180f';
  ctx.font = '800 42px "Bricolage Grotesque", "Trebuchet MS", sans-serif';
  ctx.fillText(data.stat, m + 42, curY + 44);

  // Stat label description
  ctx.font = '700 16px "Atkinson Hyperlegible", Verdana, sans-serif';
  ctx.fillText(data.statLabel, m + 42, curY + 72);

  // 7. Key Rules Cards (4 cards)
  curY += statBoxH + 20;
  const cardW = fWidth - 48;
  const points = (data.keyPoints || []).slice(0, 4);

  points.forEach((pt) => {
    const cardH = 74;
    // Card background
    ctx.fillStyle = '#fffdf8';
    roundRect(ctx, m + 24, curY, cardW, cardH, 10);
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#22180f';
    ctx.stroke();

    // Tag badge inside card
    ctx.fillStyle = data.accentColor || '#f6bc2f';
    roundRect(ctx, m + 36, curY + 14, 82, 26, 6);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#22180f';
    ctx.stroke();

    ctx.fillStyle = '#22180f';
    ctx.font = '700 11px "Silkscreen", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(pt.tag, m + 36 + 41, curY + 31);
    ctx.textAlign = 'left';

    // Text beside tag
    ctx.fillStyle = '#22180f';
    ctx.font = '700 15px "Atkinson Hyperlegible", Verdana, sans-serif';
    wrapText(ctx, pt.text, m + 130, curY + 28, cardW - 146, 21, 2);

    curY += cardH + 11;
  });

  // 8. "Did You Know?" Note Box (Dashed 2005 box)
  curY += 4;
  const noteH = 80;
  ctx.fillStyle = '#ffe8a8';
  roundRect(ctx, m + 24, curY, cardW, noteH, 10);
  ctx.fill();

  ctx.save();
  ctx.setLineDash([6, 5]);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#22180f';
  roundRect(ctx, m + 24, curY, cardW, noteH, 10);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#ef5a3c';
  ctx.font = '700 21px "Caveat", cursive';
  ctx.fillText('💡 Did you know?', m + 38, curY + 25);

  ctx.fillStyle = '#22180f';
  ctx.font = '700 13.5px "Atkinson Hyperlegible", Verdana, sans-serif';
  wrapText(ctx, data.didYouKnow, m + 38, curY + 49, cardW - 28, 19, 2);

  // 9. Verified Footer
  const footY = height - m - 24;
  ctx.fillStyle = '#5a4a3a';
  ctx.font = '700 12px "Atkinson Hyperlegible", sans-serif';
  ctx.fillText('www.forthehams.co.uk • 100% Rescue Vetted Standards', m + 24, footY);

  ctx.font = '700 11px "Silkscreen", monospace';
  ctx.fillStyle = '#ef5a3c';
  ctx.fillText('NO HAY • 100x50 MINIMUM • ONE HAM PER CAGE', width - m - 330, footY);

  return canvas;
}

// Modal management
let activeInfographicBlob = null;
let activeInfographicTitle = '';

export async function openInfographicModal(id, type = 'guide') {
  const data = getInfographicData(id, type);
  if (!data) return;

  activeInfographicTitle = data.title;

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed if fonts ready check errors
    }
  }

  const canvas = renderInfographicToCanvas(data);

  canvas.toBlob((blob) => {
    if (!blob) return;
    activeInfographicBlob = blob;
    const imgUrl = URL.createObjectURL(blob);

    showInfographicModalUI(data, imgUrl, blob);
  }, 'image/png');
}

function showInfographicModalUI(data, imgUrl, blob) {
  let modalBackdrop = document.getElementById('infographic-modal-backdrop');

  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'infographic-modal-backdrop';
    modalBackdrop.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in';
    document.body.appendChild(modalBackdrop);
  }

  const canShareFiles = typeof navigator !== 'undefined' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [new File([blob], 'test.png', { type: 'image/png' })] });

  modalBackdrop.innerHTML = `
    <div id="infographic-modal-card" class="panel bg-white w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden rounded-2xl animate-slide-up shadow-2xl">
      <!-- Header Bar -->
      <div class="panel-bar bg-mustard flex items-center justify-between px-4 py-2.5 shrink-0">
        <div class="flex items-center gap-2">
          ${icon('camera', 20)}
          <span class="font-display text-[15px] normal-case tracking-normal">Shareable Infographic</span>
        </div>
        <button type="button" id="close-infographic-modal" class="btn btn-xs btn-icon" aria-label="Close">
          ${icon('close', 14)}
        </button>
      </div>

      <!-- Scrollable Preview Area -->
      <div class="p-3 sm:p-4 overflow-y-auto flex-grow flex flex-col items-center bg-paper">
        <div class="relative w-full max-w-sm rounded-xl overflow-hidden border-2 border-slate-900 shadow-md">
          <img src="${imgUrl}" alt="${data.title} Infographic" class="w-full h-auto object-contain block select-none">
        </div>
        <p class="v2005 text-[11px] muted text-center mt-2.5">
          Concise, rescue-vetted graphic ready to share on WhatsApp, Instagram, or download!
        </p>
      </div>

      <!-- Action Buttons Footer -->
      <div class="p-3 sm:p-4 bg-white border-t-2 border-slate-900 flex flex-wrap gap-2 shrink-0">
        <button type="button" id="btn-share-native" class="btn btn-tomato flex-1 text-xs sm:text-sm py-2">
          ${icon('share', 16)} <span>Share Infographic</span>
        </button>
        <button type="button" id="btn-download-png" class="btn btn-mint text-xs sm:text-sm py-2">
          ${icon('download', 16)} <span>Save Image</span>
        </button>
        <button type="button" id="btn-copy-png" class="btn text-xs sm:text-sm py-2" title="Copy image to clipboard">
          ${icon('copy', 16)}
        </button>
      </div>
    </div>
  `;

  modalBackdrop.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  // Close handlers
  const close = () => {
    modalBackdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  document.getElementById('close-infographic-modal')?.addEventListener('click', close);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) close();
  });

  // Share action (native Web Share API)
  document.getElementById('btn-share-native')?.addEventListener('click', async () => {
    const file = new File([blob], `forthehams-${data.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`, { type: 'image/png' });

    if (canShareFiles && navigator.share) {
      try {
        await navigator.share({
          title: `For the Hams! — ${data.title}`,
          text: `${data.title} — ${data.subtitle}. UK Rescue standards via forthehams.co.uk`,
          files: [file]
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          downloadImage(imgUrl, data.title);
        }
      }
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: `For the Hams! — ${data.title}`,
          text: `${data.title} — ${data.subtitle}\n${data.stat} (${data.statLabel})\nRead more: https://www.forthehams.co.uk/`,
          url: 'https://www.forthehams.co.uk/'
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          downloadImage(imgUrl, data.title);
        }
      }
    } else {
      // Direct download fallback
      downloadImage(imgUrl, data.title);
    }
  });

  // Download action
  document.getElementById('btn-download-png')?.addEventListener('click', () => {
    downloadImage(imgUrl, data.title);
  });

  // Copy to clipboard action
  document.getElementById('btn-copy-png')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-copy-png');
    if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
      downloadImage(imgUrl, data.title);
      return;
    }
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      if (btn) btn.innerHTML = `${icon('tick', 16)}`;
      setTimeout(() => { if (btn) btn.innerHTML = icon('copy', 16); }, 2000);
    } catch {
      downloadImage(imgUrl, data.title);
    }
  });
}

function downloadImage(url, title) {
  const a = document.createElement('a');
  a.href = url;
  const slug = clean(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'hamster-care';
  a.download = `forthehams-${slug}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
