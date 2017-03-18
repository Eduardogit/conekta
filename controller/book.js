'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Books = require('../model/books').Books;

exports.getAll = {
  handler: function (request, reply) {
    Books.getAllBooks(function(err, book) {
      if (!err) {
          return reply({item:{book},ok:true});
      } else {
          return reply(Boom.badImplementation(err)); 
      }
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    console.log(request.params.bookid)
    Books.getBook(request.params.bookid , function(err, book) {
        if (!err) {
            if(book)
              return reply({item:{book},ok:true});
            else
              return reply({ok:false, error: 'No Book Found'});
        } else {
            return reply(Boom.badImplementation(err)); // 500 error
        }
    });
  }
};

exports.create = {
  handler: function (request, reply) {
    Books.createBook(request.payload, function(err, book) {
        if (!err) {
            return reply({ok:true, id: book.bookid});
        } else {
             if (11000 === err.code || 11001 === err.code) {
                    return reply(Boom.forbidden("please provide another book id, it already exist"));
            }
            //else return reply(Boom.forbidden(err)); 
            else return reply({error: Boom.forbidden(err), ok: false})
        }
    });
  }
};

exports.update = {
  handler: function (request, reply) {
    Books.updateUser(request.params.bookid, request.payload.title, function(err, book){
      if (!err) {
          if (book)
              return reply("book updated successfully");
          else
              return reply("No such book found");
      } else {
           if (11000 === err.code || 11001 === err.code) {
                  return reply(Boom.forbidden("please provide another book id, it already exist"));
          }
          else return reply(Boom.forbidden(err)); // HTTP 403
      }
    });
  }
};

exports.remove = {
  handler: function (request, reply) {
    Book.removeUser(request.params.bookid, function(err, book){
        if(!err){
          if(book.result.n) // checks from mongodb response for successfull deletion
              return reply("book deleted successfully");
          else
              return reply("No book found");
        } else {
          return reply(Boom.badRequest("Could not delete book")); 
        }
    });
  }
};