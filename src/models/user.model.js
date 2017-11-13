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