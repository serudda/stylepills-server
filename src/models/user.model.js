"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*              USER MODEL               */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let User = sequelize.define('User', {
        username: {
            type: dataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: dataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: dataTypes.STRING,
            allowNull: true
        },
        email: {
            type: dataTypes.STRING,
            allowNull: true
        },
        website: {
            type: dataTypes.STRING,
            allowNull: true
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: true
        },
        about: {
            type: dataTypes.TEXT,
            allowNull: true
        },
    }, {
        timestamps: true,
        tableName: 'user',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    User.associate = (models) => {
        User.hasMany(models.UiComponent, {
            foreignKey: 'authorId',
            as: 'uiComponent'
        });
        User.hasOne(models.Social, {
            foreignKey: 'userId',
            as: 'social'
        });
    };
    return User;
}
exports.default = default_1;
//# sourceMappingURL=user.model.js.map