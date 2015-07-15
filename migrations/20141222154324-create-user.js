'use strict';

var models = require('../models');

module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
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
            var admin = models.User.build({
                username: 'admin'
            });
            admin.set_password('12345').save().finally(done);
        });
    },
    down: function (queryInterface, Sequelize, done) {
        queryInterface.dropTable('users').finally(done);
    }
};
