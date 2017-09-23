/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { IColor } from './color.model';
import { SequelizeModels } from './index';


/************************************/
/*            INTERFACE             */
/************************************/
export interface IColorPalette {
    id: number | null;
    category: string;
    description: string;
    colors: Array<IColor>;
}


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
            },
        }, {
            timestamps: true,
            tableName: 'colorPalette',
            freezeTableName: true,
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    ColorPalette.associate = (models: SequelizeModels) => {
        ColorPalette.hasMany(models.Color, {
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