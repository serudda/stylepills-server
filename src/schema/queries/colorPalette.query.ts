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

export const resolver = {
    Query: {
        getAllColorPalettes(root: any, args: any) {
            return models.ColorPalette.findAll();
        },
        getColorPaletteById(root: any, args: any) {
            return models.ColorPalette.findById(args.id);
        },
    },
    ColorPalette: {
        colors(colorPalette: any) {
            return colorPalette.getColor();
        },
    },
};
