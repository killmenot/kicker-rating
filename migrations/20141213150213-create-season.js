'use strict';

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('seasons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: true,
                type: DataTypes.STRING
            },
            default: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            location_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            date_started: {
                allowNull: false,
                type: DataTypes.DATE
            },
            date_ended: {
                allowNull: true,
                type: DataTypes.DATE
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
        migration.dropTable('seasons').finally(done);
    }
};
