"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/**************************************/
/*     UI COMPONENT QUERY TYPEDEF     */
/**************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        atoms: [Atom]
        atom(id: ID!): Atom
    }
`;
/*******************************************/
/*       UI COMPONENT QUERY RESOLVER       */
/*******************************************/
exports.resolver = {
    Query: {
        atoms() {
            return index_1.models.Atom.findAll();
        },
        atom(root, { id }) {
            return index_1.models.Atom.findById(id);
        },
    }
};
/*

Queries:


query getAtomById($atomId : ID!) {
    atom(id: $atomId) {
        id
        name
        css
        scss
        html
        background
        download
        __typename
        colorPalette {
            id
            category
            description
            __typename
            colors {
                id
                hex
                label
                __typename
            }
        }
    }
}
*/ 
//# sourceMappingURL=atom.query.js.map