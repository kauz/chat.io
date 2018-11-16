module.exports.controller = (app) => {
  app.get('/users', function (req, res) {
      res.render('index', {title: 'Users'});
  });
};