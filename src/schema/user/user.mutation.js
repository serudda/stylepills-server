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
exports.resolver = {
    Mutation: {
        register(parent, args) {
            return index_1.models.User.create(args.input)
                .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        },
    },
};
//# sourceMappingURL=user.mutation.js.map