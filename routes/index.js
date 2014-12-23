var express = require('express');
var passport = require('passport');
var router = express.Router();
var models  = require('../models');

module.exports = function (access) {
  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
  });


  router.post('/api/season', access.if_logged_in_as_admin(), function (req, res) {
      if (req.body.name.length === 0 && req.body.end.length === 0) {
        res.status(400);
        res.json({error:'name or date ended should be filled'});
      }
      if (req.body.end.length === 0) { req.body.end=null; }
      models.Season.build({
        date_started:req.body.start,
        date_ended:req.body.end,
        note:req.body.note,
        name:req.body.name
      }).save()
      .then(function(data){
        res.json(data.dataValues);
      })
      .catch(function(err){
        res.status(400);
        res.json({error:err.message});
      });
  });


  router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/admin', failureRedirect: '/login' }));

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
