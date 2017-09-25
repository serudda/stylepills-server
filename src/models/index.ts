/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as cls from 'continuation-local-storage';
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';
import * as SequelizeStatic from 'sequelize';
import * as _ from 'lodash';

import { config } from '../config/config';
import { logger } from '../utils/logger';

import { IUserAttributes, IUserInstance } from './user.model';
import { ISocialInstance, ISocialAttributes } from './social.model';
import { IColorAttributes, IColorInstance } from './color.model';
import { IColorPaletteAttributes, IColorPaletteInstance } from './colorPalette.model';
import { IUiComponentAttributes, IUiComponentInstance } from './uiComponent.model';


/************************************/
/*            INTERFACES            */
/************************************/
export interface SequelizeModels {
    User: SequelizeStatic.Model<IUserInstance, IUserAttributes>;
    Social: SequelizeStatic.Model<ISocialInstance, ISocialAttributes>;
    Color: SequelizeStatic.Model<IColorInstance, IColorAttributes>;
    ColorPalette: SequelizeStatic.Model<IColorPaletteInstance, IColorPaletteAttributes>;
    UiComponent: SequelizeStatic.Model<IUiComponentInstance, IUiComponentAttributes>;
}


/****************************************/
/*            DATABASE CLASS            */
/****************************************/
class Database {


    /*     PROPERTIES     */
    /**********************/
    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;


    /*     CONSTRUCTOR     */
    /***********************/
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

        fs
            .readdirSync(__dirname)
            .filter((file: string) => {
                return (file.indexOf('.') !== 0) 
                    && (file !== this._basename) 
                    && (file.slice(-3) === '.js');
            })
            .forEach((file: string) => {
                let model = null;
                try {
                     model = this._sequelize.import(path.join(__dirname, file));
                } catch (e) {
                    throw e;
                }
                
                (<any> this._models)[(model as any).name] = model;
            });


        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof (<any> this._models)[modelName].associate === 'function') {
                (<any> this._models)[modelName].associate(this._models);
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
export const models = database.getModels();
export const sequelize = database. getSequelize();

/* Only on Develop: Recreate DataBase based on new migrations updates  */
// sequelize.sync({force: true});