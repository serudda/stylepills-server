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
input CreateColorInput {
    label: String
    hex: String
}

# Mutations
type Mutation {
    addColor(input: CreateColorInput!): Color
}

`;
exports.resolver = {
    Mutation: {
        addColor(root, args) {
            return index_1.models.Color.create({
                label: args.input.label,
                hex: args.input.hex
            });
        },
    },
};
//# sourceMappingURL=color.mutation.js.map