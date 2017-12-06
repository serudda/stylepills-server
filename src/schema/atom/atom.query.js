"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../models/index");
const pagination_1 = require("./../../core/utils/pagination");
const appConfig = require("./../../core/constants/app.constants");
// TODO: Agregar un mensaje descriptivo, y mover a un lugar adecuado
function buildQueryFilter(isPrivate = false, atomCategoryId, text) {
    // Init Filter
    /* TODO: Deberiamos incluir dos tipos de filtros: solo devuelvame los componentes
    privados (isPrivate), y otro que devuelvame todos los componentes, incluyendo los
    privados (includePrivate) */
    let queryFilter = {
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
/**************************************/
/*         ATOM QUERY TYPEDEF         */
/**************************************/
exports.typeDef = `

    input AtomInclude {
        model: String!
        as: String
        where: JSON!
    }

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
        count: Int,
        cursors: Cursor
    }

    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms(limit: Int): [Atom!]!
        atomsByCategory(filter: AtomFilter, limit: Int): [Atom!]!
        searchAtoms(pagination: PaginationInput!
                    filter: AtomFilter, 
                    include: AtomInclude,
                    sortBy: String): AtomPaginated!
    }

`;
/*******************************************/
/*            ATOM QUERY RESOLVER          */
/*******************************************/
exports.resolver = {
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
        atomById(parent, { id }) {
            return index_1.models.Atom.findById(id);
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
        allAtoms(parent, { limit = appConfig.ATOM_SEARCH_LIMIT }) {
            return index_1.models.Atom.findAll({
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
        atomsByCategory(parent, { filter, limit = appConfig.ATOM_SEARCH_LIMIT }) {
            return index_1.models.Atom.findAll({
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
         * @param {IAtomPaginationArgs} pagination - include: first, last, before, and after parameters
         * @param {IAtomIncludeArgs} include - include model to filter nested object
         * @returns {Array<Atom>} Atoms List based on a pagination params
         */
        searchAtoms(parent, { filter = {}, sortBy = appConfig.ATOM_SEARCH_ORDER_BY_DEFAULT, pagination = {}, include = null }) {
            // VARIABLES
            let { first, after, last, before, primaryKey } = pagination;
            let { isPrivate = false, atomCategoryId, text } = filter;
            let where = {};
            let sortByQuery = {};
            let includeQuery = [];
            let limit = first || last;
            // Build include query
            if (include) {
                // TODO: Validar cuando include.as sea null, eso no se valido
                includeQuery = [
                    {
                        model: index_1.models[include.model],
                        as: include.as,
                        where: include.where
                    }
                ];
            }
            // Build filter query
            let filterQuery = buildQueryFilter(isPrivate, atomCategoryId, text);
            // Build main Where
            if (sortBy !== 'created_at') {
                sortByQuery = {
                    [sortBy]: {
                        $gte: 0
                    }
                };
            }
            where = Object.assign({}, where, sortByQuery, filterQuery);
            // Init Pagination instance
            let paginationInstance = new pagination_1.Pagination({
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
            const whereQuery = paginationQuery ? { $and: [paginationQuery, where] } : where;
            // GET ATOMS BASED ON FILTERS AND PAGINATION ARGUMENTS
            return index_1.models.Atom.findAndCountAll({
                where: whereQuery,
                include: includeQuery,
                limit: limit + 1,
                order,
            }).then(({ rows, count }) => {
                // Build cursors
                let cursors = paginationInstance.buildCursors(rows);
                return {
                    results: rows,
                    count,
                    cursors
                };
            });
        }
    },
    Atom: {
        comments(atom) {
            return atom.getComments();
        },
        author(atom) {
            return atom.getAuthor();
        },
        owner(atom) {
            return atom.getOwner();
        },
        category(atom) {
            return atom.getAtomCategory();
        }
    }
};
//# sourceMappingURL=atom.query.js.map