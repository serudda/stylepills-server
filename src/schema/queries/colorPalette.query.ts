/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/*************************************/
/*            COLOR QUERY            */
/*************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        getAllColorPalettes: [ColorPalette]
        getColorPaletteById(id: ID!): ColorPalette
    }
`;
// FIXME: Tratar de no tener que usar: extend usando esta guia:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#modularizing
export const resolver = {
    Query: {
        getAllColorPalettes(root: any, args: any) {
            return models.ColorPalette.findAll();
        },
        getColorPaletteById(root: any, args: any) {
            return models.ColorPalette.findById(args.id);
        },
    },
};