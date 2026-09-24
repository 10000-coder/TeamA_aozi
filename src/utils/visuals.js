function toSvgDataUri(svg) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function getAvatarSvg(handle, name, textColor = '#ffffff') {
  const initial = (name || handle || 'A').replace('@', '').charAt(0).toUpperCase();
  const clean = (handle || name || 'default').toLowerCase();
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = ((hash << 5) - hash) + clean.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const colors = [
    ['#10b981', '#059669'],
    ['#3b82f6', '#1d4ed8'],
    ['#8b5cf6', '#6d28d9'],
    ['#ec4899', '#be185d'],
    ['#f59e0b', '#d97706'],
    ['#06b6d4', '#0e7490'],
    ['#14b8a6', '#0f766e'],
    ['#6366f1', '#4338ca'],
  ];

  const [col1, col2] = colors[absHash % colors.length];

  if (handle === '@aozibot' || handle === 'aozi') {
    const aoziSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="aozibg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#149a5b"/>
          <stop offset="100%" stop-color="#064e3b"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="30" fill="url(#aozibg)"/>
      <circle cx="35" cy="45" r="7" fill="#ffffff"/>
      <circle cx="65" cy="45" r="7" fill="#ffffff"/>
      <circle cx="37" cy="45" r="3.5" fill="#064e3b"/>
      <circle cx="67" cy="45" r="3.5" fill="#064e3b"/>
      <path d="M 36 65 Q 50 78 64 65" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="50" cy="22" r="5" fill="#fbbf24"/>
      <rect x="47" y="27" width="6" height="8" rx="2" fill="#fbbf24"/>
    </svg>`;
    return toSvgDataUri(aoziSvg);
  }

  const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="ug_${absHash}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${col1}"/>
        <stop offset="100%" stop-color="${col2}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="30" fill="url(#ug_${absHash})"/>
    <text x="50" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="44" fill="${textColor}" text-anchor="middle">${initial}</text>
  </svg>`;
  return toSvgDataUri(userSvg);
}

export function getTokenIconSvg(ticker, name) {
  const cleanTicker = (ticker || '').replace('$', '').toUpperCase();
  let hash = 0;
  for (let i = 0; i < cleanTicker.length; i++) {
    hash = ((hash << 5) - hash) + cleanTicker.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  if (cleanTicker === 'AOZI') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="aozi_t_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#059669"/>
          <stop offset="50%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="28" fill="url(#aozi_t_grad)"/>
      <circle cx="34" cy="46" r="6.5" fill="#ffffff"/>
      <circle cx="66" cy="46" r="6.5" fill="#ffffff"/>
      <circle cx="36" cy="46" r="3.2" fill="#047857"/>
      <circle cx="68" cy="46" r="3.2" fill="#047857"/>
      <path d="M 35 66 Q 50 80 65 66" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <polygon points="50,16 57,30 74,30 60,40 66,56 50,46 34,56 40,40 26,30 43,30" fill="#fbbf24"/>
    </svg>`;
    return toSvgDataUri(svg);
  }

  if (cleanTicker === 'FROG') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="100" height="100" rx="28" fill="#15803d"/>
      <circle cx="32" cy="38" r="14" fill="#22c55e"/>
      <circle cx="68" cy="38" r="14" fill="#22c55e"/>
      <ellipse cx="50" cy="58" rx="38" ry="28" fill="#22c55e"/>
      <circle cx="32" cy="36" r="6" fill="#ffffff"/>
      <circle cx="68" cy="36" r="6" fill="#ffffff"/>
      <circle cx="34" cy="36" r="3.5" fill="#0f172a"/>
      <circle cx="70" cy="36" r="3.5" fill="#0f172a"/>
      <path d="M 38 68 Q 50 78 62 68" stroke="#14532d" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`;
    return toSvgDataUri(svg);
  }

  if (cleanTicker === 'POAZI') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="100" height="100" rx="28" fill="#6366f1"/>
      <polygon points="25,22 42,42 20,44" fill="#4338ca"/>
      <polygon points="75,22 80,44 58,42" fill="#4338ca"/>
      <circle cx="50" cy="56" r="32" fill="#818cf8"/>
      <ellipse cx="36" cy="52" rx="4" ry="7" fill="#1e1b4b"/>
      <ellipse cx="64" cy="52" rx="4" ry="7" fill="#1e1b4b"/>
      <polygon points="50,60 46,65 54,65" fill="#f43f5e"/>
      <path d="M 44 68 Q 50 73 56 68" stroke="#1e1b4b" stroke-width="3" fill="none"/>
    </svg>`;
    return toSvgDataUri(svg);
  }

  const gradients = [
    ['#0ea5e9', '#0369a1'],
    ['#8b5cf6', '#5b21b6'],
    ['#ec4899', '#9d174d'],
    ['#f97316', '#c2410c'],
    ['#10b981', '#047857'],
    ['#6366f1', '#3730a3'],
    ['#14b8a6', '#0f766e'],
    ['#eab308', '#a16207'],
  ];
  const [c1, c2] = gradients[absHash % gradients.length];
  const initial = cleanTicker.slice(0, 3) || 'TOK';

  const genericSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="tg_${absHash}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#tg_${absHash})"/>
    <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Geist Mono', monospace" font-weight="800" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="-1">${initial}</text>
  </svg>`;
  return toSvgDataUri(genericSvg);
}
