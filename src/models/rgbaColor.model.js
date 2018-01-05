"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*             SOCIAL MODEL              */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let RgbaColor = sequelize.define('RgbaColor', {
        r: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 255
        },
        g: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 255
        },
        b: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 255
        },
        a: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 0,
                max: 1
            }
        }
    }, {
        tableName: 'rgba_color',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    RgbaColor.associate = (models) => {
        // one RgbaColor belongs to one Color (1:M)
        RgbaColor.belongsTo(models.Color, {
            foreignKey: {
                name: 'colorId',
                field: 'color_id'
            }
        });
    };
    return RgbaColor;
}
exports.default = default_1;
//# sourceMappingURL=rgbaColor.model.js.map