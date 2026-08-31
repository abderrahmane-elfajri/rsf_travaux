/**
 * =========================================================================
 * RSF TRAVAUX — Script Google Sheets pour Formulaire de Contact & Devis
 * =========================================================================
 * 
 * INSTRUCTIONS D'INSTALLATION (2 MINUTES) :
 * 1. Ouvrez un nouveau Google Sheets sur Google Drive (ex: "RSF Travaux - Devis").
 * 2. Dans le menu du haut, cliquez sur : Extensions > Apps Script.
 * 3. Supprimez tout le code existant dans l'éditeur et collez l'intégralité de ce script.
 * 4. Cliquez sur "Enregistrer" (icône disquette).
 * 5. Cliquez sur le bouton bleu "Déployer" (en haut à droite) > "Nouveau déploiement".
 * 6. Cliquez sur l'engrenage à côté de "Sélectionner le type" > choisissez "Application Web".
 * 7. Configurez comme suit :
 *    - Description : "RSF Travaux Form Webhook"
 *    - Exécuter en tant que : "Moi" (votre compte Google)
 *    - Qui a accès : "Tout le monde" (Important pour autoriser l'envoi depuis le site)
 * 8. Cliquez sur "Déployer" et autorisez les accès.
 * 9. Copiez l'URL de l'application Web fournie (ex: https://script.google.com/macros/s/.../exec).
 * 10. Collez cette URL dans votre fichier contact.html à la ligne :
 *     const GOOGLE_SCRIPT_URL = "VOTRE_URL_ICI";
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Initialiser les en-têtes si la feuille est vide
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Date & Heure",
        "Nom complet",
        "Téléphone",
        "Email",
        "Ville",
        "Prestation / Type de bien",
        "Surface (m²)",
        "Budget prévisionnel",
        "Délai souhaité",
        "Description du projet",
        "Statut"
      ];
      
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setValues([headers]);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#111e38");
      headerRange.setFontColor("#c59b27");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var timestamp = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var city = data.city || "Casablanca";
    var type = data.type || "";
    var surface = data.surface ? data.surface + " m²" : "";
    var budget = data.budget || "";
    var delay = data.delay || "";
    var details = data.details || "";
    var status = "Nouveau";

    var newRow = [
      timestamp,
      name,
      phone,
      email,
      city,
      type,
      surface,
      budget,
      delay,
      details,
      status
    ];

    sheet.appendRow(newRow);

    // Formater la nouvelle ligne
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, newRow.length).setVerticalAlignment("middle");
    sheet.autoResizeColumns(1, newRow.length);

    // Optionnel : Envoyer un e-mail de notification automatique au responsable
    try {
      var notifyEmail = "rsftravaux@gmail.com";
      var subject = "🚨 Nouveau Devis RSF Travaux : " + name + " (" + city + ")";
      var body = "Bonjour,\n\nUn nouveau devis vient d'être soumis sur le site RSF Travaux :\n\n" +
                 "• Nom : " + name + "\n" +
                 "• Téléphone : " + phone + "\n" +
                 "• Email : " + email + "\n" +
                 "• Ville : " + city + "\n" +
                 "• Prestation : " + type + "\n" +
                 "• Surface : " + surface + "\n" +
                 "• Budget : " + budget + "\n" +
                 "• Délai : " + delay + "\n" +
                 "• Détails : " + details + "\n\n" +
                 "Accéder au tableau Google Sheets pour traiter la demande.";
      
      MailApp.sendEmail(notifyEmail, subject, body);
    } catch (mailErr) {
      Logger.log("Notification email error: " + mailErr.toString());
    }

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "message": "RSF Travaux Webhook is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}
