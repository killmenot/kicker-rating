'use strict';
module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('tournament_results', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            tournament_id: {
                type: DataTypes.INTEGER
            },
            member_id: {
                type: DataTypes.INTEGER
            },
            season_id: {
                type: DataTypes.INTEGER
            },
            score: {
                type: DataTypes.INTEGER
            },
            note: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        }).finally(done);
    },
    down: function (migration, DataTypes, done) {
        migration.dropTable('tournament_results').finally(done);
    }
};
