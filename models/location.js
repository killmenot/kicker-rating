'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Location', {
    name: DataTypes.STRING,
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
