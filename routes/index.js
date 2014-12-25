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

  router.delete('/api/season/:id', access.if_logged_in_as_admin(), function (req, res) {
    models.Season.find(req.params.id)
    .then(function(season){
      if (season.dataValues.activated) {
        res.status(400);
        res.json({error:'it is impossible to delete activated season'});
      }
      season.destroy()
      .then(function(){
        res.status(200);
        res.json(season);
      })
      .catch(function(){
        res.status(400);
        res.json({error:'problems on destroying process, please try again later'});
      });
    })
    .catch(function(){
      res.status(400);
      res.json({error:'problems on destroying process, please try again later'});
    });
  });

  router.put('/api/season/:id', access.if_logged_in_as_admin(), function (req, res) {
    if (req.body.activated) {
      models.Season.update({activated:null},{where:{activated:true}})
      .then(function(seasons){
        updateSeason(req,res);
      })
      .catch(function(err){
        console.log(err);
        res.status(400);
        res.json({error:'problems on updation process, please try again later'});
      })
    } else {
      updateSeason(req,res);
    }
  });

function updateSeason(req,res) {
  models.Season.find(req.params.id)
  .then(function(season){
    season.updateAttributes({
      date_started:req.body.date_started,
      date_ended:req.body.date_ended,
      note:req.body.note,
      name:req.body.name,
      activated:req.body.activated
    }).then(function() {
      res.status(200);
      res.json(season);
    })
      .catch(function(){
      res.status(400);
      res.json({error:'problems on activating process, please try again later'});
    });
  })
  .catch(function(){
    res.status(400);
    res.json({error:'problems on activating process, please try again later'});
  });
}


  router.post('/api/tournament', access.if_logged_in_as_admin(), function (req, res) {
      if (req.body.note.length === 0) {
        res.status(400);
        res.json({error:'note should be filled'});
      }
      if (req.body.date.length === 0) { req.body.date=null; }

      models.Season.find({where:{activated:true,location_id:1}
      })
      .then(function(season){
        if (!season){
          res.status(400);
          res.json({error:'tournament cannot be added because no active season'});
        } else {
            models.Tournament.build({
                date:req.body.date,
                note:req.body.note,
                name:req.body.name,
                location_id:req.body.location_id,
                season_id:season.dataValues.id
            }).save()
            .then(function(data){
              res.json(data.dataValues);
            })
            .catch(function(err){
              res.status(400);
              res.json({error:err.message});
            });
          
        }
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
