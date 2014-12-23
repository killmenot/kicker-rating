"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
      'seasons',
      'name',
      {
        type: DataTypes.STRING,
        allowNull: true
      }
    ).finally(done);
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('seasons', 'name').finally(done);
  }
};
