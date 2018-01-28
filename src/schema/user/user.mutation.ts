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
/*              MUTATION               */
/***************************************/

export const typeDef = `

# Input
input RegiterInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    avatar: String
    about: String
    website: String
    atoms: [CreateAtomInput]
}

# Mutations
extend type Mutation {
    
    register(
        input: RegiterInput
    ): User!
    
    login(
        email: String!, password: String!
    ): User!
    
    activeUser(
        id: ID!
    ): User!

    deactivateUser(
        id: ID!
    ): User!

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