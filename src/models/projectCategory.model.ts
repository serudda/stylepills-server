/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IProject } from './project.model';


/************************************/
/*            INTERFACE             */
/************************************/

export interface IProjectCategory {
    id: number | null;
    name: string;
    description: string;
    projects: Array<IProject>;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface IProjectCategoryAttributes {
    name: string;
    description: string;
    active: boolean;
}


export interface IProjectCategoryInstance extends Instance<IProjectCategoryAttributes> {
    dataValues: IProjectCategoryAttributes;
}


/*****************************************/
/*           ATOM CATEGORY MODEL         */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<IProjectCategoryInstance, IProjectCategoryAttributes> {

    let ProjectCategory: any = sequelize.define<IProjectCategoryInstance, IProjectCategoryAttributes>(
        'ProjectCategory', {
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
            tableName: 'project_category',
            freezeTableName: true
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    ProjectCategory.associate = (models: ISequelizeModels) => {

        // One Category has many Projects (1:M)
        ProjectCategory.hasMany(models.Project, {
            foreignKey: {
                name: 'projectCategoryId',
                field: 'project_category_id'
            }
        });

    };


    return ProjectCategory;
    
}