var SocketEvents = require('./socketEvents');

module.exports.init = function(socket) {

    // console.log('Init Sockets');

    var s = new SocketEvents(socket);
    // @TODO figure out how to handle multiple users on a socket. 
    socket.emit('setupUser', socket.user);
    // send back book list?

    // Add a book (repo)
    socket.on('addBook', s.addBook.bind(s));
    socket.on('deleteBook', s.deleteBook.bind(s));
    // Gets a book (repo) and sends it back.
    socket.on('getBook', s.getBook.bind(s));
    socket.on('getAllBooks', s.getAllBooks.bind(s));
    // Save a book - Commit!
    socket.on('saveBook', s.saveBook.bind(s));
    // Save the file the user is working on. 
    socket.on('autoSave', function(data) {
        var blob = data.blob;
    });

    // Creates a new chapter, essentially a directory with a new file in it. 
    socket.on('addChapter', s.addChapter.bind(s));
};