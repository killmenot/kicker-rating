var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    _ = require('underscore'),
    moment = require('moment');

function renderEditView(res, values, errors) {
    res.render('admin/seasons/edit', {
        mainNav: 'admin',
        subNav: 'seasons',
        title: values.id ? 'Edit season' : 'Create season',
        values: values,
        errors: errors ? _.object(_.map(errors, function (error) { return [error.path, error]; })) : {}
    });
}

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res, next) {
        req.context.getSeasons().then(function (seasons) {
            res.render('admin/seasons/index', {
                mainNav: 'admin',
                subNav: 'seasons',
                title: 'Seasons list',
                seasons: seasons
            });
        }).catch(next);
    });

    router.get('/create', access.if_logged_in_as_admin(), function (req, res, next) {
        req.context.getSeasons().then(function (seasons) {
            var defaultSeasonValues = {
                default: (seasons && seasons.length === 0)
            };
            renderEditView(res, defaultSeasonValues);
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
            req.flash('success', 'The season was added successfully.');
            res.redirect('/admin/seasons');
        }).catch(db.Sequelize.ValidationError, function (err) {
            renderEditView(res, seasonValues, err.errors);
        }).catch(next);
    });

    router.get('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var seasonId = parseInt(req.params.id, 10);

        req.context.getLocation().then(function (location) {
            return db.Season.find({
                where: {
                    id: seasonId,
                    location_id: location.id
                }
            })
        }).then(function (season) {
            renderEditView(res, {
                id: season.id,
                name: season.name,
                date_started: moment(season.date_started).format('L'),
                date_ended: season.date_ended,
                note: season.note,
                default: season.default
            });
        }).catch(next);
    });

    router.post('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var seasonId = parseInt(req.params.id, 10),
            seasonValues = {
                name: req.body.name,
                date_started: req.body.date_started,
                date_ended: req.body.date_ended,
                note: req.body.note
            };

        if (req.body.default) {
            seasonValues.default = !!req.body.default;
        }

        req.context.getLocation().then(function (location) {
            return db.Season.find({
                where: {
                    id: seasonId,
                    location_id: location.id
                }
            });
        }).then(function (season) {
            var markAsDefault = seasonValues.default && !season.default;
            return db.sequelize.transaction(function (t) {
                return db.Sequelize.Promise.resolve().then(function () {
                    if (markAsDefault) {
                        return db.Season.update({
                            default: false
                        }, {
                            transaction: t,
                            where: {
                                location_id: season.location_id
                            }
                        });
                    } else {
                        return db.Sequelize.Promise.resolve();
                    }
                }).then(function () {
                    return season.updateAttributes(seasonValues, {
                        transaction: t,
                        validate: true
                    });
                });
            });
        }).then(function () {
            req.flash('success', 'The season was updated successfully.');
            res.redirect('/admin/seasons');
        }).catch(db.Sequelize.ValidationError, function (err) {
            seasonValues.id = seasonId;
            renderEditView(res, seasonValues, err.errors);
        }).catch(next);
    });

    return router;
};
