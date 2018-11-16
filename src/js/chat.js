import io from 'socket.io-client';

export default $(function () {
    var socket = io('http://localhost:3001');

    console.log('init');

    socket.on('connect', onConnect);

    function onConnect() {
        console.log('connect ' + socket.id);
    }


    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('user connected', function(){
        $('#messages').append($('<li class="tech">').text('User connected'));
    });

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});