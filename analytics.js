/**
 * RSF Travaux — Script Universel d'Analyse & Suivi des Conversions
 * Gère Google Tag Manager / GA4 et le suivi des clics WhatsApp, Téléphone et Devis.
 * Aucun cookie n'est déposé ni utilisé par ce script.
 * @version 1.1.0
 */
(function () {
  "use strict";

  // Nettoyage automatique de tout résidu de cache ou bannière précédente
  try {
    localStorage.removeItem("rsf_cookie_consent");
    var residual = document.getElementById("rsf-cookie-banner");
    if (residual && residual.parentNode) residual.parentNode.removeChild(residual);
  } catch (e) {}

  // 1. INITIALISATION DATALAYER POUR GTM & GA4
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  // 2. FONCTION UNIVERSELLE DE TRACKING D'ÉVÉNEMENTS (IN-MEMORY SANS COOKIE)
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

    // Debug console informatif en local
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

      // D. Clic Fiche & Avis Google Maps
      var gReviewLink = e.target.closest('a[href*="g.page/r/"]');
      if (gReviewLink) {
        window.rsfTrackEvent("google_review_click", {
          event_category: "Reputation",
          event_label: "Fiche Google Maps & Avis"
        });
      }
    });
  });
})();
