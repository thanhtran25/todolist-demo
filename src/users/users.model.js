const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../core/database');

class User extends Model { }

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
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'member'
    }
}, {
    sequelize,
});

module.exports = {
    User,
}