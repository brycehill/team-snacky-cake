TandemApplication.reopen({
	AuthorModel: Ember.Object.extend({
        displayName: function () {
            var value = 'Unnamed';

            value = this.get('company') || value;
            value = this.get('login') || value;
            value = this.get('name') || value;

            return value;
        }.property('name', 'login', 'company'),
        openUp: function () {
            this.set('open', true);
        },
        closeUp: function () {
            this.set('open', false);
        }
	})
});