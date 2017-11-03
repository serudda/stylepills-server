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
    }
`;
/*******************************************/
/*       ATOM CATEGORY QUERY RESOLVER      */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get all Atom's categories
         * @method Method allAtomCategories
         * @public
         * @returns {Array<IAtomCategory>} Atom's categories list
         */
        allAtomCategories() {
            return index_1.models.AtomCategory.findAll({
                where: {
                    active: true
                }
            });
        }
    },
    AtomCategory: {
        atoms(atomCategory) {
            return atomCategory.getAtoms();
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