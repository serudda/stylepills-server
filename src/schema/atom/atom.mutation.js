"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/*****************************************/
/*         UI COMPONENT MUTATION         */
/*****************************************/
// TODO: Asignar las propiedades reales
exports.typeDef = `

# Input
input CreateAtomInput {
    name: String 
    css: String
    html: String
    background: String
    download: String
}

# Mutations
extend type Mutation {
    createAtom(input: CreateAtomInput!): Atom
}

`;
exports.resolver = {
    Mutation: {
        createAtom(root, args) {
            return index_1.models.Atom.create({
                name: args.input.name,
                html: args.input.html,
                css: args.input.css,
                otherCode: args.input.otherCode,
                contextualBg: args.input.contextualBg,
                stores: args.input.stores,
                views: args.input.views,
                likes: args.input.likes,
                download: args.input.download
            });
        },
    },
};
//# sourceMappingURL=atom.mutation.js.map