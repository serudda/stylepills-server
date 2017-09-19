"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
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
        getAllUsers: [User]
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
// Merge all of the resolver objects together
const resolvers = lodash_1.merge(colorMutation.resolver, colorQuery.resolver, colorPaletteMutation.resolver, colorPaletteQuery.resolver, uiComponentMutation.resolver, uiComponentQuery.resolver);
const schema = graphql_tools_1.makeExecutableSchema({
    logger: console,
    resolvers: resolvers,
    typeDefs: typeDefs,
});
exports.default = schema;
//# sourceMappingURL=index.js.map