var express = require('express');
var router = express.Router();
var models  = require('../models');
var _ = require('underscore');

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res) {
      res.render('admin/seasons/index', { title: 'Seasons list' });
    });

    router.get('/create', access.if_logged_in_as_admin(), function (req, res) {
      res.render('admin/seasons/create', {
        title: 'Create a new season',
        errors: {},
        values: {}
      });
    });

    router.post('/create', access.if_logged_in_as_admin(), function (req, res) {
      // find default location
      models.Location.find({where: {name: 'Taganrog'}}).then(function (location) {
        // create new season
        models.Season.create({
          name: req.body.name,
          date_started: req.body.date_started,
          date_ended: req.body.date_ended,
          note: req.body.note,
          location_id: location.id
        }).then(function (season) {
          // redirect to seasons list
          req.flash('success', 'The season was added')
          res.redirect('/admin/seasons');
        }).catch(models.Sequelize.ValidationError, function (err) {
          // show errors
          res.render('admin/seasons/create', {
            title: 'Create a new season',
            values: req.body,
            errors: _.object(_.map(err.errors, function (error) { return [error.path, error]; }))
          });
        });
      });
      
    });

    return router;
};
