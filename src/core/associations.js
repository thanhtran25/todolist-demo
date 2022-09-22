const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js');

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

fs
    .readdirSync(path.join(__dirname, '..'))
    .filter(dir => {
        return dir.indexOf('.') === -1;
    })
    .forEach(dir => {
        let modelFile = [];
        fs
            .readdirSync(path.join(__dirname, '..', dir))
            .forEach(file => {
                // console.log(file);
                if ((file.indexOf('.') !== 0) && (file.slice(-9) === '.model.js')) {
                    modelFile.push(file);
                }
            });
        modelFile.forEach(file => {
            const model = require(path.join(__dirname, '..', dir, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        })

    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
