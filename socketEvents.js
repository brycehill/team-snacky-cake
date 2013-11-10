var Book = require('./models/Book'),
    Author = require('./models/Author'),
    extend = require('util-extend'),
    git = require('gift'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    exec = require('child_process').exec,
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    diff_patch_match = require('./diff_patch_match');

function SocketEvents(socket, allClients) {
    this.socket = socket;
    this.allClients = allClients;

    if (this.socket.user !== undefined) {
        this.user = socket.user;
    }
};

SocketEvents.prototype.emitError = function(err, data) {
    if (err) console.error(err);

    if (data) {
        data = {
            message: data.message || 'Something bad happened. Please try again.'
        };

        this.socket.emit('error', { message: data.message });
    }
};

SocketEvents.prototype.addBook = function(data) {
    var username = this.user.username,
        title = data.title,
        that = this,
        fileName = 'chapter1.txt',
        colors = ['#F2BBA7', '#29698C', '#64A562', '#69BFAF', '#0FA68A', '#BBBBBB', '#F2C1F4'],
        p;

    if (!username) return that.emitError(null, { message: 'No username provided' });

    p = path.join('/repos', username, stripSpaces(title));
    firstFile = path.join(p, fileName);

    fs.exists(p, function(exists) {
        if (exists) {
            return that.emitError(null, {
                message: 'Repo \'' + title + '\' already exists. Please try again.'
            });
        }

        mkdirp(p, function(err) {
            if (err) return that.emitError(err);

            git.init(p, function (err, repo) {
                if (err) return that.emitError(err);

                // Create an intro file and make initial commit.
                fs.writeFile(firstFile, 'Welcome to Tandem. Start writing!', function(err) {
                    if (err) return that.emitError();

                    repo.add(firstFile, function(err) {
                        if (err) return that.emitError(err);

                        repo.commit('Initial Commit', {
                            a: true
                        }, function(err) {
                            if (err) return that.emitError(err);
                        });
                    });
                });

                Author.findOne({username: username}, function (err, author) {
                    if (err) return that.emitError(err);

                    var book = new Book({
                        title: title,
                        owner: author.username,
                        path: p,
                        chapters: [{
                            title: 'Chapter 1',
                            fileName: fileName,
                            number: 1
                        }],
                        color: colors[Math.floor(Math.random() * colors.length)]
                    });

                    book.save(function (err, b) {
                        if (err) return that.emitError(err);

                        Author.update({username: username}, {$push: {books: b}}, function (err, numAffected, rawResponse) {
                            if (err) that.emitError(err);

                            that.socket.emit('bookAdded', b);
                        });
                    });
                });
            });
        });
    });
};

SocketEvents.prototype.deleteBook = function(data) {
    var self = this,
        bookId;

    if (!data._id) return self.socket.emit('bookDeleted', '');

    bookId = new ObjectId(data._id);

    Author.find().where('books').in([bookId]).exec(function(err, authors) {
        if (err) self.emitError(err);

        authors.forEach(function(author) {
            author.books.splice(author.books.indexOf(bookId),1);
            author.save();
        });

        Book.findById(bookId, function(err, book) {
            if (err) return self.emitError(err);

            if (book == null) return self.socket.emit('bookDeleted', '');

            if (book.path && book.path !== '/') {
                // remove every file in the repo
                var bash = 'rm -rf ' + book.path;
                exec(bash);
            }
        });

        Book.remove({ _id: bookId }, function (err) {
            if (err) return self.emitError(err);

            self.socket.emit('bookDeleted', { _id: data._id });
        });
    });
};

SocketEvents.prototype.getBook = function(data) {
    var self = this,
        username = this.user.username,
        // title = stripSpaces(data.title),
        id = data._id,
        repo, p, chapters;

    if (!username) that.emitError(null, { message: 'No username provided' });

    // p = path.join('/repos', username, title);
    // What information about the repo do we want?
    // Commits?
//     repo = git(p);
//     repo.tree().blobs(function(err, f) {
//         if (err) throw err;
//         // map over this to get stuff?
//         files = f.map(function(file) {
//             console.log('found file: ');
//             console.log(file);
//             return file.name;
//         });

//         repo.chapters = files;

        Book.findOne({ _id: id }, function(err, book) {
            if (err) return self.emitError(err);
// console.log('book');
// console.log(book);
            // book = extend(repo, book);
            self.socket.emit('viewBook', book);
        });
    // });
};

SocketEvents.prototype.getAllBooks = function() {
    var username = this.user.username,
        that = this;

    Author.findOne({ username: username })
    .populate('books')
    .exec(function (err, author) {
        if (err) return that.emitError(err);

        var books = author.books;

        that.socket.emit('foundBooks', books);
    });
};

SocketEvents.prototype.saveChapter = function(data) {
    var self = this,
        message = data.message,
        bookId = new ObjectId(data.bookId),
        i = data.idx,
        repo;

    Book.findOne({ _id: bookId }, function(err, book) {
        if (err) return self.emitError(err);

        repo = git(book.path);

        file = book.path + '/' + book.chapters[i];
        // Add only this chapter file.
        repo.add(file, function(err) {
            if (err) return self.emitError(err);

            repo.commit(message, {
                file: file
            }, function(err) {
                if (err) return self.emitError(err);

                // What to send back here?
                self.socket.emit('chapterCommit', {success: true});
            });
        });
    });
};

SocketEvents.prototype.getCommits = function(data) {
    var that = this,
        bookId = new ObjectId(data.bookId),
        repo;

    Book.findOne({ _id: bookId }, function(err, book) {
        if (err) return self.emitError(err);

        repo = git(book.path);
        repo.commits(function (err, commits) {
            if (err) return self.emitError(err);

            that.socket.emit('bookCommits', {
                data: commits
            });

        });


    });
}

SocketEvents.prototype.addChapter = function(data) {
    var that = this,
        bookId = new ObjectId(data._id),
        title = data.title,
        fileName = stripSpaces(title) + '.txt',
        idx, ws;

    Book.findOne({_id: bookId}, function (err, book) {
        if (err) return that.emitError(err, { message: 'Book could not be located' });

        repo = git(book.path);
        filepath = path.join(book.path, fileName);

        fs.exists(book.path, function(exists) {
            if (!exists) return that.emitError();

            ws = fs.createWriteStream(book.path + '/' + fileName);
            ws.write('Start writing here');

            repo.add(fileName, function(err) {
                if (err) return that.emitError(err);

                repo.commit('Initial commit of new chapter: ' + stripSpaces(title), {
                    a: false
                }, function(err) {
                    if (err) return that.emitError(err);

                    if (book.chapters === undefined) book.chapters = [];

                    idx = book.chapters.length + 1;

                    book.chapters.push({
                        title: title,
                        number: idx
                    });

                    book.save(function (err, book) {
                        if (err) return that.emitError(err);

                        that.socket.emit('chapterCreated', {
                            _id: book._id,
                            title: title,
                            idx: idx
                        });
                        // this.socket.broadcast.to(data._id)
                    });
                });
            });
        });
    });
};

// called when an author is in a 'book' room.
SocketEvents.prototype.joinRoom = function(data) {
    var self = this,
        room = data._id;

    self.socket.join(room);
};



// idx of chapter array, _id, get
SocketEvents.prototype.getChapter = function(data) {
    var bookId = new ObjectId(data._id),
        i = data.idx,
        that = this,
        repo;

    Book.findOne({ _id: bookId }, function(err, book) {
        if (err) return that.emitError(err);

        repo = git(book.path);

        // get contents of file.
        fs.readFile(book.path + '/' + book.chapters[i].fileName, 'utf8', function(err, contents) {
            if (err) return that.emitError(err);

            that.socket.emit('viewChapter', { contents: contents });
        });
    });
};

// apply the patch to the file.
SocketEvents.prototype.updateChapter = function(data) {
    var bookId = new ObjectId(data._id),
        i = data.idx,
        diff = data.diff,
        that = this,
        repo, dmp, patches, res, ws;

    // diff to object
    Book.findOne({ _id: bookId }, function(err, book) {
        if (err) return that.emitError(err);

        repo = git(book.path);

        var filePath = book.path + '/' + book.chapters[i].fileName;

        // get contents of file.
        fs.readFile(filePath, 'utf8', function(err, origContents) {
            if (err) return that.emitError(err);

            dmp = new diff_patch_match();
            patches = dmp.patch_fromText(diff);
            res = dmp.patch_apply(patches, origContents);

            if (res[1]) {
                newText = res[0];
            }

            ws = fs.createWriteStream(filePath);
            ws.write(newText);

            that.socket.emit('chapterSaved', { contents: newText });
        });
    });
};


SocketEvents.prototype.addCoAuthor = function(data) {
    var bookId = new ObjectId(data._id),
        coAuthor = data.coAuthor,
        self = this;

    if (coAuthor) {
        // Search Github for username instead??
        Author.findOne({ username: data.coAuthor}, function(err, author) {
            if (err) return self.emitError(err);

            if (author == null) return self.emitError(null, {message: 'That author is not yet using Tandem :(' });

            // found a user, add the book Id to them.
            author.books.push(bookId);
            author.save();

            Book.findById(data._id, function(err, b) {
                if (err) self.emitError(err);
console.log('adding co author ALL CLIENTS');
console.log(self.allClients);
                // updating co author's book view
                self.allClients[coAuthor].emit('bookAdded', b);
            });
        });
    }
};

var stripSpaces = function(str) {
    return str.replace(/\s/g, '')
              .replace(/\W/g, '');
};

module.exports = SocketEvents;