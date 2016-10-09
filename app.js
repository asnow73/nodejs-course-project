'use strict';

var cluster = require('cluster');

if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });


} else {
    const express = require('express');
    const cors = require('cors');
    const bodyparser = require('body-parser');
    const config = require('./config'); // get our config file
    const Mongodb = require('./models/Mongodb');
    const authenticate = require('authenticate-package');
    const users = require('./models/user');
    const app = express();
    require('./websocket/server');

    app.set('port', config.port);
    authenticate.init(config.secret, users);

    app.use(cors());
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));

    app.use('/', require('./controllers/index'));
    app.use('/chat', require('./controllers/chat'));
    app.use('/register', require('./controllers/register'));
    app.use(authenticate);
    app.use('/user', require('./controllers/user'));
    app.use('/event', require('./controllers/event'));
    app.use('/quiz', require('./controllers/quiz'));

    app.use((err, req, res, next) => {
        console.error(err.stack);
        return res.status(500).send(err);
    });

    let startServer = () => {
        app.listen(app.get('port'), () => {
            console.log('Express server listening on port', app.get('port'));
        });
    };

    Mongodb.connect(startServer);
}