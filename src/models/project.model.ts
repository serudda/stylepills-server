/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IUser } from './user.model';
import { IComment } from './comment.model';
import { IProjectCategory } from './projectCategory.model';
import { IColor } from './color.model';
import { IAtom } from './atom.model';


/************************************/
/*            INTERFACE             */
/************************************/

export interface IProject {
    id: number | null;
    name: string;
    website: string;
    description: string;
    colorPalette: Array<IColor>;
    active: boolean;
    private: boolean;
    author: IUser;
    category: IProjectCategory;
    atoms: Array<IAtom>;
    createdAt: string;
    updatedAt: string;
}


export interface IProjectAttributes {
    id?: number | null;
    name: string;
    website?: string;
    description?: string;
    authorId: number;
    projectCategoryId: number;
    active?: boolean;
    private: boolean;
}


export interface IProjectInstance extends Instance<IProjectAttributes> {
    dataValues: IProjectAttributes;
}


/*****************************************/
/*               ATOM MODEL              */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IProjectInstance, IProjectAttributes> {

    // CONSTANTS
    const URL_INVALID_MSG = 'Invalid url';

    let Project: any = sequelize.define<IProjectInstance, IProjectAttributes>(
        'Project', {
            name: {
                type: dataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            description: {
                type: dataTypes.TEXT
            },
            website: {
                type: dataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: {
                        args: true,
                        msg: URL_INVALID_MSG
                    }
                }
            },
            active: {
                type: dataTypes.BOOLEAN,
                defaultValue: true
            },
            private: {
                type: dataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: true,
            tableName: 'project',
            freezeTableName: true
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Project.associate = (models: ISequelizeModels) => {

        // one Project belongs to one author (1:M)
        Project.belongsTo(models.User, {
            as: 'Author',
            foreignKey: {
                name: 'authorId',
                field: 'author_id'
            }
        });

        // one Project belongs to one category (1:M)
        Project.belongsTo(models.ProjectCategory, {
            foreignKey: {
                name: 'projectCategoryId',
                field: 'project_category_id'
            }
        });

        // One Project has many Comments (1:M)
        // NOTE: 1 - constraints theory
        Project.hasMany(models.Comment, {
            foreignKey: {
                name: 'commentableId',
                field: 'commentable_id'
            },
            constraints: false,
            scope: {
              commentable: 'project'
            }
        });

        // One project has many colors (1:M)
        Project.hasMany(models.Color, {
            as: 'colorPalette',
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });

        // One Project has many Atoms (1:M)
        Project.hasMany(models.Atom, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });

    };


    return Project;
    
}



/*
 (1). reference: http://docs.sequelizejs.com/manual/tutorial/associations.html  
 */