/**
 * UniTwin - Prototype (Google Apps Script)
 * Cara pakai: Extensions > Apps Script, tempel file ini sebagai Code.gs,
 * buat file HTML bernama "Index" (isi dari Index.html), lalu Deploy > New deployment > Web app.
 * Prototipe berjalan penuh di browser dengan data simulasi (tanpa Google Sheet),
 * jadi dapat juga dibuka langsung dengan mengklik Index.html.
 *
 * Untuk data nyata: ganti fungsi st(r) di Index.html dengan data dari gateway UniTwin
 * (CCTV analitik, kontroler AC, TV/proyektor, SIAKAD), mis. lewat fungsi doPost di bawah.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('UniTwin - Kampus UPNVJ')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Contoh endpoint penerima data dari gateway: POST JSON {room_id, people, ac, tv, cctv, key}. */
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const key = PropertiesService.getScriptProperties().getProperty('API_KEY');
  if (key && d.key !== key) return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  const props = PropertiesService.getScriptProperties();
  props.setProperty('last_' + d.room_id, JSON.stringify(d));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
