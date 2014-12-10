var express = require('express');
var passport = require('passport');
var router = express.Router();

module.exports = function () {
  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
  });

  router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/admin', failureRedirect: '/login' }));

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
