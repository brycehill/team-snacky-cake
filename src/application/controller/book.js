TandemApplication.reopen({
    BookController: Ember.ArrayController.extend({
        content: [],
        commitLog: [],
        intervalID: false,
        init: function() {
            var that = this;
            TandemApp.get('socket').emit('getAllBooks');
            TandemApp.get('socket').on('userList', function (users) {
                that.set('book.chatUsers', users);
            });
            TandemApp.get('socket').on('foundBooks', function(books) {
                books.forEach(function(book) {
                    if (that.get('content').filterProperty('id', book._id).length === 0) {
                        that.addBook(book);
                    }
                });
            });
            TandemApp.get('socket').on('bookAdded', function(book) {
                 that.addBook(book);
            });
            TandemApp.get('socket').on('bookChatMessage', function(msg) {
                Ember.run.begin();
                that.get('book.chatMessages').pushObject(Ember.Object.create({
                    userName: msg.user || 'Me',
                    message: msg.message
                }));
                Ember.run.end();

                if (msg.action === 'join') {
                    that.get('book.chatUsers').pushObject(msg.who);
                }
                if (msg.action === 'leave') {
                    that.get('book.chatUsers').removeObject(msg.who);
                }

                var scrollie = $('.chatMessages');
                scrollie.scrollTop(scrollie[0].scrollHeight);
            });
            TandemApp.get('socket').on('bookCommits', function(commitData) {
                commitData.data.commits.forEach(function (commit) {
                    commit.shortid = commit.id.substr(0, 4) + '...';
                });
                that.set('commitLog', commitData.data.commits);
            });
            TandemApp.get('socket').on('bookDeleted', function(res) {
                if (res._id !== '') {
                    var toDelete = that.get('content').filterProperty('id', res._id);
                    if (toDelete.length > 0) {
                        that.get('content').removeObject(toDelete[0]);
                    }
                }
            });
            TandemApp.get('socket').on('chapterCommit', function(data) {
                $('#diff').empty();
                $('.live-diff .msg').text('Revision Successfully Made');

            });
            TandemApp.get('socket').on('chapterCreated', function(chapter) {
                that.get('content').forEach(function (book) {
                    if (book.get('id') === chapter._id) {
                        var newChapter = TandemApp.ChapterModel.create({
                            book: book,
                            title: chapter.title,
                            number: chapter.idx
                        });
                        book.get('chapterObjects').pushObject(newChapter);
                    }
                });
            });
            TandemApp.get('socket').on('viewChapter', function(chapter) {
                that.set('book.chapterContentOld', chapter.contents);
                that.set('book.chapterContentNew', chapter.contents);

                var updater = function() {
                    var dmp = new diff_match_patch(),
                        pobj = dmp.patch_make(that.get('book.chapterContentOld'), that.get('book.chapterContentNew')),
                        ptxt = dmp.patch_toText(pobj);

                    if (ptxt.length) {
                        TandemApp.get('socket').emit('updateChapter', {
                            _id: that.get('book.id'),
                            idx: that.get('book.currentChapter'),
                            diff: ptxt
                        });
                        that.set('book.chapterContentOld', that.get('book.chapterContentNew'));
                    }
                    setTimeout(updater, 500);
                };

                setTimeout(updater, 500);
            });
            TandemApp.get('socket').on('allAuthors', function(authors) {
            	var a = [];
            	authors.forEach(function(author) {
            		a.push(author.username);
            	});
            	that.set('book.allAuthors', a);
            });
            TandemApp.get('socket').on('coAuthorAdded', function(data) {
            	var user = data.username;
            	that.get('book.allAuthors').pushObject(user);
            	$('.allAuthors').append('<span id="instructions"><small>'+user+' can now work on this book!</small><br /><small>They can now access this book from their home screen</small></span>');
            	setTimeout(function() {$('#instructions').fadeOut(function() {this.remove()})}, 5000);
            });
            TandemApp.get('socket').on('chapterSaved', function(data) {
                var diff = data.fullDiff,
                    $diff = $('#diff'),
                    newDiff;

                $diff.empty();
                if (diff) {
                    tmp = diff.split('<br>');

                    newDiff = tmp.map(function(line, i) {
                    	if (i < 3) {
                    		return;
                    	} else if (line.charAt() == '+') {
                            return '<span class=\'addition\'>'+line+'</span>';
                        } else if (line.charAt() == '-') {
                            return '<span class=\'subtraction\'>'+line+'</span>';
                        } else if (line == '\\ No newline at end of file') {
                        	return;
                        } else {
                            return line;
                        }
                    });
                }

                $diff.append(newDiff).scrollTop($diff[0].scrollHeight);
            });
        },
        addBook: function(book) {
            book.id = book._id;
            delete book._id;
            this.get('content').pushObject(TandemApp.BookModel.create(book));
        },
        actions: {
            createChapter: function () {
            	if (this.get('newChapterTitle') != null) {
	                TandemApp.get('socket').emit('addChapter', {
	                    _id: this.get('book.id'),
	                    title: this.get('newChapterTitle')
	                });
	                this.set('newChapterTitle', '');
	            }
            },
            addCoAuthor: function() {
            	if (this.get('newCoAuthor') != null) {
	            	TandemApp.get('socket').emit('addCoAuthor', {
	            		_id: this.get('book.id'),
	            		coAuthor: this.get('newCoAuthor')
	            	});
	            	this.set('newCoAuthor', '');
	            }
            },
            closeRevisions: function () {
                this.set('commitLog', []);
            }
        }
    })
});