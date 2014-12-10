module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Member', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  });
}
