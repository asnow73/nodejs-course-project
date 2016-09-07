'use strict';

const express = require('express');
const users = require('../models/user');
const app = express();


app.get('/(:user_id)?', (req, res, next) => {
  let id = req.params.user_id;
  if (id) {
  	try {
  		res.send(users.find(id));
  	} catch(err) {
			return res.status(err.statusCode).send(err.message);
		}
  } else {
  	res.send(users.all());
  }
});

app.post('/', (req, res, next) => {
	let data = req.body;
	try {
		res.send(users.make(data));
	} catch(err) {
		return res.status(err.statusCode).send(err.message);
	}
});

app.put('/:user_id', (req, res, next) => {
	let data = req.body;
	try {
		let id = req.params.user_id;
		res.send(users.update(id, data));
	} catch(err) {
		return res.status(err.statusCode).send(err.message);
	}
});

app.delete('/:user_id', (req, res, next) => {
	let id = req.params.user_id;
	try {
		res.send(users.remove(id));
	} catch(err) {
		return res.status(err.statusCode).send(err.message);
	}
});

module.exports = app;