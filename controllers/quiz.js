'use strict';

const express = require('express');
const quizes = require('../models/quiz');
const app = express();


app.get('/(:id)?', (req, res, next) => {
  let id = req.params.id;
  if (id) {
	  quizes.find(id, (err, quiz) => err ? next(err) : res.send(quiz));
  } else {
	  quizes.all((err, quizes) => err ? next(err) : res.send(quizes));
  }
});

app.post('/', (req, res, next) => {
	let data = req.body;
  quizes.make(data, (err, quiz) => err ? next(err) : res.send(quiz));
});

app.put('/:id', (req, res, next) => {
	let data = req.body;
	let id = req.params.id;
	quizes.update(id, data, (err, quiz) => err ? next(err) : res.send(quiz));
});

app.delete('/:id', (req, res, next) => {
	let id = req.params.id;
  quizes.remove(id, (err, quiz) => err ? next(err) : res.send(quiz))
});

module.exports = app;