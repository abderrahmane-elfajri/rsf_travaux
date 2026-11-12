/**
 * RSF Travaux — Script Universel d'Analyse & Suivi des Conversions
 * Gère Google Tag Manager / GA4 (mode sans cookies conforme CNDP Loi 09-08)
 * et le suivi automatique des clics WhatsApp, Téléphone, Email et Devis.
 * @version 1.2.0
 */
(function () {
  "use strict";

  // Configuration optionnelle : renseignez votre ID réel ci-dessous pour activer GA4/GTM en mode sans cookies
  var GA_MEASUREMENT_ID = window.RSF_GA4_ID || ""; // ex: "G-XXXXXXXXXX"
  var GTM_ID = window.RSF_GTM_ID || "";            // ex: "GTM-XXXXXXX"

  // Nettoyage automatique de tout résidu de cache ou bannière précédente
  try {
    localStorage.removeItem("rsf_cookie_consent");
    var residual = document.getElementById("rsf-cookie-banner");
    if (residual && residual.parentNode) residual.parentNode.removeChild(residual);
  } catch (e) {}

  // 1. INITIALISATION DATALAYER & CONSENT MODE V2 SANS COOKIES
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  if (GA_MEASUREMENT_ID || GTM_ID) {
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  }

  if (GA_MEASUREMENT_ID && /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) {
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true, send_page_view: true });
    var gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(gaScript);
  }

  if (GTM_ID && /^GTM-[A-Z0-9]+$/i.test(GTM_ID)) {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(GTM_ID);
    document.head.appendChild(gtmScript);
  }

  function resolveClickLocation(el) {
    if (!el) return "body";
    if (el.closest(".nav") || el.closest(".nav-menu-wrapper")) return "header_nav";
    if (el.closest(".floating-whatsapp")) return "floating_button";
    if (el.closest(".svc-grand-cta") || el.closest(".service-final-cta") || el.closest(".cta-band")) return "final_cta";
    if (el.closest(".footer")) return "footer";
    if (el.closest(".hero-v2") || el.closest(".hero") || el.closest(".service-hero") || el.closest(".svc-detail-hero")) return "hero";
    if (el.closest(".contact-info") || el.closest(".contact-grid")) return "contact_section";
    return "body";
  }

  // 2. FONCTION UNIVERSELLE DE TRACKING D'ÉVÉNEMENTS (IN-MEMORY SANS COOKIE)
  window.rsfTrackEvent = function (eventName, eventParams) {
    var lang = (document.documentElement.getAttribute("lang") || "fr").toLowerCase();
    var payload = Object.assign({
      event: eventName,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      page_title: document.title,
      page_lang: lang
    }, eventParams || {});

    window.dataLayer.push(payload);

    // Transmet également vers GA4 si configuré
    try {
      var gaParams = Object.assign({}, eventParams || {}, {
        page_path: payload.page_path,
        page_lang: lang
      });
      window.gtag("event", eventName, gaParams);
    } catch (e) {}

    // Déclenche un événement DOM pour intégrations tierces
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
        window.rsfTrackEvent("whatsapp_click", {
          event_category: "Conversion",
          event_label: waLink.textContent.trim() || "WhatsApp",
          click_location: resolveClickLocation(waLink),
          target_url: waLink.getAttribute("href") || ""
        });
      }

      // B. Clic Appel Téléphonique Direct
      var telLink = e.target.closest('a[href^="tel:"]');
      if (telLink) {
        window.rsfTrackEvent("phone_click", {
          event_category: "Conversion",
          event_label: telLink.getAttribute("href").replace("tel:", "").trim(),
          click_location: resolveClickLocation(telLink)
        });
      }

      // C. Clic Email Direct
      var mailLink = e.target.closest('a[href^="mailto:"]');
      if (mailLink) {
        window.rsfTrackEvent("email_click", {
          event_category: "Conversion",
          event_label: mailLink.getAttribute("href").replace("mailto:", "").trim(),
          click_location: resolveClickLocation(mailLink)
        });
      }

      // D. Clic Demande de Devis (Boutons vers contact.html)
      var quoteLink = e.target.closest('a[href*="contact.html"]');
      if (quoteLink && !window.location.pathname.includes("contact.html")) {
        window.rsfTrackEvent("quote_intent", {
          event_category: "Engagement",
          event_label: quoteLink.textContent.trim() || "Demander un devis",
          click_location: resolveClickLocation(quoteLink),
          source_page: window.location.pathname
        });
      }

      // E. Clic Fiche & Avis Google Maps
      var gReviewLink = e.target.closest('a[href*="g.page/r/"]');
      if (gReviewLink) {
        window.rsfTrackEvent("google_review_click", {
          event_category: "Reputation",
          event_label: "Fiche Google Maps & Avis",
          click_location: resolveClickLocation(gReviewLink)
        });
      }
    });
  });
})();
