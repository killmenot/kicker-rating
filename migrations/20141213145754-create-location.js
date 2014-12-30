'use strict';

var models  = require('../models');

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
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).finally(function () {
      models.Location.create({name: 'Taganrog'}).finally(done);
    });
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('locations').finally(done);
  }
};
