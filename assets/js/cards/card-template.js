// For the Hams! — Trading Card DOM Template Generator
// Produces 5:7 collectible trading cards and 1080x1350 / 1080x1920 export layouts.

import { formatCardNo } from '../data/cards.js?v=3.1';
import { icon, clean } from '../icons.js?v=3.1';

// Renders CARE LV pip dots (1 to 3)
function renderCarePips(lv) {
  const level = Math.max(1, Math.min(3, lv || 1));
  let html = '<div class="tc-care-pips">';
  for (let i = 1; i <= 3; i++) {
    html += `<span class="tc-pip ${i <= level ? '' : 'tc-pip-empty'}"></span>`;
  }
  html += '</div>';
  return html;
}

// Renders HTML overlays over art window if defined
function renderArtOverlay(overlayType) {
  if (overlayType === 'ruler') {
    return `
      <div class="tc-overlay-ruler">
        <span>30</span>
        <span>25</span>
        <span style="color:#ef5a3c">20</span>
        <span>15</span>
        <span>10</span>
        <span>5</span>
      </div>
      <div class="tc-overlay-tag" style="top:10px;left:10px;background:#d7f5e3">20cm+ DEPTH</div>
    `;
  }
  if (overlayType === 'dimensions') {
    return `
      <div class="tc-overlay-tag" style="top:10px;left:10px;background:#fffdf8">100cm × 50cm</div>
      <div class="tc-overlay-tag" style="bottom:10px;right:10px;background:#ffe8a8">5,000 cm²</div>
    `;
  }
  if (overlayType === 'wheelCompare') {
    return `
      <div class="tc-overlay-tag" style="top:10px;left:10px;background:#d7f5e3">FLAT SPINE ✓</div>
      <div class="tc-overlay-tag" style="top:10px;right:10px;background:#ffdcd6">CURVED ✗</div>
    `;
  }
  if (overlayType === 'rooms') {
    return `
      <div class="tc-overlay-tag" style="top:10px;left:10px;background:#ffe8a8">NEST</div>
      <div class="tc-overlay-tag" style="top:10px;right:10px;background:#d7f5e3">PANTRY</div>
      <div class="tc-overlay-tag" style="bottom:10px;left:10px;background:#bfaaf3">LOO</div>
    `;
  }
  if (overlayType === 'onePlusOne') {
    return `
      <div class="tc-overlay-tag" style="top:10px;left:10px;background:#ffdcd6">SOLITARY 100%</div>
      <div class="tc-overlay-tag" style="bottom:10px;right:10px;background:#d7f5e3">1 HAM = 1 CAGE</div>
    `;
  }
  return '';
}

