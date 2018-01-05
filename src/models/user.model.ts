/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import * as appConfig from './../core/constants/app.constants';

import { IAtom } from './atom.model';
import { IProject } from './project.model';


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
    atoms: Array<IAtom>;
    projects: Array<IProject>;
    active: boolean;
    isBetaMember: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface IUserAttributes {
    id: number | null;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    website: string;
    avatar: string;
    about: string;
    active: boolean;
    isBetaMember: boolean;
}


export interface IUserInstance extends Instance<IUserAttributes> {
    dataValues: IUserAttributes;
    createAuthenticationMethod?: (args: any) => Promise<any>;
}


/*****************************************/
/*              USER MODEL               */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IUserInstance, IUserAttributes> {

    // CONSTANTS
    // tslint:disable:max-line-length
    const USERNAME_LENGTH_MSG = `The username needs to be between ${appConfig.USERNAME_MIN_LENGTH} and ${appConfig.USERNAME_MAX_LENGTH} characters long`;
    const EMAIL_INVALID_MSG = 'Invalid email';
    const PASSWORD_LENGTH_MSG = `The password needs to be between ${appConfig.USERNAME_MIN_LENGTH} and ${appConfig.USERNAME_MAX_LENGTH} characters long`;
    const URL_INVALID_MSG = 'Invalid url';


    let User: any = sequelize.define<IUserInstance, IUserAttributes>(
        'User', {
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
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    User.associate = (models: ISequelizeModels) => {

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
            as: 'AtomAuthor',
            foreignKey: {
                name: 'atomAuthorId',
                field: 'atom_author_id'
            }
        });

        // One user is author of many Projects (1:M)
        User.hasMany(models.Project, {
            as: 'ProjectAuthor',
            foreignKey: {
                name: 'projectAuthorId',
                field: 'project_author_id'
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