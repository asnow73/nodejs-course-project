'use strict';

//const RequestError = require('./RequestError');
var Mongodb = require('./Mongodb');


function make(data, cb) {
  Mongodb.insert('events', data, cb);
}

function find(id, cb) {
  Mongodb.find('events', id, (err, doc) => {
		if (err) { return cb(err); }
		cb(err, doc);
	});
}

function update(id, data, cb) {
	Mongodb.update('events', id, data, cb);
}

function remove(id, cb) {
	find(id, function(err, data) {
		if (err) {
			cb(err);
		} else {
			data._deleted = true;
			update(id, data, cb);
		}
	});
}

function all(cb) {
	Mongodb.findAll('events', (err, docs) => {
		if (err) { return cb(err); }
		cb(err, docs);
	});
}


module.exports = {
  make: make,
  find: find,
  update: update,
  remove: remove,
  all: all
}