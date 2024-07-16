// route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  if (request.method === 'POST') {
    const { name, email, countryCode, phone, observations, cart } = await request.json();

    // Verifica las variables de entorno
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');
   
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // usa SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        // No falla si hay problemas con el certificado
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Muestra el nombre del remitente
      replyTo: email, // Permite que se responda directamente al correo del usuario
      to: 'daniel.ca.pe207@gmail.com',
      subject: 'Nuevo mensaje de contacto',
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>País:</strong> ${countryCode}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Observaciones:</strong> ${observations}</p>
        <p><strong>Carrito:</strong> ${cart}</p>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Mensaje enviado:', info.response);
      return new Response(JSON.stringify({ message: 'Mensaje enviado con éxito', info: info.response }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      console.error('Detalles adicionales:', error.response || error.message);
      return new Response(JSON.stringify({ 
        error: 'Error al enviar el correo', 
        details: error.response || error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else {
    return new Response('Método no permitido', { status: 405 });
  }
}