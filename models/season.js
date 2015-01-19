'use strict';

var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Season', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        date_started: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        date_ended: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.Season.hasMany(models.Tournament);
                models.Season.belongsTo(models.Location);
            }
        },
        getterMethods: {
            title: function () {
                var range = moment(this.date_started).format('LL') + ' - ' + (this.date_ended ? moment(this.date_ended).format('LL') : '');

                if (this.name) {
                    return this.name + ' (' + range + ')';
                }

                return range;
            }
        }
    });
};
