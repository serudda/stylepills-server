"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/************************************************/
/*        COLOR PALETTE MUTATION TYPEDEF        */
/************************************************/
exports.typeDef = `

# Input
input CreateColorPaletteInput {
    category: String,
    description: String,
    colors: [CreateColorInput]
}

# Mutations
extend type Mutation {
    createColorPalette(input: CreateColorPaletteInput!): ColorPalette
}

`;
/************************************************/
/*       COLOR PALETTE MUTATION RESOLVER        */
/************************************************/
exports.resolver = {
    Mutation: {
        createColorPalette(root, args) {
            return index_1.models.ColorPalette.create({
                category: args.input.category,
                description: args.input.description
            });
        },
    },
};
//# sourceMappingURL=colorPalette.mutation.js.map