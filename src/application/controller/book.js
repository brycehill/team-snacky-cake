TandemApplication.reopen({
    BookController: Ember.ArrayController.extend({
   		content: [],
   		init: function() {
   			var that = this;
   			TandemApp.get('socket').emit('getAllBooks');
   			TandemApp.get('socket').on('foundBooks', function(books) {
   				books.forEach(function(book) {
                  book.id = book._id;
                  delete book._id;
                  that.get('content').pushObject(TandemApp.BookModel.create(book));
   				})
   			}),
   			TandemApp.get('socket').on('bookAdded', function(book) {
   				book.id = book._id;
                delete book._id;
            	that.get('content').pushObject(TandemApp.BookModel.create(book));
            }),
            TandemApp.get('socket').on('bookDeleted', function(res) {
            	if (res._id !== '') {
            		var toDelete = that.get('content').filterProperty('id', res._id);
            		if (toDelete.length > 0) {
	            		that.get('content').removeObject(toDelete[0]);
	            	}
            	}
            })
   		}
   	})
});