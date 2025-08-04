# 🚀 Investia Landing Page - Backend Seguro

Este repositorio contiene la función serverless de Vercel para manejar la integración segura con Brevo.

## 📁 Estructura

```
/
├── api/
│   └── brevo.js          # Función serverless para Brevo
├── vercel.json           # Configuración de Vercel
└── README.md            # Este archivo
```

## 🔧 Configuración

### Variables de Entorno en Vercel

Configura estas variables en el dashboard de Vercel:

```
BREVO_API_KEY = [TU_API_KEY_DE_BREVO]
BREVO_LIST_ID = [ID_DE_TU_LISTA]
```

**Para obtener tu API key de Brevo:**
1. Ve a tu panel de Brevo
2. Navega a Settings > API Keys
3. Copia tu API key

**Para obtener el ID de lista:**
1. Ve a Contacts > Lists en Brevo
2. Encuentra tu lista "Landing1"
3. El ID aparecerá en la URL o detalles

## 🚀 Despliegue

1. Conecta este repositorio a Vercel
2. Vercel detectará automáticamente la configuración
3. El backend estará disponible en: `https://tu-proyecto.vercel.app/api/brevo`

## 📞 Soporte

Para problemas técnicos, revisa los logs en el dashboard de Vercel. 