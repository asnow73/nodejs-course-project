'use strict';

const express = require('express');
const users = require('../models/user');
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

app.get('/(:user_id)?', (req, res, next) => {
    let id = req.params.user_id;
    if (id) {
        prepareResult(users.find(id), res, next);
    } else if (req.query.name) {
        prepareResult(users.findByName(req.query.name), res, next);
    } else {
        prepareResult(users.all(), res, next);
    }
});

app.put('/:user_id', (req, res, next) => {
    let data = req.body;
    let id = req.params.user_id;
    prepareResult(users.update(id, data), res, next);
});

app.delete('/:user_id', (req, res, next) => {
    let id = req.params.user_id;
    prepareResult(users.remove(id), res, next);
});

module.exports = app;