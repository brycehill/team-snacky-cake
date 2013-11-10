(function () {

    var cache = [],
        promises = [],
        listenerAdded = false,
        Model = Ember.Object.extend({
            init: function () {
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
            deleteBook: function() {
            	var response = confirm('Are you sure you want to delete ' + this.title + '?');
            	//Bryce wants it to be _id because he is lazy and that is how it is written on his end
            	var data = {}
            	data._id = this.get('id');
            	if (response) {
            		TandemApp.get('socket').emit('deleteBook', data);
            	}
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
