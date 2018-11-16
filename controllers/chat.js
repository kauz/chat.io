module.exports.controller = (app) => {
    app.get('/chat', function (req, res, next) {
        res.render('chat');
    });
};