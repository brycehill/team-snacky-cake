TandemApplication.reopen({
    BookController: Ember.ArrayController.extend({
        content: [],
        init: function() {
            var that = this;
            TandemApp.get('socket').emit('getAllBooks');
            TandemApp.get('socket').on('foundBooks', function(books) {
                books.forEach(function(book) {
                    that.addBook(book);
                })
            });
            TandemApp.get('socket').on('bookAdded', function(book) {
                that.addBook(book);
            });
            TandemApp.get('socket').on('bookDeleted', function(res) {
                if (res._id !== '') {
                    var toDelete = that.get('content').filterProperty('id', res._id);
                    if (toDelete.length > 0) {
                        that.get('content').removeObject(toDelete[0]);
                    }
                }
            });
            TandemApp.get('socket').on('viewChapter', function(chapter) {
                console.log(chapter.contents);
                console.log(that.get('book'));
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
                        console.log(ptxt);
                        that.set('book.chapterContentOld', that.get('book.chapterContentNew'));
                    }
                    setTimeout(updater, 500);
                };

                setTimeout(updater, 500);
            });
        },
        addBook: function(book) {
               book.id = book._id;
            delete book._id;
            this.get('content').pushObject(TandemApp.BookModel.create(book));
        }
    })
});