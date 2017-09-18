/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import {Instance, DataTypes, Sequelize} from 'sequelize';
import { models } from "../index";


/************************************/
/*            INTERFACE             */
/************************************/
export interface IUiComponentAttributes {
    title: string;
    html: string;
    css: string;
    scss: string;
}

export interface IUiComponentInstance extends Instance<IUiComponentAttributes> {
    dataValues: IUiComponentAttributes;
}


/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IUiComponentInstance, IUiComponentAttributes> {

    let UiComponent = sequelize.define<IUiComponentInstance, IUiComponentAttributes>(
        'UiComponent', {
            title: {
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
            }
        }, 
        {
            classMethods: {
                associate: function(models: any) {
                    models.UiComponent.hasMany(models.ColorPalette);
                }
            }
        }
    );

    //UiComponent.hasMany(models.ColorPalette);

    return UiComponent;
    
}