const Joi = require('joi');
const usersService = require('./users.service');
const { validate } = require('../core/utils/validate.util');

async function register(req, res, next) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });

        const value = validate(req.body, schema);

        const result = await usersService.register(value);
        return res.status(201).send(result);
    } catch (error) {
        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });

        const { email, password } = validate(req.body, schema);

        const result = await usersService.login(email, password);
        return res.status(200).send(result);

    } catch (error) {
        return next(error);
    }
}

module.exports = {
    register,
    login,
}



