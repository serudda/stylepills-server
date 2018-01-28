"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*               ATOM MODEL              */
/*****************************************/
function default_1(sequelize, dataTypes) {
    // CONSTANTS
    const URL_INVALID_MSG = 'Invalid url';
    let Project = sequelize.define('Project', {
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
    }, {
        timestamps: true,
        tableName: 'project',
        freezeTableName: true
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Project.associate = (models) => {
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
exports.default = default_1;
/*
 (1). reference: http://docs.sequelizejs.com/manual/tutorial/associations.html
 */ 
//# sourceMappingURL=project.model.js.map