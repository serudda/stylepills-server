/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IAtomArgs {
    id: number;
    filter: IFilterArgs;
    sortBy: string;
    limit: number;
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

    input AtomFilter {
        private: Boolean        
        atomCategoryId: Int
        text: String
    }

    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms(limit: Int): [Atom!]!
        atomsByCategory(filter: AtomFilter, limit: Int): [Atom!]!
        searchAtoms(filter: AtomFilter, sortBy: String, limit: Int): [Atom!]!
    }

`;


/*******************************************/
/*            ATOM QUERY RESOLVER          */
/*******************************************/

export const resolver = {
    Query: {

        /**
         * @desc Get Atom by Id
         * @method Method atomById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IAtomArgs} args - destructuring: id
         * @param {number} id - Atom id
         * @returns {IAtom} Atom entity
         */
        atomById(parent: any, { id }: IAtomArgs) {
            return models.Atom.findById(id);
        },


        /**
         * @desc Get all Atoms
         * @method Method allAtoms
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IAtomArgs} args - destructuring: limit
         * @param {Int} limit - limit number of results returned
         * @returns {Array<IAtom>} Atoms list
         */
        allAtoms(parent: any, { limit }: IAtomArgs) {
            return models.Atom.findAll({
                limit,
                where: {
                    active: true
                } 
            });
        },

        
        /**
         * @desc Get Atoms by Category
         * @method Method atomsByCategory
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IAtomArgs} args - destructuring: filter, limit 
         * @param {IFilterArgs} filter - a set of filters
         * @param {number} limit - limit number of results returned
         * @returns {Array<Atom>} Atoms List of a specific category (Buttons, Inputs, Labels, etc.)
         */
        atomsByCategory(parent: any, { filter, limit }: IAtomArgs) {
            return models.Atom.findAll({
                limit,
                where: {
                    active: true,
                    atomCategoryId: filter.atomCategoryId
                }
            });
        },

        
        /**
         * @desc Get Atoms by an user's input text (including category filter)
         * @method Method searchAtoms
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IAtomArgs} args - destructuring: filter, limit 
         * @param {IFilterArgs} filter - a set of filters
         * @param {String} sortBy - sort list by a passed parameter
         * @param {number} limit - limit number of results returned
         * @returns {Array<Atom>} Atoms List based on a filter parameters: e.g category, user's input text
         */
        searchAtoms(parent: any, { filter, sortBy = 'created_at', limit }: IAtomArgs) {
            // Init Filter
            let filters: any = {
                active: true,
                private: filter.private || false,
            };

            if (filter.atomCategoryId && filter.atomCategoryId !== 0) {
                filters.atomCategoryId = filter.atomCategoryId;
            }

            if (filter.text) {
                filters.name = {
                    $like: '%' + filter.text + '%'
                };
            }

            return models.Atom.findAll({
                limit,
                order: [[sortBy, 'DESC']],
                where: filters
            });

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