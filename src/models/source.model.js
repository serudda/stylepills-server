"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*               LIB MODEL               */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let Source = sequelize.define('Source', {
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: dataTypes.STRING,
            allowNull: false
        },
        code: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        order: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        active: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'source',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Source.associate = (models) => {
        // one Source belongs to one Atom (1:M)
        Source.belongsTo(models.Atom, {
            foreignKey: {
                name: 'atomId',
                field: 'atom_id'
            }
        });
        // one Source belongs to one Project (1:M)
        Source.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });
        // one Source belongs to one Preprocessor (1:M)
        Source.belongsTo(models.Preprocessor, {
            foreignKey: {
                name: 'preprocessorId',
                field: 'preprocessor_id'
            }
        });
    };
    return Source;
}
exports.default = default_1;
//# sourceMappingURL=source.model.js.map