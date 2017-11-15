/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as SequelizeStatic from 'sequelize';
import { Instance, DataTypes, Sequelize } from 'sequelize';
import { ISequelizeModels } from './index';

import { IUser } from './user.model';
import { IAtom } from './atom.model';


/************************************/
/*            INTERFACE             */
/************************************/

export interface IComment {
    id: number | null;
    content: string;
    commentable: string;
    commentableId: number;
    active: boolean;
    author: IUser;
    createdAt: string;
    updatedAt: string;
}


export interface ICommentAttributes {
    content: string;
    active: boolean;
}


export interface ICommentInstance extends Instance<ICommentAttributes> {
    dataValues: ICommentAttributes;
}


/*****************************************/
/*             COMMENT MODEL             */
/*****************************************/
export default function(sequelize: Sequelize, dataTypes: DataTypes): 
SequelizeStatic.Model<ICommentInstance, ICommentAttributes> {

    let Comment: any = sequelize.define<ICommentInstance, ICommentAttributes>(
        'Comment', {
            content: {
                type: dataTypes.TEXT,
                allowNull: false
            },
            commentable: {
                type: dataTypes.STRING
            },
            commentableId: {
                type: dataTypes.INTEGER,
                field: 'commentable_id'
            },
            active: {
                type: dataTypes.BOOLEAN
            }
        },
        {
            timestamps: true,
            tableName: 'comment',
            freezeTableName: true
        }
    );


    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Comment.associate = (models: ISequelizeModels) => {

        // one Comment belongs to one Atom (1:M)
        // NOTE: (1) constraints theory
        Comment.belongsTo(models.Atom, {
            foreignKey: {
                name: 'commentableId',
                field: 'commentable_id'
            },
            constraints: false,
            as: 'atom'
        });

        // one Comment belongs to one author (1:M)
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'authorId',
                field: 'author_id'
            }
        });

    };


    return Comment;
    
}


/*
 (1). reference: http://docs.sequelizejs.com/manual/tutorial/associations.html  
 */