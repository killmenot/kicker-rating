'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      note: {
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
    migration.dropTable('locations').finally(done);
  }
};
