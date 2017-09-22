"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*              COLOR MODEL              */
/*****************************************/
function default_1(sequelize, dataTypes) {
    // NOTE: It was impossible to remove any here, because 'associate' does not exist.
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
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Color.associate = (models) => {
        Color.belongsTo(models.ColorPalette, {
            foreignKey: 'colorPaletteId',
            onDelete: 'CASCADE'
        });
    };
    return Color;
}
exports.default = default_1;
//# sourceMappingURL=color.model.js.map