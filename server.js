const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'index.html')));

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para enviar mensagens (exemplo)
app.post('/enviar-mensagem', (req, res) => {
  const { instagram, mensagem } = req.body;
  console.log('Mensagem recebida:', { instagram, mensagem });
  res.send('Mensagem recebida com sucesso!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
