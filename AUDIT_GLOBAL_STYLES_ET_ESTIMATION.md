# AUDIT GLOBAL DU DESIGN SYSTEM & ESTIMATION TARIFAIRE
**Projet :** RSF Travaux (Portail Bilingue Français / Arabe — 52 Pages)  
**Date d'évaluation :** Septembre 2026  
**Auteur de l'audit :** Direction Artistique & Ingénierie Front-End  

---

## 1. Synthèse Exécutive & Scores Globaux

| Domaine d'évaluation | Note / 10 | Statut | Commentaire de synthèse |
| :--- | :---: | :---: | :--- |
| **Identité Visuelle & Luxe** | **9.0 / 10** | **Excellent** | Allure prestigieuse d'entreprise générale de bâtiment de luxe. Équilibre des tons or chaud, bleu nuit et ivoire. |
| **Bilinguisme & RTL Arabe** | **9.2 / 10** | **Excellence** | Typographie Arabe haut de gamme (El Messiri + Almarai), inversion miroir fluide, 100% balisé hreflang. |
| **SEO & Données Structurées** | **9.8 / 10** | **Exceptionnel** | 52/52 balises Geo & Schema.org (Breadcrumbs, ItemList 18 services, LocalBusiness, FAQ). |
| **Responsive Mobile (320-1440px)** | **8.5 / 10** | **Très Bon** | Navigation moderne avec drawer mobile, header compact, boutons tactiles adaptés. |
| **Architecture CSS & Maintenance** | **7.2 / 10** | **À Optimiser** | Fichier unique volumineux (6 200 lignes), 788 occurrences de `!important` dues aux surcharges successives. |
| **SCORE GLOBAL** | **8.7 / 10** | **Haut de Gamme** | **Site hautement compétitif, calibre agence internationale.** |

---

## 2. Analyse 360° par Axe Stylistique

### Axe 1 : Typographie & Échelle Hiérarchique
- **Version Française :**
  - **Titres d'apparat (H1, H2) :** *Cormorant Garamond* & *Cinzel* apportent un cachet architectural intemporel, très adapté à la rénovation haut de gamme.
  - **Interface & Textes courants :** *Plus Jakarta Sans* et *Inter* assurent une lisibilité optimale même sur écran compact.
  - **Données techniques & Badges :** *JetBrains Mono* apporte la rigueur de l'ingénierie et du métré bâtiment.
- **Version Arabe :**
  - **Titres (H1, H2, H3) :** *El Messiri* confère aux titres arabes une signature visuelle prestigieuse d'artisanat d'art et d'architecture contemporaine.
  - **Corps de texte :** *Almarai* assure un confort de lecture exemplaire avec un interlignage aéré (`line-height: 1.8`).
- **Axe d'amélioration :** Éliminer les styles typographiques définis directement en `style="..."` dans le HTML pour centraliser tous les line-heights et font-sizes dans les variables CSS.

### Axe 2 : Palette de Couleurs & Contraste
- **Couleurs Principales :**
  - `--navy` (`#0b132b` / `#0f182e`) : Ancrage institutionnel, solidité et sérieux d'entreprise générale.
  - `--accent` (`#b88e2f` / `#c89d3e`) : Dorure architecturale subtile, jamais criarde.
  - `--bg` (`#fbf7ef`) : Ivoire minéral chaleureux, éliminant la froideur du blanc hôpital.
  - `--line` (`rgba(11, 19, 43, 0.08)` / `#e5e1d8`) : Filets fins de séparation évoquant le tracé des plans d'architectes.
- **Dark Mode (`html[data-theme="dark"]`) :**
  - Implémenté sur 176 règles dédiées.
  - Les contrastes sont conformes aux normes WCAG AA (lisibilité texte blanc sur fond bleu nuit profond).

### Axe 3 : Cartes de Services (`.svc-card`)
- **Design d'origine (Confirmé & Rétabli) :**
  - Approche immersive *Full-Bleed* : la photo occupe toute la carte, recouverte par un dégradé ascendant sombre.
  - Bouton circulaire doré distinctif en haut de carte (`.arrow`).
  - Bloc textuel blanc contrasté au pied de la carte.
- **Point de vigilance :** Sur certains écrans d'ordinateurs portables (hauteur d'écran de 768px), la carte de 480px de haut demande un léger scroll pour voir l'intégralité du texte.

