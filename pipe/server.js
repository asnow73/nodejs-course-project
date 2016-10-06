'use strict';
var net = require('net');
var stream = require('stream');

class myStream extends stream.Duplex {
    constructor(options) {
        super(options);
        this.buffer = new Buffer(0);
        this.marker = options.marker;
    }

    _read(size) {
        var buf = this.buffer.slice(0, size);
        this.buffer = this.buffer.slice(size);

        if (buf.length) {
            this.push(buf);
        }
    }

    _write(buf, encoding, cb) {
        buf = this.marker + buf.toString().replace(/\n/g, '\n' + this.marker);
        buf = new Buffer(buf);
        this.buffer = Buffer.concat([this.buffer, buf]);
        this._read(buf.length);
        cb();
    }
}

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

    var o = new myStream({marker: '>'});
    var i = new myStream({marker: '<'});


    connection.pipe(i).pipe(process.stdout);
    process.stdin.pipe(o).pipe(connection);

    //connection.pipe(process.stdout);
    //process.stdin.pipe(connection);
});

server.listen(3030, () => {
    console.log('Start');
});