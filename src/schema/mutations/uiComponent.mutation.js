"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/*****************************************/
/*         UI COMPONENT MUTATION         */
/*****************************************/
exports.typeDef = `

# Input
input CreateUiComponentInput {
    name: String
    colorPalette: [CreateColorPaletteInput]
    css: String
    scss: String
    html: String
    background: String
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
                name: args.input.name,
                html: args.input.html,
                css: args.input.css,
                scss: args.input.scss,
                background: args.input.background
            });
        },
    },
};
//# sourceMappingURL=uiComponent.mutation.js.map