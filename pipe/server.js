'use strict';
var net = require('net');
var stream = require('stream');

class myStream extends stream.Transform {
    constructor(options) {
        super(options);
        this.buffer = new Buffer(0);
    }

    _handleRequest(request) {
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        var result = null;
        console.log(request);
        switch (request.type) {
            case 'ping':
                result = {
                    id: request.id,
                    message: "pong"
                };
                break;
            case 'summ':
                if (!request.data || !isNumeric(request.data.a) || !isNumeric(request.data.b)) {
                    throw new Error("Bad request, data is not correct");
                } else {
                    result = {
                        id: request.id,
                        message: (request.data.a + request.data.b)
                    }
                }
                break;
            default:
                throw new Error("I do not know what it is :(");
        }
        return JSON.stringify(result);
    }

    _transform(buf, encoding, cb) {
        try {
            var data = buf.toString().replace(/'/g, '"');
            var request = JSON.parse(data);
            buf = new Buffer(this._handleRequest(request) + "\n");
        } catch(e) {
            buf = new Buffer("Error. " + e.message + "\n");
        }
        cb(null, buf);
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

    var transformStream = new myStream();
    connection.pipe(transformStream).pipe(process.stdout);
    process.stdin.pipe(transformStream).pipe(connection);
});

server.listen(3030, () => {
    console.log('Start');
});