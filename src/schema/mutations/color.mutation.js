"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/****************************************/
/*        COLOR MUTATION TYPEDEF        */
/****************************************/
exports.typeDef = `

# Input
input CreateColorInput {
    label: String
    hex: String
}

# Mutations
extend type Mutation {
    addColor(input: CreateColorInput!): Color
}

`;
/*****************************************/
/*        COLOR MUTATION RESOLVER        */
/*****************************************/
exports.resolver = {
    Mutation: {
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipo
        addColor(root, args) {
            return index_1.models.Color.create({
                label: args.input.label,
                hex: args.input.hex
            });
        },
    },
};
//# sourceMappingURL=color.mutation.js.map