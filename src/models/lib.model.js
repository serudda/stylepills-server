"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*            INTERFACE             */
/************************************/
/* Possible lib type options */
var LibTypeOptions;
(function (LibTypeOptions) {
    LibTypeOptions["css"] = "css";
    LibTypeOptions["javascript"] = "javascript";
})(LibTypeOptions = exports.LibTypeOptions || (exports.LibTypeOptions = {}));
/*****************************************/
/*               LIB MODEL               */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let Lib = sequelize.define('Lib', {
        name: {
            type: dataTypes.STRING
        },
        url: {
            type: dataTypes.STRING,
            allowNull: false
        },
        type: {
            type: dataTypes.STRING,
            allowNull: false
        },
        active: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'lib',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Lib.associate = (models) => {
        // one Lib belongs to one Atom (1:M)
        Lib.belongsTo(models.Atom, {
            foreignKey: {
                name: 'atomId',
                field: 'atom_id'
            }
        });
        // one Lib belongs to one Project (1:M)
        Lib.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });
    };
    return Lib;
}
exports.default = default_1;
//# sourceMappingURL=lib.model.js.map