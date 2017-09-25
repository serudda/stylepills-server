"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*             SOCIAL MODEL              */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let Social = sequelize.define('Social', {
        twitter: {
            type: dataTypes.STRING,
            allowNull: true
        },
        facebook: {
            type: dataTypes.STRING,
            allowNull: true
        },
        github: {
            type: dataTypes.STRING,
            allowNull: true
        },
        linkedin: {
            type: dataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: true,
        tableName: 'social',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Social.associate = (models) => {
        Social.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Social;
}
exports.default = default_1;
//# sourceMappingURL=social.model.js.map