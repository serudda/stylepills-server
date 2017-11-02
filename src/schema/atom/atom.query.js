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
exports.resolver = {
    Query: {
        // Get Atom by Id
        atomById(parent, { id }) {
            return index_1.models.Atom.findById(id);
        },
        // Get all Atoms
        allAtoms(parent, { filter }) {
            return index_1.models.Atom.findAll({ where: filter });
        },
        // Get all Atoms by category
        atomsByCategory(parent, { filter }) {
            return index_1.models.Atom.findAll({
                where: {
                    active: true,
                    atomCategoryId: filter.atomCategoryId
                }
            });
        },
        // Get all Atoms by name and category
        searchAtoms(parent, { filter }) {
            // Init Filter
            // TODO: Leer nuestros apuntos de como se debe inicializar una funcion con valores "default"
            // en el cuaderno donde anotamos todo sobre ES6
            let filters = {
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
            return index_1.models.Atom.findAll({
                limit: 10,
                where: filters
            });
        },
        // Get all active Atoms
        activeAtoms() {
            return index_1.models.Atom.findAll({ where: { active: true } });
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
//# sourceMappingURL=atom.query.js.map