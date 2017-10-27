/************************************/
/*           DEPENDENCIES           */
/************************************/
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import * as userMutation from './mutations/user.mutation';
import * as userQuery from './queries/user.query';
import * as userTypes from './types/user.type';

import * as atomMutation from './mutations/atom.mutation';
import * as atomQuery from './queries/atom.query';
import * as atomTypes from './types/atom.type';


/**********************************/
/*           ROOT TYPES           */
/**********************************/
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
    
    atomTypes.typeDef,
    atomQuery.typeDef,
    atomMutation.typeDef,
    
];


/*****************************************/
/*             ROOT RESOLVERS            */
/*****************************************/
const resolvers: any = merge(
    userMutation.resolver,
    userQuery.resolver,
    atomMutation.resolver,
    atomQuery.resolver
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