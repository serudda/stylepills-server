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
        userById(id: ID!): User!
        allUsers: [User!]!
        activeUsers: [User!]!
    }
`;
/*******************************************/
/*           USER QUERY RESOLVER           */
/*******************************************/
exports.resolver = {
    Query: {
        userById(parent, { id }) {
            return index_1.models.User.findById(id);
        },
        allUsers() {
            return index_1.models.User.findAll();
        },
        activeUsers() {
            return index_1.models.User.findAll({ where: { active: true } });
        }
    },
    User: {
        atoms(user) {
            return user.getAtoms();
        }
    },
};
/*

Queries:


query getUserById($userId : ID!) {
    userById(id: $userId) {
        id
        firstname
        lastname
        username
        email
        avatar
        about
        website
        __typename
        atoms {
            id
            name
            __typename
        }
    }
}
*/ 
//# sourceMappingURL=user.query.js.map