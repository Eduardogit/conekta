'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var BookSchema = new Schema({
  bookid : { type: String, unique: true, required: true },
  title : { type: String, required: true },
  author : { type: String, required: true }  
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }   

});

//BookSchema.virtual('title').get(function() {
  //if(this.title){
      //return this.title + ' ' + this.author;
  //}
  //else{
      //return this.title;
  //}
//});

//BookSchema.virtual('title').set(function (title) {
  //var split = title.split(' ');
  //this.author = split[0];
//});


// will validate firstname only contains alphabet.

//BookSchema.path('title').validate(function (v) {
    //return !/[^a-zA-Z0-9]/.test(v);
//});

// will validate firstname only contains alphabet.

//BookSchema.path('author').validate(function (v) {
    //return !/[^a-zA-Z]/.test(v);
//});

BookSchema.statics.getAllBooks= function(callback) {
    this.find({}, callback);
};

BookSchema.statics.getBook= function(bookid, callback) {
    this.findOne({'bookid': bookid}, callback);
};

BookSchema.statics.createBook = function(requestData, callback) {
    this.create(requestData, callback);
};

BookSchema.statics.updateBook = function(bookid, title, callback) {
    this.findOneAndUpdate({'bookid': bookid}, { $set: { 'title': title }}, callback);
};

BookSchema.statics.removeUser = function(bookid, callback) {
    this.remove({'bookid': bookid}, callback);
};

var books = mongoose.model('book', BookSchema);

/** export schema */
module.exports = {
    Books : books
};
