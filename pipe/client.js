var net = require('net');

var connection = net.createConnection(3030, () => {
    console.log("Connect");

    process.stdin.pipe(connection);
    connection.pipe(process.stdout);
});
