'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.sendFile('chat.html', { root: './public' });
});

module.exports = app;