### Axe 4 : Responsive & Navigation Mobile
- Navigation mobile avec barre d'onglets inférieure (`bottom-nav`) pour accès instantané à WhatsApp, Appel, Devis et Menu.
- Bandeau déroulant (*Marquee*) en boucle continue infinie sur 18 services, fluide en LTR comme en RTL.
- 61 media queries adaptant chaque section de 320px à 1920px.

---

## 3. Ce Qu'il Faut Corriger / Optimiser (Plan d'Action)

| Priorité | Élément | Diagnostic | Solution recommandée |
| :---: | :--- | :--- | :--- |
| **P1** | **Assainissement CSS** | 788 `!important` dans `styles.css`. Risque de conflits lors de futures modifications. | Réorganiser les règles en cascade avec des classes spécifiques plutôt que de forcer le niveau de priorité. |
| **P2** | **Styles Inline HTML** | 19 styles `style="..."` en moyenne par page (ex: `margin-top: 24px`). | Rapatrier ces marges et line-heights dans des classes utilitaires (`mt-24`, `lh-tight`). |
| **P3** | **Modularité CSS** | Un fichier unique de 6 200 lignes (162 Ko). | Découper en 4 fichiers importés ou minifiés : `tokens.css`, `base.css`, `components.css`, `rtl.css`. |
| **P4** | **Photos Réelles Métiers** | Plusieurs pages de services utilisent des visuels de stock. | Remplacer progressivement par les photographies authentiques de chantiers livrés par RSF Travaux. |

---

## 4. Estimation Tarifaire & Valeur Marchande (Pricing Benchmark)

Voici l'évaluation financière objective de ce site (audit, architecture, intégration de 52 pages bilingues, SEO local, optimisation de performance et design system haut de gamme) selon les grilles tarifaires professionnelles actuelles :

### A. Marché Marocain (Casablanca / Rabat — Agences Digitales & Studios de Prestige)

| Prestation / Livrable | Fourchette Basse (Freelance Senior) | Fourchette Haute (Agence Web Luxe / Conseil) |
| :--- | :---: | :---: |
| **Conception UI/UX & Design System Architectural** (Chartes, palettes, typographies bilingues FR/AR) | 12 000 MAD | 25 000 MAD |
| **Développement Front-End Sur-Mesure** (52 gabarits HTML5 / CSS3 / Vanilla JS, sans dépendance lourde, Dark Mode, RTL) | 45 000 MAD | 80 000 MAD |
| **SEO Technique International & Local Maroc** (52 balises Geo, Schema.org LocalBusiness, Breadcrumbs, hreflang) | 10 000 MAD | 20 000 MAD |
| **Audit & Refonte de Styles / Optimisation de Conversion** (Marquee infini, filtres dynamiques, UX devis WhatsApp) | 8 000 MAD | 15 000 MAD |
| **VALEUR TOTALE ESTIMÉE (MAROC)** | **75 000 MAD** | **140 000 MAD** |
| *Moyenne Marché Recommandée* | \multicolumn{2}{c|}{**~ 95 000 MAD HT**} |

---

### B. Marché Européen / International (France, Suisse, Émirats Arabes Unis)

| Prestation / Livrable | Tarif Marché France / Benelux | Tarif Marché Suisse / Golfe (AED / CHF) |
| :--- | :---: | :---: |
| **Direction Artistique & Identité Éditoriale Bâtiment de Luxe** | 2 500 € – 4 500 € | 4 000 CHF – 7 000 CHF |
| **Intégration Bilingue 52 Pages Statiques Ultra-Véloces (RTL)** | 6 000 € – 12 000 € | 9 000 CHF – 16 000 CHF |
| **SEO Avancé, JSON-LD Schema.org & Performance Core Web Vitals** | 1 800 € – 3 500 € | 2 500 CHF – 4 500 CHF |
| **VALEUR TOTALE ESTIMÉE (INTERNATIONAL)** | **10 300 € – 20 000 €** | **15 500 CHF – 27 500 CHF** |
| *Moyenne Internationale* | \multicolumn{2}{c|}{**~ 14 500 € (ou ~155 000 MAD)**} |

> [!NOTE]
> **Pourquoi cette valeur est élevée ?**  
> Le site ne repose pas sur un thème WordPress préfabriqué ou un modèle standard. Il comprend **52 pages statiques manuelles ultra-rapides**, un système bilingue complet sans rechargement de page externe, une structure de données Schema.org d'une précision chirurgicale pour chaque service, et un design typographique arabe calibré au millimètre.
