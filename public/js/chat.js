import io from 'socket.io-client';

$(function () {
    var socket = io();
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