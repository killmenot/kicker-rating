'use strict';

module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable('tournaments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE
            },
            season_id: {
                type: Sequelize.INTEGER
            },
            location_id: {
                type: Sequelize.INTEGER
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
        queryInterface.dropTable('tournaments').finally(done);
    }
};
