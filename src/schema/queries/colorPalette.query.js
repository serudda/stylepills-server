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
        getAllColorPalettes: [ColorPalette]
        getColorPaletteById(id: ID!): ColorPalette
    }
`;
exports.resolver = {
    Query: {
        getAllColorPalettes(root, args) {
            return index_1.models.ColorPalette.findAll();
        },
        getColorPaletteById(root, args) {
            return index_1.models.ColorPalette.findById(args.id);
        },
    },
    ColorPalette: {
        colors(colorPalette) {
            return colorPalette.getColor();
        },
    },
};
//# sourceMappingURL=colorPalette.query.js.map