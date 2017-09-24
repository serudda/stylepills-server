/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { SequelizeModels } from './index';

import { IUiComponent } from './uiComponent.model';
import { ISocial } from './social.model';



/************************************/
/*            INTERFACE             */
/************************************/
export interface IUser {
    id: number | null;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    avatar: string;
    about: string;
    website: string;
    social: ISocial;
    uiComponents: Array<IUiComponent>;
}


export interface IUserAttributes {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    avatar: string;
    about: string;
    website: string;
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
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    User.associate = (models: SequelizeModels) => {
        
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