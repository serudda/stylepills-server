"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const userTypes = require("./user/user.type");
const userQuery = require("./user/user.query");
const userMutation = require("./user/user.mutation");
const commentTypes = require("./comment/comment.type");
const commentQuery = require("./comment/comment.query");
const atomCategoryTypes = require("./atomCategory/atomCategory.type");
const atomCategoryQuery = require("./atomCategory/atomCategory.query");
const atomTypes = require("./atom/atom.type");
const atomQuery = require("./atom/atom.query");
const atomMutation = require("./atom/atom.mutation");
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
    commentQuery.typeDef,
    atomCategoryTypes.typeDef,
    atomCategoryQuery.typeDef,
    atomTypes.typeDef,
    atomQuery.typeDef,
    atomMutation.typeDef,
];
/*****************************************/
/*             ROOT RESOLVERS            */
/*****************************************/
const resolvers = lodash_1.merge(userMutation.resolver, userQuery.resolver, commentQuery.resolver, atomCategoryQuery.resolver, atomMutation.resolver, atomQuery.resolver);
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