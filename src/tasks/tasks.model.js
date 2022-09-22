const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.Project, {
                foreignKey: 'projectId'
            });
            Task.belongsToMany(models.User, { through: models.UserTasks, foreignKey: 'taskId', uniqueKey: ['userId', 'taskId'] });
        }
    }

    Task.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
    }, {
        sequelize,
        paranoid: true,
    });
    return Task;
}