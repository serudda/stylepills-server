"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*            INTERFACE             */
/************************************/
/* Possible preprocessor type options */
var PreprocessorTypeOptions;
(function (PreprocessorTypeOptions) {
    PreprocessorTypeOptions["sass"] = "sass";
    PreprocessorTypeOptions["scss"] = "scss";
    PreprocessorTypeOptions["less"] = "less";
    PreprocessorTypeOptions["stylus"] = "stylus";
})(PreprocessorTypeOptions = exports.PreprocessorTypeOptions || (exports.PreprocessorTypeOptions = {}));
/* Possible preprocessor name options */
var PreprocessorNameOptions;
(function (PreprocessorNameOptions) {
    PreprocessorNameOptions["sass"] = "SASS";
    PreprocessorNameOptions["scss"] = "SCSS";
    PreprocessorNameOptions["less"] = "Less";
    PreprocessorNameOptions["stylus"] = "Stylus";
})(PreprocessorNameOptions = exports.PreprocessorNameOptions || (exports.PreprocessorNameOptions = {}));
/* Possible compileTo type options */
var CompileToTypeOptions;
(function (CompileToTypeOptions) {
    CompileToTypeOptions["html"] = "html";
    CompileToTypeOptions["css"] = "css";
    CompileToTypeOptions["js"] = "js";
})(CompileToTypeOptions = exports.CompileToTypeOptions || (exports.CompileToTypeOptions = {}));
/*****************************************/
/*               COLOR MODEL             */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let Preprocessor = sequelize.define('Preprocessor', {
        type: {
            type: dataTypes.STRING,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        compileTo: {
            type: dataTypes.STRING,
            field: 'compile_to',
            allowNull: false
        },
        active: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'preprocessor',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Preprocessor.associate = (models) => {
        // one Preprocessor belongs to Many Projects (1:M)
        Preprocessor.belongsToMany(models.Project, {
            through: 'project_preprocessor',
            foreignKey: {
                name: 'preprocessorId',
                field: 'preprocessor_id'
            }
        });
        // one Preprocessor belongs to Many Atoms (1:M)
        Preprocessor.belongsToMany(models.Atom, {
            through: 'atom_preprocessor',
            foreignKey: {
                name: 'preprocessorId',
                field: 'preprocessor_id'
            }
        });
    };
    return Preprocessor;
}
exports.default = default_1;
//# sourceMappingURL=preprocessor.model.js.map