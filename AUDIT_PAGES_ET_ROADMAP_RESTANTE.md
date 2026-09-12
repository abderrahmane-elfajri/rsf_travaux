# REVUE DÉTAILLÉE DES PAGES & FEUILLE DE ROUTE RESTANTE
**Projet :** RSF Travaux (Cartographie & Besoins Spécifiques des 52 Pages)  
**Date d'évaluation :** Septembre 2026  
**Auditeur :** Spécialiste Front-End, UX & SEO Bâtiment  

---

## 1. Cartographie d'Ensemble des 52 Pages

Le site est structuré en **26 pages en français** et leur équivalent strict en **26 pages en arabe (`/ar/`)** :
- **8 Pages Piliers (x2 langues = 16 pages) :** Accueil, Services, Réalisations, Méthode, Références, Contact, Mentions Légales, 404.
- **18 Pages Métiers / Services Spécifiques (x2 langues = 36 pages) :** Peintures, façades, aménagement, étanchéité, plâtrerie, résine époxy, menuiserie, etc.

---

## 2. Revue Détaillée Page par Page

### A. Pages Piliers

#### 1. Page d'Accueil (`index.html` & `ar/index.html`)
- **État actuel :** Très fort impact visuel. Hero section avec bandeau d'excellence, grille des 18 services directs, bandeau défilant (*marquee*) infini en LTR et RTL, chiffres clés (21 ans, 100+ projets), section méthode et avis clients.
- **Ce qui est solide :** Bilinguisme fluide, liens directs vers chaque service, CTA devis immédiat.
- **Ce qu'il vous reste à faire (Besoins) :**
  - [ ] Remplacer les images d'illustration secondaires par des photos exclusives signées RSF.
  - [ ] Ajouter une courte vidéo de drone ou vidéo accélérée (*timelapse*) de chantier de rénovation dans le Hero pour un effet waouh immédiat.

---

#### 2. Page Répertoire des Services (`services.html` & `ar/services.html`)
- **État actuel :** 18 cartes de services avec filtrage dynamique par catégorie (Façades, Peintures, Aménagement, Travaux Techniques). Titre H1 arabe calibré à la perfection.
- **Améliorations récentes déployées :**
  - [x] **Calibrage de la hauteur des cartes** : Réduite à 440px (et 410px sur laptops) avec padding soigné pour un confort de lecture optimal sans scroll excessif.
  - [x] **Section FAQ Architecturale ajoutée** : 4 questions clés sur les devis, délais, contrat décennal et suivi à distance MRE avec accordéon interactif et balisage Schema.org.
- **Ce qu'il vous reste à faire (Besoins) :**
  - [ ] Remplacer progressivement les photos d'archives par les chantiers récents.

---

#### 3. Page Réalisations / Portfolio (`realisations.html` & `ar/realisations.html`)
- **État actuel :** Galerie de réalisations classées par typologie (Résidentiel haut de gamme, Bureaux & Commerces, Salles de bains de luxe).
- **Amélioration majeure déployée :**
  - [x] **Module Avant / Après Interactif Déployé** : Curseur coulissant interactif permettant de comparer l'état brut de chantier et la livraison clé en main d'exception.
- **Ce qu'il vous reste à faire (Besoins) :**
  - [ ] Préciser pour 3 chantiers emblématiques : le quartier (ex: Californie, Anfa Supérieur, Bouskoura) et la durée d'exécution.

---

#### 4. Page Méthode en 5 Étapes (`methode.html` & `ar/methode.html`)
- **État actuel :** Parcours pédagogique clair : Étude & Devis &rarr; Préparation &rarr; Gros-Œuvre &rarr; Finitions &rarr; Livraison Clé en Main.
- **Ce qui est solide :** Texte rassurant pour les propriétaires exigeants, structure numérotée bien lisible.
- **Ce qu'il vous reste à faire (Besoins) :**
  - [ ] Ajouter un bloc "Nos Engagements Contractuels" : Garantie décennale, respect strict des délais avec pénalités de retard, propreté quotidienne du chantier.

---

#### 5. Page Références & Partenaires (`references.html` & `ar/references.html`)
- **État actuel :** Affichage institutionnel des grandes marques et partenaires (Orange, Inwi, Al Omrane, Douja Promotion, etc.).
- **Ce qui est solide :** Typographie sobre, grille responsive propre, autorité de marque établie.
- **Ce qu'il vous reste à faire (Besoins) :**
  - [ ] Ajouter 2 ou 3 lettres de recommandation ou attestations de bonne fin de travaux scannées ou transcrites avec nom des architectes partenaires.

---

