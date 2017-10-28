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
/*         ATOM QUERY TYPEDEF         */
/**************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        atomById(id: ID!): Atom
        atoms: [Atom]
    }
`;


/*******************************************/
/*            ATOM QUERY RESOLVER          */
/*******************************************/

export const resolver = {
    Query: {
        atomById(parent: any, { id }: IAtomArgs) {
            return models.Atom.findById(id);
        },
        atoms() {
            return models.Atom.findAll();
        }
    },
    Atom: {
        comments(atom: any) {
            return atom.getComment();
        },
        author(atom: any) {
            return atom.getAuthor();
        }
    }
};



/* 

Queries:


query getAtomById($atomId : ID!) {
    atom(id: $atomId) {
        id
        name
        html
        css
        contextualBg
        stores
        views
        likes
        download
        __typename
        comments {
            id
            content
            __typename
        }
        author {
            id
            firstname
            lastname
            username
            avatar
            __typename
        }
    }
}
*/