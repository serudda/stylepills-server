
/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IUser } from 'models/user.model';
import { IComment } from 'models/comment.model';
import { IAtomCategory } from 'models/atomCategory.model';
import { ILib, ILibInstance } from 'models/lib.model';
import { IProject } from 'models/project.model';


/************************************/
/*            INTERFACE             */
/************************************/

/* TODO: Esto no esta bien implementado, es logica del FrontEnd, el que lea esto no lo va a entender,
esto viene de la logica del duplicate.action, y no tiene nada que ver aqui */
export interface ICodeProps {
    code: string;
}

export interface IAtomCode {
    codeType: string;
    codeProps: ICodeProps;
}

export interface ISourceCode {
    type: string;
    code: string;
    active: boolean;
}

export interface IAtom {
    id: number | null;
    name: string;
    description: string;
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
    project: Array<IProject>;
    category: IAtomCategory;
    createdAt: string;
    updatedAt: string;
}


export interface IAtomAttributes {
    id?: number | null;
    name: string;
    description?: string;
    html: string;
    css: string;
    contextualBg: string;
    download: string;
    duplicated?: boolean;
    authorId: number;
    ownerId?: number;
    atomCategoryId: number | string;
    projectId?: number;
    project?: IProject;
    libs?: Array<ILibInstance | ILib>;
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
                type: dataTypes.STRING,
                allowNull: false
            },
            description: {
                type: dataTypes.TEXT
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
            as: 'project',
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

        // One atom has many Libs (1:M)
        Atom.hasMany(models.Lib, {
            as: 'libs',
            foreignKey: {
                name: 'atomId',
                field: 'atom_id'
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


/************************************/
/*             FUNCTIONS            */
/************************************/


/**
 * @desc Extract new code
 * @function _extractCode
 * @public
 * @param {string} type - source code type (html, css, etc)
 * @param {Array<IAtomCode>} atomCode - New Atom source code
 * @returns {any}
 * TODO: Esto esta super mal implementado, el que vea esta funcion no va a entender
 * que es IAtomCode, para que sirve esta funcion, etc.
 */

export const extractCode = 
    (type: string, atomCode: Array<IAtomCode>): string => {
    
    let code = null;
    
    if (!atomCode) { return code; }

    atomCode.forEach(atomCodeObj => {
        if (atomCodeObj.codeType === type) {
            code = atomCodeObj.codeProps.code;
        }
    });

    return code;

};


/**
 * @desc Build New Atom Object
 * @function _buildNewAtom
 * @private
 * @param {IAtomAttributes} atom - Atom data object
 * @param {number} userId - owner id
 * @param {Array<IAtomCode>} atomCode - New Atom source code
 * @returns {IAtomAttributes} New Atom data object
 */

export const buildNewAtom = 
    (atom: IAtomAttributes, userId: number, atomCode: Array<IAtomCode>): IAtomAttributes => {

    const { project } = atom;
    const html = extractCode('html', atomCode) || atom.html;
    const css = extractCode('css', atomCode) || atom.css;
    let atomLibs: Array<any> = [];
    let projectLibs: Array<any> = [];
    let libs: Array<any> = [];

    // If atom libs exist, remove ids in order to create new records
    if (atom.libs) {
        atomLibs = atom.libs.filter((lib: ILibInstance) => {
            delete lib.dataValues.id;
            delete lib.dataValues.atomId;
            delete lib.dataValues.projectId;
            return true;
        });
    }

    // If project libs exist, remove ids in order to create new records
    if (project) {
        if (project.libs) {
            projectLibs = atom.project.libs.filter((lib: ILibInstance) => {
                delete lib.dataValues.id;
                delete lib.dataValues.atomId;
                delete lib.dataValues.projectId;
                return true;
            });
        }
    }

    libs = atomLibs.concat(projectLibs);
    
    return {
        name: atom.name,
        html,
        css,
        description: atom.description,
        contextualBg: atom.contextualBg,
        download: atom.download,
        active: true,
        private: false,
        duplicated: true,
        authorId: atom.authorId,
        ownerId: userId,
        atomCategoryId: atom.atomCategoryId,
        libs
    };

};



/*
 (1). reference: http://docs.sequelizejs.com/manual/tutorial/associations.html  
 */