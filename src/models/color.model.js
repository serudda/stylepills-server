"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*              COLOR MODEL              */
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
        tableName: 'color',
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