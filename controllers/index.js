'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: './public' });
});

module.exports = app;