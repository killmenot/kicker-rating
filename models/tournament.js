'use strict';

module.exports = function(sequelize, DataTypes) {
  var tournament = sequelize.define('Tournament', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    season_id: DataTypes.INT,
    location_id: DataTypes.INT,
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

  return tournament;
};
