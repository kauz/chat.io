let cookieParser = require('cookie-parser'),
    createError = require('http-errors'),
    express = require('express'),
    fs = require('fs'),
    logger = require('./core/logger'),
    mongoose = require('mongoose'),
    path = require('path'),
    sassMiddleware = require('node-sass-middleware');

let app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);


http.listen(3001);

// fix console warning - DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
mongoose.set('useFindAndModify', false);
// connect to mongo db
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Connection Succeeded");
});

// Web Sockets events
io.on('connection', (socket) => {

    io.emit('user connected');

    console.log('A user connected.');

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

logger(app);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));


// Include controllers
fs.readdirSync('controllers').forEach((file) => {
    if (file.substr(-3) === '.js') {
        let route = require('./controllers/' + file);
        route.controller(app);
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
