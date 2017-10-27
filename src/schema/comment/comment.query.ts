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
    # Root Query
    extend type Query {
        commentById(id: ID!): Comment
        comments: [Comment]
    }
`;


/*******************************************/
/*          COMMENT QUERY RESOLVER         */
/*******************************************/

export const resolver = {
    Query: {
        comments() {
            return models.Comment.findAll();
        },
        commentById(source: any, { id }: ICommentArgs) {
            return models.Comment.findById(id);
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