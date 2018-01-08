/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IUser } from './user.model';
import { IComment } from './comment.model';
import { IAtomCategory } from './atomCategory.model';


/************************************/
/*            INTERFACE             */
/************************************/

export interface ISourceCode {
    type: string;
    code: string;
    active: boolean;
}

export interface IAtom {
    id: number | null;
    name: string;
    html: string;
    css: string;
    contextualBg: string;
    stores: number;
    views: number;
    likes: number;
    duplicated: boolean;
    comments: Array<IComment>;
    download: string;
    active: boolean;
    private: boolean;
    author: IUser;
    category: IAtomCategory;
    createdAt: string;
    updatedAt: string;
}


export interface IAtomAttributes {
    id?: number | null;
    name: string;
    html: string;
    css: string;
    contextualBg: string;
    download: string;
    duplicated?: boolean;
    authorId: number;
    ownerId?: number;
    atomCategoryId: number;
    projectId?: number;
    active?: boolean;
    private: boolean;
}


export interface IAtomInstance extends Instance<IAtomAttributes> {
    dataValues: IAtomAttributes;
}


/*****************************************/
/*               ATOM MODEL              */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IAtomInstance, IAtomAttributes> {
    /* NOTE: No change 'Atom' to 'atom', it throws an error: called with something that's not 
       an instance of Sequelize.Model */
    let Atom: any = sequelize.define<IAtomInstance, IAtomAttributes>(
        'Atom', {
            name: {
                type: dataTypes.STRING
            },
            html: {
                type: dataTypes.TEXT
            },
            css: {
                type: dataTypes.TEXT
            },
            contextualBg: {
                type: dataTypes.STRING,
                field: 'contextual_bg',
                defaultValue: '#FFFFFF'
            },
            stores: {
                type: dataTypes.INTEGER,
                defaultValue: 0
            },
            views: {
                type: dataTypes.INTEGER,
                defaultValue: 0
            },
            likes: {
                type: dataTypes.INTEGER,
                defaultValue: 0
            },
            duplicated: {
                type: dataTypes.BOOLEAN,
                defaultValue: false
            },
            download: {
                type: dataTypes.TEXT
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
            tableName: 'atom',
            freezeTableName: true
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Atom.associate = (models: ISequelizeModels) => {

        // one Atom belongs to one author (1:M)
        Atom.belongsTo(models.User, {
            as: 'Author',
            foreignKey: {
                name: 'authorId',
                field: 'author_id'
            }
        });

        // one Atom belongs to one Project (1:M)
        Atom.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });

        // one Atom belongs to one owner (1:M)
        Atom.belongsTo(models.User, {
            as: 'Owner',
            foreignKey: {
                name: 'ownerId',
                field: 'owner_id'
            }
        });

        // one Atom belongs to one category (1:M)
        Atom.belongsTo(models.AtomCategory, {
            foreignKey: {
                name: 'atomCategoryId',
                field: 'atom_category_id'
            }
        });

        // One Atom has many Comments (1:M)
        // NOTE: 1 - constraints theory
        Atom.hasMany(models.Comment, {
            foreignKey: {
                name: 'commentableId',
                field: 'commentable_id'
            },
            constraints: false,
            scope: {
              commentable: 'atom'
            }
        });

    };


    return Atom;
    
}



/*
 (1). reference: http://docs.sequelizejs.com/manual/tutorial/associations.html  
 */