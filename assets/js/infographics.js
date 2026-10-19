// For the Hams! — Card Rasterization & Sharing Modal
// Rasterizes off-screen DOM trading cards into crystal clear PNG images
// using modern-screenshot via jsDelivr CDN.

import { getCardById, getCardByNumber, formatCardNo } from './data/cards.js?v=3.1';
import { buildCard, buildExport } from './cards/card-template.js?v=3.1';
import { collectCard } from './cards/binder.js?v=3.1';
import { icon, clean } from './icons.js?v=3.1';

// Import modern-screenshot from jsDelivr ESM
let modernScreenshot = null;
async function loadScreenshotLib() {
  if (modernScreenshot) return modernScreenshot;
  try {
    modernScreenshot = await import('https://cdn.jsdelivr.net/npm/modern-screenshot@4.4.40/+esm');
    return modernScreenshot;
  } catch (err) {
    console.error('Failed to load modern-screenshot', err);
    return null;
  }
}

// Active modal state
let currentCard = null;
let currentFormat = 'feed'; // 'feed' | 'story'
let activeBlob = null;
let activeUrl = null;

// Renders off-screen element to high-res Blob
export async function renderCardToBlob(card, format = 'feed') {
  const lib = await loadScreenshotLib();
  if (!lib || !lib.domToBlob) {
    throw new Error('Screenshot library not ready');
  }

  // Ensure custom web fonts are rendered
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (_) {}
  }

  // Pre-load / decode the card image
  if (card.art) {
    const preImg = new Image();
    preImg.src = card.art;
    try { await preImg.decode(); } catch (_) {}
  }

  // Create isolated off-screen staging area
  const staging = document.createElement('div');
  staging.style.position = 'fixed';
  staging.style.top = '-9999px';
  staging.style.left = '-9999px';
  staging.style.width = format === 'story' ? '1080px' : '1080px';
  staging.style.height = format === 'story' ? '1920px' : '1350px';
  staging.style.overflow = 'hidden';
  staging.style.zIndex = '-100';

  const exportEl = buildExport(card, format);
  staging.appendChild(exportEl);
  document.body.appendChild(staging);

  try {
    const blob = await lib.domToBlob(exportEl, {
      scale: 2, // 2x Retina resolution
      quality: 0.95,
      features: { copyStyles: true }
    });
    return blob;
  } finally {
    staging.remove();
  }
}

// Main entry point: opens the trading card modal
export async function openCardModal(cardIdentifier, type = 'guide') {
  let card = null;
  if (typeof cardIdentifier === 'number' || !isNaN(parseInt(cardIdentifier, 10)) && String(parseInt(cardIdentifier, 10)) === String(cardIdentifier)) {
    card = getCardByNumber(cardIdentifier);
  } else {
    card = getCardById(cardIdentifier, type);
  }

  if (!card) return;
  currentCard = card;

  // Collect card into binder and check for first-pull celebration
  const isFirstPull = collectCard(card.no);

  if (isFirstPull && typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }

  showCardModalUI(card, isFirstPull);
  await updateRenderedPreview();
}

// Legacy alias for existing guide bottom-sheet triggers
export async function openInfographicModal(id, type = 'guide') {
  return openCardModal(id, type);
}

