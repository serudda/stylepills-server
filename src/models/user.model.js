"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*              USER MODEL               */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let User = sequelize.define('User', {
        username: {
            type: dataTypes.STRING,
            unique: true
        },
        firstname: {
            type: dataTypes.STRING
        },
        lastname: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            unique: true
        },
        password: {
            type: dataTypes.STRING
        },
        website: {
            type: dataTypes.STRING
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
        // One user is owner of many Atoms (1:M)
        User.hasMany(models.Atom, {
            as: 'Owner',
            foreignKey: {
                name: 'ownerId',
                field: 'owner_id'
            }
        });
        // One user is author of many Atoms (1:M)
        User.hasMany(models.Atom, {
            as: 'Author',
            foreignKey: {
                name: 'authorId',
                field: 'author_id'
            }
        });
        // One user is author of many Projects (1:M)
        User.hasMany(models.Project, {
            as: 'ProjectAuthor',
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