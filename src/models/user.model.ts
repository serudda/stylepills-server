/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IAtom } from './atom.model';



/************************************/
/*            INTERFACE             */
/************************************/
export interface IUser {
    id: number | null;
    username: string;
    firstname: string;
    lastname: string;
    email: string; 
    password: string;
    website: string;
    avatar: string;
    about: string;
    active: boolean;
    atoms: Array<IAtom>;
    createdAt: string;
    updatedAt: string;
}


export interface IUserAttributes {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    website: string;
    avatar: string;
    about: string;
    active: boolean;
}


export interface IUserInstance extends Instance<IUserAttributes> {
    dataValues: IUserAttributes;
}


/*****************************************/
/*              USER MODEL               */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IUserInstance, IUserAttributes> {

    let User: any = sequelize.define<IUserInstance, IUserAttributes>(
        'User', {
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
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    User.associate = (models: ISequelizeModels) => {

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

        // One user is author of many Comments (1:M)
        User.hasMany(models.Comment, {
            foreignKey: 'author'
        });

    };


    return User;

}