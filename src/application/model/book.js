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
			colors = ['#A6592D', '#A64029', '#400101', '#A62929', '#57493E', '#E4DDBD', '#A6A38C', '#316481', '#437DA5'];
			background = 'background-color:';
			background += colors[Math.floor(Math.random() * colors.length)];
			return background;
		}.property('background')
	})
});