/************************************/
/*           DEPENDENCIES           */
/************************************/
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { loggingConfig } from './../config/logging-config';

import * as colorMutation from './mutations/color.mutation';
import * as colorQuery from './queries/color.query';
import * as colorTypes from './types/color.type';

import * as colorPaletteMutation from './mutations/colorPalette.mutation';
import * as colorPaletteQuery from './queries/colorPalette.query';
import * as colorPaletteTypes from './types/colorPalette.type';

import * as uiComponentMutation from './mutations/uiComponent.mutation';
import * as uiComponentQuery from './queries/uiComponent.query';
import * as uiComponentTypes from './types/uiComponent.type';


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
const resolvers: any = merge(
    colorMutation.resolver, 
    colorQuery.resolver, 
    colorPaletteMutation.resolver,
    colorPaletteQuery.resolver,
    uiComponentMutation.resolver,
    uiComponentQuery.resolver
);


/*****************************************/
/*         SIMPLE LOGGER SYSTEM          */
/*****************************************/
// TODO: Agregar un simple de log mas robusto para que me facilite ver los errores del server
const logger = { log: (error: Error) => console.log(error) };


/*****************************************/
/*                SCHEMA                 */
/*****************************************/
const schema = makeExecutableSchema({
  logger,
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export default schema;