'use strict';

const express = require('express');
const quizes = require('../models/quiz');
const app = express();

function prepareResult(result, res, next) {
    result
    .then((data) => {
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
        prepareResult(quizes.find(id), res, next);
    } else {
        prepareResult(quizes.all(), res, next);
    }
});

app.post('/', (req, res, next) => {
    let data = req.body;
    prepareResult(quizes.make(data), res, next);
});

app.put('/:id', (req, res, next) => {
    let data = req.body;
    let id = req.params.id;
    prepareResult(quizes.update(id, data), res, next);
});

app.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    prepareResult(quizes.remove(id), res, next);
});

module.exports = app;