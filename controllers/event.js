'use strict';

const express = require('express');
const events = require('../models/event');
const app = express();

function prepareResult(result, res, next) {
    result.then((data) => {
        res.send(data);
    })
    .catch((err) => {
        console.log("Error in controller: ", err);
        next(err);
    });
}

app.get('/(:id)?', (req, res, next) => {
    let id = req.params.id;
    if (id) {
        prepareResult(events.find(id), res, next);
    } else {
        prepareResult(events.all(), res, next);
    }
});

app.post('/', (req, res, next) => {
    let data = req.body;
    prepareResult(events.make(data), res, next);
});

app.put('/:id', (req, res, next) => {
    let data = req.body;
    let id = req.params.id;
    prepareResult(events.update(id, data), res, next);
});

app.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    prepareResult(events.remove(id), res, next);
});

module.exports = app;