/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IAtomArgs {
    id: number;
}


/**************************************/
/*     UI COMPONENT QUERY TYPEDEF     */
/**************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        atoms: [Atom]
        atom(id: ID!): Atom
    }
`;


/*******************************************/
/*       UI COMPONENT QUERY RESOLVER       */
/*******************************************/

export const resolver = {
    Query: {
        atoms() {
            return models.Atom.findAll();
        },
        atom(root: any, { id }: IAtomArgs) {
            return models.Atom.findById(id);
        },
    }
};



/* 

Queries:


query getAtomById($atomId : ID!) {
    atom(id: $atomId) {
        id
        name
        css
        scss
        html
        background
        download
        __typename
        colorPalette {
            id
            category
            description
            __typename
            colors {
                id
                hex
                label
                __typename
            }
        }
    }
}
*/