var Book = require('./models/Book'),
    git = require('gift');

module.exports.init = function(io, socket) {

    

    console.log('Init Sockets');

    // Add a book (repo)
    socket.on('addBook', function(data) {
        console.log('addBook');
        console.log(data);
        var path = data.path,
            title = data.title;

        // check if path exists. 
        
        git.init(__dirname + path, function (err, repo) {
            if (err) throw err;

            // do stuff with repo
            var book = new Book({
                title: title,
                path: __dirname + path
            });

            book.save(function(err) {
                if (err) throw err;
            });
        });
    });

    // Gets a book (repo) and sends it back. 
    socket.on('getBook', function(data) {
        var path = data.path,
            repo;

        // repo = git(path);
        Book.find({ path: path }, function(err, book) {
            if (err) throw err;

            socket.book = book; 
            socket.emit('viewBook', book);
        });
    });

    // Save a book - Commit! 
    socket.on('saveBook', function(data) {
        var message = data.message,
            repo;

        repo = git(socket.book.path);

        repo.commit(message, function(err) {
            if (err) throw err; 

            socket.emit('bookSaved', true)
        });

    })
};