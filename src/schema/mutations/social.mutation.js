"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/*****************************************/
/*            SOCIAL MUTATION            */
/*****************************************/
exports.typeDef = `

# Input
input CreateSocialInput {
    twitter: String
    facebook: String
    github: String
    linkedin: String
}

# Mutations
extend type Mutation {
    createSocial(input: CreateSocialInput!): Social
}

`;
exports.resolver = {
    Mutation: {
        createSocial(root, args) {
            return index_1.models.Social.create({
                twitter: args.input.twitter,
                facebook: args.input.facebook,
                github: args.input.github,
                linkedin: args.input.linkedin,
            });
        },
    },
};
//# sourceMappingURL=social.mutation.js.map