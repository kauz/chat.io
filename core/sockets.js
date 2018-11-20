module.exports = (app) => {
    let http = require('http').Server(app);
    http.listen(process.env.SOCKET_PORT);
    let io = require('socket.io')(http);

    // Web Sockets events
    io.on('connection', (socket) => {

        io.emit('user connected');

        console.log('A user connected.');

        socket.on('disconnect', () => {
            console.log('User disconnected.');
        });

        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });

    });

};