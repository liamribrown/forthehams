// For the Hams! — "Write to us!" Postbag & Feedback Form
// Theme: 2005 Magazine "Letters to the Editor" / Zine Postbag
// Submissions delivered to liam.brown@live.com via FormSubmit AJAX

import { icon, clean } from './icons.js?v=3.6';

export const FEEDBACK_CONFIG = {
  recipientEmail: 'liam.brown@live.com',
  endpoint: 'https://formsubmit.co/ajax/liam.brown@live.com',
  web3formsKey: '' // Optional future override
};

const CATEGORIES = [
  {
    id: 'general',
    label: '💌 Postbag',
    fullTitle: 'Letters to the Editor (General / Say Hi)',
    prompt: 'Share a story, feedback, question, or say hi from your furry friend!',
    placeholder: 'Dear For the Hams! team...\n\nJust wanted to say...'
  },
  {
    id: 'rescue',
    label: '🐹 Suggest Rescue',
    fullTitle: 'Suggest an Ethical UK Rescue',
    prompt: 'Help us expand the UK directory! Rescues must uphold 100x50cm minimums and ethical care.',
    placeholder: 'Rescue name:\nLocation / UK coverage:\nWebsite or Facebook page:\nWhy you recommend them:'
  },
  {
    id: 'food_product',
    label: '🥗 Safe Pick / Food',
    fullTitle: 'Suggest a Safe Product or Food Item',
    prompt: 'Found a 100x50 cage, silent upright wheel, or safe seed mix we should feature?',
    placeholder: 'Item name:\nBrand / Shop link:\nCategory (Cage, Wheel, Bedding, Food, Sprays):\nWhy it is safe:'
  },
  {
    id: 'correction',
    label: '🔍 Tip-off / Fix',
    fullTitle: 'Report an Error, Broken Link or Tip-off',
    prompt: 'Spotted a typo, discontinued product, or outdated care advice? We appreciate your sharp eyes!',
    placeholder: 'Guide or section:\nWhat needs updating or is broken:\nSuggested correction or link:'
  }
];

let selectedCategory = 'general';

export function initPostbag() {
  const triggerBtn = document.getElementById('footer-write-us-btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPostbag('general');
    });
  }
}

export function openPostbag(category = 'general') {
  selectedCategory = CATEGORIES.some(c => c.id === category) ? category : 'general';
  ensureModalExists();
  renderPostbagForm();

  const backdrop = document.getElementById('postbag-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      document.getElementById('postbag-message-input')?.focus();
    }, 50);
  }
}

