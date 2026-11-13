/**
 * RSF Travaux & Aménagement — Production Interactions & State Controller
 * Gère les variables de marque, le curseur interactif Avant/Après (Multi-scènes),
 * le feedback des pièces jointes et les protocoles d'affichage réactif.
 * @version 2.0.0
 */
(function () {
  "use strict";

  // 1. Configuration par défaut & Personnalisation de marque
  const DEFAULTS = (typeof TWEAK_DEFAULTS !== "undefined") ? TWEAK_DEFAULTS : {
    primaryColor: "#c59b27",
    fontPairing: "classic",
    theme: "light",
    heroHeadline: "Aménagement intérieur & travaux *clé en main* au Maroc."
  };

  function loadState() {
    try {
      const raw = localStorage.getItem("rsf_tweaks");
      if (raw) return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) {}
    return Object.assign({}, DEFAULTS);
  }

  function saveState(s) {
    try {
      localStorage.setItem("rsf_tweaks", JSON.stringify(s));
    } catch (e) {}
  }

  const state = loadState();

  function applyPrimary(color) {
    if (!color) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", color);
    const c = color.replace("#", "");
    if (c.length === 6) {
      const r = Math.max(0, parseInt(c.slice(0, 2), 16) - 40);
      const g = Math.max(0, parseInt(c.slice(2, 4), 16) - 30);
      const b = Math.max(0, parseInt(c.slice(4, 6), 16) - 25);
      const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
      root.style.setProperty("--accent-2", hex);
    }
  }

  function applyFont(name) {
    if (name) document.documentElement.setAttribute("data-font", name);
  }

  function applyTheme(mode) {
    if (mode) document.documentElement.setAttribute("data-theme", mode);
  }

  function applyHeadline(text) {
    if (!text) return;
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

  // Appliquer immédiatement les variables de marque
  applyAll();

  // API publique __rsf pour personnalisation et persistance
  window.__rsf = {
    getState: function () {
      return Object.assign({}, state);
    },
    set: function (patch) {
      Object.assign(state, patch);
      saveState(state);
      applyAll();
      try {
        if (window.location.protocol !== "file:" && window.parent && window.parent !== window) {
          window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
        }
      } catch (e) {}
      if (typeof window.__rsfRenderPanel === "function") {
        window.__rsfRenderPanel();
      }
    }
  };

  // 2. Curseur interactif Avant / Après (Multi-Scènes — Optimisé Mobile & Tactile)
  function initBeforeAfter() {
    const container = document.getElementById("ba-slider");
    const afterLayer = document.getElementById("ba-after-layer");
    const handle = document.getElementById("ba-handle");
    if (!container || !afterLayer || !handle) return;

    let isDown = false;

    function setWidthVar() {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0) {
        container.style.setProperty("--ba-w", rect.width + "px");
      }
    }
    setWidthVar();
    window.addEventListener("resize", setWidthVar);
    window.addEventListener("orientationchange", function () {
      setTimeout(setWidthVar, 120);
    });

    const labelAfter = container.querySelector(".ba-label-after");
    const labelBefore = container.querySelector(".ba-label-before");

    function updatePos(clientX) {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0) return;
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const pct = (x / rect.width) * 100;

      afterLayer.style.width = pct + "%";
      handle.style.left = pct + "%";

      if (labelAfter) labelAfter.style.opacity = pct < 10 ? "0" : "1";
      if (labelBefore) labelBefore.style.opacity = pct > 90 ? "0" : "1";
    }

    if (window.PointerEvent) {
      container.addEventListener("pointerdown", function (e) {
        isDown = true;
        setWidthVar();
        try {
          container.setPointerCapture(e.pointerId);
        } catch (err) {}
        updatePos(e.clientX);
      });
      container.addEventListener("pointermove", function (e) {
        if (isDown) updatePos(e.clientX);
      });
      const endDrag = function (e) {
        if (isDown) {
          isDown = false;
          try {
            container.releasePointerCapture(e.pointerId);
          } catch (err) {}
        }
      };
      container.addEventListener("pointerup", endDrag);
      container.addEventListener("pointercancel", endDrag);
    } else {
      container.addEventListener("mousedown", function (e) {
        isDown = true;
        setWidthVar();
        updatePos(e.clientX);
      });
      window.addEventListener("mouseup", function () {
        isDown = false;
      });
      window.addEventListener("mousemove", function (e) {
        if (isDown) updatePos(e.clientX);
      });

      container.addEventListener("touchstart", function (e) {
        isDown = true;
        setWidthVar();
        if (e.touches && e.touches[0]) updatePos(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener("touchend", function () {
        isDown = false;
      });
      window.addEventListener("touchmove", function (e) {
        if (isDown && e.touches && e.touches[0]) updatePos(e.touches[0].clientX);
      }, { passive: true });
    }

    // Gestion des onglets multi-chantiers (Préchargement instantané)
    const tabs = document.querySelectorAll(".ba-tab");
    const imgBefore = document.getElementById("ba-img-before");
    const imgAfter = document.getElementById("ba-img-after");
    const sceneTitle = document.getElementById("ba-scene-title");

    tabs.forEach(function (tab) {
      const b = tab.getAttribute("data-scene-before");
      const a = tab.getAttribute("data-scene-after");
      if (b) { const i1 = new Image(); i1.src = b; }
      if (a) { const i2 = new Image(); i2.src = a; }
    });

    if (imgBefore) imgBefore.addEventListener("load", setWidthVar);
    if (imgAfter) imgAfter.addEventListener("load", setWidthVar);

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        const newBefore = tab.getAttribute("data-scene-before");
        const newAfter = tab.getAttribute("data-scene-after");
        const altBefore = tab.getAttribute("data-alt-before");
        const altAfter = tab.getAttribute("data-alt-after");
        const caption = tab.getAttribute("data-caption");

        if (imgBefore && newBefore) {
          imgBefore.src = newBefore;
          if (altBefore) imgBefore.alt = altBefore;
        }
        if (imgAfter && newAfter) {
          imgAfter.src = newAfter;
          if (altAfter) imgAfter.alt = altAfter;
        }
        if (sceneTitle && caption) {
          sceneTitle.textContent = caption;
        }

        try {
          tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        } catch (e) {}

        afterLayer.style.width = "50%";
        handle.style.left = "50%";
        if (labelAfter) labelAfter.style.opacity = "1";
        if (labelBefore) labelBefore.style.opacity = "1";
        setWidthVar();
      });
    });
  }

  // 3. Feedback interactif pour upload de plans / photos dans les formulaires de contact
  function initContactForm() {
    const fileInput = document.getElementById("contact-attachment");
    const fileNameSpan = document.getElementById("file-upload-name");
    if (fileInput && fileNameSpan) {
      fileInput.addEventListener("change", function () {
        if (fileInput.files && fileInput.files.length > 0) {
          const isAr = document.documentElement.lang === "ar" || window.location.pathname.includes("/ar/");
          fileNameSpan.textContent = (isAr ? "تم اختيار الملف : " : "Fichier sélectionné : ") + fileInput.files[0].name;
          fileNameSpan.style.fontWeight = "600";
          fileNameSpan.style.color = "var(--accent)";
        }
      });
    }
  }

  // 4. Initialisation sécurisée au chargement du DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initBeforeAfter();
      initContactForm();
    });
  } else {
    initBeforeAfter();
    initContactForm();
  }

  // 5. Protocole optionnel pour l'éditeur iframe de développement (chargé uniquement si embarqué)
  try {
    if (window.location.protocol !== "file:" && window.parent && window.parent !== window) {
      window.addEventListener("message", function (e) {
        const d = e.data || {};
        if (d.type === "__activate_edit_mode") {
          document.documentElement.setAttribute("data-edit-mode", "true");
        } else if (d.type === "__deactivate_edit_mode") {
          document.documentElement.removeAttribute("data-edit-mode");
        }
      });
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    }
  } catch (e) {}
})();
