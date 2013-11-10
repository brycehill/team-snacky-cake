TandemApplication.reopen({
    BookRoute: Ember.Route.extend({
        setupController: function (controller, model) {
            model.set('chaptersOpen', false);
            controller.set('book', model);
        }
    })
});