var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    _ = require('underscore'),
    moment = require('moment');

function getSeasons(req, options) {
    options = options || {};

    return req.context.getSeasons().then(function (seasons) {
        return _.chain(seasons)
            .sortBy(function (season) {
                return season.date_started_timestamp * (-1);
            })
            .map(function (season) {
                return {
                    id: season.id,
                    title: season.title,
                    selected: options.seasonId ? options.seasonId === season.id : season.default
                };
            })
            .value();
    });
}

function renderEditView(res, values, errors) {
    res.render('admin/tournaments/edit', {
        mainNav: 'admin',
        subNav: 'tournaments',
        title: values.id ? 'Edit tournament' : 'Create tournament',
        values: values,
        errors: errors ? _.object(_.map(errors, function (error) {
            return [error.path, error];
        })) : {}
    });
}

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res, next) {
        req.context.getTournaments().then(function (tournaments) {
            res.render('admin/tournaments/index', {
                mainNav: 'admin',
                subNav: 'tournaments',
                title: 'Tournaments list',
                tournaments: tournaments
            });
        }).catch(next);
    });

    router.get('/create', access.if_logged_in_as_admin(), function (req, res, next) {
        getSeasons(req).then(function (seasons) {
            if (seasons.length === 0) {
                req.flash('error', 'You should create at least one season before creating any tournaments.');
                res.redirect('/admin/seasons/create');
            } else {
                renderEditView(res, {
                    seasons: seasons
                });
            }
        }).catch(next);
    });

    router.post('/create', access.if_logged_in_as_admin(), function (req, res, next) {
        var tournamentValues = {
            name: req.body.name,
            date: req.body.date,
            season_id: parseInt(req.body.season_id, 10),
            note: req.body.note
        };

        req.context.getLocation().then(function (location) {
            tournamentValues.location_id = location.id;
            return db.Tournament.create(tournamentValues);
        }).then(function () {
            req.flash('success', 'The tournament was added successfully.');
            res.redirect('/admin/tournaments');
        }).catch(db.Sequelize.ValidationError, function (err) {
            var options = {
                seasonId: tournamentValues.season_id
            };
            return getSeasons(req, options).then(function (seasons) {
                tournamentValues.seasons = seasons;
                renderEditView(res, tournamentValues, err.errors);
            });
        }).catch(next);
    });

    router.get('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var id = parseInt(req.params.id, 10);

        req.context.getTournament(id).then(function (tournament) {
            var options = {
                seasonId: tournament.season_id
            };
            return getSeasons(req, options).then(function (seasons) {
                renderEditView(res, {
                    id: tournament.id,
                    name: tournament.name,
                    season_id: tournament.season_id,
                    date: moment(tournament.date).format('L'),
                    note: tournament.note,
                    seasons: seasons
                });
            });
        }).catch(next);
    });

    router.post('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var id = parseInt(req.params.id, 10),
            tournamentValues = {
                name: req.body.name,
                date: req.body.date,
                season_id: parseInt(req.body.season_id, 10),
                note: req.body.note
            };

        req.context.getTournament(id).then(function (tournament) {
            return tournament.updateAttributes(tournamentValues, {
                validate: true
            });
        }).then(function () {
            req.flash('success', 'The tournament was updated successfully.');
            res.redirect('/admin/tournaments');
        }).catch(db.Sequelize.ValidationError, function (err) {
            var options = {
                seasonId: tournamentValues.season_id
            };
            return getSeasons(req, options).then(function (seasons) {
                tournamentValues.seasons = seasons;
                tournamentValues.id = id;
                renderEditView(res, tournamentValues, err.errors);
            });
        }).catch(next);
    });

    return router;
};
