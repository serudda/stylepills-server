"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/****************************************/
/*         SOCIAL QUERY TYPEDEF         */
/****************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        social(id: ID!): Social
    }
`;
/*******************************************/
/*           USER QUERY RESOLVER           */
/*******************************************/
exports.resolver = {
    Query: {
        social(root, { id }) {
            return index_1.models.Social.findById(id);
        },
    },
};
/*

Queries:


query getSocialById($socialId : ID!) {
    social(id: $socialId) {
        id
        twitter
        facebook
        github
        linkedin
        __typename
    }
}
*/ 
//# sourceMappingURL=social.query.js.map