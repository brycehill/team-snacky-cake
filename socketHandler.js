var SocketEvents = require('./socketEvents');

module.exports.init = function(socket, allClients) {

    // console.log('Init Sockets');

    var s = new SocketEvents(socket, allClients);
    // @TODO figure out how to handle multiple users on a socket.

    socket.emit('setupUser', socket.user);
    // send back book list?

    // Add a book (repo)
    socket.on('addBook', s.addBook.bind(s));
    socket.on('deleteBook', s.deleteBook.bind(s));
    // Gets a book (repo) and sends it back.
    socket.on('getBook', s.getBook.bind(s));
    socket.on('getAllBooks', s.getAllBooks.bind(s));

    // Creates a new chapter, essentially a directory with a new file in it.

    // Creates a new chapter, essentially a directory with a new file in it.

    socket.on('addChapter', s.addChapter.bind(s));
    socket.on('getChapter', s.getChapter.bind(s));
    // Saves the File on disk.
    socket.on('updateChapter', s.updateChapter.bind(s));
    // Save a chapter - Commit!
    socket.on('saveChapter', s.saveChapter.bind(s));
    socket.on('joinRoom', s.joinRoom.bind(s));

    socket.on('addCoAuthor', s.addCoAuthor.bind(s));

    socket.on('getCommits', s.getCommits.bind(s));
};