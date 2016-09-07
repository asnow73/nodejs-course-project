'use strict';

const express = require('express');
const quizes = require('../models/quiz');
const app = express();


app.get('/(:id)?', (req, res, next) => {
  let id = req.params.id;
  if (id) {
  	try {
  		res.send(quizes.find(id));
  	} catch(err) {
			return res.status(err.statusCode).send(err.message);
		}
  } else {
  	res.send(quizes.all());
  }
});

app.post('/', (req, res, next) => {
	let data = req.body;
	try {
		res.send(quizes.make(data));
	} catch(err) {
		return res.status(err.statusCode).send(err.message);
	}
});

app.put('/:id', (req, res, next) => {
	let data = req.body;
	try {
		let id = req.params.id;
		res.send(quizes.update(id, data));
	} catch(err) {
		return res.status(err.statusCode).send(err.message);
	}
});

app.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	try {
		res.send(quizes.remove(id));
	} catch(err) {
		return res.status(err.statusCode).send(err.message);
	}
});

module.exports = app;