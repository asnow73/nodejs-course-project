'use strict';

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const config = require('./config'); // get our config file
const Mongodb = require('./models/Mongodb');
const authenticate = require('./controllers/authenticate');
const app = express();

app.set('port', config.port);
authenticate.init(config.secret);

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + app.get('port') + '/');
});
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