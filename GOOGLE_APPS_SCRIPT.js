/**
 * ============================================================================
 * RSF TRAVAUX — GOOGLE APPS SCRIPT (VERSION 2026 CORRIGÉE & ROBUSTE)
 * ============================================================================
 * 
 * CORRECTIONS APPORTÉES :
 * 1. Utilisation de getSheets()[0] au lieu de getActiveSheet() (évite le bug
 *    du classeur sans onglet actif lors de l'exécution en tâche de fond).
 * 2. Ajout obligatoire de SpreadsheetApp.flush() pour forcer l'écriture immédiate
 *    des lignes dans Google Sheets avant la fin de la requête.
 * 3. Gestion du zéro initial marocain sur les téléphones ('06...).
 * 4. Fonction de test en 1 clic : "testSheetConnection()" pour vérifier
 *    et autoriser les accès Google Sheets d'un simple clic.
 * 5. Si une erreur survient sur le Sheet, elle est affichée en rouge dans l'email
 *    pour ne plus jamais être avalée silencieusement.
 */

// Adresse email recevant les notifications de devis
var RECIPIENT_EMAIL = "rsftravaux@gmail.com";

// ID de votre Google Sheet (vérifié)
var SPREADSHEET_ID = "1NZQveWZgXfCaLyVIP1qkIHyh8Ggqwi-AMdu1pRBPoKg";


/**
 * ============================================================================
 * FONCTION DE TEST RAPIDE (À tester directement dans l'éditeur Google Apps Script)
 * ============================================================================
 * Instructions : 
 * Dans l'éditeur Apps Script, choisissez "testSheetConnection" dans la liste
 * déroulante en haut, puis cliquez sur "Exécuter".
 * Si Google vous demande les autorisations, acceptez-les ("Autoriser").
 * Une ligne de test s'écrira immédiatement dans votre Google Sheet !
 */
function testSheetConnection() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  if (sheet.getLastRow() === 0) {
    createHeaders(sheet);
  }
  
  var testRow = [
    Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm"),
    "TEST CONNEXION REUSSIE",
    "'0664329698",
    "rsftravaux@gmail.com",
    "Casablanca",
    "Villa / Duplex",
    "Rénovation complète clé en main",
    "350 m²",
    "Plus de 500 000 MAD",
    "Dès que possible",
    "Test de bon fonctionnement de l'écriture Google Sheets.",
    "Test OK"
  ];
  
  sheet.appendRow(testRow);
  SpreadsheetApp.flush();
  
  Logger.log("✅ SUCCÈS : La ligne de test a bien été enregistrée dans la feuille : " + sheet.getName());
}


/**
 * Récupère le classeur Google Sheet (par ID ou par classeur actif)
 */
function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e1) {
    // Si le script est lié directement au classeur (Extensions > Apps Script)
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
    throw new Error("Impossible d'accéder au classeur. Vérifiez l'ID : " + SPREADSHEET_ID + ". Détail : " + e1.toString());
  }
}


/**
 * Crée l'en-tête de colonnes si la feuille est vide
 */
function createHeaders(sheet) {
  var headers = [
    "Date & Heure",
    "Nom du prospect",
    "Téléphone",
    "Email",
    "Ville",
    "Type de bien",
    "Prestation principale",
    "Surface",
    "Budget estimé",
    "Délai souhaité",
    "Détails du projet",
    "Statut"
  ];
  sheet.appendRow(headers);
  try {
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#0b132b")
      .setFontColor("#ffffff");
  } catch (e) {}
}


/**
 * Test GET pour vérifier que le Web App répond
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "success",
      message: "RSF Travaux Apps Script API est active et opérationnelle."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * ============================================================================
 * TRAITEMENT PRINCIPAL DU FORMULAIRE (POST)
 * ============================================================================
 */
