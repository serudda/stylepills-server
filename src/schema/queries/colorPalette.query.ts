/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/
interface IColorPaletteArgs {
    id: number;
}


/**************************************/
/*     COLOR PALETTE QUERY TYPEDEF    */
/**************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        colorPalettes: [ColorPalette]
        colorPalette(id: ID!): ColorPalette
    }
`;


/********************************************/
/*       COLOR PALETTE QUERY RESOLVER       */
/********************************************/

export const resolver = {
    Query: {
        colorPalettes() {
            return models.ColorPalette.findAll();
        },
        colorPalette(root: any, { id }: IColorPaletteArgs) {
            return models.ColorPalette.findById(id);
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