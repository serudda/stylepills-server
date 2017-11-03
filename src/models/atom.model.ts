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
    name: string;
    html: string;
    css: string;
    contextualBg: string;
    download: string;
    stores: number;
    views: number;
    likes: number;
    atomCategoryId: number;
    active: boolean;
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
                field: 'contextual_bg'
            },
            stores: {
                type: dataTypes.INTEGER
            },
            views: {
                type: dataTypes.INTEGER
            },
            likes: {
                type: dataTypes.INTEGER
            },
            download: {
                type: dataTypes.TEXT
            },
            active: {
                type: dataTypes.BOOLEAN
            },
            private: {
                type: dataTypes.BOOLEAN
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

        // one Atom belongs to many owners (N:M)
        /* TODO: Cuando se vaya a agregar el 'owner' analizar muy bien, ya que si descomento esto, 
        la relacion Atom.belongsTo.User de abajo, deja de funcionar y me trae atoms: [] */
        /*Atom.belongsToMany(models.User, {
            through: 'owner',
            foreignKey: {
                name: 'atomId',
                field: 'atom_id'
            }
        });*/

        // one Atom belongs to one author (1:M)
        Atom.belongsTo(models.User, {
            foreignKey: {
                name: 'authorId',
                field: 'author_id'
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