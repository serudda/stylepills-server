/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { models } from '../index';

/************************************/
/*            INTERFACE             */
/************************************/
export interface IColorPaletteAttributes {
    label: string;
    hex: string;
}

export interface IColorPaletteInstance extends Instance<IColorPaletteAttributes> {
    dataValues: IColorPaletteAttributes;
}


/*****************************************/
/*          COLOR PALETTE MODEL          */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IColorPaletteInstance, IColorPaletteAttributes> {

    let ColorPalette = sequelize.define<IColorPaletteInstance, IColorPaletteAttributes>(
        'ColorPalette', {
            label: {
                type: dataTypes.STRING,
                allowNull: true
            },
            hex: {
                type: dataTypes.STRING,
                allowNull: true
            }
        }, {
            indexes: [],
            timestamps: false
        }
    );

    // Create relationship
    ColorPalette.belongsTo(models.UiComponent, {
        foreignKey: 'uiComponentId',
        onDelete: 'CASCADE'
    });

    return ColorPalette;

}