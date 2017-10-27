/********************************/
/*           USER TYPE          */
/********************************/

export const typeDef = `
type User {
    id: ID!
    firstname: String
    lastname: String
    username: String!
    email: String!
    avatar: String
    about: String
    website: String
    atoms: [Atom]
}
`;

// NOTE: El usuario no deberia ver la propiedad 'active'