const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../core/database');
const { User } = require('../users/users.model');

class Project extends Model { }

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
        // references: {
        //     model: User,
        //     key: 'id',
        // },
        unique: true,
    }
}, {
    sequelize,
})

module.exports = {
    Project
}