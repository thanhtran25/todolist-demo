require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const resUtil = require('./core/utils/res.util');
const tasksRouter = require('./tasks/tasks.router');
const usersRouter = require('./users/users.router');
const projectsRouter = require('./projects/projects.router');
const statisticsRouter = require('./statistics/statistics.router')
const db = require('./core/database');

async function bootstrap() {
    const port = parseInt(process.env.SERVER_PORT, 10);

    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');

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