var TandemApp = TandemApplication.create({});

TandemApp.Router.map(function () {
    this.resource("book", { path: "/:book_id" });

});

TandemApp.initSocket();