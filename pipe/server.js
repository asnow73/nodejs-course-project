'use strict';
var net = require('net');

var server = net.createServer((connection) => {
    console.log('Connect');
    var lastChunk = '';

    connection.on('data', (chunk) => {
        chunk = chunk.toString();
        chunk = lastChunk + chunk;
        chunk = chunk.split('\n');

        lastChunk = chunk.pop();

        if (!chunk.length) {
            return;
        }
    });

    connection.pipe(process.stdout);
    process.stdin.pipe(connection);
});

server.listen(3030, () => {
    console.log('Start');
});