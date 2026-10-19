// For the Hams! — Collectible Binder System
// Tracks collected cards in localStorage under 'fth_binder_v1' without accounts.
// Renders 3x3 sleeve binder pages with flip animation on first discovery.

import { cards, series, formatCardNo } from '../data/cards.js?v=3.1';
import { buildCard } from './card-template.js?v=3.1';
import { icon, clean } from '../icons.js?v=3.1';

const STORAGE_KEY = 'fth_binder_v1';

// Read binder state safely
export function getBinderState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('localStorage not accessible, using ephemeral binder', e);
    return {};
  }
}

// Collect a card by its number. Returns true if this was a first-time discovery.
export function collectCard(cardNo) {
  const numStr = String(cardNo);
  const state = getBinderState();
  const isFirst = !state[numStr];

  if (isFirst) {
    state[numStr] = new Date().toISOString().split('T')[0];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist card collection', e);
    }
    updateHeaderBadge();
  }

  return isFirst;
}

// Check if card is already collected
export function isCardCollected(cardNo) {
  const state = getBinderState();
  return Boolean(state[String(cardNo)]);
}

// Count of total collected cards
export function getCollectedCount() {
  const state = getBinderState();
  return Object.keys(state).length;
}

// Update the header sticker badge count
export function updateHeaderBadge() {
  const badgeEl = document.getElementById('binder-count-badge');
  if (badgeEl) {
    const count = getCollectedCount();
    badgeEl.textContent = String(count);
    badgeEl.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

// Renders the full #binder page view
export function renderBinderView(container, onCardClick) {
  if (!container) return;
  const collected = getBinderState();
  const count = getCollectedCount();

  container.innerHTML = `
    <div class="binder-container py-4">
      <!-- Binder Masthead -->
      <div class="p-4 sm:p-5 rounded-2xl bg-mustard-soft mb-6" style="border: 2px solid var(--ink); box-shadow: 4px 4px 0 var(--ink)">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div class="v2005 text-xs font-bold uppercase tracking-wider muted">Trading Card Album</div>
            <h2 class="font-display text-2xl sm:text-3xl text-slate-900 leading-tight">My Hamster Binder</h2>
          </div>
          <div class="badge-tag bg-mustard text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-full" style="border: 2px solid var(--ink)">
            ${icon('rosette', 18)}
            <span><strong id="binder-view-count">${count}</strong> cards collected</span>
          </div>
        </div>
        <p class="font-hand text-lg mt-2 text-slate-800">
          Open cards across guides & species profiles to add them to your sleeve binder!
        </p>
      </div>

      <!-- Binder Pages per Series -->
      ${series.map(s => `
        <div class="mb-8">
          <div class="flex items-center justify-between mb-3 border-b-2 border-dashed border-slate-900/30 pb-2">
            <h3 class="font-display text-xl text-slate-900">Series ${s.id}: ${clean(s.name)}</h3>
            <span class="v2005 text-xs muted font-bold">Standard 3×3 Sleeves</span>
          </div>

          <div class="binder-grid">
            ${cards.filter(c => c.series === s.id).map(card => {
              const isOwned = Boolean(collected[String(card.no)]);
              return `
                <div class="binder-sleeve" data-binder-card-no="${card.no}">
                  ${isOwned ? `
                    <div class="w-full pointer-events-none">
                      <!-- Live Card Front -->
                    </div>
                  ` : `
                    <div class="binder-card-back">
                      <img src="assets/img/cards/back.webp" alt="Card back" class="absolute inset-0 w-full h-full object-cover opacity-75" />
                      <div class="relative z-10 flex flex-col items-center justify-center p-3 text-center bg-white/90 rounded-xl border-2 border-slate-900 shadow-xs">
                        <span class="font-pixel text-xs font-bold text-slate-900">${formatCardNo(card.no)}</span>
                        <span class="font-display text-sm font-bold text-slate-800 mt-1">${clean(card.name)}</span>
                        <span class="v2005 text-[10px] muted font-bold mt-2">Tap to read guide</span>
                      </div>
                    </div>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach live card front nodes into owned sleeves
  container.querySelectorAll('.binder-sleeve').forEach(sleeve => {
    const cardNo = parseInt(sleeve.getAttribute('data-binder-card-no'), 10);
    const card = cards.find(c => c.no === cardNo);
    const isOwned = Boolean(collected[String(cardNo)]);

    if (isOwned && card) {
      const slot = sleeve.querySelector('.pointer-events-none');
      if (slot) {
        slot.appendChild(buildCard(card));
      }
    }

    sleeve.addEventListener('click', () => {
      if (typeof onCardClick === 'function' && card) {
        onCardClick(card, isOwned);
      }
    });
  });

  // Inject ItemList JSON-LD for rich SEO indexing
  injectBinderJsonLd();
}

function injectBinderJsonLd() {
  const existing = document.getElementById('binder-jsonld');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = 'binder-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "For the Hams! Collectible Welfare Cards Series 1",
    "description": "2005-style collectible trading cards for ethical hamster care and rescue standards.",
    "itemListElement": cards.map((c, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `Card ${formatCardNo(c.no)}: ${c.name}`,
      "description": c.flavour || c.strip || "Rescue verified hamster welfare guide card."
    }))
  });
  document.head.appendChild(script);
}
