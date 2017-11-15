/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';


/************************************/
/*            INTERFACE             */
/************************************/
export interface IAuthenticationMethod {
    id: number | null;
    externalId: number;
    type: string;
    token: string;
    username: string;
    displayName: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface IAuthenticationMethodAttributes {
    externalId: number;
    type: string;
    token: string;
    username: string;
    displayName: string;
    active: boolean;
}


export interface IAuthenticationMethodInstance extends Instance<IAuthenticationMethodAttributes> {
    dataValues: IAuthenticationMethodAttributes;
}


/*****************************************/
/*             SOCIAL MODEL              */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IAuthenticationMethodInstance, IAuthenticationMethodAttributes> {

    let AuthenticationMethod: any = sequelize.define<IAuthenticationMethodInstance, IAuthenticationMethodAttributes>(
        'AuthenticationMethod', {
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
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    AuthenticationMethod.associate = (models: ISequelizeModels) => {
        AuthenticationMethod.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        
    };


    return AuthenticationMethod;

}