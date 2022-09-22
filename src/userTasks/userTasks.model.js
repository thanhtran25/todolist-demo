'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserTasks extends Model {
        static associate(models) {
            // define association here
        }
    }
    UserTasks.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        idTask: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        idUser: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'UserTasks',
    });
    return UserTasks;
};