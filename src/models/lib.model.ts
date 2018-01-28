/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';


/************************************/
/*            INTERFACE             */
/************************************/

/* Possible lib type options */
export enum LibTypeOptions {
    css = 'css',
    javascript = 'javascript'
}

export interface ILib {
    id: number | null;
    name: string;
    url: string;
    type: LibTypeOptions;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface ILibAttributes {
    name: string;
    url: string;
    type: LibTypeOptions;
    active: boolean;
}


export interface ILibInstance extends Instance<ILibAttributes> {
    dataValues: ILibAttributes;
}


/*****************************************/
/*               LIB MODEL               */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<ILibInstance, ILibAttributes> {

    let Lib: any = sequelize.define<ILibInstance, ILibAttributes>(
        'Lib', {
            name: {
                type: dataTypes.STRING
            },
            url: {
                type: dataTypes.STRING,
                allowNull: false
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
            tableName: 'lib',
            freezeTableName: true,
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Lib.associate = (models: ISequelizeModels) => {

        // one Lib belongs to one Atom (1:M)
        Lib.belongsTo(models.Atom, {
            foreignKey: {
                name: 'atomId',
                field: 'atom_id'
            }
        });

        // one Lib belongs to one Project (1:M)
        Lib.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });
        
    };


    return Lib;

}