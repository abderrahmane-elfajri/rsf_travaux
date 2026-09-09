// Renders the shared nav & footer in French or Arabic.
// Highlights active page via data-page attribute on <body>.
(function () {
  const active = document.body.dataset.page || "";
  const isAr = document.documentElement.lang === "ar" || window.location.pathname.includes("/ar/");
  const prefix = isAr ? "../" : "";

  // Map data-page to file name
  const pageFiles = {
    "accueil": "index.html",
    "services": "services.html",
    "methode": "methode.html",
    "realisations": "realisations.html",
    "references": "references.html",
    "contact": "contact.html",
    "mentions": "mentions-legales.html",
    "404": "404.html"
  };

  // Resolve current file
  let currentFile = pageFiles[active];
  if (!currentFile) {
    const rawName = window.location.pathname.split("/").pop();
    currentFile = rawName && rawName.endsWith(".html") ? rawName : "index.html";
  }

  // Switcher URLs
  const frUrl = isAr ? `../${currentFile}` : currentFile;
  const arUrl = isAr ? currentFile : `ar/${currentFile}`;

  const langSwitcherHTML = `
    <div class="lang-switcher" role="group" aria-label="${isAr ? 'اختيار اللغة' : 'Sélecteur de langue'}">
      <a href="${frUrl}" class="lang-switcher-btn ${!isAr ? 'active' : ''}" aria-label="Version Française" hreflang="fr">FR</a>
      <span class="lang-switcher-divider" aria-hidden="true">|</span>
      <a href="${arUrl}" class="lang-switcher-btn ${isAr ? 'active' : ''}" aria-label="النسخة العربية" hreflang="ar">عربي</a>
    </div>
  `;

  const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

  const waMsg = isAr
    ? encodeURIComponent("مرحباً RSF Travaux، أود الاستفسار حول مشروع تهيئة / تجديد.")
    : encodeURIComponent("Bonjour RSF Travaux, je souhaite un renseignement pour un projet de rénovation.");

  // Navigation Links definition
  const links = isAr ? [
    { href: "index.html", num: "01", title: "الرئيسية", page: "accueil" },
    { href: "services.html", num: "02", title: "خدماتنا", page: "services" },
    { href: "methode.html", num: "03", title: "منهجيتنا", page: "methode" },
    { href: "realisations.html", num: "04", title: "إنجازاتنا", page: "realisations" },
    { href: "references.html", num: "05", title: "آراء العملاء", page: "references" },
    { href: "contact.html", num: "06", title: "اتصل بنا", page: "contact" }
  ] : [
    { href: "index.html", num: "01", title: "Accueil", page: "accueil" },
    { href: "services.html", num: "02", title: "Services", page: "services" },
    { href: "methode.html", num: "03", title: "Notre méthode", page: "methode" },
    { href: "realisations.html", num: "04", title: "Réalisations", page: "realisations" },
    { href: "references.html", num: "05", title: "Références", page: "references" },
    { href: "contact.html", num: "06", title: "Contact", page: "contact" }
  ];

  const navLinksHTML = links.map(l => `
    <li><a href="${l.href}" class="${active === l.page ? 'active' : ''}"><span class="link-num">${l.num}</span><span class="link-title">${l.title}</span></a></li>
  `).join("");

  const brandSub = isAr ? "تهيئة وتجديد شامل" : "Aménagement &amp; Rénovation";
  const mobileEyebrow = isAr ? "RSF TRAVAUX · هندسة، تهيئة وتجديد شامل" : "RSF TRAVAUX · ARCHITECTURE &amp; RÉNOVATION";
  const mobileLocation = isAr ? "الدار البيضاء وكافة ربوع المملكة المغربية" : "Casablanca et partout au Maroc";
  const mobileCtaText = isAr ? "تواصل معنا عبر واتساب" : "Discuter sur WhatsApp";
  const mobileCityText = isAr ? "21 عاماً من الخبرة · الدار البيضاء وكافة أنحاء المغرب" : "21 ans d'expérience · Casablanca et partout au Maroc";
  const waBtnText = isAr ? "واتساب" : "WhatsApp";
  const themeToggleLabel = isAr ? "تبديل المظهر الداكن / الفاتح" : "Basculer thème clair / sombre";

  const navHTML = `
    <nav class="nav" aria-label="${isAr ? 'القائمة الرئيسية' : 'Navigation principale'}">
      <div class="nav-inner">
        <a class="brand" href="index.html" aria-label="RSF Travaux">
          <span class="brand-mark">
            <img src="${prefix}assets/rsf-logo.webp" alt="RSF Travaux" width="44" height="44">
          </span>
          <span class="brand-text">
            <span class="brand-name">RSF Travaux</span>
            <span class="brand-sub">${brandSub}</span>
          </span>
        </a>

        <div class="nav-menu-wrapper" id="nav-menu">
          <div class="nav-mobile-header">
            <span class="nav-mobile-eyebrow">${mobileEyebrow}</span>
            <span class="nav-mobile-location">${mobileLocation}</span>
          </div>

          <div class="nav-mobile-lang">
            ${langSwitcherHTML}
          </div>

          <ul class="nav-links">
            ${navLinksHTML}
          </ul>

          <div class="nav-mobile-bottom">
            <a class="btn btn-primary nav-mobile-cta" href="https://wa.me/212664329698?text=${waMsg}" target="_blank" rel="noopener">
              ${WA_ICON}
              <span>${mobileCtaText}</span>
            </a>
            <div class="nav-mobile-info">
              <a href="tel:+212664329698" class="nav-mobile-tel">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                +212 6 64 32 96 98
              </a>
              <span class="nav-mobile-city">${mobileCityText}</span>
            </div>
          </div>
        </div>

        <div class="nav-actions">
          ${langSwitcherHTML}
          <button class="theme-toggle" aria-label="${themeToggleLabel}" title="${themeToggleLabel}">
            <svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg class="theme-moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          </button>
          <a class="nav-cta" href="https://wa.me/212664329698?text=${waMsg}" target="_blank" rel="noopener" aria-label="WhatsApp">
            ${WA_ICON}
            <span>${waBtnText}</span>
          </a>
          <button class="nav-toggle" aria-label="${isAr ? 'القائمة' : 'Menu de navigation'}" aria-expanded="false" aria-controls="nav-menu">
            <span class="nav-toggle-lines" aria-hidden="true">
              <span class="line line-1"></span>
              <span class="line line-2"></span>
              <span class="line line-3"></span>
            </span>
          </button>
        </div>
      </div>
      <div class="nav-backdrop" aria-hidden="true"></div>
    </nav>
  `;

  // Footer Content
  const footerTagline = isAr
    ? "شركة ذات مسؤولية محدودة بشريك وحيد · تهيئة وتجديد شامل"
    : "S.A.R.L. AU · Aménagement &amp; Rénovation";
  const footerDesc = isAr
    ? "شركة عامة للمقاولات وأشغال البناء بخبرة تفوق 21 عاماً بالدار البيضاء وكافة ربوع المملكة المغربية. مشاريع متكاملة تسليم المفتاح."
    : "Entreprise générale de bâtiment forte de 21 ans d'expérience à Casablanca et partout au Maroc. Travaux clé en main.";
  const footerNavTitle = isAr ? "الملاحة" : "Navigation";
  const footerServicesTitle = isAr ? "تخصصاتنا" : "Nos métiers";
  const footerContactTitle = isAr ? "معلومات الاتصال" : "Contact";
  const footerWaLabel = isAr ? "واتساب المباشر" : "WhatsApp direct";
  const footerRights = isAr
    ? `© 2026 RSF TRAVAUX S.A.R.L. AU · جميع الحقوق محفوظة · <a href="mentions-legales.html" style="color: inherit; text-decoration: underline; margin-right: 6px;">الشروط القانونية والخصوصية</a>`
    : `© 2026 RSF TRAVAUX S.A.R.L. AU · Tous droits réservés · <a href="mentions-legales.html" style="color: inherit; text-decoration: underline; margin-left: 6px;">Mentions Légales &amp; Confidentialité</a>`;

  const footerServicesList = isAr ? `
    <li><a href="services.html">أنظمة الزجاج الأكورديون والمتحرك</a></li>
    <li><a href="services.html">التهيئة والتصميم الداخلي</a></li>
    <li><a href="services.html">التجديد الشامل للعقارات</a></li>
    <li><a href="services.html">الصباغة الديكورية والحديثة</a></li>
    <li><a href="services.html">الرخام، السيراميك والبورسلان</a></li>
    <li><a href="services.html">أشغال الجبس والستاف العصري</a></li>
    <li><a href="services.html">العزل المائي والحراري المعتمد</a></li>
    <li><a href="services.html">أرضيات الإيبوكسي الديكورية والصناعية</a></li>
  ` : `
    <li><a href="services.html">Vitrage accordéon &amp; pivotant</a></li>
    <li><a href="services.html">Aménagement intérieur</a></li>
    <li><a href="services.html">Rénovation complète</a></li>
    <li><a href="services.html">Peinture &amp; finitions</a></li>
    <li><a href="services.html">Revêtements &amp; marbre</a></li>
    <li><a href="services.html">Plâtrerie &amp; staff</a></li>
    <li><a href="services.html">Étanchéité</a></li>
    <li><a href="services.html">Sols époxy</a></li>
  `;

  const footerHTML = `
    <footer class="footer">
      <div class="wrap-wide">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-brand-mark">
              <img src="${prefix}assets/rsf-logo.webp" alt="RSF Travaux" width="56" height="56">
            </div>
            <div class="display">RSF Travaux</div>
            <p class="footer-tagline">${footerTagline}</p>
            <p class="footer-desc">${footerDesc}</p>
          </div>
          <div class="footer-col footer-col-nav">
            <h4>${footerNavTitle}</h4>
            <ul>
              ${links.map(l => `<li><a href="${l.href}">${l.title}</a></li>`).join("")}
            </ul>
          </div>
          <div class="footer-col footer-col-services">
            <h4>${footerServicesTitle}</h4>
            <ul>
              ${footerServicesList}
            </ul>
          </div>
          <div class="footer-col footer-col-contact">
            <h4>${footerContactTitle}</h4>
            <ul class="footer-contact-list">
              <li>
                <a href="tel:+212664329698" class="footer-contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  <span>+212 6 64 32 96 98</span>
                </a>
              </li>
              <li>
                <a href="mailto:rsftravaux@gmail.com" class="footer-contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>rsftravaux@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/212664329698?text=${waMsg}" target="_blank" rel="noopener" class="footer-contact-link">
                  ${WA_ICON}
                  <span>${footerWaLabel}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>${footerRights}</div>
          <div class="socials">
            <a href="https://www.instagram.com/rsf_travaux" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.facebook.com/share/1EGiPxQ9j3/" target="_blank" rel="noopener">Facebook</a>
            <a href="https://wa.me/212664329698?text=${waMsg}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Inject into page slots
  const navSlot = document.getElementById("nav-slot");
  const footerSlot = document.getElementById("footer-slot");
  if (navSlot) navSlot.outerHTML = navHTML;
  if (footerSlot) footerSlot.outerHTML = footerHTML;

  // Fixed Floating WhatsApp button
  if (!document.querySelector(".floating-whatsapp")) {
    const floatBtn = document.createElement("a");
    floatBtn.className = "floating-whatsapp";
    floatBtn.href = `https://wa.me/212664329698?text=${waMsg}`;
    floatBtn.target = "_blank";
    floatBtn.rel = "noopener";
    floatBtn.setAttribute("aria-label", isAr ? "تواصل مع شركة RSF Travaux عبر واتساب" : "Discuter sur WhatsApp avec RSF Travaux");
    floatBtn.innerHTML = `
      <span class="floating-wa-pulse"></span>
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      <span class="floating-wa-text">${isAr ? "محادثة" : "Discuter"}</span>
    `;
    document.body.appendChild(floatBtn);
  }

  // Theme toggle — persistent in localStorage
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      const raw = localStorage.getItem("rsf_tweaks");
      const state = raw ? JSON.parse(raw) : {};
      state.theme = theme;
      localStorage.setItem("rsf_tweaks", JSON.stringify(state));
    } catch (e) {}
    if (typeof window.__rsfRenderPanel === "function") window.__rsfRenderPanel();
  }

  (function initTheme() {
    let theme = "light";
    try {
      const raw = localStorage.getItem("rsf_tweaks");
      if (raw) theme = JSON.parse(raw).theme || "light";
    } catch (e) {}
    document.documentElement.setAttribute("data-theme", theme);
  })();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-toggle");
    if (!btn) return;
    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // Scrolled nav state
  function updateNavScrollState() {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  }
  window.addEventListener("scroll", updateNavScrollState, { passive: true });
  updateNavScrollState();

  // Mobile menu toggle
  function setMobileMenu(isOpen) {
    const nav = document.querySelector(".nav");
    const toggleBtn = document.querySelector(".nav-toggle");
    if (!nav) return;
    nav.classList.toggle("nav-open", isOpen);
    document.body.classList.toggle("nav-locked", isOpen);
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  document.addEventListener("click", (e) => {
    const nav = document.querySelector(".nav");
    if (!nav) return;

    if (e.target.closest(".nav-toggle")) {
      const willOpen = !nav.classList.contains("nav-open");
      setMobileMenu(willOpen);
      return;
    }

    if (e.target.closest(".nav-backdrop")) {
      setMobileMenu(false);
      return;
    }

    if (e.target.closest(".nav-links a") || e.target.closest(".nav-mobile-cta") || e.target.closest(".nav-mobile-tel")) {
      setMobileMenu(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    const nav = document.querySelector(".nav");
    if (e.key === "Escape" && nav && nav.classList.contains("nav-open")) {
      setMobileMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    const nav = document.querySelector(".nav");
    if (window.innerWidth > 1080 && nav && nav.classList.contains("nav-open")) {
      setMobileMenu(false);
    }
  }, { passive: true });
})();