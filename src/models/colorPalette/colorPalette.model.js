"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let ColorPalette = sequelize.define('ColorPalette', {
        label: {
            type: dataTypes.STRING,
            allowNull: true
        },
        hex: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }, {
        indexes: [],
        timestamps: false
    });
    // Create relationship
    ColorPalette.belongsTo(index_1.models.UiComponent, {
        foreignKey: 'uiComponentId',
        onDelete: 'CASCADE'
    });
    return ColorPalette;
}
exports.default = default_1;
//# sourceMappingURL=colorPalette.model.js.map