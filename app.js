let cookieParser = require('cookie-parser'),
    createError = require('http-errors'),
    express = require('express'),
    fs = require('fs'),
    settings = require('./core/settings'),
    initDB = require('./core/mogoose'),
    initLogger = require('./core/logger'),
    initSockets = require('./core/sockets'),
    path = require('path'),
    sassMiddleware = require('node-sass-middleware');

let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

settings();
initDB();
initSockets(app);
initLogger(app);

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
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
