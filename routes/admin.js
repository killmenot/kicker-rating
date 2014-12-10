var express = require('express');
var passport = require('passport');
var router = express.Router();

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res) {
      res.render('admin/index', { title: 'Admin Home' });
    });

    return router;
};
