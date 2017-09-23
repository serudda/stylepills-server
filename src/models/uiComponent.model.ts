/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { SequelizeModels } from './index';
import { IColorPalette } from './colorPalette.model';


/************************************/
/*            INTERFACE             */
/************************************/

export interface IUiComponent {
    id: number | null;
    title: string;
    html: string;
    css: string;
    scss: string;
    colorPalette: IColorPalette;
}


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
/*           UI COMPONENT MODEL          */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IUiComponentInstance, IUiComponentAttributes> {

    let UiComponent: any = sequelize.define<IUiComponentInstance, IUiComponentAttributes>(
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
            timestamps: true,
            tableName: 'uiComponent',
            freezeTableName: true
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    UiComponent.associate = (models: SequelizeModels) => {
        // Create relationship
        UiComponent.hasOne(models.ColorPalette, {
            foreignKey: 'uiComponentId',
            as: 'colorPalette'
        });
    };


    return UiComponent;
    
}