function doPost(e) {
  var sheetErrorNotice = "";

  try {
    // 1. EXTRACTION DES DONNÉES DU FORMULAIRE
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var name         = data.name          || "Non renseigné";
    var phone        = data.phone         || "Non renseigné";
    var email        = data.email         || "Non renseigné";
    var city         = data.city          || "Non renseignée";
    var propertyType = data.property_type || "Non précisé";
    var service      = data.service       || data.type || "Non précisé";
    var surface      = data.surface       ? data.surface + " m²" : "Non renseignée";
    var budget       = data.budget        || "Non renseigné";
    var delay        = data.delay         || "Non renseigné";
    var details      = data.details       || "Aucun détail fourni";

    var timestamp    = new Date();
    var dateFormatted = Utilities.formatDate(timestamp, "GMT+1", "dd/MM/yyyy HH:mm");

    // 2. ENREGISTREMENT DANS GOOGLE SHEETS
    try {
      var ss = getSpreadsheet();
      var sheet = ss.getSheets()[0]; // TOUJOURS utiliser le premier onglet

      // Créer les en-têtes si la feuille est vierge
      if (sheet.getLastRow() === 0) {
        createHeaders(sheet);
      }

      // Formatage du téléphone avec apostrophe pour garder le 0 initial
      var phoneCell = phone;
      if (phoneCell && phoneCell.toString().startsWith("0")) {
        phoneCell = "'" + phoneCell;
      }

      sheet.appendRow([
        dateFormatted,
        name,
        phoneCell,
        email,
        city,
        propertyType,
        service,
        surface,
        budget,
        delay,
        details,
        "Nouveau"
      ]);

      // CRITIQUE : Forcer la validation immédiate de l'écriture sur Google Drive
      SpreadsheetApp.flush();

    } catch (sheetErr) {
      sheetErrorNotice = sheetErr.toString();
      Logger.log("⚠️ ERREUR GOOGLE SHEET : " + sheetErrorNotice);
    }

    // 3. FORMATAGE DU NUMÉRO WHATSAPP DU PROSPECT
    var rawDigits = phone.replace(/[^0-9]/g, "");
    var waNumber = "";

    if (rawDigits.startsWith("0")) {
      waNumber = "212" + rawDigits.substring(1);
    } else if (rawDigits.startsWith("212")) {
      waNumber = rawDigits;
    } else if (rawDigits.length >= 9) {
      waNumber = rawDigits;
    } else {
      waNumber = "212664329698";
    }

    var waMessage = encodeURIComponent(
      "Bonjour " + name + ", nous faisons suite à votre demande de devis sur le site RSF Travaux pour votre projet (" + propertyType + " - " + service + ")."
    );
    var waClientUrl = "https://wa.me/" + waNumber + "?text=" + waMessage;
    var telUrl = "tel:" + phone.replace(/[^0-9+]/g, "");
    var mailtoUrl = "mailto:" + email + "?subject=" + encodeURIComponent("RSF Travaux — Votre demande de devis : " + service);

    // 4. CONSTRUCTION DE L'EMAIL HTML
    var subject = "🚨 NOUVEAU PROSPECT : " + name + " (" + city + ") — " + propertyType + " · " + service;

    var alertHtml = "";
    if (sheetErrorNotice) {
      alertHtml = `
        <div style="background: #fef2f2; border: 2px solid #ef4444; color: #991b1b; padding: 14px; border-radius: 8px; margin-bottom: 20px; font-size: 13px;">
          <strong>⚠️ Alerte Google Sheet :</strong> L'écriture dans le classeur a échoué avec l'erreur :<br>
          <code>${sheetErrorNotice}</code><br>
          <em>Astuce : Ouvrez l'éditeur Apps Script et exécutez la fonction <strong>testSheetConnection</strong> pour ré-autoriser l'accès.</em>
        </div>
      `;
    }

    var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 24px; color: #1e293b; }
        .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: #0b132b; padding: 28px 32px; text-align: left; border-bottom: 3px solid #c59b27; }
        .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: 0.02em; }
        .header p { margin: 6px 0 0; color: #c59b27; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; }
        .content { padding: 32px; }
        .badge { display: inline-block; background: #f1f5f9; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #334155; margin-right: 6px; margin-bottom: 8px; }
        .badge-gold { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
        .card { background: #fafafa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
        .table-info { width: 100%; border-collapse: collapse; }
        .table-info td { padding: 10px 8px; border-bottom: 1px solid #f0f0f0; font-size: 14px; vertical-align: top; }
        .table-info tr:last-child td { border-bottom: none; }
        .td-label { width: 38%; color: #64748b; font-weight: 500; }
        .td-value { width: 62%; color: #0f172a; font-weight: 600; }
        .details-box { background: #ffffff; border-left: 4px solid #c59b27; padding: 14px 16px; margin-top: 16px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.6; color: #334155; }
        .actions { margin-top: 32px; text-align: center; }
        .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 6px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); }
        .btn-call { display: inline-block; background: #0b132b; color: #ffffff !important; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 6px; }
        .btn-mail { display: inline-block; background: #f1f5f9; color: #1e293b !important; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 6px; border: 1px solid #cbd5e1; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nouvelle Demande de Devis · RSF Travaux</h1>
          <p>Reçu le ${dateFormatted} via le site web</p>
        </div>
        
        <div class="content">
          ${alertHtml}

          <div style="margin-bottom: 20px;">
            <span class="badge badge-gold">📍 ${city}</span>
            <span class="badge">🏡 ${propertyType}</span>
            <span class="badge">💰 ${budget}</span>
          </div>

          <div class="card">
            <h3 style="margin-top: 0; margin-bottom: 14px; font-size: 16px; color: #0b132b; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
              👤 Coordonnées du Client
            </h3>
            <table class="table-info">
              <tr>
                <td class="td-label">Nom complet :</td>
                <td class="td-value" style="font-size: 16px; color: #0b132b;">${name}</td>
              </tr>
              <tr>
                <td class="td-label">Téléphone :</td>
                <td class="td-value"><a href="${telUrl}" style="color: #0284c7; text-decoration: none; font-weight: 700;">${phone}</a></td>
              </tr>
              <tr>
                <td class="td-label">Email :</td>
                <td class="td-value"><a href="${mailtoUrl}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td class="td-label">Ville :</td>
                <td class="td-value">${city}</td>
              </tr>
            </table>
          </div>

          <div class="card">
            <h3 style="margin-top: 0; margin-bottom: 14px; font-size: 16px; color: #0b132b; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
              📋 Caractéristiques du Projet
            </h3>
            <table class="table-info">
              <tr>
                <td class="td-label">Type de bien :</td>
                <td class="td-value" style="color: #c59b27;">${propertyType}</td>
              </tr>
              <tr>
                <td class="td-label">Prestation souhaitée :</td>
                <td class="td-value">${service}</td>
              </tr>
              <tr>
                <td class="td-label">Surface approximative :</td>
                <td class="td-value">${surface}</td>
              </tr>
              <tr>
                <td class="td-label">Budget prévisionnel :</td>
                <td class="td-value">${budget}</td>
              </tr>
              <tr>
                <td class="td-label">Délai souhaité :</td>
                <td class="td-value">${delay}</td>
              </tr>
            </table>

            <div style="margin-top: 16px;">
              <strong style="font-size: 13px; color: #475569; text-transform: uppercase;">Message du client :</strong>
              <div class="details-box">
                ${details ? details.replace(/\n/g, "<br>") : "<em>Aucun message particulier précisé.</em>"}
              </div>
            </div>
          </div>

          <!-- ACTIONS RAPIDES -->
          <div class="actions">
            <div style="font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.05em;">
              Actions rapides en 1 clic :
            </div>
            <a href="${waClientUrl}" target="_blank" class="btn-wa">
              💬 Répondre via WhatsApp
            </a>
            <a href="${telUrl}" class="btn-call">
              📞 Appeler ${phone}
            </a>
            <a href="${mailtoUrl}" class="btn-mail">
              ✉️ Email
            </a>
          </div>
        </div>

        <div class="footer">
          RSF TRAVAUX S.A.R.L. AU · 21 ans d'expérience · Casablanca et tout le Maroc<br>
          Google Sheet ID : ${SPREADSHEET_ID}
        </div>
      </div>
    </body>
    </html>
    `;

    // 5. ENVOI DU MAIL
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Demande enregistrée et transmise avec succès."
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (globalErr) {
    Logger.log("Erreur critique : " + globalErr.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: globalErr.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
