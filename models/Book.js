var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Book = new Schema({
    title: String,
    owner: String,
    path: String,
    chapters: [{
        title: String,
        fileName: String,
        number: Number
    }],
    color: String
});

module.exports = mongoose.model('Book', Book);