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
`,
    colorMutation.typeDef,
    colorQuery.typeDef,
    colorTypes.typeDef,

    colorPaletteMutation.typeDef,
    colorPaletteQuery.typeDef,
    colorPaletteTypes.typeDef,

    uiComponentMutation.typeDef,
    uiComponentQuery.typeDef,
    uiComponentTypes.typeDef,
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