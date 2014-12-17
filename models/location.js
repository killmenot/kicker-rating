'use strict';

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    name: DataTypes.STRING,
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

  return Location;
};
