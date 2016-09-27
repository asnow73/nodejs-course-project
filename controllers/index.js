'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res, next) => {
    var stream = fs.ReadStream('./public/index.html');
    stream.on('readable', () => {
        res.send(stream.read().toString());
    })
});

module.exports = app;