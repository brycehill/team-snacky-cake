var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Author = new Schema({
    username: String,
    books: [{
        _id: Number,
        owner: Boolean
    }]
});

module.exports = mongoose.model('Author', Author);