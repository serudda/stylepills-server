"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*           UI COMPONENT MODEL          */
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
        timestamps: true,
        tableName: 'uiComponent',
        freezeTableName: true
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    UiComponent.associate = (models) => {
        // Create relationship
        UiComponent.hasOne(models.ColorPalette, {
            foreignKey: 'uiComponentId',
            as: 'colorPalette'
        });
    };
    return UiComponent;
}
exports.default = default_1;
//# sourceMappingURL=uiComponent.model.js.map