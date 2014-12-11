var express = require('express');
var passport = require('passport');
var models  = require('../models');
var router = express.Router();

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res) {
      res.render('admin/index', { title: 'Admin Home' });
    });

    router.get('/sync', access.if_logged_in_as_admin(), function (req, res) {
      var force = req.query.hasOwnProperty('force');

      models.sequelize.sync({ force: force }).complete(function (err) {
        if (err) {
          console.error(err);
          res.end('[ ERROR ] Synchronized database');
        } else {
          console.log('[ OK ] Synchronized database');
          res.end('[ OK ] Synchronized database');
        }
      });
    });

    return router;
};
