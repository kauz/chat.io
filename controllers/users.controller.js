let User = require('../models/User');

module.exports.controller = (app) => {

    // get all users
    app.get('/users', function (req, res) {

        let limitFilter = req.query.limit && parseInt(req.query.limit);
        let offsetFilter = req.query.offset && parseInt(req.query.offset);

        User.find({}, 'name email', (err, users) => {
            if (err) {
                res.status(400).json(err);
            }

            if (offsetFilter || limitFilter) {
                const start = offsetFilter ? offsetFilter : 0;
                console.log(start);
                const end = limitFilter > 0 ? start + limitFilter : undefined;
                users = users.slice(start, end);
            }

            res.json(users);
        });
    });

    // get single user by id
    app.get('/users/:id', function (req, res) {
        User.findById(req.params.id, 'name email', (err, user) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(user);
        });
    });

    // add new user
    app.post('/users', function (req, res) {

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        User.createUser(user, (err, data) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(data);
        });
    });

    // update existing user
    app.put('/users/:id', function (req, res) {
        User.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name, email: req.body.email} }, (err, data) => {
           if (err) {res.status(400).json(err);}
           res.json(data);
        });
    });

    // delete existing user
    app.delete('/users/:id', function (req, res) {
        User.findByIdAndRemove(req.params.id, (err, data) => {
           if (err) {res.status(400).json(err);}
           res.json(data);
        });
    });

};
