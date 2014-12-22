'use strict';

var models  = require('../models');

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
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
      var admin = models.User.build({username: 'admin'});
      admin.set_password('12345').save().finally(done);
    });
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('users').finally(done);
  }
};
