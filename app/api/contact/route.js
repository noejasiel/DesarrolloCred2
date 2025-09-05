import { Resend } from 'resend';
import { brand } from '../../config/brand'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  console.log('RESEND API KEY:', process.env.RESEND_API_KEY ? '✅ configurada' : '❌ falta configurar');

  try {
    const body = await req.json();
    const { fullName, email, phone, message, amount, city } = body;
    console.log('Datos recibidos:', body);

    // Email para ti (notificación)
    const emailData = {
      from: 'contacto@resend.dev', // Email por defecto de Resend (gratuito)
      to: ['noesilvido@gmail.com'], // Tu email
      subject: `📬 Nuevo contacto desde ${brand.name || 'tu landing page'}`,
      html: `
             <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Contacto - ${brand.name}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f9fa;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #0045ac; padding: 30px 40px; border-bottom: 1px solid #e9ecef;">
            <div style="text-align: center;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                    ${brand.name || 'ASESORÍA CREDITICIA'}
                </h1>
            </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 40px 20px 40px;">
            <h2 style="margin: 0 0 30px 0; font-size: 28px; font-weight: 600; color: #0045ac; line-height: 1.3;">
                💰 Nueva Solicitud de Asesoría Crediticia
            </h2>
            
            <p style="margin: 0 0 30px 0; font-size: 16px; color: #666666; line-height: 1.5;">
                Has recibido una nueva solicitud de asesoría crediticia desde tu landing page:
            </p>

            <!-- Contact Details Card -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 30px; margin-bottom: 30px; border-left: 4px solid #0045ac;">
                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #0045ac; margin-bottom: 5px;">👤 NOMBRE COMPLETO</span>
                    <p style="margin: 0; font-size: 18px; color: #000000; font-weight: 500;">${fullName}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #0045ac; margin-bottom: 5px;">📧 CORREO ELECTRÓNICO</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">
                        <a href="mailto:${email}" style="color: #0045ac; text-decoration: none;">${email}</a>
                    </p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #0045ac; margin-bottom: 5px;">📱 TELÉFONO</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${phone}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #0045ac; margin-bottom: 5px;">🏙️ CIUDAD</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${city}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #0045ac; margin-bottom: 5px;">💵 CANTIDAD SOLICITADA</span>
                    <p style="margin: 0; font-size: 20px; color: #000000; font-weight: 700;">$${amount}</p>
                </div>

                <div style="margin-bottom: 0;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #0045ac; margin-bottom: 5px;">⏰ FECHA Y HORA</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${new Date().toLocaleString('es-MX')}</p>
                </div>
            </div>

            <!-- Message Section -->
            <div style="margin-bottom: 40px;">
                <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 600; color: #0045ac;">
                    💬 Mensaje del Cliente
                </h3>
                <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 25px;">
                    <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin-bottom: 40px;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #0045ac; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-size: 16px; font-weight: 600; transition: background-color 0.3s ease;">
                    📞 Contactar Cliente
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #0045ac; color: #ffffff; padding: 20px 40px;">
            <div style="text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #ffffff;">
                    © 2024 ${brand.name || 'Asesoría Crediticia'} - Sistema de notificaciones automáticas
                </p>
            </div>
        </div>
    </div>
</body>
</html>
      `,
    };

    // Enviar el correo usando Resend
    const response = await resend.emails.send(emailData);

    console.log('Respuesta Resend:', response);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Correo enviado exitosamente',
      data: response 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
  
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      message: 'Error al enviar el correo. Verifica tu API key de Resend.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
