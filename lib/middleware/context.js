'use strict';

var db = require('../../models');
var Promise = db.Sequelize.Promise;

module.exports = function () {
    return function (req, res, next) {
        if (req.context) return;

        req.context = {
            getLocation: function () {
                return db.Location.find({
                    where: {
                        name: 'Taganrog'
                    }
                });
            },
            getSeasons: function () {
                return Promise
                    .resolve()
                    .bind(this)
                    .then(function () {
                        return this.getLocation();
                    })
                    .then(function (location) {
                        return location.getSeasons();
                    });
            }
        };

        next();
    };
};
