var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models');



module.exports = function (app) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
          models.User.find({ where: {username: username} })
            .then(function (user) {
              if (!user || !user.validate_password(password)) {
                return done(null, false, {message: 'Incorrect username or password'});
              }
              done(null, user);
            })
            .catch(function (err) {
              done(err);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      models.User.find(id)
        .then(function (user) {
          done(null, user);
        })
        .catch(function (err) {
          done(err);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
};
