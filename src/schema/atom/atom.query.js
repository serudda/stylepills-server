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
        activeAtoms: [Atom!]!
    }

    input AtomFilter {
        OR: [AtomFilter!]
        private: Boolean
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
        allAtoms(parent, { filter }) {
            return index_1.models.Atom.findAll({ where: filter });
        },
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