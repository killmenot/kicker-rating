'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Season', {
    location_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    date_started: DataTypes.DATE,
    date_ended: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
      },
    activated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      }
  }, {
    classMethods: {
      associate: function(models) {
        models.Season.hasMany(models.Tournament);
        
        models.Season.belongsTo(models.Location);
      }
    }
  });
};
