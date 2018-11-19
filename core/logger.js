let logger = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    rfs = require('rotating-file-stream');

let logDirectory = path.join(__dirname, '../log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
let accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

module.exports = (app) => {
    // log all requests to access.log
    app.use(logger('combined', {stream: accessLogStream}));

    // log only 4xx and 5xx responses to console
    app.use(logger('dev', {
        skip: function (req, res) { return res.statusCode < 400 }
    }));

};