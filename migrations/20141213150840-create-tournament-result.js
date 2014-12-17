'use strict';
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tournament_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tournament_id: {
        type: DataTypes.INTEGER
      },
      member_id: {
        type: DataTypes.INTEGER
      },
      season_id: {
        type: DataTypes.INTEGER
      },
      score: {
        type: DataTypes.INTEGER
      },
      note: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('tournament_results').done(done);
  }
};
