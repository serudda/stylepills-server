"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig = require("./../constants/app.constants");
/*****************************************/
/*              USER MODEL               */
/*****************************************/
function default_1(sequelize, dataTypes) {
    // CONSTANTS
    // tslint:disable:max-line-length
    const USERNAME_LENGTH_MSG = `The username needs to be between ${appConfig.USERNAME_MIN_LENGTH} and ${appConfig.USERNAME_MAX_LENGTH} characters long`;
    const EMAIL_INVALID_MSG = 'Invalid email';
    const PASSWORD_LENGTH_MSG = `The password needs to be between ${appConfig.USERNAME_MIN_LENGTH} and ${appConfig.USERNAME_MAX_LENGTH} characters long`;
    const URL_INVALID_MSG = 'Invalid url';
    let User = sequelize.define('User', {
        username: {
            type: dataTypes.STRING,
            unique: true,
            validate: {
                len: {
                    args: [appConfig.USERNAME_MIN_LENGTH, appConfig.USERNAME_MAX_LENGTH],
                    msg: USERNAME_LENGTH_MSG,
                }
            }
        },
        firstname: {
            type: dataTypes.STRING
        },
        lastname: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: EMAIL_INVALID_MSG,
                }
            }
        },
        password: {
            type: dataTypes.STRING,
            validate: {
                len: {
                    args: [appConfig.PASSWORD_MIN_LENGTH, appConfig.PASSWORD_MAX_LENGTH],
                    msg: PASSWORD_LENGTH_MSG,
                }
            }
        },
        website: {
            type: dataTypes.STRING,
            validate: {
                isUrl: {
                    args: true,
                    msg: URL_INVALID_MSG,
                }
            }
        },
        avatar: {
            type: dataTypes.TEXT
        },
        about: {
            type: dataTypes.TEXT
        },
        isBetaMember: {
            type: dataTypes.BOOLEAN,
            field: 'is_beta_member',
            defaultValue: true,
            allowNull: false
        },
        active: {
            type: dataTypes.BOOLEAN
        },
    }, {
        timestamps: true,
        tableName: 'user',
        freezeTableName: true
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    User.associate = (models) => {
        // one User belongs to many Atoms (N:M)
        /* TODO: Cuando se vaya a agregar el 'owner' analizar muy bien, ya que si descomento esto,
        la relacion User.hasMany.Atom de abajo, deja de funcionar y me trae atoms: [] */
        /*User.belongsToMany(models.Atom, {
            through: 'owner',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });*/
        // One user is author of many Atoms (1:M)
        User.hasMany(models.Atom, {
            foreignKey: {
                name: 'authorId',
                field: 'author_id'
            }
        });
        // One user has many authentication methods (1:M)
        User.hasMany(models.AuthenticationMethod, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };
    return User;
}
exports.default = default_1;
//# sourceMappingURL=user.model.js.map