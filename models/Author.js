var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Author = new Schema({
    username: String,
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
});

module.exports = mongoose.model('Author', Author);