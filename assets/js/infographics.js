// For the Hams! — Card Rasterization & Sharing Modal
// Dual-mode rendering:
// 1. Live interactive DOM preview renders instantaneously (zero delay, zero flicker)
// 2. High-res PNG export using htmlToImage / modernScreenshot fallback for sharing & saving.

import { getCardById, getCardByNumber, formatCardNo } from './data/cards.js?v=3.3';
import { buildCard, buildExport } from './cards/card-template.js?v=3.3';
import { collectCard } from './cards/binder.js?v=3.3';
import { icon, clean } from './icons.js?v=3.3';

// Active modal state
let currentCard = null;
let currentFormat = 'feed'; // 'feed' | 'story'
let activeBlob = null;
let activeUrl = null;
let isRasterizing = false;

// Robust rasterization helper
export async function renderCardToBlob(card, format = 'feed') {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (_) {}
  }

  // Pre-decode the card image if present
  if (card.art) {
    const preImg = new Image();
    preImg.src = card.art;
    try { await preImg.decode(); } catch (_) {}
  }

  // Staging container visible off-screen
  const staging = document.createElement('div');
  staging.style.position = 'fixed';
  staging.style.top = '0';
  staging.style.left = '-9999px';
  staging.style.width = format === 'story' ? '1080px' : '1080px';
  staging.style.height = format === 'story' ? '1920px' : '1350px';
  staging.style.overflow = 'hidden';
  staging.style.pointerEvents = 'none';
  staging.style.zIndex = '-999';

  const exportEl = buildExport(card, format);
  staging.appendChild(exportEl);
  document.body.appendChild(staging);

  try {
    // 1. Try window.htmlToImage (loaded via UMD)
    if (typeof window !== 'undefined' && window.htmlToImage && window.htmlToImage.toBlob) {
      const blob = await window.htmlToImage.toBlob(exportEl, {
        pixelRatio: 2,
        quality: 0.95
      });
      if (blob) return blob;
    }

    // 2. Try modern-screenshot dynamic import
    try {
      const ms = await import('https://cdn.jsdelivr.net/npm/modern-screenshot/+esm');
      if (ms && ms.domToBlob) {
        const blob = await ms.domToBlob(exportEl, {
          scale: 2,
          quality: 0.95
        });
        if (blob) return blob;
      }
    } catch (e) {
      console.warn('modern-screenshot fallback failed', e);
    }

    // 3. Canvas SVG fallback
    return await renderDomViaSvgFallback(exportEl, format);
  } finally {
    staging.remove();
  }
}

