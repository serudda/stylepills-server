"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const cls = require("continuation-local-storage");
const fs = require("fs");
const path = require("path");
const SequelizeStatic = require("sequelize");
const config_1 = require("../config/config");
const logger_1 = require("../utils/logger");
/****************************************/
/*            DATABASE CLASS            */
/****************************************/
class Database {
    /*     CONSTRUCTOR     */
    /***********************/
    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = config_1.config.getDatabaseConfig();
        if (dbConfig.logging) {
            dbConfig.logging = logger_1.logger.info;
        }
        /* NOTE: Here we find a lot of 'any', because the models does not have a
           especific type */
        SequelizeStatic.cls = cls.createNamespace('sequelize-transaction');
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._models = {};
        /* Leemos nuestras carpeta 'models', encontrando e importando cada uno de
        nuestros modelos, agregandolos a la propiedad 'this._models' */
        fs
            .readdirSync(__dirname)
            .filter((file) => {
            /* No devuelva los archivos que:
                - Sea este mismo - index.js
                - Que no tenga un '.' al comienzo del nombre
                - No contenga la extension '.js'
            */
            return (file.indexOf('.') !== 0)
                && (file !== this._basename)
                && (file.slice(-3) === '.js');
        })
            .forEach((file) => {
            let model = null;
            try {
                model = this._sequelize.import(path.join(__dirname, file));
            }
            catch (e) {
                throw e;
            }
            this._models[model.name] = model;
        });
        /* Aplicamos las relaciones entre los modelos, si tales relaciones
        existen. */
        Object.keys(this._models).forEach((modelName) => {
            if (typeof this._models[modelName].associate === 'function') {
                this._models[modelName].associate(this._models);
            }
        });
    }
    /*       METHODS       */
    /***********************/
    getModels() {
        return this._models;
    }
    getSequelize() {
        return this._sequelize;
    }
}
/* Create Database Instance */
const database = new Database();
/* Export models and sequelize objects */
exports.models = database.getModels();
exports.sequelize = database.getSequelize();
/* Only on Develop: Recreate DataBase based on new migrations updates  */
// sequelize.sync({force: true}); 
//# sourceMappingURL=index.js.map