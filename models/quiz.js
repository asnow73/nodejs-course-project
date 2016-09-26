'use strict';

//const RequestError = require('./RequestError');
var Mongodb = require('./Mongodb');

function prepareResult(result) {
    return result
        .then((data) => {
            return data;
        })
        .catch(err => {
            console.log("Error in model: ", err);
            return Promise.reject(err);
        });
}

function make(data) {
    return prepareResult(Mongodb.insert('quizes', data));
}

function find(id) {
    return prepareResult(Mongodb.find('quizes', id));
}

function update(id, data) {
    return prepareResult(Mongodb.update('quizes', id, data));
}

function remove(id) {
    return find(id)
        .then((data) => {
            data._deleted = true;
            update(id, data);
        })
        .catch((err) => {
            console.log("Error in model: ", err);
            return Promise.reject(err);
        });
}

function all() {
    return prepareResult(Mongodb.findAll('quizes'));
}

module.exports = {
    make: make,
    find: find,
    update: update,
    remove: remove,
    all: all
}