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
	return prepareResult(Mongodb.insert('users', data));
}

function find(id) {
	return prepareResult(Mongodb.find('users', id));
}

function findByName(name) {
	return prepareResult(Mongodb.findByName('users', name));
}

function update(id, data) {
	return prepareResult(Mongodb.update('users', id, data));
}

function remove(id) {
	return find(id)
		.then((user) => {
			user._deleted = true;
			return update(id, user);
		})
		.catch((err) => {
			console.log("Error in model: ", err);
			return Promise.reject(err);
		});
}

function all() {
	return prepareResult(Mongodb.findAll('users'));
}

module.exports = {
	make: make,
	find: find,
	findByName: findByName,
	update: update,
	remove: remove,
	all: all
};