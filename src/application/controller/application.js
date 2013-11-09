TandemApplication.reopen({
    IndexController: Ember.ArrayController.extend({
        actions: {
            createBook: function() {
            	var book = {};
            	book.title = this.get('bookName');
            	if (book.title != '') {
                	TandemApp.get('socket').emit('addBook', book);
            	}
            }
        }
    })
});