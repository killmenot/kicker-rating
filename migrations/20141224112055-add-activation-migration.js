"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
      'seasons',
      'activated',
      {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      }
    ).finally(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('seasons', 'activated').finally(done);
  }
};
