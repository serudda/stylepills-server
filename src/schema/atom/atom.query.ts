/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { Buffer } from 'buffer';
import { pagination }  from './../../utils/pagination';


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
    atomConnection: any;
    filter: IAtomFilterArgs;
    sortBy: string;
    limit: number;
    offset: number;
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

    input ConnectionInput {
        first: Int
        after: String
        last: Int
        before: String
    }

    # Test
    type AtomConnectionOffset {
        edges: [AtomEdge]
        pageInfo: PageInfo!
        count: Int
    }

    type AtomConnection {
        edges: [AtomEdge]
        pageInfo: PageInfo
    }

    type AtomEdge {
        cursor: String!
        node: Atom!
    }

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
    }

    type Cursor {
        hasNext: Boolean,
        hasPrevious: Boolean,
        before: String,
        after: String
    }

    type AtomPaginate {
        results: [Atom],
        cursors: Cursor
    }

    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms(limit: Int): [Atom!]!
        atomsByCategory(filter: AtomFilter, limit: Int): [Atom!]!
        atomCursorPaginated(atomConnection: ConnectionInput): AtomConnection
        atomPaginate(atomConnection: ConnectionInput): AtomPaginate
        searchAtoms(filter: AtomFilter, 
                    sortBy: String,
                    limit: Int,
                    offset: Int): AtomConnectionOffset!
    }

