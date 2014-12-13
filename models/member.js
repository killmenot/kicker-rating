module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Member', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_birth: {
      type: Sequelize.DATE,
      allowNull: true
    },
    note: {
        type: Sequelize.STRING,
        allowNull: true,
    }
  }, classMethods: {
    associate: function(models) {
        // associations can be defined here
    }
  });
}
