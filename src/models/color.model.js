"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*             SOCIAL MODEL              */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let Color = sequelize.define('Color', {
        name: {
            type: dataTypes.STRING
        },
        hex: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: '#FFFFFF'
        },
        type: {
            type: dataTypes.STRING,
            allowNull: false
        },
        active: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'color',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Color.associate = (models) => {
        // one Color belongs to one Project (1:M)
        Color.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });
        // one Color has one RgbaColor (1:1)
        Color.hasOne(models.RgbaColor, {
            as: 'rgba',
            foreignKey: {
                name: 'colorId',
                field: 'color_id'
            }
        });
    };
    return Color;
}
exports.default = default_1;
//# sourceMappingURL=color.model.js.map