function showCardModalUI(card, isFirstPull) {
  let backdrop = document.getElementById('infographic-modal-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'infographic-modal-backdrop';
    backdrop.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in';
    document.body.appendChild(backdrop);
  }

  backdrop.innerHTML = `
    <div id="card-modal-container" class="panel bg-white w-full max-w-lg max-h-[94vh] flex flex-col overflow-hidden rounded-2xl animate-slide-up shadow-2xl">
      <!-- Modal Header Bar -->
      <div class="panel-bar bg-mustard flex items-center justify-between px-4 py-2.5 shrink-0">
        <div class="flex items-center gap-2">
          ${icon('rosette', 20)}
          <span class="font-display text-[15px] normal-case tracking-normal">
            ${clean(card.name)} • ${formatCardNo(card.no)}
          </span>
          ${isFirstPull ? `
            <span class="badge-tag bg-tomato text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
              NEW!
            </span>
          ` : ''}
        </div>
        <button type="button" id="close-card-modal" class="btn btn-xs btn-icon" aria-label="Close">
          ${icon('close', 14)}
        </button>
      </div>

      <!-- Format Switcher Segment (Feed vs Story) -->
      <div class="px-4 py-2.5 bg-mustard-soft flex items-center justify-between border-b-2 border-slate-900 shrink-0">
        <div class="flex gap-1.5">
          <button type="button" id="fmt-feed-btn" class="btn btn-xs ${currentFormat === 'feed' ? 'btn-mustard' : ''} font-bold">
            Post (4:5)
          </button>
          <button type="button" id="fmt-story-btn" class="btn btn-xs ${currentFormat === 'story' ? 'btn-mustard' : ''} font-bold">
            Story (9:16)
          </button>
        </div>
        <a href="#binder" id="modal-view-binder" class="text-xs font-bold text-slate-800 underline flex items-center gap-1">
          <span>View Binder</span> ${icon('arrow', 12)}
        </a>
      </div>

      <!-- Preview Stage -->
      <div class="p-3 sm:p-4 overflow-y-auto flex-grow flex flex-col items-center justify-center bg-paper min-h-[300px]">
        <div id="card-preview-stage" class="relative w-full max-w-xs flex flex-col items-center">
          <div class="w-full flex items-center justify-center py-12 text-slate-500 font-hand text-xl">
            Rendering card...
          </div>
        </div>
      </div>

      <!-- Actions Footer -->
      <div class="p-3 sm:p-4 bg-white border-t-2 border-slate-900 flex flex-wrap gap-2 shrink-0">
        <button type="button" id="btn-share-native" class="btn btn-tomato flex-1 text-xs sm:text-sm py-2">
          ${icon('share', 16)} <span>Share Card</span>
        </button>
        <button type="button" id="btn-download-png" class="btn btn-mint text-xs sm:text-sm py-2">
          ${icon('download', 16)} <span>Save Image</span>
        </button>
        <button type="button" id="btn-copy-png" class="btn text-xs sm:text-sm py-2" title="Copy card image">
          ${icon('copy', 16)}
        </button>
      </div>
    </div>
  `;

  backdrop.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  const close = () => {
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  document.getElementById('close-card-modal')?.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  document.getElementById('modal-view-binder')?.addEventListener('click', () => {
    close();
  });

  document.getElementById('fmt-feed-btn')?.addEventListener('click', async () => {
    if (currentFormat === 'feed') return;
    currentFormat = 'feed';
    document.getElementById('fmt-feed-btn').classList.add('btn-mustard');
    document.getElementById('fmt-story-btn').classList.remove('btn-mustard');
    await updateRenderedPreview();
  });

  document.getElementById('fmt-story-btn')?.addEventListener('click', async () => {
    if (currentFormat === 'story') return;
    currentFormat = 'story';
    document.getElementById('fmt-story-btn').classList.add('btn-mustard');
    document.getElementById('fmt-feed-btn').classList.remove('btn-mustard');
    await updateRenderedPreview();
  });

  // Action handlers
  document.getElementById('btn-share-native')?.addEventListener('click', async () => {
    if (!activeBlob || !currentCard) return;
    const filename = `forthehams-${formatCardNo(currentCard.no).toLowerCase().replace(/[^a-z0-9]/g, '')}-${currentFormat}.png`;
    const file = new File([activeBlob], filename, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      try {
        await navigator.share({
          title: `For the Hams! — ${currentCard.name}`,
          text: `Trading Card ${formatCardNo(currentCard.no)}: ${currentCard.name}. Ethical hamster care standards via forthehams.co.uk`,
          files: [file]
        });
      } catch (err) {
        if (err.name !== 'AbortError') downloadImage();
      }
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: `For the Hams! — ${currentCard.name}`,
          text: `Trading Card ${formatCardNo(currentCard.no)}: ${currentCard.name}\nUK rescue verified care at https://www.forthehams.co.uk/`,
          url: 'https://www.forthehams.co.uk/'
        });
      } catch (err) {
        if (err.name !== 'AbortError') downloadImage();
      }
    } else {
      downloadImage();
    }
  });

  document.getElementById('btn-download-png')?.addEventListener('click', downloadImage);

  document.getElementById('btn-copy-png')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-copy-png');
    if (!activeBlob || !navigator.clipboard || typeof ClipboardItem === 'undefined') {
      downloadImage();
      return;
    }
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': activeBlob })]);
      if (btn) btn.innerHTML = `${icon('tick', 16)}`;
      setTimeout(() => { if (btn) btn.innerHTML = icon('copy', 16); }, 2000);
    } catch {
      downloadImage();
    }
  });
}

async function updateRenderedPreview() {
  const stage = document.getElementById('card-preview-stage');
  if (!stage || !currentCard) return;

  stage.innerHTML = `
    <div class="py-12 flex flex-col items-center justify-center text-slate-600">
      <span class="font-hand text-xl">Generating ${currentFormat === 'story' ? 'Story' : 'Post'} card...</span>
    </div>
  `;

  try {
    const blob = await renderCardToBlob(currentCard, currentFormat);
    activeBlob = blob;
    if (activeUrl) URL.revokeObjectURL(activeUrl);
    activeUrl = URL.createObjectURL(blob);

    stage.innerHTML = `
      <div class="relative w-full rounded-2xl overflow-hidden border-2 border-slate-900 shadow-md">
        <img src="${activeUrl}" alt="${clean(currentCard.name)} Card" class="w-full h-auto block select-none" />
      </div>
      <p class="v2005 text-[11px] muted text-center mt-2.5">
        High-res ${currentFormat === 'story' ? 'Story (9:16)' : 'Feed (4:5)'} ready to save or share!
      </p>
    `;
  } catch (err) {
    console.error('Rasterization error', err);
    stage.innerHTML = `
      <div class="p-4 text-center text-red-600 font-bold">
        Preview error. Direct download is still available.
      </div>
    `;
  }
}

function downloadImage() {
  if (!activeUrl || !currentCard) return;
  const a = document.createElement('a');
  a.href = activeUrl;
  const cleanName = currentCard.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  a.download = `forthehams-${formatCardNo(currentCard.no).toLowerCase().replace(/\s+/g, '')}-${cleanName}-${currentFormat}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
