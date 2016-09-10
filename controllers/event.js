'use strict';

const express = require('express');
const events = require('../models/event');
const app = express();

app.get('/(:id)?', (req, res, next) => {
  let id = req.params.id;
  if (id) {
	  events.find(id, (err, event) => err ? next(err) : res.send(event));
  } else {
	  events.all((err, events) => err ? next(err) : res.send(events));
  }
});

app.post('/', (req, res, next) => {
  let data = req.body;
  events.make(data, (err, event) => err ? next(err) : res.send(event));
});

app.put('/:id', (req, res, next) => {
	let data = req.body;
	let id = req.params.id;
	events.update(id, data, (err, event) => err ? next(err) : res.send(event));
});

app.delete('/:id', (req, res, next) => {
	let id = req.params.id;
  events.remove(id, (err, event) => err ? next(err) : res.send(event))
});

module.exports = app;