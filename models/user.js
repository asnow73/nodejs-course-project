'use strict';

const RequestError = require('./RequestError');

let users = [
{
  id: 1,
	name: 'Vasya Pupkin',
	age: 21
	},
{
	id: 2,
	name: 'User 1',
	age: 1
},
{
	id: 3,
	name: 'User 2',
	age: 2
}]

let currentId = 4;

function make(data) {
	let newUser = {
		id: currentId++,
		name: data.name,
		age: data.age
	}
	users.push(newUser);
	return newUser;
}

function findIndex(id) {
	let index = users.findIndex(function(user) {
		return user.id == id;
	});
	if (index >= 0) {
		return index;
	} else {
		throw new RequestError('User is not exist', 404);
	}
}

function find(id) {
	let index = findIndex(id);
	return users[index];
}

function update(id, data) {
	let user = find(id);
	Object.keys(data).forEach(function(key){
		user[key] = data[key];
	});
	return user;
}

function remove(id) {
	let index = findIndex(id);
	return users.splice(index, 1);
}

function all() {
	return users;
}

module.exports = {
	make: make,
	find: find,
	update: update,
	remove: remove,
	all: all
}