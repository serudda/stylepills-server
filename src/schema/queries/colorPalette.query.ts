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
        colorPalettes: [ColorPalette]
        colorPalette(id: ID!): ColorPalette
    }
`;

export const resolver = {
    Query: {
        colorPalettes(root: any, args: any) {
            return models.ColorPalette.findAll();
        },
        colorPalette(root: any, args: any) {
            return models.ColorPalette.findById(args.id);
        },
    },
    ColorPalette: {
        colors(colorPalette: any) {
            return colorPalette.getColor();
        },
    },
};



/* 

Queries:


query getColorPaletteById($colorPaletteId : ID!) {
    colorPalette(id: $colorPaletteId) {
        id
        colors {
            id
            hex
            label
            __typename
        }
        category
        description
        __typename
    }
}

*/