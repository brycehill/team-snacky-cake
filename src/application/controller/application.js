TandemApplication.reopen({
    IndexController: Ember.ArrayController.extend({
        actions: {
            createBook: function() {
                var that = this;
            	var book = {};
            	book.title = this.get('bookName');
            	if (book.title != null) {
                	TandemApp.get('socket').emit('addBook', book);
                    this.set('bookName', '');
             	}
            }
        }
    })
});