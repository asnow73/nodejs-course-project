'use strict';

//const RequestError = require('./RequestError');
var Mongodb = require('./Mongodb');


function make(data, cb) {
	Mongodb.insert('users', data, cb);
}

function find(id, cb) {
	Mongodb.find('users', id, (err, doc) => {
		if (err) { return cb(err); }
		cb(err, doc);
	});
}

function findByName(name, cb) {
	Mongodb.findByName('users', name, (err, doc) => {
		if (err) { return cb(err); }
		cb(err, doc);
	});
}

function update(id, data, cb) {
	Mongodb.update('users', id, data, cb);
}

function remove(id, cb) {
	find(id, function(err, user) {
		if (err) {
			cb(err);
		} else {
			user._deleted = true;
			update(id, user, cb);
		}
	});
}

function all(cb) {
	Mongodb.findAll('users', (err, docs) => {
		if (err) { return cb(err); }
		cb(err, docs);
	});
}

module.exports = {
	make: make,
	find: find,
	findByName: findByName,
	update: update,
	remove: remove,
	all: all
}