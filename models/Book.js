var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Author = require('./Author');

var Book = new Schema({
    title: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    path: String
});

module.exports = mongoose.model('Book', Book);