'use strict';

var models = require('../models');

module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable('locations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.TEXT
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).finally(function () {
            models.Location.create({
                name: 'Taganrog'
            }).finally(done);
        });
    },
    down: function (queryInterface, Sequelize, done) {
        queryInterface.dropTable('locations').finally(done);
    }
};
