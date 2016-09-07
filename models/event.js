'use strict';

const RequestError = require('./RequestError');

let events = [
{
  id: 1,
	name: 'Voleyball',
	dateStart: '04.09.2016',
	dateEnd: '04.09.2016',
	timeStart: '19.00',
	timeEnd: '21.00'
},
{
	id: 2,
	name: 'Dance',
	dateStart: '04.09.2016',
	dateEnd: '04.09.2016',
	timeStart: '19.00',
	timeEnd: '21.00'
},
{
	id: 3,
	name: 'Beer',
	dateStart: '04.09.2016',
	dateEnd: '04.09.2016',
	timeStart: '19.00',
	timeEnd: '21.00'
}]

let currentId = 4;

function make(data) {
	let newEvent = {
		id: currentId++,
		name: data.name,
		dateStart: data.dateStart,
  	dateEnd: data.dateEnd || '',
  	timeStart: data.timeStart,
  	timeEnd: data.timeEnd || ''
	}
	events.push(newEvent);
	return newEvent;
}

function findIndex(id) {
	let index = events.findIndex(function(element) {
		return element.id == id;
	});
	if (index >= 0) {
		return index;
	} else {
		throw new RequestError('Event is not exist', 404);
	}
}

function find(id) {
	let index = findIndex(id);
	return events[index];
}

function update(id, data) {
	let event = find(id);
	Object.keys(data).forEach(function(key){
		event[key] = data[key];
	});
	return event;
}

function remove(id) {
	let index = findIndex(id);
	return events.splice(index, 1);
}

function all() {
	return events;
}


module.exports = {
	make: make,
	find: find,
	update: update,
	remove: remove,
	all: all
}