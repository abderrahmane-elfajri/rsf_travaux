/**
 * RSF Travaux — Script Universel d'Analyse, Tracking & Consentement
 * Gère Google Tag Manager / GA4, le suivi des conversions et le bandeau cookies.
 * @version 1.0.0
 */
(function () {
  "use strict";

  // 1. INITIALISATION DATALAYER POUR GTM & GA4
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  // 2. FONCTION UNIVERSELLE DE TRACKING D'ÉVÉNEMENTS
  window.rsfTrackEvent = function (eventName, eventParams) {
    var payload = Object.assign({
      event: eventName,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      page_title: document.title
    }, eventParams || {});

    window.dataLayer.push(payload);

    // Déclenche un événement DOM pour intégrations tierces (ex: Meta Pixel)
    try {
      var customEvt = new CustomEvent("rsf:analytics", { detail: payload });
      window.dispatchEvent(customEvt);
    } catch (e) {}

    // Debug console informatif
    if (window.location.hostname === "localhost" || window.location.protocol === "file:") {
      console.log("📊 [RSF Analytics]", eventName, payload);
    }
  };

  // 3. DÉTECTION AUTOMATIQUE DES CLICS DE CONVERSION
  document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (e) {
      // A. Clic WhatsApp
      var waLink = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
      if (waLink) {
        var href = waLink.getAttribute("href") || "";
        var location = "body";
        if (waLink.closest(".nav") || waLink.closest(".nav-menu-wrapper")) location = "header_nav";
        else if (waLink.closest(".floating-whatsapp")) location = "floating_button";
        else if (waLink.closest(".service-final-cta")) location = "final_cta";
        else if (waLink.closest(".footer")) location = "footer";
        else if (waLink.closest(".hero") || waLink.closest(".service-hero")) location = "hero";

        window.rsfTrackEvent("whatsapp_click", {
          event_category: "Conversion",
          event_label: waLink.textContent.trim() || "WhatsApp",
          click_location: location,
          target_url: href
        });
      }

      // B. Clic Appel Téléphonique Direct
      var telLink = e.target.closest('a[href^="tel:"]');
      if (telLink) {
        var tel = telLink.getAttribute("href").replace("tel:", "").trim();
        var telLoc = "body";
        if (telLink.closest(".nav")) telLoc = "header_nav";
        else if (telLink.closest(".footer")) telLoc = "footer";
        else if (telLink.closest(".service-final-cta")) telLoc = "final_cta";

        window.rsfTrackEvent("phone_click", {
          event_category: "Conversion",
          event_label: tel,
          click_location: telLoc
        });
      }

      // C. Clic Demande de Devis (Boutons vers contact.html)
      var quoteLink = e.target.closest('a[href*="contact.html"]');
      if (quoteLink && !window.location.pathname.includes("contact.html")) {
        window.rsfTrackEvent("quote_intent", {
          event_category: "Engagement",
          event_label: quoteLink.textContent.trim() || "Demander un devis",
          source_page: window.location.pathname
        });
      }
    });

    // 4. GESTION DU BANDEAU DE CONSENTEMENT COOKIES HAUT DE GAMME
    initCookieConsent();
  });

  function initCookieConsent() {
    var consent = localStorage.getItem("rsf_cookie_consent");
    if (consent) {
      applyConsent(consent === "granted");
      return;
    }

    // Création du bandeau prestige
    var banner = document.createElement("div");
    banner.id = "rsf-cookie-banner";
    banner.className = "rsf-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Gestion des cookies");
    banner.innerHTML = `
      <div class="rsf-cookie-inner">
        <div class="rsf-cookie-text">
          <div class="rsf-cookie-title">
            <span class="cookie-icon">🍪</span> Respect de votre vie privée
          </div>
          <p>
            Nous utilisons des cookies analytiques pour mesurer notre audience et optimiser votre expérience de navigation. Aucune donnée personnelle n'est cédée à des tiers.
            <a href="mentions-legales.html#cookies" class="rsf-cookie-link">En savoir plus</a>.
          </p>
        </div>
        <div class="rsf-cookie-actions">
          <button type="button" id="rsf-cookie-decline" class="rsf-cookie-btn rsf-cookie-btn-ghost">Refuser</button>
          <button type="button" id="rsf-cookie-accept" class="rsf-cookie-btn rsf-cookie-btn-primary">Accepter</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Animation d'apparition discrète
    setTimeout(function () {
      banner.classList.add("visible");
    }, 400);

    // Écouteurs de clics
    document.getElementById("rsf-cookie-accept").addEventListener("click", function () {
      localStorage.setItem("rsf_cookie_consent", "granted");
      applyConsent(true);
      closeBanner(banner);
    });

    document.getElementById("rsf-cookie-decline").addEventListener("click", function () {
      localStorage.setItem("rsf_cookie_consent", "denied");
      applyConsent(false);
      closeBanner(banner);
    });
  }

  function applyConsent(granted) {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied"
    });
    window.rsfTrackEvent("consent_update", {
      consent_status: granted ? "granted" : "denied"
    });
  }

  function closeBanner(banner) {
    banner.classList.remove("visible");
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 400);
  }
})();

