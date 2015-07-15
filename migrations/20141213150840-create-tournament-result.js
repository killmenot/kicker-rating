'use strict';
module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable('tournament_results', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tournament_id: {
                type: Sequelize.INTEGER
            },
            member_id: {
                type: Sequelize.INTEGER
            },
            season_id: {
                type: Sequelize.INTEGER
            },
            score: {
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
        queryInterface.dropTable('tournament_results').finally(done);
    }
};
