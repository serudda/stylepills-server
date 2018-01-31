/************************************/
/*           DEPENDENCIES           */
/************************************/
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { logger } from './../core/utils/logger';

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

import * as projectTypes from './project/project.type';
import * as projectQuery from './project/project.query';
import * as projectMutation from './project/project.mutation';

import * as projectCategoryTypes from './projectCategory/projectCategory.type';
import * as projectCategoryQuery from './projectCategory/projectCategory.query';

import * as libTypes from './lib/lib.type';
import * as libQuery from './lib/lib.query';

import * as colorTypes from './color/color.type';
import * as colorQuery from './color/color.query';

import * as rgbaColorTypes from './rgbaColor/rgbaColor.type';
import * as rgbaColorQuery from './rgbaColor/rgbaColor.query';

import * as GraphQLJSON from 'graphql-type-json';

const scalarJSON: any = {
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

    colorTypes.typeDef,
    colorQuery.typeDef,

    rgbaColorTypes.typeDef,
    rgbaColorQuery.typeDef
    
];


/*****************************************/
/*             ROOT RESOLVERS            */
/*****************************************/
const resolvers: any = merge(

    scalarJSON,
    
    userMutation.resolver,
    userQuery.resolver,

    commentQuery.resolver,

    atomCategoryQuery.resolver,

    atomMutation.resolver,
    atomQuery.resolver,

    projectMutation.resolver,
    projectQuery.resolver,

    projectCategoryQuery.resolver,

    libQuery.resolver,

    colorQuery.resolver,

    rgbaColorQuery.resolver

);


/*****************************************/
/*         SIMPLE LOGGER SYSTEM          */
/*****************************************/
const loggerSchema = { 
    log: (error: Error) => logger.log('error', 'Error occurred', error)
};


/*****************************************/
/*                SCHEMA                 */
/*****************************************/
const schema = makeExecutableSchema({
    logger: loggerSchema,
    resolvers: resolvers,
    typeDefs: typeDefs,
});

// LOG
logger.log('info', 'GraphQL Schema activated');

export default schema;