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
        allAtoms: [Atom!]!
        activeAtoms: [Atom!]!
    }
`;
/*******************************************/
/*            ATOM QUERY RESOLVER          */
/*******************************************/
exports.resolver = {
    Query: {
        atomById(parent, { id }) {
            return index_1.models.Atom.findById(id);
        },
        atoms() {
            return index_1.models.Atom.findAll();
        }
    },
    Atom: {
        comments(atom) {
            return atom.getComment();
        },
        author(atom) {
            return atom.getAuthor();
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