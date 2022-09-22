require('dotenv').config('../');

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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