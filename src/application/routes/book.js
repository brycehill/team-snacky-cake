TandemApplication.reopen({
    BookRoute: Ember.Route.extend({
        setupController: function (controller, model) {
            model.set('chaptersOpen', false);
            model.startEditingChapterByIndex(0);
            controller.set('book', model);
            var hasBook = false;
            controller.get('content').forEach(function (book) {
                if (book.get('id') === model.get('id')) {
                    hasBook = true;
                }
            });
            if (!hasBook) {
                controller.get('content').pushObject(model);
            }

            TandemApp.get('socket').emit('gimmeYerAuthors', {id: model.get('id')});
        }
    })
});