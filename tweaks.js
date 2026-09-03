// Shared Tweaks controller across all pages.
// Persists to localStorage AND to the /*EDITMODE-BEGIN*/ block on index.html.
(function () {
  const DEFAULTS = {
    primaryColor: "#c59b27",
    fontPairing: "architectural",
    theme: "light",
    heroHeadline: "Nous transformons votre bâtiment en un espace moderne qui vous *ressemble*."
  };

  // Load from localStorage first (survives across pages)
  function load() {
    try {
      const raw = localStorage.getItem("rsf_tweaks");
      if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch (e) {}
    return { ...DEFAULTS };
  }
  function save(state) {
    try { localStorage.setItem("rsf_tweaks", JSON.stringify(state)); } catch (e) {}
  }

  const state = load();

  function applyPrimary(color) {
    const root = document.documentElement;
    root.style.setProperty("--accent", color);
    // Derive darker variant
    const c = color.replace("#", "");
    if (c.length === 6) {
      const r = Math.max(0, parseInt(c.slice(0, 2), 16) - 40);
      const g = Math.max(0, parseInt(c.slice(2, 4), 16) - 30);
      const b = Math.max(0, parseInt(c.slice(4, 6), 16) - 25);
      const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
      root.style.setProperty("--accent-2", hex);
    }
  }
  function applyFont(name) { document.documentElement.setAttribute("data-font", name); }
  function applyTheme(mode) { document.documentElement.setAttribute("data-theme", mode); }
  function applyHeadline(text) {
    document.querySelectorAll("[data-hero-headline]").forEach(el => {
      el.innerHTML = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    });
  }

  function applyAll() {
    applyPrimary(state.primaryColor);
    applyFont(state.fontPairing);
    applyTheme(state.theme);
    applyHeadline(state.heroHeadline);
  }
  applyAll();

  // Expose for the panel
  window.__rsf = {
    getState: () => ({ ...state }),
    set: (patch) => {
      Object.assign(state, patch);
      save(state);
      applyAll();
      // Persist to disk via edit-mode protocol
      try {
        window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
      } catch (e) {}
      // Refresh panel controls if open
      if (typeof window.__rsfRenderPanel === "function") window.__rsfRenderPanel();
    }
  };

  // -------- Tweaks panel --------
  let panelEl = null;
  function buildPanel() {
    if (panelEl) return panelEl;
    panelEl = document.createElement("div");
    panelEl.id = "rsf-tweaks-panel";
    panelEl.innerHTML = `
      <style>
        #rsf-tweaks-panel {
          position: fixed; right: 20px; bottom: 20px;
          width: 320px;
          background: #fbf7ef;
          color: #1c1712;
          border: 1px solid #d8ccb4;
          border-radius: 8px;
          padding: 18px;
          font-family: "DM Sans", Helvetica, sans-serif;
          font-size: 13px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          z-index: 99999;
          display: none;
        }
        #rsf-tweaks-panel.open { display: block; }
        #rsf-tweaks-panel h5 {
          margin: 0 0 4px;
          font-family: "Instrument Serif", Georgia, serif;
          font-weight: 400;
          font-size: 20px;
        }
        #rsf-tweaks-panel .sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a6e5f;
          margin-bottom: 16px;
        }
        #rsf-tweaks-panel .tw-section { margin-top: 16px; border-top: 1px solid #ebe1cf; padding-top: 14px; }
        #rsf-tweaks-panel .tw-label {
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #7a6e5f; margin-bottom: 10px; display: block;
        }
        #rsf-tweaks-panel .swatches { display: flex; gap: 8px; }
        #rsf-tweaks-panel .sw {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2px solid transparent; cursor: pointer;
          transition: transform 0.15s;
        }
        #rsf-tweaks-panel .sw:hover { transform: scale(1.08); }
        #rsf-tweaks-panel .sw.active { border-color: #1c1712; }
        #rsf-tweaks-panel .segs { display: flex; gap: 4px; }
        #rsf-tweaks-panel .seg {
          flex: 1; padding: 8px 6px; border-radius: 4px;
          background: #ebe1cf; border: 0; cursor: pointer;
          font-family: inherit; font-size: 11px; color: #3a3129;
          transition: all 0.15s;
        }
        #rsf-tweaks-panel .seg.active { background: #1c1712; color: #f4ede1; }
        #rsf-tweaks-panel textarea {
          width: 100%; box-sizing: border-box;
          padding: 8px; border: 1px solid #d8ccb4; border-radius: 4px;
          font-family: inherit; font-size: 13px; resize: vertical;
          background: #f4ede1; color: #1c1712;
        }
        #rsf-tweaks-panel .hint {
          font-size: 10px; color: #7a6e5f; margin-top: 6px;
        }
        #rsf-close {
          position: absolute; top: 12px; right: 12px;
          background: none; border: 0; cursor: pointer; font-size: 16px; color: #7a6e5f;
        }
      </style>
      <button id="rsf-close" aria-label="Close">✕</button>
      <h5>Tweaks</h5>
      <div class="sub">RSF Travaux — style</div>

      <div class="tw-section">
        <label class="tw-label">Couleur primaire</label>
        <div class="swatches" id="tw-colors">
          <button class="sw" data-c="#c59b27" style="background:#c59b27" title="Or construction (marque)"></button>
          <button class="sw" data-c="#e5c158" style="background:#e5c158" title="Or clair"></button>
          <button class="sw" data-c="#b8624a" style="background:#b8624a" title="Terracotta"></button>
          <button class="sw" data-c="#5c6f6a" style="background:#5c6f6a" title="Sauge"></button>
          <button class="sw" data-c="#111e38" style="background:#111e38" title="Navy (marque)"></button>
        </div>
      </div>

      <div class="tw-section">
        <label class="tw-label">Pairing typographique</label>
        <div class="segs" id="tw-fonts">
          <button class="seg" data-f="editorial">Éditorial</button>
          <button class="seg" data-f="architectural">Archi</button>
          <button class="seg" data-f="classic">Classique</button>
        </div>
      </div>

      <div class="tw-section">
        <label class="tw-label">Thème</label>
        <div class="segs" id="tw-theme">
          <button class="seg" data-t="light">Clair</button>
          <button class="seg" data-t="dark">Sombre</button>
        </div>
      </div>

      <div class="tw-section">
        <label class="tw-label">Titre du héros</label>
        <textarea id="tw-headline" rows="3"></textarea>
        <div class="hint">Utilisez *étoiles* pour la mise en italique / accent.</div>
      </div>
    `;
    document.body.appendChild(panelEl);

    panelEl.querySelector("#rsf-close").addEventListener("click", () => {
      panelEl.classList.remove("open");
    });
    panelEl.querySelectorAll("#tw-colors .sw").forEach(el => {
      el.addEventListener("click", () => window.__rsf.set({ primaryColor: el.dataset.c }));
    });
    panelEl.querySelectorAll("#tw-fonts .seg").forEach(el => {
      el.addEventListener("click", () => window.__rsf.set({ fontPairing: el.dataset.f }));
    });
    panelEl.querySelectorAll("#tw-theme .seg").forEach(el => {
      el.addEventListener("click", () => window.__rsf.set({ theme: el.dataset.t }));
    });
    const ta = panelEl.querySelector("#tw-headline");
    ta.addEventListener("input", () => window.__rsf.set({ heroHeadline: ta.value }));
    return panelEl;
  }

  window.__rsfRenderPanel = function () {
    if (!panelEl) return;
    panelEl.querySelectorAll("#tw-colors .sw").forEach(el => {
      el.classList.toggle("active", el.dataset.c === state.primaryColor);
    });
    panelEl.querySelectorAll("#tw-fonts .seg").forEach(el => {
      el.classList.toggle("active", el.dataset.f === state.fontPairing);
    });
    panelEl.querySelectorAll("#tw-theme .seg").forEach(el => {
      el.classList.toggle("active", el.dataset.t === state.theme);
    });
    const ta = panelEl.querySelector("#tw-headline");
    if (ta && document.activeElement !== ta) ta.value = state.heroHeadline;
  };

  // Edit-mode protocol
  window.addEventListener("message", (e) => {
    const d = e.data || {};
    if (d.type === "__activate_edit_mode") {
      buildPanel();
      panelEl.classList.add("open");
      window.__rsfRenderPanel();
    } else if (d.type === "__deactivate_edit_mode") {
      if (panelEl) panelEl.classList.remove("open");
    }
  });
  try {
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
  } catch (e) {}
})();
