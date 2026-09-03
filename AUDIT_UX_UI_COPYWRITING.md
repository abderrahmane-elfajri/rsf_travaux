# 📋 AUDIT EXPERT UI / UX & COPYWRITING — RSF TRAVAUX

> **Date de l'audit** : Mars 2026  
> **Auteur** : Lead UI/UX Designer & Senior Conversion Copywriter  
> **Périmètre** : Audit exhaustif du site web (`index.html`, `services.html`, `methode.html`, `realisations.html`, `references.html`, `contact.html`, `nav.js`, `styles.css`)  
> **Positionnement cible** : Entreprise générale d'aménagement et de rénovation haut de gamme à Casablanca et au Maroc.

---

## 🧭 TABLE DES MATIÈRES
1. [Synthèse Globale & Tableau de Bord](#1-synthèse-globale--tableau-de-bord)
2. [Erreurs Critiques de Crédibilité & Incohérences Majeures](#2-erreurs-critiques-de-crédibilité--incohérences-majeures)
3. [Audit Copywriting & Voix de Marque](#3-audit-copywriting--voix-de-marque)
4. [Audit Ergonomie & Parcours Utilisateur (UX)](#4-audit-ergonomie--parcours-utilisateur-ux)
5. [Audit Design & Interface Visuelle (UI)](#5-audit-design--interface-visuelle-ui)
6. [Audit Page par Page (Revue Détaillée)](#6-audit-page-par-page-revue-détaillée)
7. [Plan d'Action Recommandé (Roadmap par Priorité)](#7-plan-daction-recommandé-roadmap-par-priorité)

---

## 1. SYNTHÈSE GLOBALE & TABLEAU DE BORD

| Pilier | Note | Verdict | Constat Clé |
|---|:---:|:---:|---|
| **Crédibilité & Confiance** | **5.5 / 10** | ⚠️ Alerte | Plusieurs contradictions flagrantes entre pages détruisent la preuve sociale. |
| **Copywriting & Persuasion** | **6.5 / 10** | 🟡 Moyen | Ton élégant mais textes parfois passifs, répétitifs ou imprécis. |
| **Ergonomie & Parcours (UX)** | **6.0 / 10** | 🟡 Moyen | Liens sans destination, formulaire confus, tunnels de conversion incomplets. |
| **Interface & Esthétique (UI)** | **7.5 / 10** | 🟢 Bon | Belle palette sobre (Navy / Or), mais contrastes et micro-interactions perfectibles. |
| **Responsive Mobile** | **7.0 / 10** | 🟢 Bon | Bonne base mais surcharge d'éléments flottants et boutons tactiles parfois trop serrés. |

---

## 2. ERREURS CRITIQUES DE CRÉDIBILITÉ & INCOHÉRENCES MAJEURES

Ces anomalies sont **critiques** car elles sont immédiatement repérées par un client à fort pouvoir d'achat (propriétaire de villa, architecte, investisseur) et jettent le doute sur l'authenticité de l'entreprise :

### 🔴 1. La contradiction des années d'expérience (Grave)
* **Partout sur le site** (Hero, Footer, Menu mobile, Section À propos) :  
  `« 21 ans d'expérience »`
* **Sur `references.html` (Ligne 105 & Ligne 119)** :  
  `« Depuis 2024, chaque projet est né d'une relation de confiance »`  
  `« 2 Années d'activité »`
* **Impact UX/Psychologique** : Le visiteur pense immédiatement qu'il s'agit d'un mensonge marketing ou d'un site template non fini.
* **Correction recommandée** : Remplacer sur `references.html` par `« 21 Années d'expérience »` et harmoniser la phrase d'introduction (*« Fruit de plus de 20 ans de savoir-faire sur les plus beaux chantiers du Maroc... »*).

### 🔴 2. Le nombre de métiers en interne qui change à chaque page
* **`services.html`** : `« Quatorze métiers »` (14 métiers)
* **`index.html` (Compteur stats ligne 326)** : `« 10 Métiers en interne »`
* **`references.html` (Compteur stats ligne 123)** : `« 8 Métiers en interne »`
* **Impact** : L'entreprise ne semble pas savoir combien d'artisans ou de corps de métier elle maîtrise.
* **Correction recommandée** : Aligner **partout sur 14 métiers** (qui est la réalité affichée et détaillée sur la page Services).

### 🔴 3. Faux logos / Titres inversés sur la page Références
* Dans la grille des clients et partenaires sur `references.html` :
  * La case ayant pour attribut `title="OCP Group"` affiche en réalité le logo de **Fadaa Saada** (`fadaa_saada.jpg`).
  * La case ayant pour attribut `title="CIH Bank"` affiche en réalité le logo du **Groupe Jamaï** (`jamai.jpg`).
* **Impact** : Décrédibilise immédiatement les références B2B face à des partenaires institutionnels.

### 🔴 4. "En voici trois" alors qu'il y en a cinq
* Sur `index.html` (Ligne 344) :  
  `« Chaque projet est une conversation entre le lieu, ceux qui l'habitent et les matériaux qui le composent. En voici trois. »`
* Juste en dessous : La grille affiche **5 projets** (`Appartement Anfa`, `Cuisine Palmeraie`, `Suite Travertin`, `Riad Bab Doukkala`, `Bureau Studio`).
* **Correction** : Changer le texte en : *« En voici un aperçu. »* ou *« Découvrez une sélection de nos dernières réalisations. »*.

---

## 3. AUDIT COPYWRITING & VOIX DE MARQUE

### 3.1. Ton & Persona
* **État actuel** : Style hybride entre l'artisan local et le cabinet d'architecture. Le ton alterne entre le tutoiement implicite et le vouvoiement formel.
* **Objectif** : Un ton **Prestige, Rassurance & Clarté**. Le client qui engage 500 000 à 3 000 000 MAD pour sa villa ou son appartement cherche :
  1. La sérénité (zéro stress de chantier).
  2. Le respect des délais et des devis fermes.
  3. L'exigence des finitions haut de gamme.

### 3.2. Problèmes de Copywriting Détectés

#### A. Anglicisme déplacé dans la page Services
* **Texte actuel** (`services.html`, ligne 151) :  
  `« Refonte structurelle turnkey — démolition, maçonnerie, plomberie, électricité. »`
* **Problème** : "turnkey" est un anglicisme inutile au milieu d'un texte français de standing.
* **Proposition** : `« Refonte structurelle clé en main — démolition, maçonnerie, fluides et électricité. »`

#### B. Faute d'orthographe dans le formulaire de devis
* **Texte actuel** (`contact.html`, ligne 195) :  
  `<option>Moin de 250k MAD</option>`
* **Problème** : Faute de grammaire visible sur le premier choix de budget (*"Moin"* au lieu de *"Moins"*).
* **Proposition** : `<option>Moins de 250 000 MAD</option>`

#### C. Titres de CTA trop génériques
* Des boutons intitulés *"Formulaire de contact"* ou *"Voir toutes les réalisations"* sont froids et n'apportent aucun bénéfice utilisateur.
* **Remplacement recommandé** :
  * Au lieu de *"Formulaire de contact"* ➔ **`« Estimer mon projet en ligne »`**
  * Au lieu de *"Voir toutes les réalisations"* ➔ **`« Explorer le portfolio complet (100+ projets) »`**
  * Au lieu de *"Discuter"* ➔ **`« Parler à un chef de projet »`** ou **`« WhatsApp direct »`**

---

## 4. AUDIT ERGONOMIE & PARCOURS UTILISATEUR (UX)

### 4.1. Le problème majeur de la Galerie Portfolio (`realisations.html`)
* **Constat** : Chaque carte de projet est une balise `<a>` **sans attribut `href`** (`<a class="project p-a" data-tag="residentiel">`).
* **Frustration utilisateur** : L'utilisateur clique ou tape sur une image pour voir d'autres photos de la villa, le avant/après, ou la description du chantier, mais **rien ne se passe**. L'élément a l'apparence d'un lien actif mais se comporte comme une impasse.
* **Solution UX** :
  1. Soit intégrer une **lightbox plein écran** avec carrousel photo au clic.
  2. Soit ajouter un modal avec fiche technique (m² rénovés, durée du chantier, prestations réalisées).

### 4.2. Incohérence dans le Formulaire de Contact (`contact.html`)
* **Champ étiqueté "Type de bien"** :
  * Le label affiche : `Type de bien` (l'utilisateur s'attend à : Villa, Appartement, Riad, Bureau, Commerce).
  * Les options du menu déroulant affichent : `Système de vitrage accordéon`, `Plâtrerie & staff`, `Étanchéité`, `Moulure PVC`, etc.
* **Problème UX** : Confusion cognitive entre **l'objet immobilier** et **les corps d'état souhaités**.
* **Solution** :
  * Scinder en 2 champs clairs :
    1. `Type de bien` : *Villa / Duplex*, *Appartement*, *Espace professionnel / Bureau*, *Riad*, *Commerce / Restaurant*.
    2. `Travaux envisagés` : *Rénovation complète clé en main*, *Vitrage accordéon panoramique*, *Peinture & finitions décoratives*, *Aménagement intérieur*, etc.

### 4.3. Absence de message pré-rempli sur le lien WhatsApp
* **Constat** : Tous les boutons WhatsApp pointent vers `https://wa.me/212664329698` sans texte d'initialisation.
* **Impact UX** : L'utilisateur arrive sur une conversation WhatsApp vide et doit écrire de zéro.
* **Recommandation** : Ajouter un paramètre `text` contextualisé selon l'origine du clic :
  * Depuis le Hero : `https://wa.me/212664329698?text=Bonjour%2C%20je%20souhaite%20un%20renseignement%20pour%20un%20projet%20de%20r%C3%A9novation.`
  * Depuis la page Services : `https://wa.me/212664329698?text=Bonjour%2C%20je%20souhaite%20demander%20un%20devis%20pour%20mes%20travaux.`

### 4.4. Filtrage par service absent depuis la page Services
* Sur `services.html`, chaque carte de métier possède une flèche et un lien vers `realisations.html`.
* En cliquant dessus, l'utilisateur arrive en haut de la page réalisations globale, **sans que le filtre correspondant soit automatiquement activé** (ex. cliquer sur "Peinture" devrait ouvrir les réalisations filtrées sur la peinture).

---

## 5. AUDIT DESIGN & INTERFACE VISUELLE (UI)

### 5.1. Typographie & Lisibilité
* **Points forts** : L'association de `Cinzel` (titres d'inspiration architecturale classique) et `Plus Jakarta Sans` / `Inter` offre une assise haut de gamme.
* **Points à corriger** :
  * Trop de polices différentes chargées dans le `<head>` (Cinzel, Plus Jakarta Sans, Cormorant Garamond, Inter, JetBrains Mono, Amiri). Cela alourdit le temps de rendu initial (FCP).
  * Les textes secondaires en majuscules avec espacement `letter-spacing: 0.14em` sont très élégants mais deviennent difficilement déchiffrables en dessous de `11px` sur mobile.

### 5.2. Mode Sombre (Dark Mode)
* **Points corrigés récemment** : Le badge flottant `.about-floating-card .card-text` est désormais bien visible en verre sombre de luxe avec texte blanc.
* **Points restants à peaufiner** :
  * Les bordures de cartes (`var(--line)`) sont parfois trop peu contrastées sur fond sombre profond.
  * L'effet de halo des logos partenaires (`client-cell`) sur fond sombre nécessite un fond blanc cassé ou un léger filtre inversé pour que les logos foncés restent lisibles.

### 5.3. Ergonomie Mobile & Éléments Flottants
* **Conflit d'espace en bas de page** :
  * Le bouton flottant WhatsApp (`bottom: 24px; right: 24px`) est très performant pour la conversion.
  * Cependant, sur un petit écran de smartphone (< 380px de large), son texte *"Discuter"* et sa pastille peuvent masquer les boutons d'action ou le footer.
  * **Astuce UI** : Sur mobile (< 480px), réduire le bouton flottant à une icône WhatsApp circulaire compacte (`50px × 50px`) avec l'onde pulsante, et masquer le label texte *"Discuter"*.

---

## 6. AUDIT PAGE PAR PAGE (REVUE DÉTAILLÉE)

### 📄 1. Page d'Accueil (`index.html`)
| Élément | Problème détecté | Solution recommandée |
|---|---|---|
| **Hero** | Le double bouton CTA ("WhatsApp" + "Découvrir nos réalisations") a un style très proche sur mobile. | Donner une priorité visuelle forte au bouton WhatsApp (or ou vert WhatsApp) et passer le second en outline sobre. |
| **Section À propos** | Le badge photo indique `Casablanca · Tout le Maroc`. Très bien, mais manque un lien direct vers la page méthode. | Rendre le badge interactif ou orienter l'utilisateur vers la méthodologie. |
| **Compteur Stats** | `10 Métiers en interne` | Remplacer par `14 Métiers en interne`. |
| **Teaser Réalisations** | La phrase annonce `En voici trois` pour 5 projets. | Corriger par `En voici une sélection` ou afficher exactement 3 projets phares. |

---

### 📄 2. Page Services (`services.html`)
| Élément | Problème détecté | Solution recommandée |
|---|---|---|
| **Card 02** | L'attribut alt de l'image indique `Aménagement extérieur` alors que le service est `Aménagement Intérieur`. | Aligner l'alt text : `alt="Aménagement intérieur de standing"`. |
| **Card 03** | Mot `turnkey` en anglais dans la description. | Remplacer par `clé en main`. |
| **CTA Intermédiaire** | Pas de bouton d'action directe sous chaque groupe de métier. | Ajouter sous chaque groupe de 4 cartes un lien textuel rapide : *« Devis pour ce type de travaux → »*. |

---

### 📄 3. Page Notre Méthode (`methode.html`)
| Élément | Problème détecté | Solution recommandée |
|---|---|---|
| **Timeline fixe** | Les étapes sont labellisées par semaines fixes (`Semaine 1`, `Semaines 2–4`, `Semaine 5`). Pour un grand chantier de villa, cela prend plus de temps ; pour une rénovation de cuisine, moins. | Ajouter une mention : *« Délais indicatifs pour un appartement de standing (ajustés selon l'envergure du projet) »*. |
| **Visuels de chantier** | La page est très textuelle, avec des chiffres et listes à puces mais aucun visuel de plan 3D réel. | Insérer 1 ou 2 illustrations ou photos d'étape (ex. un plan 3D et un cliché de chantier propre) pour concrétiser la rigueur. |

---

### 📄 4. Page Réalisations (`realisations.html`)
| Élément | Problème détecté | Solution recommandée |
|---|---|---|
| **Cartes non cliquables** | L'utilisateur s'attend à ouvrir les projets mais ce sont des balises `<a>` mortes. | Intégrer une galerie modale / lightbox photo responsive. |
| **Filtres de tags** | Le filtre `Bureaux & Pros` n'a qu'un seul projet visible (`Bureau Studio`). | Ajouter au moins un 2ᵉ projet tertiaire/commercial pour étoffer la catégorie. |
| **Compteur de projets** | Le sous-titre annonce `100+ projets livrés`, mais seulement 10 sont affichés sans pagination ni bouton "Charger plus". | Ajouter un indicateur : *« Sélection de 10 réalisations emblématiques parmi plus de 100 chantiers livrés »*. |

---

### 📄 5. Page Références & Confiance (`references.html`)
| Élément | Problème détecté | Solution recommandée |
|---|---|---|
| **Compteurs** | Indique `2 Années d'activité` et `8 Métiers en interne` (en contradiction avec les 21 ans et 14 métiers). | Remplacer par `21 Années d'expérience` et `14 Métiers d'excellence`. |
| **Introduction** | Indique `Depuis 2024`. | Corriger en soulignant les 2 décennies d'exercice. |
| **Logos Partenaires** | Inversion des titres OCP Group / Fadaa Saada et CIH Bank / Jamaï. | Corriger les attributs `title` et `alt` correspondants. |
| **Avis Clients** | Les témoignages n'ont pas d'étoiles visuelles (★★★★★). | Ajouter 5 étoiles dorées au-dessus de chaque avis pour un impact visuel instantané. |

---

### 📄 6. Page Contact & Devis (`contact.html`)
| Élément | Problème détecté | Solution recommandée |
|---|---|---|
| **Menu déroulant** | "Type de bien" contient la liste des techniques de finition et des matériaux. | Réorganiser en deux menus : Bien immobilier (Villa, Appt, etc.) et Type d'intervention. |
| **Coquille orthographe** | `Moin de 250k MAD` | Corriger en `Moins de 250 000 MAD`. |
| **Localisation** | Affichage d'une longue suite de quartiers de Casablanca dans un bloc texte dense. | Présenter sous forme de tags pills élégants : `Casablanca (Anfa, Gauthier, Racine, Bouskoura...)` et `Partout au Maroc`. |

---

## 7. PLAN D'ACTION RECOMMANDÉ (ROADMAP PAR PRIORITÉ)

### 🚀 Phase 1 : Correctifs Immédiats (Quick Wins — 30 min)
1. **Harmoniser les chiffres clés sur tout le site** : 
   - Fixer définitivement à **21 ans d'expérience** et **14 corps de métier** sur `references.html` et `index.html`.
2. **Corriger les fautes et coquilles** :
   - Remplacer *"Moin"* par *"Moins"* dans le formulaire de `contact.html`.
   - Remplacer *"turnkey"* par *"clé en main"* dans `services.html`.
   - Corriger la phrase *"En voici trois"* en *"En voici un aperçu"* sur `index.html`.
3. **Corriger les attributs de logos partenaires** sur `references.html` (OCP / Fadaa Saada / Jamaï).

### ⚡ Phase 2 : Optimisations UX & Conversion (1 à 2 jours)
1. **Revoir le formulaire de devis** :
   - Séparer la sélection du bien (Villa, Appartement, Bureau...) de la prestation technique.
2. **Ajouter un texte pré-rempli WhatsApp** sur tous les liens WhatsApp du site pour augmenter le taux d'engagement.
3. **Optimiser le bouton WhatsApp sur mobile** :
   - Masquer le texte sur petits écrans pour éviter les chevauchements visuels.
4. **Ajouter des étoiles de notation (★★★★★)** sur les témoignages de la page Références.

### 🌟 Phase 3 : Enrichissement Fonctionnel & Branding
1. **Intégrer une Lightbox pour la galerie de projets** : Permettre aux clients d'admirer les détails de finition en haute résolution.
2. **Avant / Après interactif** : Ajouter un slider comparatif "Avant / Après" sur la page d'accueil ou réalisations pour apporter une preuve visuelle incontestable du savoir-faire.
3. **Nettoyage des polices Web** : Conserver uniquement Cinzel et Plus Jakarta Sans pour accélérer la vitesse de chargement sur réseau 4G/5G mobile.

