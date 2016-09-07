'use strict'

function RequestError(message, statusCode) {
	Error.call(this, message) ;
  this.name = "RequestError";
  this.statusCode = statusCode;
  this.message = message;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, RequestError);
  } else {
    this.stack = (new Error()).stack;
  }

}

RequestError.prototype = Object.create(Error.prototype);

module.exports = RequestError;