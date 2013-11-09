// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('QGxy2-Aqj_HFjEI2');

//setup Dependencies
var connect = require('connect'),
    express = require('express'),
    socketio = require('socket.io'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    parseCookie = require('connect').utils.parseCookie,
    MemoryStore = express.session.MemoryStore,
    sessionStore = new MemoryStore();


passport.serializeUser(function(user, done) {
      done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: '32a5a6f2539e177a2d34',
        clientSecret: 'b52a62cf75d3bd6371477315a0202a43e465c631',
        callbackURL: "http://localhost:8000/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

mongoose.connect('mongodb://localhost/tandem');

//Setup Express
var isProduction = (process.env.NODE_ENV === 'production'),
    port = (isProduction ? 80 : 8000),
    server = express.createServer();

server.configure(function () {
    server.set('views', __dirname + '/views');
    server.set('view options', {layout: false});
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(connect['static'](__dirname + '/staticfiles'));

    server.use(express.methodOverride());
    server.use(express.session({secret:'monkey man', store: sessionStore, key: 'express.sid'}));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(server.router);
});

//setup the errors
server.error(function (err, req, res, next) {
    if (err instanceof NotFound) {
        res.render('404.jade', {
            locals: {
                title : '404 - Not Found',
                description: '',
                author: '',
                analyticssiteid: 'XXXXXXX'
            },
            status: 404
        });
    } else {
        res.render('500.jade', {
            locals: {
                title : 'The Server Encountered an Error',
                description: '',
                author: '',
                analyticssiteid: 'XXXXXXX',
                error: err
            }, status: 500
        });
    }
});

server.listen(port);
io = socketio.listen(server);

io.set('authorization', function (data, accept) {
    if (data.headers.cookie) {
        data.cookie = parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['express.sid'];
        // (literally) get the session data from the session store
        sessionStore.get(data.sessionID, function (err, session) {
            if (err || !session) {
                // if we cannot grab a session, turn down the connection
                accept('Error', false);
            } else {
                // save the session data and accept the connection
                data.session = session;
                accept(null, true);
            }
        });
    } else {
       return accept('No cookie transmitted.', false);
    }
});

io.sockets.on('connection', function(socket) {
    require('./sockets').init(io, socket);

    console.log('A socket with sessionID ' + socket.handshake.sessionID + ' connected!');
});

server.get('/', function (req, res) {
    res.render('index.jade', {
        locals : {
            title : 'Tandem :: Co-Authoring Done Right',
            description: 'Your Page Description',
            author: 'Your Name',
            analyticssiteid: 'XXXXXXX'
        }
    });
});

var Author = require('./models/Author');

server.get('/app', function (req, res) {
    if (!req.session.passport.user) {
        res.redirect('/login');
    } else {
        Author.findOne({name: req.user.username}, function (u) {
            if (!u) {
                var u = new Author({name: req.user.username});
                u.save();
            }

            res.render('app.jade', {
                locals : {
                    title : 'Your Page Title',
                    uid: u._id.toString(),
                    description: 'Your Page Description',
                    author: 'Your Name',
                    analyticssiteid: 'XXXXXXX'
                }
            });
        });
    }
});


server.get('/login', passport.authenticate('github'));

server.get('/callback', passport.authenticate('github', {
    failureRedirect: '/login'
}),
function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/app');
});

server.get('/logout', function (req, res) {
    req.logout();
    delete req.session;
    res.redirect('/');
});


//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function (req, res) {
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function (req, res) {
    throw new NotFound();
});

function NotFound (msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://localhost:' + port);



// http.createServer(function (req, res) {
//   // http://blog.nodeknockout.com/post/35364532732/protip-add-the-vote-ko-badge-to-your-app
//   var voteko = '<iframe src="http://nodeknockout.com/iframe/team-snacky-cake" frameborder=0 scrolling=no allowtransparency=true width=115 height=25></iframe>';

//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('<html><body>' + voteko + '</body></html>\n');
// }).listen(port, function(err) {
//   if (err) { console.error(err); process.exit(-1); }

//   // if run as root, downgrade to the owner of this file
//   if (process.getuid() === 0) {
//     require('fs').stat(__filename, function(err, stats) {
//       if (err) { return console.error(err); }
//       process.setuid(stats.uid);
//     });
//   }

//   console.log('Server running at http://0.0.0.0:' + port + '/');
// });
