"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*               ATOM MODEL              */
/*****************************************/
function default_1(sequelize, dataTypes) {
    /* NOTE: No change 'Atom' to 'atom', it throws an error: called with something that's not
       an instance of Sequelize.Model */
    let Atom = sequelize.define('Atom', {
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
    }, {
        timestamps: true,
        tableName: 'atom',
        freezeTableName: true
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Atom.associate = (models) => {
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
exports.default = default_1;
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
exports.extractCode = (type, atomCode) => {
    let code = null;
    if (!atomCode) {
        return code;
    }
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
exports.buildNewAtom = (atom, userId, atomCode) => {
    const html = exports.extractCode('html', atomCode) || atom.html;
    const css = exports.extractCode('css', atomCode) || atom.css;
    let libs = [];
    // If libs exist, remove ids in order to create new records
    if (atom.libs) {
        libs = atom.libs.filter((lib) => {
            delete lib.dataValues.id;
            delete lib.dataValues.atomId;
            delete lib.dataValues.projectId;
            return true;
        });
    }
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
//# sourceMappingURL=atom.model.js.map