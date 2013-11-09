var Book = require('./models/Book'),
    Author = require('./models/Author'),
    extend = require('util-extend'),
    git = require('gift'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

function SocketEvents(socket) {
    console.log('construct SE');
    // console.log(socket);
    this.socket = socket;
    if (this.socket.user !== undefined) {
        this.user = socket.user;
    }
};

SocketEvents.prototype.addBook = function(data) {
    var username = this.user.username,
        title = stripSpaces(data.title),
        that = this;

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


                Author.findOne({username: username}, function (err, author) {
                    if (err) throw err;

                    var book = new Book(
                        {
                            title: title,
                            owner: author,
                            path: path
                        }
                    );

                    book.save(function (err, b) {
                        if (err) throw err;

                        Author.update({username: username}, {$push: {books: b}}, function (err, numAffected, rawResponse) {
                            if (err) throw err;

                            that.socket.emit('monkey', {message: 'success'});
                        });
                    });
                });
            });
        });
    });
};

SocketEvents.prototype.getBook = function(data) {
    var self = this,
        username = this.user.username,
        title = stripSpaces(data.title),
        repo, path, chapters;

    if (!username) throw new Error('No username provided');

    path = '/repos/' + username + '/' + title;
    // What information about the repo do we want?
    // Commits?
    repo = git(path);
    repo.tree().trees(function(err, sub) {
        if (err) throw err;
        // map over this to get stuff?
        chapters = sub.map(function(dir) {
            return dir.name;
        });

        repo.chapters = chapters;

        Book.find({ title: title }, function(err, book) {
            if (err) throw err;

            // socket.book = book;
            book = extend(repo, book);
            self.sockets.emit('viewBook', book);
        });
    });
};

SocketEvents.prototype.getAllBooks = function(data) {
    var username = this.user.username,
        that = this;

    Author.findOne({ username: username })
    .populate('books')
    .exec(function (err, author) {
        if (err) throw err;

        books = author.books;

        that.socket.emit('foundBooks', books);
    });

};

SocketEvents.prototype.saveBook = function(data) {
    var self = this,
        message = data.message,
        repo;

    repo = git(socket.book.path);

    repo.commit(message, function(err) {
        if (err) throw err;

        self.socket.emit('bookSaved', {success: true});
    });
};

SocketEvents.prototype.addChapter = function(data) {
    var username = this.user.username,
        file = 'chapter.txt',
        chapter = stripSpaces(data.chapter || 'Default Chapter Name'),
        title = stripSpaces(data.title || 'Default Title'),
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
};

var stripSpaces = function(str) {
    return str.replace( /\s/g, '')
              .replace( /\W/g, '');
};

module.exports = SocketEvents;