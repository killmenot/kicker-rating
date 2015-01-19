'use strict';
module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('members', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            first_name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            last_name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            date_birth: {
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
        migration.dropTable('members').finally(done);
    }
};
