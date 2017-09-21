/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';

/************************************/
/*            INTERFACE             */
/************************************/
export interface IColorAttributes {
    label: string;
    hex: string;
}

export interface IColorInstance extends Instance<IColorAttributes> {
    dataValues: IColorAttributes;
}


/*****************************************/
/*          COLOR PALETTE MODEL          */
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
            // Avoid plural table name
            tableName: 'color',
            // Avoid plural table name
            freezeTableName: true
        }
    );

    Color.associate = (models: any) => {
        // Create relationship
        Color.belongsTo(models.ColorPalette, {
            foreignKey: 'colorPaletteId',
            onDelete: 'CASCADE'
        });
    };


    return Color;

}