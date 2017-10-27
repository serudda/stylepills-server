/********************************/
/*           USER TYPE          */
/********************************/

export const typeDef = `
type User {
    id: ID!
    firstname: String
    lastname: String
    avatar: String
    about: String
    email: String
    website: String
    atoms: [Atom]
}
`;