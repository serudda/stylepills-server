/************************************/
/*        ATOM CATEGORY TYPE        */
/************************************/

export const typeDef = `
type AtomCategory {
    id: ID!
    name: String!
    description: String
}
`;

// NOTE: El usuario no deberia ver la propiedad 'active'