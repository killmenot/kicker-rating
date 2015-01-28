var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    _ = require('underscore'),
    moment = require('moment');

function convertSeasons (seasons) {
    return _.map(seasons, function (s) { return _.extend(_.pick(s, 'id', 'title'), { isSelected: false }); });
};

function renderEditView(res, values, errors) {
    res.render('admin/tournaments/edit', {
        mainNav: 'admin',
        subNav: 'tournaments',
        title: values.id ? 'Edit tournament' : 'Create tournament',
        values: values,
        errors: errors ? _.object(_.map(errors, function (error) { return [error.path, error]; })) : {}
    });
};

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
        req.context.getSeasons().then(function (seasons) {
            var values = {};
            values.seasons = convertSeasons(seasons);
            renderEditView(res, values);
        }).catch(next);
    });

    router.post('/create', access.if_logged_in_as_admin(), function (req, res, next) {
        var tournamentValues = {
            name: req.body.name,
            date_started: req.body.date_started,
            date_ended: req.body.date_ended,
            note: req.body.note,
            season_id: req.body.season
        };

        req.context.getLocation().then(function (location) {
            tournamentValues.location_id = location.id;
            return db.sequelize.transaction(function (t) {
                return db.Tournament.create(tournamentValues, {
                    transaction: t
                });
            });
        }).then(function () {
            req.flash('success', 'The tournament was added successfully.');
            res.redirect('/admin/tournaments');
        }).catch(db.Sequelize.ValidationError, function (err) {
            renderEditView(res, tournamentValues, err.errors);
        }).catch(next);
    });

    router.get('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var tournamentId = parseInt(req.params.id, 10);

        req.context.getLocation().then(function (location) {
            return db.Tournament.find({
                where: {
                    id: tournamentId,
                    location_id: location.id
                }
            });
        }).then(function (tournament) {
            req.context.getSeasons().then(function (seasons) {
                seasons = convertSeasons(seasons);
                _.find(seasons, function (s) { return s.id == tournament.season_id; }).isSelected = true;
                renderEditView(res, {
                    id: tournament.id,
                    name: tournament.name,
                    date_started: moment(tournament.date_started).format('L'),
                    date_ended: tournament.date_ended,
                    note: tournament.note,
                    seasons: seasons
                });
            });
        }).catch(next);
    });

    router.post('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var tournamentId = parseInt(req.params.id, 10),
            tournamentValues = {
                name: req.body.name,
                date_started: req.body.date_started,
                date_ended: req.body.date_ended,
                note: req.body.note,
                season_id: req.body.season
            };

        req.context.getLocation().then(function (location) {
            return db.Tournament.find({
                where: {
                    id: tournamentId,
                    location_id: location.id
                }
            });
        }).then(function (tournament) {
            var markAsDefault = tournamentValues.default && !tournament.default;
            return db.sequelize.transaction(function (t) {
                return tournament.updateAttributes(tournamentValues, {
                    transaction: t,
                    validate: true
                });
            });
        }).then(function () {
            req.flash('success', 'The tournament was updated successfully.');
            res.redirect('/admin/tournaments');
        }).catch(db.Sequelize.ValidationError, function (err) {
            tournamentValues.id = tournamentId;
            renderEditView(res, tournamentValues, err.errors);
        }).catch(next);
    });

    return router;
};
