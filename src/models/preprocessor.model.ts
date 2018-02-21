/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';


/************************************/
/*            INTERFACE             */
/************************************/

/* Possible preprocessor type options */
export enum PreprocessorTypeOptions {
    sass = 'sass',
    scss = 'scss',
    less = 'less',
    stylus = 'stylus'
}

/* Possible preprocessor name options */
export enum PreprocessorNameOptions {
    sass = 'SASS',
    scss = 'SCSS',
    less = 'Less',
    stylus = 'Stylus'
}

/* Possible compileTo type options */
export enum CompileToTypeOptions {
    html = 'html',
    css = 'css',
    js = 'js'
}

export interface IPreprocessor {
    id: number | null;
    name: PreprocessorNameOptions;
    type: PreprocessorTypeOptions;
    compileTo: CompileToTypeOptions;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface IPreprocessorAttributes {
    name: PreprocessorNameOptions;
    type: PreprocessorTypeOptions;
    compileTo: CompileToTypeOptions;
    active: boolean;
}


export interface IPreprocessorInstance extends Instance<IPreprocessorAttributes> {
    dataValues: IPreprocessorAttributes;
}


/*****************************************/
/*               COLOR MODEL             */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IPreprocessorInstance, IPreprocessorAttributes> {

    let Preprocessor: any = sequelize.define<IPreprocessorInstance, IPreprocessorAttributes>(
        'Preprocessor', {
            type: {
                type: dataTypes.STRING,
                allowNull: false
            },
            name: {
                type: dataTypes.STRING,
                allowNull: false
            },
            compileTo: {
                type: dataTypes.STRING,
                field: 'compile_to',
                allowNull: false
            },
            active: {
                type: dataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            timestamps: true,
            tableName: 'preprocessor',
            freezeTableName: true,
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Preprocessor.associate = (models: ISequelizeModels) => {

        // one Preprocessor belongs to Many Projects (1:M)
        Preprocessor.belongsToMany(models.Project, {  
            through: 'project_preprocessor',
            foreignKey: {
                name: 'preprocessorId',
                field: 'preprocessor_id'
            }
        });

        // one Preprocessor belongs to Many Atoms (1:M)
        Preprocessor.belongsToMany(models.Atom, { 
            through: 'atom_preprocessor', 
            foreignKey: {
                name: 'preprocessorId',
                field: 'preprocessor_id'
            }
        });
        
    };


    return Preprocessor;

}