# Caso Hike — Data, Automation & Reporting

Caso práctico de evaluación técnica para perfiles de Data, Automation y Reporting.

## 🌐 Landing page

**Producción:** https://caso-hike-gvxb4rjzvq-uc.a.run.app

## 📁 Estructura

```
caso-hike/
├── caso-practico.html      # Landing page principal
├── dashboard.html          # Dashboard de referencia
├── data/
│   ├── caso-hike-data.zip  # ZIP descargable (4 CSVs)
│   ├── google_ads.csv
│   ├── meta_ads.csv
│   ├── ventas.csv
│   └── stock.csv
├── webhook/
│   └── Code.gs             # Apps Script para Google Sheets
├── Dockerfile              # Para Cloud Run (nginx)
└── README.md
```

## ⚙️ Configuración del webhook (Google Sheets)

Para conectar el formulario con Google Sheets:

1. Ir a [script.google.com](https://script.google.com) → **Nuevo proyecto**
2. Pegar el contenido de `webhook/Code.gs`
3. Click en **Implementar** → **Nueva implementación**
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier persona**
4. Copiar la URL generada
5. En `caso-practico.html`, actualizar:
   ```js
   WEBHOOK_URL: 'https://script.google.com/macros/s/TU_ID/exec',
   ```
6. Hacer push y redeploy en Cloud Run

## 🚀 Deploy en Cloud Run

```bash
# Redeploy manual
gcloud run deploy caso-hike \
  --source . \
  --project hike-agentic-playground \
  --region us-central1 \
  --allow-unauthenticated
```

## 📊 Google Sheets de entregas

[Ver planilla](https://docs.google.com/spreadsheets/d/1gOvhVpqeLUqwqcTpLax9RC4nrwEqJHrzEHeVZzbibxc/edit)

Columnas: Nombre | Email | Link de Entrega | Comentarios | Fecha Comienzo | Fecha de Entrega
