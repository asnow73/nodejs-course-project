'use strict';

const express = require('express');
const users = require('../models/user');
const app = express();

app.post('/', (req, res, next) => {
    let data = req.body;
    console.log("aaa");
    users.make(data)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        console.log("Error in controller: ", err);
        next(err);
    });
});

module.exports = app;