'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

var config = require('../config'); // get our config file
//const url = 'mongodb://localhost:27017/myproject';
const url = config.database;

const Mongodb = {
  connect: (cb) => {
    MongoClient.connect(url, (err, db) => {
      if (err) { console.error(err); }
      Mongodb.DB = db;
      cb(err);
    });
  },

  find: (collection, id, cb) => {
    id = ObjectId(id);
    let con = Mongodb.DB.collection(collection);
    con.findOne({_id: id}, (err, result) => cb(err, result));
  },

  findByName: (collection, name, cb) => {
    let con = Mongodb.DB.collection(collection);
    con.findOne({'name': name}, (err, result) => cb(err, result));
  },

  // findAll: (collection) => {
  //   return new Promise((resolve, reject) => {
  //     let con = Mongodb.DB.collection(collection);
  //     con.find({}).toArray((err, result) => err ? reject(err) : resolve(result));
  //   });
  // },
  findAll: (collection, cb) => {
    let con = Mongodb.DB.collection(collection);
    con.find({}).toArray((err, result) => cb(err, result));
  },

  insert: (collection, data, cb) => {
    let con = Mongodb.DB.collection(collection);
    con.insertOne(data, (err, result) => cb(err, result.insertedId));
  },

  update: (collection, id, data, cb) => {
    id = ObjectId(id);
    let con = Mongodb.DB.collection(collection);
    con.update({_id: id}, data, (err, result) => cb(err, id));
  },

  delete: (collection, filter, cb) => {
    let con = Mongodb.DB.collection(collection);
    con.remove(filter, (err, result) => cb(err));
  },
}

module.exports = Mongodb;
