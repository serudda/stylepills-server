"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*           UI COMPONENT MODEL          */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let UiComponent = sequelize.define('UiComponent', {
        name: {
            type: dataTypes.STRING,
            allowNull: true
        },
        html: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        css: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        scss: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        background: {
            type: dataTypes.STRING,
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
        UiComponent.hasOne(models.ColorPalette, {
            foreignKey: 'uiComponentId',
            as: 'colorPalette'
        });
        UiComponent.belongsTo(models.User, {
            foreignKey: 'authorId',
            onDelete: 'CASCADE'
        });
    };
    return UiComponent;
}
exports.default = default_1;
//# sourceMappingURL=uiComponent.model.js.map