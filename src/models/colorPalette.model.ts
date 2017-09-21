/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { IColorAttributes } from './color.model';

/************************************/
/*            INTERFACE             */
/************************************/
export interface IColorPaletteAttributes {
    category: string;
    description: string;
}

export interface IColorPaletteInstance extends Instance<IColorPaletteAttributes> {
    dataValues: IColorPaletteAttributes;
}


/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IColorPaletteInstance, IColorPaletteAttributes> {

    let ColorPalette: any = sequelize.define<IColorPaletteInstance, IColorPaletteAttributes>(
        'ColorPalette', {
            category: {
                type: dataTypes.STRING,
                allowNull: true
            },
            description: {
                type: dataTypes.TEXT,
                allowNull: true
            }
        }, {
            timestamps: true,
            // Avoid plural table name
            tableName: 'colorPalette',
            // Avoid plural table name
            freezeTableName: true
        }
    );

    ColorPalette.associate = (models: any) => {
        // Create relationship
        ColorPalette.hasMany(models.Color, {
            /* Estas dos lineas las hace por defecto 
            tomando el nombre del modelo */
            foreignKey: 'colorPaletteId',
            as: 'color'
        });

        ColorPalette.belongsTo(models.UiComponent, {
            foreignKey: 'uiComponentId',
            onDelete: 'CASCADE'
        });
    };


    return ColorPalette;

}