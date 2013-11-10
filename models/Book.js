var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    
var Book = new Schema({
    title: String,
    owner: String,
    path: String,
    chapters: [{
        title: String,
        number: Number
    }]
});

module.exports = mongoose.model('Book', Book);