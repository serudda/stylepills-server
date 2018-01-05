/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';


/************************************/
/*            INTERFACE             */
/************************************/
export interface IRgbaColor {
    id: number | null;
    r: number;
    g: number;
    b: number;
    a: number;
}


export interface IRgbaColorAttributes {
    r: number;
    g: number;
    b: number;
    a: number;
}


export interface IRgbaColorInstance extends Instance<IRgbaColorAttributes> {
    dataValues: IRgbaColorAttributes;
}


/*****************************************/
/*             SOCIAL MODEL              */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IRgbaColorInstance, IRgbaColorAttributes> {

    let RgbaColor: any = sequelize.define<IRgbaColorInstance, IRgbaColorAttributes>(
        'RgbaColor', {
            r: {
                type: dataTypes.INTEGER,
                allowNull: false,
                defaultValue: 255
            },
            g: {
                type: dataTypes.INTEGER,
                allowNull: false,
                defaultValue: 255
            },
            b: {
                type: dataTypes.INTEGER,
                allowNull: false,
                defaultValue: 255
            },
            a: {
                type: dataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 1,
                validate: {
                    min: 0,
                    max: 1
                }
            }
        }, {
            tableName: 'rgba_color',
            freezeTableName: true,
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    RgbaColor.associate = (models: ISequelizeModels) => {

        // one RgbaColor belongs to one Color (1:M)
        RgbaColor.belongsTo(models.Color, {
            foreignKey: {
                name: 'colorId',
                field: 'color_id'
            }
        });
        
    };


    return RgbaColor;

}