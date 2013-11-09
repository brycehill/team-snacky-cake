var TandemApplication = Ember.Application.extend({
    initSocket: function () {
        this.set('socket', io.connect());
    }
});