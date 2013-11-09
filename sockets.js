var Book = require('./models/Book'),
    Author = require('./models/Author'),
    extend = require('util-extend'),
    git = require('gift'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

module.exports.init = function(io, socket) {

    console.log('Init Sockets');
    socket.user = socket.handshake.session.passport.user;

    // Add a book (repo)
    socket.on('addBook', function(data) {
        var username = socket.user.username,
            title = stripSpaces(data.title);

        if (!username) throw new Error('No username provided');

        path = '/repos/' + username + '/' + title;
        firstFile = path + '/intro.txt';

        fs.exists(path, function(exists) {
            if (exists) throw new Error('Repo Exists for user ' + username);

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

                        // Not sure if there is a better way to just get the 
                        // number and not the objectId object
                        var id = book._id.toString();

                        Author.update({ username: username }, {
                            $push: { books: id }
                        }, function(err) {
                            if (err) throw err;
                        });
                    });
                });
            });
        });
    });

    // Gets a book (repo) and sends it back.
    socket.on('getBook', function(data) {
        var username = socket.user.username,
            title = stripSpaces(data.title),
            repo, path;

        if (!username) throw new Error('No username provided');

        path = '/repos/' + username + '/' + title;
        // What information about the repo do we want?
        // Commits?
        repo = git(path);
        repo.tree().contents(function(err, children) {
            if (err) throw err;

            // map over this to get stuff?
            console.log(children);
        });

        Book.find({ title: title }, function(err, book) {
            if (err) throw err;

            // socket.book = book;
            book = extend(repo, book);
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
    socket.on('addChapter', function(data) {
        var username = socket.user.username,
            file = 'chapter.txt',
            chapter = stripSpaces(data.chapter),
            title = stripSpaces(data.title),
            path;

        if (!username) throw new Error('No username provided');

        // TODO save the git instance and/or the path stuff in socket
        path = '/repos/' + username + '/' + title;
        repo = git(path);
        path = path + '/' + chapter;
        file = path + '/' + file;

        fs.exists(path, function(exists) {
            if (exists) throw new Error('Chapter name Exists for user ' + username);

            mkdirp(path, function(err) {
                if (err) throw err;

                fs.writeFile(file, 'Start writing ' + chapter, function(err) {
                    if (err) throw err;

                    repo.add(path, function(err) {
                        if (err) throw err;

                        repo.commit('Initial commit of new chapter: ' + chapter, {
                            a: true
                        }, function(err) {
                            if (err) throw err;
                        });
                    });
                });
            });
        });
    });

    function stripSpaces(str) {
        return str.replace( /\s/g, '')
                  .replace( /\W/g, '' );
    }
};