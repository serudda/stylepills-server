/************************************/
/*           DEPENDENCIES           */
/************************************/
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import * as userTypes from './user/user.type';
import * as userQuery from './user/user.query';
import * as userMutation from './user/user.mutation';

import * as commentTypes from './comment/comment.type';
import * as commentQuery from './comment/comment.query';

import * as atomCategoryTypes from './atomCategory/atomCategory.type';
import * as atomCategoryQuery from './atomCategory/atomCategory.query';

import * as atomTypes from './atom/atom.type';
import * as atomQuery from './atom/atom.query';
import * as atomMutation from './atom/atom.mutation';


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
const resolvers: any = merge(

    userMutation.resolver,
    userQuery.resolver,

    commentQuery.resolver,

    atomCategoryQuery.resolver,

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