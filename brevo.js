// Vercel Serverless Function para Brevo
// Ubicación: /api/brevo.js

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Configuración de Brevo
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID || 3;
  const BREVO_API_BASE_URL = 'https://api.brevo.com/v3';

  // Validar API key
  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: 'API key no configurada' });
  }

  try {
    if (req.method === 'POST') {
      // Crear/actualizar contacto
      const { email, attributes } = req.body;

      if (!email || !attributes) {
        return res.status(400).json({ error: 'Email y atributos son requeridos' });
      }

      const payload = {
        email,
        attributes,
        listIds: [parseInt(BREVO_LIST_ID)],
        updateEnabled: true
      };

      const response = await fetch(`${BREVO_API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({
          error: errorData.message || 'Error al agregar contacto'
        });
      }

      const result = await response.json();
      return res.json({ success: true, data: result });

    } else if (req.method === 'PUT') {
      // Actualizar contacto existente
      const { email } = req.query;
      const { attributes } = req.body;

      if (!email || !attributes) {
        return res.status(400).json({ error: 'Email y atributos son requeridos' });
      }

      const payload = { attributes };

      const response = await fetch(`${BREVO_API_BASE_URL}/contacts/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({
          error: errorData.message || 'Error al actualizar contacto'
        });
      }

      const result = await response.json();
      return res.json({ success: true, data: result });

    } else {
      return res.status(405).json({ error: 'Método no permitido' });
    }

  } catch (error) {
    console.error('Error en función Brevo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
} 