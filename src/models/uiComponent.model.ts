/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';


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

    let UiComponent: any = sequelize.define<IUiComponentInstance, IUiComponentAttributes>(
        'UiComponent', {
            title: {
                type: dataTypes.STRING,
                // defaultValue: false,
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
            timestamps: true
        }
    );

    UiComponent.associate = (models: any) => {
        // Create relationship
        UiComponent.hasOne(models.ColorPalette, {
            /* La asignación del foreignKey la hace por defecto, si quiero una
            llave personalizada uso la linea de abajo */
            // foreignKey: 'uiComponentId',
            /* Este campo es importante, ya que si lo cambio, tendria que cambiarlo
            en el resolver: getColorPalettes', ya que sino al hacer el llamado de
            en GraphIQL obtendriamos este error:
            uiComponent.getColorPalette is not a function */
            /* Estas linea las hace por defecto 
            tomando el nombre del modelo */
            // as: 'colorPalette'
        });
    };


    return UiComponent;
    
}