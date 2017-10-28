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
    # Root Query
    extend type Query {
        commentById(id: ID!): Comment
        comments: [Comment]
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
        comments() {
            return index_1.models.Comment.findAll();
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