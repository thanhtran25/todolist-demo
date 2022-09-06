require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const resUtil = require('./core/utils/res.util');
const tasksRouter = require('./tasks/tasks.router');
const usersRouter = require('./users/users.router');
const projectsRouter = require('./projects/projects.router');
const statisticsRouter = require('./statistics/statistics.router')
const { sequelize } = require('./core/database');
const { associations } = require('./core/associations');

async function bootstrap() {
    const port = parseInt(process.env.SERVER_PORT, 10);

    try {
        await sequelize.authenticate();
        associations();
        // await sequelize.sync({ alter: true });
        // await sequelize.query('ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;');


        console.log('Connection has been established successfully.');
    } catch (error) {
        const err = new Error('Unable to connect to the database');

    }

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('tiny'))

    app.use('/tasks', tasksRouter);
    app.use('/users', usersRouter);
    app.use('/projects', projectsRouter);
    app.use('/statistics', statisticsRouter);

    app.use((error, req, res, next) => {
        return resUtil.handleError(res, error);
    });

    app.listen(port, () => {
        console.log('Listening at port: ' + port);
    })
}

bootstrap()