/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IRgbaColor } from './rgbaColor.model';


/************************************/
/*            INTERFACE             */
/************************************/

/* Possible color type options */
export enum ColorTypeOptions {
    primary = 'primary',
    secondary = 'secondary',
    grayscale = 'grayscale'
}

export interface IColor {
    id: number | null;
    name: string;
    hex: string;
    rgba: IRgbaColor;
    type: ColorTypeOptions;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface IColorAttributes {
    name: string;
    hex: string;
    type: ColorTypeOptions;
    active: boolean;
}


export interface IColorInstance extends Instance<IColorAttributes> {
    dataValues: IColorAttributes;
}


/*****************************************/
/*             SOCIAL MODEL              */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IColorInstance, IColorAttributes> {

    let Color: any = sequelize.define<IColorInstance, IColorAttributes>(
        'Color', {
            name: {
                type: dataTypes.STRING
            },
            hex: {
                type: dataTypes.STRING,
                allowNull: false,
                defaultValue: '#FFFFFF'
            },
            type: {
                type: dataTypes.STRING,
                allowNull: false
            },
            active: {
                type: dataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            timestamps: true,
            tableName: 'color',
            freezeTableName: true,
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Color.associate = (models: ISequelizeModels) => {

        // one Color belongs to one Project (1:M)
        Color.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });

        // one Color has one RgbaColor (1:1)
        Color.hasOne(models.RgbaColor, {
            as: 'rgba',
            foreignKey: {
                name: 'colorId',
                field: 'color_id'
            }
        });
        
    };


    return Color;

}