let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket, pseudo) => {
    socket.on('new_client', (pseudo) => {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('new_client', pseudo);
    });

    socket.on('message', (message) => {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

server.listen(8080);