`;


/*******************************************/
/*            ATOM QUERY RESOLVER          */
/*******************************************/

export const resolver = {
    
    PageInfo: {
        hasNextPage(connection: any, args: any) {
            return connection.hasNextPage();
        },
        hasPreviousPage(connection: any, args: any) {
            return connection.hasPreviousPage();
        }
    },

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
        searchAtoms(
            parent: any, 
            {
                filter, 
                sortBy = 'created_at', 
                limit = 12,
                offset = 12
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
                limit,
                offset
            }).then((atoms: any) => {
                const edges = atoms.rows.map((atom: any) => ({
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

        },




        /**
         * @desc Implementation of a Atom pagination based on Relay Cursor Connection (only sortBy ID)
         * @method Method atomCursorPaginated
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IAtomQueryArgs} args - destructuring: filter, limit, sortBy
         * @param {any} atomConnection - include: first, last, before, and after parameters
         * @returns {Array<Atom>} Atoms List based on a pagination params
         */
        atomCursorPaginated(parent: any, { atomConnection = {} }: IAtomQueryArgs) {
            const { first, after, last, before } = atomConnection;
            let where: any = {};
            const DESC = 'DESC';
            const ASC = 'ASC';

            let order = DESC;

            // PREVIOUS (before => ASC => $gt) + last
            if (before) {
                let cursor = Buffer.from(before, 'base64').toString().split(':');
                if (cursor[1] === '0') {
                    where = {
                        likes: { $gte: cursor[1] },
                        id: { $gt: cursor[0] }
                    };
                } else {
                    where.likes = { $gt: cursor[1] };
                }
                order = ASC;
            }

            // NEXT (after => DESC => $lt) + first
            if (after) {
                let cursor = Buffer.from(after, 'base64').toString().split(':');
                if (cursor[1] === '0') {
                    where = {
                        likes: { $lte: cursor[1] },
                        id: { $lt: cursor[0] }
                    };
                } else {
                    where.likes = { $lt: cursor[1] };
                }
                order = DESC;
            }

            // GET ATOMS BASED ON FILTERS AND PAGINATION
            return models.Atom.findAll({
                where,
                order: [['likes', order], ['id', order]],
                limit: first || last
            }).then((atoms: any) => {
                
                // When is 'previous button' is necessary to reverser the array result
                if (before) {
                    atoms = atoms.slice(0).reverse();
                }

                const edges = atoms.map((atom: any) => {

                    let str = `${atom.dataValues.id}:${atom.dataValues.likes}`;

                    return {
                        cursor: Buffer.from(str).toString('base64'),
                        node: atom
                    };
                });

                return {
                    edges,
                    pageInfo: {
                        hasNextPage() {

                            // 'elements returned' is less than 'elements per page'
                            if (atoms.length < (last || first) &&
                                after) {
                                return Promise.resolve(false);
                            }

                            // get element greater than/less than last element on 'returned' elements list
                            return models.Atom.findOne({
                                where: {
                                  id: {
                                    [before ? '$lt' : '$gt']: atoms[atoms.length - 1].dataValues.id,
                                  },
                                },
                                order: [['id', 'DESC']],
                            }).then((atom: any) => {
                                    return !!atom;
                                }
                            );

                        },
                        hasPreviousPage() {

                            // 'elements returned' is less than 'elements per page'
                            if (atoms.length < (last || first) &&
                                before) {
                                return Promise.resolve(false);
                            }

                            // get element greater than/less than cursor element
                            return models.Atom.findOne({
                              where: {
                                id: where.id,
                              },
                              order: [['id']],
                            }).then((atom: any) => !!atom);

                        },
                    }
                };

            });

        },



        atomPaginate(parent: any, { atomConnection = {} }: IAtomQueryArgs) {
            const { first, after, last, before } = atomConnection;
            let where = {
                stores: {
                    $gte: 0
                }
            };
            // let where = {};
            let include: any = []; 
            let limit = first;
            let desc = true; 
            let primaryKeyField = 'id';
            // let primaryKeyField = 'created_at';
            let paginationField = 'stores';
            // let paginationField = 'created_at';
            const decodedBefore: Array<any> = !!before ?  pagination.decodeCursor(before) : null;
            const decodedAfter: Array<any> = !!after ?  pagination.decodeCursor(after) : null;
            // If is before (previous) = FALSE, if not TRUE
            const cursorOrderIsDesc = before ? !desc : desc;
            const cursorOrderOperator: string = cursorOrderIsDesc ? '$lt' : '$gt';
            const paginationFieldIsNonId = paginationField !== primaryKeyField;

            let paginationQuery;

            let order: Array<any> = [
                cursorOrderIsDesc ? [paginationField, 'DESC'] : paginationField,
                ...(paginationFieldIsNonId ? [primaryKeyField] : []),
            ];
            
            if (before) {

                paginationQuery =  pagination.getPaginationQuery(
                    decodedBefore, 
                    cursorOrderOperator, 
                    paginationField, 
                    primaryKeyField
                );

                /* FIXME: #67 - Rompe cuando paginationFieldIsNonId es false, es decir 
                   cuando quiero organizar por 'created_at' */
                order = [
                    paginationField,
                    // ...(paginationFieldIsNonId ? [primaryKeyField, 'DESC'] : []),
                    paginationFieldIsNonId ? [primaryKeyField, 'DESC'] : '',
                ];

            } else if (after) {

                paginationQuery =  pagination.getPaginationQuery(
                    decodedAfter, 
                    cursorOrderOperator, 
                    paginationField, 
                    primaryKeyField
                );

                order = [
                    cursorOrderIsDesc ? [paginationField, 'DESC'] : paginationField,
                    ...(paginationFieldIsNonId ? [primaryKeyField] : []),
                ];

            }

            const whereQuery = paginationQuery ? { $and: [paginationQuery, where] } : where;

            return models.Atom.findAll({
                where: whereQuery,
                include,
                limit: limit + 1,
                order,
            }).then((results: any) => {
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
                    ?  pagination.encodeCursor([results[0][paginationField], results[0][primaryKeyField]])
                    :  pagination.encodeCursor([results[0][paginationField]]);
        
                    afterCursor = paginationFieldIsNonId
                    // tslint:disable-next-line:max-line-length
                    ?  pagination.encodeCursor([results[results.length - 1][paginationField], results[results.length - 1][primaryKeyField]])
                    :  pagination.encodeCursor([results[results.length - 1][paginationField]]);
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