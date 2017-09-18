"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let UiComponent = sequelize.define('UiComponent', {
        title: {
            type: dataTypes.STRING,
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
    }, {
        classMethods: {
            associate: function (models) {
                models.UiComponent.hasMany(models.ColorPalette);
            }
        }
    });
    //UiComponent.hasMany(models.ColorPalette);
    return UiComponent;
}
exports.default = default_1;
//# sourceMappingURL=uiComponent.model.js.map