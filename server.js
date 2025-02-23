const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Use variáveis de ambiente
    pass: process.env.EMAIL_PASSWORD, // Use variáveis de ambiente
  },
});

// Rota para receber os dados do formulário
app.post('/enviar-mensagem', (req, res) => {
  const { instagram, mensagem } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Nova mensagem anônima',
    text: `Instagram: ${instagram}\nMensagem: ${mensagem}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).send('Erro ao enviar a mensagem.');
    } else {
      console.log('E-mail enviado:', info.response);
      res.send('Mensagem enviada com sucesso!');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});