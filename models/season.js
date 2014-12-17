'use strict';

module.exports = function(sequelize, DataTypes) {
  var season = sequelize.define('season', {
    location_id: DataTypes.INT,
    date_started: DataTypes.DATE,
    date_ended: {
      DataTypes.DATE,
      allowNull: true
    },
    note: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return season;
};
