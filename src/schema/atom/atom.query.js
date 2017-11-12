"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
const pagination_1 = require("./../../utils/pagination");
function buildQueryFilter(isPrivate = false, atomCategoryId, text) {
    // Init Filter
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
function buildPaginationQuery(before, after, desc, paginationField, primaryKeyField, paginationFieldIsNonId) {
    const decodedBefore = !!before ? pagination_1.pagination.decodeCursor(before) : null;
    const decodedAfter = !!after ? pagination_1.pagination.decodeCursor(after) : null;
    // If is before (previous) = FALSE, if not TRUE
    const cursorOrderIsDesc = before ? !desc : desc;
    const cursorOrderOperator = cursorOrderIsDesc ? '$lt' : '$gt';
    // VARIABLES
    let paginationQuery;
    let order = [
        cursorOrderIsDesc ? [paginationField, 'DESC'] : paginationField,
        ...(paginationFieldIsNonId ? [primaryKeyField] : []),
    ];
    if (before) {
        paginationQuery = pagination_1.pagination.getPaginationQuery(decodedBefore, cursorOrderOperator, paginationField, primaryKeyField);
        /* FIXME: #67 - Rompe cuando paginationFieldIsNonId es false, es decir
            cuando quiero organizar por 'created_at' */
        order = [
            paginationField,
            // ...(paginationFieldIsNonId ? [primaryKeyField, 'DESC'] : []),
            paginationFieldIsNonId ? [primaryKeyField, 'DESC'] : '',
        ];
    }
    else if (after) {
        paginationQuery = pagination_1.pagination.getPaginationQuery(decodedAfter, cursorOrderOperator, paginationField, primaryKeyField);
        order = [
            cursorOrderIsDesc ? [paginationField, 'DESC'] : paginationField,
            ...(paginationFieldIsNonId ? [primaryKeyField] : []),
        ];
    }
    return { paginationQuery, order };
}
/**************************************/
/*         ATOM QUERY TYPEDEF         */
/**************************************/
exports.typeDef = `

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
        atomPaginate(pagination: PaginationInput): AtomPaginated
        searchAtoms(pagination: PaginationInput
                    filter: AtomFilter, 
                    sortBy: String,
                    limit: Int): AtomPaginated!
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
        // TODO: Crear un archivo de constantes como en el FE, para almacenar 12
        allAtoms(parent, { limit = 12 }) {
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
        // TODO: Crear un archivo de constantes como en el FE, para almacenar 12
        atomsByCategory(parent, { filter, limit = 12 }) {
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
         * @param {number} limit - limit number of results returned
         * @returns {Array<Atom>} Atoms List based on a filter parameters:
         * e.g category, user's input text
         */
        // TODO: Crear un archivo de constantes como en el FE, para almacenar 'created_at' y 12
        /*searchAtoms(
            parent: any,
            {
                filter,
                sortBy = 'created_at',
                limit = 12
            }: IAtomQueryArgs) {

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
            return models.Atom.findAndCountAll({
                where: queryFilter,
                order: [[sortBy, 'DESC']],
                limit
            }).then((atoms) => {
                const edges = atoms.rows.map((atom) => ({
                    cursor: Buffer.from(atom.dataValues.id.toString()).toString('base64'),
                    node: atom
                }));

                return {
                    edges,
                    count: atoms.count,
                    pageInfo: {
                        hasNextPage() {
                            return true;
                        },
                        hasPreviousPage() {
                            return true;
                        }
                    }
                };
            });

        },*/
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
        searchAtoms(parent, { filter = {}, sortBy = 'likes', pagination = {} }) {
            // VARIABLES
            let { first = 12, after, last = 12, before } = pagination;
            let { isPrivate = false, atomCategoryId, text } = filter;
            let primaryKeyField = 'id';
            let paginationField = sortBy;
            // let primaryKeyField = 'created_at';
            // let paginationField = 'created_at';
            let where = {};
            let include = [];
            let limit = first;
            let desc = true;
            const paginationFieldIsNonId = paginationField !== primaryKeyField;
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
            // Build pagination query
            let { paginationQuery, order } = buildPaginationQuery(before, after, desc, paginationField, primaryKeyField, paginationFieldIsNonId);
            /* TODO: Si quito el 'any' me da error de type, ya que WhereOption del model
             no acepta: $and */
            const whereQuery = paginationQuery ? { $and: [paginationQuery, where] } : where;
            // GET ATOMS BASED ON FILTERS AND PAGINATION ARGUMENTS
            return index_1.models.Atom.findAll({
                where: whereQuery,
                include,
                limit: limit + 1,
                order,
            }).then((results) => {
                const hasMore = results.length > limit;
                if (hasMore) {
                    results.pop();
                }
                if (before) {
                    results.reverse();
                }
                const hasNext = !!before || hasMore;
                const hasPrevious = !!after || (!!before && hasMore);
                let beforeCursor = null;
                let afterCursor = null;
                if (results.length > 0) {
                    beforeCursor = paginationFieldIsNonId
                        ? pagination_1.pagination.encodeCursor([results[0][paginationField], results[0][primaryKeyField]])
                        : pagination_1.pagination.encodeCursor([results[0][paginationField]]);
                    afterCursor = paginationFieldIsNonId
                        ? pagination_1.pagination.encodeCursor([results[results.length - 1][paginationField], results[results.length - 1][primaryKeyField]])
                        : pagination_1.pagination.encodeCursor([results[results.length - 1][paginationField]]);
                }
                return {
                    results,
                    cursors: {
                        hasNext,
                        hasPrevious,
                        before: beforeCursor,
                        after: afterCursor,
                    },
                };
            });
        }
    },
    Atom: {
        comments(atom) {
            return atom.getComments();
        },
        author(atom) {
            return atom.getUser();
        },
        category(atom) {
            return atom.getAtomCategory();
        }
    }
};
/*
Search Atoms Pagination structure

input AtomPagination {
    first: Int
    after: String
}

input AtomFilter {
    private: Boolean
    atomCategoryId: Int
    text: String
}

extend type Query {
    searchAtoms(pagination: AtomPagination, filter: AtomFilter, sortBy: String, limit: Int): [Atom!]!
}

searchAtoms(filter: AtomFilter, sortBy: String, limit: Int): [Atom!]!
*/ 
//# sourceMappingURL=atom.query.js.map