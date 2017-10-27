"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const userMutation = require("./user/user.mutation");
const userQuery = require("./user/user.query");
const userTypes = require("./user/user.type");
const commentTypes = require("./comment/comment.type");
const atomMutation = require("./atom/atom.mutation");
const atomQuery = require("./atom/atom.query");
const atomTypes = require("./atom/atom.type");
/**********************************/
/*           ROOT TYPES           */
/**********************************/
// TODO: Remover estos types 'Base' que no sirven para nada. Convertir a User como Type Base
const typeDefs = [`

    # Type
    type Base {
        id: ID!
        base: String
    }

    # Input
    input CreateBaseInput {
        base: String
    }
    
    # Query
    type Query {
        base: [Base]
    }

    # Mutations
    type Mutation {
        createBase(input: CreateBaseInput!): Base
    }

    # Main Schema
    schema {
        query: Query
        mutation: Mutation
    }
`,
    userTypes.typeDef,
    userQuery.typeDef,
    userMutation.typeDef,
    commentTypes.typeDef,
    atomTypes.typeDef,
    atomQuery.typeDef,
    atomMutation.typeDef,
];
/*****************************************/
/*             ROOT RESOLVERS            */
/*****************************************/
const resolvers = lodash_1.merge(userMutation.resolver, userQuery.resolver, atomMutation.resolver, atomQuery.resolver);
/*****************************************/
/*         SIMPLE LOGGER SYSTEM          */
/*****************************************/
// TODO: Agregar un simple de log mas robusto para que me facilite ver los errores del server
const logger = { log: (error) => console.log(error) };
/*****************************************/
/*                SCHEMA                 */
/*****************************************/
const schema = graphql_tools_1.makeExecutableSchema({
    logger,
    resolvers: resolvers,
    typeDefs: typeDefs,
});
exports.default = schema;
//# sourceMappingURL=index.js.map