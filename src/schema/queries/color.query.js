"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/****************************************/
/*          COLOR QUERY TYPEDEF         */
/****************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        colors: [Color]
        color(id: ID!): Color
    }
`;
/****************************************/
/*         COLOR QUERY RESOLVER         */
/****************************************/
exports.resolver = {
    Query: {
        colors() {
            return index_1.models.Color.findAll();
        },
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipos
        color(root, { id }) {
            return index_1.models.Color.findById(id);
        },
    }
};
/*

Queries:


query getColorById($colorId : ID!) {
    color(id: $colorId) {
        id
        hex
        label
        __typename
    }
}
*/ 
//# sourceMappingURL=color.query.js.map