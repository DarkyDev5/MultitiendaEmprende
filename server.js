const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { parse } = require('url');
const next = require('next');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './app' }); // Aquí especificamos el directorio de la aplicación
const handle = app.getRequestHandler();

const server = express();
const PORT = process.env.PORT || 5000;

// Middleware
server.use(bodyParser.json());
server.use(cors());

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Ruta para manejar el envío del formulario
server.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_TO,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.prepare().then(() => {
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
  });
});
