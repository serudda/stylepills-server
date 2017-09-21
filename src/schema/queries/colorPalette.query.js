"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/*************************************/
/*            COLOR QUERY            */
/*************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        colorPalettes: [ColorPalette]
        colorPalette(id: ID!): ColorPalette
    }
`;
exports.resolver = {
    Query: {
        colorPalettes(root, args) {
            return index_1.models.ColorPalette.findAll();
        },
        colorPalette(root, args) {
            return index_1.models.ColorPalette.findById(args.id);
        },
    },
    ColorPalette: {
        colors(colorPalette) {
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
//# sourceMappingURL=colorPalette.query.js.map