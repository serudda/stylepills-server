"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/****************************************/
/*            COLOR MUTATION            */
/****************************************/
exports.typeDef = `

# Input
input CreateUiComponentInput {
    title: String
    colorPalette: [CreateColorPaletteInput]
    css: String
    scss: String
    html: String
}

# Mutations
extend type Mutation {
    createUiComponent(input: CreateUiComponentInput!): UiComponent
}

`;
exports.resolver = {
    Mutation: {
        createUiComponent(root, args) {
            return index_1.models.UiComponent.create({
                title: args.input.title,
                html: args.input.html,
                css: args.input.css,
                scss: args.input.scss
            });
        },
    },
};
//# sourceMappingURL=uiComponent.mutation.js.map