Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,h="";return b.buffer.push('\n            <div class="backdrop" '),e={target:a},f={target:"STRING"},b.buffer.push(l(c.action.call(a,"closeUp",{hash:{target:"TandemApp.author"},contexts:[a],types:["ID"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push('></div>\n            <div class="userbox">\n                <img '),e={src:a},f={src:"STRING"},b.buffer.push(l(c.bindAttr.call(a,{hash:{src:"TandemApp.author.avatar_url"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push(' width="80" height="80">\n                <p>\n                    <strong>'),f={},e={},b.buffer.push(l(c._triageMustache.call(a,"TandemApp.author.displayName",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push("</strong><br>\n                    "),f={},e={},d=c["if"].call(a,"TandemApp.author.email",{hash:{},inverse:m.noop,fn:m.program(2,g,b),contexts:[a],types:["ID"],hashContexts:e,hashTypes:f,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push('\n                    <a href="/logout">Logout</a>\n                </p>\n            </div>\n        '),h}function g(a,b){var d,e,f="";return b.buffer.push("\n                        "),d={},e={},b.buffer.push(l(c._triageMustache.call(a,"TandemApp.author.email",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("<br>\n                    "),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var h,i,j,k="",l=this.escapeExpression,m=this;return e.buffer.push('<header>\n    <div class="container">\n        <img src="/assets/img/logo_md.png" style="margin-right:20px;float:left;">\n        <h2>\n            Tandem\n        </h2>\n        <h4>\n            Collaborative Writing '),e.buffer.push('\n        </h4>\n        <a href="javascript:;" class="userboxanchor" '),i={target:b},j={target:"STRING"},e.buffer.push(l(c.action.call(b,"openUp",{hash:{target:"TandemApp.author"},contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e}))),e.buffer.push(">&gt; "),j={},i={},e.buffer.push(l(c._triageMustache.call(b,"TandemApp.author.displayName",{hash:{},contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e}))),e.buffer.push("</a>\n        "),j={},i={},h=c["if"].call(b,"TandemApp.author.open",{hash:{},inverse:m.noop,fn:m.program(1,f,e),contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n    </div>\n</header>\n\n<div class=\"container\">\n<div class='error text-danger'>"),j={},i={},e.buffer.push(l(c._triageMustache.call(b,"TandemApp.error",{hash:{},contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e}))),e.buffer.push("</div>\n"),j={},i={},e.buffer.push(l(c._triageMustache.call(b,"outlet",{hash:{},contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e}))),e.buffer.push("\n\n</div>"),k}),Ember.TEMPLATES.book=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f="";return b.buffer.push('\n            <tr>\n                <td><div style="width:245px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">\n                    <a href="javascript:;" '),d={target:a},e={target:"STRING"},b.buffer.push(o(c.action.call(a,"editChapter",{hash:{target:"chapter"},contexts:[a],types:["ID"],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push(" "),d={title:a},e={title:"STRING"},b.buffer.push(o(c.bindAttr.call(a,{hash:{title:"chapter.title"},contexts:[],types:[],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push(">\n                        "),e={},d={},b.buffer.push(o(c._triageMustache.call(a,"chapter.title",{hash:{},contexts:[a],types:["ID"],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push("\n                    </a>\n                </div></td>\n            </tr>\n        "),f}function g(a,b){var d,e,f="";return b.buffer.push("\n                "),d={},e={},b.buffer.push(o(c._triageMustache.call(a,"chat.userName",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push(" > "),d={},e={},b.buffer.push(o(c._triageMustache.call(a,"chat.message",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("<br>\n            "),f}function h(a,b){var d,e,f="";return b.buffer.push("\n                <li>"),d={},e={},b.buffer.push(o(c._triageMustache.call(a,"author",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("</li>\n            "),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var i,j,k,l,m,n="",o=this.escapeExpression,p=c.helperMissing,q=this;return e.buffer.push('<br>\n<a href="#/">Book List</a> | '),k={},l={},e.buffer.push(o(c._triageMustache.call(b,"controller.book.title",{hash:{},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push(" ... "),k={},l={},e.buffer.push(o(c._triageMustache.call(b,"controller.book.currentChapterName",{hash:{},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push('\n<br><br>\n\n\n<div id="chapterlist" '),l={"class":b},k={"class":"STRING"},e.buffer.push(o(c.bindAttr.call(b,{hash:{"class":"controller.book.chaptersOpen:chaptersOpen:chaptersClose"},contexts:[],types:[],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push(">\n    <form "),l={on:b},k={on:"STRING"},e.buffer.push(o(c.action.call(b,"createChapter",{hash:{on:"submit"},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push(' style="margin-top:3px;">\n        <div class="container">\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-book-form">\n            <div class="input-group">\n                    '),l={value:b,type:b,"class":b,placeholder:b},k={value:"ID",type:"STRING","class":"STRING",placeholder:"STRING"},m={hash:{value:"controller.newChapterTitle",type:"text","class":"form-control",placeholder:"New Chapter Title"},contexts:[],types:[],hashContexts:l,hashTypes:k,data:e},e.buffer.push(o((i=c.input||b.input,i?i.call(b,m):p.call(b,"input",m)))),e.buffer.push('\n                    <span class="input-group-btn">\n                        <button id="addChapter" class=\'btn btn-default\' type=\'submit\'>Create</button>\n                    </span>\n            </div>\n        </div>\n        </div>\n    </form>\n\n\n    <div class="scrollingchapters">\n        <table cellspacing="0" cellpadding="0" border="0">\n        '),k={},l={},j=c.each.call(b,"chapter","in","controller.book.realChapters",{hash:{},inverse:q.noop,fn:q.program(1,f,e),contexts:[b,b,b],types:["ID","ID","ID"],hashContexts:l,hashTypes:k,data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push('\n        </table>\n    </div>\n    <div class="holder">\n        <div class="tabbie">\n            <div '),l={target:b},k={target:"STRING"},e.buffer.push(o(c.action.call(b,"toggleChapter",{hash:{target:"controller.book"},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push('>\n                chapterlist\n            </div>\n        </div>\n    </div>\n</div>\n<div class="col-lg-8 col-md-9 col-sm-9 col-xs-9">\n    '),l={valueBinding:b},k={valueBinding:"STRING"},e.buffer.push(o(c.view.call(b,"Ember.TextArea",{hash:{valueBinding:"controller.book.chapterContentNew"},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push("\n    <div class='live-diff pull-left'>\n        <h4 class='pull-left' >Recent Edits</h4>\n        <a id='save-revision-link' class='pull-right' href='#' "),l={target:b},k={target:"STRING"},e.buffer.push(o(c.action.call(b,"saveRevision",{hash:{target:"controller.book"},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push('>Save Revision</a>\n        <div class=\'clearfix\'></div>\n        <hr>\n        <div id=\'diff\'></div>\n    </div>\n</div>\n<div class="col-lg-4 col-md-3 col-sm-3 col-xs-3 sidebar">\n    <div class="sidebar-chat">\n        <h4>Book Chat</h4>\n\n        <div class="chatMessages">\n            '),k={},l={},j=c.each.call(b,"chat","in","controller.book.chatMessages",{hash:{},inverse:q.noop,fn:q.program(3,g,e),contexts:[b,b,b],types:["ID","ID","ID"],hashContexts:l,hashTypes:k,data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n        </div>\n\n\n        <form "),l={target:b,on:b},k={target:"STRING",on:"STRING"},e.buffer.push(o(c.action.call(b,"sendChatMessage",{hash:{target:"controller.book",on:"submit"},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push('>\n            <div class="input-group">\n                '),l={value:b,type:b,"class":b,placeholder:b},k={value:"ID",type:"STRING","class":"STRING",placeholder:"STRING"},m={hash:{value:"controller.book.chatMessage",type:"text","class":"form-control",placeholder:"Chat message..."},contexts:[],types:[],hashContexts:l,hashTypes:k,data:e},e.buffer.push(o((i=c.input||b.input,i?i.call(b,m):p.call(b,"input",m)))),e.buffer.push('\n                <span class="input-group-btn">\n                    <button id="ChatFieldBtn" class=\'btn btn-default\' type=\'submit\'>Send</button>\n                </span>\n            </div>\n        </form>\n    </div>\n    <div class="sidebar-form">\n        <h4>Current Authors</h4>\n        <div class="allAuthors">\n            <ul>\n            '),k={},l={},j=c.each.call(b,"author","in","controller.book.allAuthors",{hash:{},inverse:q.noop,fn:q.program(5,h,e),contexts:[b,b,b],types:["ID","ID","ID"],hashContexts:l,hashTypes:k,data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n            </ul>\n        </div>\n        <form "),l={on:b},k={on:"STRING"},e.buffer.push(o(c.action.call(b,"addCoAuthor",{hash:{on:"submit"},contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}))),e.buffer.push('>\n            <div class="input-group">\n                '),l={value:b,type:b,"class":b,placeholder:b},k={value:"ID",type:"STRING","class":"STRING",placeholder:"STRING"},m={hash:{value:"controller.newCoAuthor",type:"text","class":"form-control",placeholder:"New Co-Author"},contexts:[],types:[],hashContexts:l,hashTypes:k,data:e},e.buffer.push(o((i=c.input||b.input,i?i.call(b,m):p.call(b,"input",m)))),e.buffer.push("\n                <span class=\"input-group-btn\">\n                    <button id=\"addChapter\" class='btn btn-default' type='submit'>Add</button>\n                </span>\n            </div>\n        </form>\n    </div>\n</div>\n\n\n"),n}),Ember.TEMPLATES.index=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,i,j,k="";return b.buffer.push("\n		    "),b.buffer.push("\n		    <li>\n		    	<figure class='book'>\n					<!-- Front -->\n\n					<ul class='hardcover_front'>\n						<li>\n							<div class=\"coverDesign\" "),f={style:a},i={style:"STRING"},b.buffer.push(q(c.bindAttr.call(a,{hash:{style:"book.background"},contexts:[],types:[],hashContexts:f,hashTypes:i,data:b}))),b.buffer.push('>\n								<span class="ribbon" style="display:none;">NEW</span>\n								<h1>'),i={},f={},b.buffer.push(q(c._triageMustache.call(a,"book.displayShortTitle",{hash:{},contexts:[a],types:["ID"],hashContexts:f,hashTypes:i,data:b}))),b.buffer.push("</h1>\n								<p>by: "),i={},f={},b.buffer.push(q(c._triageMustache.call(a,"book.owner",{hash:{},contexts:[a],types:["ID"],hashContexts:f,hashTypes:i,data:b}))),b.buffer.push("</p>\n							</div>\n						</li>\n						<li></li>\n					</ul>\n\n					<!-- Pages -->\n\n					<ul class='page'>\n						<li></li>\n						<li>\n							"),f={"class":a},i={"class":"STRING"},j={hash:{"class":"btn"},inverse:r.noop,fn:r.program(2,g,b),contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:i,data:b},d=c.linkTo||a.linkTo,e=d?d.call(a,"book","book",j):s.call(a,"linkTo","book","book",j),(e||0===e)&&b.buffer.push(e),b.buffer.push("\n							"),i={},f={},e=c["if"].call(a,"book.isOwner",{hash:{},inverse:r.noop,fn:r.program(4,h,b),contexts:[a],types:["ID"],hashContexts:f,hashTypes:i,data:b}),(e||0===e)&&b.buffer.push(e),b.buffer.push('\n							<a href="#" class="btn" '),f={target:a},i={target:"STRING"},b.buffer.push(q(c.action.call(a,"revisionList",{hash:{target:"book"},contexts:[a],types:["ID"],hashContexts:f,hashTypes:i,data:b}))),b.buffer.push(">Revisions</a>\n						</li>\n						<li></li>\n						<li></li>\n						<li></li>\n					</ul>\n\n					<!-- Back -->\n\n					<ul class='hardcover_back'>\n						<li></li>\n						<li></li>\n					</ul>\n					<ul class='book_spine'>\n						<li></li>\n						<li></li>\n					</ul>\n				</figure>\n			</li>\n					\n		"),k}function g(a,b){b.buffer.push("\n								Edit\n							")}function h(a,b){var d,e,f="";return b.buffer.push('\n								<a class="btn" href="#" '),d={target:a},e={target:"STRING"},b.buffer.push(q(c.action.call(a,"deleteBook",{hash:{target:"book"},contexts:[a],types:["ID"],hashContexts:d,hashTypes:e,data:b}))),b.buffer.push(">Delete</a>\n							"),f}function i(a,b){var d,e,f,g="";return b.buffer.push('\n	<div class="backdrop" '),e={target:a},f={target:"STRING"},b.buffer.push(q(c.action.call(a,"closeUp",{hash:{target:"TandemApp.author"},contexts:[a],types:["ID"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push('></div>\n	<div id="revisions_list">\n		<h1>Revisions</h1>\n		<div class="scrollie">\n	        <table cellspacing="0" cellpadding="0" border="0">\n	        '),f={},e={},d=c.each.call(a,"commit","in","controller.books.commitLog",{hash:{},inverse:r.noop,fn:r.program(7,j,b),contexts:[a,a,a],types:["ID","ID","ID"],hashContexts:e,hashTypes:f,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push('\n	        </table><br><br>\n	        <div style="text-align: center;">\n	        	<input type="button" value="Close" '),e={target:a},f={target:"STRING"},b.buffer.push(q(c.action.call(a,"closeRevisions",{hash:{target:"controller.books"},contexts:[a],types:["ID"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push(">\n	        </div>\n		</div>\n	</div>\n"),g}function j(a,b){var d,e,f="";return b.buffer.push("\n	            <tr>\n	            	<td>"),d={},e={},b.buffer.push(q(c._triageMustache.call(a,"commit.shortid",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push('&nbsp;</td>\n	                <td><div style="width:310px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">\n	                    <div '),e={title:a},d={title:"STRING"},b.buffer.push(q(c.bindAttr.call(a,{hash:{title:"chapter.title"},contexts:[],types:[],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push(">\n	                        "),d={},e={},b.buffer.push(q(c._triageMustache.call(a,"commit.message",{hash:{},contexts:[a],types:["ID"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push("\n	                    </div>\n	                </div></td>\n	            </tr>\n	        "),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var k,l,m,n,o,p="",q=this.escapeExpression,r=this,s=c.helperMissing;return e.buffer.push("\n<form "),m={on:b},n={on:"STRING"},e.buffer.push(q(c.action.call(b,"createBook",{hash:{on:"submit"},contexts:[b],types:["ID"],hashContexts:m,hashTypes:n,data:e}))),e.buffer.push('>\n	<div class="col-md-6 col-sm-6 col-xs-6 add-book-form">\n	    <div class="input-group">\n		        '),m={value:b,type:b,"class":b,placeholder:b},n={value:"ID",type:"STRING","class":"STRING",placeholder:"STRING"},o={hash:{value:"bookName",type:"text","class":"form-control",placeholder:"New Book Title"},contexts:[],types:[],hashContexts:m,hashTypes:n,data:e},e.buffer.push(q((k=c.input||b.input,k?k.call(b,o):s.call(b,"input",o)))),e.buffer.push('\n		        <span class="input-group-btn">\n		            <button id="addBook" class=\'btn btn-default\' type=\'submit\'>Create</button>\n		        </span>\n	    </div>\n	</div>\n</form>\n\n\n\n\n\n\n<div class="bookList">\n    <h3>Works in Progress:</h3>\n    <ul class="align">\n		'),n={},m={},l=c.each.call(b,"book","in","controller.books.content",{hash:{},inverse:r.noop,fn:r.program(1,f,e),contexts:[b,b,b],types:["ID","ID","ID"],hashContexts:m,hashTypes:n,data:e}),(l||0===l)&&e.buffer.push(l),e.buffer.push("\n	</ul>\n</div>\n\n"),n={},m={},l=c["if"].call(b,"controller.books.commitLog",{hash:{},inverse:r.noop,fn:r.program(6,i,e),contexts:[b],types:["ID"],hashContexts:m,hashTypes:n,data:e}),(l||0===l)&&e.buffer.push(l),e.buffer.push("\n"),p}),Ember.TEMPLATES.monkey=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{},e.buffer.push("<h1>MONKEY</h1>")});var TandemApplication=Ember.Application.extend({initSocket:function(){var a=this;this.set("socket",io.connect()),this.get("socket").on("setupUser",function(b){a.set("author",a.AuthorModel.create(b._json))}),this.get("socket").on("error",function(b){a.set("error",b.message)})}});Ember.LinkView.reopen({attributeBindings:["style"]}),TandemApplication.reopen({IndexController:Ember.ArrayController.extend({actions:{createBook:function(){var a={};a.title=this.get("bookName"),null!=a.title&&(TandemApp.get("socket").emit("addBook",a),this.set("bookName",""))}}})}),TandemApplication.reopen({BookController:Ember.ArrayController.extend({content:[],commitLog:[],intervalID:!1,init:function(){var a=this;TandemApp.get("socket").emit("getAllBooks"),TandemApp.get("socket").on("foundBooks",function(b){b.forEach(function(b){a.addBook(b)})}),TandemApp.get("socket").on("bookAdded",function(b){a.addBook(b)}),TandemApp.get("socket").on("bookCommits",function(b){b.data.commits.forEach(function(a){a.shortid=a.id.substr(0,4)+"..."}),a.set("commitLog",b.data.commits)}),TandemApp.get("socket").on("bookDeleted",function(b){if(""!==b._id){var c=a.get("content").filterProperty("id",b._id);c.length>0&&a.get("content").removeObject(c[0])}}),TandemApp.get("socket").on("chapterCreated",function(b){a.get("content").forEach(function(a){if(a.get("id")===b._id){var c=TandemApp.ChapterModel.create({book:a,title:b.title,number:b.idx});a.get("chapterObjects").pushObject(c)}})}),TandemApp.get("socket").on("viewChapter",function(b){a.set("book.chapterContentOld",b.contents),a.set("book.chapterContentNew",b.contents);var c=function(){var b=new diff_match_patch,d=b.patch_make(a.get("book.chapterContentOld"),a.get("book.chapterContentNew")),e=b.patch_toText(d);e.length&&(TandemApp.get("socket").emit("updateChapter",{_id:a.get("book.id"),idx:a.get("book.currentChapter"),diff:e}),a.set("book.chapterContentOld",a.get("book.chapterContentNew"))),setTimeout(c,500)};setTimeout(c,500)}),TandemApp.get("socket").on("allAuthors",function(b){var c=[];b.forEach(function(a){c.push(a.username)}),a.set("book.allAuthors",c)}),TandemApp.get("socket").on("coAuthorAdded",function(b){var c=" <small>can now work on this book!</small><br /><small>They can now access this book from their home screen</small>",d=b.username+c;a.get("book.allAuthors").pushObject(d)}),TandemApp.get("socket").on("chapterSaved",function(a){var b=a.fullDiff,c=$("#diff");c.empty(),tmp=b.split("<br>"),newDiff=tmp.map(function(a){return"+"==a.charAt()?"<span class='addition'>"+a+"</span>":"-"==a.charAt()?"<span class='subtraction'>"+a+"</span>":a}),c.append(newDiff).scrollTop(c[0].scrollHeight)})},addBook:function(a){a.id=a._id,delete a._id,this.get("content").pushObject(TandemApp.BookModel.create(a))},actions:{createChapter:function(){null!=this.get("newChapterTitle")&&(TandemApp.get("socket").emit("addChapter",{_id:this.get("book.id"),title:this.get("newChapterTitle")}),this.set("newChapterTitle",""))},addCoAuthor:function(){null!=this.get("newCoAuthor")&&(TandemApp.get("socket").emit("addCoAuthor",{_id:this.get("book.id"),coAuthor:this.get("newCoAuthor")}),this.set("newCoAuthor",""))},closeRevisions:function(){this.set("commitLog",[])}}})}),TandemApplication.reopen({AuthorModel:Ember.Object.extend({displayName:function(){var a="Unnamed";return a=this.get("company")||a,a=this.get("login")||a,a=this.get("name")||a}.property("name","login","company"),openUp:function(){this.set("open",!0)},closeUp:function(){this.set("open",!1)}})}),function(){var a=[],b=[],c=!1,d=Ember.Object.extend({chapterContentOld:"",chapterContentNew:"Loading...",chapterObjects:null,chatMessages:[],sendChatMessage:function(){if(0!==this.get("chatMessage").trim().length){Ember.run.begin(),TandemApp.get("socket").emit("bookChatMessage",{bookId:this.get("id"),message:this.get("chatMessage")}),this.get("chatMessages").pushObject(Ember.Object.create({userName:"Rodil",message:this.get("chatMessage")})),this.set("chatMessage",""),Ember.run.end();var a=$(".chatMessages");a.scrollTop(a[0].scrollHeight)}},init:function(){var b=this;return this.set("chapterObjects",Ember.ArrayController.create({sortProperties:["number"],sortAscending:!0,content:[]})),this.get("chapters").forEach(function(a){a.book=b,b.get("chapterObjects.content").pushObject(TandemApp.ChapterModel.create(a))}),a.push(this),this._super()},displayShortTitle:function(){var a=this.get("title");return a.length>40&&(a=a.substring(0,40)+"..."),a}.property("title"),background:function(){var a=this.get("color")||"#69BFAF";return"background-color:"+a}.property("background"),toggleChapter:function(){this.set("chaptersOpen",!this.get("chaptersOpen"))},saveRevision:function(){var a={message:"this is my commit message",bookId:this.get("id")};TandemApp.get("socket").emit("saveChapter",a)},deleteBook:function(){var a=confirm("Are you sure you want to delete "+this.title+"?"),b={};b._id=this.get("id"),a&&TandemApp.get("socket").emit("deleteBook",b)},startEditingChapterByNumber:function(a){var b=this;this.get("chapterObjects").forEach(function(c,d){c.get("number")==a&&b.startEditingChapterByIndex(d)}),this.set("chaptersOpen",!1)},startEditingChapterByIndex:function(a){TandemApp.get("socket").emit("getChapter",{_id:this.get("id"),idx:a}),this.set("currentChapter",a)},isOwner:function(){return this.get("owner")===TandemApp.author.get("login")}.property("owner"),realChapters:function(){return this.get("chapterObjects.arrangedContent")}.property("chapterObjects.@each.number"),currentChapterName:function(){return this.get("chapterObjects.content")[this.get("currentChapter")].get("title")}.property("currentChapter"),revisionList:function(){TandemApp.get("socket").emit("getCommits",{bookId:this.get("id")})},getAllAuthors:function(){return this.get("allAuthors")}.property("allAuthors")});TandemApplication.reopen({BookModel:d}),d.reopenClass({find:function(d){c||(TandemApp.get("socket").on("viewBook",function(c){c.id=c._id,delete c._id;var d=TandemApp.BookModel.create(c);a.push(d),b.forEach(function(a){a.id===c.id&&a.resolve(d)})}),c=!0);var e;if(a.forEach(function(a){a.get("id")===d&&(e=a)}),!e){var f=$.Deferred();return f.id=d,TandemApp.get("socket").emit("getBook",{_id:d}),b.push(f),f}return e}})}(),TandemApplication.reopen({ChapterModel:Ember.Object.extend({book:null,number:null,title:null,editChapter:function(){this.get("book").startEditingChapterByNumber(this.get("number"))}})}),TandemApplication.reopen({BookRoute:Ember.Route.extend({setupController:function(a,b){b.set("chaptersOpen",!1),b.startEditingChapterByIndex(0),a.set("book",b);var c=!1;a.get("content").forEach(function(a){a.get("id")===b.get("id")&&(c=!0)}),c||a.get("content").pushObject(b),TandemApp.get("socket").emit("gimmeYerAuthors",{id:b.get("id")})}})}),TandemApplication.reopen({IndexRoute:Ember.Route.extend({setupController:function(a){a.set("books",this.controllerFor("book"))}})}),TandemApplication.BaseView=Ember.View.extend({didInsertElement:function(){return this.$().hide(),this.$().fadeIn(),this._super()}}),TandemApplication.reopen({ApplicationView:TandemApplication.BaseView.extend({templateName:"application"})}),TandemApplication.reopen({BookView:TandemApplication.BaseView.extend({init:function(){this._super()},templateName:"book"})}),TandemApplication.reopen({IndexView:TandemApplication.BaseView.extend({templateName:"index"})});var TandemApp=TandemApplication.create({});TandemApp.Router.map(function(){this.resource("book",{path:"/:book_id"})}),TandemApp.initSocket();