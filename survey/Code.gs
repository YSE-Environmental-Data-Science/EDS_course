/**
 * ENV 730 — Class Skills Map · backend
 * A tiny web app that stores survey responses in a Google Sheet and serves
 * them back to the course-website page. No student sign-in required.
 *
 * SETUP (about 2 minutes)
 *   1. Go to https://script.google.com  →  New project
 *   2. Delete the sample code, paste ALL of this in, click Save
 *   3. Click  Deploy ▸ New deployment  ▸ gear ⚙  ▸ Web app
 *        • Description:      ENV 730 skills map
 *        • Execute as:       Me
 *        • Who has access:   Anyone
 *      Click Deploy, approve the permission prompt, and COPY the Web app URL
 *      (it ends in /exec).
 *   4. Paste that URL into skills_survey.html where it says API_URL.
 *
 * The first submission creates a spreadsheet called
 * "ENV 730 Skills Map — Responses" in your Drive; every response is one row.
 */
var SHEET_NAME = 'responses';
var HEADERS = ['timestamp','name','program','system','dataset','question','why',
               'r','wrangle','viz','stats','ml','spatial','git','domain'];

function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SSID'), ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { id = null; } }
  if (!id) {
    ss = SpreadsheetApp.create('ENV 730 Skills Map — Responses');
    props.setProperty('SSID', ss.getId());
  }
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var sh = getSheet_();
    var row = HEADERS.map(function (h) { return h === 'timestamp' ? new Date() : (d[h] != null ? d[h] : ''); });
    sh.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var sh = getSheet_();
  var values = sh.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < values.length; i++) {
    var o = {};
    for (var j = 0; j < HEADERS.length; j++) o[HEADERS[j]] = values[i][j];
    out.push(o);
  }
  var payload = JSON.stringify({ ok: true, responses: out });
  var cb = e && e.parameter && e.parameter.callback;
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + payload + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);   // JSONP — avoids CORS
  }
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
