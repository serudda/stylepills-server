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
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    avatar: String
    about: String
    website: String
    atoms: [CreateAtomInput]
}

type Error {
    path: String!
    message: String
}

# Register Mutation response
type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
}

# Login Mutation response
type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
}

# Mutations
extend type Mutation {
    register(input: CreateUserInput): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
}

`;

export const resolver = {
    Mutation: {
        register(parent: any, args: ICreateUserArgs) {
            return models.User.create(
                args.input
            )
            .then(
                (result) => {
                    return result;
                }
            ).catch(
                (err: Error) => {
                    return err;
                }
            );
        },
    },
};