'use strict';

const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8089);

io.on('connection', function (socket) {
    socket.on('chat message', function(data){
        io.to(data.room).emit('chat message', data.message);
    });

    socket.on('to room', function(data){
        socket.join(data.name);
        socket.emit('joined room', { name: data.name });
    });

    socket.on('leave room', function(data){
        socket.leave(data.name);
    });
});