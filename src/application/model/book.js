(function () {

    var cache = [],
        promises = [],
        listenerAdded = false,
        Model = Ember.Object.extend({
            chapterContentOld: '',
            chapterContentNew: 'Loading...',
            chapterObjects: null,
            chatMessages: [],
            sendChatMessage: function () {
                if (this.get('chatMessage').trim().length === 0) {
                    return;
                }
                TandemApp.get('socket').emit('bookChatMessage', {
                    bookId: this.get('id'),
                    message: this.get('chatMessage')
                });
                this.set('chatMessage', '');
            },
            init: function () {
                var that = this;
                this.set('chapterObjects', Ember.ArrayController.create({
                    sortProperties: ['number'],
                    sortAscending: true,
                    content: []
                }));
                this.get('chapters').forEach(function (chapter) {
                    chapter.book = that;
                    that.get('chapterObjects.content').pushObject(TandemApp.ChapterModel.create(chapter));
                });
                cache.push(this);
                return this._super();
            },
            displayShortTitle: function() {
                var title = this.get('title');
                if (title.length > 40) {
                    title = title.substring(0, 40) + '...';
                }
                return title;
            }.property('title'),
            background: function() {
                var color = this.get('color') || '#69BFAF';
                return 'background-color:' + color;
            }.property('background'),
            toggleChapter: function () {
                this.set('chaptersOpen', !this.get('chaptersOpen'));
            },
            saveRevision: function() {
                var data = {
                    message: 'Commiting ' + this.get('currentChapterName') + ' by ' + TandemApp.get('author').get('name') +' at ' + new Date(),
                    bookId: this.get('id'),
                    idx: this.get('currentChapter')
                };
                TandemApp.get('socket').emit('saveChapter', data);
            },
            deleteBook: function() {
                var response = confirm('Are you sure you want to delete ' + this.title + '?');
                //Bryce wants it to be _id because he is lazy and that is how it is written on his end
                var data = {};
                data._id = this.get('id');
                if (response) {
                    TandemApp.get('socket').emit('deleteBook', data);
                }
            },
            startEditingChapterByNumber: function (number) {
                var that = this;
                this.get('chapterObjects').forEach(function (chapter, idx) {
                    if (chapter.get('number') == number) {
                        that.startEditingChapterByIndex(idx);
                    }
                });
                this.set('chaptersOpen', false);
            },
            startEditingChapterByIndex: function (idx) {
                TandemApp.get('socket').emit('getChapter', {
                    _id: this.get('id'),
                    idx: idx
                });
                this.set('currentChapter', idx);
            },
            isOwner: function(book) {
                return this.get('owner') === TandemApp.author.get('login');
            }.property('owner'),
            realChapters: function () {
                return this.get('chapterObjects.arrangedContent');
            }.property('chapterObjects.@each.number'),
            currentChapterName: function () {
                return this.get('chapterObjects.content')[this.get('currentChapter')].get('title');
            }.property('currentChapter'),
            revisionList: function () {
                TandemApp.get('socket').emit('getCommits', {bookId: this.get('id')});
            },
            getAllAuthors: function() {
            	return this.get('allAuthors');
            }.property('allAuthors'),
            allAuthorsMonkey: function () {
                var authors = [],
                    chatUsers = this.get('chatUsers'),
                    allAuthors = this.get('allAuthors');

                if (allAuthors) {
                    allAuthors.forEach(function (author) {
                        authors.push(Ember.Object.create({
                            name: author,
                            present: chatUsers.indexOf(author) !== -1
                        }));
                    });
                }
                return authors;

            }.property('allAuthors.@each', 'chatUsers.@each'),
            leaveRoom: function () {
                TandemApp.get('socket').emit('leaveBookRoom', {bookId: this.get('id')});
                top.location.href = '/app/#/';
            }
        });


    TandemApplication.reopen({
        BookModel: Model
    });

    Model.reopenClass({
        find: function (id) {
            if (!listenerAdded) {
                TandemApp.get('socket').on('viewBook', function (bookObj) {
                    bookObj.id = bookObj._id;
                    delete bookObj._id;
                    var book = TandemApp.BookModel.create(bookObj);
                    cache.push(book);
                    promises.forEach(function (promise) {
                        if (promise.id === bookObj.id) {
                            promise.resolve(book);
                        }
                    });
                });
                listenerAdded = true;
            }

            var retval;
            cache.forEach(function(bookObj) {
                if (bookObj.get('id') === id)
                    retval = bookObj;
            });

            if (!retval) {
                var promise = $.Deferred();
                promise.id = id;
                TandemApp.get('socket').emit('getBook', {_id: id});
                promises.push(promise);
                return promise;
            }
            return retval;
        }
    });
})();
