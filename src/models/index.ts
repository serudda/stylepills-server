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

import { IUserAttributes, IUserInstance } from './user.model';
import { IAuthenticationMethodAttributes, IAuthenticationMethodInstance } from './authenticationMethod.model';
import { IAtomAttributes, IAtomInstance } from './atom.model';
import { IAtomCategoryAttributes, IAtomCategoryInstance } from './atomCategory.model';
import { ICommentAttributes, ICommentInstance } from './comment.model';
import { IProjectAttributes, IProjectInstance } from './project.model';
import { IProjectCategoryAttributes, IProjectCategoryInstance } from './projectCategory.model';
import { IColorAttributes, IColorInstance } from './color.model';
import { IRgbaColorAttributes, IRgbaColorInstance } from './rgbaColor.model';


/************************************/
/*            INTERFACES            */
/************************************/
export interface ISequelizeModels {
    User: SequelizeStatic.Model<IUserInstance, IUserAttributes>;
    AuthenticationMethod: SequelizeStatic.Model<IAuthenticationMethodInstance, IAuthenticationMethodAttributes>;
    Atom: SequelizeStatic.Model<IAtomInstance, IAtomAttributes>;
    AtomCategory: SequelizeStatic.Model<IAtomCategoryInstance, IAtomCategoryAttributes>;
    Comment: SequelizeStatic.Model<ICommentInstance, ICommentAttributes>;
    Project: SequelizeStatic.Model<IProjectInstance, IProjectAttributes>;
    ProjectCategory: SequelizeStatic.Model<IProjectCategoryInstance, IProjectCategoryAttributes>;
    Color: SequelizeStatic.Model<IProjectCategoryInstance, IProjectCategoryAttributes>;
    RgbaColor: SequelizeStatic.Model<IRgbaColorInstance, IRgbaColorAttributes>;
}


/****************************************/
/*            DATABASE CLASS            */
/****************************************/
class Database {


    /*     PROPERTIES     */
    /**********************/
    private _basename: string;
    private _models: ISequelizeModels;
    private _sequelize: Sequelize;


    /*     CONSTRUCTOR     */
    /***********************/
    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = config.getDatabaseConfig();

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

/* Only on Local: Recreate DataBase based on new migrations updates  */
if (config.getEnv() === 'local') {
    sequelize.sync({});
}