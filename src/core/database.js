const Sequelize = require('sequelize');
const path = require('path');

const config = require('../config/config.js');

let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = {
    sequelize,
};