#### 6. Page Contact & Devis (`contact.html` & `ar/contact.html`)
- **État actuel :** Formulaire de demande de devis complet, badge statut en temps réel ("Ouvert aujourd'hui"), boutons d'appel direct et WhatsApp, carte Google Maps avec lien officiel d'avis.
- **Améliorations récentes déployées :**
  - [x] **Champ d'import de plans et photos** : Permet aux clients de joindre leurs fichiers (.pdf, .jpg, .png) dès la prise de contact.
  - [x] **Bannière de confirmation instantanée** : Notification de confirmation immédiate dès la soumission.
- **Statut :** **Prêt à convertir au maximum.**

---

#### 7. Mentions Légales & Page 404 (`mentions-legales.html` & `404.html` + `/ar/`)
- **État actuel :** Modernisées avec un style éditorial luxueux (tableaux corporate épurés, badges SVG, navigation latérale sticky).
- **Statut :** **100% Terminées et Conformes.**

---

### B. Les 18 Pages Spécifiques de Services (x2 = 36 Pages)

| N° | Service | Fichiers (FR / AR) | État du Contenu | Prochaine étape recommandée |
| :---: | :--- | :--- | :---: | :--- |
| **01** | Peinture Pasta Espagnole | `service-peinture-pasta-espagnole.html` | Complet | Ajouter un nuancier visuel de teintes minérales. |
| **02** | Peinture Façades Extérieures | `service-peinture-exterieure.html` | Complet | Ajouter une photo de ravalement récent. |
| **03** | Enduit Effet Travertin | `service-effet-travertin.html` | Complet | Mettre en avant le grain et veinage en gros plan. |
| **04** | Peinture Intérieure de Standing | `service-peinture-interieure.html` | Complet | Intégrer les marques partenaires (Zolpan, Astral, Tollens). |
| **05** | Peintures Décoratives (Stucco, Ambra) | `service-peinture-decorative.html` | Complet | Présenter 4 échantillons de textures (Stucco, Sablé, Khayal). |
| **06** | Moulures & Plinthes PVC | `service-moulures-pvc.html` | Complet | Ajouter un schéma de coupe technique étanche. |
| **07** | Aménagement Intérieur Complet | `service-amenagement-interieur.html` | Complet | Ajouter un aperçu de plan 2D / rendu 3D. |
| **08** | Aménagement Extérieur & Piscines | `service-amenagement-exterieur.html` | Complet | Ajouter des photos de terrasses bois/composite et pergolas. |
| **09** | Rénovation Complète Clé en Main | `service-renovation-complete.html` | Complet | Insérer un devis type anonymisé pour rassurer. |
| **10** | Rénovation Cuisine Sur-Mesure | `service-amenagement-cuisine.html` | Complet | Ajouter des photos de plans de travail en Quartz / Granit. |
| **11** | Sols en Résine Époxy | `service-sols-resine-epoxy.html` | Complet | Mettre en avant la résistance mécanique pour parkings/villas. |
| **12** | Revêtements Sols & Murs (Marbre) | `service-revetements-sols-murs.html` | Complet | Valoriser le marbre local (Thala, Volubilis, Crema Marfil). |
| **13** | Vitrage Accordéon Coulissant | `service-vitrage-accordeon.html` | Complet | Ajouter une courte vidéo ou GIF de manipulation du vitrage. |
| **14** | Bardage & Habillage Façades | `service-bardage-habillage-facade.html` | Complet | Ajouter les finitions Alucobond, bois composite et tasseaux. |
| **15** | Plâtrerie & Faux-Plafonds BA13 | `service-platrerie-faux-plafonds.html` | Complet | Mettre en valeur l'éclairage indirect et gorges lumineuses LED. |
| **16** | Étanchéité Toitures & Terrasses | `service-etancheite.html` | Complet | Insérer le protocole de test de mise en eau de 48h (Sika). |
| **17** | Travaux de Finitions Précises | `service-travaux-finition.html` | Complet | Axer sur la remise des clés sans réserve. |
| **18** | Travaux Divers & Maintenance | `service-travaux-divers-maintenance.html` | Complet | Préciser les délais d'intervention d'urgence à Casablanca. |

---

## 3. Ce Qu'il Vous Reste à Fournir (Exclusivement du Côté Client)

Toute la structure technique, le design, le code et le SEO sont désormais en place. Voici les seuls éléments humains/médias que vous devez collecter pour finaliser votre présence :
1. **Vos photos de chantiers réels** : Remplacez les quelques photos de stock restantes par vos propres réalisations à Casablanca.
2. **Vos premiers avis Google Maps** : Partagez le lien direct avec vos 5 derniers clients pour recueillir leurs 5 étoiles.
3. **Lancement publicitaire** : Démarrez vos campagnes ciblées en toute sérénité.
