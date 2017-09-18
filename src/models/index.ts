/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as cls from 'continuation-local-storage';
import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import * as casual from 'casual';
import * as _ from 'lodash';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { IColorPaletteAttributes, IColorPaletteInstance } from './colorPalette/colorPalette.model';
import { IUiComponentAttributes, IUiComponentInstance } from './uiComponent/uiComponent.model';
import { Sequelize } from 'sequelize';


/************************************/
/*            INTERFACES            */
/************************************/
export interface SequelizeModels {
    ColorPalette: SequelizeStatic.Model<IColorPaletteInstance, IColorPaletteAttributes>;
    UiComponent: SequelizeStatic.Model<IUiComponentInstance, IUiComponentAttributes>;
}


/****************************************/
/*            DATABASE CLASS            */
/****************************************/
class Database {

    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = config.getDatabaseConfig();

        if (dbConfig.logging) {
            dbConfig.logging = logger.info;
        }

        (SequelizeStatic as any).cls = cls.createNamespace('sequelize-transaction');
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
            dbConfig.password, dbConfig);
        this._models = ({} as any);

        
        /* Leemos nuestras carpeta 'models', encontrando e importando cada uno de 
        nuestros modelos, agregandolos a la propiedad 'this._models' */
        fs
            .readdirSync(__dirname)
            .filter((file: string) => 

                /* No devuelva los archivos que: 
                    - Sea este mismo - index.js
                    - Que no tenga un '.' al comienzo del nombre
                    - No contenga la extension '.js'
                */
                (file.indexOf('.') !== 0) && 
                (file !== this._basename) && 
                (file.slice(-3) === '.js'))

            .forEach((file: string) => {
                const model = this._sequelize.import(path.join(__dirname, file));
                (<any> this._models)[(model as any).name] = model;
            });


        /* Aplicamos las relaciones entre los modelos, si tales relaciones 
        existen. */
        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof (<any> this._models)[modelName].associate === 'function') {
                (<any> this._models)[modelName].associate(this._models);
            }
        });
    }

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
export const models = database.getModels();
export const sequelize = database. getSequelize();