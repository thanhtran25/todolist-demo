const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Project, { foreignKey: 'leaderId' });
            User.belongsTo(models.Project);
            User.belongsToMany(models.Task, { through: models.UserTasks, foreignKey: 'userId', uniqueKey: ['userId', 'taskId'] });
        }
    }

    User.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        projectId: {
            type: DataTypes.BIGINT,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'member',
        }
    }, {
        sequelize,
    });
    return User;
}