export function closePostbag() {
  const backdrop = document.getElementById('postbag-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function ensureModalExists() {
  if (document.getElementById('postbag-modal-backdrop')) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'postbag-modal-backdrop';
  backdrop.className = 'fixed inset-0 z-50 hidden flex items-end sm:items-center justify-center p-0 sm:p-4';
  backdrop.style.background = 'rgba(34,24,15,0.65)';
  backdrop.style.backdropFilter = 'blur(2px)';

  backdrop.innerHTML = `
    <div id="postbag-modal-container" class="sheet w-full sm:max-w-xl max-h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden animate-slide-up sm:animate-fade-in shadow-2xl relative bg-white">
      <div class="sheet-head shrink-0 select-none flex items-center justify-between px-4 py-2.5 bg-paper-2 border-b-2 border-ink">
        <div class="flex items-center gap-2">
          <span class="postbag-stamp">
            <span>HAM-POST</span>
            <span class="text-[7.5px] font-bold text-tomato">1ST CLASS</span>
          </span>
          <div>
            <span class="v2005 text-[10px] font-bold uppercase tracking-wider muted block">For the Hams! Postbag</span>
            <h3 class="font-display text-[18px] leading-tight">Write to us!</h3>
          </div>
        </div>
        <button type="button" id="postbag-close-btn" class="btn btn-icon btn-sm shrink-0" aria-label="Close dialog">
          ${icon('close', 18)}
        </button>
      </div>
      <div id="postbag-modal-body" class="p-4 sm:p-5 overflow-y-auto overscroll-contain flex-grow">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePostbag();
  });

  document.getElementById('postbag-close-btn')?.addEventListener('click', closePostbag);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) {
      closePostbag();
    }
  });
}

function renderPostbagForm() {
  const body = document.getElementById('postbag-modal-body');
  if (!body) return;

  const activeCat = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  body.innerHTML = `
    <form id="postbag-form" class="space-y-4">
      <!-- Anti-spam Honeypot -->
      <input type="text" name="_honey" style="display:none !important;" tabindex="-1" autocomplete="off">

      <!-- Magazine intro header -->
      <div class="p-3 rounded-xl bg-mustard-soft flex items-start gap-2.5" style="border: 2px dashed var(--ink)">
        <div class="shrink-0 mt-0.5 text-tomato">${icon('mail', 24)}</div>
        <div class="min-w-0">
          <p class="font-display text-[14px] leading-tight">Got a story, tip-off, or rescue to recommend?</p>
          <p class="v2005 text-[11.5px] muted mt-0.5 leading-snug">
            Like the letters page of your favourite magazine, we read every note sent to hamster HQ!
          </p>
        </div>
      </div>

      <!-- Category Picker -->
      <div>
        <label class="block font-display text-[13px] font-bold uppercase tracking-wider muted mb-1.5">
          Select Letter Topic:
        </label>
        <div class="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Topic">
          ${CATEGORIES.map(c => `
            <button type="button" data-cat-id="${c.id}" class="chip text-xs ${selectedCategory === c.id ? 'is-active' : ''}">
              ${c.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Dynamic Topic Helper -->
      <div class="text-[12.5px] muted -mt-1 italic flex items-center gap-1.5">
        <span>💡</span> <span>${clean(activeCat.prompt)}</span>
      </div>

      <!-- Form Inputs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="postbag-name-input" class="block font-display text-[12.5px] font-bold mb-1">
            Your name or pen name <span class="muted font-normal">(optional)</span>
          </label>
          <input type="text" id="postbag-name-input" name="sender_name" class="field-input field-input-plain text-sm" placeholder="e.g. Liam & Peanut">
        </div>
        <div>
          <label for="postbag-email-input" class="block font-display text-[12.5px] font-bold mb-1">
            Email address <span class="muted font-normal">(if you'd like a reply)</span>
          </label>
          <input type="email" id="postbag-email-input" name="sender_email" class="field-input field-input-plain text-sm" placeholder="you@example.com">
        </div>
      </div>

      <!-- Message Area -->
      <div>
        <label for="postbag-message-input" class="block font-display text-[12.5px] font-bold mb-1">
          Your Letter <span class="text-tomato">*</span>
        </label>
        <div class="field">
          <textarea id="postbag-message-input" name="message" required rows="5" class="text-sm" placeholder="${activeCat.placeholder}"></textarea>
        </div>
      </div>

      <!-- Submission Feedback / Status Box -->
      <div id="postbag-status-area" class="hidden"></div>

      <!-- Actions -->
      <div class="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 border-t-2 border-dashed border-stone-300">
        <button type="button" id="postbag-cancel-btn" class="btn btn-sm btn-block sm:w-auto">
          Cancel
        </button>
        <button type="submit" id="postbag-submit-btn" class="btn btn-sm btn-tomato btn-block sm:w-auto flex items-center justify-center gap-1.5 shadow-sm">
          ${icon('paperplane', 16)} <span>Send Letter 📮</span>
        </button>
      </div>
    </form>
  `;

  // Hook Category Buttons
  body.querySelectorAll('[data-cat-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat-id');
      if (cat && cat !== selectedCategory) {
        selectedCategory = cat;
        renderPostbagForm();
      }
    });
  });

  document.getElementById('postbag-cancel-btn')?.addEventListener('click', closePostbag);

  const form = document.getElementById('postbag-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('postbag-submit-btn');
  const statusArea = document.getElementById('postbag-status-area');

  const honeypot = form.querySelector('[name="_honey"]')?.value;
  if (honeypot) {
    // Spambot caught — simulate success
    showSuccessView('Anonymous');
    return;
  }

  const name = form.querySelector('[name="sender_name"]')?.value.trim() || 'Anonymous Ham Fan';
  const email = form.querySelector('[name="sender_email"]')?.value.trim() || '';
  const message = form.querySelector('[name="message"]')?.value.trim();

  if (!message) {
    alert('Please write a note before sending!');
    return;
  }

  const activeCat = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  // Set Loading State
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="animate-pulse">Posting letter... 🐹✉️</span>`;
  }

  const payload = {
    _subject: `For the Hams! Postbag: ${activeCat.fullTitle} from ${name}`,
    _template: 'table',
    _captcha: 'false',
    Topic: activeCat.fullTitle,
    SenderName: name,
    SenderEmail: email || 'Not provided',
    Message: message,
    PageURL: window.location.href,
    Timestamp: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  };

  try {
    const response = await fetch(FEEDBACK_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok || data.success === 'true' || data.success === true) {
      showSuccessView(name);
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    console.warn('FormSubmit endpoint error, providing mailto fallback:', err);
    showErrorFallback(name, email, activeCat.fullTitle, message);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${icon('paperplane', 16)} <span>Send Letter 📮</span>`;
    }
  }
}

