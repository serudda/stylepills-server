/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

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

    let User: any = sequelize.define<IUserInstance, IUserAttributes>(
        'User', {
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