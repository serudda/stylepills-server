"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*           ATOM CATEGORY MODEL         */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let ProjectCategory = sequelize.define('ProjectCategory', {
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        active: {
            type: dataTypes.BOOLEAN
        }
    }, {
        timestamps: true,
        tableName: 'project_category',
        freezeTableName: true
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    ProjectCategory.associate = (models) => {
        // One Category has many Projects (1:M)
        ProjectCategory.hasMany(models.Project, {
            foreignKey: {
                name: 'projectCategoryId',
                field: 'project_category_id'
            }
        });
    };
    return ProjectCategory;
}
exports.default = default_1;
//# sourceMappingURL=projectCategory.model.js.map