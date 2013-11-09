var SocketIO = {

	init: function() {
		SocketIO.socket = io.connect();
		SocketIO.socket.on('displayBook', SocketIO.displayBook);
	},

	
	displayBook: function(data) {
		//do a thing in ember to display the book content
	}

};
/**
var Book = {
	init: function() {
		$('#addBook').click(function(e) {
			var book = {};
			book.title = $('#bookName').val();
			book.path = '/home/micah/bookrepo/'
			alert('anything????');
			SocketIO.emit('addBook', book);
		})
	}
};
**/
$(document).ready(function() {
	SocketIO.init();
});
