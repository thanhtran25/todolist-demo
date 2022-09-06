const Joi = require('joi');
const projectsServive = require('./projects.service');
const { validate } = require('../core/utils/validate.util');

async function listProject(req, res, next) {
    try {
        const result = await projectsServive.listProject();
        return res.status(200).send({ result });
    } catch (error) {
        return next(error);
    }
}

async function createProject(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string().max(255).required(),
        });

        const project = validate(req.body, schema);

        const result = await projectsServive.createProject(project, req.user.id);
        return res.status(201).send(result);

    } catch (error) {
        return next(error);
    }
}

async function joinProject(req, res, next) {
    try {
        const schema = Joi.object({
            projectId: Joi.number().required(),
        });

        const { projectId } = validate(req.body, schema);

        await projectsServive.joinProject(req.user.id, projectId);
        return res.status(200).send({ success: true });
    } catch (error) {
        return next(error);
    }
}

async function assignProject(req, res, next) {
    try {
        const schema = Joi.object({
            projectId: Joi.number().required(),
            userId: Joi.number().required(),
        });

        const { projectId, userId } = validate({ ...req.body, projectId: req.params.projectId }, schema);

        await projectsServive.assignProject(userId, projectId);
        return res.status(200).send({ success: true });
    } catch (error) {
        return next(error);
    }
}

async function removeMember(req, res, next) {
    try {
        const schema = Joi.object({
            projectId: Joi.number().required(),
            memberId: Joi.number().required(),
        });

        const { projectId, memberId } = validate(req.params, schema);

        await projectsServive.removeMember(req.user.id, projectId, memberId);
        return res.status(200).send({ success: true });
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    listProject,
    createProject,
    joinProject,
    assignProject,
    removeMember,

}