
var Book      = require('./controller/book');

// API Server Endpoints
exports.endpoints = [
  { method: 'POST', path: '/book', config: Book.create},
  { method: 'GET', path: '/book', config: Book.getAll},
  { method: 'GET', path: '/book/{bookid}', config: Book.getOne},
  { method: 'PUT', path: '/book/{bookid}', config: Book.update},
  { method: 'DELETE', path: '/book/{userid}', config: Book.remove}
];