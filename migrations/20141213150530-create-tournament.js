'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      },
      season_id: {
        type: DataTypes.INTEGER
      },
      location_id: {
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
    }).finally(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('tournaments').finally(done);
  }
};
