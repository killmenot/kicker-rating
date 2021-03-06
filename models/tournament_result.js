'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TournamentResult', {
        tournament_id: DataTypes.INTEGER,
        member_id: DataTypes.INTEGER,
        season_id: DataTypes.INTEGER,
        score: DataTypes.INTEGER,
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                models.TournamentResult.belongsTo(models.Tournament);
                models.TournamentResult.belongsTo(models.Member);
                models.TournamentResult.belongsTo(models.Season);
            }
        }
    });
};
