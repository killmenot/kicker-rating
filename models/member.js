'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Member', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        date_birth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        classMethods: {
            associate: function () {
                // associations can be defined here
            }
        }
    });
};
