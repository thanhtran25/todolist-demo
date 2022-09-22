const { BadRequest, NotFound } = require('http-errors');
const {
    Project,
    UserTasks,
    Task,
    User
} = require('../core/database');

async function listTasks() {
    const tasks = await Task.findAll();
    return tasks;
}

async function createTask(task, userCreateId) {
    const { projectId } = await User.findByPk(userCreateId);
    if (!projectId) {
        throw new BadRequest('You are not in any project');
    }
    if (projectId !== task.projectId) {
        throw new BadRequest('You are not in this project');
    }
    const newTask = await Task.create({ ...task, projectId });
    return newTask;
}

async function assignTask(taskId, userId, projectId) {
    const project = await Project.findByPk(projectId);
    if (!project) {
        throw new NotFound('Project not found');
    }

    const user = await User.findOne({
        where: {
            id: userId,
            projectId
        }
    });

    if (!user) {
        throw new BadRequest('User is not in this project');
    }

    const task = await Task.findOne({
        where: {
            id: taskId,
            projectId
        }
    })

    if (!task) {
        throw new BadRequest('Task is not in this project');
    }

    const userTasks = await UserTasks.create({ userId, taskId });
    return userTasks;

}

async function softDeleteTask(taskId, userId) {
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw new NotFound('Task not found');
    }

    const project = await Project.findOne({
        where: {
            id: task.projectId,
            leaderId: userId
        }
    });

    if (!project) {
        throw new BadRequest('You are not leader in this project');
    }

    await task.destroy();

    return { success: true };
}

async function restoreTaskDeleted(taskId, userId) {
    const task = await Task.findByPk(taskId, { paranoid: false });
    if (!task) {
        throw new NotFound('Task not found');
    }

    const project = await Project.findOne({
        where: {
            id: task.projectId,
            leaderId: userId
        }
    })

    if (!project) {
        throw new BadRequest('You are not leader in this project');
    }

    await task.restore();

    return { success: true };
}

async function hardDeleteTask(taskId, userId) {
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw new NotFound('Task not found');
    }

    const project = await Project.findOne({
        where: {
            id: task.projectId,
            leaderId: userId
        }
    })

    if (!project) {
        throw new BadRequest('You are not leader in this project');
    }

    await task.destroy({
        force: true
    });

    return { success: true };
}

module.exports = {
    listTasks,
    createTask,
    assignTask,
    softDeleteTask,
    hardDeleteTask,
    restoreTaskDeleted
};