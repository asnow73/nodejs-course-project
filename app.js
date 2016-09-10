'use strict';

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const Mongodb = require('./models/Mongodb');

const app = express();

app.set('port', 8088);

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

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