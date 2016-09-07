'use strict';

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

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

app.listen(app.get('port'), () => {
  console.log('Express server listening on port', app.get('port'));
});