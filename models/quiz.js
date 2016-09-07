'use strict';

const RequestError = require('./RequestError');

let quizes = [
{
  id: 1,
  name: 'quiz1',
  options: ['option1', 'option2']
},
{
  id: 2,
  name: 'quiz2',
  options: ['option1', 'option2']
},
{
  id: 3,
  name: 'quiz3',
  options: ['option1', 'option2']
}]

let currentId = 4;

function make(data) {
  let newQuiz = {
    id: currentId++,
    name: data.name,
    options: data.options || []
  }
  quizes.push(newQuiz);
  return newQuiz;
}

function findIndex(id) {
  let index = quizes.findIndex(function(element) {
    return element.id == id;
  });
  if (index >= 0) {
    return index;
  } else {
    throw new RequestError('Quiz is not exist', 404);
  }
}

function find(id) {
  let index = findIndex(id);
  return quizes[index];
}

function update(id, data) {
  let quiz = find(id);
  Object.keys(data).forEach(function(key){
    quiz[key] = data[key];
  });
  return quiz;
}

function remove(id) {
  let index = findIndex(id);
  return quizes.splice(index, 1);
}

function all() {
  return quizes;
}


module.exports = {
  make: make,
  find: find,
  update: update,
  remove: remove,
  all: all
}