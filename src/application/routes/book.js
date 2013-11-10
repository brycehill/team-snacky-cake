TandemApplication.reopen({
    BookRoute: Ember.Route.extend({
        setupController: function (controller, model) {
            controller.set('book', model);
        }
        // model: function (params) {
        //     var promise = $.Deferred();

        //     promise.resolve([{title: 'Monkey', id: '527e8328a42ea36868000001'}]);
        //     console.log(arguments);
        //     // return {
        //     //   title: "Tomster",
        //     //   url: "http://emberjs.com/images/about/ember-productivity-sm.png"
        //     // };

        //     return promise;
        // }
    })
});