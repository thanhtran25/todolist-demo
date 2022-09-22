const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            Project.hasMany(models.User, {
                foreignKey: 'projectId'
            });
            Project.belongsTo(models.User, { foreignKey: 'leaderId' });
            Project.hasMany(models.Task, { foreignKey: 'projectId' });
        }
    }

    Project.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        leaderId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
    });

    return Project;
}