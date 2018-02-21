/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IUser } from 'models/user.model';
import { IComment } from 'models/comment.model';
import { IProjectCategory } from 'models/projectCategory.model';
import { IColor } from 'models/color.model';
import { IAtom } from 'models/atom.model';
import { ILib, ILibInstance } from 'models/lib.model';
import { ISource, ISourceInstance } from 'models/source.model';


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
    libs: Array<ILibInstance | ILib>;
    sources: Array<ISource>;
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
    libs?: Array<ILibInstance | ILib>;
    sources?: Array<ISourceInstance | ISource>;
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
                allowNull: false
            },
            description: {
                type: dataTypes.TEXT
            },
            website: {
                type: dataTypes.STRING,
                allowNull: true
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

        // One project has many Libs (1:M)
        Project.hasMany(models.Lib, {
            as: 'libs',
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });

        // One project has many Sources (1:M)
        Project.hasMany(models.Source, {
            as: 'sources',
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });
        
        // One project belongs to many Preproccesors (1:M)
        Project.belongsToMany(models.Preprocessor, {
            as: 'preprocessors',
            through: 'project_preprocessor',
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