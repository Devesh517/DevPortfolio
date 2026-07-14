(function () {
  'use strict';

  const THEMES = [
    { name: 'Blue',    primary: '#3b82f6', secondary: '#1e40af' },
    { name: 'Purple',  primary: '#8b5cf6', secondary: '#6d28d9' },
    { name: 'Green',   primary: '#10b981', secondary: '#047857' },
    { name: 'Orange',  primary: '#f97316', secondary: '#c2410c' },
    { name: 'Red',     primary: '#ef4444', secondary: '#b91c1c' },
    { name: 'Default', primary: null,      secondary: null }, // clears overrides, falls back to main.css defaults
  ];

  const STORAGE_KEY = 'accentTheme';

  function applyTheme(theme) {
    const root = document.documentElement;
    if (!theme.primary) {
      // "Default" — remove inline overrides, let main.css / data-theme vars take over again
      root.style.removeProperty('--user-accent-primary');
      root.style.removeProperty('--user-accent-secondary');
      root.style.removeProperty('--user-accent-gradient');
      return;
    }
    root.style.setProperty('--user-accent-primary', theme.primary);
    root.style.setProperty('--user-accent-secondary', theme.secondary);
    root.style.setProperty(
      '--user-accent-gradient',
      `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
    );
  }

  function buildSwatches(panel, onPick) {
    THEMES.forEach((theme) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', theme.name);
      btn.title = theme.name;
      btn.className =
        'w-8 h-8 rounded-full border-2 border-white/70 shadow-sm hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-1';
      btn.style.background = theme.primary
        ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
        : 'linear-gradient(135deg, #94a3b8, #334155)';
      btn.addEventListener('click', () => onPick(theme));
      panel.appendChild(btn);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('themePaletteToggle');
    const panel = document.getElementById('themePalettePanel');
    if (!toggleBtn || !panel) return;

    buildSwatches(panel, (theme) => {
      applyTheme(theme);
      localStorage.setItem(STORAGE_KEY, theme.name);
      panel.classList.add('hidden');
    });

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
    });

    // close on outside click (also covers taps inside the mobile menu)
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== toggleBtn) {
        panel.classList.add('hidden');
      }
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') panel.classList.add('hidden');
    });

    // re-apply saved theme on load
    const savedName = localStorage.getItem(STORAGE_KEY);
    const saved = THEMES.find((t) => t.name === savedName);
    if (saved) applyTheme(saved);
  });
})();