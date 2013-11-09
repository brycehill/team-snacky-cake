TandemApplication.reopen({
    IndexController: Ember.ArrayController.extend({
        actions: {
        	init: function() {
        		TandemApp.get('socket').emit('gimmeYerBooks');
        	},
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