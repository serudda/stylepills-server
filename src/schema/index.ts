// index.ts
import { merge } from 'lodash';

import { makeExecutableSchema } from 'graphql-tools';

import * as colorMutation from './mutations/color.mutation';
import * as colorQuery from './queries/color.query';
import * as colorTypes from './types/color.type';

import * as colorPaletteMutation from './mutations/colorPalette.mutation';
import * as colorPaletteQuery from './queries/colorPalette.query';
import * as colorPaletteTypes from './types/colorPalette.type';

import * as uiComponentMutation from './mutations/uiComponent.mutation';
import * as uiComponentQuery from './queries/uiComponent.query';
import * as uiComponentTypes from './types/uiComponent.type';


const typeDefs = [`
    schema {
        query: Query
        mutation: Mutation
    }

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
const resolvers: any = merge(
    colorMutation.resolver, 
    colorQuery.resolver, 
    colorPaletteMutation.resolver,
    colorPaletteQuery.resolver,
    uiComponentMutation.resolver,
    uiComponentQuery.resolver
);

const schema = makeExecutableSchema({
  logger: console,
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export default schema;