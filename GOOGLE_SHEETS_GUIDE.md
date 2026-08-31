# 📊 Guide d'Intégration Google Sheets pour RSF Travaux

Ce guide vous explique comment connecter votre formulaire de contact (`contact.html`) à une feuille **Google Sheets** afin de recevoir toutes les demandes de devis et coordonnées clients automatiquement en temps réel.

---

## ⚡ Étape 1 : Créer votre Google Sheets

1. Rendez-vous sur [Google Drive](https://drive.google.com/) ou [Google Sheets](https://sheets.new).
2. Créez un nouveau tableau et nommez-le par exemple : **`RSF Travaux - Demandes de Devis`**.

---

## 💻 Étape 2 : Ajouter le Script Apps Script

1. Dans le menu de votre Google Sheet, cliquez sur **Extensions** > **Apps Script**.
2. Une nouvelle fenêtre s'ouvre avec un éditeur de code.
3. Effacez le code existant dans la fenêtre (`function myFunction() { ... }`).
4. Ouvrez le fichier [`google-apps-script.js`](file:///c:/Users/pc/Desktop/project/google-apps-script.js) de votre projet, **copiez tout son contenu** et collez-le dans l'éditeur Apps Script.
5. Cliquez sur l'icône **Enregistrer** 💾 (ou `Ctrl + S`).

---

## 🚀 Étape 3 : Déployer comme Application Web

1. En haut à droite de l'éditeur Apps Script, cliquez sur le bouton bleu **Déployer** > **Nouveau déploiement**.
2. Cliquez sur l'icône de roue dentée ⚙️ à côté de *« Sélectionner le type »* et choisissez **Application Web**.
3. Remplissez les champs comme suit :
   - **Description** : `RSF Travaux Form Webhook`
   - **Exécuter en tant que** : `Moi (votre adresse email)`
   - **Qui a accès** : ⚠️ **`Tout le monde`** *(Très important pour que le site puisse envoyer les données sans blocage)*
4. Cliquez sur **Déployer**.
5. Google va vous demander d'autoriser les accès (*« Autoriser l'accès »* -> Choisissez votre compte -> *« Paramètres avancés »* -> *« Accéder à RSF Travaux Form Webhook (non sécurisé) »* -> *« Autoriser »*).
6. Une fois validé, Google vous affiche l'**URL de l'application Web** sous la forme :
   `https://script.google.com/macros/s/AKfycbx.../exec`
7. **Copiez cette URL**.

---

## 🔗 Étape 4 : Coller l'URL dans `contact.html`

1. Ouvrez [`contact.html`](file:///c:/Users/pc/Desktop/project/contact.html).
2. Vers la ligne 230, repérez la variable :
   ```javascript
   const GOOGLE_SHEET_WEBHOOK_URL = "VOTRE_URL_GOOGLE_APPS_SCRIPT_ICI";
   ```
3. Remplacez `"VOTRE_URL_GOOGLE_APPS_SCRIPT_ICI"` par l'URL que vous avez copiée à l'étape 3.
4. Enregistrez le fichier (`Ctrl + S`).

---

## ✅ Résultat automatique

Dès qu'un client soumet le formulaire sur votre site :
1. Une nouvelle ligne est ajoutée dans votre Google Sheet avec :
   - **Date & Heure**
   - **Nom complet**
   - **Téléphone**
   - **Email**
   - **Ville**
   - **Prestation souhaitée**
   - **Surface (m²)**
   - **Budget**
   - **Délai de démarrage**
   - **Détails du projet**
2. Un email d'alerte instantané est envoyé à **`rsftravaux@gmail.com`**.
3. Le client voit un message de confirmation luxueux avec un bouton pour continuer sur WhatsApp s'il le souhaite.
