const { Op, Sequelize } = require('sequelize');
const { BadRequest, NotFound } = require('http-errors');
const { Project } = require('./projects.model');
const { User } = require('../users/users.model');
const { sequelize } = require('../core/database');

async function listProject() {
    const project = await Project.findAll({
        include: {
            model: User,
            as: 'users',
            attributes: { exclude: ['password'] }
        },
    });

    return project;
}

async function createProject(project, userId) {
    const user = await User.findOne({
        where: {
            projectId: {
                [Op.is]: null,
            },
            id: userId,
        }
    });
    if (!user) {
        throw new BadRequest('You are in another project');
    }
    const newProject = await Project.create({ ...project, leaderId: userId });
    user.projectId = newProject.id;
    await user.save();
    return newProject;
}

async function joinProject(userId, projectId) {
    const project = await Project.findByPk(projectId);
    if (!project) {
        throw new NotFound('Project not found');
    }
    const [count] = await User.update({
        projectId
    }, {
        where: {
            id: userId,
            projectId: {
                [Op.is]: null,
            }
        }
    });

    if (!count) {
        throw new BadRequest('You are in another Project');
    }

    return count;
}

async function assignProject(userId, projectId) {
    const project = await Project.findByPk(projectId);
    if (!project) {
        throw new NotFound('Project not found');
    }
    const [count] = await User.update({
        projectId
    }, {
        where: {
            id: userId,
            projectId: {
                [Op.is]: null,
            }
        }
    });

    if (!count) {
        throw new BadRequest('User not found or user is in another Project');
    }

    return count;
}

async function removeMember(userId, projectId, memberId) {
    const project = await Project.findByPk(projectId);
    if (!project) {
        throw new NotFound('Project not found');
    }

    if (project.leaderId != userId) {
        throw new BadRequest('You are not the project leader');
    }

    const [user] = await User.update({
        projectId: null
    }, {
        where: {
            projectId: project.id,
            id: {
                [Op.ne]: userId,
                [Op.eq]: memberId
            },
        }
    });
    if (!user) {
        throw new BadRequest('You can not remove yourself or non-project members');
    }
    return user;
}

async function countProject() {
    const count = await Project.count();
    return { countProject: count };
}

async function bigProject() {
    const project = await Project.findAll({
        attributes: {
            include: [
                [Sequelize.fn('COUNT', sequelize.col('Project.id')), 'countMember'],
            ]
        },
        include: {
            model: User,
            as: 'users',
            attributes: []
        },
        group: 'Project.id',
        order: [
            ['countMember', 'DESC']
        ],

    });

    return project;
}


module.exports = {
    listProject,
    createProject,
    joinProject,
    assignProject,
    removeMember,
    countProject,
    bigProject,
}