// const { DataTypes, Model } = require('sequelize');
// const { sequelize } = require('../core/database');
// const { Project } = require('../projects/projects.model');
// const { User } = require('../users/users.model');

// class UserTask extends Model { };

// UserTask.init({
//     id: {
//         type: DataTypes.BIGINT,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     userId: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//         references: {
//             model: User,
//             key: 'id',
//         }
//     },
//     taskId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//             model: Project,
//             key: 'id',
//         }
//     }
// }, {
//     sequelize,
//     indexes: [{ unique: true, fields: ['userId', 'taskId'] }],
// })


// module.exports = {
//     UserTask
// };