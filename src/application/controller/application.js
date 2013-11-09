TandemApplication.reopen({
    IndexController: Ember.ArrayController.extend({
        actions: {
            createBook: function() {
                console.log('made it!');
            }
        }
    })
});