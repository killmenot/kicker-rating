var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    _ = require('underscore');

function renderEditView(res, values, errors) {
    res.render('admin/locations/edit', {
        mainNav: 'admin',
        subNav: 'locations',
        title: values.id ? 'Edit location' : 'Create location',
        values: values,
        errors: errors ? _.object(_.map(errors, function (error) { return [error.path, error]; })) : {}
    });
}

module.exports = function (access) {
    router.get('/', access.if_logged_in_as_admin(), function (req, res, next) {
        db.Location.findAll()
            .then(onFindAllLocations)
            .catch(next);

        function onFindAllLocations (locations) {
            res.render('admin/locations/index', {
                mainNav: 'admin',
                subNav: 'locations',
                title: 'Locations list',
                locations: locations
            });
        }
    });

    router.get('/create', access.if_logged_in_as_admin(), function (req, res) {
        renderEditView(res, {});
    });

    router.post('/create', access.if_logged_in_as_admin(), function (req, res, next) {
        var locationValues = {
            name: req.body.name,
            note: req.body.note
        };

        db.Location.create(locationValues)
            .then(onCreateLocation)
            .catch(db.Sequelize.ValidationError, OnCreateLocationValidationError)
            .catch(next);

        function onCreateLocation() {
            req.flash('success', 'The location was added successfully.');
            res.redirect('/admin/locations');
        }

        function OnCreateLocationValidationError(err) {
            renderEditView(res, locationValues, err.errors);
        }
    });

    router.get('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var id = parseInt(req.params.id, 10);

        db.Location.findById(id)
            .then(onFindLocation)
            .catch(next);

        function onFindLocation(location) {
            renderEditView(res, {
                id: location.id,
                name: location.name,
                note: location.note
            });
        }
    });

    router.post('/edit/:id', access.if_logged_in_as_admin(), function (req, res, next) {
        var id = parseInt(req.params.id, 10),
            locationValues = {
                name: req.body.name,
                note: req.body.note
            };

        db.Location.findById(id)
            .then(onFindLocation)
            .then(onUpdateLocationAttributes)
            .catch(db.Sequelize.ValidationError, OnUpdateLocationAttributesValidationError)
            .catch(next);

        function onFindLocation(location) {
            return location.updateAttributes(locationValues, {
                validate: true
            });
        }

        function onUpdateLocationAttributes() {
            req.flash('success', 'The location was updated successfully.');
            res.redirect('/admin/locations');
        }

        function OnUpdateLocationAttributesValidationError(err) {
            locationValues.id = id;
            renderEditView(res, locationValues, err.errors);
        }
    });

    return router;
};
