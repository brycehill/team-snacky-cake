var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Book = new Schema({
    title: String
});

module.exports = mongoose.model('Book', Book);