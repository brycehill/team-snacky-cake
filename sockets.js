var Book = require('./models/Book'),
    git = require('gift'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

module.exports.init = function(io, socket) {

    console.log('Init Sockets');
    socket.user = socket.handshake.session.passport.user;

    // Add a book (repo)
    socket.on('addBook', function(data) {
        console.log('adding book');
        console.log(data);
        var user = socket.user.username,
            title;

        title = data.title.replace( /\s/g, '')
                          .replace( /\W/g, '' );

        // check if path exists.

        // need to returh or error here once session is done
        if (!user) throw new Error('No username provided');

        path = '/repos/' + user + '/' + title;
        firstFile = path + '/intro.txt';

        fs.exists(path, function(exists) {
            if (exists) throw new Error('Repo Exists for user ' + user);

            mkdirp(path, function(err) {
                if (err) throw err;

                git.init(path, function (err, repo) {
                    if (err) throw err;

                    // Create an intro file and make initial commit.
                    fs.writeFile(firstFile, 'This is an intro file. Start writing!', function(err) {
                        if (err) throw err;

                        repo.add(firstFile, function(err) {
                            if (err) throw err;

                            repo.commit('Initial Commit', {
                                a: true
                            }, function(err) {
                                if (err) throw err;
                            });
                        });
                    });

                    var book = new Book({
                        title: title
                    });

                    book.save(function(err) {
                        if (err) throw err;
                    });
                });
            });
        });
    });

    // Gets a book (repo) and sends it back.
    socket.on('getBook', function(data) {
        console.log('get book');
        console.log(data);
        var title, repo, path;

        title = data.title.replace( /\s/g, '')
                          .replace( /\W/g, '' );

        // need to returh or error here once session is done
        if (!user) user = 'bryce';

        path = '/repos/' + user + '/' + title;
        repo = git(title);
        Book.find({ title: title }, function(err, book) {
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

            socket.emit('bookSaved', {success: true});
        });
    });

    // Save the file the user is working on. 
    socket.on('autoSave', function(data) {
        var blob = data.blob; 

    });

    // Creates a new chapter, essentially a directory with a new file in it. 
    socket.on('createChapter', function(data) {

    });
};