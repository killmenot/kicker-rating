var express = require('express');
var router = express.Router();
var db = require('../models');

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res) {
        res.render('admin/index', {
            title: 'Admin Home'
        });
    });

    router.get('/sync', access.if_logged_in_as_admin(), function (req, res) {
        var params = {
            force: req.query.hasOwnProperty('force');
        };

        db.sequelize.sync(params).then(function () {
            console.log('[ OK ] Synchronized database.');
            res.end('[ OK ] Synchronized database.');
        }).catch(function (err) {
            console.error(err);
            res.end('[ ERROR ] Synchronized database failed.');
        });
    });

    return router;
};
