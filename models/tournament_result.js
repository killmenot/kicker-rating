'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TournamentResult', {
    tournament_id: DataTypes.INT,
    member_id: DataTypes.INT,
    season_id: DataTypes.INT,
    score: DataTypes.INT,
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
