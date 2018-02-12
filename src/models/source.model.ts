/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IPreprocessor as IPreprocessorModel } from './preprocessor.model';

/************************************/
/*            INTERFACE             */
/************************************/

export interface ISource {
    id: number | null;
    name: string;
    filename: string;
    code: string;
    preprocessor: IPreprocessorModel;
    order: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface ISourceAttributes {
    id?: number;
    filename: string;
    code: string;
    order: number;
    preprocessorId: number;
    atomId?: number;
    projectId?: number;
    active: boolean;
}


export interface ISourceInstance extends Instance<ISourceAttributes> {
    dataValues: ISourceAttributes;
}


/*****************************************/
/*               LIB MODEL               */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<ISourceInstance, ISourceAttributes> {

    let Source: any = sequelize.define<ISourceInstance, ISourceAttributes>(
        'Source', {
            name: {
                type: dataTypes.STRING,
                allowNull: false
            },
            filename: {
                type: dataTypes.STRING,
                allowNull: false
            },
            code: {
                type: dataTypes.TEXT,
                allowNull: false
            },
            order: {
                type: dataTypes.INTEGER,
                allowNull: true
            },
            active: {
                type: dataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            timestamps: true,
            tableName: 'source',
            freezeTableName: true,
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Source.associate = (models: ISequelizeModels) => {

        // one Source belongs to one Atom (1:M)
        Source.belongsTo(models.Atom, {
            foreignKey: {
                name: 'atomId',
                field: 'atom_id'
            }
        });

        // one Source belongs to one Project (1:M)
        Source.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                field: 'project_id'
            }
        });

        // one Source belongs to one Preprocessor (1:M)
        Source.belongsTo(models.Preprocessor, {
            foreignKey: {
                name: 'preprocessorId',
                field: 'preprocessor_id'
            }
        });
        
    };


    return Source;

}