# 📧 Configuración de Envío de Correos Gratuitos

Tu sistema de envío de correos ya está configurado con **Resend**, un servicio gratuito que te permite enviar hasta **100 correos por día** sin costo.

## 🚀 Pasos para Activar el Envío de Correos

### 1. Crear cuenta en Resend (GRATIS)

1. Ve a [https://resend.com](https://resend.com)
2. Haz clic en "Sign up" y crea tu cuenta
3. Verifica tu email
4. Ve a la sección "API Keys" en el dashboard
5. Crea una nueva API Key y cópiala

### 2. Configurar Variables de Entorno

#### Para desarrollo local:
Crea un archivo `.env.local` en la raíz de tu proyecto:

```bash
RESEND_API_KEY=re_tu_api_key_aqui
```

#### Para producción en Vercel:
1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Ve a Settings → Environment Variables
3. Agrega la variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: tu API key de Resend
   - **Environment**: Production, Preview, Development

### 3. Configurar tu Email de Destino

En el archivo `app/api/contact/route.js`, línea 17, cambia:
```javascript
to: ['jaszciel@gmail.com'], // Cambia por tu email
```

### 4. ¡Listo! 🎉

Tu formulario de contacto ahora enviará correos reales. Los usuarios recibirán:
- ✅ Confirmación visual en la página
- ✅ Tu recibirás un correo con todos los detalles del cliente

## 📊 Plan Gratuito de Resend

- **100 correos/día** completamente gratis
- **3,000 correos/mes** gratis
- Sin necesidad de tarjeta de crédito
- Perfecto para landing pages

## 🔧 Personalización del Email

El template del correo está en `app/api/contact/route.js` líneas 19-112. Puedes personalizar:
- Colores y estilos
- Logo de tu empresa
- Texto del mensaje
- Estructura del contenido

## 🚨 Evitar que los Correos Vayan a Spam

### ✅ Mejoras Automáticas Ya Aplicadas:
- ✅ Asunto más específico y profesional
- ✅ Nombre del remitente personalizado
- ✅ Campo `replyTo` configurado
- ✅ Contenido HTML bien estructurado

### 📧 Configuraciones Adicionales Recomendadas:

#### 1. Marcar como "No es Spam" (Inmediato)
- Busca el correo en tu carpeta de spam
- Márcalo como "No es spam" o "No es correo no deseado"
- Agrega `onboarding@resend.dev` a tus contactos

#### 2. Crear Filtro en Gmail (Recomendado)
1. Ve a Gmail → Configuración → Filtros y direcciones bloqueadas
2. Crear filtro nuevo:
   - **De**: `onboarding@resend.dev`
   - **Asunto**: `Nueva Solicitud de Crédito`
3. Acción: "Nunca enviar a spam" + "Aplicar etiqueta: Leads"

#### 3. Usar tu Propio Dominio (Mejor Solución)
Si tienes dominio propio (ej: `tuempresa.com`):
1. En Resend → Settings → Domains
2. Agregar tu dominio
3. Configurar registros DNS
4. Cambiar `from:` a `contacto@tudominio.com`

### 🔧 Configuración Avanzada Anti-Spam

#### Opción A: Dominio Propio (Más Profesional)
```javascript
from: 'Asesoría Crediticia <contacto@tudominio.com>'
```

#### Opción B: Mejorar Email Actual
```javascript
from: 'Sistema de Leads <onboarding@resend.dev>'
```

## 🚨 Solución de Problemas

Si no recibes correos:
1. **Revisa spam primero** - 90% van ahí inicialmente
2. Verifica que la API key esté correcta en Vercel
3. Revisa los logs en Vercel → Functions → Ver logs
4. Marca como "No es spam" y crea filtro
5. Considera usar tu propio dominio

## 📱 Próximos Pasos

Para mejorar aún más tu sistema:
1. **Autorespuesta**: Enviar confirmación automática al cliente
2. **Base de datos**: Guardar leads en una BD
3. **Analytics**: Trackear conversiones
4. **WhatsApp**: Integrar notificaciones por WhatsApp

---

¿Necesitas ayuda con algún paso? ¡Pregúntame!
