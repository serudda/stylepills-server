/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import * as SequelizeStatic from 'sequelize';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IAtomArgs {
    id: number;
    filter: IFilterArgs;
}

interface IFilterArgs {
    private: boolean;
    atomCategoryId?: number;
    text?: string;
}


/**************************************/
/*         ATOM QUERY TYPEDEF         */
/**************************************/

export const typeDef = `
    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms(filter: AtomFilter): [Atom!]!
        atomsByCategory(filter: AtomFilter): [Atom!]!
        searchAtoms(filter: AtomFilter): [Atom!]!
        activeAtoms(filter: AtomFilter): [Atom!]!
    }

    input AtomFilter {
        private: Boolean        
        atomCategoryId: Int
        text: String
    }
`;


/*******************************************/
/*            ATOM QUERY RESOLVER          */
/*******************************************/

export const resolver = {
    Query: {

        // Get Atom by Id
        atomById(parent: any, { id }: IAtomArgs) {
            return models.Atom.findById(id);
        },

        // Get all Atoms
        allAtoms(parent: any, { filter }: IAtomArgs) {
            return models.Atom.findAll({ where: filter });
        },

        // Get all Atoms by category
        atomsByCategory(parent: any, { filter }: IAtomArgs) {
            return models.Atom.findAll({
                where: {
                    active: true,
                    atomCategoryId: filter.atomCategoryId
                }
            });
        },

        // Get all Atoms by name and category
        searchAtoms(parent: any, { filter }: IAtomArgs) {
            // Init Filter
            // TODO: Leer nuestros apuntos de como se debe inicializar una funcion con valores "default"
            // en el cuaderno donde anotamos todo sobre ES6
            let filters: any = {
                active: true,
                private: filter.private || false,
            };

            if (filter.atomCategoryId) {
                filters.atomCategoryId = filter.atomCategoryId;
            }

            if (filter.text) {
                filters.name = {
                    $like: '%' + filter.text + '%'
                };
            }

            return models.Atom.findAll({
                limit: 10,
                where: filters
            });

        },

        // Get all active Atoms
        activeAtoms() {
            return models.Atom.findAll({ where: {active: true} });
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