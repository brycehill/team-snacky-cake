TandemApplication.reopen({
	BookModel: Ember.Object.extend({
		displayAuthor: function() {
			return '1234';
		}.property('author')
	})
});