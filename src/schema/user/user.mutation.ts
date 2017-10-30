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
}

# Nuestras mutaciones que definen como interactuar con los datos
type Mutation {
  # Crear un nuevo TODO pasando el contenido
  createTodo(
    content: String!
  ): Todo
  # Borrar un TODO existente mediante el ID
  deleteTodo(
    id: String!
  ): Todo
  # Marcar como completo un TODO existente mediante el ID
  completeTodo(
    id: String!
  ): Todo
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