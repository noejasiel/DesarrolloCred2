import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { brand } from '../../config/brand'

const ses = new SESClient({
  region: 'us-west-2', // Cambia a la región de SES que estés usando
  credentials: {
    accessKeyId: process.env.MY_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_SES_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  console.log('SES ACCESS:', process.env.MY_SES_ACCESS_KEY_ID ? '✅ cargada' : '❌ vacía');

  try {
    const body = await req.json();
    const { fullName, email, phone, message, company, inquiryType } = body;
    console.log('body:', body);


    const params = {
      Destination: {
        ToAddresses: ['jaszciel@gmail.com'],
      },
      Message: {
        Body: {
          Html: {
            Data: `
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
        <div style="background-color: #ffffff; padding: 30px 40px; border-bottom: 1px solid #e9ecef;">
            <div style="text-align: left;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #000000; letter-spacing: -0.5px;">
                    ${brand.name.toUpperCase()}<sup style="font-size: 12px;">®</sup>
                </h1>
            </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 40px 20px 40px;">
            <h2 style="margin: 0 0 30px 0; font-size: 28px; font-weight: 600; color: #000000; line-height: 1.3;">
                Nuevo mensaje de contacto
            </h2>

            <!-- Company Name -->
            <div style="margin-bottom: 30px;">
                <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #000000; margin-bottom: 5px;">EMPRESA</span>
                <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${company}</p>
            </div>
            
            <p style="margin: 0 0 30px 0; font-size: 16px; color: #666666; line-height: 1.5;">
                Has recibido un nuevo mensaje a través de tu sitio web. Aquí están los detalles del contacto:
            </p>

            <!-- Contact Details Card -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #000000; margin-bottom: 5px;">NOMBRE COMPLETO</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${fullName}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #000000; margin-bottom: 5px;">CORREO ELECTRÓNICO</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">
                        <a href="mailto:${email}" style="color: #000000; text-decoration: none;">${email}</a>
                    </p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #000000; margin-bottom: 5px;">TELÉFONO</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${phone}</p>
                </div>

                <div style="margin-bottom: 0;">
                    <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #000000; margin-bottom: 5px;">FECHA Y HORA</span>
                    <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${new Date().toLocaleString('es-MX')}</p>
                </div>
            </div>

            <!-- Inquiry Type -->
            <div style="margin-bottom: 30px;">
                <span style="display: inline-block; font-size: 14px; font-weight: 600; color: #000000; margin-bottom: 5px;">TIPO DE CONSULTA</span>
                <p style="margin: 0; font-size: 16px; color: #000000; font-weight: 500;">${inquiryType}</p>
            </div>

            <!-- Message Section -->
            <div style="margin-bottom: 40px;">
                <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 600; color: #000000;">
                    Mensaje
                </h3>
                <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 25px;">
                    <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin-bottom: 40px;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-size: 16px; font-weight: 600; transition: background-color 0.3s ease;">
                    Responder mensaje
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #000000; color: #ffffff; padding: 40px 40px 30px 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -1px;">
                    ${brand.name.toUpperCase()}
                </h2>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px; flex-wrap: wrap;">
                <div style="margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #ffffff;">Cuenta</h4>
                    <p style="margin: 5px 0; font-size: 14px; color: #cccccc;">Recibe rendimientos</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #cccccc;">Créditos empresariales</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #cccccc;">Administración de gastos</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #ffffff;">Compañía</h4>
                    <p style="margin: 5px 0; font-size: 14px; color: #cccccc;">Blog</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #cccccc;">Sobre nosotros</p>
                </div>
            </div>

            <div style="border-top: 1px solid #333333; padding-top: 20px; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 12px; color: #888888;">
                    © 2024 ${brand.name}® - Todos los sistemas funcionando
                </p>
                <p style="margin: 0; font-size: 11px; color: #666666; line-height: 1.4;">
                    ${brand.name} | Empresarial es un producto de ${brand.name}®. ${brand.name}® es una marca registrada propiedad Fondea Technologies, S.A. de C.V. S.F.P. Fondea Technologies, S.A. de C.V. S.F.P. es una entidad financiera autorizada y supervisada por el Gobierno Federal, bajo la Ley de Ahorro y Crédito Popular.
                </p>
            </div>
        </div>
    </div>

    <!-- Mobile Responsive Styles -->
    <style>
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            
            .email-content {
                padding: 20px !important;
            }
            
            .footer-columns {
                flex-direction: column !important;
            }
            
            .footer-column {
                margin-bottom: 30px !important;
            }
        }
    </style>
</body>
</html>
            `,
            Charset: 'UTF-8',
          },

        },
        Subject: {
          Data: '📬 Nuevo mensaje desde tu landing page',
          Charset: 'UTF-8',
        },
      },
      Source: 'jaszciel@gmail.com',
    };




    const command = new SendEmailCommand(params);
    const response = await ses.send(command);

    console.log('Respuesta SES:', response);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }catch (error) {
    console.error('Error exacto al enviar el correo:', error);
    const key = process.env.MY_SES_ACCESS_KEY_ID;
    const secret = process.env.MY_SES_SECRET_ACCESS_KEY;
    console.log('Key:', key);
    console.log('Secret:', secret);
  
    return new Response(JSON.stringify({ success: false, error: error.message , key, secret }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
}
