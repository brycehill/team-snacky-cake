TandemApplication.reopen({
    ChapterModel: Ember.Object.extend({
        book: null,
        number: null,
        title: null,
        editChapter: function () {
            this.get('book').startEditingChapterByNumber(this.get('number'));
        }
    })
});