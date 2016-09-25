'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

var config = require('../config'); // get our config file
const url = config.database;

function prepareResult(err, result, reject, resolve) {
    if (err) {
        console.log("Error in driver: ", err);
        reject(err);
    } else {
        resolve(result);
    }
}

const Mongodb = {
    connect: (cb) => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                console.error(err);
            }
            Mongodb.DB = db;
            cb(err);
        });
    },

    find: (collection, id) => {
        return new Promise((resolve, reject) => {
            id = ObjectId(id);
            let con = Mongodb.DB.collection(collection);
            con.findOne({_id: id}, (err, result) => {
                prepareResult(err, result, reject, resolve);
            });
        });
    },

    findByName: (collection, name) => {
        return new Promise((resolve, reject) => {
            let con = Mongodb.DB.collection(collection);
            con.findOne({'name': name}, (err, result) => {
                prepareResult(err, result, reject, resolve);
            });
        });
    },

    findAll: (collection) => {
        return new Promise((resolve, reject) => {
            let con = Mongodb.DB.collection(collection);
            con.find({}).toArray((err, result) => {
                prepareResult(err, result, reject, resolve);
            });
        });
    },

    insert: (collection, data) => {
        return new Promise((resolve, reject) => {
            let con = Mongodb.DB.collection(collection);
            con.insertOne(data, (err, result) => {
                prepareResult(err, result, reject, resolve);
            });
        });
    },

    update: (collection, id, data) => {
        return new Promise((resolve, reject) => {
            id = ObjectId(id);
            let con = Mongodb.DB.collection(collection);
            con.update({_id: id}, data, (err, result) => {
                prepareResult(err, result, reject, resolve);
            });
        });
    },

    delete: (collection, filter) => {
        return new Promise((resolve, reject) => {
            let con = Mongodb.DB.collection(collection);
            con.remove(filter, (err, result) => {
                prepareResult(err, result, reject, resolve);
            });
        });
    },
}

module.exports = Mongodb;
