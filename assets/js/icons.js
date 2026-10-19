// Hand-drawn doodle icon set (replaces emoji + Lucide)
// All icons: 48x48 viewBox, stroke = currentColor, slightly wobbly lines.

const P = {
  hamster: `
    <path d="M13 19c-3.5-2-3-7.5 1-8.2 3-.6 5 1.8 5.2 4.2"/>
    <path d="M35 19c3.5-2 3-7.5-1-8.2-3-.6-5 1.8-5.2 4.2"/>
    <path d="M9.5 30.5C9 21 15.5 14.5 24 14.3c8.6-.2 15 6.6 14.6 16-.3 6.4-6.6 10.2-14.6 10.2S9.8 36.8 9.5 30.5z"/>
    <circle cx="18.6" cy="25.2" r="1.7" fill="currentColor" stroke="none"/>
    <circle cx="29.4" cy="25.2" r="1.7" fill="currentColor" stroke="none"/>
    <path d="M22.6 29.2l1.4 1.3 1.4-1.3"/>
    <path d="M24 30.5v1.6"/>
    <circle cx="14.6" cy="30.6" r="2.6" fill="#f8acc8" stroke="none" opacity=".9"/>
    <circle cx="33.4" cy="30.6" r="2.6" fill="#f8acc8" stroke="none" opacity=".9"/>
    <path d="M5 27.5l6.5 1.4M5.4 32.6l6.3-1.5M43 27.5l-6.5 1.4M42.6 32.6l-6.3-1.5"/>
    <path d="M18.5 40.2l-.4 2.4M29.5 40.2l.4 2.4"/>`,
  cage: `
    <path d="M5.5 17.2l8.2-6.4h28.8l-8.4 6.6z"/>
    <path d="M5.5 17.2v21.5h28.8V17.4M34.3 38.7l8.2-6.8V10.8"/>
    <path d="M8 32.5c2.8-2.4 5.4.8 8.2-1.2s5.6 1.1 8.4-.9 5.3 1 7.8-.8"/>
    <path d="M28 25.5a4 4 0 1 1 0 .1"/>`,
  cloud: `
    <path d="M13.5 35.5h21.8c4.4.1 7.4-3 7.2-6.9-.2-3.7-3.1-6.6-7-6.6-1.3-5.4-5.6-8.4-10.6-8.2-4.7.2-8.3 3.4-9.2 7.6-4.7.1-7.9 3.3-7.7 7.3.1 3.8 2.6 6.8 5.5 6.8z"/>
    <path d="M14 29.5c3 .8 6 .6 8.5-.8"/>`,
  wheel: `
    <circle cx="24" cy="21.5" r="14.2"/>
    <circle cx="24" cy="21.5" r="9.6" stroke-dasharray="3 4"/>
    <circle cx="24" cy="21.5" r="2.4"/>
    <path d="M24 24l-6.4 18.6M24 24l6.6 18.4M13.5 42.8h21.2"/>`,
  sand: `
    <path d="M6 25.5h36c-.4 9.2-8 15-18 15S6.3 34.6 6 25.5z"/>
    <path d="M11.5 25.4c2.6-4.2 7-6 12.5-6s10 1.9 12.6 6.1"/>
    <circle cx="17" cy="31" r="1" fill="currentColor"/><circle cx="24" cy="33.5" r="1" fill="currentColor"/>
    <circle cx="30.5" cy="30.5" r="1" fill="currentColor"/><circle cx="21" cy="29.5" r=".8" fill="currentColor"/>`,
  hide: `
    <path d="M7.2 22.4L24.1 8.6l16.7 13.9"/>
    <path d="M11.8 19v19.6h24.6V18.8"/>
    <path d="M19.6 38.6v-7.4c0-2.6 2-4.6 4.5-4.6s4.4 2 4.4 4.6v7.4"/>
    <path d="M30.6 20.5c1.6-.3 2.8.7 2.8 2.2"/>`,
  log: `
    <ellipse cx="13" cy="25.5" rx="6.2" ry="9.4"/>
    <path d="M13 16.1h22.4c3.4.2 6.3 4.3 6.2 9.6-.1 5.2-3 9.1-6.4 9.2H13"/>
    <path d="M13 21.3c1.9 1.2 2 6.8.1 8.4"/>
    <path d="M24 20.5h8M27 30.5h7"/>`,
  sprout: `
    <path d="M24 43V17.5"/>
    <path d="M24 17.5c-2.2-3.7-1.6-7.9.1-10.4 1.6 2.4 2.3 6.6-.1 10.4z"/>
    <path d="M24 26.2c-4.4-.6-7.6-3.8-8.4-8.2 4.3.3 7.6 3.5 8.4 8.2zM24 26.2c4.4-.6 7.6-3.8 8.4-8.2-4.3.3-7.6 3.5-8.4 8.2z"/>
    <path d="M24 35c-4.4-.6-7.6-3.8-8.4-8.2 4.3.3 7.6 3.5 8.4 8.2zM24 35c4.4-.6 7.6-3.8 8.4-8.2-4.3.3-7.6 3.5-8.4 8.2z"/>`,
  bowl: `
    <path d="M5.8 24.2h36.4c-.8 9-8.1 15.2-18.2 15.2S6.6 33.2 5.8 24.2z"/>
    <ellipse cx="15" cy="20.5" rx="2.4" ry="1.6" transform="rotate(-20 15 20.5)"/>
    <ellipse cx="22" cy="18.6" rx="2.4" ry="1.6" transform="rotate(15 22 18.6)"/>
    <ellipse cx="29" cy="20.4" rx="2.4" ry="1.6" transform="rotate(-10 29 20.4)"/>
    <ellipse cx="34.5" cy="21.6" rx="2" ry="1.4" transform="rotate(25 34.5 21.6)"/>`,
  solo: `
    <path d="M24 5.8l15.2 6v10.4c.1 10-6.8 17.2-15.2 20.2-8.4-3-15.3-10.2-15.2-20.2V11.8z"/>
    <path d="M20.4 18.6l4.2-3v15.8M20 31.6h9"/>`,
  heart: `
    <path d="M24 40.5S7.6 30.6 7.8 19c.1-4.8 3.6-8.3 8-8.3 3.4 0 6.4 2.2 8.2 5.4 1.8-3.2 4.8-5.4 8.2-5.4 4.4 0 7.9 3.5 8 8.3.2 11.6-16.2 21.5-16.2 21.5z"/>`,
  check: `
    <rect x="7.5" y="7.8" width="33" height="32.6" rx="6.5"/>
    <path d="M15 24.8l6.2 6.4 12.4-14.6"/>`,
  tick: `<path d="M10 25.5l9 9 19-21"/>`,
  book: `
    <path d="M7.8 10.6c6.2-2.2 11.4-1.2 16.2 2.8v27.2c-4.8-4-10-5-16.2-2.9z"/>
    <path d="M40.2 10.6c-6.2-2.2-11.4-1.2-16.2 2.8v27.2c4.8-4 10-5 16.2-2.9z"/>`,
  apple: `
    <path d="M24 16.4c-4.4-3.4-14.4-2.6-14.2 9.2.1 9 6 16 10.2 16 2 0 2.8-1 4-1s2 1 4 1c4.2 0 10.1-7 10.2-16 .2-11.8-9.8-12.6-14.2-9.2z"/>
    <path d="M24 16.4c-.2-4.2 1.8-7.4 5.2-8.6"/>
    <path d="M25.6 11.6c3.2-2.6 6.4-2.4 8.2-.4-2.6 2.6-5.6 2.6-8.2.4z"/>`,
  rosette: `
    <circle cx="24" cy="19" r="11.2"/>
    <path d="M17.6 28.4l-4.2 13.8 7.2-3.6 3.6 5.8M30.4 28.4l4.2 13.8-7.2-3.6-3.6 5.8"/>
    <path d="M24 13.2l1.9 3.8 4.1.6-3 2.9.7 4.1-3.7-1.9-3.7 1.9.7-4.1-3-2.9 4.1-.6z"/>`,
  search: `<circle cx="20.5" cy="20.5" r="12"/><path d="M29.6 29.8l10.6 10.6"/>`,
  arrow: `<path d="M7.5 24.4c9.5-.6 19.6-.2 30.2-.4M28.5 14.2l10 10-10 10"/>`,
  ext: `<path d="M16 32L34 14M20 13.5h14.5V28"/>`,
  close: `<path d="M12 12.4l24 23.4M36.2 12L12 36"/>`,
  pin: `<path d="M24 42.5S11.8 30.8 11.8 20.2a12.2 12.2 0 0 1 24.4 0c0 10.6-12.2 22.3-12.2 22.3z"/><circle cx="24" cy="20.2" r="4.2"/>`,
  copy: `<rect x="14.5" y="14.5" width="24" height="26" rx="4"/><path d="M9.5 32V10.4c0-1.2 1-2.2 2.2-2.2H30"/>`,
  nope: `<circle cx="24" cy="24" r="16.5"/><path d="M12.6 12.8l22.8 22.6"/>`,
  snow: `<path d="M24 5.5v37M8 14.8l32 18.4M40 14.8L8 33.2"/><path d="M20 9l4 3.5L28 9M20 39l4-3.5 4 3.5"/>`,
  play: `<rect x="5.8" y="11.8" width="36.4" height="24.6" rx="5.5"/><path d="M20.5 18.6v10.8l9.4-5.4z"/>`,
  camera: `<path d="M6 16.5h8.5l3-5h13l3 5H42v22H6z"/><circle cx="24" cy="27" r="7"/>`,
  paw: `<ellipse cx="24" cy="31" rx="8" ry="6.5"/><circle cx="13.5" cy="20" r="3.2"/><circle cx="20" cy="14.5" r="3.2"/><circle cx="28" cy="14.5" r="3.2"/><circle cx="34.5" cy="20" r="3.2"/>`,
  bulb: `<path d="M17.5 30.5c-3.5-2.6-5.6-6.4-5.4-10.6.4-6.4 5.6-11.2 11.9-11.2s11.5 4.8 11.9 11.2c.2 4.2-1.9 8-5.4 10.6v4.5h-13z"/><path d="M19 40h10"/>`,
  sparkle: `<path d="M24 6c1.2 9 3.2 11 12 12-8.8 1-10.8 3-12 12-1.2-9-3.2-11-12-12 8.8-1 10.8-3 12-12z"/>`,
  map: `<path d="M6 12l11-4 14 4 11-4v28l-11 4-14-4-11 4z"/><path d="M17 8v28M31 12v28"/>`,
  reset: `<path d="M10 24a14 14 0 1 0 4.2-10"/><path d="M9.5 8.5v7.5H17"/>`,
  share: `<circle cx="36" cy="12" r="5"/><circle cx="12" cy="24" r="5"/><circle cx="36" cy="36" r="5"/><path d="M16.5 21.8l15-7.6M16.5 26.2l15 7.6"/>`,
  download: `<path d="M24 10v20M15 22l9 9 9-9"/><path d="M10 38h28"/>`
};

export function icon(name, size = 20, extraClass = '') {
  const paths = P[name] || P.paw;
  return `<svg class="svg-icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

// Strip decorative emoji from data strings so the UI stays emoji-free
const EMOJI_RE = /(?:\p{Extended_Pictographic}|\p{Regional_Indicator}|[\u{E0020}-\u{E007F}]|\uFE0F|\u200D)+\s?/gu;
export function clean(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(EMOJI_RE, '').replace(/\s{2,}/g, ' ').trim();
}
export function cleanHtml(html) {
  if (!html) return '';
  return String(html).replace(EMOJI_RE, '');
}