function showSuccessView(name) {
  const body = document.getElementById('postbag-modal-body');
  if (!body) return;

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#ef5a3c', '#f6bc2f', '#8fd6b1', '#bfaaf3', '#f8acc8']
    });
  }

  body.innerHTML = `
    <div class="text-center py-6 px-3">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mint-soft text-ink border-2 border-ink shadow-md mb-3">
        ${icon('tick', 32)}
      </div>
      <h3 class="font-display text-[24px] text-slate-900 leading-tight">Letter Posted! 🐹✉️</h3>
      <p class="hand text-[20px] text-tomato mt-1">thanks for writing to us, ${clean(name)}!</p>
      <div class="p-3.5 mt-4 rounded-xl bg-paper-2 border-2 border-ink text-left text-sm max-w-md mx-auto shadow-sm">
        <p class="leading-relaxed">
          Your note has flown straight to the <strong>For the Hams!</strong> editor's desk.
        </p>
        <p class="text-xs muted mt-2">
          Every suggestion and tip-off helps keep UK hamsters safe, solitary, and in 100x50cm homes.
        </p>
      </div>
      <div class="mt-6 flex justify-center">
        <button type="button" id="postbag-success-close-btn" class="btn btn-mustard px-6 py-2.5">
          Back to website
        </button>
      </div>
    </div>
  `;

  document.getElementById('postbag-success-close-btn')?.addEventListener('click', closePostbag);
}

function showErrorFallback(name, email, topic, message) {
  const statusArea = document.getElementById('postbag-status-area');
  if (!statusArea) return;

  const mailtoSubject = encodeURIComponent(`[For the Hams! Postbag] ${topic} from ${name}`);
  const mailtoBody = encodeURIComponent(
    `Topic: ${topic}\nFrom: ${name} (${email || 'No email provided'})\n\nMessage:\n${message}\n\nSent via forthehams.co.uk`
  );
  const mailtoUrl = `mailto:${FEEDBACK_CONFIG.recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  statusArea.className = 'p-3 rounded-xl bg-tomato-soft border-2 border-ink text-xs space-y-2 block';
  statusArea.innerHTML = `
    <div class="font-bold flex items-center gap-1.5 text-slate-900">
      <span>📭</span> <span>The online carrier could not connect right now.</span>
    </div>
    <p>Don't worry, your letter is safe! You can send it directly to our inbox with one click:</p>
    <div>
      <a href="${mailtoUrl}" class="btn btn-xs btn-tomato inline-flex items-center gap-1">
        ${icon('mail', 14)} <span>Send via email app</span>
      </a>
    </div>
  `;
}
