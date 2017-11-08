"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/**************************************/
/*         ATOM QUERY TYPEDEF         */
/**************************************/
exports.typeDef = `

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

    type AtomConnection {
        edges: [MessageEdge]
        pageInfo: PageInfo!
    }

    type MessageEdge {
        cursor: String!
        node: Atom!
    }

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
    }

    extend type Query {
        atomById(id: ID!): Atom!
        allAtoms(limit: Int): [Atom!]!
        atomsByCategory(filter: AtomFilter, limit: Int): [Atom!]!
        atomPaginated(atomConnection: ConnectionInput): AtomConnection
        searchAtoms(filter: AtomFilter, 
                    sortBy: String, 
                    limit: Int): [Atom!]!
    }

`;
/*******************************************/
/*            ATOM QUERY RESOLVER          */
/*******************************************/
exports.resolver = {
    PageInfo: {
        hasNextPage(connection, args) {
            return connection.hasNextPage();
        },
        hasPreviousPage(connection, args) {
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
        searchAtoms(parent, { filter, sortBy = 'created_at', limit = 12 }) {
            // Init Filter
            let queryFilter = {
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
            return index_1.models.Atom.findAll({
                limit,
                order: [[sortBy, 'DESC']],
                where: queryFilter
            });
        },
        atomPaginated(parent, { atomConnection = {} }) {
            const { first, last, before, after } = atomConnection;
            const where = {};
            const DESC = 'DESC';
            const ASC = 'ASC';
            let order = DESC;
            /*
            CHANGE ORDER BY:
                before => ASC
                after => DESC
            */
            if (before) {
                where.id = { $gt: Buffer.from(before, 'base64').toString() };
                order = ASC;
            }
            if (after) {
                where.id = { $lt: Buffer.from(after, 'base64').toString() };
                order = DESC;
            }
            return index_1.models.Atom.findAll({
                where,
                order: [['id', order]],
                limit: first || last
            }).then((atoms) => {
                // When is 'previous button' is necessary to reverser the array result
                if (before) {
                    atoms = atoms.slice(0).reverse();
                }
                const edges = atoms.map(atom => ({
                    // TODO: No deberia usar: dataValues, deberia poder usar atom.id directamente
                    cursor: Buffer.from(atom.dataValues.id.toString()).toString('base64'),
                    node: atom
                }));
                return {
                    edges,
                    pageInfo: {
                        hasNextPage() {
                            if (atoms.length < (last || first)) {
                                return Promise.resolve(false);
                            }
                            return index_1.models.Atom.findOne({
                                where: {
                                    id: {
                                        [before ? '$gt' : '$lt']: atoms[atoms.length - 1].dataValues.id,
                                    },
                                },
                                order: [['id', 'DESC']],
                            }).then(atom => !!atom);
                        },
                        hasPreviousPage() {
                            return index_1.models.Atom.findOne({
                                where: {
                                    id: where.id,
                                },
                                order: [['id']],
                            }).then(atom => !!atom);
                        },
                    }
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