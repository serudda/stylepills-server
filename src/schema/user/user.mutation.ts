/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IUser } from './../../models/user.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface ICreateUserArgs {
    input: IUser;
}


/***************************************/
/*            USER MUTATION            */
/***************************************/

export const typeDef = `

# Input
input CreateUserInput {
    firstname: String
    lastname: String
    avatar: String
    username: String
    email: String
    about: String
    website: String
    atoms: [CreateAtomInput]
}

# Mutations
extend type Mutation {
    createUser(input: CreateUserInput!): User
}

`;

export const resolver = {
    Mutation: {
        createAtom(root: any, args: ICreateUserArgs) {
            return models.User.create({
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