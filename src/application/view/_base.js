TandemApplication.BaseView = Ember.View.extend({
    didInsertElement: function () {
        this.$().hide();
        this.$().fadeIn();
        return this._super();
    }
});