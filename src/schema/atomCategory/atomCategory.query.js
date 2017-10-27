"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/**************************************/
/*     ATOM CATEGORY QUERY TYPEDEF    */
/**************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        atomCategoryById(id: ID!): AtomCategory
        atomCategories: [AtomCategory]
    }
`;
/*******************************************/
/*       ATOM CATEGORY QUERY RESOLVER      */
/*******************************************/
exports.resolver = {
    Query: {
        atomCategories() {
            return index_1.models.AtomCategory.findAll();
        },
        atomCategoryById(source, { id }) {
            return index_1.models.AtomCategory.findById(id);
        }
    }
};
/*

Queries:


query getAtomCategoryById($atomCategoryId : ID!) {
    atomCategoryById(id: $atomCategoryId) {
        id
        name
        description
        __typename
    }
}
*/ 
//# sourceMappingURL=atomCategory.query.js.map