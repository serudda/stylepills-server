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
    extend type Query {
        atomCategoryById(id: ID!): AtomCategory!
        allAtomCategories: [AtomCategory!]!
    }
`;


/*******************************************/
/*       ATOM CATEGORY QUERY RESOLVER      */
/*******************************************/

export const resolver = {
    Query: {
        
        /**
         * @desc Get all Atom's categories
         * @method Method allAtomCategories
         * @public
         * @returns {Array<IAtomCategory>} Atom's categories list
         */
        allAtomCategories() {
            return models.AtomCategory.findAll({
                where: {
                    active: true
                }, raw: true
            });
        }
    },
    AtomCategory: {
        atoms(atomCategory: any) {
            return atomCategory.getAtoms();
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