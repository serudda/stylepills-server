/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { Buffer } from 'buffer';
import { Pagination, ICursorsResult }  from './../../core/utils/pagination';
import * as appConfig from './../../core/constants/app.constants';
import { IAtomInstance } from './../../models/atom.model';


// TODO: Agregar un mensaje descriptivo, y mover a un lugar adecuado
function buildQueryFilter(isPrivate: boolean = false, atomCategoryId: number, text: string): IQueryFilters {

    // Init Filter
    let queryFilter: IQueryFilters = {
        active: true,
        private: isPrivate
    };

    // Add 'atomCategoryId' filter if it exists or is different from 0
    if (atomCategoryId && atomCategoryId !== 0) {
        queryFilter.atomCategoryId = atomCategoryId;
    }

    // Add 'name' filter if 'text' exists
    if (text) {
        queryFilter.name = {
            $like: `%${text}%`
        };
    }

    return queryFilter;
}


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
    isPrivate: boolean;
    text?: string;
}

/**
 * Arguments passed to Atom pagination
 */
interface IAtomPaginationArgs {
    first: number;
    after: string;
    last: number;
    before: string;
    primaryKey: string;
}

/**
 * Arguments passed to Atom queries
 */
interface IAtomQueryArgs {
    id: number;
    pagination: IAtomPaginationArgs;
    filter: IAtomFilterArgs;
    sortBy: string;
    limit: number;
}


/**************************************/
/*         ATOM QUERY TYPEDEF         */
/**************************************/

export const typeDef = `

    input AtomFilter {
        isPrivate: Boolean        
        atomCategoryId: Int
        text: String
    }

    input PaginationInput {
        first: Int
        after: String
        last: Int
        before: String
        primaryKey: String
    }

    type Cursor {
        hasNext: Boolean,
        hasPrevious: Boolean,
        before: String,
        after: String
    }

    type AtomPaginated {
        results: [Atom],
        cursors: Cursor
    }

    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms(limit: Int): [Atom!]!
        atomsByCategory(filter: AtomFilter, limit: Int): [Atom!]!
        searchAtoms(pagination: PaginationInput!
                    filter: AtomFilter, 
                    sortBy: String): AtomPaginated!
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
        allAtoms(parent: any, { limit = appConfig.ATOM_SEARCH_LIMIT }: IAtomQueryArgs) {
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
        atomsByCategory(parent: any, { filter, limit = appConfig.ATOM_SEARCH_LIMIT }: IAtomQueryArgs) {
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
         * @param {IAtomPaginationArgs} pagination - include: first, last, before, and after parameters
         * @param {IAtomQueryArgs} args - destructuring: filter, limit, sortBy
         * @param {IAtomFilterArgs} filter - a set of filters
         * @param {String} sortBy - sort list by a passed parameter
         * @param {number} limit - limit number of results returned
         * @returns {Array<Atom>} Atoms List based on a pagination params
         */
        searchAtoms(parent: any, {
            filter = <IAtomFilterArgs> {}, 
            sortBy = appConfig.ATOM_SEARCH_ORDER_BY_DEFAULT, 
            pagination = <IAtomPaginationArgs> {}
        }: IAtomQueryArgs) {

            // VARIABLES
            let { first, after, last, before, primaryKey } = pagination;
            let { isPrivate = false, atomCategoryId, text } = filter;
            let where = {};
            let include: any = [];
            let limit: number = first || last;

            // Build filter query
            let filterQuery = buildQueryFilter(isPrivate, atomCategoryId, text);

            // Build main Where
            if (sortBy !== 'created_at') {
                where = {
                    [sortBy]: {
                        $gte: 0
                    }
                };
            }

            where = Object.assign({}, where, filterQuery);

            // Init Pagination instance
            let paginationInstance = new Pagination({
                before, 
                after, 
                desc: true, 
                limit, 
                sortBy, 
                primaryKey
            });
            
            // Build pagination query
            let { paginationQuery, order } = paginationInstance.buildPaginationQuery();

            // Build where query joining filters and pagination
            const whereQuery: any = paginationQuery ? { $and: [paginationQuery, where] } : where;

            // GET ATOMS BASED ON FILTERS AND PAGINATION ARGUMENTS
            return models.Atom.findAll({
                where: whereQuery,
                include,
                limit: limit + 1,
                order,
            }).then((results: Array<IAtomInstance>) => {
                
                // Build cursors
                let cursors = paginationInstance.buildCursors(results);

                return {
                    results,
                    cursors
                };
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