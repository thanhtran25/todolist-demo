const { Project } = require('../projects/projects.model');
const { Task } = require('../tasks/tasks.model');
// const { UserTask } = require('../userTasks/userTasks.model');
const { User } = require('../users/users.model');

function associations() {
    Project.hasMany(User, { foreignKey: 'projectId', as: 'users' });
    User.belongsTo(Project, { foreignKey: 'projectId', as: 'projects' });

    User.hasOne(Project, {
        foreignKey: {
            name: 'leaderId',
            allowNull: false,
            unique: true,
            as: 'projects'
        },
    });

    Project.belongsTo(User, { foreignKey: 'leaderId' });

    Project.hasMany(Task, { foreignKey: 'projectId' });
    Task.belongsTo(Project, { foreignKey: 'projectId' });

    User.belongsToMany(Task, { through: 'UserTasks', foreignKey: 'userId', uniqueKey: ['userId', 'taskId'] });
    Task.belongsToMany(User, { through: 'UserTasks', foreignKey: 'taskId', uniqueKey: ['userId', 'taskId'] });
}

module.exports = {
    associations,
}


