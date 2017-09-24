"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
/***************************************/
/*            USER MUTATION            */
/***************************************/
exports.typeDef = `

# Input
input CreateUserInput {
    firstname: String
    lastname: String
    avatar: String
    username: String
    email: String
    about: String
    website: String
    social: [CreateSocialInput]
    uiComponents: [CreateUiComponentInput]
}

# Mutations
extend type Mutation {
    createUser(input: CreateUserInput!): User
}

`;
exports.resolver = {
    Mutation: {
        createUiComponent(root, args) {
            return index_1.models.User.create({
                firstname: args.input.firstname,
                lastname: args.input.lastname,
                username: args.input.username,
                avatar: args.input.avatar,
                email: args.input.email,
                website: args.input.website,
                about: args.input.about,
            });
        },
    },
};
//# sourceMappingURL=user.mutation.js.map