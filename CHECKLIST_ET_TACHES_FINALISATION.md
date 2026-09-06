# 📋 CHECKLIST & FEUILLE DE ROUTE : CE QUI EST REQUIS DE VOTRE PART

Ce document liste de manière claire, ordonnée et priorisée toutes les actions, informations et validations attendues de votre part pour finaliser à 100% le projet web **RSF Travaux**.

---

## 🔴 PRIORITÉ 1 : ACTIONS IMMÉDIATES (5 à 10 minutes)

### [ ] 1.1. Valider la propriété dans Google Search Console
* **Contexte** : Votre balise meta `google-site-verification=osoluFy4d1WoSw2Mt90fwU1ExjV6hnpcL7J0nUP_MLU` a été intégrée sur l'ensemble de vos 8 pages web et déployée en ligne.
* **Ce que vous devez faire** :
  1. Rendez-vous sur votre compte **[Google Search Console](https://search.google.com/search-console)**.
  2. Choisissez la méthode de vérification par **Balise HTML**.
  3. Cliquez sur le bouton **« Valider »**.
  4. Dès que la propriété est confirmée, allez dans l'onglet **Sitemaps** à gauche et soumettez l'adresse :
     `https://rsftravaux.ma/sitemap.xml`

### [ ] 1.2. Tester le formulaire de contact sur votre navigateur
* **Contexte** : L'endpoint Google Apps Script a été réparé, testé avec succès (code 200) et relié au système de tracking.
* **Ce que vous devez faire** :
  1. Ouvrez `contact.html` dans votre navigateur et forcez le rechargement du cache (**`Ctrl + F5`**).
  2. Remplissez un test avec vos vraies coordonnées (*Nom, Téléphone WhatsApp, Email, Prestation*).
  3. Cliquez sur *"Envoyer ma demande"*.
  4. Vérifiez la réception de l'email de notification et l'ajout de la ligne dans votre tableau Google Sheets.

---

## 🟡 PRIORITÉ 2 : VALIDATION DU DÉPLOIEMENT DES 18 PAGES SERVICES

Le cahier des charges complet et l'architecture UI/UX par cartes de types + grand CTA final sont prêts dans [CAHIER_DES_CHARGES_PAGES_SERVICES_ET_ROADMAP.md](file:///c:/Users/pc/Desktop/project/CAHIER_DES_CHARGES_PAGES_SERVICES_ET_ROADMAP.md).

### [ ] 2.1. Donner le feu vert pour générer les pages par vagues :
Nous allons créer chaque page dédiée selon le gabarit validé (Titre H1, Hero HD, Grille de Cartes des Finitions/Types, 4 étapes, Avantages, FAQ et Grand CTA triple action) :

* **[ ] Vague 1 (Piliers Stratégiques Immédiats — Plus Forte Demande)** :
  1. `service-peinture-pasta-espagnole.html` (Pasta Espagnole)
  2. `service-vitrage-accordeon.html` (Vitrage accordéon & Menuiserie aluminium)
  3. `service-amenagement-cuisine.html` (Aménagement cuisine sur mesure)
  4. `service-renovation-complete.html` (Rénovation complète clé en main)
  5. `service-etancheite.html` (Étanchéité toitures & terrasses)

* **[ ] Vague 2 (Revêtements & Décoration de Prestige)** :
  6. `service-effet-travertin.html` (Enduit décoratif effet travertin)
  7. `service-peinture-decorative.html` (Peintures décoratives intérieures)
  8. `service-revetements-sols-murs.html` (Marbre, carrelage XXL & parquet)
  9. `service-platrerie-faux-plafonds.html` (BA13 & dalles Armstrong)
  10. `service-bardage-habillage-facade.html` (Bardage bois composite & Alucobond)

* **[ ] Vague 3 (Techniques Spécifiques & Finitions)** :
  11. `service-peinture-interieure.html` (Peinture intérieure haute précision)
  12. `service-peinture-exterieure.html` (Façades extérieures)
  13. `service-sols-resine-epoxy.html` (Sols époxy & polyuréthane)
  14. `service-moulures-pvc.html` (Moulures PVC fenêtres)

* **[ ] Vague 4 (Aménagement Global & Maintenance)** :
  15. `service-amenagement-interieur.html` (Aménagement intérieur)
  16. `service-amenagement-exterieur.html` (Aménagement extérieur)
  17. `service-travaux-finition.html` (Travaux de finition)
  18. `service-travaux-divers-maintenance.html` (Maintenance & réparations)

---

## 🟢 PRIORITÉ 3 : IDENTIFIANTS & CONFIGURATIONS OPTIONNELLES

Pour enrichir davantage votre écosystème commercial, vous pouvez fournir (quand vous le souhaitez) :

### [ ] 3.1. Identifiant Google Analytics 4 (GA4) / Google Tag Manager
* **Ce dont nous avons besoin** : Votre code de mesure Google Analytics 4 (format `G-XXXXXXXXXX`) ou votre conteneur Google Tag Manager (format `GTM-XXXXXXX`).
* **Résultat** : Connexion directe de votre tableau de bord GA4 avec le script [analytics.js](file:///c:/Users/pc/Desktop/project/analytics.js) déjà déployé.

### [ ] 3.2. Identifiants Légaux Entreprise pour les Mentions Légales
* **Ce dont nous avons besoin** : Si vous souhaitez afficher vos immatriculations officielles sur la page [mentions-legales.html](file:///c:/Users/pc/Desktop/project/mentions-legales.html) :
  - Numéro de **R.C.** (Registre du Commerce de Casablanca)
  - Numéro d'**I.C.E.** (Identifiant Commun de l'Entreprise)
  - Numéro d'**I.F.** (Identifiant Fiscal)
  - Numéro de **Patente**
* *Note : Si vous ne souhaitez pas les afficher publiquement, la page est déjà 100% conforme et protège votre activité.*

### [ ] 3.3. Photos Réelles de vos Réalisations Récentes (Optionnel)
* **Ce dont nous avons besoin** : Si vous possédez des photos haute résolution de chantiers récents réalisés à Casablanca, Rabat ou Marrakech (cuisines, façades, villas, vitrages accordéon).
* **Action de notre part** : Nous les compresserons en WebP haute définition et les placerons directement dans les cartes de finitions de vos pages de services.

### [x] 3.4. Fiche Google Business Profile & Avis Clients (Intégré ✅)
* **Lien officiel configuré** : `https://g.page/r/CdTegbQHAXpcEAI/review`
* **Emplacements actifs** : Intégré dans le bloc carte/contact de `contact.html`, sous les témoignages de `references.html` et dans le balisage Schema.org (`hasMap` & `sameAs`) de `index.html`.

---

## 📊 RÉSUMÉ DES TÂCHES PAR RÔLE

| Rôle | Tâche | Statut |
| :--- | :--- | :---: |
| **Vous (Client)** | Cliquer sur "Valider" dans Google Search Console | ⏳ À faire |
| **Vous (Client)** | Soumettre le sitemap `https://rsftravaux.ma/sitemap.xml` dans GSC | ⏳ À faire |
| **Vous (Client)** | Tester la soumission du formulaire de devis sur `contact.html` | ⏳ À faire |
| **Vous (Client)** | Confirmer le lancement de la création des 18 pages de services | ⏳ En attente de votre accord |
| **Antigravity (Agent)** | Créer les 18 pages HTML dédiées avec le système de cartes et CTA | 🚀 Prêt à exécuter |
| **Antigravity (Agent)** | Relier les 18 pages au hub `services.html` et au menu de navigation | 🚀 Prêt à exécuter |
| **Antigravity (Agent)** | Inscrire les 18 nouvelles URLs dans `sitemap.xml` pour Google | 🚀 Prêt à exécuter |

