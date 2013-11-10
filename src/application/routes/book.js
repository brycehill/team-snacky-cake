TandemApplication.reopen({
    BookRoute: Ember.Route.extend({
        setupController: function (controller, model) {
            model.set('chaptersOpen', false);
            model.startEditingChapter(0);
            controller.set('book', model);
            var hasBook = false;
            controller.get('content').forEach(function (book) {
                if (book.get('id') === model.get('book')) {
                    hasBook = true;
                }
            });
            if (!hasBook) {
                controller.get('content').pushObject(model);
            }
        }
    })
});