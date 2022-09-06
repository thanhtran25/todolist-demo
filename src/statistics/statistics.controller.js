const { BadRequest } = require('http-errors');
const projectsServive = require('../projects/projects.service');

async function countProject(req, res, next) {
    try {
        const result = await projectsServive.countProject();
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

async function bigProject(req, res, next) {
    try {
        const result = await projectsServive.bigProject();
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    countProject,
    bigProject,
}