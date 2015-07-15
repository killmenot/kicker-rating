'use strict';
module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable('members', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            date_birth: {
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
        queryInterface.dropTable('members').finally(done);
    }
};
