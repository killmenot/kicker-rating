'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('season', {
    location_id: DataTypes.INT,
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
        // associations can be defined here
      }
    }
  });
};
