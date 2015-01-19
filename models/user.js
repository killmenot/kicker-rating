'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    instanceMethods: {
      validate_password: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
      set_password: function(plain_password) {
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(plain_password, salt);
        return this;
      },
    }
  });
};
