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
// FIXME: Tratar de no tener que usar: extend usando esta guia:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#modularizing
exports.resolver = {
    Query: {
        getAllColorPalettes(root, args) {
            return index_1.models.ColorPalette.findAll();
        },
        getColorPaletteById(root, args) {
            return index_1.models.ColorPalette.findById(args.id);
        },
    },
};
//# sourceMappingURL=colorPalette.query.js.map