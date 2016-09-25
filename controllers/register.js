'use strict';

const express = require('express');
const users = require('../models/user');
const app = express();

app.post('/', (req, res, next) => {
    let data = req.body;
    users.make(data, (err, user) => err ? next(err) : res.send(user));
});

module.exports = app;