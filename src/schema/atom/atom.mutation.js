"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
exports.typeDef = `

# Input
input CreateAtomInput {
    name: String 
    css: String
    html: String
    contextualBg: String
    download: String
}

# Mutations
extend type Mutation {

    createAtom(input: CreateAtomInput!): Atom!

    activeAtom(
        id: ID!
    ): Atom!

    deactivateAtom(
        id: ID!
    ): Atom!
}

`;
exports.resolver = {
    Mutation: {
        createAtom(root, args) {
            return index_1.models.Atom.create(args.input)
                .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        },
    },
};
//# sourceMappingURL=atom.mutation.js.map