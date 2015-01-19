'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Location', {
        name: DataTypes.STRING,
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.Location.hasMany(models.Season);
                models.Location.hasMany(models.Tournament);
            }
        }
    });
};
