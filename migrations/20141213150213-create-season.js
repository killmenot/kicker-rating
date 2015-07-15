'use strict';

module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable('seasons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            default: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            location_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            date_started: {
                allowNull: false,
                type: Sequelize.DATE
            },
            date_ended: {
                allowNull: true,
                type: Sequelize.DATE
            },
            note: {
                allowNull: true,
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
        }).finally(done);
    },
    down: function (queryInterface, Sequelize, done) {
        queryInterface.dropTable('seasons').finally(done);
    }
};
