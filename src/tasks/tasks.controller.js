const Joi = require('joi');
const tasksService = require('./tasks.service');
const { validate } = require('../core/utils/validate.util');
const { BadRequest } = require('http-errors')

async function listTask(req, res, next) {
    try {
        const result = await tasksService.listTasks();
        return res.status(200).send({ data: result })
    } catch (error) {
        return next(error);
    }
}

async function createTask(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(3).max(255).required(),
            projectId: Joi.number().required(),
        });

        const value = validate(req.body, schema);
        const result = await tasksService.createTask(value, req.user.id);
        return res.status(201).send({ data: result })

    } catch (error) {
        return next(error);
    }
}

async function assignTask(req, res, next) {
    try {
        const schema = Joi.object({
            projectId: Joi.number().required(),
            taskId: Joi.number().required(),
            userId: Joi.number().required(),
        })

        const { taskId, userId, projectId } = validate({ ...req.body, taskId: req.params.taskId }, schema);
        const result = await tasksService.assignTask(taskId, userId, projectId);

        return res.status(201).send(result);
    } catch (error) {
        return next(error);
    }
}

async function softDeleteTask(req, res, next) {
    try {
        const schema = Joi.object({
            id: Joi.number().required()
        });
        const { id } = validate({ id: req.params.id }, schema);

        console.log(id);

        const result = await tasksService.softDeleteTask(id, req.user.id);
        return res.status(201).send(result);

    } catch (error) {
        return next(error);
    }
}

async function hardDeleteTask(req, res, next) {
    try {
        const schema = Joi.object({
            id: Joi.number().required()
        });
        const { id } = validate({ id: req.params.id }, schema);

        const result = await tasksService.hardDeleteTask(id, req.user.id);
        return res.status(201).send(result);

    } catch (error) {
        return next(error);
    }
}

async function restoreTaskDeleted(req, res, next) {
    try {
        const schema = Joi.object({
            id: Joi.number().required()
        });
        const { id } = validate({ id: req.params.id }, schema);

        const result = await tasksService.restoreTaskDeleted(id, req.user.id);
        return res.status(201).send(result);

    } catch (error) {
        return next(error);
    }
}

module.exports = {
    listTask,
    createTask,
    assignTask,
    softDeleteTask,
    hardDeleteTask,
    restoreTaskDeleted
};