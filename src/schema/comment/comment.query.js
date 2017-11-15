"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/**************************************/
/*        COMMENT QUERY TYPEDEF       */
/**************************************/
exports.typeDef = `
    extend type Query {
        commentById(id: ID!): Comment!
        allComments: [Comment!]!
        activeComments: [Comment!]!
    }
`;
/*******************************************/
/*          COMMENT QUERY RESOLVER         */
/*******************************************/
exports.resolver = {
    Query: {
        commentById(parent, { id }) {
            return index_1.models.Comment.findById(id);
        },
        allComments() {
            return index_1.models.Comment.findAll();
        },
        activeComments() {
            return index_1.models.Comment.findAll({ where: { active: true } });
        }
    },
    Comment: {
        author(comment) {
            return comment.getUser();
        }
    }
};
/*

Queries:


query getAtomById($atomId : ID!) {
    atom(id: $atomId) {
        id
        name
        description
        __typename
    }
}
*/ 
//# sourceMappingURL=comment.query.js.map