"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const logger_1 = require("./../core/utils/logger");
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
const GraphQLJSON = require("graphql-type-json");
const scalarJSON = {
    JSON: GraphQLJSON
};
/**********************************/
/*           ROOT TYPES           */
/**********************************/
// TODO: Remover estos types 'Base' que no sirven para nada. Convertir a User como Type Base
const typeDefs = [`
    #Scalar
    scalar JSON

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
const resolvers = lodash_1.merge(scalarJSON, userMutation.resolver, userQuery.resolver, commentQuery.resolver, atomCategoryQuery.resolver, atomMutation.resolver, atomQuery.resolver);
/*****************************************/
/*         SIMPLE LOGGER SYSTEM          */
/*****************************************/
const loggerSchema = {
    log: (error) => logger_1.logger.log('error', 'Error occurred', error)
};
/*****************************************/
/*                SCHEMA                 */
/*****************************************/
const schema = graphql_tools_1.makeExecutableSchema({
    logger: loggerSchema,
    resolvers: resolvers,
    typeDefs: typeDefs,
});
// LOG
logger_1.logger.log('info', 'GraphQL Schema activated');
exports.default = schema;
//# sourceMappingURL=index.js.map