// Builds the core 5:7 trading card element
export function buildCard(card) {
  const isHolo = card.rarity === 'rare';
  const rarityChar = card.rarity === 'rare' ? '★ RARE' : card.rarity === 'uncommon' ? '◆ UNCOMMON' : '● COMMON';
  const cardEl = document.createElement('div');
  cardEl.className = `tc-card tc-frame-${card.frame} ${isHolo ? 'tc-holo' : ''}`;
  cardEl.setAttribute('data-card-no', card.no);

  const isSpecies = card.kind === 'species';

  cardEl.innerHTML = `
    <!-- Card Header -->
    <div class="tc-header">
      <div class="tc-title-box">
        <div class="tc-card-name">${clean(card.name)}</div>
      </div>
      <div class="tc-badge-box">
        ${icon(card.typeIcon || 'hamster', 20)}
        ${renderCarePips(card.careLv)}
      </div>
    </div>

    <!-- Art Window -->
    <div class="tc-art-window">
      <img src="${card.art}" alt="${clean(card.name)}" class="tc-art-img" loading="eager" />
      ${renderArtOverlay(card.overlay)}
    </div>

    <!-- Flavour text -->
    <div class="tc-flavour">"${clean(card.flavour || card.strip || '')}"</div>

    ${!isSpecies ? `
      <!-- Hero Stat -->
      <div class="tc-hero-box">
        <span class="tc-hero-label">${clean(card.hero?.label || 'Stat')}</span>
        <span class="tc-hero-value">${clean(card.hero?.value || '')}</span>
      </div>

      <!-- Ability Rows -->
      <div class="tc-ability-rows">
        <div class="tc-row tc-row-yes">
          <span class="tc-row-badge">YES</span>
          <span>${clean((card.yes || []).join(', '))}</span>
        </div>
        <div class="tc-row tc-row-nope">
          <span class="tc-row-badge">NOPE</span>
          <span>${clean((card.nope || []).join(', '))}</span>
        </div>
      </div>
    ` : `
      <!-- Species 2x2 Grid -->
      <div class="tc-species-grid">
        ${(card.stats || []).map(st => `
          <div class="tc-stat-tile">
            ${icon(st.icon, 18)}
            <div class="tc-stat-tile-text">
              <span class="tc-stat-tile-label">${clean(st.label)}</span>
              <span class="tc-stat-tile-val">${clean(st.statValue)}</span>
            </div>
          </div>
        `).join('')}
      </div>

      ${card.dietWarning ? `
        <div class="tc-diet-strip">
          ${clean(card.dietWarning)}
        </div>
      ` : `
        <div class="tc-banner-strip">
          ${clean(card.strip || 'Strictly Solitary')}
        </div>
      `}
    `}

    <!-- Bottom Strip -->
    <div class="tc-bottom-strip">
      <span>HAM BASICS</span>
      <span style="font-weight:bold">${formatCardNo(card.no)}</span>
      <span class="tc-rarity-symbol">${rarityChar}</span>
    </div>
  `;

  return cardEl;
}

// Builds the full export layout: 'feed' (1080x1350) or 'story' (1080x1920)
export function buildExport(card, format = 'feed') {
  const container = document.createElement('div');
  const isStory = format === 'story';
  container.className = isStory ? 'tc-export-story' : 'tc-export-feed';

  const cardNode = buildCard(card);

  const headline = card.rarity === 'rare' ? 'RARE PULL!' : 'PULLED FROM HAM BASICS';

  container.innerHTML = `
    <!-- Top banner -->
    <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:${isStory ? '32px' : '22px'}">
      <div style="font-family:'Silkscreen',monospace;font-size:${isStory ? '44px' : '28px'};font-weight:700;color:var(--tc-ink);letter-spacing:1px">
        ${headline}
      </div>
      <div style="font-family:'Caveat',cursive;font-size:${isStory ? '34px' : '22px'};font-weight:700;color:#ef5a3c;margin-top:4px">
        Series 1: Ham Basics
      </div>
    </div>

    <!-- Center Card Mount -->
    <div style="width:100%;display:flex;justify-content:center">
      <!-- Card injected here -->
    </div>

    <!-- Bottom Attribution & Stamp -->
    <div style="display:flex;align-items:center;justify-content:space-between;width:${isStory ? '820px' : '780px'};margin-top:${isStory ? '36px' : '24px'}">
      <div style="display:flex;flex-direction:column">
        <span style="font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:${isStory ? '28px' : '20px'}">forthehams.co.uk</span>
        <span style="font-family:'Silkscreen',monospace;font-size:${isStory ? '16px' : '12px'};color:#665544">collect them all • uk welfare standard</span>
      </div>
      <div class="tc-stamp-round" style="transform:rotate(-6deg) scale(${isStory ? '1.2' : '1'})">
        <span style="font-size:12px;text-transform:uppercase;font-family:'Silkscreen',monospace">Rescue</span>
        <span style="font-size:17px;line-height:0.9">checked</span>
      </div>
    </div>
  `;

  // Inject the card node into the center slot
  container.children[1].appendChild(cardNode);

  return container;
}
