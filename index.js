var express = require('express');
var app = express();
// Faz com que o express e rode no servidor nativo do Node, que é requisitado
// pelo socket.io
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Evento padrão de conexão com o socket.io
io.on('connection', (socket) => {
  // Socket seria a instância do cliente
  // Desconexão do cliente com o servidor
  socket.on('disconnect', () => {
    console.log(socket.id + ' desconectou');
  });

  socket.on('msg', (data) => {
    // Envia a mensagem para todos utilizando o io, que é o servidor
    io.emit('showMsg', data);
  });
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

// Utilizando o http para o listen
http.listen(5500, () => {
  console.log('Rodando');
});
