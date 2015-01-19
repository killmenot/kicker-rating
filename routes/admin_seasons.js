var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    _ = require('underscore');

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res) {
        req.context.getSeasons().then(function (seasons) {
            res.render('admin/seasons/index', {
                mainNav: 'admin',
                subNav: 'seasons',
                title: 'Seasons list',
                seasons: seasons
            });
        });
    });

    router.get('/create', access.if_logged_in_as_admin(), function (req, res, next) {
        req.context.getSeasons().then(function (seasons) {
            res.render('admin/seasons/create', {
                title: 'Create a new season',
                errors: {},
                values: {
                    default: (seasons && seasons.length === 0)
                }
            });
        }).catch(next);
    });

    router.post('/create', access.if_logged_in_as_admin(), function (req, res, next) {
        var seasonValues = {
            name: req.body.name,
            date_started: req.body.date_started,
            date_ended: req.body.date_ended,
            note: req.body.note
        };

        if (req.body.default) {
            seasonValues.default = !!req.body.default;
        }

        req.context.getLocation().then(function (location) {
            seasonValues.location_id = location.id;

            return db.sequelize.transaction(function (t) {
                return db.Sequelize.Promise.resolve().then(function () {
                    if (seasonValues.default) {
                        return db.Season.update({
                            default: false
                        }, {
                            transaction: t,
                            where: {
                                location_id: location.id
                            }
                        });
                    } else {
                        return db.Sequelize.Promise.resolve();
                    }
                }).then(function () {
                    return db.Season.create(seasonValues, {
                        transaction: t
                    });
                });
            });
        }).then(function () {
            req.flash('success', 'The season was added');
            res.redirect('/admin/seasons');
        }).catch(db.Sequelize.ValidationError, function (err) {
            res.render('admin/seasons/create', {
                title: 'Create a new season',
                values: req.body,
                errors: _.object(_.map(err.errors, function (error) {
                    return [error.path, error];
                }))
            });
        }).catch(next);
    });

    return router;
};
