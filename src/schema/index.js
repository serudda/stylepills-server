"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const colorMutation = require("./mutations/color.mutation");
const colorQuery = require("./queries/color.query");
const colorTypes = require("./types/color.type");
const colorPaletteMutation = require("./mutations/colorPalette.mutation");
const colorPaletteQuery = require("./queries/colorPalette.query");
const colorPaletteTypes = require("./types/colorPalette.type");
const uiComponentMutation = require("./mutations/uiComponent.mutation");
const uiComponentQuery = require("./queries/uiComponent.query");
const uiComponentTypes = require("./types/uiComponent.type");
/**********************************/
/*           ROOT TYPES           */
/**********************************/
const typeDefs = [`

    # Type
    type User {
        id: ID!
        username: String
        firstName: String
        lastName: String
    }

    # Input
    input CreateUserInput {
        username: String
        firstName: String
        lastName: String
    }
    
    # Query
    type Query {
        users: [User]
    }

    # Mutations
    type Mutation {
        createUser(input: CreateUserInput!): User
    }

    # Main Schema
    schema {
        query: Query
        mutation: Mutation
    }
`,
    colorTypes.typeDef,
    colorQuery.typeDef,
    colorMutation.typeDef,
    colorPaletteTypes.typeDef,
    colorPaletteQuery.typeDef,
    colorPaletteMutation.typeDef,
    uiComponentTypes.typeDef,
    uiComponentQuery.typeDef,
    uiComponentMutation.typeDef,
];
/*****************************************/
/*             ROOT RESOLVERS            */
/*****************************************/
const resolvers = lodash_1.merge(colorMutation.resolver, colorQuery.resolver, colorPaletteMutation.resolver, colorPaletteQuery.resolver, uiComponentMutation.resolver, uiComponentQuery.resolver);
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