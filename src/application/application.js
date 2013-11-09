var TandemApplication = Ember.Application.extend({
    initSocket: function () {
    	var that = this;
        this.set('socket', io.connect());
        this.get('socket').on('setupUser', function(user) {
        	that.set('author', that.AuthorModel.create(user._json));
        });
    }
});