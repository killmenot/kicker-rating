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
        allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
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
