/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { SequelizeModels } from './index';


/************************************/
/*            INTERFACE             */
/************************************/

export interface IColor {
    id: number | null;
    hex: string;
    label: string;
}


export interface IColorAttributes {
    label: string;
    hex: string;
}


export interface IColorInstance extends Instance<IColorAttributes> {
    dataValues: IColorAttributes;
}


/*****************************************/
/*              COLOR MODEL              */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IColorInstance, IColorAttributes> {
    
    let Color: any = sequelize.define<IColorInstance, IColorAttributes>(
        'Color', {
            label: {
                type: dataTypes.STRING,
                allowNull: true
            },
            hex: {
                type: dataTypes.STRING,
                allowNull: true
            }
        }, {
            timestamps: true,
            tableName: 'color',
            freezeTableName: true,
        }
    );

    
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Color.associate = (models: SequelizeModels) => {
        Color.belongsTo(models.ColorPalette, {
            foreignKey: 'colorPaletteId',
            onDelete: 'CASCADE'
        });
    };


    return Color;

}