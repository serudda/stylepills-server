"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*           ATOM CATEGORY MODEL         */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let AtomCategory = sequelize.define('AtomCategory', {
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
        tableName: 'atom_category',
        freezeTableName: true
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    AtomCategory.associate = (models) => {
        // One Category has many Atoms (1:M)
        AtomCategory.hasMany(models.Atom, {
            foreignKey: {
                name: 'atomCategoryId',
                field: 'atom_category_id'
            }
        });
    };
    return AtomCategory;
}
exports.default = default_1;
//# sourceMappingURL=atomCategory.model.js.map