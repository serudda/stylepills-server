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
    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms: [Atom!]!
        activeAtoms: [Atom!]!
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
        allAtoms() {
            return models.Atom.findAll();
        },
        activeAtoms() {
            return models.Atom.findAll({ where: { active: true } });
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