"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*              USER MODEL               */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let User = sequelize.define('User', {
        username: {
            type: dataTypes.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: 'The username can only contain letters and numbers',
                },
                len: {
                    args: [3, 25],
                    msg: 'The username needs to be between 3 and 25 characters long',
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
                    msg: 'Invalid email',
                }
            }
        },
        password: {
            type: dataTypes.STRING,
            validate: {
                len: {
                    args: [5, 100],
                    msg: 'The password needs to be between 5 and 100 characters long',
                }
            }
        },
        website: {
            type: dataTypes.STRING,
            validate: {
                isUrl: {
                    args: true,
                    msg: 'Invalid url',
                }
            }
        },
        avatar: {
            type: dataTypes.TEXT
        },
        about: {
            type: dataTypes.TEXT
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
        User.belongsToMany(models.Atom, {
            through: 'owner',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        // One user is author of many Atoms (1:M)
        User.hasMany(models.Atom, {
            foreignKey: 'author'
        });
    };
    return User;
}
exports.default = default_1;
//# sourceMappingURL=user.model.js.map