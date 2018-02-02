"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../models/index");
const pagination_1 = require("./../../core/utils/pagination");
const appConfig = require("./../../core/constants/app.constants");
const logger_1 = require("./../../core/utils/logger");
// TODO: Agregar un mensaje descriptivo, y mover a un lugar adecuado
function buildQueryFilter(isDuplicated, isPrivate, atomCategoryId, projectId, text) {
    // Init Filter
    let queryFilter = {
        active: true
    };
    // If isPrivate is a boolean
    if (typeof isPrivate === 'boolean') {
        queryFilter.private = isPrivate;
    }
    // If isDuplicated is a boolean
    if (typeof isDuplicated === 'boolean') {
        queryFilter.duplicated = isDuplicated;
    }
    // Add 'atomCategoryId' filter if it exists or is different from 0
    if (atomCategoryId && atomCategoryId !== 0) {
        queryFilter.atomCategoryId = atomCategoryId;
    }
    // Add 'projectId' filter if it exists
    if (projectId) {
        queryFilter.projectId = projectId;
    }
    // Add 'name' filter if 'text' exists
    if (text) {
        queryFilter.name = {
            $iLike: `%${text}%`
        };
    }
    return queryFilter;
}
/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/
exports.typeDef = `

    input AtomInclude {
        model: String!
        as: String
        where: JSON!
    }

    input AtomType {
        isPrivate: Boolean
        isDuplicated: Boolean
    }

    input AtomFilter { 
        type: AtomType   
        atomCategoryId: Int
        projectId: Int
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
                    include: AtomInclude,
                    sortBy: String): AtomPaginated!
    }

`;
/*******************************************/
/*              QUERY RESOLVER             */
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
            // LOG
            logger_1.logger.log('info', 'Query: atomById');
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
            // LOG
            logger_1.logger.log('info', 'Query: allAtoms');
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
            // LOG
            logger_1.logger.log('info', 'Query: atomsByCategory');
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
            // LOG
            logger_1.logger.log('info', 'Query: searchAtoms');
            // VARIABLES
            let { first, after, last, before, primaryKey } = pagination;
            let { type = {}, atomCategoryId, projectId, text } = filter;
            let { isDuplicated = null, isPrivate = null } = type;
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
            let filterQuery = buildQueryFilter(isDuplicated, isPrivate, atomCategoryId, projectId, text);
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
            return index_1.models.Atom.findAll({
                where: whereQuery,
                include: includeQuery,
                limit: limit + 1,
                order,
            }).then((results) => {
                // Build cursors
                let cursors = paginationInstance.buildCursors(results);
                return {
                    results,
                    cursors
                };
            }).catch((err) => {
                // LOG
                logger_1.logger.log('error', 'Query: searchAtoms', { err });
            });
        }
    },
    Atom: {
        libs(atom) {
            // LOG
            logger_1.logger.log('info', 'Query (Atom): getLibs');
            return atom.getLibs();
        },
        comments(atom) {
            // LOG
            logger_1.logger.log('info', 'Query: (Atom) getComments');
            return atom.getComments();
        },
        author(atom) {
            // LOG
            logger_1.logger.log('info', 'Query: (Atom) getAuthor');
            return atom.getAuthor();
        },
        owner(atom) {
            // LOG
            logger_1.logger.log('info', 'Query: (Atom) getOwner');
            return atom.getOwner();
        },
        category(atom) {
            // LOG
            logger_1.logger.log('info', 'Query: (Atom) getAtomCategory');
            return atom.getAtomCategory();
        },
        project(atom) {
            // LOG
            logger_1.logger.log('info', 'Query: (Atom) getProject');
            return atom.getProject();
        }
    }
};
//# sourceMappingURL=atom.query.js.map