// Fallback: renders DOM element via SVG foreignObject onto canvas
async function renderDomViaSvgFallback(element, format) {
  const w = 1080;
  const h = format === 'story' ? 1920 : 1350;
  const canvas = document.createElement('canvas');
  canvas.width = w * 2;
  canvas.height = h * 2;
  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  const clone = element.cloneNode(true);
  const wrapper = document.createElement('div');
  wrapper.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  wrapper.appendChild(clone);

  const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <foreignObject width="100%" height="100%">
        ${wrapper.innerHTML}
      </foreignObject>
    </svg>
  `);

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => resolve(blob), 'image/png');
    };
    img.onerror = () => {
      // Last-ditch: simple canvas background
      ctx.fillStyle = '#fff4df';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#22180f';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(currentCard?.name || 'Trading Card', 60, 100);
      canvas.toBlob(blob => resolve(blob), 'image/png');
    };
    img.src = dataUri;
  });
}

// Main entry point: opens the trading card modal
export async function openCardModal(cardIdentifier, type = 'guide') {
  let card = null;
  if (typeof cardIdentifier === 'number' || (!isNaN(parseInt(cardIdentifier, 10)) && String(parseInt(cardIdentifier, 10)) === String(cardIdentifier))) {
    card = getCardByNumber(cardIdentifier);
  } else {
    card = getCardById(cardIdentifier, type);
  }

  if (!card) return;
  currentCard = card;

  // Collect card into binder and celebrate on first pull
  const isFirstPull = collectCard(card.no);

  if (isFirstPull && typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }

  showCardModalUI(card, isFirstPull);
  renderLivePreview();
}

// Legacy alias for existing triggers
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

      <!-- Live Interactive Card Preview Stage (Always Instant & Crisp) -->
      <div class="p-2 sm:p-4 overflow-y-auto flex-grow flex flex-col items-center justify-center bg-paper min-h-[320px]">
        <div id="card-preview-stage" class="relative w-full max-w-[340px] flex flex-col items-center justify-center">
          <!-- Injected dynamically by renderLivePreview -->
        </div>
        <p class="v2005 text-[11px] muted text-center mt-2.5">
          ${formatCardNo(card.no)} • Series 1: Ham Basics • Rescue standard verified
        </p>
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

  document.getElementById('fmt-feed-btn')?.addEventListener('click', () => {
    if (currentFormat === 'feed') return;
    currentFormat = 'feed';
    document.getElementById('fmt-feed-btn').classList.add('btn-mustard');
    document.getElementById('fmt-story-btn').classList.remove('btn-mustard');
    activeBlob = null;
    renderLivePreview();
  });

  document.getElementById('fmt-story-btn')?.addEventListener('click', () => {
    if (currentFormat === 'story') return;
    currentFormat = 'story';
    document.getElementById('fmt-story-btn').classList.add('btn-mustard');
    document.getElementById('fmt-feed-btn').classList.remove('btn-mustard');
    activeBlob = null;
    renderLivePreview();
  });

  // Action handlers with automatic high-res generation
  document.getElementById('btn-share-native')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-share-native');
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span>Preparing...</span>`;
    try {
      const blob = await ensureBlobReady();
      const filename = `forthehams-${formatCardNo(currentCard.no).toLowerCase().replace(/[^a-z0-9]/g, '')}-${currentFormat}.png`;
      const file = new File([blob], filename, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        try {
          await navigator.share({
            title: `For the Hams! — ${currentCard.name}`,
            text: `Trading Card ${formatCardNo(currentCard.no)}: ${currentCard.name}. Ethical hamster care standards via forthehams.co.uk`,
            files: [file]
          });
        } catch (err) {
          if (err.name !== 'AbortError') triggerDownload(blob);
        }
      } else if (navigator.share) {
        try {
          await navigator.share({
            title: `For the Hams! — ${currentCard.name}`,
            text: `Trading Card ${formatCardNo(currentCard.no)}: ${currentCard.name}\nUK rescue verified care at https://www.forthehams.co.uk/`,
            url: 'https://www.forthehams.co.uk/'
          });
        } catch (err) {
          if (err.name !== 'AbortError') triggerDownload(blob);
        }
      } else {
        triggerDownload(blob);
      }
    } catch (e) {
      console.error(e);
      alert('Could not export image. Please try saving directly.');
    } finally {
      btn.innerHTML = origHtml;
    }
  });

  document.getElementById('btn-download-png')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-download-png');
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span>Saving...</span>`;
    try {
      const blob = await ensureBlobReady();
      triggerDownload(blob);
    } finally {
      btn.innerHTML = origHtml;
    }
  });

  document.getElementById('btn-copy-png')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-copy-png');
    const origHtml = btn.innerHTML;
    btn.innerHTML = `${icon('sparkle', 16)}`;
    try {
      const blob = await ensureBlobReady();
      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        btn.innerHTML = `${icon('tick', 16)}`;
        setTimeout(() => { btn.innerHTML = origHtml; }, 2000);
      } else {
        triggerDownload(blob);
        btn.innerHTML = origHtml;
      }
    } catch (e) {
      triggerDownload(activeBlob);
      btn.innerHTML = origHtml;
    }
  });
}

// Renders the live interactive card DOM preview (always instant and never throws preview errors)
function renderLivePreview() {
  const stage = document.getElementById('card-preview-stage');
  if (!stage || !currentCard) return;

  stage.innerHTML = '';
  
  // Wrap card in a container matching the selected format
  const wrap = document.createElement('div');
  wrap.className = 'w-full flex justify-center items-center';

  if (currentFormat === 'story') {
    wrap.style.padding = '14px 10px';
    wrap.style.borderRadius = '24px';
    wrap.style.border = '3px solid var(--tc-ink)';
    wrap.style.background = 'var(--tc-paper)';
    wrap.style.boxShadow = '5px 5px 0 var(--tc-ink)';
  }

  const liveCard = buildCard(currentCard);
  wrap.appendChild(liveCard);
  stage.appendChild(wrap);
}

// Ensures a high-res rasterized PNG blob is generated when user taps Share / Save / Copy
async function ensureBlobReady() {
  if (activeBlob) return activeBlob;
  const blob = await renderCardToBlob(currentCard, currentFormat);
  activeBlob = blob;
  return blob;
}

function triggerDownload(blob) {
  if (!blob || !currentCard) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const cleanName = currentCard.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  a.download = `forthehams-${formatCardNo(currentCard.no).toLowerCase().replace(/\s+/g, '')}-${cleanName}-${currentFormat}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
