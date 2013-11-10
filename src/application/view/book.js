TandemApplication.reopen({
    BookView: TandemApplication.BaseView.extend({
        init: function () {
            console.log('view init');
            this._super();
        },
        templateName: 'book'
    })
});