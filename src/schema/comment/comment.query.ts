/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface ICommentArgs {
    id: number;
}


/**************************************/
/*        COMMENT QUERY TYPEDEF       */
/**************************************/

export const typeDef = `
    extend type Query {
        commentById(id: ID!): Comment!
        allComments: [Comment!]!
        activeComments: [Comment!]!
    }
`;


/*******************************************/
/*          COMMENT QUERY RESOLVER         */
/*******************************************/

export const resolver = {
    Query: {
        commentById(parent: any, { id }: ICommentArgs) {
            return models.Comment.findById(id);
        },
        allComments() {
            return models.Comment.findAll();
        },
        activeComments() {
            return models.Comment.findAll({ where: { active: true } });
        }
    },
    Comment: {
        author(comment: any) {
            return comment.getUser();
        }
    }
};



/* 

Queries:


query getAtomById($atomId : ID!) {
    atom(id: $atomId) {
        id
        name
        description
        __typename 
    }
}
*/