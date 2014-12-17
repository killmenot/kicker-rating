'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('seasons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      location_id: {
        type: DataTypes.INTEGER
      },
      date_started: {
        type: DataTypes.DATE
      },
      date_ended: {
        allowNull: true,
        type: DataTypes.DATE
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
    migration.dropTable('seasons').done(done);
  }
};
