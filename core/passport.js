let passport = require('passport'),
    passportJWT = require('passport-jwt'),
    jwt = require('jsonwebtoken');

module.exports = (app) => {
    let ExtractJwt = passportJWT.ExtractJwt,
        JwtStrategy = passportJWT.Strategy,
        jwtOptions = {};

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    jwtOptions.secretOrKey = 'indexappsecretkey';

    app.use(passport.initialize());
};
