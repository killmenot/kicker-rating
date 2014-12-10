var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


module.exports = function (app) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            done(null, {id: 1});
            // User.findOne({
            //     username: username
            // }, function (err, user) {
            //     if (err) {
            //         return done(err);
            //     }
            //     if (!user) {
            //         return done(null, false, {
            //             message: 'Incorrect username.'
            //         });
            //     }
            //     if (!user.validPassword(password)) {
            //         return done(null, false, {
            //             message: 'Incorrect password.'
            //         });
            //     }
            //     return done(null, user);
            // });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
        done(null, {id: 1});
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.requireauth = function (req, res, done) {

    };
};