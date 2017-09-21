"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let Color = sequelize.define('Color', {
        label: {
            type: dataTypes.STRING,
            allowNull: true
        },
        hex: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: true,
        // Avoid plural table name
        tableName: 'color',
        // Avoid plural table name
        freezeTableName: true
    });
    Color.associate = (models) => {
        // Create relationship
        Color.belongsTo(models.ColorPalette, {
            foreignKey: 'colorPaletteId',
            onDelete: 'CASCADE'
        });
    };
    return Color;
}
exports.default = default_1;
//# sourceMappingURL=color.model.js.map