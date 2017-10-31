/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IAtomArgs {
    id: number;
    filter: any;
}


/**************************************/
/*         ATOM QUERY TYPEDEF         */
/**************************************/

export const typeDef = `
    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms(filter: AtomFilter): [Atom!]!
        activeAtoms: [Atom!]!
    }

    input AtomFilter {
        OR: [AtomFilter!]
        private: Boolean
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
        allAtoms(parent: any, { filter }: IAtomArgs) {
            return models.Atom.findAll({ where: filter });
        },
        activeAtoms() {
            return models.Atom.findAll({ where: { active: true } });
        }
    },
    Atom: {
        comments(atom: any) {
            return atom.getComments();
        },
        author(atom: any) {
            return atom.getUser();
        },
        category(atom: any) {
            return atom.getAtomCategory();
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