var express = require('express');
var router = express.Router();

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res) {
      res.render('admin/tournaments/index', {
        mainNav: 'admin',
        subNav: 'tournaments',
        title: 'Tournaments list'
      });
    });

    return router;
};
