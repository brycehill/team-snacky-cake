TandemApplication.reopen({
	BookModel: Ember.Object.extend({
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
		}.property('background')
	})
});