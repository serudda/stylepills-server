/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IAtomCategoryArgs {
    id: number;
}


/**************************************/
/*     ATOM CATEGORY QUERY TYPEDEF    */
/**************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        atomCategoryById(id: ID!): AtomCategory
        atomCategories: [AtomCategory]
    }
`;


/*******************************************/
/*       ATOM CATEGORY QUERY RESOLVER      */
/*******************************************/

export const resolver = {
    Query: {
        atomCategories() {
            return models.AtomCategory.findAll();
        },
        atomCategoryById(source: any, { id }: IAtomCategoryArgs) {
            return models.AtomCategory.findById(id);
        }
    }
};



/* 

Queries:


query getAtomCategoryById($atomCategoryId : ID!) {
    atomCategoryById(id: $atomCategoryId) {
        id
        name
        description
        __typename 
    }
}
*/