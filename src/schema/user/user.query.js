"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/**************************************/
/*         USER QUERY TYPEDEF         */
/**************************************/
exports.typeDef = `
    extend type Query {
        user(id: ID!): User!
        users: [User!]!
    }
`;
/*******************************************/
/*           USER QUERY RESOLVER           */
/*******************************************/
exports.resolver = {
    Query: {
        users() {
            return index_1.models.User.findAll();
        },
        user(root, { id }) {
            return index_1.models.User.findById(id);
        },
    },
    User: {
        atoms(user) {
            return user.getAtom();
        }
    },
};
/*

Queries:


query getUserById($userId : ID!) {
    user(id: $userId) {
        id
        username
        firstname
        lastname
        email
        avatar
        about
        website
        __typename
        social {
            id
            twitter
            facebook
            github
            linkedin
            __typename
        }
        atoms {
            id
            name
            __typename
        }
    }
}
*/ 
//# sourceMappingURL=user.query.js.map