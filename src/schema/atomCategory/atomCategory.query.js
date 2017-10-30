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
    extend type Query {
        atomCategoryById(id: ID!): AtomCategory!
        allAtomCategories: [AtomCategory!]!
        activeAtomCategories: [AtomCategory!]!
    }
`;
/*******************************************/
/*       ATOM CATEGORY QUERY RESOLVER      */
/*******************************************/
exports.resolver = {
    Query: {
        atomCategoryById(parent, { id }) {
            return index_1.models.AtomCategory.findById(id);
        },
        atomCategories() {
            return index_1.models.AtomCategory.findAll();
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