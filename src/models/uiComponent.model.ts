/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { SequelizeModels } from './index';

import { IUser } from './user.model';
import { IColorPalette } from './colorPalette.model';


/************************************/
/*            INTERFACE             */
/************************************/

export interface IUiComponent {
    id: number | null;
    name: string;
    html: string;
    css: string;
    scss: string;
    background: string;
    colorPalette: IColorPalette;
    author: IUser;
}


export interface IUiComponentAttributes {
    name: string;
    html: string;
    css: string;
    scss: string;
    background: string;
}


export interface IUiComponentInstance extends Instance<IUiComponentAttributes> {
    dataValues: IUiComponentAttributes;
}


/*****************************************/
/*           UI COMPONENT MODEL          */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IUiComponentInstance, IUiComponentAttributes> {

    let UiComponent: any = sequelize.define<IUiComponentInstance, IUiComponentAttributes>(
        'UiComponent', {
            name: {
                type: dataTypes.STRING,
                allowNull: true
            },
            html: {
                type: dataTypes.STRING,
                allowNull: true
            },
            css: {
                type: dataTypes.TEXT,
                allowNull: true
            },
            scss: {
                type: dataTypes.TEXT,
                allowNull: true
            },
            background: {
                type: dataTypes.STRING,
                allowNull: true
            }
        }, 
        {
            timestamps: true,
            tableName: 'uiComponent',
            freezeTableName: true
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    UiComponent.associate = (models: SequelizeModels) => {

        UiComponent.hasOne(models.ColorPalette, {
            foreignKey: 'uiComponentId',
            as: 'colorPalette'
        });

        UiComponent.belongsTo(models.User, {
            foreignKey: 'authorId',
            onDelete: 'CASCADE'
        });

    };


    return UiComponent;
    
}