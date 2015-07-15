'use strict';

var db = require('../../models');
var Promise = db.Sequelize.Promise;

module.exports = function () {
    return function (req, res, next) {
        res.locals.user = req.user;

        var flash = req.flash();
        res.locals.success = flash.success || '';
        res.locals.info = flash.info || '';
        res.locals.warning = flash.warning || '';
        res.locals.error = flash.error || '';

        res.locals.mainNav = '';
        res.locals.subNav = '';

        res.locals.activeNav = function (activeItem, item) {
            return activeItem && activeItem === item ? ' class="active"' : '';
        };

        db.Location.findAll().then(onFindActiveLocations).catch(next);;

        function onFindActiveLocations(locations) {
            res.locals.active_locations = locations;
            next();
        }
    };
};
