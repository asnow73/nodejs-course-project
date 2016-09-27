'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res, next) => {
    fs.readFile('./public/index.html', (err, data) => {
        res.send(data.toString());
    })
});

module.exports = app;