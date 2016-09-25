'use strict';

const express = require('express');
const users = require('../models/user');
const app = express();

app.get('/(:user_id)?', (req, res, next) => {
    let id = req.params.user_id;
    if (id) {
        users.find(id, (err, user) => err ? next(err) : res.send(user));
    } else if (req.query.name) {
        users.findByName(req.query.name, (err, user) => err ? next(err) : res.send(user));
    } else {
        users.all((err, users) => err ? next(err) : res.send(users));
    }
});

// app.post('/', (req, res, next) => {
//     let data = req.body;
//     users.make(data, (err, user) => err ? next(err) : res.send(user));
// });

app.put('/:user_id', (req, res, next) => {
    let data = req.body;
    let id = req.params.user_id;
    users.update(id, data, (err, user) => err ? next(err) : res.send(user));
});

app.delete('/:user_id', (req, res, next) => {
    let id = req.params.user_id;
    users.remove(id, (err, user) => err ? next(err) : res.send(user))
});

module.exports = app;