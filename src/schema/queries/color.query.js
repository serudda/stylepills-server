"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/*************************************/
/*            COLOR QUERY            */
/*************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        colors: [Color]
        color(id: ID!): Color
    }
`;
exports.resolver = {
    Query: {
        colors(root, args) {
            return index_1.models.Color.findAll();
        },
        color(root, args) {
            return index_1.models.Color.findById(args.id);
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