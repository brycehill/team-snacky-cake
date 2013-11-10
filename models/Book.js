var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Author = require('./Author');

var Book = new Schema({
    title: String,
    owner: String,
    path: String
});

module.exports = mongoose.model('Book', Book);