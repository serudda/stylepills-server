"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let ColorPalette = sequelize.define("ColorPalette", {
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
        classMethods: {
            associate: function (models) {
                models.ColorPalette.belongsTo(models.UiComponent, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        },
        timestamps: false
    });
    //ColorPalette.belongsTo(models.UiComponent);
    return ColorPalette;
}
exports.default = default_1;
//# sourceMappingURL=colorPalette.model.js.map