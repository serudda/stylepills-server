/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    

/**
 * Values required by Query filter
 */
interface IQueryFilters {
    name?: {
        $like: string
    };
    atomCategoryId?: number;
    active: boolean;
    private: boolean;
}

/**
 * Arguments passed to Atom filter
 */
interface IAtomFilterArgs {
    atomCategoryId?: number;
    active: boolean;
    private: boolean;
    text?: string;
}

/**
 * Arguments passed to Atom queries
 */
interface IAtomQueryArgs {
    id: number;
    filter: IAtomFilterArgs;
    sortBy: string;
    limit: number;
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
         * @param {IAtomQueryArgs} args - destructuring: id
         * @param {number} id - Atom id
         * @returns {IAtom} Atom entity
         */
        atomById(parent: any, { id }: IAtomQueryArgs) {
            return models.Atom.findById(id);
        },


        /**
         * @desc Get all Atoms
         * @method Method allAtoms
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IAtomQueryArgs} args - destructuring: limit
         * @param {Int} limit - limit number of results returned
         * @returns {Array<IAtom>} Atoms list
         */
        // TODO: Crear un archivo de constantes como en el FE, para almacenar 12
        allAtoms(parent: any, { limit = 12 }: IAtomQueryArgs) {
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
         * @param {IAtomQueryArgs} args - destructuring: filter, limit, sortBy 
         * @param {IAtomFilterArgs} filter - a set of filters
         * @param {number} limit - limit number of results returned
         * @returns {Array<Atom>} Atoms List of a specific category (Buttons, Inputs, Labels, etc.)
         */
        // TODO: Crear un archivo de constantes como en el FE, para almacenar 12
        atomsByCategory(parent: any, { filter, limit = 12 }: IAtomQueryArgs) {
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
         * @param {IAtomQueryArgs} args - destructuring: filter, limit, sortBy
         * @param {IAtomFilterArgs} filter - a set of filters
         * @param {String} sortBy - sort list by a passed parameter
         * @param {number} limit - limit number of results returned
         * @returns {Array<Atom>} Atoms List based on a filter parameters: 
         * e.g category, user's input text
         */
        // TODO: Crear un archivo de constantes como en el FE, para almacenar 'created_at' y 12
        searchAtoms(parent: any, { filter, sortBy = 'created_at', limit = 12 }: IAtomQueryArgs) {

            // Init Filter
            let queryFilter: IQueryFilters = {
                active: true,
                private: filter.private || false
            };

            // Add 'atomCategoryId' filter if it exists or is different from 0
            if (filter.atomCategoryId && filter.atomCategoryId !== 0) {
                queryFilter.atomCategoryId = filter.atomCategoryId;
            }

            // Add 'name' filter if 'text' exists
            if (filter.text) {
                queryFilter.name = {
                    $like: `%${filter.text}%`
                };
            }

            // Get all Atoms based on query args
            // TODO: Crear un archivo de constantes como en el FE, para almacenar 'DESC'
            return models.Atom.findAll({
                limit,
                order: [[sortBy, 'DESC']],
                where: queryFilter
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