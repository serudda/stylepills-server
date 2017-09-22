"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/**************************************/
/*     COLOR PALETTE QUERY TYPEDEF    */
/**************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        colorPalettes: [ColorPalette]
        colorPalette(id: ID!): ColorPalette
    }
`;
/********************************************/
/*       COLOR PALETTE QUERY RESOLVER       */
/********************************************/
exports.resolver = {
    Query: {
        colorPalettes() {
            return index_1.models.ColorPalette.findAll();
        },
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipos
        colorPalette(root, { id }) {
            return index_1.models.ColorPalette.findById(id);
        },
    },
    ColorPalette: {
        // TODO: Investigar mas a fondo los types de apollo graph server para poder quitar este any
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