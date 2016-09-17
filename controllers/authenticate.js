'use strict';

const express = require('express');
const users = require('../models/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app = express();

function getSuperSecret(context) {
    if (!context.superSecret) {
        throw new Error('superSecret property is not found, try to call init function of authentication');
    } else {
        return context.superSecret;
    }
}


app.post('/authenticate', (req, res, next) => {
    let data = req.body;
    users.findByName(data.name, function(err, user){
        if (err) {
            next(err);
        } else {
            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                if (user.password != req.body.password) {
                    res.send({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, getSuperSecret(app));

                    // return the information including token as JSON
                    res.send({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }
        }
    });
});

app.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, getSuperSecret(app), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

app.init = function(superSecret) {
    this.superSecret = superSecret;
}

module.exports = app;