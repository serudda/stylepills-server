"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let ColorPalette = sequelize.define('ColorPalette', {
        category: {
            type: dataTypes.STRING,
            allowNull: true
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true,
        // Avoid plural table name
        tableName: 'colorPalette',
        // Avoid plural table name
        freezeTableName: true
    });
    ColorPalette.associate = (models) => {
        // Create relationship
        ColorPalette.hasMany(models.Color, {
            /* Estas dos lineas las hace por defecto
            tomando el nombre del modelo */
            foreignKey: 'colorPaletteId',
            as: 'color'
        });
        ColorPalette.belongsTo(models.UiComponent, {
            foreignKey: 'uiComponentId',
            onDelete: 'CASCADE'
        });
    };
    return ColorPalette;
}
exports.default = default_1;
//# sourceMappingURL=colorPalette.model.js.map