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



  router.get('/api/season', function (req, res) {
    models.Season.findAll()
    .then(function(seasons) {
      res.json(seasons)
    })
    .catch(function(err){
      res.status(400);
      res.json({error:err.message});
    });
  });

  router.post('/api/season', access.if_logged_in_as_admin(), function (req, res) {
      if (req.body.name.length === 0 && req.body.date_ended.length === 0) {
        res.status(400);
        res.json({error:'name or date ended should be filled'});
      }
      if (req.body.date_ended.length === 0) { req.body.date_ended=null; }
      models.Season.build({
        date_started:req.body.date_started,
        date_ended:req.body.date_ended,
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
