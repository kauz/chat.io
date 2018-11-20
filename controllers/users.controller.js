let User = require('../models/User');

module.exports.controller = (app) => {

    // get all users
    app.get('/users', function (req, res) {
        User.find({}, 'name bio', (err, users) => {
            if (err) {
                console.error(err);
            }
            res.json(users);
        });
    });

    // get single user by id
    app.get('/users/:id', function (req, res) {
        User.findById(req.params.id, 'name bio', (err, user) => {
            if (err) {
                console.error(err);
            }
            res.json(user);
        });
    });

    // add new user
    app.post('/users', function (req, res) {

        let user = new User({
            name: req.body.name,
            email: req.body.email
        });

        user.save((err, data) => {
            if (err) {
                console.error(err);
            }
            res.json(data);
        });
    });

    // update existing user
    app.put('/users/:id', function (req, res) {
        User.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name, email: req.body.email} }, (err, data) => {
           if (err) {console.error(err);}
           res.json(data);
        });
    });

    // delete existing user
    app.delete('/users/:id', function (req, res) {
        User.findByIdAndRemove(req.params.id, (err, data) => {
           if (err) {console.error(err);}
           res.json(data);
        });
    });

};