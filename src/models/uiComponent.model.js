"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }, {
        timestamps: true,
        // Avoid plural table name
        tableName: 'uiComponent',
        // Avoid plural table name
        freezeTableName: true
    });
    UiComponent.associate = (models) => {
        // Create relationship
        UiComponent.hasOne(models.ColorPalette, {
            /* La asignación del foreignKey la hace por defecto, si quiero una
            llave personalizada uso la linea de abajo */
            foreignKey: 'uiComponentId',
            /* Este campo es importante, ya que si lo cambio, tendria que cambiarlo
            en el resolver: getColorPalettes', ya que sino al hacer el llamado de
            en GraphIQL obtendriamos este error:
            uiComponent.getColorPalette is not a function */
            /* Estas linea las hace por defecto
            tomando el nombre del modelo */
            as: 'colorPalette'
        });
    };
    return UiComponent;
}
exports.default = default_1;
//# sourceMappingURL=uiComponent.model.js.map