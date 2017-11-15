"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*             SOCIAL MODEL              */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let AuthenticationMethod = sequelize.define('AuthenticationMethod', {
        externalId: {
            type: dataTypes.STRING,
            field: 'external_id'
        },
        type: {
            type: dataTypes.STRING,
            allowNull: false
        },
        token: {
            type: dataTypes.TEXT
        },
        username: {
            type: dataTypes.STRING
        },
        displayName: {
            type: dataTypes.STRING,
            field: 'display_name'
        },
        active: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'authentication_method',
        freezeTableName: true,
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    AuthenticationMethod.associate = (models) => {
        AuthenticationMethod.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };
    return AuthenticationMethod;
}
exports.default = default_1;
//# sourceMappingURL=authenticationMethod.model.js.map