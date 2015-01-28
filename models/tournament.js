'use strict';

var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Tournament', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        season_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.Tournament.belongsTo(models.Season);
                models.Tournament.belongsTo(models.Location);
            }
        },
        getterMethods: {
            title: function () {
                return this.name + ' (' + moment(this.date).format('LL') + ')';
            },
            date_timestamp: function () {
                return moment(this.date).unix();
            }
        }
    });
};
