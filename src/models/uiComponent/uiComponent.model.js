"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let UiComponent = sequelize.define('UiComponent', {
        title: {
            type: dataTypes.STRING,
            // defaultValue: false,
            allowNull: true
        },
        html: {
            type: dataTypes.STRING,
            allowNull: true
        },
        css: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        scss: {
            type: dataTypes.TEXT,
            allowNull: true
        }
    });
    // Create relationship
    UiComponent.hasMany(index_1.models.ColorPalette, {
        foreignKey: 'uiComponentId',
        as: 'colorPalette'
    });
    return UiComponent;
}
exports.default = default_1;
//# sourceMappingURL=uiComponent.model.js.map