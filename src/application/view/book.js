TandemApplication.reopen({
    BookView: TandemApplication.BaseView.extend({
        init: function () {
            this._super();
        },
        templateName: 'book'
    })
});