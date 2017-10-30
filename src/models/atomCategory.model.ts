/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IAtom } from './atom.model';


/************************************/
/*            INTERFACE             */
/************************************/

export interface IAtomCategory {
    id: number | null;
    name: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface IAtomCategoryAttributes {
    name: string;
    description: string;
}


export interface IAtomCategoryInstance extends Instance<IAtomCategoryAttributes> {
    dataValues: IAtomCategoryAttributes;
}


/*****************************************/
/*           ATOM CATEGORY MODEL         */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IAtomCategoryInstance, IAtomCategoryAttributes> {

    let AtomCategory: any = sequelize.define<IAtomCategoryInstance, IAtomCategoryAttributes>(
        'AtomCategory', {
            name: {
                type: dataTypes.STRING
            },
            description: {
                type: dataTypes.TEXT
            },
            active: {
                type: dataTypes.BOOLEAN
            }
        },
        {
            timestamps: true,
            tableName: 'atom_category',
            freezeTableName: true
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    AtomCategory.associate = (models: ISequelizeModels) => {

        // One Category has many Atoms (1:M)
        AtomCategory.hasMany(models.Atom, {
            foreignKey: {
                name: 'atomCategoryId',
                field: 'atom_category_id'
            }
        });

    };


    return AtomCategory;
    
}