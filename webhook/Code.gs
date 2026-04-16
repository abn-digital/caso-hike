/**
 * Google Apps Script — Webhook receiver para Caso Hike
 * 
 * CÓMO DEPLOYAR:
 * 1. Ir a https://script.google.com → Nuevo proyecto
 * 2. Pegá este código
 * 3. Click en "Implementar" → "Nueva implementación"
 * 4. Tipo: "Aplicación web"
 *    - Ejecutar como: Yo (tu usuario)
 *    - Quién tiene acceso: Cualquier persona
 * 5. Copiá la URL generada → pegála en WEBHOOK_URL del HTML
 */

const SHEET_ID = '1gOvhVpqeLUqwqcTpLax9RC4nrwEqJHrzEHeVZzbibxc';
const SHEET_NAME = 'Data';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Solo procesar el evento de entrega final
    if (data.event !== 'finished_case') {
      return jsonResponse({ status: 'ignored', event: data.event });
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Formatear fechas legibles (ISO → formato local)
    const startedAt = data.started_at
      ? new Date(data.started_at).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
      : '';
    const finishedAt = data.timestamp
      ? new Date(data.timestamp).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
      : '';

    // Columnas: Nombre | Email | Link de Entrega | Comentarios Adicionales | Fecha Comienzo | Fecha de Entrega
    sheet.appendRow([
      data.name        || '',
      data.email       || '',
      data.delivery_link || '',
      data.comments    || '',
      startedAt,
      finishedAt,
    ]);

    return jsonResponse({ status: 'ok', message: 'Row appended successfully' });

  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

// Permitir también GET para testear desde el browser
function doGet(e) {
  return jsonResponse({ status: 'online', message: 'Caso Hike webhook activo ✓' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
