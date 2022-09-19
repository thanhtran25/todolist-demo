const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        define: {
            underscored: true
        },
        pool: {
            max: 10,
            min: 1,
            idle: 1000,
            acquire: 150000
        }
    }
)

module.exports = {
    sequelize,
};