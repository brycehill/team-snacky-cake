TandemApplication.reopen({
    IndexRoute: Ember.Route.extend({
        setupController: function(controller, books) {
        	controller.set('model', books);
        }
    })
});