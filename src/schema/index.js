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
const projectTypes = require("./project/project.type");
const projectQuery = require("./project/project.query");
const projectMutation = require("./project/project.mutation");
const projectCategoryTypes = require("./projectCategory/projectCategory.type");
const projectCategoryQuery = require("./projectCategory/projectCategory.query");
const libTypes = require("./lib/lib.type");
const libQuery = require("./lib/lib.query");
const preprocessorTypes = require("./preprocessor/preprocessor.type");
const preprocessorQuery = require("./preprocessor/preprocessor.query");
const colorTypes = require("./color/color.type");
const colorQuery = require("./color/color.query");
const rgbaColorTypes = require("./rgbaColor/rgbaColor.type");
const rgbaColorQuery = require("./rgbaColor/rgbaColor.query");
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

    # Input
    input CreateBaseInput {
        base: String
    }

    # Type
    type Base {
        id: ID!
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
    projectTypes.typeDef,
    projectQuery.typeDef,
    projectMutation.typeDef,
    projectCategoryTypes.typeDef,
    projectCategoryQuery.typeDef,
    libTypes.typeDef,
    libQuery.typeDef,
    preprocessorTypes.typeDef,
    preprocessorQuery.typeDef,
    colorTypes.typeDef,
    colorQuery.typeDef,
    rgbaColorTypes.typeDef,
    rgbaColorQuery.typeDef
];
/*****************************************/
/*             ROOT RESOLVERS            */
/*****************************************/
const resolvers = lodash_1.merge(scalarJSON, userMutation.resolver, userQuery.resolver, commentQuery.resolver, atomCategoryQuery.resolver, atomMutation.resolver, atomQuery.resolver, projectMutation.resolver, projectQuery.resolver, projectCategoryQuery.resolver, libQuery.resolver, preprocessorQuery.resolver, colorQuery.resolver, rgbaColorQuery.resolver);
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