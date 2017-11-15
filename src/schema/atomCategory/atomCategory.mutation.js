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
input CreateAtomCategoryInput {
    name: String 
    css: String
    html: String
    contextualBg: String
    download: String
}

# Mutations
extend type Mutation {

    createAtomCategory(input: CreateAtomCategoryInput!): AtomCategory!

    activeAtomCategory(
        id: ID!
    ): AtomCategory!

    deactivateAtomCategory(
        id: ID!
    ): AtomCategory!
    
}

`;
exports.resolver = {
    Mutation: {
        createAtomCategory(root, args) {
            return index_1.models.AtomCategory.create(args.input)
                .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        },
    },
};
//# sourceMappingURL=atomCategory.mutation.js.map