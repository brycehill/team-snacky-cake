TandemApplication.reopen({
    BookController: Ember.ArrayController.extend({
   		content: [],
   		init: function() {
   			var that = this;
   			TandemApp.get('socket').emit('getAllBooks');
   			TandemApp.get('socket').on('foundBooks', function(books) {
   				books.forEach(function(book) {
   					that.get('content').pushObject(TandemApp.BookModel.create(book));
   				})
   			}),
   			TandemApp.get('socket').on('bookAdded', function(book) {
            	that.get('content').pushObject(TandemApp.BookModel.create(book));
            })
   		}
   	})
});