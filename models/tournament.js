'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tournament', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    season_id: DataTypes.INT,
    location_id: DataTypes.INT,
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
